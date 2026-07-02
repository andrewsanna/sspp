// ============================================
// SSPP Parish Life — post data
//
// To add a new post: copy any object below and edit its fields, then
// paste it at the TOP of the array (posts display newest first, in
// the order they appear here — no auto-sorting).
//
// Fields:
//   id        — unique slug, used internally (letters, numbers, dashes)
//   category  — one of: 'message', 'life-together', 'ministry', 'event'
//               (controls the colored badge + accent color)
//   title     — headline shown on the card
//   date      — 'Month D, YYYY' — shown on the card
//   author    — optional byline, e.g. 'Fr. Rick Andrews'
//   excerpt   — 1–2 sentence teaser shown when the card is collapsed
//   body      — full text. Separate paragraphs with a blank line (\n\n).
//   photos    — optional array of { src, caption }. Leave out entirely
//               (or use []) for posts with no photos. The FIRST photo
//               in the array becomes the featured image on the card;
//               posts with no photos get a colored accent header
//               instead. src is a path relative to the site root,
//               e.g. 'images/goodfriday.jpg'.
// ============================================

const PARISH_LIFE_CATEGORIES = {
  'message': { label: 'Message from Fr. Rick', color: 'gold', icon: 'ti-message-circle' },
  'life-together': { label: 'Our Life Together', color: 'blue', icon: 'ti-users' },
  'ministry': { label: 'Ministry Spotlight', color: 'navy', icon: 'ti-heart-handshake' },
  'event': { label: 'Recent Event', color: 'rust', icon: 'ti-calendar-event' },
};

const PARISH_LIFE_POSTS = [
  {
    id: 'holy-week-2026',
    category: 'event',
    title: 'Holy Week & Pascha, Through Our Community\'s Eyes',
    date: 'April 20, 2026',
    excerpt: 'From the Epitafios procession to the midnight Resurrection service, this year\'s Holy Week brought our parish together in a way photos can only begin to capture.',
    body: 'Holy Week is the heart of our year together, and this year our church was full at every service — from the Bridegroom services early in the week, through Holy Thursday\'s reading of the Twelve Gospels, to the beauty of Holy Friday\'s Epitafios.\n\nOn Holy Friday evening, our Epitafios procession moved out into the neighborhood around the church, a visible sign to our community of Christ\'s presence among us. Inside, the sanctuary was transformed with flowers prepared by parish volunteers over the preceding days.\n\nAnd then, at midnight on Holy Saturday, darkness gave way to light — literally — as the flame passed from candle to candle until the whole church glowed, and we proclaimed together, "Christ is Risen!" Thank you to everyone who helped make this Holy Week so meaningful: the chanters, the altar servers, the Philoptochos flower committee, and every family who came to pray with us.',
    photos: [
      { src: 'images/epitafio-outside.jpg', caption: 'The Epitafios procession outside the church on Holy Friday evening.' },
      { src: 'images/goodfriday.jpg', caption: 'The decorated Epitafios inside the sanctuary.' },
      { src: 'images/candle.jpg', caption: 'Light passing from candle to candle at the midnight Resurrection service.' },
    ],
  },
  {
    id: 'fr-rick-message-june-2026',
    category: 'message',
    title: 'On Slowing Down for Summer',
    date: 'June 8, 2026',
    author: 'Fr. Rick Andrews',
    excerpt: 'As the school year winds down and our schedules loosen up, Fr. Rick offers a reflection on making room for God in the quieter months.',
    body: 'Dear Parish Family,\n\nSummer has a different rhythm than the rest of the year. Church school is out, many of our families travel, and the pace of our days changes. It can be tempting to let our spiritual life loosen along with everything else — but I\'d like to offer a different way of thinking about it.\n\nThe Church Fathers often spoke of stillness, hesychia, as something we
