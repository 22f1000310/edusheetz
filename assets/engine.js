(function () {
  'use strict';
  var params = new URLSearchParams(location.search), PDF = params.get('pdf') === '1', KEY = params.get('key') === '1';
  var id = window.QUEST_ID || (location.hash || '').slice(1) || window.THEMES[0].id;
  var ROOT = window.SITE_ROOT || '', SLUG = window.QUEST_SLUG || id;
  var T = window.THEMES.filter(function (t) { return t.id === id; })[0] || window.THEMES[0];
  var root = document.documentElement;
  root.style.setProperty('--c1', T.c1); root.style.setProperty('--c2', T.c2); root.style.setProperty('--bg', T.bg);
  document.body.setAttribute('data-style', T.style);
  document.title = T.title + (KEY ? ' – Answer Key' : '') + ' – MathsMagic';
  var app = document.getElementById('app');
  function $(i) { return document.getElementById(i); }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function units(q) { return q.k === 'note' ? 0 : q.k === 'reveal' ? q.cells.length : 1; }


  /* ---------- sound (made with the Web Audio API – no files needed) ---------- */
  var Snd = (function () {
    var ctx = null, on = true, voice = true, log = [];
    try { on = localStorage.getItem('mm_snd') !== '0'; voice = localStorage.getItem('mm_voice') !== '0'; } catch (e) {}
    function AC() {
      if (!ctx) { var C = window.AudioContext || window.webkitAudioContext; if (C) { try { ctx = new C(); } catch (e) {} } }
      if (ctx && ctx.state === 'suspended') ctx.resume();
      return ctx;
    }
    function tone(f, at, dur, type, vol) {
      var c = AC(); if (!c) return;
      var o = c.createOscillator(), g = c.createGain(), t0 = c.currentTime + at;
      o.type = type || 'triangle'; o.frequency.setValueAtTime(f, t0);
      g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(vol || 0.22, t0 + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      o.connect(g); g.connect(c.destination); o.start(t0); o.stop(t0 + dur + 0.05);
    }
    function hz(semi) { return 523.25 * Math.pow(2, semi / 12); }
    var wave = (window.THEMES && window.THEMES.filter(function (t) { return t.id === (window.QUEST_ID || ''); })[0] || {}).wave || 'triangle';
    return {
      log: log,
      ok: function (n) { log.push('ok'); if (!on || PDF) return; var b = (n || 0) % 5; [0, 4, 7, 12].forEach(function (s, i) { tone(hz(s + b), i * 0.09, 0.28, wave, 0.2); }); },
      no: function () { log.push('no'); if (!on || PDF) return; tone(220, 0, 0.16, 'sawtooth', 0.12); tone(165, 0.13, 0.24, 'sawtooth', 0.12); },
      tap: function (n) { log.push('tap'); if (!on || PDF) return; tone(hz(((n || 0) % 12)), 0, 0.14, 'sine', 0.2); },
      pop: function () { log.push('pop'); if (!on || PDF) return; tone(900, 0, 0.05, 'square', 0.12); tone(400, 0.03, 0.12, 'sine', 0.2); },
      win: function () { log.push('win'); if (!on || PDF) return; [0, 4, 7, 12, 7, 12, 16, 19].forEach(function (s, i) { tone(hz(s), i * 0.13, 0.34, wave, 0.22); }); },
      say: function (txt) {
        if (!on || !voice || PDF || !window.speechSynthesis) return;
        var t = String(txt).replace(/[^\x20-\x7E]/g, '').replace(/\s+/g, ' ').trim(); if (!t) return;
        try { speechSynthesis.cancel(); var u = new SpeechSynthesisUtterance(t); u.rate = 1.05; u.pitch = 1.35; u.volume = 0.9; speechSynthesis.speak(u); } catch (e) {}
      },
      state: function () { return { on: on, voice: voice }; },
      set: function (k, v) { if (k === 'on') on = v; else voice = v; try { localStorage.setItem(k === 'on' ? 'mm_snd' : 'mm_voice', v ? '1' : '0'); } catch (e) {} if (v && k === 'on') this.tap(4); if (!on && window.speechSynthesis) { try { speechSynthesis.cancel(); } catch (e) {} } },
      unlock: function () { AC(); }
    };
  })();
  window.__snd = Snd;
  ['pointerdown', 'keydown'].forEach(function (ev) { document.addEventListener(ev, function () { Snd.unlock(); }, { once: true }); });

  /* answer text for the answer key (and for auto-built questions) */
  function perm(n) { var s = n > 2 ? Math.floor(n / 2) : 1; var o = []; for (var j = 0; j < n; j++) o.push((j + s) % n); return o; }
  function ansOf(q) {
    if (q.ans) return q.ans;
    if (q.k === 'match') { var o = perm(q.pairs.length); return q.pairs.map(function (p, i) { return (i + 1) + ' → ' + 'ABCDEFGH'[o.indexOf(i)]; }).join(' · '); }
    if (q.k === 'col') return q.top + ' × ' + q.mult + ' = ' + (q.top * q.mult);
    if (q.k === 'fill') { var n = 0; return q.eq.replace(/<[^>]*>/g, '').replace(/\{\}/g, function () { return q.a[n++]; }); }
    if (q.k === 'tf') return q.a ? 'True ✅' : 'False ❌';
    if (q.k === 'pop') return q.good.join(', ');
    if (q.k === 'count') return (q.n || 1) + ' × ' + q.each + ' = ' + ((q.n || 1) * q.each);
    return '';
  }

  var TOTAL = 0; T.missions.forEach(function (m) { m.qs.forEach(function (q) { TOTAL += units(q); }); });
  var done = 0, spinFns = [], keyList = [], widgetUpdate = function () {}, qid = 0;

  /* ---------- page shell ---------- */
  var h = '<div class="nav no-print"><a href="' + (window.TOPIC_URL || './') + '">← ' + (window.TOPIC_NAME || 'All') + ' worksheets</a><span>' + T.mascot + ' ' + T.name + '</span><span class="sndbtns"><button id="sndOn" class="snd" aria-pressed="true" title="Sounds on/off">🔊 Sound</button><button id="sndVoice" class="snd" aria-pressed="true" title="Voice on/off">🗣️ Voice</button></span></div>';
  h += '<header class="top"><div><h1>' + T.title + (KEY ? ' – Answers' : '') + '</h1><p>' + T.tagline + '</p></div>' +
    '<div class="mascot"><div class="say" id="say">' + T.hi + '</div><div class="momo" id="momo">' + T.mascot + '</div></div>' +
    '<div class="deco" aria-hidden="true">' + T.deco + '</div></header>';
  if (T.covers) h += '<div class="covers">🎯 <b>Concepts covered:</b> ' + T.covers + '</div>';
  h += '<div class="name-line"><span>Name: <i></i></span><span>Date: <i></i></span></div>';

  if (KEY) {
    T.missions.forEach(function (m) { m.qs.forEach(function (q) { if (q.k !== 'note') keyList.push({ m: m.title, a: ansOf(q) }); }); });
    h += '<div class="keypage"><ol>' + keyList.map(function (k) { return '<li><b>' + k.a + '</b> <small>(' + k.m + ')</small></li>'; }).join('') + '</ol></div>' +
      '<div class="btns no-print"><button class="btn go" onclick="window.print()">🖨️ Print answers</button><a class="btn" href="' + location.pathname + '">← Back to the quest</a></div>';
    app.innerHTML = h; return;
  }

  h += '<div class="stickers no-print" aria-live="polite" id="wbox"></div>';
  h += '<section class="learn"><h2>👀 Look &amp; learn</h2><div class="steps">' + T.learn.steps.map(function (s, i) {
    return '<div class="step"><span class="tag">' + T.learn.tags[i] + '</span>' + (s.v || '<div class="big">' + s.big + '</div>') + '<div class="cap">' + s.cap + '</div></div>';
  }).join('') + '</div><p class="shortcut">' + T.learn.shortcut + '</p></section>';
  h += '<div id="missions"></div>';
  h += '<div class="btns no-print"><button class="btn go" id="again">🔄 Play again</button>' +
    '<a class="btn pdf" href="' + ROOT + 'assets/pdfs/' + SLUG + '.pdf" download>⬇️ Download PDF</a>' +
    '<button class="btn" onclick="window.print()">🖨️ Print</button></div>';
  h += '<div class="win" id="win" role="status"><h2>🏆 QUEST COMPLETE! 🏆</h2><p>' + T.win + '</p></div>';
  h += '<details class="no-print"><summary>For teachers &amp; parents</summary><p><a href="?key=1">Answer key</a> · <a href="' + ROOT + 'assets/pdfs/' + SLUG + '-answers.pdf" download>Answer key PDF</a></p><ol id="key"></ol></details>';
  app.innerHTML = h;
  $('again').onclick = function () { location.reload(); };
  (function () {
    [['sndOn', 'on', '🔊 Sound', '🔇 Sound off'], ['sndVoice', 'voice', '🗣️ Voice', '🤐 Voice off']].forEach(function (c) {
      var b = $(c[0]); if (!b) return;
      function paint() { var v = Snd.state()[c[1]]; b.textContent = v ? c[2] : c[3]; b.setAttribute('aria-pressed', v); }
      b.onclick = function () { Snd.set(c[1], !Snd.state()[c[1]]); paint(); }; paint();
    });
  })();

  /* ---------- progress widget ---------- */
  (function () {
    var w = T.widget, box = $('wbox'), t = w.type;
    if (t === 'till') {
      box.innerHTML = '<b>' + w.label + ':</b><span class="till" id="till">₹0</span><div class="count" id="count">0 / ' + TOTAL + '</div>';
      widgetUpdate = function (d) { $('till').textContent = '₹' + d * 10; $('count').textContent = d + ' / ' + TOTAL; };
    } else if (t === 'train') {
      box.innerHTML = '<b>🚂 My train:</b><div class="track" id="track"></div><div class="count" id="count"></div>';
      widgetUpdate = function (d) {
        var s = '<span>🚂</span>'; for (var i = 0; i < TOTAL; i++) s += '<span class="' + (i < d ? (i === d - 1 ? 'new' : '') : 'ghost') + '">🚃</span>';
        $('track').innerHTML = s; $('count').textContent = d + ' / ' + TOTAL;
      };
    } else if (t === 'score') {
      box.innerHTML = '<b>🏏 Scoreboard:</b><span class="score" id="score"></span><div class="count" id="count"></div>';
      widgetUpdate = function (d) {
        var runs = 0; for (var i = 0; i < d; i++) runs += (i % 2 ? 6 : 4);
        $('score').textContent = 'RUNS ' + runs + '/0 · BALLS ' + d; $('count').textContent = d + ' / ' + TOTAL;
      };
    } else if (t === 'clues') {
      box.innerHTML = '<b>' + w.label + ':</b><div class="count" id="count"></div><ul class="clues" id="cl">' +
        T.clues.map(function (c, i) { return '<li class="' + (i === T.clues.length - 1 ? 'last' : '') + '">' + (i === T.clues.length - 1 ? '🔒 ???' : '🔒 Clue ' + (i + 1) + ': ???') + '</li>'; }).join('') + '</ul>';
      widgetUpdate = function (d) {
        var li = $('cl').children[d - 1]; if (li) { li.textContent = T.clues[d - 1]; li.classList.add('got'); }
        $('count').textContent = d + ' / ' + TOTAL;
      };
    } else if (t === 'bar') {
      box.innerHTML = '<b>' + w.label + ':</b><div class="race"><span class="flag">' + (w.goal || '🏁') + '</span><span class="runner" id="runner">' + w.runner + '</span></div><div class="count" id="count"></div>';
      widgetUpdate = function (d) { $('runner').style.left = (TOTAL ? d / TOTAL * 86 : 0) + '%'; $('count').textContent = d + ' / ' + TOTAL; };
    } else {
      var s = ''; for (var i = 0; i < TOTAL; i++) s += '<div class="slot">' + w.empty + '</div>';
      box.innerHTML = '<b>' + w.label + ':</b><div class="slots" id="slots">' + s + '</div><div class="count" id="count"></div>';
      widgetUpdate = function (d) {
        var sl = $('slots').children, i = d - 1;
        if (sl[i]) { sl[i].textContent = w.items[i % w.items.length]; sl[i].classList.add('got'); }
        $('count').textContent = d + ' / ' + TOTAL;
      };
    }
    widgetUpdate(0);
  })();

  /* ---------- feedback ---------- */
  var say = $('say'), momo = $('momo');
  function success(el) {
    el.classList.add('ok'); done++; widgetUpdate(done);
    say.textContent = T.widget.type === 'clues' ? T.clues[done - 1] : pick(T.cheers); momo.textContent = T.mascot;
    burst(el); Snd.ok(done); Snd.say(say.textContent);
    if (done === TOTAL) finish();
  }
  function oops(el) {
    say.textContent = pick(T.oops); momo.textContent = '🙈'; Snd.no();
    setTimeout(function () { momo.textContent = T.mascot; }, 1200);
    if (el) { el.classList.add('shake'); setTimeout(function () { el.classList.remove('shake'); }, 420); }
  }
  function burst(el) {
    var r = el.getBoundingClientRect(), cx = r.left + Math.min(r.width, 300) / 2, cy = r.top + r.height / 2, L = T.burst.list, mode = T.burst.mode;
    for (var i = 0; i < 9; i++) {
      var s = document.createElement('span'), dx, dy, a = Math.random() * 6.28, d = 70 + Math.random() * 80;
      if (mode === 'burst') { dx = Math.cos(a) * d; dy = Math.sin(a) * d; }
      else if (mode === 'up') { dx = (Math.random() - .5) * 120; dy = -(120 + Math.random() * 120); }
      else if (mode === 'fly') { dx = 200 + Math.random() * 180; dy = -(20 + Math.random() * 120); }
      else { dx = (Math.random() - .5) * 90; dy = 100 + Math.random() * 120; }
      s.className = 'fx'; s.textContent = L[i % L.length]; s.style.left = cx + 'px'; s.style.top = cy + 'px';
      s.style.setProperty('--dx', dx + 'px'); s.style.setProperty('--dy', dy + 'px'); s.style.setProperty('--rot', (Math.random() * 360 - 180) + 'deg');
      document.body.appendChild(s); setTimeout((function (n) { return function () { n.remove(); }; })(s), 1100);
    }
  }
  function finish() {
    $('win').classList.add('show'); say.textContent = T.win; momo.textContent = '🥳'; setTimeout(function () { Snd.win(); }, 450);
    var E = T.fx.list;
    for (var i = 0; i < 46; i++) {
      var c = document.createElement('span'); c.className = 'confetti'; c.textContent = E[i % E.length];
      c.style.left = Math.random() * 100 + 'vw'; c.style.animationDuration = (2.2 + Math.random() * 2.4) + 's'; c.style.animationDelay = (Math.random() * .8) + 's';
      document.body.appendChild(c); setTimeout((function (n) { return function () { n.remove(); }; })(c), 6000);
    }
    $('win').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  /* ---------- answer checking ---------- */
  function wire(el, inputs, answers, onOk) {
    onOk = onOk || function () { success(el); };
    function check(final) {
      if (el.classList.contains('ok')) return;
      var vals = inputs.map(function (i) { return i.value.trim(); });
      var good = vals.map(function (v, k) { return v !== '' && Number(v) === answers[k]; });
      inputs.forEach(function (i, k) { i.classList.toggle('good', good[k]); });
      if (good.every(Boolean)) { inputs.forEach(function (i) { i.readOnly = true; }); onOk(); }
      else if (final && vals.every(function (v) { return v !== ''; })) oops(el);
    }
    inputs.forEach(function (i) {
      i.addEventListener('input', function () { check(false); });
      i.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); check(true); } });
      i.addEventListener('blur', function () { check(true); });
    });
  }
  var IN = '<input inputmode="numeric" autocomplete="off" aria-label="answer">';

  /* ---------- question builders ---------- */
  function build(q) {
    var orig = q;
    if (q.k === 'tf') q = { k: 'mcq', txt: true, wide: q.wide, ask: q.ask, v: (q.pic || '') + '<div class="tfst">' + q.st + '</div>', opts: ['✅ True', '❌ False'], a: q.a ? 0 : 1 };
    var d = document.createElement('div'); d.className = 'q' + (q.wide ? ' wide' : '') + (q.k === 'note' ? ' note wide' : ''); d.dataset.qid = qid++;
    var s = '<span class="tick">✅</span>';
    if (q.ask && q.k !== 'note') s += '<div class="ask">' + q.ask + '</div>';
    if (q.k === 'num') {
      s += (q.v || '') + (q.cap ? '<div class="ask">' + q.cap + '</div>' : '') + '<div class="eq"><span>' + q.eq + '</span>' + IN + '</div>';
      d.innerHTML = s; wire(d, [d.querySelector('input')], [q.a]);
    } else if (q.k === 'seq') {
      s += '<div class="eq">' + q.seq.map(function (x) { return x === null ? '<input class="seqin" inputmode="numeric" autocomplete="off" aria-label="missing number">' : '<span>' + x + '</span>'; }).join('<span>,</span>') + '</div>';
      d.innerHTML = s; wire(d, [].slice.call(d.querySelectorAll('input')), q.a);
    } else if (q.k === 'mcq') {
      s += (q.v || '') + '<div class="opts' + (q.txt ? ' txt' : '') + (q.small ? ' small' : '') + '">' + q.opts.map(function (o, i) { return '<button class="opt" data-i="' + i + '"><span class="letter">' + 'ABC'[i] + '</span>' + (q.txt ? '<span>' + o + '</span>' : o) + '</button>'; }).join('') + '</div>';
      d.innerHTML = s;
      d.querySelectorAll('.opt').forEach(function (b) {
        b.onclick = function () {
          if (d.classList.contains('ok')) return;
          if (+b.dataset.i === q.a) { b.classList.add('right'); success(d); }
          else { b.classList.add('wrong'); setTimeout(function () { b.classList.remove('wrong'); }, 450); oops(null); }
        };
      });
    } else if (q.k === 'build') {
      s += '<div class="bagwrap"><div class="bag" aria-label="shopping bag"></div><div class="bagbtns"><button class="mini add">➕ Add ' + q.label + '</button><button class="mini alt undo">↩️ Undo</button></div></div>' +
        '<div class="eq build-total"><span>In the bag:</span><b class="bagtotal">0</b></div>';
      d.innerHTML = s;
      var bag = d.querySelector('.bag'), tot = d.querySelector('.bagtotal'), count = 0, packs = [];
      function draw() { bag.innerHTML = packs.map(function () { return '<span class="pack">' + new Array(q.unit + 1).join(q.emoji) + '</span>'; }).join(''); tot.textContent = count; }
      d.querySelector('.add').onclick = function () {
        if (d.classList.contains('ok')) return;
        count += q.unit; packs.push(1); draw();
        if (count === q.target) { d.querySelectorAll('.mini').forEach(function (b) { b.disabled = true; }); success(d); }
        else if (count > q.target) { oops(d); count -= q.unit; packs.pop(); setTimeout(draw, 350); }
      };
      d.querySelector('.undo').onclick = function () { if (d.classList.contains('ok') || !packs.length) return; count -= q.unit; packs.pop(); draw(); };
    } else if (q.k === 'spin') {
      s += '<div class="spinbox"><div class="wheelwrap"><div class="pointer">🔻</div>' + P.wheel() + '</div><div class="spinside"><button class="mini spinbtn">🎡 SPIN!</button>' +
        '<div class="eq"><span class="lab">? × ' + q.mult + ' =</span><input inputmode="numeric" autocomplete="off" aria-label="answer" disabled></div></div></div>';
      d.innerHTML = s;
      var wh = d.querySelector('.wheel'), btn = d.querySelector('.spinbtn'), lab = d.querySelector('.lab'), inp = d.querySelector('input'), spun = false;
      function land(instant) {
        if (spun) return; spun = true; btn.disabled = true;
        var ang = 360 * 4 - (q.val - 1) * 45 - 22.5;
        if (instant) wh.style.transition = 'none';
        wh.style.transform = 'rotate(' + ang + 'deg)';
        var finishSpin = function () { lab.textContent = q.val + ' × ' + q.mult + ' ='; inp.disabled = false; if (!instant) inp.focus(); };
        if (instant) finishSpin(); else setTimeout(finishSpin, 2450);
      }
      btn.onclick = function () { land(false); };
      spinFns.push(land); if (PDF) land(true);
      wire(d, [inp], [q.a]);
    } else if (q.k === 'reveal') {
      var grid = '<div class="reveal" style="grid-template-columns:repeat(' + q.cols + ',1fr)">';
      var rows = Math.max.apply(null, q.cells.map(function (c) { return c.r; })) + 1;
      for (var r = 0; r < rows; r++) for (var c = 0; c < q.cols; c++) {
        var cell = q.cells.filter(function (x) { return x.r === r && x.c === c; })[0];
        grid += cell ? '<div class="rcell" data-r="' + r + '" data-c="' + c + '"><span>' + cell.eq + '</span>' + IN + '</div>' : '<div class="rcell blank"></div>';
      }
      s += '<div class="rkey">' + q.key + '</div>' + grid + '</div>'; d.innerHTML = s;
      q.cells.forEach(function (cell) {
        var el = d.querySelector('.rcell[data-r="' + cell.r + '"][data-c="' + cell.c + '"]');
        wire(el, [el.querySelector('input')], [cell.a], function () { el.style.background = cell.color; success(el); });
      });
    } else if (q.k === 'fill') {
      var parts = q.eq.split('{}'), fh = '<div class="eq fill">';
      parts.forEach(function (p, i) { fh += '<span>' + p + '</span>' + (i < parts.length - 1 ? '<input class="fillin" inputmode="numeric" autocomplete="off" aria-label="blank ' + (i + 1) + '">' : ''); });
      s += (q.v || '') + fh + '</div>'; d.innerHTML = s;
      var fin = [].slice.call(d.querySelectorAll('input')); wire(d, fin, q.a);
      fin.forEach(function (inp, i) { inp.addEventListener('input', function () { if (inp.classList.contains('good') && fin[i + 1] && !fin[i + 1].readOnly) fin[i + 1].focus(); }); });
    } else if (q.k === 'col') {
      s += (q.v || '') + '<div class="colwrap">' + P.col(q.top, q.mult, { inputs: true }) + '</div>' + (q.hint ? '<div class="cap">' + q.hint + '</div>' : ''); d.innerHTML = s;
      var ins = [].slice.call(d.querySelectorAll('input.digit')), rows = {}, order = [];
      ins.forEach(function (i) { var r = i.dataset.row; if (!rows[r]) { rows[r] = []; order.push(r); } rows[r].push(i); });
      var chain = []; order.forEach(function (r) { chain = chain.concat(rows[r].slice().reverse()); });
      wire(d, ins, ins.map(function (i) { return +i.dataset.a; }));
      chain.forEach(function (inp, i) { inp.addEventListener('input', function () { if (inp.value !== '' && chain[i + 1] && !chain[i + 1].readOnly) chain[i + 1].focus(); }); });
    } else if (q.k === 'match') {
      var mn = q.pairs.length, mord = perm(mn), ML = '', MR = '';
      q.pairs.forEach(function (p, i) { ML += '<button class="mbtn L" data-i="' + i + '"><span class="mno">' + (i + 1) + '</span><span class="mt">' + p[0] + '</span><span class="mwrite">→ <u></u></span></button>'; });
      mord.forEach(function (pi, j) { MR += '<button class="mbtn R" data-i="' + pi + '"><span class="mno">' + 'ABCDEFGH'[j] + '</span><span class="mt">' + q.pairs[pi][1] + '</span></button>'; });
      s += '<div class="match"><div class="mcol">' + ML + '</div><div class="mcol">' + MR + '</div></div><div class="mhint no-print">👆 Tap one on the left, then its partner on the right.</div>' +
        '<div class="phint">✏️ Write the letter of the partner in the box.</div>';
      d.innerHTML = s;
      var sel = null, matched = 0;
      [].slice.call(d.querySelectorAll('.mbtn')).forEach(function (b) {
        b.onclick = function () {
          if (b.classList.contains('done') || d.classList.contains('ok')) return;
          if (b.classList.contains('L')) { [].slice.call(d.querySelectorAll('.mbtn.sel')).forEach(function (x) { x.classList.remove('sel'); }); sel = b; b.classList.add('sel'); Snd.tap(matched * 2); return; }
          if (!sel) { say.textContent = 'Tap a picture on the left first 👈'; return; }
          if (sel.dataset.i === b.dataset.i) {
            var col = T.palette[matched % T.palette.length]; [sel, b].forEach(function (x) { x.classList.remove('sel'); x.classList.add('done'); x.style.setProperty('--mc', col); });
            matched++; sel = null; Snd.pop(); burst(b); say.textContent = pick(['Match! 🎯', 'Perfect pair! 🤝', 'Yes! ✨']);
            if (matched === mn) success(d);
          } else { sel.classList.remove('sel'); sel = null; oops(b); }
        };
      });
    } else if (q.k === 'count') {
      var cn = q.n || 1, ce = q.each, ctot = cn * ce, gh = '<div class="cgroups' + (q.by === 'one' ? ' one' : '') + '">';
      for (var g = 0; g < cn; g++) {
        var inner = ''; for (var e = 0; e < ce; e++) inner += q.by === 'one' ? '<button class="ci" aria-label="count">' + q.emoji + '<b></b></button>' : '<span>' + q.emoji + '</span>';
        gh += q.by === 'one' ? '<div class="cg"><div class="cg-items">' + inner + '</div></div>' : '<button class="cg" aria-label="group ' + (g + 1) + '"><div class="cg-items">' + inner + '</div><span class="cg-badge"></span></button>';
      }
      gh += '</div>';
      s += '<div class="mhint no-print">' + (q.by === 'one' ? '👆 Tap each one to count it.' : '👆 Tap each group to skip-count!') + '</div>' + gh +
        '<div class="counter no-print"><span>Counting:</span><b class="cnum">0</b></div><div class="eq"><span>' + (q.eq || (cn + ' × ' + ce + ' =')) + '</span>' + IN + '</div>';
      d.innerHTML = s;
      var run = 0, cnum = d.querySelector('.cnum');
      if (q.by === 'one') [].slice.call(d.querySelectorAll('.ci')).forEach(function (b) { b.onclick = function () { if (b.classList.contains('t')) return; run++; b.classList.add('t'); b.querySelector('b').textContent = run; cnum.textContent = run; Snd.tap(run); }; });
      else [].slice.call(d.querySelectorAll('button.cg')).forEach(function (b) { b.onclick = function () { if (b.classList.contains('t')) return; run += ce; b.classList.add('t'); b.querySelector('.cg-badge').textContent = run; cnum.textContent = run; Snd.tap(run / ce * 2); }; });
      wire(d, [d.querySelector('input')], [q.a !== undefined ? q.a : ctot]);
    } else if (q.k === 'pop') {
      var ph = '<div class="balloons">'; q.items.forEach(function (v, i) { ph += '<button class="bal" data-v="' + v + '" style="--bc:' + T.palette[i % T.palette.length] + '"><span>' + v + '</span></button>'; }); ph += '</div>';
      s += '<div class="mhint no-print">🎈 Tap the right balloons to pop them!</div>' + ph + '<div class="phint">✏️ Circle every right balloon.</div>'; d.innerHTML = s;
      var left = q.good.length, goods = q.good.map(String);
      [].slice.call(d.querySelectorAll('.bal')).forEach(function (b) {
        b.onclick = function () {
          if (b.classList.contains('popped') || d.classList.contains('ok')) return;
          if (goods.indexOf(b.dataset.v) > -1) { b.classList.add('popped'); Snd.pop(); burst(b); left--; if (!left) success(d); }
          else oops(b);
        };
      });
    } else if (q.k === 'note') {
      s += '<div class="notebub">💬 ' + q.ask + '</div><div class="lines" aria-hidden="true"><i></i><i></i></div>'; d.innerHTML = s;
    }
    if (q.k !== 'note') keyList.push(ansOf(orig));
    return d;
  }

  /* ---------- missions ---------- */
  var root2 = $('missions');
  T.missions.forEach(function (m, i) {
    var sec = document.createElement('section'); sec.className = 'mission'; sec.style.setProperty('--m', T.palette[i % T.palette.length]);
    sec.innerHTML = '<div class="m-head"><div class="m-badge">' + m.emoji + '</div><div><h2>Mission ' + (i + 1) + ': ' + m.title + '</h2><small>' + m.sub + '</small>' + (m.book ? '<span class="src book">🎯 ' + m.book + '</span>' : '') + (m.extra ? '<span class="src extra">⭐ Bonus game</span>' : '') + '</div></div><div class="m-body"></div>';
    var body = sec.querySelector('.m-body'); m.qs.forEach(function (q) { body.appendChild(build(q)); }); root2.appendChild(sec);
  });
  var ol = $('key'); keyList.forEach(function (a) { var li = document.createElement('li'); li.textContent = a; ol.appendChild(li); });
  window.addEventListener('beforeprint', function () { spinFns.forEach(function (f) { f(true); }); });
})();
