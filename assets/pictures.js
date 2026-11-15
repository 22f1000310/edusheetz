/* Picture library – every picture uses the theme colours through CSS variables */
window.P = (function () {
  'use strict';

  // equal groups: P.groups('🍎', 3, 4, {shape:'round|rect|jar|bubble', label:'4 legs'})
  function groups(e, n, each, o) {
    o = o || {};
    var shape = o.shape || 'round', h = '<div class="groups">';
    for (var i = 0; i < n; i++) {
      var s = '';
      for (var j = 0; j < each; j++) s += '<span>' + e + '</span>';
      h += '<div class="grp"><div class="grp-items s-' + shape + ' n' + Math.min(each, 6) + '">' + s + '</div>' +
        (o.label ? '<div class="grp-label">' + o.label + '</div>' : '') + '</div>';
    }
    return h + '</div>';
  }

  // rows x columns: P.array('🧁', 3, 5, {skin:'plain|tray|soil|grid'})
  function array(e, rows, cols, o) {
    o = o || {};
    var s = '<div class="array sk-' + (o.skin || 'plain') + (o.small ? ' sm' : '') + '" style="grid-template-columns:repeat(' + cols + ',auto)">';
    for (var i = 0; i < rows * cols; i++) s += '<span>' + e + '</span>';
    return s + '</div>';
  }

  // equal hops on a 0-20 line: P.numline(5, 4, '🚂')
  function numline(size, hops, hero) {
    var X = function (v) { return 22 + v * 31; };
    var svg = '<svg class="numline" viewBox="0 0 664 130" role="img" aria-label="Number line with ' + hops + ' hops of ' + size + '">';
    svg += '<line x1="12" y1="92" x2="652" y2="92" stroke="#2B2A4C" stroke-width="4" stroke-linecap="round"/>';
    for (var t = 0; t <= 20; t++) {
      svg += '<line x1="' + X(t) + '" y1="86" x2="' + X(t) + '" y2="98" stroke="#2B2A4C" stroke-width="3"/>' +
        '<text x="' + X(t) + '" y="118" text-anchor="middle" font-size="14" font-weight="800" fill="#2B2A4C">' + t + '</text>';
    }
    for (var i = 0; i < hops; i++) {
      var a = X(i * size), b = X((i + 1) * size), m = (a + b) / 2, last = i === hops - 1;
      svg += '<path d="M' + a + ' 90 Q' + m + ' 8 ' + b + ' 90" fill="none" style="stroke:var(--m)" stroke-width="5" stroke-linecap="round" ' + (last ? 'stroke-dasharray="2 9"' : '') + '/>';
      svg += last
        ? '<text x="' + b + '" y="64" text-anchor="middle" font-size="30" font-weight="800" style="fill:var(--m)">?</text>'
        : '<circle cx="' + b + '" cy="92" r="9" style="fill:var(--m)" stroke="#2B2A4C" stroke-width="3"/>';
    }
    svg += '<text x="' + X(0) + '" y="64" text-anchor="middle" font-size="34">' + (hero || '🐸') + '</text>';
    return svg + '</svg>';
  }

  // function machine: IN -> [x op] -> OUT
  function machine(op, inp) {
    var f = 'font-family="Baloo 2,Trebuchet MS,sans-serif" font-weight="800"';
    return '<svg class="machine" viewBox="0 0 480 140" role="img" aria-label="Machine: input ' + inp + ', multiply by ' + op + '">' +
      '<text x="49" y="22" text-anchor="middle" font-size="17" fill="#2B2A4C" ' + f + '>IN</text>' +
      '<rect x="6" y="34" width="86" height="70" rx="14" fill="#fff" stroke="#2B2A4C" stroke-width="4"/>' +
      '<text x="49" y="82" text-anchor="middle" font-size="38" fill="#2B2A4C" ' + f + '>' + inp + '</text>' +
      '<text x="120" y="80" text-anchor="middle" font-size="30" fill="#2B2A4C">➜</text>' +
      '<rect x="150" y="12" width="180" height="116" rx="18" style="fill:var(--m)" stroke="#2B2A4C" stroke-width="5"/>' +
      '<text x="170" y="40" font-size="22">⚙️</text><text x="294" y="40" font-size="22">⚙️</text>' +
      '<text x="240" y="92" text-anchor="middle" font-size="52" fill="#fff" stroke="#2B2A4C" stroke-width="1.5" ' + f + '>× ' + op + '</text>' +
      '<text x="360" y="80" text-anchor="middle" font-size="30" fill="#2B2A4C">➜</text>' +
      '<text x="429" y="22" text-anchor="middle" font-size="17" fill="#2B2A4C" ' + f + '>OUT</text>' +
      '<rect x="388" y="34" width="86" height="70" rx="14" fill="#FFFBE0" stroke="#2B2A4C" stroke-width="4" stroke-dasharray="8 6"/>' +
      '<text x="431" y="86" text-anchor="middle" font-size="44" fill="#2B2A4C" ' + f + '>?</text></svg>';
  }

  // spinner wheel with numbers 1-8 (rotation is set by the engine)
  function wheel() {
    var cols = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#C77DFF', '#FF9F45', '#2EC4B6', '#FF5CA8'];
    var svg = '<svg class="wheel" viewBox="0 0 200 200" role="img" aria-label="Number wheel from 1 to 8">';
    for (var i = 0; i < 8; i++) {
      var a0 = i * 45 * Math.PI / 180, a1 = (i + 1) * 45 * Math.PI / 180, am = (i * 45 + 22.5) * Math.PI / 180;
      var p = function (a, r) { return (100 + r * Math.sin(a)).toFixed(1) + ' ' + (100 - r * Math.cos(a)).toFixed(1); };
      svg += '<path d="M100 100 L' + p(a0, 92) + ' A92 92 0 0 1 ' + p(a1, 92) + ' Z" fill="' + cols[i] + '" stroke="#2B2A4C" stroke-width="3"/>';
      svg += '<text x="' + (100 + 62 * Math.sin(am)).toFixed(1) + '" y="' + (100 - 62 * Math.cos(am) + 9).toFixed(1) + '" text-anchor="middle" font-size="26" font-weight="800" fill="#2B2A4C" font-family="Baloo 2,Trebuchet MS,sans-serif">' + (i + 1) + '</text>';
    }
    svg += '<circle cx="100" cy="100" r="14" fill="#fff" stroke="#2B2A4C" stroke-width="4"/></svg>';
    return svg;
  }


  // vertical (column) multiplication like the textbook:  P.col(314, 2, {inputs:true})
  //  inputs:true  -> empty digit boxes to fill (each box has data-a = the right digit)
  //  inputs:false -> the finished sum, shown as plain digits (used in "Look & learn")
  function col(top, mult, o) {
    o = o || {};
    var two = mult >= 10, prod = String(top * mult), ts = String(top), ms = String(mult);
    var p1 = String(top * (two ? mult % 10 : mult)), p2 = two ? String(top * Math.floor(mult / 10)) + '0' : null;
    var n = Math.max(3, prod.length, ts.length, p1.length, p2 ? p2.length : 0);
    var labs = ['O', 'T', 'H', 'Th', 'TTh'].slice(0, n).reverse();
    function row(str, kind, rowname, op, cls) {
      var h = '<tr' + (cls ? ' class="' + cls + '"' : '') + '><td class="op">' + (op || '') + '</td>';
      for (var i = 0; i < n; i++) {
        var idx = i - (n - str.length);
        if (idx < 0) { h += '<td></td>'; continue; }
        var ch = str.charAt(idx);
        if (kind === 'in' && !(rowname === 'p2' && idx === str.length - 1)) h += '<td><input class="digit" maxlength="1" inputmode="numeric" autocomplete="off" aria-label="digit" data-row="' + rowname + '" data-a="' + ch + '"></td>';
        else h += '<td class="' + (kind === 'fixed' ? 'gv' : 'sol') + '">' + ch + '</td>';
      }
      return h + '</tr>';
    }
    var k = o.inputs ? 'in' : 'sol';
    var h = '<table class="col" aria-label="' + top + ' times ' + mult + '"><tr class="hd"><th></th>' + labs.map(function (l) { return '<th class="pv-' + l + '">' + l + '</th>'; }).join('') + '</tr>';
    h += row(ts, 'fixed', 'top', '') + row(ms, 'fixed', 'mul', '×');
    if (two) h += row(p1, k, 'p1', '', 'ln') + row(p2, k, 'p2', '+') + row(prod, k, 't', '', 'ln');
    else h += row(prod, k, 't', '', 'ln');
    return h + '</table>';
  }

  // place-value chart for one number:  P.place(325)
  function place(num) {
    var s = String(num), labs = ['O', 'T', 'H', 'Th', 'TTh'].slice(0, Math.max(3, s.length)).reverse(), n = labs.length;
    var h = '<table class="col place"><tr class="hd">' + labs.map(function (l) { return '<th class="pv-' + l + '">' + l + '</th>'; }).join('') + '</tr><tr>';
    for (var i = 0; i < n; i++) { var idx = i - (n - s.length); h += '<td class="sol">' + (idx < 0 ? '' : s.charAt(idx)) + '</td>'; }
    return h + '</tr></table>';
  }

  // a little times-table ladder:  P.tbl(7, 5)  -> 7 x 1 ... 7 x 5
  function tbl(n, rows) {
    var h = '<div class="tbl">';
    for (var i = 1; i <= (rows || 10); i++) h += '<div><span>' + n + ' × ' + i + '</span><b>' + (n * i) + '</b></div>';
    return h + '</div>';
  }

  // a number with its zeros highlighted:  P.zeros(45, 2) -> 45 + two zeros
  function zeros(n, z) { var t = ''; for (var i = 0; i < z; i++) t += '0'; return n + '<span class="z">' + t + '</span>'; }


  // place-value blocks:  P.blocks(143, 2) = 2 sets of (1 flat, 4 rods, 3 cubes). Many sets -> one set and "× k".
  function blocks(num, sets) {
    sets = sets || 1;
    var h = Math.floor(num / 100) % 10, t = Math.floor(num / 10) % 10, o = num % 10, per = h + t + o;
    function one() {
      var x = '<div class="bset">';
      if (h) x += '<span class="bgrp">' + new Array(h + 1).join('<i class="bf"></i>') + '</span>';
      if (t) x += '<span class="bgrp">' + new Array(t + 1).join('<i class="br"></i>') + '</span>';
      if (o) x += '<span class="bgrp bgo">' + new Array(o + 1).join('<i class="bo"></i>') + '</span>';
      return x + '</div>';
    }
    var h2 = '<div class="blocks" role="img" aria-label="place value blocks">';
    if (per * sets <= 42) for (var i = 0; i < sets; i++) h2 += one();
    else h2 += one() + '<b class="bx">× ' + sets + '</b>';
    return h2 + '<div class="blegend"><i class="bf"></i>=100 <i class="br"></i>=10 <i class="bo"></i>=1</div></div>';
  }

  // area model:  P.area(26, [10, 4])  -> rectangle split into two boxes (a × part1) and (a × part2)
  function area(a, parts) {
    var tot = parts.reduce(function (x, y) { return x + y; }, 0), cols = ['#FFD6E8', '#D6EBFF', '#DDF8E6'];
    var h = '<div class="area" role="img" aria-label="area model"><div class="aside">' + a + '</div><div class="arect">';
    parts.forEach(function (p, i) { h += '<div class="acell" style="flex:' + Math.max(p / tot, 0.28).toFixed(2) + ';background:' + cols[i % 3] + '"><small>' + a + ' × ' + p + '</small></div>'; });
    return h + '</div><div class="atop">' + parts.join(' + ') + '</div></div>';
  }

  // factor chain:  P.flow(24, [5, 7])  ->  24 → ×5 → ? → ×7 → ?
  function flow(a, bs, emoji) {
    var h = '<div class="flow" role="img" aria-label="step by step"><span class="fc">' + (emoji || '') + a + '</span>';
    bs.forEach(function (b) { h += '<span class="fa">× ' + b + '</span><span class="fc q">?</span>'; });
    return h + '</div>';
  }

  // place-value shift when multiplying by 10, 100, 1000:  P.shift(27, 2)
  function shift(num, k) {
    var s = String(num), cols = s.length + k, names = ['O', 'T', 'H', 'Th', 'TTh', 'L'].slice(0, cols).reverse();
    function row(str, zeros) {
      var r = '<tr>'; for (var i = 0; i < cols; i++) { var idx = i - (cols - str.length); var z = idx >= str.length - zeros; r += '<td class="' + (idx < 0 ? 'e' : (zeros && idx >= str.length - zeros) ? 'z0' : 'dg') + '">' + (idx < 0 ? '' : str.charAt(idx)) + '</td>'; } return r + '</tr>';
    }
    var h = '<table class="shift col" aria-label="place value shift"><tr class="hd">' + names.map(function (l) { return '<th class="pv-' + l + '">' + l + '</th>'; }).join('') + '</tr>';
    var before = ''; for (var i = 0; i < cols; i++) { var idx = i - (cols - s.length); before += '<td class="' + (idx < 0 ? 'e' : 'dg') + '">' + (idx < 0 ? '' : s.charAt(idx)) + '</td>'; }
    var shifted = s + new Array(k + 1).join('0'), after = '';
    for (var j = 0; j < cols; j++) { var ix = j; after += '<td class="' + (ix >= s.length ? 'z0' : 'dg') + '">' + shifted.charAt(ix) + '</td>'; }
    return h + '<tr>' + before + '</tr><tr class="arrow"><td colspan="' + cols + '">⬇ × ' + Math.pow(10, k) + ' ⬇ every digit moves ' + k + ' place' + (k > 1 ? 's' : '') + ' left</td></tr><tr>' + after + '</tr></table>';
  }

  // rupee notes:  P.notes(6, 50)
  function notes(count, value) {
    var h = '<div class="notes" role="img" aria-label="rupee notes">';
    for (var i = 0; i < count; i++) h += '<span class="note v' + String(value).length + '">₹' + value + '</span>';
    return h + '</div>';
  }

  // the same array turned round:  P.twin('🌿', 6, 7)
  function twin(e, a, b) {
    return '<div class="twin"><div>' + array(e, a, b, { small: true }) + '</div><div class="tx">=</div><div>' + array(e, b, a, { small: true }) + '</div></div>';
  }

  // sensible picture for a × b (a groups of b)
  function pic(e, a, b) { return (a <= 5 && b <= 6) ? groups(e, a, b, { shape: 'round' }) : array(e, a, b, { small: true }); }

  var POOL = ['🍎','🐶','🚗','⚽','🎈','🍪','🦆','🌸','🐟','🚲','🍓','🧸','🐞','🍦','🐸','🦋','🎨','🍩','🐝','🐱','🍌','🐰','🚂','🍭','🐥','🌻','🎁','🍉','🐢','🦄','🍕','🏀','🐘','🪁','🧁','🍒','🐙','🌈','🚀','🦀'];
  var emoN = 0;
  function emo() { return POOL[(emoN++ * 7) % POOL.length]; }   // a different picture every time
  var KW = [['lettuce','🥬'],['leaves','🍃'],['astronaut','🧑‍🚀'],['seal','🦭'],['fish','🐟'],['sixes','🏏'],['runs','🏏'],['watering','💧'],['litre','💧'],['seat','💺'],['kids','🧒'],['notebook','📓'],['balloon','🎈'],['ticket','🎟️'],['coin','🪙'],['book','📚'],['flower','🌼'],['cookie','🍪'],['marble','🔵'],['chair','🪑'],['robot','🤖'],['gear','⚙️'],['apple','🍎'],['code','🔐']];
  function kw(txt) { var l = String(txt || '').toLowerCase(); for (var i = 0; i < KW.length; i++) if (l.indexOf(KW[i][0]) >= 0) return KW[i][1]; return emo(); }
  return { kw: kw, POOL: POOL, emo: emo, blocks: blocks, area: area, flow: flow, shift: shift, notes: notes, twin: twin, pic: pic, col: col, place: place, tbl: tbl, zeros: zeros, groups: groups, array: array, numline: numline, machine: machine, wheel: wheel };
})();
