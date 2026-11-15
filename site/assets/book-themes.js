/* TEXTBOOK SERIES – 11 worksheets built on the concepts of Class 3 Chapter 1 "Multiplication" (book pages 60–71).
   All numbers, stories and questions are ORIGINAL – they teach the same ideas as the book but never reuse its questions.
   Every missions[] entry is either
     book:  '…'  → CORE practice for a concept that appears on that book page (new numbers, every combination), or
     extra: true → EXTRA practice beyond the book (new games: match, count, pop, true/false …).
   Answers are computed by JavaScript from the numbers, so they can never disagree with the question. */
(function () {
  'use strict';
  var P = window.P;

  /* ---------- tiny helpers (they calculate the answers) ---------- */
  function n(a, b, o) { return Object.assign({ k: 'num', eq: a + ' × ' + b + ' =', a: a * b, ans: a + ' × ' + b + ' = ' + (a * b) }, o || {}); }
  function tab(t, order) { return order.map(function (k) { return n(t, k); }); }
  function c(top, mult) { return { k: 'col', top: top, mult: mult }; }
  function f(eq, a, o) { return Object.assign({ k: 'fill', wide: true, eq: eq, a: a }, o || {}); }
  function w(ask, a, label, o) { return Object.assign({ k: 'num', wide: true, ask: ask, eq: label || 'Answer =', a: a, ans: String(a) }, o || {}); }
  function W(ask, x, y, label, o) { var t = x * y; return w(ask, t, label, Object.assign({ ans: x + ' × ' + y + ' = ' + t }, o || {})); }
  function tf(st, a) { return { k: 'tf', st: st, a: a }; }
  function tfm(a, b, off) { return tf(a + ' × ' + b + ' = ' + (a * b + (off || 0)), !off); }
  function mc(ask, opts, a, o) { return Object.assign({ k: 'mcq', wide: true, txt: true, ask: ask, opts: opts, a: a, ans: opts[a] }, o || {}); }
  function mcn(ask, right, wrongs, pos, o) { var x = wrongs.map(String); x.splice(pos, 0, String(right)); return mc(ask, x, pos, o); }
  function prs(list) { return list.map(function (p) { return [p[0] + ' × ' + p[1], String(p[0] * p[1])]; }); }
  function match(pairs) { return { k: 'match', wide: true, pairs: pairs }; }
  function pop(ask, items, good) { return { k: 'pop', wide: true, ask: ask, items: items, good: good }; }
  function cnt(emoji, nn, each, ask, by) { return { k: 'count', wide: true, emoji: emoji, n: nn, each: each, ask: ask, eq: nn + ' × ' + each + ' =', by: by }; }
  function seq(list, a, ans) { return { k: 'seq', wide: true, seq: list, a: a, ans: ans }; }
  function note(t) { return { k: 'note', ask: t }; }
  // fill-in guided methods
  function m1(a, b1, b2) { return f(a + ' × ' + (b1 * b2) + ' = ' + a + ' × (' + b1 + ' × ' + b2 + ') = (' + a + ' × ' + b1 + ') × ' + b2 + ' = {} × ' + b2 + ' = {}', [a * b1, a * b1 * b2]); }
  function m2(a, t, o) { return f(a + ' × ' + (t + o) + ' = ' + a + ' × (' + t + ' + ' + o + ') = (' + a + ' × ' + t + ') + (' + a + ' × ' + o + ') = {} + {} = {}', [a * t, a * o, a * (t + o)]); }
  function zf(d, m, k) { var z = Math.pow(10, k); return f(d * z + ' × ' + m + ' = (' + d + ' × ' + m + ') × ' + z + ' = {} × ' + z + ' = {}', [d * m, d * m * z]); }
  function bu(num, m) { var h = Math.floor(num / 100), t = Math.floor(num / 10) % 10, o = num % 10; return f(num + ' × ' + m + ' = (' + h * 100 + ' × ' + m + ') + (' + t * 10 + ' × ' + m + ') + (' + o + ' × ' + m + ') = {} + {} + {} = {}', [h * 100 * m, t * 10 * m, o * m, num * m]); }
  function ts(top, mult) { var o = mult % 10, t = Math.floor(mult / 10); return f(top + ' × ' + mult + ':   ' + top + ' × ' + o + ' = {}   ·   ' + top + ' × ' + t * 10 + ' = {}   ·   total = {}', [top * o, top * t * 10, top * mult]); }
  function M(emoji, title, sub, qs, tag) { var m = { emoji: emoji, title: title, sub: sub, qs: qs }; if (tag === true) m.extra = true; else if (tag) m.book = tag; return m; }
  var X = true;   // marks an "extra practice" mission

  function theme(o) {
    var base = {
      wave: 'triangle', burst: { list: ['⭐', '✨'], mode: 'burst' }, fx: { list: ['⭐', '🎉', '✨'], mode: 'fall' },
      oops: ['Oops! Look again 👀', 'Almost! Try once more 💪', 'Check your numbers 🔍'], series: 'book'
    };
    Object.keys(o).forEach(function (k) { base[k] = o[k]; });
    window.THEMES.push(base);
  }

  /* 1 ───────── TILLY TURTLE – parts of a multiplication, ×0, ×1, number line (concept of book p.60–61) ───────── */
  theme({
    id: 'turtle', title: "Tilly Turtle's Jump Trail", mascot: '🐢', name: 'Tilly', emoji: '🌿', tagline: 'Meet multiplicand, multiplier and product – then jump along the number line!',
    tags: ['Number line'], skills: ['Book chapter', 'Number line', 'Games & puzzles'], tables: [2, 3, 4, 5, 6], pages: 'p.60–61',
    c1: '#2FB98B', c2: '#B7F0D5', bg: '#E4F9EF', style: 'soft', wave: 'sine',
    palette: ['#2FB98B', '#2F9BE0', '#F29F1C', '#7B4DFF', '#E0559E', '#3AA655'],
    deco: '🐢🌿🪷🐸🌿🐢', widget: { type: 'bar', label: '🐢 Trail', runner: '🐢', goal: '🪷' },
    hi: "Hi! I'm Tilly. Slow and steady – let's jump!",
    cheers: ['Hooray! Correct! 🐢', 'Jump-tastic! 🌿', 'Slow and steady wins! 🏆', 'Splash! You got it! 💦', 'Turtle-rific! ⭐'],
    win: 'Tilly says: you jumped across the whole trail – brilliant!',
    covers: 'Concepts from book pages 60–61 – parts of a multiplication, × 0 and × 1, 2-digit × 1-digit, number-line jumps and the small tables. All new numbers ✅',
    learn: { tags: ['1 · The parts', '2 · Jumps', '3 · Tricks'], steps: [
      { v: P.col(4, 3, { inputs: false }), cap: '4 = multiplicand · 3 = multiplier · 12 = product' },
      { v: P.numline(4, 3, '🐢'), cap: '3 jumps of 4 steps. Where does Tilly land?' },
      { big: '× 0 = 0 · × 1 = same', cap: 'Any number × 0 is 0. Any number × 1 stays the same.' }],
      shortcut: '⚡ <mark>Multiplicand</mark> × <mark>Multiplier</mark> = <mark>Product</mark>' },
    missions: [
      M('🌿', 'Name the Parts', 'Which number is the multiplicand, the multiplier and the product?', [
        f('In 6 × 4 = 24:   multiplicand = {} · multiplier = {} · product = {}', [6, 4, 24]), f('In 9 × 3 = 27:   multiplicand = {} · multiplier = {} · product = {}', [9, 3, 27]),
        f('In 7 × 5 = 35:   multiplicand = {} · multiplier = {} · product = {}', [7, 5, 35]),
        note('Think of a real-life time when you use multiplication. Tell your friend!')], 'Concept · book p.60 – parts of a multiplication'),
      M('🍃', 'Two-Digit Friends', 'Multiply a 2-digit number by a small number.', [n(31, 3), n(24, 2), n(12, 4), n(41, 2), n(13, 3), n(22, 4)], 'Concept · book p.60 – 2-digit × 1-digit'),
      M('🪷', 'Zero & One Lily Pads', '× 0 makes 0. × 1 keeps the number.', [n(63, 1), n(79, 0), n(0, 48), n(1, 90)], 'Concept · book p.60 – × 0 and × 1'),
      M('🐢', 'Jump, Tilly, Jump!', 'Each jump is the same size. Where does Tilly land?', [
        n(3, 4, { v: P.numline(4, 3, '🐢'), cap: '3 jumps of 4' }), n(5, 3, { v: P.numline(3, 5, '🐢'), cap: '5 jumps of 3' }), n(7, 2, { v: P.numline(2, 7, '🐢'), cap: '7 jumps of 2' }),
        n(4, 5, { v: P.numline(5, 4, '🐢'), cap: '4 jumps of 5' }), n(2, 9, { v: P.numline(9, 2, '🐢'), cap: '2 jumps of 9' }), n(2, 7, { v: P.numline(7, 2, '🐢'), cap: '2 jumps of 7' })], 'Concept · book p.61 – multiplication on the number line'),
      M('✖️', 'Multiply the Tables', 'Tables of 2, 3, 4, 5 and 6 – mixed up!', [n(3, 8), n(6, 4), n(2, 7), n(5, 9), n(4, 6), n(3, 9), n(6, 3), n(2, 8), n(5, 7), n(4, 9), n(6, 2), n(3, 7)], 'Concept · book p.61 – multiply the following'),
      M('🔗', 'Zero & One Match', 'Join each sum to its product.', [match([['8 × 0', '0'], ['1 × 17', '17'], ['4 jumps of 3 🐢', '12'], ['2 jumps of 9 🐢', '18']])], X),
      M('🥬', 'Lettuce Count', 'Tap each pile to skip-count the leaves.', [cnt('🥬', 3, 6, '3 piles. 6 leaves in each pile.')], X),
      M('✅', 'True or False?', 'Tilly checks the sums. Is she right?', [tf('1 × 34 = 34', true), tfm(8, 0, 5), tfm(6, 4), tfm(7, 3, 2)], X),
      M('🎈', 'Pop the Fours', 'Pop every number in the table of 4.', [pop('Which numbers are in the table of 4?', [12, 14, 16, 18, 20, 22], [12, 16, 20])], X),
      M('🪜', 'Skip-Count Stones', 'Fill in the missing stones.', [seq([3, 6, null, 12, null], [9, 15], '3, 6, 9, 12, 15 (count by 3s)')], X),
      M('🏆', 'Lily Pad Boss', 'The last jump!', [W('Tilly eats 4 lettuce leaves every day. How many leaves does she eat in 7 days?', 4, 7, 'Leaves =')], X)
    ]
  });

  /* 2 ───────── GIGI GIRAFFE – the full tables of 7, 8 and 9 (concept of book p.62–63) ───────── */
  theme({
    id: 'giraffe', title: "Gigi Giraffe's Tall Tables", mascot: '🦒', name: 'Gigi', emoji: '🌳', tagline: 'Climb every step of the tables of 7, 8 and 9 – and spot the secret trick in 9!',
    tags: ['Tables 7, 8, 9'], skills: ['Book chapter', 'Skip counting', 'Games & puzzles'], tables: [7, 8, 9], pages: 'p.62–63',
    c1: '#F2A31B', c2: '#FFE08A', bg: '#FFF3CF', style: 'chunky', wave: 'triangle',
    palette: ['#F2A31B', '#3AA655', '#E0559E', '#2F7FE0', '#E8590C', '#7B4DFF'],
    deco: '🦒🌳🍃🌳🦒🍃', widget: { type: 'bar', label: '🦒 Climb', runner: '🦒', goal: '🍃' },
    hi: "Hello up there! I'm Gigi. Let's learn the tall tables!",
    cheers: ['Stretch-tastic! 🦒', 'You are so tall! 🌟', 'Leaf-ly right! 🍃', 'Spot on! 🟤', 'Giraffe high-five! ✋'],
    win: 'Gigi says: you climbed all 30 steps – the tables of 7, 8 and 9 are yours!',
    covers: 'Concepts from book pages 62–63 – the tables of 7, 8 and 9, every single step from × 1 to × 10, repeated addition and flipping the numbers. All new questions ✅',
    learn: { tags: ['1 · Table of 7', '2 · Table of 8', '3 · Table of 9'], steps: [
      { v: P.tbl(7, 5), cap: '7, 14, 21, 28, 35 …' }, { v: P.tbl(8, 5), cap: '8, 16, 24, 32, 40 …' }, { v: P.tbl(9, 5), cap: '9, 18, 27, 36, 45 …' }],
      shortcut: '⚡ Table of 9 trick: the digits of every answer add up to <mark>9</mark> (2 + 7 = 9)!' },
    missions: [
      M('🌳', 'Table of 7 Tree', 'Every step of the table of 7 – in a mixed-up order!', tab(7, [4, 9, 2, 6, 10, 1, 8, 3, 5, 7]), 'Concept · book p.62 – table of 7 (× 1 to × 10)'),
      M('🍃', 'Table of 8 Tree', 'Every step of the table of 8.', tab(8, [6, 2, 9, 4, 1, 10, 7, 3, 8, 5]), 'Concept · book p.62 – table of 8 (× 1 to × 10)'),
      M('🌴', 'Table of 9 Tree', 'Every step of the table of 9.', tab(9, [3, 8, 5, 1, 9, 6, 2, 10, 4, 7]), 'Concept · book p.62 – table of 9 (× 1 to × 10)'),
      M('➕', 'Repeated Addition', 'A table is just adding the same number again and again.', [
        f('7 + 7 + 7 + 7 = {}   so   4 × 7 = {}', [28, 28]), f('8 + 8 + 8 = {}   so   3 × 8 = {}', [24, 24]), f('9 + 9 + 9 + 9 + 9 = {}   so   5 × 9 = {}', [45, 45])], 'Concept · book p.62 – repeated addition'),
      M('🔄', 'Flip the Numbers', 'Swap the numbers – the answer stays the same!', [n(6, 7), n(8, 6), n(9, 7), n(5, 8), n(7, 9), n(4, 9)], 'Concept · book p.63 – multiply the following (tables 7, 8, 9 both ways)'),
      M('🪜', 'Climb the Ladder', 'Fill in the missing numbers.', [
        seq([7, 14, 21, null, 35, null, 49], [28, 42], '7, 14, 21, 28, 35, 42, 49'), seq([8, 16, null, 32, null, 48], [24, 40], '8, 16, 24, 32, 40, 48'), seq([9, 18, 27, null, 45, null], [36, 54], '9, 18, 27, 36, 45, 54')], X),
      M('🎈', 'Pop the Nines', 'Pop every number that is in the table of 9.', [pop('Which numbers are in the table of 9?', [18, 19, 36, 38, 63, 64], [18, 36, 63])], X),
      M('🕵️', 'Nine Detective', 'Know More: the digits of each answer in the table of 9 add up to 9.', [
        f('7 × 9 = 63   and   6 + 3 = {}', [9]), f('2 × 9 = 18   and   1 + 8 = {}', [9]), f('5 × 9 = 45   and   4 + 5 = {}', [9])], X),
      M('🔗', 'Match the Spots', 'Join each sum to its answer.', [match(prs([[7, 3], [8, 7], [9, 4], [8, 8]]))], X),
      M('🟤', 'Count the Spots', 'Tap each giraffe to count its spots.', [cnt('🟤', 3, 8, '3 giraffes. 8 spots on each giraffe.')], X),
      M('✅', 'True or False?', 'Gigi checks the tables.', [tfm(7, 8), tfm(9, 6, 2), tfm(8, 4), tfm(7, 9, 1)], X),
      M('🏆', 'Treetop Boss', 'The tallest question!', [W('A zookeeper gives each of 9 giraffes 6 leaves. How many leaves in all?', 9, 6, 'Leaves =')], X)
    ]
  });

  /* 3 ───────── CAPTAIN ZARA – mixed tables practice (concept of book p.63, Exercise 1.1) ───────── */
  theme({
    id: 'space', title: "Captain Zara's Space Mission", mascot: '🧑‍🚀', name: 'Zara', emoji: '🚀', tagline: 'Blast through 18 mixed table sums – every table from 2 to 10 – and land on the Moon!',
    tags: ['Mixed tables'], skills: ['Book chapter', 'Games & puzzles', 'Skip counting'], tables: [2, 3, 4, 5, 6, 7, 8, 9, 10], pages: 'p.63',
    c1: '#5B4CFF', c2: '#9B8CFF', bg: '#1A1747', style: 'neon', wave: 'square',
    palette: ['#5B4CFF', '#E0559E', '#2FB98B', '#F29F1C', '#2F9BE0', '#E8590C'],
    deco: '🚀🪐⭐🌙⭐🪐', widget: { type: 'bar', label: '🚀 Flight', runner: '🚀', goal: '🌙' },
    hi: 'Captain Zara here! 3… 2… 1… Blast off!',
    cheers: ['Blast off! 🚀', 'Out of this world! 🌟', 'Stellar! ⭐', 'Rocket-fast! 💫', 'Moon-tastic! 🌙'],
    burst: { list: ['⭐', '🚀', '✨'], mode: 'up' }, fx: { list: ['⭐', '🚀', '🪐', '🌙'], mode: 'fall' },
    win: 'Captain Zara says: mission complete – you landed on the Moon!',
    covers: 'Concept from book page 63 (writing the product using the multiplication tables) – 18 new sums that use every table from 2 to 10 ✅',
    learn: { tags: ['1 · Rows', '2 · Multiply', '3 · Swap!'], steps: [
      { v: P.array('🪐', 2, 6), cap: '2 rows of 6 planets' }, { big: '2 × 6 = 12', cap: '2 groups of 6 make 12' }, { big: '6 × 2 = 12', cap: 'Swap the numbers – the answer is the same!' }],
      shortcut: '⚡ <mark>2 × 6</mark> and <mark>6 × 2</mark> are twins – both are <mark>12</mark>!' },
    missions: [
      M('🪐', 'Launch Pad 1', 'Write the product using the multiplication tables.', [n(2, 6), n(3, 6), n(4, 9), n(5, 9), n(6, 7), n(7, 9)], 'Concept · book p.63 – write the product using tables'),
      M('🌠', 'Launch Pad 2', 'Keep going!', [n(8, 6), n(9, 5), n(10, 7), n(2, 8), n(3, 8), n(4, 4)], 'Concept · book p.63 – write the product using tables'),
      M('🌙', 'Launch Pad 3', 'Almost at the Moon!', [n(5, 6), n(6, 6), n(7, 3), n(8, 3), n(9, 9), n(10, 4)], 'Concept · book p.63 – write the product using tables'),
      M('⚙️', 'Rocket Machine', 'Put a number IN. The machine multiplies. What comes OUT?', [
        { k: 'num', v: P.machine(7, 5), eq: 'OUT =', a: 35, ans: '5 × 7 = 35' }, { k: 'num', v: P.machine(9, 6), eq: 'OUT =', a: 54, ans: '6 × 9 = 54' }], X),
      M('🔄', 'Swap the Twins', 'Swap the numbers. The answer stays the same!', [f('If 8 × 6 = 48, then 6 × 8 = {}', [48]), f('If 9 × 4 = 36, then 4 × 9 = {}', [36]), f('If 7 × 5 = 35, then 5 × 7 = {}', [35])], X),
      M('🔗', 'Match the Stars', 'Join each sum to its answer.', [match(prs([[6, 5], [4, 8], [7, 6], [9, 3]]))], X),
      M('⭐', 'Count the Stars', 'Tap every star once to count them all.', [cnt('⭐', 3, 5, '3 rows of 5 stars.', 'one')], X),
      M('🎈', 'Pop the Sixes', 'Pop every number in the table of 6.', [pop('Which numbers are in the table of 6?', [12, 16, 18, 24, 26, 30], [12, 18, 24, 30])], X),
      M('✅', 'True or False?', 'Mission control checks your sums.', [tfm(10, 3), tfm(7, 7, -2), tfm(9, 2)], X),
      M('🏆', 'Moon Boss', 'The final landing!', [W('A rocket has 6 seats. How many astronauts fit in 9 rockets?', 6, 9, 'Astronauts =')], X)
    ]
  });

  /* 4 ───────── BRUNO BEAR – 3-digit × 1-digit, no regrouping (concept of book p.64–65) ───────── */
  theme({
    id: 'builder', title: "Bruno Bear's Brick Tower", mascot: '🐻', name: 'Bruno', emoji: '🧱', tagline: 'Build big numbers! Multiply hundreds, tens and ones – no carrying yet.',
    tags: ['3-digit numbers'], skills: ['Book chapter', '3-digit numbers', 'Place value'], tables: [], pages: 'p.64–65',
    c1: '#E8590C', c2: '#FFB36B', bg: '#E5F6FA', style: 'tech', wave: 'square',
    palette: ['#E8590C', '#2F7FE0', '#3AA655', '#E0559E', '#7B4DFF', '#F29F1C'],
    deco: '🧱🏗️🧱🐻🧱🏗️', widget: { type: 'bar', label: '🏗️ Tower', runner: '🧱', goal: '🏁' },
    hi: "Hi! I'm Bruno. Let's build with numbers!",
    cheers: ['Brick-tastic! 🧱', 'Built it! 🏗️', 'Strong work! 💪', 'Tower power! 🏰', 'Bear hug! 🐻'],
    win: 'Bruno says: your tower is finished – you can multiply 3-digit numbers!',
    covers: 'Concept from book pages 64–65 – 3-digit × 1-digit when nothing needs carrying: multipliers 1, 2, 3 and 4, zeros in every place. All new numbers ✅',
    learn: { tags: ['1 · Place value', '2 · One at a time', '3 · The answer'], steps: [
      { v: P.place(132), cap: '1 hundred · 3 tens · 2 ones' }, { big: '2×3=6 · 3×3=9 · 1×3=3', cap: 'Ones first, then tens, then hundreds' }, { v: P.col(132, 3, { inputs: false }), cap: '132 × 3 = 396' }],
      shortcut: '⚡ Multiply <mark>O</mark> → <mark>T</mark> → <mark>H</mark>. Start from the right!' },
    missions: [
      M('🏠', 'Warm-up Brick', 'Type one digit in each box.', [c(132, 3)], 'Concept · book p.64 – worked example, no regrouping'),
      M('🧱', 'Multiply by 2', 'Find the product. No carrying needed!', [c(143, 2), c(231, 2), c(304, 2), c(421, 2)], 'Concept · book p.65 – 3-digit × 2 (no regrouping)'),
      M('🏗️', 'Multiply by 3', 'Same steps, new multiplier.', [c(312, 3), c(103, 3), c(220, 3), c(331, 3)], 'Concept · book p.65 – 3-digit × 3 (no regrouping)'),
      M('🏰', 'Multiply by 4', 'Four times as big!', [c(221, 4), c(102, 4), c(210, 4), c(120, 4)], 'Concept · book p.65 – 3-digit × 4 (no regrouping)'),
      M('🔟', 'Multiply by 1', 'Anything × 1 stays the same.', [c(345, 1), c(907, 1)], 'Concept · book p.65 – 3-digit × 1'),
      M('🪓', 'Break It Up', 'Split the number: hundreds, tens and ones.', [bu(241, 2), bu(312, 3), bu(121, 4)], X),
      M('🔗', 'Match the Bricks', 'Join each sum to its product.', [match(prs([[100, 4], [110, 3], [201, 4], [111, 3]]))], X),
      M('🔍', 'Spot the Right Answer', 'Which one is right?', [mcn('What is 321 × 3 ?', '963', ['693', '936'], 2), tfm(110, 5), tfm(213, 3, 10)], X),
      M('🏆', 'Tower Boss', 'Top of the tower!', [W('A baker bakes 202 rolls a day. How many rolls in 4 days?', 202, 4, 'Rolls ='), W('A shelf holds 212 books. How many books on 4 such shelves?', 212, 4, 'Books =')], X)
    ]
  });

  /* 5 ───────── POLLY PARROT – 3-digit × 1-digit with regrouping (concept of book p.64–66) ───────── */
  theme({
    id: 'pirate', title: "Polly's Carry-Over Treasure", mascot: '🦜', name: 'Polly', emoji: '🏴‍☠️', tagline: 'Carry over tens and hundreds to unlock the treasure chests!',
    tags: ['Regrouping'], skills: ['Book chapter', '3-digit numbers', 'Place value'], tables: [], pages: 'p.64–66',
    c1: '#1C7C9B', c2: '#F4D35E', bg: '#FFF3D1', style: 'ticket', wave: 'triangle',
    palette: ['#1C7C9B', '#E0483E', '#F29F1C', '#3AA655', '#7B4DFF', '#E0559E'],
    deco: '🦜🏴‍☠️💰🗝️💰🦜', widget: { type: 'bar', label: '🗺️ Map', runner: '⛵', goal: '💰' },
    hi: "Arrr! I'm Polly. Let's find the treasure!",
    cheers: ['Arrr, correct! 🏴‍☠️', 'Treasure found! 💰', 'Shiver me numbers! ⚓', 'Polly says bravo! 🦜', 'Gold star! ⭐'],
    burst: { list: ['💰', '⭐', '🪙'], mode: 'burst' }, fx: { list: ['💰', '🪙', '⭐', '🦜'], mode: 'fall' },
    win: 'Polly says: all the chests are open – you are a carry-over captain!',
    covers: 'Concept from book pages 64–66 – 3-digit × 1-digit with regrouping: carrying once, twice, into the thousands, with zeros and nines. All new numbers ✅',
    learn: { tags: ['1 · Ones', '2 · Tens', '3 · Hundreds'], steps: [
      { big: '6 × 5 = 30', cap: 'Write 0 · carry 3 tens' }, { big: '7 × 5 = 35, +3 = 38', cap: 'Write 8 · carry 3 hundreds' }, { v: P.col(176, 5, { inputs: false }), cap: '176 × 5 = 880' }],
      shortcut: '⚡ Too big for one box? <mark>Write</mark> the ones digit and <mark>carry</mark> the rest!' },
    missions: [
      M('🗝️', 'The Key Example', 'Type one digit in each box.', [c(176, 5)], 'Concept · book p.64 – worked example, with regrouping'),
      M('💰', 'Carry Once', 'One carry – you can do it!', [c(163, 5), c(247, 3), c(129, 2)], 'Concept · book p.65 – regrouping (one carry)'),
      M('🏴‍☠️', 'Carry Twice', 'Carry in the ones AND the tens.', [c(354, 4), c(261, 5), c(472, 3)], 'Concept · book p.65–66 – regrouping (two carries)'),
      M('⚓', 'Big Carries', 'Big digits, big carries – even into the thousands!', [c(286, 7), c(395, 8), c(507, 6)], 'Concept · book p.66 – regrouping into the thousands'),
      M('🦜', 'Nines and Zeros', 'The trickiest chests of all.', [c(608, 9), c(749, 4), c(999, 2)], 'Concept · book p.66 – regrouping with zeros and nines'),
      M('🔢', 'Carry Practice', 'Split the answer into tens and ones.', [f('6 × 7 = 42 = {} tens + {} ones', [4, 2]), f('9 × 8 = 72 = {} tens + {} ones', [7, 2]), f('5 × 6 = 30 = {} tens + {} ones', [3, 0])], X),
      M('💰', 'Count the Coins', 'Tap each chest to skip-count the coins.', [cnt('🪙', 3, 9, '3 chests. 9 coins in each chest.')], X),
      M('🔍', 'Spot the Right Answer', 'Which one is right?', [mcn('What is 125 × 4 ?', '500', ['400', '520'], 1), tfm(150, 6), tfm(99, 5, 5)], X),
      M('🏆', 'Treasure Boss', 'The biggest chest of all!', [W('Each treasure chest has 125 gold coins. How many coins are in 6 chests?', 125, 6, 'Coins =')], X)
    ]
  });

  /* 6 ───────── REX THE DINO – 3-digit × 2-digit (concept of book p.66–67) ───────── */
  theme({
    id: 'dino', title: "Rex's Dino Dash", mascot: '🦖', name: 'Rex', emoji: '🌋', tagline: 'Stomp through 3-digit × 2-digit sums: multiply by the ones, then by 10, then add!',
    tags: ['3-digit × 2-digit'], skills: ['Book chapter', '3-digit numbers', 'Word problems'], tables: [], pages: 'p.66–67',
    c1: '#3C9D3C', c2: '#D6F264', bg: '#F1FBD9', style: 'paper', wave: 'sawtooth',
    palette: ['#3C9D3C', '#E8590C', '#2F7FE0', '#E0559E', '#7B4DFF', '#F29F1C'],
    deco: '🦖🌋🌿🦕🌿🦖', widget: { type: 'bar', label: '🦖 Dash', runner: '🦖', goal: '🥚' },
    hi: "ROAR! I'm Rex. Let's dash through big numbers!",
    cheers: ['ROAR! Correct! 🦖', 'Dino-mite! 💥', 'Stomp stomp! 🦕', 'Fossil-fantastic! 🦴', 'Rex is proud! 🌋'],
    burst: { list: ['🦴', '💥', '⭐'], mode: 'burst' }, fx: { list: ['🦖', '🦕', '🥚', '⭐'], mode: 'fall' },
    win: 'Rex says: ROAR! You multiplied 3-digit by 2-digit numbers!',
    covers: 'Concept from book pages 66–67 – 3-digit × 2-digit: multiply by the ones, multiply by the tens, add. Teens, twenties, zeros inside, 4-digit answers and a word problem. All new numbers ✅',
    learn: { tags: ['1 · Ones digit', '2 · × 10', '3 · Add'], steps: [
      { big: '132 × 4 = 528', cap: 'Step 1: multiply by the ones digit (4)' }, { big: '132 × 10 = 1320', cap: 'Step 2: multiply by 10 (tens digit)' }, { v: P.col(132, 14, { inputs: false }), cap: '528 + 1320 = 1848' }],
      shortcut: '⚡ Multiply by <mark>ones</mark>, multiply by <mark>tens</mark>, then <mark>add</mark>!' },
    missions: [
      M('🥚', 'Egg Example', 'Type one digit in each box.', [c(132, 14)], 'Concept · book p.66 – worked examples'),
      M('🌋', 'The Teens', 'Multiply by 11, 12, 13…', [c(214, 12), c(321, 13), c(152, 11)], 'Concept · book p.66–67 – 3-digit × teen number'),
      M('🦕', 'The Twenties', 'Multiply by 21, 22, 23…', [c(112, 21), c(132, 22), c(243, 23)], 'Concept · book p.67 – 3-digit × 20s'),
      M('🦴', 'Big Stomps', 'Zeros inside and bigger answers!', [c(305, 14), c(316, 24), c(403, 15)], 'Concept · book p.67 – bigger products'),
      M('🚲', 'Kilometre Word Problem', 'Read the story and multiply.', [W('A cyclist rides 135 km every day. How many kilometres does she ride in 6 days?', 135, 6, 'Kilometres =')], 'Concept · book p.67 – word problem with 3-digit numbers'),
      M('🪜', 'Step by Step', 'Fill in each step.', [ts(213, 12), ts(124, 13), ts(231, 21)], X),
      M('🔗', 'Match the Eggs', 'Join each sum to its product.', [match(prs([[100, 13], [200, 12], [300, 11], [150, 10]]))], X),
      M('✅', 'True or False?', 'Is Rex right?', [tfm(132, 14), tfm(214, 12, 10), tfm(112, 21)], X),
      M('🏆', 'Dino Boss', 'The biggest stomp!', [W('A dino park sells 160 tickets every day. How many tickets does it sell in 15 days?', 160, 15, 'Tickets =')], X)
    ]
  });

  /* 7 ───────── PIP PENGUIN – word problems (concept of book p.68, Exercise 1.4) ───────── */
  theme({
    id: 'penguin', title: "Pip Penguin's Delivery Day", mascot: '🐧', name: 'Pip', emoji: '📦', tagline: 'Read the story, spot the groups and multiply – parcels, crayons, books and more!',
    tags: ['Word problems'], skills: ['Book chapter', 'Word problems', '3-digit numbers'], tables: [], pages: 'p.68',
    c1: '#1E88E5', c2: '#8FD3FF', bg: '#E7F5FF', style: 'soft', wave: 'sine',
    palette: ['#1E88E5', '#E8590C', '#3AA655', '#E0559E', '#7B4DFF', '#F29F1C'],
    deco: '🐧📦🚚🐧📦❄️', widget: { type: 'bar', label: '🚚 Delivery', runner: '🚚', goal: '🏠' },
    hi: "Hi! I'm Pip. Help me deliver all the parcels!",
    cheers: ['Delivered! 📦', 'Waddle-ful! 🐧', 'Ice work! ❄️', 'Right on time! ⏰', 'Pip flaps for you! 👏'],
    win: 'Pip says: every parcel is delivered – you are a word-problem whiz!',
    covers: 'Concept from book page 68 – word problems that need 3-digit × 1-digit and 3-digit × 2-digit multiplication, with “talk about it” prompts. All-new stories and numbers ✅',
    learn: { tags: ['1 · Read', '2 · Find groups', '3 · Multiply'], steps: [
      { v: P.groups('🖍️', 3, 1, { shape: 'bubble', label: '152 each' }), cap: 'How many in each group? How many groups?' }, { big: 'groups × each', cap: 'Multiply to find the total' }, { big: '6 × 152 = 912', cap: 'Always say what the answer means: 912 crayons' }],
      shortcut: '⚡ <mark>Number of groups</mark> × <mark>number in each</mark> = <mark>total</mark>' },
    missions: [
      M('🖍️', 'Crayon Shop', 'Story 1 and story 2.', [
        W('A shop sells crayons in 6 colours. There are 152 crayons of each colour. How many crayons are there in all?', 6, 152, 'Crayons =', { v: P.groups('🖍️', 6, 1, { shape: 'bubble', label: '152 each' }) }),
        W('A basket holds 184 flowers. How many flowers are there in 7 such baskets?', 7, 184, 'Flowers =', { v: P.groups('🌼', 4, 1, { shape: 'bubble', label: '184 each' }) })], 'Concept · book p.68 – word problems (3-digit × 1-digit)'),
      M('🚐', 'Book Van', 'Story 3.', [W('A van carries 235 books on each trip. How many books can it carry in 9 trips?', 9, 235, 'Books ='),
        note('Tell a friend about the heaviest thing you ever helped to carry. How did you feel?')], 'Concept · book p.68 – word problems + talk about it'),
      M('🖨️', 'Printer Power', 'Story 4.', [W('A printer prints 146 pages in one run. How many pages does it print in 12 runs?', 12, 146, 'Pages ='),
        note('We should all help at school and at home. What helpful thing do you do every week?')], 'Concept · book p.68 – word problems (3-digit × 2-digit)'),
      M('🥭', 'Mango Market', 'Story 5.', [W('There are 16 mangoes in a box. How many mangoes are there in 125 such boxes?', 125, 16, 'Mangoes =')], 'Concept · book p.68 – word problems (2-digit × 3-digit)'),
      M('🔗', 'Match the Story', 'Join each story to the right multiplication.', [match([['4 trays with 15 cookies on each', '4 × 15'], ['9 bags with 130 marbles in each', '9 × 130'], ['20 rows with 18 chairs in each', '20 × 18'], ['7 boxes with 250 pins in each', '7 × 250']])], X),
      M('📦', 'More Deliveries', 'New stories – same idea.', [
        W('A shop sells 118 toffees a day. How many toffees does it sell in 5 days?', 118, 5, 'Toffees ='), W('A class has 28 children. Each child gets 14 beads. How many beads are needed?', 28, 14, 'Beads ='),
        W('A packet has 36 pins. How many pins are in 25 packets?', 36, 25, 'Pins ='), W('A lorry carries 312 bricks on every trip. How many bricks does it carry in 6 trips?', 312, 6, 'Bricks =')], X),
      M('✅', 'True or False?', 'Is the answer right?', [tfm(6, 152), tfm(7, 184, 10), tfm(12, 146)], X),
      M('🏆', 'Delivery Boss', 'The last parcel!', [W('Pip buys 24 fish. Each fish costs ₹15. How much does Pip pay?', 24, 15, '₹')], X)
    ]
  });

  /* 8 ───────── WANDA THE WIZARD – smart multiplication, method 1: break the second number into factors (concept of book p.68) ───────── */
  theme({
    id: 'wizard', title: "Wanda's Magic Shortcut", mascot: '🧙', name: 'Wanda', emoji: '🪄', tagline: 'Smart Multiplication, Method 1: break a number into two smaller numbers to multiply!',
    tags: ['Smart multiplication'], skills: ['Book chapter', 'Smart methods', 'Games & puzzles'], tables: [5], pages: 'p.68 · Method 1',
    c1: '#8E44AD', c2: '#D7A8FF', bg: '#F3E8FF', style: 'chunky', wave: 'sine',
    palette: ['#8E44AD', '#E0559E', '#2F7FE0', '#F29F1C', '#3AA655', '#E8590C'],
    deco: '🧙🪄✨🔮✨🧙', widget: { type: 'bar', label: '🪄 Spell', runner: '🪄', goal: '🔮' },
    hi: "Abracadabra! I'm Wanda. Let's learn a magic shortcut!",
    cheers: ['Abracadabra! ✨', 'Magic! 🪄', 'Spell-binding! 🔮', 'Wizard-ly right! 🧙', 'Poof! Correct! 💫'],
    burst: { list: ['✨', '🪄', '⭐'], mode: 'burst' }, fx: { list: ['✨', '🔮', '🪄', '⭐'], mode: 'fall' },
    win: 'Wanda says: your spell worked – you know Smart Multiplication Method 1!',
    covers: 'Concept from book page 68 – Smart Multiplication Method 1 (split the second number into a × b). Every useful factor pair: 5 × 3, 5 × 5, 5 × 7, 5 × 9, 5 × 11, 4 × 6, 4 × 7, 4 × 11… All new numbers ✅',
    learn: { tags: ['1 · Split', '2 · First part', '3 · Second part'], steps: [
      { big: '22 × 15', cap: 'Split 15 into 5 × 3' }, { big: '(22 × 5) × 3', cap: '22 × 5 = 110 first' }, { big: '110 × 3 = 330', cap: 'Then multiply by 3!' }],
      shortcut: '⚡ 22 × 15 = 22 × (<mark>5 × 3</mark>) = (22 × 5) × 3 = 110 × 3 = <mark>330</mark>' },
    missions: [
      M('🔮', 'The First Spell', 'Follow the steps and fill the boxes.', [m1(22, 5, 3)], 'Concept · book p.68 – Method 1 example'),
      M('🪄', 'Spell Book 1 – Splitting with 5s', 'Split the second number into 5 × something.', [m1(24, 5, 7), m1(32, 5, 3), m1(16, 5, 9), m1(36, 5, 5)], 'Concept · book p.68 – Method 1 (factor 5)'),
      M('📜', 'Spell Book 2 – Splitting with 4s and 5s', 'Try other factor pairs.', [m1(18, 5, 11), m1(15, 4, 7), m1(45, 4, 6), m1(52, 5, 7)], 'Concept · book p.68 – Method 1 (factors 4, 5)'),
      M('🧪', 'Spell Book 3 – More Pairs', 'Even more factor pairs!', [m1(25, 4, 11), m1(64, 5, 3), m1(30, 5, 9)], 'Concept · book p.68 – Method 1 (mixed pairs)'),
      M('🎈', 'Pop the Pairs', 'Pop every pair that multiplies to 24.', [pop('Which pairs make 24?', ['3 × 8', '4 × 6', '5 × 5', '2 × 12', '6 × 5'], ['3 × 8', '4 × 6', '2 × 12'])], X),
      M('🔗', 'Match the Factors', 'Join each number to a pair that makes it.', [match([['15', '5 × 3'], ['28', '4 × 7'], ['24', '4 × 6'], ['44', '4 × 11']])], X),
      M('✅', 'True or False?', 'Is the spell right?', [tf('22 × 15 = 330', true), tf('32 × 15 = 480', true), tf('24 × 35 = 800', false)], X),
      M('🏆', 'Wizard Boss', 'The final spell!', [W('A wizard has 25 potions. Each potion has 28 drops (28 = 4 × 7). How many drops are there?', 25, 28, 'Drops =')], X)
    ]
  });

  /* 9 ───────── NINA THE NINJA – smart multiplication, method 2: split into tens and ones (concept of book p.68) ───────── */
  theme({
    id: 'ninja', title: "Ninja Nina's Split Strike", mascot: '🥷', name: 'Nina', emoji: '⚔️', tagline: 'Smart Multiplication, Method 2: split a number into tens and ones, multiply, then add!',
    tags: ['Smart multiplication'], skills: ['Book chapter', 'Smart methods', 'Games & puzzles'], tables: [], pages: 'p.68 · Method 2',
    c1: '#D6336C', c2: '#FFB3CF', bg: '#FFE9F1', style: 'ticket', wave: 'square',
    palette: ['#D6336C', '#2F7FE0', '#3AA655', '#F29F1C', '#7B4DFF', '#E8590C'],
    deco: '🥷⚔️🌸🥷⚔️🌸', widget: { type: 'bar', label: '🥷 Mission', runner: '🥷', goal: '🏯' },
    hi: "Hi-yah! I'm Nina. Let's split and strike!",
    cheers: ['Hi-yah! Correct! 🥷', 'Ninja speed! ⚡', 'Sneaky smart! 🌸', 'Sharp work! ⚔️', 'Nina bows to you! 🙇'],
    burst: { list: ['🌸', '⭐', '✨'], mode: 'burst' }, fx: { list: ['🌸', '⭐', '🥷', '🏯'], mode: 'fall' },
    win: 'Nina says: mission complete – you are a Split Strike master!',
    covers: 'Concept from book page 68 – Smart Multiplication Method 2 (split the second number into tens + ones). Splits like 10 + 4, 20 + 5, 30 + 6, 60 + 2, 50 + 1… All new numbers ✅',
    learn: { tags: ['1 · Split', '2 · Multiply both', '3 · Add'], steps: [
      { big: '12 = 10 + 2', cap: 'Split 12 into tens and ones' }, { big: '(15×10)+(15×2)', cap: '150 and 30' }, { big: '150 + 30 = 180', cap: 'Add the two parts together' }],
      shortcut: '⚡ 15 × 12 = 15 × (<mark>10 + 2</mark>) = 150 + 30 = <mark>180</mark>' },
    missions: [
      M('🌸', 'The First Strike', 'Follow the steps and fill the boxes.', [m2(15, 10, 2)], 'Concept · book p.68 – Method 2 example'),
      M('⚔️', 'Split Strike 1 – Teens', 'Split into 10 + something.', [m2(26, 10, 4), m2(27, 10, 3), m2(56, 10, 2), m2(37, 10, 7)], 'Concept · book p.68 – Method 2 (10 + ones)'),
      M('🏯', 'Split Strike 2 – Bigger Tens', 'Split into 20, 30 or 40 + ones.', [m2(32, 20, 5), m2(38, 20, 4), m2(41, 30, 5), m2(19, 30, 6)], 'Concept · book p.68 – Method 2 (tens + ones)'),
      M('🌟', 'Split Strike 3 – Big Tens', 'Split into 50, 60 or 40 + ones.', [m2(63, 50, 1), m2(45, 60, 2), m2(75, 40, 3)], 'Concept · book p.68 – Method 2 (large tens)'),
      M('🌠', 'New Strikes', 'Same move – new numbers.', [m2(12, 10, 8), m2(21, 20, 3)], X),
      M('🔗', 'Match the Split', 'Join each number to a way of splitting it.', [match([['23', '20 + 3'], ['47', '40 + 7'], ['61', '60 + 1'], ['38', '30 + 8']])], X),
      M('🔍', 'Pick the Right Split', 'Which split is right?', [mc('Which is the right way to split 36 × 14 ?', ['36 × (1 + 4)', '36 × (10 + 4)', '36 × (10 + 40)'], 1), tf('15 × 12 = 180', true), tfm(26, 14, -10)], X),
      M('🏆', 'Ninja Boss', 'The final strike!', [W('A ninja school has 24 rooms. Each room has 15 mats (15 = 10 + 5). How many mats are there?', 24, 15, 'Mats =')], X)
    ]
  });

  /* 10 ───────── ZERO HERO – × 10, 100, 1000 (concept of book p.69) ───────── */
  theme({
    id: 'zerohero', title: "Zero Hero's Power Zeros", mascot: '🦸', name: 'Zed', emoji: '0️⃣', tagline: 'Multiply by 10, 100 and 1000 by adding zeros – a super-fast trick!',
    tags: ['× 10, 100, 1000'], skills: ['Book chapter', '× 10, 100, 1000', 'Place value'], tables: [], pages: 'p.69',
    c1: '#E8590C', c2: '#FFD43B', bg: '#E5F6FA', style: 'tech', wave: 'sawtooth',
    palette: ['#E8590C', '#2F7FE0', '#3AA655', '#E0559E', '#7B4DFF', '#F29F1C'],
    deco: '🦸0️⃣⚡0️⃣🦸⚡', widget: { type: 'bar', label: '🦸 Power', runner: '🦸', goal: '⚡' },
    hi: "I'm Zero Hero Zed! Zeros give me super-powers!",
    cheers: ['ZAP! Correct! ⚡', 'Super! 🦸', 'Zero-tastic! 0️⃣', 'Power up! 💥', 'Hero move! 🌟'],
    burst: { list: ['⚡', '0️⃣', '⭐'], mode: 'burst' }, fx: { list: ['⚡', '0️⃣', '🦸', '⭐'], mode: 'fall' },
    win: 'Zed says: you have the power of zeros – you are a hero!',
    covers: 'Concept from book page 69 – multiplying by 10, by 100 and by 1000: numbers by 10/100/1000, and numbers that already end in zeros (like 50 × 6 or 3000 × 4). All new numbers ✅',
    learn: { tags: ['× 10', '× 100', '× 1000'], steps: [
      { big: '37 × 10 = ' + P.zeros(37, 1), cap: 'Add one zero' }, { big: '37 × 100 = ' + P.zeros(37, 2), cap: 'Add two zeros' }, { big: '37 × 1000 = ' + P.zeros(37, 3), cap: 'Add three zeros' }],
      shortcut: '⚡ 10 → <mark>1 zero</mark> · 100 → <mark>2 zeros</mark> · 1000 → <mark>3 zeros</mark>' },
    missions: [
      M('🔟', 'Power of 10', 'Multiply by 10 – and try numbers that end in zero.', [n(27, 10), n(53, 10), n(64, 10), zf(5, 6, 1), zf(8, 3, 1)], 'Concept · book p.69 – multiplication by 10'),
      M('💯', 'Power of 100', 'Multiply by 100.', [n(19, 100), n(72, 100), n(85, 100), zf(7, 3, 2), zf(5, 6, 2)], 'Concept · book p.69 – multiplication by 100'),
      M('🚀', 'Power of 1000', 'Multiply by 1000.', [n(2, 1000), n(5, 1000), n(9, 1000), zf(3, 4, 3), zf(8, 5, 3)], 'Concept · book p.69 – multiplication by 1000'),
      M('🔗', 'Match the Power', 'Join each sum to its answer.', [match([['23 × 10', '230'], ['23 × 100', '2300'], ['23 × 1000', '23000'], ['7 × 100', '700']])], X),
      M('0️⃣', 'Count the Zeros', 'How many zeros do we add?', [f('To multiply by 10 we add {} zero.', [1]), f('To multiply by 100 we add {} zeros.', [2]), f('To multiply by 1000 we add {} zeros.', [3])], X),
      M('🎈', 'Pop the Answer', 'Pop the balloon that shows 41 × 100.', [pop('What is 41 × 100 ?', [410, 4100, 41000, 401], [4100])], X),
      M('📈', 'Zero Staircase', 'Each step is × 10. Fill the missing steps.', [seq([3, 30, 300, null, null], [3000, 30000], '3, 30, 300, 3000, 30000')], X),
      M('✅', 'True or False?', 'Is the zero power right?', [tfm(90, 10), tfm(9, 1000), tfm(8, 100, -720)], X),
      M('🏆', 'Hero Boss', 'The biggest power-up!', [W('One box has 100 crayons. How many crayons are in 7 such boxes?', 100, 7, 'Crayons =')], X)
    ]
  });

  /* 11 ───────── BOBBY THE BUS – tens, hundreds and thousands in real life (concept of book p.69–71, Exercise 1.6) ───────── */
  theme({
    id: 'bus', title: "Bobby's School Bus Bonanza", mascot: '🚌', name: 'Bobby', emoji: '🏟️', tagline: 'Tens, hundreds and thousands on the road – sums, picture problems and stories!',
    tags: ['Real-life problems'], skills: ['Book chapter', '× 10, 100, 1000', 'Word problems'], tables: [], pages: 'p.69–71',
    c1: '#F5B700', c2: '#FFE45E', bg: '#FFF9D6', style: 'chunky', wave: 'triangle',
    palette: ['#F5B700', '#2F7FE0', '#3AA655', '#E0559E', '#7B4DFF', '#E8590C'],
    deco: '🚌🏟️🍓🖍️🚌🥚', widget: { type: 'bar', label: '🚌 Route', runner: '🚌', goal: '🏟️' },
    hi: "Beep beep! I'm Bobby. Hop on – let's go to the stadium!",
    cheers: ['Beep beep! Correct! 🚌', 'Right on route! 🗺️', 'Green light! 🟢', 'Full speed! 💨', 'Bus-tastic! ⭐'],
    win: 'Bobby says: you reached the stadium – brilliant driving!',
    covers: 'Concepts from book pages 69–71 – multiplying numbers that end in zeros, turning a picture + a fact into a word problem, and real-life word problems with 10, 100 and 1000. All new numbers and stories ✅',
    learn: { tags: ['1 · Groups', '2 · Break 40', '3 · Add a zero'], steps: [
      { v: P.groups('🧒', 3, 4, { shape: 'rect' }), cap: '3 buses · 4 children in each' }, { big: '30 × 40 = 30 × 4 × 10', cap: 'Break 40 into 4 × 10' }, { big: '120 × 10 = 1200', cap: 'Add a zero → 1200 passengers' }],
      shortcut: '⚡ Multiply the <mark>non-zero digits</mark> first, then <mark>add the zeros</mark>!' },
    missions: [
      M('🚌', 'The Bus Example', 'A train coach seats 30 passengers. How many passengers in 40 coaches? Fill the steps.', [f('30 × 40 = 30 × 4 × 10 = {} × 10 = {}', [120, 1200])], 'Concept · book p.69–70 – example with tens'),
      M('🛣️', 'Zero Sums', 'Multiply numbers that end in zero.', [n(6, 10), n(8, 40), n(3, 300), n(2, 500), n(5, 2000), n(7, 3000)], 'Concept · book p.70 – multiply by tens, hundreds, thousands'),
      M('🍓', 'Picture Problems', 'Use the picture clue and the fact to pick the right word problem.', [
        mc('🍓 Picture clue: strawberries.   Fact: 4 × 100 = 400', ['There are 4 strawberries in a box. How many strawberries are there in 100 boxes?', 'There are 100 strawberries in a box. How many strawberries are there in 4 such boxes?', 'There are 400 strawberries. How many boxes of 4 can you fill?'], 1, { small: true }),
        mc('🖍️ Picture clue: a marker pen.   Fact: 6 × 10 = 60', ['A packet has 10 markers. How many markers are there in 6 such packets?', 'A packet has 60 markers. How many markers are there in 10 packets?', 'There are 6 packets. Each packet costs ₹1. How much for 60 packets?'], 0, { small: true }),
        mc('🥚 Picture clue: a tray of eggs.   Fact: 6 × 12 = 72', ['There are 72 eggs. How many trays of 6 can you fill?', 'A tray has 6 eggs. How many eggs are there in 72 trays?', 'A tray has 12 eggs. How many eggs are there in 6 such trays?'], 2, { small: true })], 'Concept · book p.70 – picture + fact → word problem'),
      M('🍬', 'Sweet Stories', 'Real-life word problems.', [
        W('A box of chalk has 12 sticks. How many sticks are there in 10 such boxes?', 12, 10, 'Sticks ='),
        W('Every child in a class gave ₹50 to the school fund. There are 30 children in the class. How much money did they give in all?', 50, 30, '₹')], 'Concept · book p.71 – real-life word problems (× 10, × tens)'),
      M('🏟️', 'Stadium Seats', 'A big story!', [W('A hall seats 500 people. How many people can sit in 6 such halls?', 500, 6, 'People ='),
        W('A stadium has 1000 seats in each stand. How many people can sit in 8 stands?', 1000, 8, 'People =')], 'Concept · book p.71 – real-life word problems (hundreds, thousands)'),
      M('🔗', 'Match the Seats', 'Join each sum to its answer.', [match(prs([[9, 10], [9, 100], [9, 1000], [3, 500]]))], X),
      M('🚌', 'Count the Buses', 'Tap each bus to skip-count the children.', [cnt('🧒', 4, 6, '4 buses. 6 children in each bus.')], X),
      M('✅', 'True or False?', 'Is the answer right?', [tfm(6, 10), tfm(6, 200), tfm(5, 1000, -4500), tfm(4, 2000, -7200)], X),
      M('🏆', 'Stadium Boss', 'The final match!', [W('Each stand at a ground seats 2000 fans. How many fans can sit in 5 stands?', 2000, 5, 'Fans =')], X)
    ]
  });
})();
