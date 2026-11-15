/* The 10 quests. Each one has its own mascot, colours, voice, special feature and mission types.
   Question types:  num · mcq · seq · build · spin · reveal · fill · col · match · count · tf · pop · note   (see engine.js) */
window.THEMES = [

/* 0 ───────── MOMO'S BANANA QUEST ───────── */
{
  id: 'banana', title: "Momo's Banana Quest", mascot: '🐵', name: 'Momo', emoji: '🍌',
  tagline: 'Hop with the frog, fill the banana grid and blast off!', tags: ['Number line', 'Skip counting'],
  c1: '#FF9F1C', c2: '#FFD23F', bg: '#FFF4C9', style: 'chunky',
  palette: ['#1FB25A', '#FF9F1C', '#2FA8FF', '#7B4DFF', '#FF4D8D', '#E8590C'],
  deco: '🍌🥭🍌🐸🚀🍌', fx: { list: ['🍌', '⭐', '🎉'], mode: 'fall' }, burst: { list: ['🍌', '⭐'], mode: 'burst' },
  widget: { type: 'slots', label: '⭐ My stickers', empty: '▫️', items: ['🍌', '🌟', '🚀', '🦄', '🍦', '🎈', '🏆'] },
  hi: "Hi! I'm Momo! Help me count bananas in a flash!",
  cheers: ['Boing! Correct! 🎉', 'Zap! You got it! ⚡', 'Wow wow wow! 🌟', 'Banana-tastic! 🍌', 'You are on fire! 🔥', 'Yippee! 🙌'],
  oops: ['Oops! Look at the picture again 👀', 'Almost! Count the groups 🔍', 'Try again – you can do it! 💪'],
  win: 'Momo says: you are a multiplication SUPERSTAR!',
  learn: {
    tags: ['1 · Groups', '2 · Add', '3 · Multiply'],
    steps: [{ v: P.groups('🍌', 3, 2), cap: '3 bunches · 2 bananas in each' }, { big: '2 + 2 + 2 = 6', cap: 'Add the same number again and again' }, { big: '3 × 2 = 6', cap: '“×” means “groups of”' }],
    shortcut: '⚡ <mark>3 × 2</mark> = “3 groups of 2” = <mark>6</mark> bananas!'
  },
  missions: [
    { emoji: '🐸', title: 'Hop, Frog, Hop!', sub: 'Each hop is the same size. Where does the frog land?', qs: [
      { k: 'num', v: P.numline(2, 3, '🐸'), eq: '3 × 2 =', a: 6, ans: '3 hops of 2 → lands on 6' },
      { k: 'num', v: P.numline(5, 4, '🐸'), eq: '4 × 5 =', a: 20, ans: '4 hops of 5 → lands on 20' }] },
    { emoji: '🍌', title: 'Banana Grid', sub: 'Rows and columns make neat groups!', qs: [
      { k: 'num', v: P.array('🍌', 3, 4), cap: '3 rows of 4', eq: '3 × 4 =', a: 12, ans: '3 rows of 4 → 12' },
      { k: 'num', v: P.array('🍌', 2, 5), cap: '2 rows of 5', eq: '2 × 5 =', a: 10, ans: '2 rows of 5 → 10' }] },
    { emoji: '🔍', title: 'Spot the Picture', sub: 'Tap (or circle) the picture that matches!', qs: [
      { k: 'mcq', wide: true, ask: 'Which picture shows 3 × 4  (3 groups of 4)?', opts: [P.groups('🍓', 4, 3), P.groups('🍓', 3, 4), P.groups('🍓', 2, 6)], a: 1, ans: 'B: 3 groups of 4' }] },
    { emoji: '🚀', title: 'Skip-Count Rocket', sub: 'Blast off! Fill in the missing numbers.', qs: [
      { k: 'seq', wide: true, seq: [5, 10, null, 20, null], a: [15, 25], ans: '5, 10, 15, 20, 25 (count by 5s)' }] },
    { emoji: '🔗', title: 'Match the Bananas', sub: 'Tap a bunch on the left, then its partner on the right.', qs: [{ k: 'match', wide: true, pairs: [['2 groups of 5 🍌', '10'], ['3 groups of 3 🍌', '9'], ['4 groups of 2 🍌', '8'], ['5 groups of 3 🍌', '15']] }] },
    { emoji: '🏆', title: 'Treasure Boss', sub: 'The last challenge. You can do it!', qs: [
      { k: 'num', wide: true, ask: 'Momo has 5 baskets. Each basket has 4 mangoes 🥭. How many mangoes?', v: P.groups('🥭', 5, 4), eq: '5 × 4 =', a: 20, ans: '5 × 4 = 20' }] }
  ]
},

/* 1 ───────── SUPER SHOPKEEPER ───────── */
{
  id: 'market', title: "Ellie's Market Stall", mascot: '🐘', name: 'Ellie', emoji: '🛒',
  tagline: 'Count prices and packs like a real shopkeeper!', tags: ['₹ prices', 'Tables of 5 & 10'],
  c1: '#FF8A00', c2: '#FFD23F', bg: '#FFF1D6', style: 'chunky',
  palette: ['#FF8A00', '#E8590C', '#1FA3A3', '#7B4DFF', '#E83E8C', '#2B8A3E'],
  deco: '🍎🥕🍌🧅🥭🍋', fx: { list: ['🪙', '💰', '✨'], mode: 'fall' }, burst: { list: ['🪙', '🪙', '✨'], mode: 'burst' },
  widget: { type: 'till', label: '💰 Till' },
  hi: "Namaste! I'm Ellie. Help me run my market stall!",
  cheers: ['Cha-ching! Correct! 💰', 'Sold! Great sum! 🛍️', 'Fresh and right! 🍎', 'Ellie is clapping! 🐘👏', 'Bargain brain! 🧠'],
  oops: ['Oops! Check the price tags 👀', 'Count the packs again 🔍', 'Not quite – try once more! 💪'],
  win: 'The stall is SOLD OUT! You are a super shopkeeper!',
  learn: {
    tags: ['1 · Bags', '2 · Add', '3 · Multiply'],
    steps: [{ v: P.groups('🍎', 3, 4, { shape: 'jar' }), cap: '3 bags · 4 apples in each bag' }, { big: '4 + 4 + 4 = 12', cap: 'Add the same number again and again' }, { big: '3 × 4 = 12', cap: '“×” means “bags of”' }],
    shortcut: '⚡ <mark>3 × 4</mark> = “3 bags of 4” = <mark>12</mark> apples!'
  },
  missions: [
    { emoji: '🏷️', title: 'Price Tag Pairs', sub: 'Every item costs the same. How much do they cost together?', qs: [
      { k: 'num', v: P.groups('🍦', 3, 1, { shape: 'bubble', label: '₹5 each' }), eq: '3 × 5 = ₹', a: 15, ans: '3 × 5 = ₹15' },
      { k: 'num', v: P.groups('🖊️', 4, 1, { shape: 'bubble', label: '₹10 each' }), eq: '4 × 10 = ₹', a: 40, ans: '4 × 10 = ₹40' }] },
    { emoji: '🛍️', title: 'Fill the Bag', sub: 'Tap “Add” again and again until the bag has the right number!', qs: [
      { k: 'build', emoji: '🎈', unit: 3, target: 12, ask: 'Packs of 3 balloons. Fill the bag with 12 balloons!', label: 'a pack of 3 🎈', ans: '4 packs of 3 = 12 (4 × 3)' },
      { k: 'build', emoji: '🔵', unit: 5, target: 20, ask: 'Packs of 5 marbles. Fill the bag with 20 marbles!', label: 'a pack of 5 🔵', ans: '4 packs of 5 = 20 (4 × 5)' }] },
    { emoji: '🧾', title: 'Spot the Bill', sub: 'Which bill is right?', qs: [
      { k: 'mcq', txt: true, wide: true, ask: '4 notebooks cost ₹6 each. What is the bill?', opts: ['₹10', '₹24', '₹46'], a: 1, ans: '₹24 (4 × 6)' }] },
    { emoji: '🪙', title: 'Coin Counter', sub: 'Count the ₹10 notes in the till!', qs: [
      { k: 'seq', wide: true, seq: [10, 20, null, 40, null], a: [30, 50], ans: '10, 20, 30, 40, 50' }] },
    { emoji: '🍊', title: 'Count the Oranges', sub: 'Tap each bag to skip-count the oranges!', qs: [{ k: 'count', wide: true, emoji: '🍊', n: 3, each: 5, ask: '3 bags. 5 oranges in each bag.', eq: '3 × 5 =', a: 15 }] },
    { emoji: '🏆', title: 'Sold-Out Boss', sub: 'The last customer is here!', qs: [
      { k: 'num', wide: true, ask: 'Ellie sells 6 packs of pencils. Each pack has 5 pencils. How many pencils?', v: P.groups('✏️', 6, 5, { shape: 'jar' }), eq: '6 × 5 =', a: 30, ans: '6 × 5 = 30' }] }
  ]
},

/* 2 ───────── TRAIN ───────── */
{
  id: 'train', title: 'Chhuk-Chhuk Express', mascot: '🐻', name: 'Bruno', emoji: '🚂',
  tagline: 'All aboard! Count windows, seats and stations.', tags: ['Number line', 'Tables of 4, 5 & 6'],
  c1: '#1E88E5', c2: '#26C6DA', bg: '#E2F3FF', style: 'ticket',
  palette: ['#1E88E5', '#0B7285', '#E8590C', '#7B4DFF', '#D6336C', '#2B8A3E'],
  deco: '🚂🚃🚃🚃🌳⛰️', fx: { list: ['💨', '⭐', '🚃'], mode: 'fall' }, burst: { list: ['💨', '💨', '⭐'], mode: 'up' },
  widget: { type: 'train' },
  hi: "All aboard! I'm Bruno the train driver. Let's go!",
  cheers: ['Choo-choo! Correct! 🚂', 'All aboard the right answer! 🎫', 'Next stop: Success! 🚉', 'Toot-toot! 🎉', 'Full steam ahead! 💨'],
  oops: ['Wrong track! Look at the picture 👀', 'Signal is red – check again 🔴', 'Back up and try once more! 🚂'],
  win: 'The Express has reached the final station! You are the best engine driver!',
  learn: {
    tags: ['1 · Coaches', '2 · Add', '3 · Multiply'],
    steps: [{ v: P.groups('💺', 3, 5, { shape: 'rect' }), cap: '3 coaches · 5 seats in each' }, { big: '5 + 5 + 5 = 15', cap: 'Add the seats one coach at a time' }, { big: '3 × 5 = 15', cap: '“×” means “coaches of”' }],
    shortcut: '⚡ <mark>3 × 5</mark> = “3 coaches of 5” = <mark>15</mark> seats!'
  },
  missions: [
    { emoji: '🪟', title: 'Count the Windows', sub: 'Each coach has the same number of windows.', qs: [
      { k: 'num', v: P.groups('🪟', 2, 6, { shape: 'rect' }), eq: '2 × 6 =', a: 12, ans: '2 × 6 = 12' },
      { k: 'num', v: P.groups('🪟', 5, 4, { shape: 'rect' }), eq: '5 × 4 =', a: 20, ans: '5 × 4 = 20' }] },
    { emoji: '💺', title: 'Seat Hunt', sub: 'Seats sit in neat rows.', qs: [
      { k: 'num', v: P.array('💺', 3, 6), cap: '3 rows of 6', eq: '3 × 6 =', a: 18, ans: '3 × 6 = 18' },
      { k: 'num', v: P.array('💺', 2, 8), cap: '2 rows of 8', eq: '2 × 8 =', a: 16, ans: '2 × 8 = 16' }] },
    { emoji: '🚉', title: 'Station Hops', sub: 'The train stops every 4 stations. Where does it end?', qs: [
      { k: 'num', wide: true, v: P.numline(4, 4, '🚂'), eq: '4 × 4 =', a: 16, ans: '4 hops of 4 → station 16' }] },
    { emoji: '🎫', title: 'Ticket Check', sub: 'Pick the right price.', qs: [
      { k: 'mcq', txt: true, wide: true, ask: 'A ticket costs ₹10. What do 6 tickets cost?', opts: ['₹16', '₹60', '₹600'], a: 1, ans: '₹60 (6 × 10)' }] },
    { emoji: '✅', title: 'True or False?', sub: 'Is the sum right? Tap True or False.', qs: [{ k: 'tf', st: '4 × 3 = 12', a: true }, { k: 'tf', st: '5 × 2 = 12', a: false }, { k: 'tf', st: '3 × 3 = 9', a: true }] },
    { emoji: '🏆', title: 'Big Train Boss', sub: 'The longest train of the day!', qs: [
      { k: 'num', wide: true, ask: 'A big train has 7 coaches. Each coach has 5 seats. How many seats in all?', v: P.groups('💺', 7, 5, { shape: 'rect' }), eq: '7 × 5 =', a: 35, ans: '7 × 5 = 35' }] }
  ]
},

/* 3 ───────── CRICKET ───────── */
{
  id: 'cricket', title: 'Cricket Champions', mascot: '🦁', name: 'Captain Leo', emoji: '🏏',
  tagline: 'Score big with overs, fours and sixes!', tags: ['Table of 6', 'Scoreboard'],
  c1: '#0B8F4D', c2: '#F4D03F', bg: '#E1F6E7', style: 'chunky',
  palette: ['#0B8F4D', '#D9480F', '#1971C2', '#7048E8', '#C2255C', '#E67700'],
  deco: '🏏🏟️🔴🧢🏆🏏', fx: { list: ['🏏', '🔴', '🏆'], mode: 'fall' }, burst: { list: ['🔴', '✨'], mode: 'fly' },
  widget: { type: 'score' },
  hi: "Welcome to the stadium! I'm Captain Leo. Let's score!",
  cheers: ['FOUR! 🏏', 'SIXER! Out of the park! 🎉', 'Howzat?! Correct! 👆', 'A century of smarts! 💯', 'Man of the match! 🏆'],
  oops: ['Dot ball! Count again 👀', 'Wide! Look at the picture 🔍', 'Missed it – play again! 💪'],
  win: 'WHAT A VICTORY! You are the Player of the Series!',
  learn: {
    tags: ['1 · Overs', '2 · Add', '3 · Multiply'],
    steps: [{ v: P.groups('🔴', 3, 6, { shape: 'rect' }), cap: '3 overs · 6 balls in each over' }, { big: '6 + 6 + 6 = 18', cap: 'Add the balls over by over' }, { big: '3 × 6 = 18', cap: '“×” means “overs of”' }],
    shortcut: '⚡ <mark>3 × 6</mark> = “3 overs of 6” = <mark>18</mark> balls!'
  },
  missions: [
    { emoji: '🔴', title: 'Balls in an Over', sub: 'One over always has 6 balls.', qs: [
      { k: 'num', v: P.groups('🔴', 2, 6, { shape: 'rect' }), eq: '2 × 6 =', a: 12, ans: '2 × 6 = 12' },
      { k: 'num', v: P.groups('🔴', 5, 6, { shape: 'rect' }), eq: '5 × 6 =', a: 30, ans: '5 × 6 = 30' }] },
    { emoji: '4️⃣', title: 'Boundary Count', sub: 'A four is worth 4 runs. How many runs?', qs: [
      { k: 'num', v: P.groups('🏏', 3, 1, { shape: 'bubble', label: '4 runs' }), eq: '3 × 4 =', a: 12, ans: '3 × 4 = 12 runs' },
      { k: 'num', v: P.groups('🏏', 5, 1, { shape: 'bubble', label: '4 runs' }), eq: '5 × 4 =', a: 20, ans: '5 × 4 = 20 runs' }] },
    { emoji: '6️⃣', title: 'Sixer Time!', sub: 'Pick the right score.', qs: [
      { k: 'mcq', txt: true, wide: true, ask: 'Leo hits 7 sixes. How many runs is that?', opts: ['13', '42', '67'], a: 1, ans: '42 (7 × 6)' }] },
    { emoji: '📈', title: 'Run-Rate Rocket', sub: 'Count by 6s, over by over.', qs: [
      { k: 'seq', wide: true, seq: [6, 12, null, 24, null], a: [18, 30], ans: '6, 12, 18, 24, 30' }] },
    { emoji: '🎈', title: 'Pop the Scores!', sub: 'Pop every balloon that is in the table of 4.', qs: [{ k: 'pop', wide: true, ask: 'Pop the numbers you say when you count by 4s.', items: [8, 10, 12, 15, 16, 18], good: [8, 12, 16] }] },
    { emoji: '🏆', title: 'Final Over Boss', sub: 'The match is on the line!', qs: [
      { k: 'num', wide: true, ask: 'Leo bowls 4 overs. Each over has 6 balls. How many balls does he bowl?', v: P.groups('🔴', 4, 6, { shape: 'rect' }), eq: '4 × 6 =', a: 24, ans: '4 × 6 = 24' }] }
  ]
},

/* 4 ───────── BAKERY ───────── */
{
  id: 'bakery', title: "Bella's Cupcake Bakery", mascot: '🐰', name: 'Bella', emoji: '🧁',
  tagline: 'Fill trays, box treats and double the recipe!', tags: ['Rows & trays', 'Tables of 2, 3 & 5'],
  c1: '#E75480', c2: '#FFB3D1', bg: '#FFEAF3', style: 'soft',
  palette: ['#E75480', '#B5651D', '#7B4DFF', '#1FA3A3', '#E8590C', '#D6336C'],
  deco: '🧁🍰🍩🍪🎂🥐', fx: { list: ['🍬', '🍓', '✨'], mode: 'fall' }, burst: { list: ['🍬', '🍓', '✨'], mode: 'burst' },
  widget: { type: 'slots', label: '🍰 Bakery shelf', empty: '▫️', items: ['🧁', '🍰', '🍩', '🍪', '🎂', '🥐', '🍮'] },
  hi: "Hello! I'm Bella. Can you help me bake and count?",
  cheers: ['Sweet! Correct! 🍰', 'Yum-tastic! 🧁', 'Baked to perfection! 🔥', 'Bella is hopping with joy! 🐰', 'Delicious sum! 🍓'],
  oops: ['Oops! The cake needs another look 👀', 'Count the cupcakes again 🔍', 'Almost baked – try once more! 🍪'],
  win: 'The bakery is FULL! You are the best baker in town!',
  learn: {
    tags: ['1 · Boxes', '2 · Add', '3 · Multiply'],
    steps: [{ v: P.groups('🍩', 2, 6, { shape: 'jar' }), cap: '2 boxes · 6 donuts in each box' }, { big: '6 + 6 = 12', cap: 'Add the donuts box by box' }, { big: '2 × 6 = 12', cap: '“×” means “boxes of”' }],
    shortcut: '⚡ <mark>2 × 6</mark> = “2 boxes of 6” = <mark>12</mark> donuts!'
  },
  missions: [
    { emoji: '🧁', title: 'Fill the Tray', sub: 'Trays have neat rows. Count rows × cupcakes in a row.', qs: [
      { k: 'num', v: P.array('🧁', 3, 5, { skin: 'tray' }), cap: '3 rows of 5', eq: '3 × 5 =', a: 15, ans: '3 × 5 = 15' },
      { k: 'num', v: P.array('🍪', 4, 4, { skin: 'tray' }), cap: '4 rows of 4', eq: '4 × 4 =', a: 16, ans: '4 × 4 = 16' }] },
    { emoji: '🥚', title: 'Double the Recipe', sub: 'Making more cakes needs more ingredients!', qs: [
      { k: 'num', v: P.groups('🥚', 4, 3, { shape: 'bubble' }), ask: '1 cake needs 3 eggs. 4 cakes need…', eq: '4 × 3 =', a: 12, ans: '4 × 3 = 12 eggs' },
      { k: 'num', v: P.groups('🥄', 5, 2, { shape: 'bubble' }), ask: '1 cake needs 2 spoons of sugar. 5 cakes need…', eq: '5 × 2 =', a: 10, ans: '5 × 2 = 10 spoons' }] },
    { emoji: '📦', title: 'Box It Up', sub: 'Tap the picture that shows 2 groups of 6.', qs: [
      { k: 'mcq', wide: true, ask: 'Which box shows 2 × 6  (2 groups of 6)?', opts: [P.groups('🧁', 6, 2, { shape: 'jar' }), P.groups('🧁', 2, 6, { shape: 'jar' }), P.groups('🧁', 3, 4, { shape: 'jar' })], a: 1, ans: 'B: 2 groups of 6' }] },
    { emoji: '🕯️', title: 'Candle Counter', sub: 'Count the candles by 3s.', qs: [
      { k: 'seq', wide: true, seq: [3, 6, null, 12, null], a: [9, 15], ans: '3, 6, 9, 12, 15' }] },
    { emoji: '🍬', title: 'Sprinkle Count', sub: 'Tap each cupcake to count the sprinkles.', qs: [{ k: 'count', wide: true, emoji: '🍬', n: 4, each: 3, ask: '4 cupcakes. 3 sprinkles on each cupcake.', eq: '4 × 3 =', a: 12 }] },
    { emoji: '🏆', title: 'Bake-Off Boss', sub: 'The big order is in!', qs: [
      { k: 'num', wide: true, ask: 'Bella packs 6 boxes. Each box holds 4 cupcakes. How many cupcakes?', v: P.groups('🧁', 6, 4, { shape: 'jar' }), eq: '6 × 4 =', a: 24, ans: '6 × 4 = 24' }] }
  ]
},

/* 5 ───────── ZOO ───────── */
{
  id: 'zoo', title: 'Pandu the Zoo Helper', mascot: '🐼', name: 'Pandu', emoji: '🦁',
  tagline: 'Count legs, wings and snacks for the animals!', tags: ['Tables of 2, 4 & 5', 'Animal groups'],
  c1: '#2E9E6B', c2: '#FFB703', bg: '#E9F8DA', style: 'chunky',
  palette: ['#2E9E6B', '#E8590C', '#1971C2', '#B5651D', '#7048E8', '#D6336C'],
  deco: '🦁🐘🦒🐼🦓🐧', fx: { list: ['🐾', '⭐', '🍌'], mode: 'fall' }, burst: { list: ['🐾', '🐾', '⭐'], mode: 'burst' },
  widget: { type: 'slots', label: '📖 Zoo passport', empty: '🐾', items: ['🦁', '🐘', '🦒', '🦓', '🦜', '🐧', '🐼'] },
  hi: "Hi! I'm Pandu the panda. Let's meet the animals!",
  cheers: ['Roar! Correct! 🦁', 'Wild! You got it! 🐾', 'Trumpet! Elephant-astic! 🐘', 'Pandu is rolling with joy! 🐼', 'Zoo-per smart! 🧠'],
  oops: ['Oops! Check the animals again 🔍', 'Count the legs once more 🐾', 'Not quite – try again! 💪'],
  win: 'Every animal is fed! You are the Zoo Champion!',
  learn: {
    tags: ['1 · Animals', '2 · Add', '3 · Multiply'],
    steps: [{ v: P.groups('🐶', 3, 1, { shape: 'bubble', label: '4 legs' }), cap: '3 dogs · 4 legs on each dog' }, { big: '4 + 4 + 4 = 12', cap: 'Add the legs dog by dog' }, { big: '3 × 4 = 12', cap: '“×” means “dogs of”' }],
    shortcut: '⚡ <mark>3 × 4</mark> = “3 dogs with 4 legs” = <mark>12</mark> legs!'
  },
  missions: [
    { emoji: '🐾', title: 'Count the Legs', sub: 'How many legs in all?', qs: [
      { k: 'num', v: P.groups('🐶', 2, 1, { shape: 'bubble', label: '4 legs' }), eq: '2 × 4 =', a: 8, ans: '2 × 4 = 8 legs' },
      { k: 'num', v: P.groups('🐄', 5, 1, { shape: 'bubble', label: '4 legs' }), eq: '5 × 4 =', a: 20, ans: '5 × 4 = 20 legs' }] },
    { emoji: '🪽', title: 'Count the Wings', sub: 'Every bird and butterfly has 2 wings.', qs: [
      { k: 'num', v: P.groups('🦜', 6, 1, { shape: 'bubble', label: '2 wings' }), eq: '6 × 2 =', a: 12, ans: '6 × 2 = 12 wings' },
      { k: 'num', v: P.groups('🦋', 7, 1, { shape: 'bubble', label: '2 wings' }), eq: '7 × 2 =', a: 14, ans: '7 × 2 = 14 wings' }] },
    { emoji: '🐟', title: 'Feeding Time', sub: 'Pick the right number of fish.', qs: [
      { k: 'mcq', txt: true, wide: true, ask: 'Each seal 🦭 eats 3 fish. How many fish do 5 seals eat?', opts: ['8', '15', '35'], a: 1, ans: '15 (5 × 3)' }] },
    { emoji: '👣', title: 'Pawprint Trail', sub: 'Follow the footprints. Count by 4s!', qs: [
      { k: 'seq', wide: true, seq: [4, 8, null, 16, null], a: [12, 20], ans: '4, 8, 12, 16, 20' }] },
    { emoji: '🔗', title: 'Match the Legs', sub: 'Join each animal group to its total legs.', qs: [{ k: 'match', wide: true, pairs: [['3 chickens 🐔 (2 legs each)', '6 legs'], ['3 cows 🐄 (4 legs each)', '12 legs'], ['5 birds 🐦 (2 legs each)', '10 legs'], ['2 spiders 🕷️ (8 legs each)', '16 legs']] }] },
    { emoji: '🏆', title: 'Elephant Boss', sub: 'A very hungry herd!', qs: [
      { k: 'num', wide: true, ask: 'Each elephant eats 5 bananas a day. How many bananas for 6 elephants?', v: P.groups('🍌', 6, 5, { shape: 'bubble' }), eq: '6 × 5 =', a: 30, ans: '6 × 5 = 30' }] }
  ]
},

/* 6 ───────── FUN FAIR ───────── */
{
  id: 'fair', title: 'Sparkle Fun Fair', mascot: '🦄', name: 'Sparkle', emoji: '🎡',
  tagline: 'Spin the wheel, win prizes, multiply!', tags: ['Spinner game', 'Tables of 2, 3 & 5'],
  c1: '#8E2DE2', c2: '#FF5FA2', bg: '#F6E8FF', style: 'ticket',
  palette: ['#8E2DE2', '#E8590C', '#1971C2', '#D6336C', '#2B8A3E', '#C92A2A'],
  deco: '🎡🎪🎈🎠🎟️🎯', fx: { list: ['🎈', '🎉', '🧸'], mode: 'fall' }, burst: { list: ['🎈', '🎉'], mode: 'up' },
  widget: { type: 'slots', label: '🎟️ Prize tickets', empty: '▫️', items: ['🎟️', '🎟️', '🎟️', '🎟️', '🎟️', '🎟️', '🧸'] },
  hi: "Step right up! I'm Sparkle. Let's play at the fair!",
  cheers: ['Step right up – correct! 🎪', 'Ding-ding-ding! 🔔', 'Jackpot! 🎰', 'Sparkle is dancing! 🦄', 'Fair and square! 🎡'],
  oops: ['So close! Try again 🎡', 'Oops! Count the tickets 🎟️', 'The wheel says: look again 👀'],
  win: 'JACKPOT! You win the BIG teddy bear! 🧸',
  learn: {
    tags: ['1 · Rides', '2 · Add', '3 · Multiply'],
    steps: [{ v: P.groups('🎟️', 3, 2, { shape: 'rect' }), cap: '3 rides · 2 tickets for each ride' }, { big: '2 + 2 + 2 = 6', cap: 'Add the tickets ride by ride' }, { big: '3 × 2 = 6', cap: '“×” means “rides of”' }],
    shortcut: '⚡ <mark>3 × 2</mark> = “3 rides of 2 tickets” = <mark>6</mark> tickets!'
  },
  missions: [
    { emoji: '🎟️', title: 'Ticket Booth', sub: 'Each ride needs the same number of tickets.', qs: [
      { k: 'num', v: P.groups('🎟️', 4, 3, { shape: 'rect' }), eq: '4 × 3 =', a: 12, ans: '4 × 3 = 12' },
      { k: 'num', v: P.groups('🎟️', 5, 2, { shape: 'rect' }), eq: '5 × 2 =', a: 10, ans: '5 × 2 = 10' }] },
    { emoji: '🎯', title: 'Balloon Darts', sub: 'Each dart scores the same points.', qs: [
      { k: 'num', v: P.groups('🎈', 3, 5, { shape: 'bubble' }), ask: '3 darts, 5 balloons popped by each:', eq: '3 × 5 =', a: 15, ans: '3 × 5 = 15' },
      { k: 'num', v: P.groups('🎯', 4, 1, { shape: 'bubble', label: '10 points' }), eq: '4 × 10 =', a: 40, ans: '4 × 10 = 40 points' }] },
    { emoji: '🎡', title: 'Spin the Wheel!', sub: 'Tap SPIN. Then multiply your number!', qs: [
      { k: 'spin', wide: true, val: 7, mult: 2, a: 14, ans: 'Wheel lands on 7 → 7 × 2 = 14' }] },
    { emoji: '🎠', title: 'Ferris Wheel', sub: 'Pick the right number of kids.', qs: [
      { k: 'mcq', txt: true, wide: true, ask: 'A Ferris wheel has 8 seats. Each seat holds 3 kids. How many kids?', opts: ['11', '24', '83'], a: 1, ans: '24 (8 × 3)' }] },
    { emoji: '🎈', title: 'Count the Balloons', sub: 'Tap every balloon once to count them all.', qs: [{ k: 'count', wide: true, by: 'one', emoji: '🎈', n: 2, each: 5, ask: '2 strings. 5 balloons on each string.', eq: '2 × 5 =', a: 10 }] },
    { emoji: '🏆', title: 'Big Prize Boss', sub: 'One more game to win the teddy!', qs: [
      { k: 'num', wide: true, ask: 'Each prize bag has 6 sweets 🍬. Sparkle wins 5 bags. How many sweets?', v: P.groups('🍬', 5, 6, { shape: 'rect' }), eq: '5 × 6 =', a: 30, ans: '5 × 6 = 30' }] }
  ]
},

/* 7 ───────── DETECTIVE ───────── */
{
  id: 'detective', title: 'The Missing Pencils Mystery', mascot: '🦊', name: 'Detective Fox', emoji: '🕵️',
  tagline: 'Find clues, crack codes and catch the pencil thief!', tags: ['Mystery clues', 'Tables of 2–5'],
  c1: '#3F51B5', c2: '#FFC107', bg: '#E8EAF6', style: 'paper',
  palette: ['#3F51B5', '#B5651D', '#2B8A3E', '#C2255C', '#E8590C', '#0B7285'],
  deco: '🔍🕵️👣📓🔦🗝️', fx: { list: ['🔍', '👣', '⭐'], mode: 'fall' }, burst: { list: ['🔍', '✨'], mode: 'burst' },
  widget: { type: 'clues', label: '📓 Clue notebook' },
  clues: ['Clue 1: The thief has tiny footprints 👣', 'Clue 2: They only took sharp pencils ✏️', 'Clue 3: A green feather was on the floor 🪶', 'Clue 4: The window was open 🪟', 'Clue 5: Someone heard a loud squawk 🔊', 'Clue 6: There are crumbs on the desk 🍪', 'CASE SOLVED! The thief is the class parrot 🦜!'],
  hi: "I'm Detective Fox. Solve each puzzle to reveal a clue!",
  cheers: ['Elementary! Correct! 🔎', 'Great detective work! 🕵️', 'Case-cracking! 🧠'],
  oops: ['Hmm… check the evidence again 🔍', 'That clue does not fit. Look again! 👀', 'Detectives never give up! 💪'],
  win: 'CASE CLOSED! You are the best detective in school!',
  learn: {
    tags: ['1 · Boxes', '2 · Add', '3 · Multiply'],
    steps: [{ v: P.groups('✏️', 3, 4, { shape: 'rect' }), cap: '3 boxes · 4 pencils in each box' }, { big: '4 + 4 + 4 = 12', cap: 'Add the pencils box by box' }, { big: '3 × 4 = 12', cap: '“×” means “boxes of”' }],
    shortcut: '⚡ <mark>3 × 4</mark> = “3 boxes of 4” = <mark>12</mark> pencils!'
  },
  missions: [
    { emoji: '🧰', title: 'Count the Evidence', sub: 'Count what was in the classroom.', qs: [
      { k: 'num', v: P.groups('✏️', 5, 3, { shape: 'rect' }), ask: '5 pencil boxes, 3 pencils in each:', eq: '5 × 3 =', a: 15, ans: '5 × 3 = 15' },
      { k: 'num', v: P.array('📚', 3, 6), cap: '3 shelves of 6 books', eq: '3 × 6 =', a: 18, ans: '3 × 6 = 18' }] },
    { emoji: '🪑', title: 'Desk Detective', sub: 'Count the desks and windows in rows.', qs: [
      { k: 'num', v: P.array('🪑', 4, 5, { skin: 'grid' }), cap: '4 rows of 5 desks', eq: '4 × 5 =', a: 20, ans: '4 × 5 = 20' },
      { k: 'num', v: P.array('🪟', 3, 4, { skin: 'grid' }), cap: '3 rows of 4 windows', eq: '3 × 4 =', a: 12, ans: '3 × 4 = 12' }] },
    { emoji: '🔐', title: 'Crack the Code', sub: 'A secret riddle!', qs: [
      { k: 'mcq', txt: true, wide: true, ask: 'I am 6 groups of 3. Who am I?', opts: ['9', '18', '63'], a: 1, ans: '18 (6 × 3)' }] },
    { emoji: '👣', title: 'Footprint Trail', sub: 'Follow the footprints. Count by 2s!', qs: [
      { k: 'seq', wide: true, seq: [2, 4, null, 8, null], a: [6, 10], ans: '2, 4, 6, 8, 10' }] },
    { emoji: '🎈', title: 'Pop the Clues', sub: 'Pop every number in the table of 3.', qs: [{ k: 'pop', wide: true, ask: 'Which numbers are in the table of 3?', items: [6, 7, 9, 12, 13, 15], good: [6, 9, 12, 15] }] },
    { emoji: '🏆', title: 'The Final Clue', sub: 'How many pencils did the thief take?', qs: [
      { k: 'num', wide: true, ask: 'The thief took 4 pencils from each of 6 desks. How many pencils are missing?', v: P.groups('✏️', 6, 4, { shape: 'rect' }), eq: '6 × 4 =', a: 24, ans: '6 × 4 = 24' }] }
  ]
},

/* 8 ───────── GARDEN ───────── */
{
  id: 'garden', title: "Buzzy's Magic Garden", mascot: '🐝', name: 'Buzzy', emoji: '🌻',
  tagline: 'Plant rows, count petals and watch the garden grow!', tags: ['Rows & arrays', 'Tables of 3, 4 & 5'],
  c1: '#43A047', c2: '#FFEB3B', bg: '#EAF8DD', style: 'soft',
  palette: ['#43A047', '#E8590C', '#7B4DFF', '#D6336C', '#1971C2', '#B5651D'],
  deco: '🌻🌷🌼🐝🦋🌱', fx: { list: ['🌸', '🌼', '🦋'], mode: 'fall' }, burst: { list: ['🌸', '🌼', '🦋'], mode: 'up' },
  widget: { type: 'slots', label: '🌱 My garden', empty: '🌱', items: ['🌻', '🌷', '🌹', '🌼', '🪻', '🌺', '💐'] },
  hi: "Buzz buzz! I'm Buzzy. Help me grow my garden!",
  cheers: ['Bloom-tastic! 🌸', 'Buzz-buzz! Correct! 🐝', 'Growing smart! 🌱', 'Buzzy is dancing! 💃', 'Honey of an answer! 🍯'],
  oops: ['Oops! The seed needs more light – look again 👀', 'Count the plants again 🔍', 'Almost! Water it and try once more 💧'],
  win: 'The garden is in FULL BLOOM! You are a super gardener!',
  learn: {
    tags: ['1 · Rows', '2 · Add', '3 · Multiply'],
    steps: [{ v: P.array('🌱', 2, 4, { skin: 'soil' }), cap: '2 rows · 4 seeds in each row' }, { big: '4 + 4 = 8', cap: 'Add the seeds row by row' }, { big: '2 × 4 = 8', cap: '“×” means “rows of”' }],
    shortcut: '⚡ <mark>2 × 4</mark> = “2 rows of 4” = <mark>8</mark> seeds!'
  },
  missions: [
    { emoji: '🌱', title: 'Plant the Rows', sub: 'Plants grow in neat rows.', qs: [
      { k: 'num', v: P.array('🌱', 3, 5, { skin: 'soil' }), cap: '3 rows of 5', eq: '3 × 5 =', a: 15, ans: '3 × 5 = 15' },
      { k: 'num', v: P.array('🌷', 5, 4, { skin: 'soil' }), cap: '5 rows of 4', eq: '5 × 4 =', a: 20, ans: '5 × 4 = 20' }] },
    { emoji: '🌼', title: 'Petal Power', sub: 'Count petals and wings!', qs: [
      { k: 'num', v: P.groups('🌼', 6, 1, { shape: 'bubble', label: '5 petals' }), eq: '6 × 5 =', a: 30, ans: '6 × 5 = 30 petals' },
      { k: 'num', v: P.groups('🦋', 8, 1, { shape: 'bubble', label: '2 wings' }), eq: '8 × 2 =', a: 16, ans: '8 × 2 = 16 wings' }] },
    { emoji: '🚿', title: 'Watering Cans', sub: 'Pick the right amount of water.', qs: [
      { k: 'mcq', txt: true, wide: true, ask: 'Each watering can holds 4 litres. How many litres do 7 cans hold?', opts: ['11', '28', '47'], a: 1, ans: '28 (7 × 4)' }] },
    { emoji: '🌿', title: 'Grow by Tens', sub: 'The plant grows 10 cm every week!', qs: [
      { k: 'seq', wide: true, seq: [10, 20, null, 40, null], a: [30, 50], ans: '10, 20, 30, 40, 50' }] },
    { emoji: '🌷', title: 'Count the Flowers', sub: 'Tap every flower once to count them all.', qs: [{ k: 'count', wide: true, by: 'one', emoji: '🌷', n: 3, each: 4, ask: '3 flower pots. 4 flowers in each pot.', eq: '3 × 4 =', a: 12 }] },
    { emoji: '🏆', title: 'Harvest Boss', sub: 'Time to pick the tomatoes!', qs: [
      { k: 'num', wide: true, ask: 'Each plant gives 4 tomatoes 🍅. How many tomatoes do 6 plants give?', v: P.groups('🍅', 6, 4, { shape: 'bubble' }), eq: '6 × 4 =', a: 24, ans: '6 × 4 = 24' }] }
  ]
},

/* 9 ───────── ROBO FACTORY ───────── */
{
  id: 'robo', title: 'Beep’s Robo Factory', mascot: '🤖', name: 'Beep', emoji: '⚙️',
  tagline: 'Feed the machine and build your very own robot!', tags: ['Function machine', 'Tables of 3, 4 & 6'],
  c1: '#0097A7', c2: '#7C4DFF', bg: '#DDF6FA', style: 'tech',
  palette: ['#0097A7', '#7C4DFF', '#E8590C', '#D6336C', '#2B8A3E', '#1971C2'],
  deco: '🤖⚙️🔩💡🔋🛰️', fx: { list: ['⚡', '🔩', '✨'], mode: 'fall' }, burst: { list: ['⚡', '🔩'], mode: 'burst' },
  widget: { type: 'slots', label: '🔧 Robot parts', empty: '◻️', items: ['🤖', '🔩', '🦾', '🦾', '🦿', '🦿', '📡'] },
  hi: 'BEEP-BOOP! I am Beep. Please help me build robots!',
  cheers: ['BEEP-BOOP! Correct! 🤖', 'Processing… 100% ✅', 'Circuits happy! ⚡', 'Beep is spinning! 🌀', 'Zzzap! Great! 🔋'],
  oops: ['ERROR! Please re-check ⚠️', 'Beep says: look at the machine 👀', 'Rebooting… try again! 🔄'],
  win: 'ROBOT COMPLETE! You are the Chief Robot Engineer!',
  learn: {
    tags: ['1 · Robots', '2 · Add', '3 · The machine'],
    steps: [{ v: P.groups('🤖', 3, 1, { shape: 'bubble', label: '2 arms' }), cap: '3 robots · 2 arms on each' }, { big: '2 + 2 + 2 = 6', cap: 'Add the arms robot by robot' }, { v: P.machine(3, 2), cap: 'IN 2 → × 3 → OUT 6' }],
    shortcut: '⚡ The machine multiplies: <mark>2 × 3</mark> = <mark>6</mark>!'
  },
  missions: [
    { emoji: '⚙️', title: 'Feed the Machine', sub: 'Put the number IN. What comes OUT?', qs: [
      { k: 'num', v: P.machine(3, 4), eq: '4 × 3 =', a: 12, ans: 'IN 4, × 3 → OUT 12' },
      { k: 'num', v: P.machine(3, 7), eq: '7 × 3 =', a: 21, ans: 'IN 7, × 3 → OUT 21' }] },
    { emoji: '🔧', title: 'Build-a-Robot', sub: 'Count the robot parts.', qs: [
      { k: 'num', v: P.groups('🦾', 5, 1, { shape: 'bubble', label: '2 arms' }), eq: '5 × 2 =', a: 10, ans: '5 × 2 = 10 arms' },
      { k: 'num', v: P.groups('🔘', 6, 3, { shape: 'rect' }), ask: '6 robots, 3 buttons on each:', eq: '6 × 3 =', a: 18, ans: '6 × 3 = 18 buttons' }] },
    { emoji: '🛠️', title: 'Fix the Robot', sub: 'Beep made a mistake! Find the right answer.', qs: [
      { k: 'mcq', txt: true, wide: true, ask: 'Beep wrote  4 × 5 = 25.  What is the CORRECT answer?', opts: ['20', '9', '45'], a: 0, ans: '20 (4 × 5 = 20)' }] },
    { emoji: '🔩', title: 'Count the Gears', sub: 'The gears turn in sixes!', qs: [
      { k: 'seq', wide: true, seq: [6, 12, null, 24, null], a: [18, 30], ans: '6, 12, 18, 24, 30' }] },
    { emoji: '🎈', title: 'Pop the Parts', sub: 'The ×2 machine only makes even numbers. Pop the ones it can make!', qs: [{ k: 'pop', wide: true, ask: 'Which numbers can the × 2 machine make?', items: [4, 6, 7, 10, 11, 14], good: [4, 6, 10, 14] }] },
    { emoji: '🏆', title: 'Mega Machine Boss', sub: 'The BIGGEST machine!', qs: [
      { k: 'num', wide: true, v: P.machine(4, 8), ask: 'The Mega Machine multiplies by 4. Put in 8!', eq: '8 × 4 =', a: 32, ans: 'IN 8, × 4 → OUT 32' }] }
  ]
},

/* 10 ───────── FESTIVAL OF LIGHTS ───────── */
{
  id: 'festival', title: "Mayu's Festival of Lights", mascot: '🦚', name: 'Mayu', emoji: '🪔',
  tagline: 'Light the diyas and colour a secret rangoli!', tags: ['Colour by number', 'Tables of 2–6'],
  c1: '#FF6F00', c2: '#AD1457', bg: '#2A1B5E', style: 'neon',
  palette: ['#FF6F00', '#AD1457', '#7B1FA2', '#00897B', '#E65100', '#C62828'],
  deco: '🪔✨🪔🎆🪔✨', fx: { list: ['✨', '🎆', '🪔'], mode: 'fall' }, burst: { list: ['✨', '🎆'], mode: 'burst' },
  widget: { type: 'slots', label: '🪔 Light the diyas', empty: '⚫', items: ['🪔', '🪔', '🪔', '🪔', '🪔', '🪔', '🪔', '🪔'] },
  hi: "Shubh Deepavali! I'm Mayu. Let's light up the night!",
  cheers: ['Shubh! Correct! 🪔', 'Sparkle! ✨', 'Light up the sky! 🎆', 'Mayu is dancing! 🦚', 'Glowing answer! 💛'],
  oops: ['Oops! Look at the diyas again 🪔', 'Count the rows once more 🔍', 'Almost! Try again 💪'],
  win: 'The whole town is GLOWING! You are a shining star!',
  learn: {
    tags: ['1 · Rows', '2 · Add', '3 · Multiply'],
    steps: [{ v: P.array('🪔', 2, 4), cap: '2 rows · 4 diyas in each row' }, { big: '4 + 4 = 8', cap: 'Add the diyas row by row' }, { big: '2 × 4 = 8', cap: '“×” means “rows of”' }],
    shortcut: '⚡ <mark>2 × 4</mark> = “2 rows of 4” = <mark>8</mark> diyas!'
  },
  missions: [
    { emoji: '🪔', title: 'Light the Diyas', sub: 'Diyas stand in neat rows.', qs: [
      { k: 'num', v: P.array('🪔', 3, 6), cap: '3 rows of 6', eq: '3 × 6 =', a: 18, ans: '3 × 6 = 18' },
      { k: 'num', v: P.array('🪔', 4, 5), cap: '4 rows of 5', eq: '4 × 5 =', a: 20, ans: '4 × 5 = 20' }] },
    { emoji: '🎨', title: 'Colour the Rangoli', sub: 'Solve each sum. Its answer picks the colour!', qs: [
      { k: 'reveal', wide: true, cols: 3,
        key: '<span class="kc" style="background:#FF9F1C"></span>6 = orange &nbsp; <span class="kc" style="background:#FF5CA8"></span>8 = pink &nbsp; <span class="kc" style="background:#FFE14D"></span>9 = yellow',
        cells: [
          { r: 0, c: 1, eq: '2 × 3', a: 6, color: '#FF9F1C' }, { r: 1, c: 0, eq: '2 × 4', a: 8, color: '#FF5CA8' },
          { r: 1, c: 1, eq: '3 × 3', a: 9, color: '#FFE14D' }, { r: 1, c: 2, eq: '2 × 4', a: 8, color: '#FF5CA8' },
          { r: 2, c: 1, eq: '2 × 3', a: 6, color: '#FF9F1C' }],
        ans: '2×3=6 · 2×4=8 · 3×3=9 · 2×4=8 · 2×3=6' }] },
    { emoji: '🔗', title: 'Match the Diyas', sub: 'Join each diya pattern to how many diyas there are.', qs: [{ k: 'match', wide: true, pairs: [['2 rows of 3 🪔', '6'], ['3 rows of 4 🪔', '12'], ['4 rows of 5 🪔', '20'], ['5 rows of 2 🪔', '10']] }] },
    { emoji: '🏆', title: 'Grand Lights Boss', sub: 'Light up the temple steps!', qs: [
      { k: 'num', wide: true, ask: 'Each step has 6 diyas. There are 4 steps. How many diyas?', v: P.array('🪔', 4, 6), eq: '4 × 6 =', a: 24, ans: '4 × 6 = 24' }] }
  ]
}
];
