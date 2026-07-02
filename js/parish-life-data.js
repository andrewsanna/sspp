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
//               (or use []) for posts with no photos. src is a path
//               relative to the site root, e.g. 'images/goodfriday.jpg'.
// ============================================

const PARISH_LIFE_CATEGORIES = {
  'message': { label: 'Message from Fr. Rick', color: 'gold' },
  'life-together': { label: 'Our Life Together', color: 'blue' },
  'ministry': { label: 'Ministry Spotlight', color: 'navy' },
  'event': { label: 'Recent Event', color: 'rust' },
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
    body: 'Dear Parish Family,\n\nSummer has a different rhythm than the rest of the year. Church school is out, many of our families travel, and the pace of our days changes. It can be tempting to let our spiritual life loosen along with everything else — but I\'d like to offer a different way of thinking about it.\n\nThe Church Fathers often spoke of stillness, hesychia, as something we cultivate, not something that simply happens to us. A quieter summer schedule is actually a gift: an invitation to read Scripture a little more slowly, to pray without rushing to the next thing, to notice God\'s presence in an ordinary evening on the porch.\n\nI\'d encourage each of you, in whatever way fits your family\'s summer, to hold on to one small daily practice — even five minutes of morning prayer, or reading a psalm before bed. Small, steady things sustain us far better than good intentions we only get to twice.\n\nMay your summer be restful, and may it also draw you closer to Christ.\n\nWith love in Him,\nFr. Rick',
  },
  {
    id: 'goya-spotlight-2026',
    category: 'ministry',
    title: 'Ministry Spotlight: GOYA',
    date: 'May 30, 2026',
    excerpt: 'Our high schoolers just wrapped up another year of fellowship, service, and a little friendly competition at Junior Olympics. Here\'s a look at what GOYA is all about.',
    body: 'GOYA (Greek Orthodox Youth of America) is our ministry for parish teens, grades 9 through 12. Four times a month, our GOYAns gather for a mix of fellowship nights, service projects, and faith discussions led by our youth director and a rotating group of adult volunteers.\n\nThis spring, a group of our GOYAns traveled to compete in the Metropolis Junior Olympics, an annual track-and-field and basketball tournament that brings together Greek Orthodox teens from parishes across the region. Beyond the competition, it\'s become one of the highlights of the GOYA calendar — a chance for our kids to build friendships with peers from other parishes who share their faith.\n\nGOYA is open to any parish teen, no experience or background required — just a willingness to show up. If you have a high schooler who might want to get involved, reach out to our Youth Director, Steven Thell, at youthdirector@ssppglenview.org.',
    photos: [
      { src: 'images/youth-jrolympics.jpg', caption: 'Our GOYA group at this year\'s Metropolis Junior Olympics.' },
    ],
  },
  {
    id: 'our-life-together-may-2026',
    category: 'life-together',
    title: 'A Wedding, A Blessing, and a Full Church',
    date: 'May 12, 2026',
    excerpt: 'A look back at a few of the joyful moments our parish family celebrated together this spring.',
    body: 'One of the quiet blessings of parish life is how our community shows up for each other\'s milestones. This spring brought several of them.\n\nWe celebrated a beautiful wedding in our sanctuary, filled with family from near and far, and joined together in the crowning that unites a new household in the Church. A few weeks later, we gathered for a 40-Day Blessing, welcoming a newest member of our parish family into the life of the Church for the first time.\n\nThese moments remind us that a parish isn\'t just a building or a Sunday service — it\'s a family that walks through life\'s milestones together, in joy and in prayer. If your family has a milestone coming up — a baptism, a wedding, a name day — let the parish office know. We\'d love to celebrate with you.',
    photos: [
      { src: 'images/wedding.jpg', caption: 'A spring wedding in our sanctuary.' },
      { src: 'images/40dayblessing.jpg', caption: 'A 40-Day Blessing welcoming a new member of our parish family.' },
    ],
  },
  {
    id: 'church-school-yearend-2026',
    category: 'life-together',
    title: 'Church School Wraps Up Another Year',
    date: 'May 3, 2026',
    excerpt: 'Our youngest parishioners closed out the church school year with a celebration after Divine Liturgy.',
    body: 'Every Sunday morning, our Church School teachers give their time to help form the next generation in the faith — and this year was no exception. From preschool through high school, our students spent the year learning about the lives of the saints, the feasts of the Church, and what it means to live an Orthodox Christian life.\n\nWe closed out the year with a celebration following Divine Liturgy, with certificates for our students and a well-deserved thank-you to our volunteer teachers, led by Church School Director Elaine Carozza. If you\'re interested in volunteering as a teacher or helper for next year, reach out to Churchschool@ssppglenview.org — no experience necessary, just a willingness to invest in our kids.',
    photos: [
      { src: 'images/sundayschool.jpg', caption: 'Church School students celebrating the end of the year.' },
    ],
  },
];
