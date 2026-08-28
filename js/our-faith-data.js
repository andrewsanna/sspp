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
      { title: "Great Lent: A Week by Week Meaning", 
       blurb: "A walk through each week of Great Lent — from Forgiveness Sunday and Clean Monday, through the Sunday of Orthodoxy, St. Gregory Palamas, and the Veneration of the Cross, up to Lazarus Saturday — and what each week asks of us on the road to Pascha.", 
       url: "https://www.goarch.org/-/great-lent-a-week-by-week-meaning" },
      { title: "Preparing Your Family For Great Lent", 
       blurb: "A webinar with Fr. Evan Armatas and Elissa Bjeletich on making Great Lent a family experience — practical ways to slow down, pray together, and bring fasting and almsgiving into everyday home life.", 
       url: "https://www.goarch.org/-/preparing-your-family-for-great-lent" },
      { title: "Resources for Great Lent, Holy Week, and Pascha", 
       blurb: "A library of Lenten and Paschal brochures, sermons, and downloadable icons from the Archdiocese.", 
       url: "https://www.goarch.org/-/resources-for-great-lent-holy-week-and-pascha" },
      { title: "Lenten Recipes", 
       blurb: "A library of Lenten recipes.", 
       url: "https://iocc.org/take-action/get-resources/lenten-resources" }
    ]
  },

  holyWeekPascha: {
    label: "Holy Week & Pascha",
    window: "The week of Pascha itself",
    active: false,
    articles: [
      { title: "Holy Week", blurb: "A walk through the services of Holy Week, service by service.", url: "https://www.goarch.org/holyweek" },
      { title: "Great and Holy Pascha", 
       blurb: "On Great and Holy Pascha, Orthodox Christians celebrate Christ's Resurrection — his victory over death that offers restoration and eternal life. Includes the joyful 'Christ is Risen' proclamation in Greek and English.", 
       url: "https://www.goarch.org/en/pascha" }
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
      { title: "In the Now: Welcome to Fall", blurb: "A candid look at the 'post-camp crash' — how the spiritual high of summer camp fades once school starts, and a challenge to build a faith that holds up in ordinary months, not just camp week.", 
       url: "https://www.goarch.org/en/-/in-the-now-welcome-to-fall" },
      { title: "Why Prayer Matters", blurb: "Why private prayer and the Liturgy aren't an either/or — without one, the other risks becoming empty ritual or just talking to ourselves. A reminder to hold both together.", 
       url: "https://www.goarch.org/-/why-prayer-matters" }
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
      { title: "Be the Bee: How Should Orthodox Christians Preach the Gospel?", 
       blurb: "A short reflection on sharing the faith in everyday conversation — no theology degree required.", 
       url: "https://www.goarch.org/en/be-the-bee " },
      { title: "An Introduction to Orthodox Spirituality", blurb: "An introduction to the Sacraments for newcomers.", url: "https://www.goarch.org/en/know-your-faith" },
      { title: "The House of God: Iconography", blurb: "On the role of icons in Orthodox worship.", url: "https://www.goarch.org/en/-/the-house-of-god-iconography" }
    ]
  }

};
