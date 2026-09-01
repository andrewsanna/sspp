// ============================================
// Shared calendar configuration
// Used by js/calendar.js AND ministry pages that show
// "upcoming events" for their category.
// ============================================

const GOOGLE_API_KEY = 'AIzaSyCNAL3x2J53-OgUuCqQLNRh1nh33xqDrEw';

const CALENDARS = [
  { id: 'c_ru8ahosqp08ei7va3el5stneuc@group.calendar.google.com', category: 'liturgical', featured: false },
  { id: 'c_ciglbmolreavrt8v9481jh9pi4@group.calendar.google.com', category: 'youth', featured: false },
  { id: 'c_sco46hbnm89pj1d222m24od8t8@group.calendar.google.com', category: 'youth', featured: false },
  { id: 'c_3stt4mv6dkp8p6qdv8ku83fav8@group.calendar.google.com', category: 'youth', featured: false },
  { id: '59943aebd742db92a7b197ae2fd895fe962e80537fc70217f55ba20013ccab0e@group.calendar.google.com', category: 'featured', featured: true },
  { id: 'c_f945mtpotllnf56tf6o49nc6eo@group.calendar.google.com', category: 'youth', featured: false },
  { id: 'c_7k8pr3v1r9ni1mfbufnukb5oj4@group.calendar.google.com', category: 'philanthropy', featured: false },
  { id: 'c_tplbp18e1dohtl0ocvdg3b6q0g@group.calendar.google.com', category: 'agape', featured: false },
  { id: 'c_q3kgtkmbhrsbtn5vt7urjddvjg@group.calendar.google.com', category: 'adult_faith', featured: false },
  { id: 'c_g2lupm9c0g12huf56har6ilvjc@group.calendar.google.com', category: 'ministries', featured: false },
  { id: 'c_tnvheh6pgp8049n7kp8kib3fn0@group.calendar.google.com', category: 'support_groups', featured: false },
];

const CATEGORY_LABELS = {
  liturgical: 'Liturgical',
  youth: 'Youth & Young Adults',
  featured: 'Events',
  philanthropy: 'Philanthropy',
  agape: 'Agape',
  adult_faith: 'Faith & Learning',
  adult_activities: 'Community Activities',
  support_groups: 'Support Groups',
  ministries: 'Ministries',
};

const MONTHS_AHEAD = 3;
