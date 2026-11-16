/* MathsMagic site behaviour: topic-page filters + sorting, and site-wide search */
(function () {
  'use strict';
  var ROOT = window.SITE_ROOT || '';

  /* ---------- topic page: filter + sort ---------- */
  var grid = document.getElementById('cards');
  if (grid && document.getElementById('filters')) {
    var cards = [].slice.call(grid.querySelectorAll('.wcard')), count = document.getElementById('count'), empty = document.getElementById('empty');
    var kw = document.getElementById('kw'), sort = document.getElementById('sort');
    function checked(name) { return [].slice.call(document.querySelectorAll('input[name="' + name + '"]:checked')).map(function (i) { return i.value; }); }
    function apply() {
      var skills = checked('skill'), tables = checked('table'), q = kw.value.trim().toLowerCase(), shown = 0;
      cards.forEach(function (c) {
        var cs = c.dataset.skills.split('|'), ct = c.dataset.tables.split(',');
        var ok = skills.every(function (s) { return cs.indexOf(s) > -1; }) &&
                 tables.every(function (t) { return ct.indexOf(t) > -1; }) &&
                 (!q || c.dataset.text.indexOf(q) > -1);
        c.style.display = ok ? '' : 'none'; if (ok) shown++;
      });
      count.textContent = shown + (shown === 1 ? ' worksheet' : ' worksheets');
      empty.style.display = shown ? 'none' : 'block';
    }
    function order() {
      var by = sort.value, arr = cards.slice();
      arr.sort(function (a, b) { return by === 'az' ? a.dataset.title.localeCompare(b.dataset.title) : (+a.dataset.pop) - (+b.dataset.pop); });
      arr.forEach(function (c) { grid.appendChild(c); });
    }
    document.getElementById('filters').addEventListener('change', apply);
    kw.addEventListener('input', apply);
    sort.addEventListener('change', order);
    document.getElementById('clear').onclick = function () {
      [].slice.call(document.querySelectorAll('#filters input[type=checkbox]')).forEach(function (i) { i.checked = false; });
      kw.value = ''; apply();
    };
    var pre = new URLSearchParams(location.search).get('skill');
    if (pre) { var el = document.querySelector('input[name="skill"][value="' + pre.replace(/"/g, '') + '"]'); if (el) el.checked = true; }
    apply();
  }

  /* ---------- search page ---------- */
  var box = document.getElementById('search-results');
  if (box && window.CATALOG) {
    var q = (new URLSearchParams(location.search).get('q') || '').trim(), ql = q.toLowerCase(), words = ql.replace(/[×x]\s*(\d)/g, 'tables $1').split(/\s+/).filter(function (w) { return w && ['of','the','a','an','and','in','for','to','with','on'].indexOf(w) < 0; });
    var input = document.getElementById('search-q'); if (input) input.value = q;
    var all = [];
    CATALOG.grades.forEach(function (g) { g.subjects.forEach(function (s) { s.topics.forEach(function (t) { (t.worksheets || []).forEach(function (w) {
      all.push({ w: w, g: g, s: s, t: t, text: [w.title, w.blurb, w.skills.join(' '), w.name, t.name, s.name, g.name, 'tables ' + w.tables.join(' ')].join(' ').toLowerCase() });
    }); }); }); });
    var hits = words.length ? all.filter(function (x) { return words.every(function (k) { return x.text.indexOf(k) > -1; }); }) : all;
    document.getElementById('search-count').textContent = (words.length ? hits.length + ' result' + (hits.length === 1 ? '' : 's') + ' for “' + q + '”' : 'All ' + hits.length + ' worksheets');
    box.innerHTML = hits.map(function (x) {
      var w = x.w;
      return '<article class="wcard" style="--c:' + w.color + '"><div class="cover"><div class="mascot">' + w.mascot + '</div><div><h3>' + w.title + '</h3><span class="label">' + x.g.name + ' · ' + x.s.name + ' · ' + x.t.name + '</span></div></div>' +
        '<div class="body"><div class="badges"><span class="badge">⚡ Interactive</span><span class="badge pdf">🖨️ Printable PDF</span></div><p>' + w.blurb + '</p>' +
        '<div class="row"><a class="sbtn play" href="' + ROOT + w.url + '">▶ Play</a><a class="sbtn" href="' + ROOT + w.pdf + '" download>⬇️ PDF</a></div></div></article>';
    }).join('');
    if (!hits.length) document.getElementById('search-none').style.display = 'block';
  }
})();
