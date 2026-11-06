// ============================================
// Learning Library (learning-library.html): the parish's document library.
//
// Files live in files/learning-library/<group>/ (moved from the old
// WordPress site; Word files converted to PDF). files/learning-library/
// manifest.csv lists every file with its original name.
//
// Each link: { title, url, type, group, season? }
//   type:   "pdf" | "video" | "website" | "word"
//   group:  one of LEARNING_LIBRARY_GROUPS' ids
//   season: "lent" | "nativity" (optional; lets other pages pull seasonal links)
// ============================================

const LEARNING_LIBRARY_GROUPS = [
  { id: "prayer", label: "Prayer and spiritual life" },
  { id: "liturgy", label: "The Divine Liturgy and worship" },
  { id: "sacraments", label: "The sacraments" },
  { id: "doctrine", label: "Faith and doctrine" },
  { id: "seasons", label: "Feasts and seasons" },
  { id: "family", label: "Family and raising children" },
  { id: "reading", label: "Reading lists and general" },
];

const LEARNING_LIBRARY = [

  // ---- Prayer and spiritual life ----
  { title: "Prayer Is a Way of Life", url: "files/learning-library/prayer/prayer-is-a-way-of-life.pdf", type: "pdf", group: "prayer" },
  { title: "Meeting God in Prayer: Brief Bullet Points from Our First Three Classes", url: "files/learning-library/prayer/meeting-god-in-prayer.pdf", type: "pdf", group: "prayer" },
  { title: "Some Thoughts from the Church Fathers on Difficulties in Prayer", url: "files/learning-library/prayer/difficulties-in-prayer.pdf", type: "pdf", group: "prayer" },
  { title: "The Jesus Prayer: Prayer of the Heart", url: "files/learning-library/prayer/the-jesus-prayer.pdf", type: "pdf", group: "prayer" },
  { title: "Our Father, by Mother Alexandra", url: "files/learning-library/prayer/our-father-mother-alexandra.pdf", type: "pdf", group: "prayer" },
  { title: "On the Lord's Prayer, by Bishop Nikolai", url: "files/learning-library/prayer/on-the-lords-prayer-bishop-nikolai.pdf", type: "pdf", group: "prayer" },
  { title: "St. John of Kronstadt: Excerpts on Prayer and Faith in God", url: "files/learning-library/prayer/st-john-of-kronstadt-on-prayer.pdf", type: "pdf", group: "prayer" },
  { title: "Bless My Enemies, O Lord, by Bishop Nikolai Velimirovich", url: "files/learning-library/prayer/bless-my-enemies-bishop-nikolai.pdf", type: "pdf", group: "prayer" },
  { title: "Prayer for Our Enemies", url: "files/learning-library/prayer/prayer-for-our-enemies.pdf", type: "pdf", group: "prayer" },
  { title: "Prayers for Healing in Times of Sickness", url: "files/learning-library/prayer/prayers-for-healing.pdf", type: "pdf", group: "prayer" },
  { title: "Prayers for the Dead", url: "files/learning-library/prayer/prayers-for-the-dead.pdf", type: "pdf", group: "prayer" },
  { title: "A Layman's Prayer for the Departed", url: "files/learning-library/prayer/laymans-prayer-for-the-departed.pdf", type: "pdf", group: "prayer" },
  { title: "Q&A with Fr. Panagiotis: Memorial Services", url: "files/learning-library/prayer/fr-panagiotis-boznos-memorial-prayers.pdf", type: "pdf", group: "prayer" },
  { title: "The Prayer of St. Patrick (The Breastplate of St. Patrick)", url: "files/learning-library/prayer/prayer-of-st-patrick.pdf", type: "pdf", group: "prayer" },
  { title: "Reflections on the Prayer of St. Patrick, by Helen Theodoropoulos, Ph.D.", url: "files/learning-library/prayer/reflections-on-the-prayer-of-st-patrick.pdf", type: "pdf", group: "prayer" },
  { title: "Planting Seeds of Stillness, by Christiana Dorrance", url: "files/learning-library/prayer/planting-seeds-of-stillness.pdf", type: "pdf", group: "prayer" },
  { title: "\"Be Still and Know That I Am God,\" by Fr. Andrew Jarmus", url: "files/learning-library/prayer/be-still-and-know-that-i-am-god.pdf", type: "pdf", group: "prayer" },
  { title: "On Silence and Solitude, by Fr. John Breck", url: "files/learning-library/prayer/on-silence-and-solitude.pdf", type: "pdf", group: "prayer" },
  { title: "Lord, Have Mercy: Excerpts from Metropolitan Nathanael's Encyclical on Mercy (2019)", url: "files/learning-library/prayer/lord-have-mercy.pdf", type: "pdf", group: "prayer" },
  { title: "St. Mother Maria of Paris: Quotes from Her Essential Writings", url: "files/learning-library/prayer/st-maria-of-paris-quotes.pdf", type: "pdf", group: "prayer" },
  { title: "St. Porphyrios of Kavsokalyvia: Selections from Wounded by Love", url: "files/learning-library/prayer/st-porphyrios-selections.pdf", type: "pdf", group: "prayer" },

  // ---- The Divine Liturgy and worship ----
  { title: "Outline of the Divine Liturgy", url: "files/learning-library/liturgy/divine-liturgy-outline.pdf", type: "pdf", group: "liturgy" },
  { title: "The Eucharist: Its Structure, by Fr. Lawrence Farley", url: "files/learning-library/liturgy/the-eucharist-its-structure.pdf", type: "pdf", group: "liturgy" },
  { title: "Participating in the Eucharist: A Way of Life or a Social Occasion?", url: "files/learning-library/liturgy/participating-in-the-eucharist.pdf", type: "pdf", group: "liturgy" },
  { title: "A Guide to Church Etiquette", url: "files/learning-library/liturgy/church-etiquette-guide.pdf", type: "pdf", group: "liturgy" },

  // ---- The sacraments ----
  { title: "Rituals and Sacraments, by Fr. Lawrence Farley", url: "files/learning-library/sacraments/rituals-and-sacraments.pdf", type: "pdf", group: "sacraments" },
  { title: "Reception into the Catechumenate, by Fr. Lawrence Farley", url: "files/learning-library/sacraments/reception-into-the-catechumenate.pdf", type: "pdf", group: "sacraments" },
  { title: "Baptism and Chrismation, by Fr. Lawrence Farley", url: "files/learning-library/sacraments/baptism-and-chrismation.pdf", type: "pdf", group: "sacraments" },
  { title: "Infant Baptism, by Jordan Bajis", url: "files/learning-library/sacraments/infant-baptism.pdf", type: "pdf", group: "sacraments" },
  { title: "The Eucharist: Its Meaning and Place in Our Salvation, by Fr. Lawrence Farley", url: "files/learning-library/sacraments/the-eucharist-its-meaning.pdf", type: "pdf", group: "sacraments" },
  { title: "Receiving Holy Communion", url: "files/learning-library/sacraments/receiving-holy-communion.pdf", type: "pdf", group: "sacraments" },
  { title: "The Sacrament of Confession, by Fr. Lawrence Farley", url: "files/learning-library/sacraments/the-sacrament-of-confession.pdf", type: "pdf", group: "sacraments" },
  { title: "Making Excuses: Preparing for Confession, by Fr. Alexis Trader", url: "files/learning-library/sacraments/preparing-for-confession.pdf", type: "pdf", group: "sacraments" },
  { title: "Holy Matrimony, by Fr. Lawrence Farley", url: "files/learning-library/sacraments/holy-matrimony.pdf", type: "pdf", group: "sacraments" },
  { title: "Marriage in the Eastern Orthodox Church", url: "files/learning-library/sacraments/marriage-in-the-orthodox-church.pdf", type: "pdf", group: "sacraments" },
  { title: "Holy Orders, by Fr. Lawrence Farley", url: "files/learning-library/sacraments/holy-orders.pdf", type: "pdf", group: "sacraments" },
  { title: "Priesthood: The Three Orders of the Holy Priesthood", url: "files/learning-library/sacraments/priesthood.pdf", type: "pdf", group: "sacraments" },
  { title: "Holy Unction, by Fr. Lawrence Farley", url: "files/learning-library/sacraments/holy-unction.pdf", type: "pdf", group: "sacraments" },

  // ---- Faith and doctrine ----
  { title: "The Creed, with Scripture References", url: "files/learning-library/doctrine/creed-with-scripture-references.pdf", type: "pdf", group: "doctrine" },
  { title: "The Nicene Creed, by Fr. Thomas Hopko", url: "files/learning-library/doctrine/nicene-creed-fr-thomas-hopko.pdf", type: "pdf", group: "doctrine" },
  { title: "The Psychology of Core Beliefs and the Therapy of the Creed, by Fr. Alexis Trader", url: "files/learning-library/doctrine/psychology-of-core-beliefs.pdf", type: "pdf", group: "doctrine" },
  { title: "On Fasting, by St. John Chrysostom", url: "files/learning-library/doctrine/chrysostom-on-fasting.pdf", type: "pdf", group: "doctrine" },
  { title: "Ex Nihilo (From Nothing), Part 1, by Fr. John Breck", url: "files/learning-library/doctrine/breck-ex-nihilo-part-1.pdf", type: "pdf", group: "doctrine" },
  { title: "Ex Nihilo (From Nothing), Part 2, by Fr. John Breck", url: "files/learning-library/doctrine/breck-ex-nihilo-part-2.pdf", type: "pdf", group: "doctrine" },
  { title: "On Reading the Story of Adam and Eve, by Fr. John Breck", url: "files/learning-library/doctrine/breck-story-of-adam-and-eve.pdf", type: "pdf", group: "doctrine" },
  { title: "Orthodoxy and Creationism (selection), by Fr. Gregory Hallam", url: "files/learning-library/doctrine/orthodoxy-and-creationism.pdf", type: "pdf", group: "doctrine" },
  { title: "Creation and Evolution: An Open Letter, by Maria McDowell", url: "files/learning-library/doctrine/mcdowell-creation-and-evolution.pdf", type: "pdf", group: "doctrine" },

  // ---- Feasts and seasons ----
  { title: "Layers in Lent, by Anton C. Vrame, Ph.D.", url: "files/learning-library/seasons/layers-in-lent.pdf", type: "pdf", group: "seasons", season: "lent" },
  { title: "Worship in Lent, by Anton C. Vrame, Ph.D.", url: "files/learning-library/seasons/worship-in-lent.pdf", type: "pdf", group: "seasons", season: "lent" },
  { title: "The Lamb of God, by Anton Vrame, Ph.D.", url: "files/learning-library/seasons/the-lamb-of-god.pdf", type: "pdf", group: "seasons", season: "lent" },
  { title: "The Date of Pascha, by Anton C. Vrame, Ph.D.", url: "files/learning-library/seasons/the-date-of-pascha.pdf", type: "pdf", group: "seasons", season: "lent" },

  // ---- Family and raising children ----
  { title: "How to Raise an Orthodox Christian, and, Possibly, a Saint", url: "files/learning-library/family/how-to-raise-an-orthodox-christian.pdf", type: "pdf", group: "family" },
  { title: "Five Ways to Enjoy Church with Your Children", url: "files/learning-library/family/five-ways-to-enjoy-church-with-children.pdf", type: "pdf", group: "family" },
  { title: "Children's Participation During the Divine Liturgy", url: "files/learning-library/family/childrens-participation-in-the-liturgy.pdf", type: "pdf", group: "family" },
  { title: "A Child's Prayer Rope Petitions", url: "files/learning-library/family/childs-prayer-rope-petitions.pdf", type: "pdf", group: "family" },
  { title: "A Parent's Prayer", url: "files/learning-library/family/a-parents-prayer.pdf", type: "pdf", group: "family" },
  { title: "Prayers for Family", url: "files/learning-library/family/prayers-for-family.pdf", type: "pdf", group: "family" },
  { title: "Creating an Iconostasion", url: "files/learning-library/family/creating-an-iconostasion.pdf", type: "pdf", group: "family" },
  { title: "Advice from St. John Chrysostom: Marriage as a Path to Holiness", url: "files/learning-library/family/chrysostom-marriage-path-to-holiness.pdf", type: "pdf", group: "family" },
  { title: "Advice from St. John Chrysostom on Married Life and Raising Children", url: "files/learning-library/family/chrysostom-married-life-and-raising-children.pdf", type: "pdf", group: "family" },
  { title: "The Tale of a Lazy Parent", url: "files/learning-library/family/tale-of-a-lazy-parent.pdf", type: "pdf", group: "family" },
  { title: "12 Ways to Raise a Juvenile Delinquent", url: "files/learning-library/family/12-ways-to-raise-a-juvenile-delinquent.pdf", type: "pdf", group: "family" },
  { title: "Three Cheers for Sports!, by Fr. Mark Sietsema", url: "files/learning-library/family/three-cheers-for-sports.pdf", type: "pdf", group: "family" },

  // ---- Reading lists and general ----
  { title: "Recommended Reading for Children", url: "files/learning-library/reading/books-for-children.pdf", type: "pdf", group: "reading" },
  { title: "Reading the Bible, by Melissa Tsongranis", url: "files/learning-library/reading/reading-the-bible.pdf", type: "pdf", group: "reading" },
];
