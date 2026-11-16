/* KID MODE – runs after all themes are loaded.
   1. Every "choose the answer" question (multiple choice, match, true/false, balloon pop) becomes a "write your answer" question,
      so children learn the fact instead of guessing.
   2. Numbers of every size are kept (thousands too). */
(function () {
  'use strict';
  var P = window.P, TH = window.THEMES || [];
  function isN(s) { return /^\s*\d+\s*$/.test(String(s)); }
  function numq(ask, eq, a, o) { return Object.assign({ k: 'num', wide: true, ask: ask, eq: eq || 'Answer =', a: a, ans: String(a) }, o || {}); }
  function eqq(a, b, o) { return Object.assign({ k: 'num', eq: a + ' × ' + b + ' =', a: a * b, ans: a + ' × ' + b + ' = ' + (a * b) }, o || {}); }
  function pic(a, b, txt) {
    var e = txt ? P.kw(txt) : P.emo();
    if (a >= 1 && b >= 1 && a <= 10 && b <= 10 && a * b <= 90) return P.pic(e, a, b);
    if (a >= 10 && a < 1000 && b >= 2 && b <= 9) return P.blocks(a, b);
    if (b >= 10 && b < 1000 && a >= 2 && a <= 9) return P.blocks(b, a);
    if (a >= 10 && a < 100 && b >= 10 && b < 100) return P.area(a, [Math.floor(b / 10) * 10, b % 10].filter(function (z) { return z; }));
    return '';
  }
  function gcd(a, b) { return b ? gcd(b, a % b) : a; }
  function seqOf(t) { var L = [1, 2, 3, 4, 5, 6].map(function (i) { return t * i; }), hide = [2, 4, 5], a = hide.map(function (i) { return L[i]; });
    var s = L.map(function (v, i) { return hide.indexOf(i) >= 0 ? null : v; });
    return { k: 'seq', wide: true, seq: s, a: a, ans: L.join(', ') + ' (count by ' + t + 's)' }; }

  function convert(q, T) {
    var x;
    if (q.k === 'tf') {
      if ((x = /(\d+) × (\d+) = (\d+)/.exec(q.st || ''))) {
        var a = +x[1], b = +x[2];
        return { k: 'fill', wide: true, v: pic(a, b), eq: T.name + ' wrote  ' + q.st + '.   Work it out – the right answer: ' + a + ' × ' + b + ' = {}', a: [a * b] };
      }
      return null;
    }
    if (q.k === 'mcq') {
      if (q.opts.every(function (o) { return isN(String(o).replace(/,/g, '')); }))
      { var ns = (q.ask.match(/\d+/g) || []).map(Number), v = q.v;
        if (!v && ns.length >= 2 && ns[0] <= 10 && ns[1] <= 10) v = pic(ns[0], ns[1], q.ask);
        return numq(q.ask, 'Answer =', +String(q.opts[q.a]).replace(/,/g, ''), { v: v, cap: q.cap }); }
      if ((x = /(\d+) × (\d+)/.exec(q.ask || '')) && /^Which (picture|box)/i.test(q.ask)) { var a2 = +x[1], b2 = +x[2];
        return eqq(a2, b2, { v: pic(a2, b2), cap: 'Count the picture. How many in all?' }); }
      return null;
    }
    if (q.k === 'pop') {
      if ((x = /table of (\d+)|by (\d+)s|× (\d+) machine/.exec((q.ask || '')))) return seqOf(+(x[1] || x[2] || x[3]));
      if ((x = /pairs make (\d+)/.exec(q.ask || ''))) { var n = +x[1], ps = q.good.slice(0, 3).map(function (g) { return g.split(' × ').map(Number); });
        return { k: 'fill', wide: true, eq: n + '  =  ' + ps.map(function (p) { return p[0] + ' × {}'; }).join('   =   '), a: ps.map(function (p) { return p[1]; }) }; }
      return null;
    }
    return q;
  }
  function convertMatch(q, T) {
    var out = [];
    q.pairs.forEach(function (p) {
      var L = p[0], R = p[1], x;
      if ((x = /^(\d+) × (\d+)$/.exec(L)) && isN(R)) out.push(eqq(+x[1], +x[2], { v: pic(+x[1], +x[2]) }));
      else if ((x = /^(\d+) (?:groups|rows|jumps|trays|bags) of (\d+)/.exec(L)) && isN(R)) out.push(eqq(+x[1], +x[2], { v: pic(+x[1], +x[2]) }));
      else if ((x = /^(\d+) .*?\((\d+) legs each\)/.exec(L))) out.push(eqq(+x[1], +x[2], { ask: L, v: pic(+x[1], +x[2]) }));
      else if (isN(L) && (x = /^(\d+) × (\d+)$/.exec(R))) out.push(numq(R + '  (write the product)', 'Answer =', +L));
      else if ((x = /^(\d+) .*? with (\d+) .* in each/.exec(L)) && (x = /^(\d+) × (\d+)$/.exec(R))) out.push(eqq(+x[1], +x[2], { ask: L }));
      else if (isN(L) && /^\d+ \+ \d+$/.test(R) === false) { /* skip */ }
      else if (isN(R)) out.push(numq(L, 'Answer =', +R));
    });
    return out;
  }
  var RENAME = { tf: ['Fix the Sum', 'Is it right? Work it out and write the correct answer.'], match: ['Write the Answer', 'Work out each one and write your answer.'],
    pop: ['Count & Write', 'Fill in the missing numbers.'], mcq: ['Work It Out', 'Read, think and write your answer.'] };
  function big(q) {
    var o = {}; ['eq', 'ask', 'st', 'a', 'ans', 'top', 'mult', 'seq'].forEach(function (k) { if (q[k] !== undefined) o[k] = q[k]; });
    return /\d{4,}/.test(JSON.stringify(o).replace(/<[^>]*>/g, ''));
  }

  TH.forEach(function (T) {
    var keep = [];
    T.missions.forEach(function (m) {
      var kinds = {}, out = [];
      m.qs.forEach(function (q) {
        if (['tf', 'mcq', 'pop', 'match'].indexOf(q.k) >= 0) kinds[q.k] = 1;
        var r = q.k === 'match' ? convertMatch(q, T) : convert(q, T);
        if (r === null) return;
        (Array.isArray(r) ? r : [r]).forEach(function (z) { out.push(z); });
      });
      var firstKind = Object.keys(kinds)[0];
      if (firstKind && RENAME[firstKind] && !(firstKind === 'mcq' && !/^Spot|Pick/.test(m.title) && !/Which/.test(m.sub || ''))) { m.title = RENAME[firstKind][0]; m.sub = RENAME[firstKind][1]; }
      m.qs = out;
      var real = out.filter(function (q) { return q.k !== 'note'; }).length;
      if (real) keep.push(m);
    });
    T.missions = keep;
  });
})();
