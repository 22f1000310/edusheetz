/* DIVISION SERIES – 10 worksheets covering the Class 3 "Division" concepts.
   All numbers, stories and questions are ORIGINAL. Every answer is calculated by JavaScript from the numbers,
   so the answer can never disagree with the question. Every question is "write your answer" (no guessing). */
(function () {
  'use strict';
  var P = window.P;

  /* ---------- helpers ---------- */
  function chk(a, b) { if (b === 0 || (a % b) !== 0) throw new Error('not exact: ' + a + ' ÷ ' + b); }
  function d(a, b, o) { chk(a, b); return Object.assign({ k: 'num', eq: a + ' ÷ ' + b + ' =', a: a / b, ans: a + ' ÷ ' + b + ' = ' + (a / b), _d: [a, b] }, o || {}); }
  function dr(a, b, o) { var q = Math.floor(a / b), r = a % b; return Object.assign({ k: 'fill', wide: true, eq: a + ' ÷ ' + b + ':    quotient = {}    remainder = {}', a: [q, r], _dr: [a, b] }, o || {}); }
  function f(eq, a, o) { return Object.assign({ k: 'fill', wide: true, eq: eq, a: a }, o || {}); }
  function w(ask, a, label, o) { return Object.assign({ k: 'num', wide: true, ask: ask, eq: label || 'Answer =', a: a, ans: String(a) }, o || {}); }
  function D(ask, a, b, label, grp) { chk(a, b); return w(ask, a / b, label, { ans: a + ' ÷ ' + b + ' = ' + (a / b), _w: [a, b, grp ? 1 : 0] }); }
  function seq(list, a, ans) { return { k: 'seq', wide: true, seq: list, a: a, ans: ans }; }
  function note(t) { return { k: 'note', ask: t }; }
  function M(emoji, title, sub, qs, tag) { var m = { emoji: emoji, title: title, sub: sub, qs: qs }; if (tag === true) m.extra = true; else if (tag) m.book = tag; return m; }
  var X = true;
  // repeated subtraction chain: 20 → {} → {} → …  times = {}  so 20 ÷ 4 = {}
  function rs(a, b) {
    chk(a, b); var t = a / b, bl = [], ans = [], cur = a, i;
    for (i = 0; i < t; i++) { cur -= b; ans.push(cur); bl.push('{}'); }
    ans.push(t, t);
    return f(a + '  →  ' + bl.join('  →  ') + '    (take away ' + b + ' each time)    ·    times taken away = {}    so    ' + a + ' ÷ ' + b + ' = {}', ans, { _rs: [a, b] });
  }
  function hb(ask, a, b) { chk(a, b); return w(ask, a / b, 'Hops =', { ans: a + ' ÷ ' + b + ' = ' + (a / b), _hb: [a, b] }); }
  function fam(a, b) { return f('Family of ' + a + ', ' + b + ' and ' + (a * b) + ':    ' + a + ' × ' + b + ' = {}    ·    ' + b + ' × ' + a + ' = {}    ·    ' + (a * b) + ' ÷ ' + a + ' = {}    ·    ' + (a * b) + ' ÷ ' + b + ' = {}', [a * b, a * b, b, a], { _fam: [a, b] }); }
  function um(a, b) { return f(a + ' × ' + b + ' = ' + (a * b) + ',   so   ' + (a * b) + ' ÷ ' + a + ' = {}', [b], { _um: [a, b] }); }
  function sw(total, groups, what) { chk(total, groups); return f(total + ' ' + (what || 'things') + ' shared among ' + groups + ' friends:    ' + total + ' ÷ {} = {}', [groups, total / groups], { _sw: [total, groups] }); }
  function sp(a, b) { // split into tens + ones
    var t = Math.floor(a / 10) * 10, o = a % 10; chk(t, b); chk(o, b);
    return f(a + ' ÷ ' + b + ' = (' + t + ' ÷ ' + b + ') + (' + o + ' ÷ ' + b + ') = {} + {} = {}', [t / b, o / b, a / b], { _pt: [a, b] });
  }
  function sp3(a, b) { // split into hundreds + tens + ones
    var h = Math.floor(a / 100) * 100, t = Math.floor(a / 10) % 10 * 10, o = a % 10; chk(h, b); chk(t, b); chk(o, b);
    return f(a + ' ÷ ' + b + ' = (' + h + ' ÷ ' + b + ') + (' + t + ' ÷ ' + b + ') + (' + o + ' ÷ ' + b + ') = {} + {} + {} = {}', [h / b, t / b, o / b, a / b], { _pt: [a, b] });
  }
  function ld(a, b) { chk(a, b); return d(a, b, { v: P.ldiv(a, b) }); }
  function ldr(a, b) { return dr(a, b, { v: P.ldiv(a, b) }); }
  function DR(story, a, b, ask) { return f(story + '    ' + (ask || 'Each gets {}  and  {} are left over'), [Math.floor(a / b), a % b], { _wr: [a, b, story] }); }
  // split into any number of places (thousands, hundreds, tens, ones); every part must divide exactly
  function spp(a, b) {
    var str = String(a), parts = [], i; for (i = 0; i < str.length; i++) { var v = +str[i] * Math.pow(10, str.length - 1 - i); if (v) { chk(v, b); parts.push(v); } }
    return f(a + ' ÷ ' + b + ' = ' + parts.map(function (p) { return '(' + p + ' ÷ ' + b + ')'; }).join(' + ') + ' = ' + parts.map(function () { return '{}'; }).join(' + ') + ' = {}',
      parts.map(function (p) { return p / b; }).concat([a / b]), { _pt: [a, b] });
  }
  // guided long division: every step is typed (digit by digit)
  function lds(a, b) {
    var str = String(a), cur = 0, started = false, steps = [], ans = [], quo = '', i;
    for (i = 0; i < str.length; i++) {
      cur = cur * 10 + (+str[i]);
      var qd = Math.floor(cur / b), r = cur % b;
      if (!started && qd === 0 && i < str.length - 1) continue;     // leading digits that are too small
      started = true;
      steps.push((steps.length ? 'bring down ' + str[i] + ' → ' : 'start with ') + cur + ' ÷ ' + b + ' = {} , left {}');
      ans.push(qd, r); quo += qd; cur = r;
    }
    return f('Long division  ' + a + ' ÷ ' + b + ':    ' + steps.map(function (t, k) { return 'Step ' + (k + 1) + ': ' + t; }).join('    ·    '), ans, { v: P.ldiv(a, b), _lds: 1 });
  }
  function frm(a, b) { var q = Math.floor(a / b), r = a % b; return f('Dividend = quotient × divisor + remainder:     ' + a + ' = {} × ' + b + ' + {}', [q, r], { _fr: [a, b] }); }

  /* ---------- pictures: every question that can show a picture gets a different one ---------- */
  function decorate(T) {
    T.missions.forEach(function (m) {
      m.qs.forEach(function (q) {
        var e = P.emo(), x;
        if (q.v) return;
        if (q._d) {
          var a = q._d[0], b = q._d[1];
          if (a === 0) q.v = '<div class="pile">🫙 nothing to share!</div>';
          else if (a <= 30 && b <= 10) q.v = P.share(e, a, b);
          else if (a > 30 && b >= 2 && b <= 10) q.v = P.family(b, '?', a);
        }
        if (q._dr) { var a2 = q._dr[0], b2 = q._dr[1]; q.v = a2 <= 30 ? P.share(e, a2, b2) : P.parts(a2, b2); }
        if (q._w) {
          var a3 = q._w[0], b3 = q._w[1], we = P.kw(q.ask);
          if (a3 <= 30 && q._w[2]) q.v = P.pile(we, a3);
          else if (a3 <= 30) q.v = P.share(we, a3, b3);
          else if (a3 <= 60 && q._w[2]) q.v = P.pile(we, a3);
          else if (a3 > 30 && b3 <= 9) q.v = P.parts(a3, b3);
        }
        if (q._hb) q.v = P.numback(q._hb[0], q._hb[1], '🐇');
        if (q._rs) q.v = P.pile(e, q._rs[0]);
        if (q._fam) q.v = P.family(q._fam[0], q._fam[1], '?');
        if (q._um) q.v = P.pic(e, q._um[0], q._um[1]);
        if (q._sw) q.v = P.share(e, q._sw[0], q._sw[1]);
        if (q._pt) q.v = P.parts(q._pt[0], q._pt[1]);
        if (q._wr) { var a4 = q._wr[0], b4 = q._wr[1]; q.v = a4 <= 40 ? P.share(P.kw(q._wr[2]), a4, b4) : P.parts(a4, b4); }
        if (q._fr) q.v = q._fr[0] <= 40 ? P.share(e, q._fr[0], q._fr[1]) : P.parts(q._fr[0], q._fr[1]);
      });
    });
  }
  function theme(o) {
    var base = { wave: 'triangle', burst: { list: ['⭐', '✨'], mode: 'burst' }, fx: { list: ['⭐', '🎉', '✨'], mode: 'fall' },
      oops: ['Oops! Look again 👀', 'Almost! Try once more 💪', 'Check your sharing 🔍'], series: 'book', topic: 'division', style: 'soft', wave: 'sine' };
    Object.keys(o).forEach(function (k) { base[k] = o[k]; });
    decorate(base);
    window.THEMES.push(base);
  }

  /* 1 ───────── SUNNY SQUIRREL – sharing equally, equal groups, parts of a division ───────── */
  theme({
    id: 'squirrel', title: "Sunny Squirrel's Acorn Share", mascot: '🐿️', name: 'Sunny', emoji: '🌰',
    tagline: 'Share acorns equally and meet the parts of a division: dividend, divisor and quotient!',
    tags: ['Sharing'], skills: ['Core concept', 'Equal groups', 'Word problems'], tables: [2, 3, 4, 5, 6, 7, 8, 9],
    c1: '#E8913A', c2: '#FFE0B8', bg: '#FFF5E8', palette: ['#E8913A', '#2FA8FF', '#3AA655', '#E0559E', '#7B4DFF', '#F2B705'],
    deco: '🐿️🌰🍂🌳🍁🐿️', widget: { type: 'bar', label: '🐿️ Tree', runner: '🐿️', goal: '🌰' },
    hi: "Hi! I'm Sunny. Let's share fairly!",
    cheers: ['Nutty! Correct! 🌰', 'Fair share! 🐿️', 'Squirrel-tastic! ⭐', 'Acorn-azing! 🍂', 'You shared it right! 🎉'],
    win: 'Sunny says: everybody got a fair share – brilliant!',
    covers: 'what division means (sharing equally and making equal groups), reading the ÷ sign, and the parts: dividend, divisor and quotient. All new numbers ✅',
    learn: { tags: ['1 · Share', '2 · Read it', '3 · Parts'], steps: [
      { v: P.share('🌰', 12, 3, { filled: true }), cap: '12 acorns shared equally on 3 plates: 4 on each plate.' },
      { big: '12 ÷ 3 = 4', cap: 'We read it: 12 divided by 3 is 4. The sign ÷ is called an obelus.' },
      { big: 'dividend ÷ divisor = quotient', cap: '12 is shared (dividend) among 3 (divisor). Each gets 4 (quotient).' }],
      shortcut: '⚡ <mark>Dividend</mark> ÷ <mark>Divisor</mark> = <mark>Quotient</mark>' },
    missions: [
      M('🌰', 'Share the Acorns', 'Share the pile equally on the plates. How many on each plate?', [d(14, 2), d(20, 4), d(9, 3), d(25, 5), d(18, 2), d(16, 4), d(12, 6), d(21, 7), d(32, 8), d(27, 3), d(40, 5), d(36, 9)], 'Sharing equally'),
      M('🧺', 'Fill the Baskets', 'Put the same number in every basket. How many baskets can you fill?', [
        D('Sunny has 20 acorns. She puts 5 acorns in each basket. How many baskets does she fill?', 20, 5, 'Baskets =', 1),
        D('There are 18 pine cones. Each nest gets 6 cones. How many nests get cones?', 18, 6, 'Nests =', 1),
        D('Sunny has 24 nuts and puts 8 in each hole. How many holes does she fill?', 24, 8, 'Holes =', 1)], 'Making equal groups'),
      M('🔤', 'Name the Parts', 'Dividend, divisor, quotient – can you spot them?', [
        f('In 35 ÷ 7 = 5:    dividend = {}  ·  divisor = {}  ·  quotient = {}', [35, 7, 5]), f('In 28 ÷ 4 = 7:    dividend = {}  ·  divisor = {}  ·  quotient = {}', [28, 4, 7]),
        f('In 45 ÷ 9 = 5:    dividend = {}  ·  divisor = {}  ·  quotient = {}', [45, 9, 5]), f('In 63 ÷ 7 = 9:    dividend = {}  ·  divisor = {}  ·  quotient = {}', [63, 7, 9]),
        note('Think of a real-life time when you share things equally. Tell your friend!')], 'Parts of a division'),
      M('✍️', 'Write the Sum', 'Read the story. Finish the division sum.', [sw(16, 4), sw(21, 3), sw(30, 5), sw(12, 2)], 'Writing a division sum'),
      M('🧩', 'Acorn Riddles', 'Work backwards to find the secret number.', [
        w('I am shared equally among 3 friends. Each friend gets 6. What number am I?', 18, 'I am ', { ans: '18 ÷ 3 = 6, so I am 18' }),
        w('I am shared equally among 4 friends. Each friend gets 5. What number am I?', 20, 'I am ', { ans: '20 ÷ 4 = 5, so I am 20' }),
        w('I am shared equally among 5 friends. Each friend gets 7. What number am I?', 35, 'I am ', { ans: '35 ÷ 5 = 7, so I am 35' })], X),
      M('🏆', 'Acorn Boss', 'The big share!', [D('Sunny has 36 acorns to share equally among 4 friends. How many acorns does each friend get?', 36, 4, 'Each gets =')], X)
    ]
  });

  /* 2 ───────── HOPPER HARE – number line and repeated subtraction ───────── */
  theme({
    id: 'hare', title: "Hopper Hare's Number-Line Hops", mascot: '🐇', name: 'Hopper', emoji: '🥕',
    tagline: 'Hop back along the number line and take away again and again – that is division!',
    tags: ['Number line'], skills: ['Core concept', 'Number line', 'Skip counting'], tables: [3, 4, 5, 6, 7, 9],
    c1: '#5B8DEF', c2: '#CFE0FF', bg: '#EEF4FF', palette: ['#5B8DEF', '#E8913A', '#3AA655', '#E0559E', '#7B4DFF', '#F2B705'],
    deco: '🐇🥕🌼🐞🌿🐇', widget: { type: 'bar', label: '🐇 Hops', runner: '🐇', goal: '🥕' },
    hi: "Hi! I'm Hopper. Let's hop back to zero!",
    cheers: ['Hop hop hooray! 🐇', 'Carrot-tastic! 🥕', 'Springy! ⭐', 'Bunny-brilliant! 🎉', 'Right on the line! ✨'],
    win: 'Hopper says: you hopped all the way back to zero – amazing!',
    covers: 'division on the number line (jumping back to zero) and division as repeated subtraction. All new numbers ✅',
    learn: { tags: ['1 · Hop back', '2 · Take away', '3 · Count'], steps: [
      { v: P.numback(18, 6, '🐇'), cap: 'Start at 18. Hop back 6 at a time until you reach 0.' },
      { big: '18 − 6 − 6 − 6 = 0', cap: 'Taking away 6 again and again is repeated subtraction.' },
      { big: '18 ÷ 6 = 3', cap: 'We took away 6 three times. Number of hops = the answer.' }],
      shortcut: '⚡ Count the hops back to <mark>0</mark> = the <mark>quotient</mark>' },
    missions: [
      M('🐇', 'Hop Back to Zero', 'Count the hops. How many hops get you to 0?', [
        d(16, 4, { v: P.numback(16, 4, '🐇') }), d(15, 3, { v: P.numback(15, 3, '🐇') }), d(24, 6, { v: P.numback(24, 6, '🐇') }), d(14, 7, { v: P.numback(14, 7, '🐇') }), d(27, 9, { v: P.numback(27, 9, '🐇') }), d(20, 5, { v: P.numback(20, 5, '🐇') }), d(18, 2, { v: P.numback(18, 2, '🐇') }), d(10, 5, { v: P.numback(10, 5, '🐇') }), d(21, 7, { v: P.numback(21, 7, '🐇') }), d(30, 6, { v: P.numback(30, 6, '🐇') }), d(8, 2, { v: P.numback(8, 2, '🐇') })], 'Division on the number line'),
      M('🔢', 'Count the Hops', 'Hopper starts on a number and hops back to 0.', [
        hb('Hopper starts at 21 and hops back 3 at a time. How many hops does she need to reach 0?', 21, 3), hb('Hopper starts at 28 and hops back 4 at a time. How many hops to reach 0?', 28, 4),
        hb('Hopper starts at 30 and hops back 5 at a time. How many hops to reach 0?', 30, 5)], 'Counting hops on a number line'),
      M('➖', 'Take Away Again and Again', 'Keep subtracting the same number until you reach 0.', [rs(18, 3), rs(24, 4), rs(28, 7), rs(27, 9), rs(36, 6), rs(32, 8), rs(40, 5), rs(45, 9)], 'Division as repeated subtraction'),
      M('🪜', 'Count Back Steps', 'Fill in the missing numbers as you count back.', [
        seq([40, 35, null, 25, null, 15, null, 5, 0], [30, 20, 10], '40, 35, 30, 25, 20, 15, 10, 5, 0 (back by 5s)'), seq([21, 18, null, 12, null, 6, 3, 0], [15, 9], '21, 18, 15, 12, 9, 6, 3, 0 (back by 3s)')], 'Counting back in equal steps'),
      M('🕵️', 'Number-Line Detective', 'Work backwards to find where Hopper started.', [
        w('Hopper hopped back 4 times and landed on 0. Each hop was 5 steps long. Where did she start?', 20, 'Start at ', { ans: '4 hops × 5 steps = 20' }),
        w('Hopper hopped back 6 times and landed on 0. Each hop was 3 steps long. Where did she start?', 18, 'Start at ', { ans: '6 hops × 3 steps = 18' })], X),
      M('🏆', 'Carrot Path Boss', 'The long hop!', [D('A carrot path is 30 steps long. Hopper hops 6 steps at a time. How many hops does she need to reach the end?', 30, 6, 'Hops =', 1)], X)
    ]
  });

  /* 3 ───────── FIONA FOX – fact families / division with the tables ───────── */
  theme({
    id: 'fox', title: "Fiona Fox's Fact Families", mascot: '🦊', name: 'Fiona', emoji: '🍂',
    tagline: 'Division is multiplication backwards! Meet the fact families and divide with every table.',
    tags: ['Tables'], skills: ['Core concept', 'Skip counting', 'Games & puzzles'], tables: [2, 3, 4, 5, 6, 7, 8, 9, 10],
    c1: '#F26B3A', c2: '#FFD3BF', bg: '#FFF0EA', palette: ['#F26B3A', '#2FA8FF', '#3AA655', '#E0559E', '#7B4DFF', '#F2B705'],
    deco: '🦊🍂🌲🍄🍁🦊', widget: { type: 'bar', label: '🦊 Den', runner: '🦊', goal: '🏡' },
    hi: "Hi! I'm Fiona. Every fact has a family!",
    cheers: ['Fox-tastic! 🦊', 'Family fun! 🍂', 'Clever fox! ⭐', 'Right on the trail! 🌲', 'Brilliant! 🎉'],
    win: 'Fiona says: you know every fact family – wonderful!',
    covers: 'division as the reverse of multiplication, fact families, and division with every table from 2 to 10. All new numbers ✅',
    learn: { tags: ['1 · Family', '2 · Undo', '3 · Two facts'], steps: [
      { v: P.family(5, 6, 30), cap: '5, 6 and 30 are a family: 5 × 6 = 30 and 6 × 5 = 30.' },
      { big: '30 ÷ 5 = 6', cap: 'Division undoes multiplication. 5 × 6 = 30, so 30 ÷ 5 = 6.' },
      { big: '30 ÷ 6 = 5', cap: 'One family gives two multiplication facts and two division facts.' }],
      shortcut: '⚡ If <mark>5 × 6 = 30</mark> then <mark>30 ÷ 5 = 6</mark> and <mark>30 ÷ 6 = 5</mark>' },
    missions: [
      M('🔺', 'Family Triangles', 'Finish the whole fact family.', [fam(3, 8), fam(7, 6), fam(9, 4), fam(5, 7), fam(2, 9)], 'Fact families'),
      M('↩️', 'Undo the Multiplication', 'Use the multiplication fact to find the division fact.', [um(7, 6), um(4, 9), um(8, 5), um(3, 7), um(6, 8)], 'Division is the reverse of multiplication'),
      M('➗', 'Divide by 2, 3, 4 and 5', 'Use the tables you know.', [d(6, 2), d(16, 2), d(10, 2), d(18, 2), d(12, 3), d(21, 3), d(27, 3), d(6, 3), d(24, 4), d(12, 4), d(32, 4), d(36, 4), d(35, 5), d(20, 5), d(45, 5), d(30, 5)], 'Division with tables 2 to 5'),
      M('➗', 'Divide by 6, 7, 8, 9 and 10', 'Use the tables you know.', [d(48, 6), d(30, 6), d(18, 6), d(54, 6), d(28, 7), d(63, 7), d(42, 7), d(49, 7), d(40, 8), d(56, 8), d(72, 8), d(24, 8), d(54, 9), d(72, 9), d(36, 9), d(63, 9), d(40, 10), d(70, 10), d(90, 10), d(60, 10)], 'Division with tables 6 to 10'),
      M('📖', 'Story Facts', 'Write the division fact and the multiplication fact for each story.', [
        f('24 pencils are put equally into 4 boxes.    Division fact:  {} ÷ {} = {}    Multiplication fact:  {} × {} = {}', [24, 4, 6, 6, 4, 24]),
        f('45 sweets are packed equally in 5 bags.    Division fact:  {} ÷ {} = {}    Multiplication fact:  {} × {} = {}', [45, 5, 9, 9, 5, 45]),
        f('56 wheels are fitted on cars with 4 wheels each, so we have 14 cars.    Division fact:  {} ÷ {} = {}    Multiplication fact:  {} × {} = {}', [56, 4, 14, 14, 4, 56]),
        f('63 stickers are shared among 7 children.    Division fact:  {} ÷ {} = {}    Multiplication fact:  {} × {} = {}', [63, 7, 9, 9, 7, 63])], 'Division fact and multiplication fact from a story'),
      M('❓', 'Missing Number', 'Find the missing number in each fact.', [
        f('{} × 4 = 28    so    28 ÷ 4 = {}', [7, 7]), f('{} × 9 = 45    so    45 ÷ 9 = {}', [5, 5]), f('{} × 6 = 54    so    54 ÷ 6 = {}', [9, 9]), f('{} × 7 = 56    so    56 ÷ 7 = {}', [8, 8])], X),
      M('🏆', 'Den Boss', 'The last family!', [D('Fiona has 48 berries. She puts 6 berries in each bowl. How many bowls does she fill?', 48, 6, 'Bowls =', 1)], X)
    ]
  });

  /* 4 ───────── ZIPPY ZEBRA – properties of division (÷1, ÷ itself, 0 ÷) ───────── */
  theme({
    id: 'zebra', title: "Zippy Zebra's Zero & One Rules", mascot: '🦓', name: 'Zippy', emoji: '🦓',
    tagline: 'Three zippy rules: divide by 1, divide a number by itself, and divide zero!',
    tags: ['Rules'], skills: ['Core concept', 'Games & puzzles', 'Equal groups'], tables: [1],
    c1: '#5B6C8F', c2: '#D9E1F2', bg: '#EEF2FA', palette: ['#5B6C8F', '#E8913A', '#3AA655', '#E0559E', '#2FA8FF', '#F2B705'],
    deco: '🦓🌾☀️🌳🦓🌾', widget: { type: 'bar', label: '🦓 Dash', runner: '🦓', goal: '🏁' },
    hi: "Hi! I'm Zippy. Three rules make division zoom!",
    cheers: ['Zippy-zoom! 🦓', 'Stripe-tacular! ⭐', 'Rule master! 🏁', 'Super fast! 💨', 'You got it! 🎉'],
    win: 'Zippy says: you know all three rules – zoom zoom!',
    covers: 'the properties of division: any number ÷ 1 stays the same, any number ÷ itself is 1, and 0 ÷ any number is 0. All new numbers ✅',
    learn: { tags: ['1 · ÷ 1', '2 · ÷ itself', '3 · 0 ÷'], steps: [
      { v: P.share('🍎', 5, 1, { filled: true }), cap: '5 apples on 1 plate: all 5 stay together. 5 ÷ 1 = 5.' },
      { v: P.share('🍎', 4, 4, { filled: true }), cap: '4 apples on 4 plates: 1 each. 4 ÷ 4 = 1.' },
      { big: '0 ÷ any number = 0', cap: 'Nothing to share means nothing on every plate.' }],
      shortcut: '⚡ <mark>÷ 1</mark> = same · <mark>÷ itself</mark> = 1 · <mark>0 ÷</mark> = 0' },
    missions: [
      M('1️⃣', 'One Plate', 'Share with just 1 plate. What do you get?', [d(7, 1), d(12, 1), d(25, 1), d(48, 1), d(63, 1)], 'Dividing by 1'),
      M('🟰', 'Same Number', 'Share a number among that many plates.', [d(3, 3), d(8, 8), d(15, 15), d(26, 26), d(57, 57)], 'Dividing a number by itself'),
      M('0️⃣', 'Nothing to Share', 'There is nothing in the pile!', [d(0, 4), d(0, 9), d(0, 17), d(0, 60)], 'Dividing zero'),
      M('🔀', 'Rule Mix-Up', 'Which rule do you need?', [d(19, 19), d(0, 8), d(54, 1), d(33, 33), d(0, 25), d(71, 1)], 'Zero and one rules together'),
      M('📦', 'Fill the Boxes', 'Use the rules to fill the missing numbers.', [f('0 ÷ 29 = {}', [0]), f('{} ÷ 52 = 1', [52]), f('63 ÷ {} = 63', [1]), f('{} ÷ 44 = 0', [0]), f('78 ÷ {} = 1', [78]), f('84 ÷ 84 = {}', [1]), f('{} ÷ 1 = 95', [95]), f('0 ÷ 307 = {}', [0])], 'Properties of division: missing numbers'),
      M('🧩', 'Zebra Stripes', 'Find the missing number.', [f('{} ÷ 1 = 14', [14]), f('{} ÷ 26 = 1', [26]), f('{} ÷ 1 = 39', [39]), f('{} ÷ 52 = 1', [52])], X),
      M('🏆', 'Dash Boss', 'The final dash!', [D('Zippy has 18 sweets and shares them among 18 friends. How many sweets does each friend get?', 18, 18, 'Each gets =')], X)
    ]
  });

  /* 5 ───────── MAX MONKEY – 2-digit ÷ 1-digit, no remainder ───────── */
  theme({
    id: 'monkey', title: "Max Monkey's Tens & Ones Split", mascot: '🐵', name: 'Max', emoji: '🍌',
    tagline: 'Split a 2-digit number into tens and ones, then share each part – or try long division!',
    tags: ['2-digit'], skills: ['Core concept', 'Place value', 'Games & puzzles'], tables: [2, 3, 4, 5, 6, 7, 8],
    c1: '#B9772E', c2: '#F3D9B5', bg: '#FBF3E6', palette: ['#B9772E', '#3AA655', '#2FA8FF', '#E0559E', '#7B4DFF', '#F2B705'],
    deco: '🐵🍌🌴🥥🌿🐵', widget: { type: 'bar', label: '🐵 Jungle', runner: '🐵', goal: '🍌' },
    hi: "Hi! I'm Max. Let's split and share!",
    cheers: ['Ooh ooh ah ah! 🐵', 'Banana-tastic! 🍌', 'Jungle genius! ⭐', 'Swing and a hit! 🌴', 'You split it right! 🎉'],
    win: 'Max says: you split and shared like a champion!',
    covers: '2-digit ÷ 1-digit with no remainder: splitting into tens and ones (method 1) and long division (method 2), with a check by multiplying. All new numbers ✅',
    learn: { tags: ['1 · Split', '2 · Share', '3 · Join'], steps: [
      { v: P.parts(84, 4), cap: '84 = 80 + 4. Share each part among 4.' },
      { big: '80 ÷ 4 = 20  ·  4 ÷ 4 = 1', cap: 'Divide the tens, then divide the ones.' },
      { big: '20 + 1 = 21', cap: 'Join the answers: 84 ÷ 4 = 21.' }],
      shortcut: '⚡ <mark>Split</mark> into tens + ones, <mark>divide</mark> each, then <mark>add</mark>' },
    missions: [
      M('✂️', 'Split & Share 1', 'Split into tens and ones, share each part, then add.', [sp(66, 3), sp(88, 4), sp(96, 3), sp(55, 5)], 'Splitting into tens and ones (method 1)'),
      M('✂️', 'Split & Share 2', 'Same trick – new numbers!', [sp(64, 2), sp(93, 3), sp(86, 2), sp(99, 3)], 'Splitting into tens and ones (method 1)'),
      M('🌴', 'Long Division Jungle', 'Use long division. How many in each group?', [ld(52, 4), ld(75, 5), ld(91, 7), ld(78, 6), ld(96, 8), ld(85, 5), ld(65, 5), ld(72, 4), ld(58, 2), ld(74, 2), ld(51, 3), ld(87, 3), ld(76, 4), ld(92, 4), ld(95, 5), ld(90, 5), ld(84, 6), ld(96, 6), ld(98, 7), ld(88, 8), ld(99, 9), ld(90, 9)], 'Long division (method 2)'),
      M('🪜', 'Long Division Steps', 'Follow the steps digit by digit.', [lds(84, 3), lds(95, 5), lds(72, 6), lds(91, 7), lds(68, 4), lds(76, 2)], 'Long division step by step'),
      M('✔️', 'Multiply to Check', 'Divide, then multiply back to check.', [f('Check it:    68 ÷ 4 = {}    and    {} × 4 = 68', [17, 17]), f('Check it:    90 ÷ 6 = {}    and    {} × 6 = 90', [15, 15]), f('Check it:    84 ÷ 7 = {}    and    {} × 7 = 84', [12, 12])], 'Checking with multiplication'),
      M('🍌', 'Banana Bunches', 'Banana stories!', [
        D('Max has 72 bananas. He shares them equally among 6 monkeys. How many bananas does each monkey get?', 72, 6, 'Each gets ='),
        D('A basket holds 8 coconuts. How many baskets are needed for 56 coconuts?', 56, 8, 'Baskets =', 1)], X),
      M('🏆', 'Jungle Boss', 'The final swing!', [D('Max picks 84 mangoes and packs them in bags of 7. How many bags does he fill?', 84, 7, 'Bags =', 1)], X)
    ]
  });

  /* 6 ───────── RUBY RABBIT – 2-digit ÷ 1-digit with remainder ───────── */
  theme({
    id: 'rabbit', title: "Ruby Rabbit's Left-Overs", mascot: '🐰', name: 'Ruby', emoji: '🥕',
    tagline: 'What if the sharing is not fair? Learn about left-overs – the remainder!',
    tags: ['Remainder'], skills: ['Core concept', 'Equal groups', 'Games & puzzles'], tables: [3, 4, 5, 6, 7, 8, 9],
    c1: '#E0559E', c2: '#FFD3E8', bg: '#FFEEF6', palette: ['#E0559E', '#2FA8FF', '#3AA655', '#E8913A', '#7B4DFF', '#F2B705'],
    deco: '🐰🥕🌷🦋🌼🐰', widget: { type: 'bar', label: '🐰 Garden', runner: '🐰', goal: '🥕' },
    hi: "Hi! I'm Ruby. Sometimes there are left-overs!",
    cheers: ['Bunny-brilliant! 🐰', 'Left-over legend! 🥕', 'Hoppy answer! ⭐', 'Perfect! 🌷', 'You got it! 🎉'],
    win: 'Ruby says: you can handle every left-over – hooray!',
    covers: 'division with a remainder: what a remainder is, why it is always smaller than the divisor, and 2-digit ÷ 1-digit with a remainder. All new numbers ✅',
    learn: { tags: ['1 · Share', '2 · Left-over', '3 · The rule'], steps: [
      { v: P.share('🥕', 14, 4, { filled: true }), cap: '14 carrots on 4 plates: 3 on each plate and 2 left over.' },
      { big: '14 ÷ 4 = 3 remainder 2', cap: 'The left-over carrots are called the remainder.' },
      { big: 'remainder < divisor', cap: 'The remainder is always smaller than the divisor – or we could give everyone one more!' }],
      shortcut: '⚡ The <mark>remainder</mark> is always <mark>smaller</mark> than the divisor' },
    missions: [
      M('🥕', 'Share & Count Left-Overs', 'Share the pile on the plates. How many on each plate – and how many left over?', [dr(17, 5), dr(11, 3), dr(23, 4), dr(19, 6), dr(26, 8), dr(22, 7)], 'Remainder'),
      M('📏', 'The Left-Over Rule', 'What is the biggest remainder you can get?', [
        f('When we divide by 6, the biggest possible remainder is {}', [5]), f('When we divide by 4, the biggest possible remainder is {}', [3]),
        f('When we divide by 9, the biggest possible remainder is {}', [8]), f('When we divide by 10, the biggest possible remainder is {}', [9])], 'Remainder is smaller than the divisor'),
      M('🌷', 'Long Division with Left-Overs', 'Use long division. Write the quotient and the remainder.', [ldr(38, 5), ldr(47, 6), ldr(59, 8), ldr(62, 7), ldr(75, 4), ldr(83, 6), ldr(91, 4), ldr(94, 9), ldr(37, 2), ldr(85, 2), ldr(50, 3), ldr(77, 3), ldr(59, 4), ldr(86, 4), ldr(48, 5), ldr(93, 5), ldr(88, 6), ldr(96, 7), ldr(61, 8), ldr(99, 8), ldr(57, 9), ldr(89, 9)], '2-digit ÷ 1-digit with remainder'),
      M('🪜', 'Long Division Steps', 'Follow the steps digit by digit. Some leave a left-over!', [lds(53, 4), lds(79, 6), lds(65, 8), lds(87, 5), lds(94, 7), lds(46, 9)], 'Long division with remainder, step by step'),
      M('🤔', 'Exact or Left-Overs?', 'Some sums have no left-overs at all!', [dr(36, 6), dr(40, 7), dr(54, 9), dr(45, 8), dr(63, 7), dr(50, 6)], 'Remainder 0 or more'),
      M('🍪', 'Sharing Stories', 'Share these things equally. How many each – and how many are left?', [
        DR('23 cookies are shared among 5 friends.', 23, 5), DR('31 stickers are shared among 4 friends.', 31, 4), DR('47 marbles are shared among 6 friends.', 47, 6)], X),
      M('🏆', 'Garden Boss', 'The last left-over!', [DR('Ruby has 58 carrots. She puts 9 carrots in each bag.', 58, 9, 'Full bags = {}  and  {} carrots are left')], X)
    ]
  });

  /* 7 ───────── BENNY BEE – 3-digit ÷ 1-digit ───────── */
  theme({
    id: 'bee', title: "Benny Bee's Hundreds Hive", mascot: '🐝', name: 'Benny', emoji: '🍯',
    tagline: 'Share hundreds, tens and ones! Divide 3-digit numbers, with left-overs and zeros too.',
    tags: ['3-digit'], skills: ['Core concept', '3-digit numbers', 'Place value'], tables: [2, 3, 4, 5, 6, 7, 8, 9],
    c1: '#E3A600', c2: '#FFF0A8', bg: '#FFFAE0', palette: ['#E3A600', '#2FA8FF', '#3AA655', '#E0559E', '#7B4DFF', '#E8913A'],
    deco: '🐝🍯🌻🌼🌷🐝', widget: { type: 'bar', label: '🐝 Hive', runner: '🐝', goal: '🍯' },
    hi: "Hi! I'm Benny. Let's share the whole hive!",
    cheers: ['Buzz-tastic! 🐝', 'Honey-good! 🍯', 'Sweet answer! ⭐', 'Bee-autiful! 🌻', 'You got it! 🎉'],
    win: 'Benny says: you divided the whole hive – bee-rilliant!',
    covers: '3-digit ÷ 1-digit: splitting into hundreds, tens and ones, long division, quotients with a zero, and division with a remainder. All new numbers ✅',
    learn: { tags: ['1 · Split', '2 · Share', '3 · Join'], steps: [
      { v: P.parts(396, 3), cap: '396 = 300 + 90 + 6. Share each part among 3.' },
      { big: '100  +  30  +  2', cap: '300 ÷ 3 = 100 · 90 ÷ 3 = 30 · 6 ÷ 3 = 2' },
      { big: '396 ÷ 3 = 132', cap: 'Join the answers. Long division gives the same answer!' }],
      shortcut: '⚡ Divide <mark>hundreds</mark>, then <mark>tens</mark>, then <mark>ones</mark>' },
    missions: [
      M('🐝', 'Split the Hive', 'Split into hundreds, tens and ones. Share each part, then add.', [sp3(284, 2), sp3(639, 3), sp3(484, 4), sp3(555, 5), sp3(936, 3), sp3(848, 4)], 'Splitting hundreds, tens and ones'),
      M('🍯', 'Long Division Hive', 'Use long division. Write the quotient.', [ld(528, 4), ld(735, 5), ld(861, 7), ld(952, 8), ld(582, 6), ld(378, 6), ld(405, 9), ld(639, 9), ld(246, 2), ld(417, 3), ld(372, 3), ld(684, 4), ld(215, 5), ld(912, 6), ld(504, 7), ld(776, 8), ld(837, 9), ld(960, 5)], '3-digit ÷ 1-digit without remainder'),
      M('🪜', 'Long Division Steps', 'Follow the steps digit by digit.', [lds(528, 4), lds(735, 5), lds(618, 6), lds(749, 7), lds(487, 4), lds(815, 7)], 'Long division step by step (3-digit)'),
      M('0️⃣', 'Zero in the Quotient', 'Watch out for a zero in the answer!', [ld(618, 6), ld(749, 7), ld(840, 4), ld(750, 5), ld(906, 3), ld(864, 8), ld(412, 4), ld(650, 5), ld(302, 2), ld(560, 8), ld(930, 3), ld(721, 7)], 'Quotients with a zero'),
      M('🌻', 'Left-Overs in the Hive', 'Write the quotient and the remainder.', [ldr(487, 4), ldr(523, 6), ldr(739, 5), ldr(815, 7), ldr(642, 9), ldr(958, 4), ldr(301, 2), ldr(445, 3), ldr(372, 5), ldr(614, 8), ldr(527, 6), ldr(889, 9), ldr(703, 4), ldr(256, 7)], '3-digit ÷ 1-digit with remainder'),
      M('🥣', 'Split the Hive 2', 'Split into hundreds, tens and ones again!', [spp(426, 2), spp(933, 3), spp(844, 4), spp(655, 5), spp(396, 3), spp(824, 2)], 'Splitting hundreds, tens and ones'),
      M('🍯', 'Honey Stories', 'Hive stories!', [
        D('Benny makes 744 drops of honey. He puts the same number into 6 jars. How many drops go in each jar?', 744, 6, 'Each jar ='),
        D('A beekeeper has 465 bees. She puts 5 bees in each box. How many boxes does she need?', 465, 5, 'Boxes =', 1)], X),
      M('🏆', 'Hive Boss', 'The biggest share!', [D('Benny shares 912 flowers equally among 8 hives. How many flowers does each hive get?', 912, 8, 'Each hive =')], X)
    ]
  });

  /* 8 ───────── CHECK-IT CHEETAH – verifying division ───────── */
  theme({
    id: 'cheetah', title: "Check-It Cheetah's Verify Race", mascot: '🐆', name: 'Cheetah', emoji: '🏁',
    tagline: 'Is the answer right? Check it with multiplication: dividend = quotient × divisor + remainder!',
    tags: ['Checking'], skills: ['Core concept', 'Games & puzzles', 'Word problems'], tables: [4, 5, 6, 7, 8, 9],
    c1: '#14A3A3', c2: '#C5F0EE', bg: '#E8FAF8', palette: ['#14A3A3', '#E8913A', '#3AA655', '#E0559E', '#7B4DFF', '#F2B705'],
    deco: '🐆🏁🌿🌞🌳🐆', widget: { type: 'bar', label: '🐆 Race', runner: '🐆', goal: '🏁' },
    hi: "Hi! I'm Cheetah. I always check my answers!",
    cheers: ['Speedy! 🐆', 'Checked and correct! ✅', 'Fast and right! ⭐', 'Cheetah-tastic! 🏁', 'You got it! 🎉'],
    win: 'Cheetah says: every answer checked and correct – fantastic!',
    covers: 'verifying division using the formula: dividend = quotient × divisor + remainder. All new numbers ✅',
    learn: { tags: ['1 · Formula', '2 · Check', '3 · Picture'], steps: [
      { big: 'Dividend = Quotient × Divisor + Remainder', cap: 'This is the check formula.' },
      { big: '23 ÷ 5 = 4 remainder 3', cap: 'Check: 4 × 5 + 3 = 20 + 3 = 23 ✔' },
      { v: P.share('🥜', 23, 5, { filled: true }), cap: '5 plates, 4 on each, 3 left over: 5 × 4 + 3 = 23.' }],
      shortcut: '⚡ <mark>Quotient × Divisor + Remainder</mark> = <mark>Dividend</mark>' },
    missions: [
      M('📐', 'Fill the Formula', 'Divide, then complete the check formula.', [frm(29, 4), frm(41, 6), frm(52, 8), frm(37, 5), frm(64, 9), frm(78, 7)], 'The check formula'),
      M('✅', 'Check the Cheetah', 'Cheetah did a division. Check it by multiplying.', [
        f('Cheetah says  45 ÷ 7 = 6 remainder 3.    Check:  6 × 7 = {}    then  + 3 = {}', [42, 45]), f('Cheetah says  59 ÷ 8 = 7 remainder 3.    Check:  7 × 8 = {}    then  + 3 = {}', [56, 59]),
        f('Cheetah says  86 ÷ 9 = 9 remainder 5.    Check:  9 × 9 = {}    then  + 5 = {}', [81, 86]), f('Cheetah says  73 ÷ 6 = 12 remainder 1.    Check:  12 × 6 = {}    then  + 1 = {}', [72, 73])], 'Checking a division'),
      M('🔎', 'Find the Dividend', 'Use the formula backwards to find the dividend.', [
        w('The quotient is 9, the divisor is 6 and the remainder is 4. What is the dividend?', 58, 'Dividend =', { ans: '9 × 6 + 4 = 58' }),
        w('The quotient is 12, the divisor is 4 and the remainder is 3. What is the dividend?', 51, 'Dividend =', { ans: '12 × 4 + 3 = 51' }),
        w('The quotient is 15, the divisor is 5 and the remainder is 0. What is the dividend?', 75, 'Dividend =', { ans: '15 × 5 + 0 = 75' }),
        w('The quotient is 7, the divisor is 8 and the remainder is 6. What is the dividend?', 62, 'Dividend =', { ans: '7 × 8 + 6 = 62' })], 'Finding the dividend'),
      M('🏃', 'Divide and Check', 'Divide, then check your own answer.', [
        f('58 ÷ 7:   quotient = {}   remainder = {}    Check:  {} × 7 + {} = 58', [8, 2, 8, 2]), f('83 ÷ 9:   quotient = {}   remainder = {}    Check:  {} × 9 + {} = 83', [9, 2, 9, 2]),
        f('94 ÷ 8:   quotient = {}   remainder = {}    Check:  {} × 8 + {} = 94', [11, 6, 11, 6])], 'Divide and verify'),
      M('🏟️', 'Big Number Check', 'Check bigger divisions with the formula.', [
        frm(3817, 4), frm(2539, 6), frm(7016, 9), frm(4655, 7),
        f('Cheetah says  2535 ÷ 4 = 633 remainder 3.    Check:  633 × 4 = {}    then  + 3 = {}', [2532, 2535]), f('Cheetah says  3817 ÷ 4 = 954 remainder 1.    Check:  954 × 4 = {}    then  + 1 = {}', [3816, 3817])], 'Verifying bigger divisions'),
      M('🔍', 'Number Detective', 'Which number is the dividend, divisor, quotient and remainder?', [
        f('The numbers are 306, 5, 61 and 1  (306 ÷ 5 = 61 remainder 1).    dividend = {}  ·  divisor = {}  ·  quotient = {}  ·  remainder = {}', [306, 5, 61, 1]),
        f('The numbers are 7, 53, 372 and 1  (372 ÷ 7 = 53 remainder 1).    dividend = {}  ·  divisor = {}  ·  quotient = {}  ·  remainder = {}', [372, 7, 53, 1]),
        f('The numbers are 4, 218, 872 and 0  (872 ÷ 4 = 218 remainder 0).    dividend = {}  ·  divisor = {}  ·  quotient = {}  ·  remainder = {}', [872, 4, 218, 0])], 'Dividend, divisor, quotient and remainder puzzles'),
      M('🧩', 'Race Puzzles', 'Find the missing divisor.', [
        w('When 47 is divided by a number, the quotient is 9 and the remainder is 2. What is the divisor?', 5, 'Divisor =', { ans: '9 × 5 + 2 = 47' }),
        w('When 67 is divided by a number, the quotient is 8 and the remainder is 3. What is the divisor?', 8, 'Divisor =', { ans: '8 × 8 + 3 = 67' })], X),
      M('🏆', 'Finish-Line Boss', 'The final check!', [w('Cheetah divides a number by 9. The quotient is 13 and the remainder is 5. What is the number?', 122, 'Number =', { ans: '13 × 9 + 5 = 122' })], X)
    ]
  });

  /* 9 ───────── TINA TIGER – division by 10 ───────── */
  theme({
    id: 'tiger', title: "Tina Tiger's Tens Trick", mascot: '🐯', name: 'Tina', emoji: '🔟',
    tagline: 'A super-quick trick for dividing by 10: the last digit is the remainder!',
    tags: ['÷ 10'], skills: ['Core concept', 'Place value', 'Games & puzzles'], tables: [10],
    c1: '#E5484D', c2: '#FFD0D2', bg: '#FFEFEF', palette: ['#E5484D', '#2FA8FF', '#3AA655', '#E8913A', '#7B4DFF', '#F2B705'],
    deco: '🐯🌴🔟🌿🌞🐯', widget: { type: 'bar', label: '🐯 Jungle', runner: '🐯', goal: '🔟' },
    hi: "Hi! I'm Tina. Dividing by 10 is easy!",
    cheers: ['Roar-some! 🐯', 'Ten-tastic! 🔟', 'Trick master! ⭐', 'Purr-fect! 🌴', 'You got it! 🎉'],
    win: 'Tina says: you know the tens trick – roar!',
    covers: 'division by 10: the quotient is the number without its last digit and the remainder is the last digit. All new numbers ✅',
    learn: { tags: ['1 · Bundles', '2 · The trick', '3 · Hundreds'], steps: [
      { v: P.parts(47, 10), cap: '47 = 4 tens + 7 ones. Make bundles of 10: 4 bundles and 7 left.' },
      { big: '47 ÷ 10 = 4 remainder 7', cap: 'The quotient is the tens part. The remainder is the ones digit.' },
      { big: '238 ÷ 10 = 23 remainder 8', cap: 'Cover the last digit: 23 is the quotient and 8 is the remainder.' }],
      shortcut: '⚡ <mark>Quotient</mark> = number without the last digit · <mark>Remainder</mark> = last digit' },
    missions: [
      M('🔟', 'Bundles of Ten', 'Make bundles of 10. How many bundles – and how many left?', [dr(56, 10), dr(83, 10), dr(29, 10), dr(74, 10), dr(91, 10), dr(38, 10)], 'Dividing 2-digit numbers by 10'),
      M('🙈', 'Hide the Last Digit', 'Cover the last digit to find the answer.', [dr(238, 10), dr(465, 10), dr(709, 10), dr(152, 10), dr(994, 10), dr(380, 10)], 'Dividing 3-digit numbers by 10'),
      M('🏔️', 'Thousands by Ten', 'Cover the last digit of a 4-digit number.', [dr(4829, 10), dr(6143, 10), dr(9020, 10), dr(7585, 10), dr(3306, 10), dr(8914, 10)], 'Dividing 4-digit numbers by 10'),
      M('✨', 'Exact Tens', 'These numbers end in 0, so there is nothing left over.', [d(70, 10), d(240, 10), d(590, 10), d(800, 10), d(310, 10), d(5370, 10), d(2040, 10), d(9900, 10)], 'Dividing multiples of 10 by 10'),
      M('🧮', 'Find the Dividend', 'Work backwards: the dividend = quotient × 10 + remainder.', [
        w('A number divided by 10 gives quotient 63 and remainder 4. What is the number?', 634, 'Number =', { ans: '63 × 10 + 4 = 634' }), w('A number divided by 10 gives quotient 85 and remainder 7. What is the number?', 857, 'Number =', { ans: '85 × 10 + 7 = 857' }),
        w('A number divided by 10 gives quotient 300 and remainder 5. What is the number?', 3005, 'Number =', { ans: '300 × 10 + 5 = 3005' }), w('A number divided by 10 gives quotient 912 and remainder 0. What is the number?', 9120, 'Number =', { ans: '912 × 10 + 0 = 9120' }),
        w('A number divided by 10 gives quotient 48 and remainder 9. What is the number?', 489, 'Number =', { ans: '48 × 10 + 9 = 489' }), w('A number divided by 10 gives quotient 700 and remainder 3. What is the number?', 7003, 'Number =', { ans: '700 × 10 + 3 = 7003' })], 'Finding the dividend when dividing by 10'),
      M('✔️', 'Check the Trick', 'Fill in the numbers to check the formula.', [f('83 ÷ 10 = {} remainder {}    Check:  {} × 10 + {} = 83', [8, 3, 8, 3]), f('467 ÷ 10 = {} remainder {}    Check:  {} × 10 + {} = 467', [46, 7, 46, 7])], 'Checking division by 10'),
      M('📦', 'Ten-Stack Stories', 'Pack things in tens!', [
        DR('A shop packs pencils in boxes of 10. It has 163 pencils.', 163, 10, 'Full boxes = {}  and  {} pencils are left'), DR('A baker puts 10 buns in each tray. She bakes 248 buns.', 248, 10, 'Full trays = {}  and  {} buns are left')], X),
      M('🏆', 'Jungle Boss', 'The last trick!', [D('A farmer packs 570 eggs in cartons of 10. How many cartons does he fill?', 570, 10, 'Cartons =', 1)], X)
    ]
  });

  /* 10 ───────── DAISY DUCK – division word problems ───────── */
  theme({
    id: 'duck', title: "Daisy Duck's Word-Problem Pond", mascot: '🦆', name: 'Daisy', emoji: '💧',
    tagline: 'Read the story, pick division and solve! Sharing, grouping and left-over stories.',
    tags: ['Word problems'], skills: ['Core concept', 'Word problems', 'Equal groups'], tables: [2, 3, 4, 5, 6, 7, 8, 9, 10],
    c1: '#2F9BE0', c2: '#C8E6FA', bg: '#EAF6FF', palette: ['#2F9BE0', '#E8913A', '#3AA655', '#E0559E', '#7B4DFF', '#F2B705'],
    deco: '🦆💧🪷🐸🌿🦆', widget: { type: 'bar', label: '🦆 Pond', runner: '🦆', goal: '🪷' },
    hi: "Hi! I'm Daisy. Let's solve some stories!",
    cheers: ['Quack-tastic! 🦆', 'Splash! Correct! 💧', 'Pond genius! ⭐', 'Wonderful! 🪷', 'You got it! 🎉'],
    win: 'Daisy says: you solved every story – quack quack hooray!',
    covers: 'division word problems: sharing equally, making equal groups, left-over stories and writing the division sum. All new numbers ✅',
    learn: { tags: ['1 · Sharing', '2 · Groups', '3 · Steps'], steps: [
      { v: P.share('🍓', 20, 4, { filled: true }), cap: 'Sharing: 20 strawberries among 4 ducks. 20 ÷ 4 = 5 each.' },
      { v: P.pile('🍓', 12), cap: 'Grouping: bags of 3 from 12 strawberries. 12 ÷ 3 = 4 bags.' },
      { big: 'Read · Pick ÷ · Divide · Check', cap: 'Read the story, decide it is division, divide, then check with multiplication.' }],
      shortcut: '⚡ <mark>Read</mark> · <mark>Pick ÷</mark> · <mark>Divide</mark> · <mark>Check</mark>' },
    missions: [
      M('🍓', 'Share Fairly', 'Share the things equally. How many does each get?', [
        D('Daisy has 32 breadcrumbs for 8 ducklings. Each duckling gets the same. How many does each get?', 32, 8, 'Each gets ='),
        D('A garden has 45 flowers to put in 5 vases equally. How many flowers go in each vase?', 45, 5, 'Each vase ='),
        D('27 stickers are shared equally among 3 children. How many stickers does each child get?', 27, 3, 'Each child ='),
        D('36 marbles are put equally into 6 bags. How many marbles are in each bag?', 36, 6, 'Each bag =')], 'Sharing stories'),
      M('📦', 'How Many Groups?', 'Make equal groups. How many groups can you make?', [
        D('There are 48 pencils. Each pack has 6 pencils. How many packs can you make?', 48, 6, 'Packs =', 1),
        D('There are 45 apples. Each bag holds 5 apples. How many bags are needed?', 45, 5, 'Bags =', 1),
        D('28 children sit in rows of 4. How many rows are there?', 28, 4, 'Rows =', 1),
        D('A shop has 60 candles in packets of 10. How many packets are there?', 60, 10, 'Packets =', 1)], 'Grouping stories'),
      M('🥚', 'Left-Over Stories', 'Some stories have left-overs!', [
        DR('29 eggs go into trays of 6.', 29, 6, 'Full trays = {}  and  {} eggs are left'), DR('43 children get into boats of 5.', 43, 5, 'Full boats = {}  and  {} children are left'),
        DR('50 balloons are tied in bunches of 8.', 50, 8, 'Full bunches = {}  and  {} balloons are left'), DR('67 seeds are planted in rows of 9.', 67, 9, 'Full rows = {}  and  {} seeds are left')], 'Left-over stories'),
      M('✍️', 'Write the Division Sum', 'Fill in the numbers of the division sum.', [sw(20, 4, 'cookies'), sw(18, 6, 'sweets'), sw(24, 3, 'pencils'), sw(35, 7, 'stickers')], 'Writing a division sum from a story'),
      M('🏗️', 'Thousand-Sized Stories', 'Big numbers, same steps!', [
        D('A toy factory makes 5648 toy ducks and packs them equally into 8 boxes. How many ducks are in each box?', 5648, 8, 'Each box ='), D('A farm has 2142 eggs. Each tray holds 6 eggs. How many trays are filled?', 2142, 6, 'Trays =', 1),
        D('A bus company shares 4932 tickets equally among 4 buses. How many tickets does each bus get?', 4932, 4, 'Each bus ='), D('A shop has 1550 pencils. It puts them equally into 10 boxes. How many pencils are in each box?', 1550, 10, 'Each box ='),
        DR('A school has 2879 books. Each shelf holds 5 books.', 2879, 5, 'Full shelves = {}  and  {} books are left'), DR('A baker has 1234 buns. Each box holds 9 buns.', 1234, 9, 'Full boxes = {}  and  {} buns are left')], 'Word problems with 3-digit and 4-digit numbers'),
      M('🏫', 'Big Number Stories', 'Bigger numbers, same steps!', [
        D('A farmer packs 96 eggs into trays of 8. How many trays does he fill?', 96, 8, 'Trays =', 1), D('A school library has 144 books to arrange equally on 6 shelves. How many books go on each shelf?', 144, 6, 'Each shelf =')], X),
      M('🏆', 'Pond Boss', 'The last story!', [D('Daisy’s pond has 126 fish. Equal numbers swim in 7 groups. How many fish are in each group?', 126, 7, 'Each group =')], X)
    ]
  });

  /* 11 ───────── WALLY WALRUS – 4-digit ÷ 1-digit ───────── */
  theme({
    id: 'walrus', title: "Wally Walrus's Thousands Ice", mascot: '🦭', name: 'Wally', emoji: '🧊',
    tagline: 'Big ice blocks! Divide 4-digit numbers by 1-digit numbers – with and without left-overs.',
    tags: ['4-digit'], skills: ['Core concept', '4-digit numbers', 'Place value'], tables: [2, 3, 4, 5, 6, 7, 8, 9],
    c1: '#3E7CB1', c2: '#CFE6F7', bg: '#EAF4FC', palette: ['#3E7CB1', '#E8913A', '#3AA655', '#E0559E', '#7B4DFF', '#F2B705'],
    deco: '🦭🧊❄️🐧🌊🦭', widget: { type: 'bar', label: '🦭 Ice', runner: '🦭', goal: '🧊' },
    hi: "Hi! I'm Wally. Let's break the big ice!",
    cheers: ['Splash! 🦭', 'Ice-tastic! 🧊', 'Cool answer! ⭐', 'Walrus-wonderful! ❄️', 'You got it! 🎉'],
    win: 'Wally says: you divided the biggest numbers – ice work!',
    covers: '4-digit ÷ 1-digit: splitting into thousands, hundreds, tens and ones, long division step by step, quotients with zeros, division with a remainder, and big word problems. All new numbers ✅',
    learn: { tags: ['1 · Split', '2 · Share', '3 · Join'], steps: [
      { v: P.parts(4284, 2), cap: '4284 = 4000 + 200 + 80 + 4. Share each part among 2.' },
      { big: '2000 + 100 + 40 + 2', cap: '4000 ÷ 2 = 2000 · 200 ÷ 2 = 100 · 80 ÷ 2 = 40 · 4 ÷ 2 = 2' },
      { big: '4284 ÷ 2 = 2142', cap: 'Join the answers. Long division gives the same answer!' }],
      shortcut: '⚡ Divide <mark>thousands</mark>, <mark>hundreds</mark>, <mark>tens</mark>, then <mark>ones</mark>' },
    missions: [
      M('🧊', 'Split the Ice', 'Split into thousands, hundreds, tens and ones. Share each part, then add.', [spp(4284, 2), spp(6936, 3), spp(8484, 4), spp(5555, 5), spp(9369, 3), spp(3963, 3)], 'Splitting thousands, hundreds, tens and ones'),
      M('🦭', 'Long Division Ice', 'Use long division. Write the quotient.', [ld(5128, 4), ld(6345, 5), ld(7254, 6), ld(9036, 4), ld(5550, 6), ld(3045, 5), ld(8208, 8), ld(4284, 7), ld(6174, 9), ld(7392, 8)], '4-digit ÷ 1-digit without remainder'),
      M('0️⃣', 'Zero in the Ice', 'Watch out for zeros in the answer!', [ld(4963, 7), ld(6472, 8), ld(8127, 9), ld(7200, 8), ld(3045, 5), ld(2406, 6), ld(5025, 5), ld(8104, 8)], 'Quotients with a zero (4-digit)'),
      M('❄️', 'Left-Overs on the Ice', 'Write the quotient and the remainder.', [dr(4381, 2, { v: P.ldiv(4381, 2) }), ldr(5632, 3), ldr(7845, 4), ldr(6239, 5), ldr(8173, 6), ldr(9456, 7), ldr(5901, 8), ldr(7712, 9)], '4-digit ÷ 1-digit with remainder'),
      M('🪜', 'Long Division Steps', 'Follow the steps digit by digit.', [lds(6384, 3), lds(5208, 4), lds(7012, 7), lds(8765, 5), lds(4927, 6), lds(9013, 8)], 'Long division step by step (4-digit)'),
      M('🐧', 'Penguin Stories', 'Ice stories with big numbers!', [
        D('Wally’s team cuts 7216 ice blocks and packs them equally into 8 trucks. How many blocks are in each truck?', 7216, 8, 'Each truck ='), D('A shop has 1548 fish. It puts 6 fish in each bag. How many bags does it fill?', 1548, 6, 'Bags =', 1),
        DR('3917 snowballs are put in piles of 4.', 3917, 4, 'Full piles = {}  and  {} snowballs are left')], X),
      M('🏆', 'Ice Boss', 'The biggest share!', [D('Wally shares 9072 fish equally among 9 seals. How many fish does each seal get?', 9072, 9, 'Each seal =')], X)
    ]
  });

  /* 12 ───────── OLIVER OWL – mixed review and thinking puzzles ───────── */
  theme({
    id: 'owl', title: "Oliver Owl's Big Review", mascot: '🦉', name: 'Oliver', emoji: '🌙',
    tagline: 'Mix it all up! Every kind of division, multiplication stories and thinking puzzles.',
    tags: ['Review'], skills: ['Core concept', 'Games & puzzles', 'Word problems'], tables: [2, 3, 4, 5, 6, 7, 8, 9, 10],
    c1: '#7B4DFF', c2: '#E2D7FF', bg: '#F3EFFF', palette: ['#7B4DFF', '#E8913A', '#3AA655', '#E0559E', '#2FA8FF', '#F2B705'],
    deco: '🦉🌙⭐🌳🦉⭐', widget: { type: 'bar', label: '🦉 Night', runner: '🦉', goal: '🌙' },
    hi: "Hoo! I'm Oliver. Time for the big review!",
    cheers: ['Hoo-ray! 🦉', 'Wise answer! 🌙', 'Owl-standing! ⭐', 'Brilliant! 🌟', 'You got it! 🎉'],
    win: 'Oliver says: you have mastered division – hoo-ray, wise one!',
    covers: 'a mixed review of the whole division chapter: tables, long division with and without remainders (2, 3 and 4 digits), checking, division by 10, and multiplication-and-division stories and puzzles. All new numbers ✅',
    learn: { tags: ['1 · Tables', '2 · Long division', '3 · Check'], steps: [
      { v: P.family(6, 7, 42), cap: 'Division is multiplication backwards: 42 ÷ 6 = 7.' },
      { v: P.ldiv(96, 4, 24), cap: 'Long division: divide, multiply, subtract, bring down. 96 ÷ 4 = 24.' },
      { big: 'Quotient × Divisor + Remainder = Dividend', cap: 'Always check with multiplication!' }],
      shortcut: '⚡ <mark>Divide</mark> · <mark>Multiply</mark> · <mark>Subtract</mark> · <mark>Bring down</mark>' },
    missions: [
      M('🦉', 'Tables Review', 'A mix of all the tables.', [d(45, 9), d(28, 4), d(72, 8), d(56, 7), d(36, 6), d(30, 10), d(63, 9), d(24, 3), d(35, 5), d(64, 8), d(81, 9), d(42, 6), d(18, 9), d(49, 7), d(80, 10), d(16, 8)], 'Mixed division with tables'),
      M('🌙', 'Mixed Long Division', 'Exact answers – 2, 3 and 4 digits.', [ld(78, 3), ld(95, 5), ld(236, 4), ld(588, 7), ld(702, 9), ld(1296, 6), ld(3504, 8), ld(4572, 9)], 'Mixed long division without remainder'),
      M('⭐', 'Mixed Left-Overs', 'Write the quotient and the remainder.', [ldr(53, 6), ldr(86, 7), ldr(345, 4), ldr(678, 8), ldr(902, 5), ldr(2563, 6), ldr(7005, 9), ldr(5921, 3)], 'Mixed division with remainder'),
      M('✔️', 'Check It', 'Divide, then check with the formula.', [frm(47, 5), frm(386, 7), frm(2907, 8), f('Check:  8 × 9 + 4 = {}    so    the dividend is {}', [76, 76])], 'Verifying division'),
      M('🧠', 'Think and Solve', 'Puzzle time! Follow the clues.', [
        f('A farm has hens (2 legs each) and rabbits (4 legs each). Maria counts 140 legs.  If there are 30 hens: legs of hens = {}  ·  legs left for rabbits = {}  ·  rabbits = {} ÷ 4 = {}', [60, 80, 80, 20]),
        f('Another day Maria counts 100 legs.  If there are 20 hens: legs of hens = {}  ·  legs left = {}  ·  rabbits = {} ÷ 4 = {}', [40, 60, 60, 15]),
        w('I am a number. When I am divided by 6 the quotient is 14 and the remainder is 5. What number am I?', 89, 'I am ', { ans: '14 × 6 + 5 = 89' }),
        w('I am a number. When I am divided by 9 the quotient is 25 and the remainder is 0. What number am I?', 225, 'I am ', { ans: '25 × 9 + 0 = 225' })], 'Thinking puzzles'),
      M('🌳', 'Multiply or Divide?', 'Read each story. Work out the answer.', [
        w('Each mango tree has 210 mangoes. How many mangoes are on 5 such trees?', 1050, 'Mangoes =', { ans: '210 × 5 = 1050' }),
        D('There are 490 chairs in a hall. 10 chairs are in each row. How many rows are there?', 490, 10, 'Rows =', 1),
        w('A box holds 12 jackfruits. How many jackfruits are in 130 boxes?', 1560, 'Jackfruits =', { ans: '12 × 130 = 1560' }),
        D('A baker bakes 936 rolls and packs them equally into 6 bags. How many rolls are in each bag?', 936, 6, 'Each bag =')], X),
      M('🏆', 'Review Boss', 'The final question!', [D('Oliver has 8456 stars to share equally among 8 night skies. How many stars does each sky get?', 8456, 8, 'Each sky =')], X)
    ]
  });
})();
