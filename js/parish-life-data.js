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
    id: 'fr-rick-sabbatical-2026',
    category: 'message',
    title: 'Pastoral Updates',
    date: 'July 1, 2026',
    author: 'Fr. Rick Andrews',
    excerpt: "Fr. Rick's Sabbatical",
    body: 'As announced last November, with the blessing of Metropolitan Nathanael, the support of the parish council and the Archdiocese Presbyters Council, I was awarded a three-month sabbatical which I will take August 16 to November 16 this year. This will be my first sabbatical in 31 years of service, and I thank everyone for their prayerful support.\n\nA sabbatical is an extended period of time away from one\'s usual work to devote to research and/or rest. The primary purpose is to recharge and return to work rejuvenated and invigorated.\n\nEven though the Archdiocese and Uniform Parish Regulations provide for a three-month sabbatical for every six years of continuous service in a parish, very few priests take them. In addition, Hierarchs and parish communities rarely encourage their clergy to take a sabbatical.\n\nBecause I have already earned my doctoral degree, and because I have many certifications in law enforcement and disaster chaplaincy, I will not be doing any academic research or study. At the strong encouragement of His Eminence, the coordinator of the APC program, and the few clergy who previously took sabbaticals, I will be devoting my time to rest, recreation, and travel.\n\nAn important component of the sabbatical is complete disconnection from parish duties. Thus, I will be absent from all parish events including worship, sacraments and administration, I will not be checking my work email, I will not be answering phone calls and texts. Our associate priest, Fr. Peter Sarolas, will fulfil the priestly duties in my absence. Fr. Peter will be supported by the parish council, our local vicar, the chancellor\'s office and Metropolitan Nathanael if the need arises.\n\nAgain, I want to thank everyone for their understanding and support to take my sabbatical.',
  },
  {
    id: 'phil-spotlight-2026',
    category: 'ministry',
    title: 'Philoptochos Highlights',
    date: 'June 7, 2026',
    excerpt: 'Our high schoolers just wrapped up another year of fellowship, service, and a little friendly competition at Junior Olympics. Here\'s a look at what GOYA is all about.',
    body: 'Dear Saints Peter and Paul Church Family, Summer has arrived, bringing opportunities to slow down, spend time with family and friends, and enjoy the blessings of the season. Even as many of us take time away, the spirit of Philoptochos remains active in our parish community. One of the highlights of summer is preparing for our beloved Greek Fest. Baking days are always a wonderful reminder of what makes our church family so special — coming together in fellowship, sharing traditions, and working side by side in support of our parish. Thank you to everyone who gives their time and talents to help make the bakery a success. We welcome all who would like to join us! Summer is also a time to look ahead. Your Philoptochos Board has begun planning for the coming year, and we would love your input. If you have ideas for programs, service opportunities, speakers, fellowship events, or new ways to engage our community, please email your suggestions to me at philoptochos@ssppglenview.org. Your ideas help shape the meaningful work we do together. Wishing you and your families a joyful, relaxing, and blessed summer. With gratitude, Julie Anastos - President',
    photos: [
      { src: 'images/philo-check.jpg', caption: 'Following Divine Liturgy, Philoptochos joyfully presented donation checks to three deserving organizations: $7,500 to Camp SOAR, $7,500 to K9s for Veterans, and $15,000 to Hogar Rafael Ayau.' },
      { src: 'images/philo-aprons.jpg', caption: 'On Saturday, June 6, six Philoptochos members went to Lawrence Hall to make breakfast with the boys that our chapter has "adopted". We made waffles from scratch, sausage and eggs. It was a wonderful way to spend the morning. The boys loved preparing and then eating what they made. They even enjoyed wearing Philoptochos aprons!' },
    ],
  },
  {
    id: 'church-school-yearend-2026',
    category: 'life-together',
    title: 'Church School Wraps Up Another Year',
    date: 'June 30, 2026',
    excerpt: 'Our youngest parishioners closed out the church school year with a celebration after Divine Liturgy.',
    body: 'Every Sunday morning, our Church School teachers give their time to help form the next generation in the faith — and this year was no exception. From preschool through high school, our students spent the year learning about the lives of the saints, the feasts of the Church, and what it means to live an Orthodox Christian life.\n\nWe closed out the year with a celebration following Divine Liturgy, with certificates for our students and a well-deserved thank-you to our volunteer teachers, led by Church School Director Elaine Carozza. If you\'re interested in volunteering as a teacher or helper for next year, reach out to Churchschool@ssppglenview.org — no experience necessary, just a willingness to invest in our kids.',
    photos: [
      { src: 'images/ministries/churchschool.jpg', caption: 'Church School students celebrating the end of the year.' },
    ],
  },
  {
    id: 'divorce-spotlight-2026',
    category: 'ministry',
    title: 'Ministry Spotlight: Divorce Rebuilders',
    date: 'May 30, 2026',
    excerpt: 'SSPP Divorce Rebuilders Celebrates 20th Anniversary',
    body: 'SS Peter and Paul’s Divorce Rebuilders celebrated its 20th Anniversary on April in Glenview with approximately 21 participants attending from Illinois, Ohio, Michigan , Iowa, and Oregon for a three day retreat in April 2026. SSPP Divorce Rebuilders was started by ministry leader Maria Harduvel Boyle as a response to her own difficulties overcoming the challenges of divorce. Currently, SSPP Divorce Rebuilders is the only Orthodox divorce support group presently known that serves participants from the entire USA as well as participants from Hawaii, Canada, Australia and the Bahamas. The purpose of SSPP Divorce Rebuilders is to support those going through the pain of separation and divorce by creating a space and community where broken hearts encounter compassion, where shame gives way to dignity and where Christ heals what has been wounded.',
    photos: [
      { src: 'images/divorce-rebuilders.jpg', caption: '' },
    ],
  },
];
