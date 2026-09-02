// ============================================
// Shared calendar configuration
// Used by js/calendar.js AND ministry pages that show
// "upcoming events" for their category.
// ============================================

const GOOGLE_API_KEY = 'AIzaSyCNAL3x2J53-OgUuCqQLNRh1nh33xqDrEw';

const CALENDARS = [
  // Featured / parish-wide events
  { id: '59943aebd742db92a7b197ae2fd895fe962e80537fc70217f55ba20013ccab0e@group.calendar.google.com', category: 'featured', featured: true },

  // Liturgical
  { id: 'c_ru8ahosqp08ei7va3el5stneuc@group.calendar.google.com', category: 'liturgical', featured: false },

  // Youth
  { id: 'c_3stt4mv6dkp8p6qdv8ku83fav8@group.calendar.google.com', category: 'youth', featured: false }, // flj
  { id: 'c_ciglbmolreavrt8v9481jh9pi4@group.calendar.google.com', category: 'youth', featured: false }, // jr. goya
  { id: 'c_unfa8qdb1vk5ncd0r9s2ildlnk@group.calendar.google.com', category: 'youth', featured: false }, // hope
  { id: 'c_9mqtoubk1kms38jh7h91hck0a4@group.calendar.google.com', category: 'youth', featured: false }, // sr. goya
  { id: 'c_f945mtpotllnf56tf6o49nc6eo@group.calendar.google.com', category: 'youth', featured: false },
  { id: 'c_9nrl9dcjrel1iu3ls7qc5icl9c@group.calendar.google.com', category: 'youth', featured: false }, // greek school

  // Young Adults
  { id: 'c_s9q853entlatarsmfbpeqtrkmk@group.calendar.google.com', category: 'young_adults', featured: false }, // yal
  { id: 'c_c8mcjr6rfa85oli9speeqs0a94@group.calendar.google.com', category: 'young_adults', featured: false }, // goyalumni

  // Athletics
  { id: 'c_sco46hbnm89pj1d222m24od8t8@group.calendar.google.com', category: 'athletics', featured: false }, // athletics

  // Church School
  { id: 'c_cj89fuufhotqpi6d80no8vgmc8@group.calendar.google.com', category: 'churchschool', featured: false }, // church school
  { id: 'e7o0p37epk09onnmqpj92jpf2k@group.calendar.google.com', category: 'churchschool', featured: false }, // church school events?

  // Philanthropy
  { id: 'c_7k8pr3v1r9ni1mfbufnukb5oj4@group.calendar.google.com', category: 'philanthropy', featured: false }, // philoptochos
  { id: 'c_ih9em4bm0b7ebnhcffgnbf0hgo@group.calendar.google.com', category: 'philanthropy', featured: false }, // philanthropy, care for creation

  // Agape
  { id: 'c_tplbp18e1dohtl0ocvdg3b6q0g@group.calendar.google.com', category: 'agape', featured: false }, // agape

  // Adult Faith
  { id: 'c_q3kgtkmbhrsbtn5vt7urjddvjg@group.calendar.google.com', category: 'adult_faith', featured: false }, // coffee connection, bible study, catechism

  // Ministries
  { id: 'c_962b9u9452vmm537i8l6aisk1k@group.calendar.google.com', category: 'ministries', featured: false }, // dynamis, occ, fellowship
  { id: 'c_g2lupm9c0g12huf56har6ilvjc@group.calendar.google.com', category: 'ministries', featured: false }, // parish council
  { id: 'c_ufkvhgf9rm44887ikj35qehohc@group.calendar.google.com', category: 'ministries', featured: false }, // stewardship
  { id: 'c_mliorq9384otdplop55be7nsfs@group.calendar.google.com', category: 'ministries', featured: false }, // welcome committee

  // Support Groups
  { id: 'c_tnvheh6pgp8049n7kp8kib3fn0@group.calendar.google.com', category: 'support_groups', featured: false }, // divorce, cancer, grief support

  // Metropolis Events
  { id: 'c_nsfp5dp24qlp077nn04ar8hrt8@group.calendar.google.com', category: 'metropolis_events', featured: false }, // metropolis events we advertise
];

const CATEGORY_LABELS = {
  liturgical: 'Liturgical',
  youth: 'Youth & Young Adults',
  featured: 'Events',
  philanthropy: 'Philanthropy',
  agape: 'Agape',
  adult_faith: 'Faith & Learning',
  adult_activities: 'Athletics',
  support_groups: 'Support Groups',
  ministries: 'Ministries',
};

const MONTHS_AHEAD = 3;
