// js/seasonal/greek-fest-data.js
// Greek Fest: event details, menu, sponsors — edit this file each year, not greek-fest.js

const GF_EVENT = {
  title: 'Glenview Greek Fest',
  subtitle: 'Saints Peter & Paul Greek Orthodox Church',
  dates: [
    { label: 'Saturday, July 25', isoDate: '2026-07-25', hours: '1:00 PM – 10:00 PM' },
    { label: 'Sunday, July 26', isoDate: '2026-07-26', hours: '1:00 PM – 10:00 PM' },
  ],
  admission: 'Free Will Donation',
  address: {
    line: '1401 Wagner Rd., Glenview, IL',
    mapUrl: 'https://maps.google.com/?q=1401+Wagner+Rd+Glenview+IL',
  },
  parking: {
    valet: { cost: '$10', note: 'Limited availability — arrive early' },
    free: {
      location: 'Loyola Academy',
      mapUrl: 'https://www.google.com/maps/?q=Loyola+Academy,+Wilmette,+1100+Laramie+Ave,+Wilmette,+IL+60091',
      shuttle: true,
    },
  },
  paymentNote: 'Credit & debit cards preferred',
  ctas: {
    volunteerUrl: 'https://www.signupgenius.com/go/8050F4AA5A62CA2FB6-59316816-sspp#/',
    sponsorUrl: 'https://ssppglenview.org/festival_sponsorship/',
  },
  beneficiaries: ['Sophia Bartholomew Trust Fund', 'Center for Enriched Living'],
};

const GF_CHURCH_TOURS = {
  times: ['2:00 PM', '4:00 PM', '6:00 PM', '8:00 PM'],
  duration: '~45 min',
};

const GF_MENU_CATEGORIES = [
  {
    id: 'mezze',
    label: 'Mezze',
    items: [
      { name: 'Spanakopita', description: 'Spinach & cheese wrapped in crispy phyllo', price: 8 },
      { name: 'Tiropita', description: 'Cheese wrapped in crispy phyllo', price: 8 },
      { name: 'Keftedes', description: 'Meatballs with lemon sauce & pita', price: 8 },
      { name: 'Loukaniko Tacos', description: 'Greek sausage tacos', price: 12 },
      { name: 'Feta Sliders', description: '2 sliders — choice of regular or spicy feta', price: 12 },
      { name: 'Lamb', description: 'Lamb on the spit, side of pita and tzatziki', price: 15 },
    ],
  },
  {
    id: 'dinners',
    label: 'Dinners',
    items: [
      { name: 'Chicken Souvlaki', description: '2 skewers, rice, salad, bread roll, tzatziki', price: 20 },
      { name: 'Pork Souvlaki', description: '2 skewers, rice, salad, bread roll, tzatziki', price: 20 },
      { name: 'Gyros Plate', description: 'Rice, salad, pita, onions, tomatoes, tzatziki', price: 20 },
      { name: 'Spanakopita', description: 'Salad & rice', price: 15 },
      { name: 'Salad', description: 'Classic Greek salad', price: 8 },
      { name: 'Hot Dog', description: '', price: 7 },
    ],
  },
  {
    id: 'loukoumades',
    label: 'Loukoumades',
    items: [
      { name: 'Loukoumades', description: '15 pieces — warm Greek honey puffs, a festival favorite', price: 14 },
      { name: 'Nutella Loukoumades', description: '', price: 15 },
    ],
  },
  {
    id: 'pastries',
    label: 'Pastries',
    items: [
      { name: 'Baklava', description: 'Honey-soaked phyllo with walnuts & spices', priceOptions: [{ qty: 4, price: 14 }, { qty: 6, price: 20 }] },
      { name: 'Melomakarona', description: 'Honey walnut cookies', priceOptions: [{ qty: 4, price: 6 }, { qty: 9, price: 12 }] },
      { name: 'Ouzo Cupcakes', description: '', priceOptions: [{ qty: 1, price: 4 }, { qty: 2, price: 8 }, { qty: 4, price: 15 }] },
      { name: 'Karithopita', description: 'Greek walnut cake', priceOptions: [{ qty: 4, price: 6 }] },
      { name: 'Kourambiedes', description: 'Almond butter cookies with powdered sugar', priceOptions: [{ qty: 6, price: 8 }, { qty: 9, price: 12 }] },
      { name: 'Koulourakia', description: 'Traditional Greek butter cookies', priceOptions: [{ qty: 12, price: 14 }] },
    ],
  },
  {
    id: 'frappe',
    label: 'Frappe & Ice Cream',
    items: [
      { name: 'Frappe', description: 'Classic Greek iced coffee', price: 6 },
      { name: 'Ice Cream', description: 'Scoop of your choice', price: 4 },
      { name: 'Baklava Ice Cream', description: 'Ice cream with baklava topping', price: 7 },
    ],
  },
  {
    id: 'drinks',
    label: 'Drinks',
    items: [
      { name: 'Greek Beer', description: 'Cold and refreshing', price: 10 },
      { name: 'IPA', description: 'Craft IPA', price: 9 },
      { name: 'Michelob Ultra', description: 'Light beer', price: 6 },
      { name: 'Wine — Glass', description: 'White or rosé', price: 8 },
      { name: 'Wine — Bottle', description: 'White or rosé', price: 25 },
      { name: 'Ouzorita', description: 'Strawberry slushie with ouzo', price: 12 },
      { name: 'Soda', description: 'Assorted soft drinks', price: 3 },
      { name: 'Water', description: 'Bottled water', price: 2 },
    ],
  },
];

const GF_SPONSOR_TIERS = [
  { id: 'gold', label: 'Gold Sponsors', threshold: 2000 },
  { id: 'silver', label: 'Silver Sponsors', threshold: 1000 },
  { id: 'bronze', label: 'Bronze Sponsors', threshold: 500 },
  { id: 'laurel-wreath', label: 'Laurel Wreath', threshold: 250 },
  { id: 'olive-branch', label: 'Olive Branch', threshold: 100 },
];

const GF_SPONSORS = [
  { name: 'Silverman', tier: 'gold', logoUrl: 'https://ssppglenview.org/wp-content/uploads/2026/06/silverman.png' },
  { name: 'Jim & Suzanne Santos', tier: 'gold' },
  { name: 'The Angelos Family', tier: 'gold' },
  { name: 'Avli Inspired Greek', tier: 'silver', logoUrl: 'https://ssppglenview.org/wp-content/uploads/2026/05/Silver-web-sponsor-logos.png' },
  { name: 'Steve & Phaedra Koulogeorge', tier: 'silver' },
  { name: 'In Memory of Lola & Paul Vranas', tier: 'silver' },
  { name: 'In Memory of Corinne Karagiannis', tier: 'silver' },
  { name: 'Advanced Security Solutions', tier: 'silver', logoUrl: 'https://ssppglenview.org/wp-content/uploads/2025/07/Screenshot-2025-07-18-at-8.31.38 AM-e1752845715569.png' },
  { name: 'The Sandra & Nick Paterakos Family', tier: 'silver' },
  { name: 'Elias & Jeanette Abou Mourad and Family', tier: 'silver' },
  { name: 'John & Carrie Colis', tier: 'silver' },
  { name: 'Memory Eternal', tier: 'silver', logoUrl: 'https://ssppglenview.org/wp-content/uploads/2025/07/MemoryEternalLogo.png' },
  { name: 'Mary Alukos', tier: 'silver' },
  { name: 'The Damisch Family', tier: 'silver' },
  { name: 'The Kiriklakis Family', tier: 'bronze' },
  { name: 'Vicki Vranas', tier: 'bronze', logoUrl: 'https://ssppglenview.org/wp-content/uploads/2025/07/Screenshot-2025-07-21-at-8.03.06 AM.png' },
  { name: 'Chadwick, Marilyn, Lexy & Stephanie Prodromos', tier: 'bronze' },
  { name: 'The Anastos Family', tier: 'bronze' },
  { name: 'Dr. George, Angie, Mike & Tricia Katsamakis', tier: 'bronze' },
  { name: 'George Karagiannis', tier: 'bronze' },
  { name: 'Mark & Kathy Lucas', tier: 'laurel-wreath' },
  { name: 'Joanne & Christina Trahanas', tier: 'laurel-wreath' },
  { name: 'Themis & Julia Paspalas', tier: 'laurel-wreath' },
  { name: 'Brett & Michelle Woodley', tier: 'laurel-wreath' },
  { name: 'Cary & Maria Kalant', tier: 'laurel-wreath' },
  { name: 'Sean & Marina Gallagher', tier: 'laurel-wreath' },
  { name: 'The Gall Family', tier: 'laurel-wreath' },
  { name: 'John & Chris Dedes', tier: 'laurel-wreath' },
  { name: 'Andy & Donna Benetatos', tier: 'laurel-wreath' },
  { name: 'George & Stephanie Mantis', tier: 'laurel-wreath' },
  { name: 'Pres. Jane Andrews', tier: 'laurel-wreath' },
  { name: 'In Loving Memory of Christ, Nicholas & Barbara (Barkulis) Corcoran & William McIntyre', tier: 'laurel-wreath' },
  { name: 'Odiseas and Kristin Ninis & Family', tier: 'laurel-wreath' },
  { name: 'Bill & Carol Wells', tier: 'olive-branch' },
  { name: 'The Zabaneh Family', tier: 'olive-branch' },
  { name: 'Bill Neilson', tier: 'olive-branch' },
  { name: 'Kathleen Schieber', tier: 'olive-branch' },
  { name: 'Effie Bekas', tier: 'olive-branch' },
  { name: 'George & Sandra Karas', tier: 'olive-branch' },
  { name: 'Jon & Hewitt Gouris', tier: 'olive-branch' },
  { name: 'Christina Vercillo & Kevin Topolewski', tier: 'olive-branch' },
  { name: 'The Paradies Family', tier: 'olive-branch' },
  { name: 'Betty Quintas', tier: 'olive-branch' },
  { name: 'Peter & Antoinette Besbeas', tier: 'olive-branch' },
  { name: 'Christopher Adams', tier: 'olive-branch' },
  { name: 'Nick Peszek', tier: 'olive-branch' },
  { name: 'The Gonzalez Family', tier: 'olive-branch' },
  { name: 'Alvaro and Allison Lima', tier: 'olive-branch' },
  { name: 'Teresa Anesinis', tier: 'olive-branch' },
  { name: 'Helen & Don Mariano', tier: 'olive-branch' },
  { name: 'Toula & Jerry Garbis', tier: 'olive-branch' },
];

const GF_PARTNERS = [
  { name: 'Athenian Foods', logoUrl: 'https://ssppglenview.org/wp-content/uploads/2026/06/athenian-foods-logo.webp' },
  { name: 'Panos', logoUrl: 'https://ssppglenview.org/wp-content/uploads/2025/07/Screenshot-2025-07-18-at-8.29.51 AM-e1752845680399.png' },
  { name: "Homer's Ice Cream", logoUrl: 'https://ssppglenview.org/wp-content/uploads/2026/07/Homers-Ice-Cream-Logo.png' },
];
