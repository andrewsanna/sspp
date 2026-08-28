// our-faith-data.js
// Curated links from the Archdiocese library (goarch.org/library) and elsewhere.
// Set "active: true" on ONE season below to publish it on the Our Faith page.
// Titles/blurbs are placeholders except where noted — swap in real links/your
// own one-line summaries before publishing. Don't copy article text verbatim.

const ourFaithSeasons = {

  greatLent: {
    label: "Great Lent",
    window: "~Feb/Mar, roughly 6-7 weeks before Pascha",
    active: false,
    articles: [
      { title: "[Article Title]", blurb: "On fasting, prayer, and almsgiving as the three pillars of Lent.", url: "https://www.goarch.org/library" },
      { title: "[Article Title]", blurb: "What to expect from Presanctified Liturgies and midweek services.", url: "https://www.goarch.org/library" },
      { title: "[Article Title]", blurb: "A short guide to the Lenten fast for families new to it.", url: "https://www.goarch.org/library" }
    ]
  },

  holyWeekPascha: {
    label: "Holy Week & Pascha",
    window: "The week of Pascha itself",
    active: false,
    articles: [
      { title: "[Article Title]", blurb: "A walk through the services of Holy Week, service by service.", url: "https://www.goarch.org/library" },
      { title: "[Article Title]", blurb: "Why we say 'Christ is Risen' and what Pascha actually celebrates.", url: "https://www.goarch.org/library" }
    ]
  },

   ascension: {
    label: "Ascension",
    window: "40 days after Pascha",
    active: false,
    articles: [
      { title: "[Article Title]", blurb: "Why Christ ascended and what it means for the Church left behind.", url: "https://www.goarch.org/library" }
    ]
  },

  pentecost: {
    label: "Pentecost",
    window: "50 days after Pascha",
    active: false,
    articles: [
      { title: "[Article Title]", blurb: "The story of Pentecost and why we kneel again for the first time since Pascha.", url: "https://www.goarch.org/library" },
      { title: "[Article Title]", blurb: "What the Holy Spirit's descent means for the life of the Church.", url: "https://www.goarch.org/library" }
    ]
  },

  nativity: {
    label: "Nativity / Christmas",
    window: "Nativity Fast (mid-Nov) through Dec 25",
    active: false,
    articles: [
      { title: "[Article Title]", blurb: "On the Nativity Fast and preparing for Christmas the Orthodox way.", url: "https://www.goarch.org/library" },
      { title: "[Article Title]", blurb: "The story behind the Nativity icon and its symbolism.", url: "https://www.goarch.org/library" }
    ]
  },

  theophany: {
    label: "Theophany",
    window: "Jan 6",
    active: false,
    articles: [
      { title: "[Article Title]", blurb: "What Theophany celebrates and why water is blessed on this feast.", url: "https://www.goarch.org/library" },
      { title: "[Article Title]", blurb: "The Great Blessing of Waters, explained simply.", url: "https://www.goarch.org/library" }
    ]
  },

  dormition: {
    label: "Dormition of the Theotokos",
    window: "Dormition Fast Aug 1-14, feast Aug 15",
    active: true,
    articles: [
      { title: "[Article Title]", blurb: "Why Orthodox Christians fast and feast around the Dormition.", url: "https://www.goarch.org/library" },
      { title: "[Article Title]", blurb: "Who the Theotokos is and her place in Orthodox worship.", url: "https://www.goarch.org/library" }
    ]
  },

  backToSchool: {
    label: "Starting the School Year",
    window: "Late Aug / early Sept — also near the Sept 1 Church New Year",
    active: true,
    articles: [
      { title: "[Article Title]", blurb: "A prayer for students and families as the school year begins.", url: "https://www.goarch.org/library" },
      { title: "[Article Title]", blurb: "On the Sept 1 Church New Year (Indiction) and starting fresh.", url: "https://www.goarch.org/library" }
    ]
  },

    patronalFeast: {
    label: "Ss. Peter & Paul (Patronal Feast)",
    window: "June 29",
    active: false,
    articles: [
      { title: "[Article Title]", blurb: "Who Ss. Peter and Paul were and why parishes are named for them.", url: "https://www.goarch.org/library" },
      { title: "[Article Title]", blurb: "On the Apostles' Fast leading up to June 29.", url: "https://www.goarch.org/library" }
    ]
  },

  transfiguration: {
    label: "Transfiguration",
    window: "Aug 6",
    active: false,
    articles: [
      { title: "[Article Title]", blurb: "What happened on Mount Tabor and why it matters for how we see Christ.", url: "https://www.goarch.org/library" }
    ]
  },

  elevationOfCross: {
    label: "Elevation of the Holy Cross",
    window: "Sept 14 (Nativity of the Theotokos is Sept 8, just before)",
    active: true,
    articles: [
      { title: "[Article Title]", blurb: "Why the Cross is 'elevated' and the fasting associated with this feast.", url: "https://www.goarch.org/library" },
      { title: "[Article Title]", blurb: "On the Nativity of the Theotokos, a week earlier.", url: "https://www.goarch.org/library" }
    ]
  },

  stNicholas: {
    label: "St. Nicholas",
    window: "Dec 6",
    active: false,
    articles: [
      { title: "[Article Title]", blurb: "The real St. Nicholas of Myra, beyond the Santa Claus legend.", url: "https://www.goarch.org/library" }
    ]
  },

  threeHierarchs: {
    label: "Three Hierarchs / Education Sunday",
    window: "Jan 30",
    active: false,
    articles: [
      { title: "[Article Title]", blurb: "Basil, Gregory, and John Chrysostom as patrons of learning.", url: "https://www.goarch.org/library" }
    ]
  },


  // Default set — shown whenever no season above is marked active.
  evergreen: {
    label: "Faith Basics",
    window: "Year-round fallback",
    active: true,
    articles: [
      { title: "Be the Bee: How Should Orthodox Christians Preach the Gospel?", blurb: "A short reflection on sharing the faith in everyday conversation — no theology degree required.", url: "https://www.goarch.org/library" },
      { title: "[Article Title]", blurb: "An introduction to the Sacraments for newcomers.", url: "https://www.goarch.org/library" },
      { title: "[Article Title]", blurb: "On the role of icons in Orthodox worship.", url: "https://www.goarch.org/library" }
    ]
  }

};
