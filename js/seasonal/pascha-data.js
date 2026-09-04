// js/seasonal/pascha-data.js
// Holy Week & Pascha: edit this file each year — not pascha.js

const HW_EVENT = {
  paschaDate: { label: 'Sunday, May 2, 2027', isoDate: '2027-05-02' },
  greatLentStart: { label: 'Monday, March 15, 2027 (Clean Monday)', isoDate: '2027-03-15' },
  pentecostDate: { label: 'Sunday, June 20, 2027', isoDate: '2027-06-20' },
  address: { line: '1401 Wagner Rd., Glenview, IL', mapUrl: 'https://maps.google.com/?q=1401+Wagner+Rd+Glenview+IL' },
  // REPLACE: hero video file/URL and a fallback poster image
  heroVideoUrl: '',
  heroPosterUrl: '../images/holy-week-poster.jpg',
  // REPLACE: livestream + channel links
  livestreamUrl: '#',
  youtubeChannelUrl: '#',
};

// Weeks of Great Lent — each Sunday's commemoration
const HW_LENT_WEEKS = [
  {
    id: 'sunday-orthodoxy',
    name: 'Sunday of Orthodoxy',
    dateLabel: 'March 21, 2027',
    icon: 'ti-flag-2',
    blurb: 'The first Sunday of Lent, celebrating the restoration of icons to the Church.',
    description: 'Marks the end of the Iconoclast controversy in 843 AD and the restoration of icons to Orthodox worship. Parishes often process with icons to mark the victory of true faith.',
    learnMoreUrl: '#', // REPLACE with GOARCH article link
  },
  {
    id: 'st-gregory-palamas',
    name: 'Sunday of St. Gregory Palamas',
    dateLabel: 'March 28, 2027',
    icon: 'ti-book',
    blurb: 'Honors the 14th-century theologian and defender of hesychast prayer.',
    description: 'Celebrates St. Gregory Palamas, who defended the possibility of direct, personal experience of God through prayer and the uncreated energies of God.',
    learnMoreUrl: '#',
  },
  {
    id: 'holy-cross',
    name: 'Sunday of the Holy Cross',
    dateLabel: 'April 4, 2027',
    icon: 'ti-cross',
    blurb: 'The midpoint of Lent — the Cross is brought out for veneration.',
    description: 'The Cross is placed in the center of the church for veneration, offering strength and encouragement for the second half of the Lenten journey.',
    learnMoreUrl: '#',
  },
  {
    id: 'st-john-climacus',
    name: 'Sunday of St. John Climacus',
    dateLabel: 'April 11, 2027',
    icon: 'ti-stairs-up',
    blurb: 'Honors the author of "The Ladder of Divine Ascent."',
    description: 'Commemorates St. John of Sinai, whose classic work "The Ladder of Divine Ascent" maps the soul\'s progress toward union with God — especially meaningful during Lent.',
    learnMoreUrl: '#',
  },
  {
    id: 'st-mary-of-egypt',
    name: 'Sunday of St. Mary of Egypt',
    dateLabel: 'April 18, 2027',
    icon: 'ti-droplet',
    blurb: 'Celebrates the model of repentance as Lent nears its end.',
    description: 'St. Mary of Egypt\'s dramatic conversion from a life of sin to decades of desert asceticism stands as the Church\'s icon of repentance, just before Holy Week begins.',
    learnMoreUrl: '#',
  },
  {
    id: 'lazarus-saturday',
    name: 'Lazarus Saturday',
    dateLabel: 'April 24, 2027',
    icon: 'ti-candle',
    blurb: 'The raising of Lazarus — a preview of Christ\'s own Resurrection.',
    description: 'Great Lent formally ends and this one-day feast bridges into Holy Week: the raising of Lazarus from the dead foreshadows Christ\'s victory over death at Pascha.',
    learnMoreUrl: '#',
  },
  {
    id: 'palm-sunday',
    name: 'Palm Sunday',
    dateLabel: 'April 25, 2027',
    icon: 'ti-leaf',
    blurb: 'Christ\'s triumphal entry into Jerusalem — Holy Week begins.',
    description: 'Commemorates Christ\'s entry into Jerusalem, welcomed with palm branches. Parishioners receive palm crosses at the Divine Liturgy as Holy Week begins that evening.',
    learnMoreUrl: '#',
  },
];

// Holy Week, day by day (Holy Monday through Holy Saturday)
const HW_HOLY_WEEK_DAYS = [
  {
    id: 'holy-monday',
    name: 'Holy Monday',
    dateLabel: 'April 26, 2027',
    icon: 'ti-tree',
    theme: 'The Bridegroom & the Barren Fig Tree',
    description: 'The first of the Bridegroom services, focused on watchfulness and spiritual readiness, using the parable of the barren fig tree as a warning against fruitless faith.',
    services: [
      { name: 'Bridegroom Matins', time: '7:00 PM' }, // REPLACE with confirmed time
    ],
    learnMoreUrl: '#',
  },
  {
    id: 'holy-tuesday',
    name: 'Holy Tuesday',
    dateLabel: 'April 27, 2027',
    icon: 'ti-flame',
    theme: 'The Ten Virgins',
    description: 'The parable of the wise and foolish virgins is read, calling the faithful to be prepared, with oil enough, for the Bridegroom\'s coming.',
    services: [
      { name: 'Bridegroom Matins', time: '7:00 PM' },
    ],
    learnMoreUrl: '#',
  },
  {
    id: 'holy-wednesday',
    name: 'Holy Wednesday',
    dateLabel: 'April 28, 2027',
    icon: 'ti-droplet',
    theme: 'Holy Unction',
    description: 'The sacrament of Holy Unction is offered for the healing of soul and body, recalling the woman who anointed Christ before His Passion.',
    services: [
      { name: 'Sacrament of Holy Unction', time: '4:00 PM' },
      { name: 'Bridegroom Matins', time: '7:00 PM' },
    ],
    learnMoreUrl: '#',
  },
  {
    id: 'holy-thursday',
    name: 'Holy Thursday',
    dateLabel: 'April 29, 2027',
    icon: 'ti-cup',
    theme: 'The Last Supper & the Twelve Gospels',
    description: 'Morning commemorates the Last Supper and institution of Holy Communion; the evening service of the Twelve Gospels walks through Christ\'s Passion in readings and hymns.',
    services: [
      { name: 'Vesperal Liturgy of the Last Supper', time: '9:00 AM' },
      { name: 'Service of the Twelve Gospels', time: '7:00 PM' },
    ],
    learnMoreUrl: '#',
  },
  {
    id: 'holy-friday',
    name: 'Holy Friday',
    dateLabel: 'April 30, 2027',
    icon: 'ti-cross',
    theme: 'The Crucifixion & Burial',
    description: 'A strict fast day. Royal Hours in the morning, the Vespers of the Deposition (removing Christ from the Cross) in the afternoon, and Lamentations at the tomb in the evening.',
    services: [
      { name: 'Royal Hours', time: '9:00 AM' },
      { name: 'Vespers — Apokathelosis (Un-nailing)', time: '3:00 PM' },
      { name: 'Lamentations at the Epitaphios', time: '7:00 PM' },
    ],
    learnMoreUrl: '#',
  },
  {
    id: 'holy-saturday',
    name: 'Holy Saturday',
    dateLabel: 'May 1, 2027',
    icon: 'ti-moon',
    theme: 'Christ\'s Descent & the First Resurrection',
    description: 'The morning Vesperal Liturgy proclaims the "first Resurrection." That night, the Paschal service begins — carrying the light out of darkness into the Resurrection of Christ.',
    services: [
      { name: 'Vesperal Liturgy of Holy Saturday', time: '9:00 AM' },
      { name: 'Anastasi (Resurrection) Service begins', time: '11:30 PM' },
    ],
    learnMoreUrl: '#',
  },
];

const HW_PASCHA = {
  description: 'At midnight, the church is darkened, and the priest emerges with the light of the Resurrection to proclaim "Christ is Risen!" It is the central proclamation of the Orthodox faith — the moment the fast, the vigil, and the whole of Holy Week have led to.',
  services: [
    { name: 'Anastasi (Resurrection) Service', time: 'Begins 11:30 PM, Holy Saturday', description: 'Midnight procession, the Paschal proclamation, and the Divine Liturgy of Pascha.' },
    { name: 'Agape Vespers', time: '12:00 PM, Pascha Sunday', description: 'The Gospel of Christ\'s appearance to the disciples, read in many languages, celebrating the Resurrection\'s reach to all nations.' },
  ],
  learnMoreUrl: '#',
};

// The 50 days from Pascha to Pentecost
const HW_PENTECOST_SEASON = [
  {
    id: 'bright-week',
    name: 'Bright Week',
    dateLabel: 'May 2–9, 2027',
    icon: 'ti-sun',
    description: 'The week following Pascha — no fasting, the royal doors remain open, and the joy of the Resurrection is celebrated daily, ending with Thomas Sunday.',
    learnMoreUrl: '#',
  },
  {
    id: 'mid-pentecost',
    name: 'Mid-Pentecost',
    dateLabel: 'May 26, 2027',
    icon: 'ti-droplet-half-2',
    description: 'The midpoint between Pascha and Pentecost, recalling Christ teaching in the Temple and His offer of "living water."',
    learnMoreUrl: '#',
  },
  {
    id: 'ascension',
    name: 'Ascension',
    dateLabel: 'June 10, 2027',
    icon: 'ti-arrow-big-up',
    description: 'Forty days after Pascha, commemorating Christ\'s ascension into heaven and His promise to send the Holy Spirit.',
    learnMoreUrl: '#',
  },
  {
    id: 'pentecost-sunday',
    name: 'Pentecost Sunday',
    dateLabel: 'June 20, 2027',
    icon: 'ti-wind',
    description: 'Fifty days after Pascha, the descent of the Holy Spirit upon the Apostles — traditionally seen as the birthday of the Church.',
    learnMoreUrl: '#',
  },
  {
    id: 'holy-spirit-monday',
    name: 'Monday of the Holy Spirit',
    dateLabel: 'June 21, 2027',
    icon: 'ti-dove',
    description: 'The day after Pentecost, honoring the Holy Spirit as the third Person of the Trinity and closing the Paschal season.',
    learnMoreUrl: '#',
  },
];

// General "learn more" resources footer
const HW_RESOURCES = [
  { name: 'Great Lent Overview', url: '#' }, // REPLACE with goarch.org link
  { name: 'Holy Week Explained', url: '#' },
  { name: 'The Meaning of Pascha', url: '#' },
  { name: 'Pentecost & the Holy Spirit', url: '#' },
];
