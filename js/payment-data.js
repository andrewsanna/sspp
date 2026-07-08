// ============================================
// SSPP shared payment/registration system
//
// One entry per payable thing anywhere on the site — festival
// tickets, sponsorships, ministry registrations, general donations.
// Linked from ANY page via payment.html?item=KEY
//
// TYPE SMART DEFAULTS (only apply if you don't set the field yourself
// on a given entry):
//   ticket       -> mode: 'tiers',  allowQuantity: true,  allowCustomAmount: false
//   sponsorship  -> mode: 'tiers',  allowQuantity: false, allowCustomAmount: true
//   donation     -> mode: 'custom', allowQuantity: false, allowCustomAmount: true
//   registration -> mode: 'tiers',  allowQuantity: false, allowCustomAmount: false
//
// FIELDS: everyone always gives name + email (built into payment.html
// itself, not listed here). `fields` adds whatever ELSE this specific
// entry needs. Supported types: text, textarea, select, checkbox, number.
//
// PRICE-AFFECTING FIELDS — any field can change the total:
//   - select:   give options as { label, priceImpact } instead of plain strings
//   - checkbox: give the field a priceImpact (cents), added when checked
//   - number:   give the field a pricePerUnit (cents), multiplied by entered value
//
// RETURN NAVIGATION: optional returnTo on an entry controls where
// "Back" and "Done" point on the checkout page, since this gets
// linked from the calendar, ministry pages, anywhere.
//
// OPEN REGISTRATIONS (Resources page): the "Open Registrations" grid on
// resources.html is driven entirely by the OPEN_REGISTRATIONS list at the
// bottom of this file. To open or close a registration for that page,
// just add or remove its key from that list — no HTML edits needed.
// Every entry used there should also have `description` and `schedule`
// fields (used in the registration detail popup), in addition to the
// fields ministries-data.js entries normally have.
// ============================================

const PAYMENT_ITEMS = {

  'festival-tickets': {
    type: 'ticket',
    title: 'Greek Fest Tickets',
    subtitle: 'Glenview Greek Fest — August 2026',
    icon: 'ti-ticket',
    returnTo: { url: 'calendar.html', label: 'Calendar' },
    options: [
      { id: 'adult', label: 'Adult (13+)', amount: 2500 },
      { id: 'child', label: 'Child (6–12)', amount: 1000 },
      { id: 'family', label: 'Family Pack (2 adults + 2 kids)', amount: 6000 },
    ],
  },

  'festival-sponsorship': {
    type: 'sponsorship',
    title: 'Festival Sponsorship',
    subtitle: 'Support the 2026 Glenview Greek Fest',
    icon: 'ti-heart-handshake',
    returnTo: { url: 'calendar.html', label: 'Calendar' },
    options: [
      { id: 'bronze', label: 'Bronze Sponsor', amount: 25000 },
      { id: 'silver', label: 'Silver Sponsor', amount: 50000 },
      { id: 'gold', label: 'Gold Sponsor', amount: 100000 },
    ],
  },

  'general-donation': {
    type: 'donation',
    title: 'General Donation',
    subtitle: 'Support SSPP Glenview',
    icon: 'ti-gift',
    returnTo: { url: 'index.html', label: 'Home' },
    suggestedAmounts: [2500, 5000, 10000, 25000],
  },

  // Example of a ministry registration, showing custom fields AND a
  // price-affecting checkbox (sibling discount). This is the pattern
  // you'd copy for any other ministry sign-up.
  'church-school-registration': {
    type: 'registration',
    ministry: 'Church School',
    title: 'Church School Registration',
    subtitle: '2026–2027 Church School Year',
    icon: 'ti-school',
    description: 'Church School begins with family worship in Divine Liturgy at 9:30 a.m. on Sunday mornings. Students proceed to class following Holy Communion, with classes ending at 11:45 a.m. Numerous volunteer opportunities exist to offer your time and talent to our many programs.',
    schedule: 'Sundays, 9:30–11:45 AM (after Divine Liturgy)',
    returnTo: { url: 'get-involved.html', label: 'Get Involved' },
    options: [
      { id: 'student', label: 'Per Student', amount: 5000 },
    ],
    fields: [
      { id: 'studentName', label: "Child's full name", type: 'text', required: true },
      {
        id: 'grade', label: 'Grade level', type: 'select', required: true,
        options: ['Pre-K', 'K', '1st', '2nd', '3rd', '4th', '5th', '6th'],
      },
      {
        id: 'siblingDiscount', label: 'Additional sibling enrolling? (–$10)', type: 'checkbox',
        priceImpact: -1000,
      },
      { id: 'allergies', label: 'Allergies or medical notes', type: 'textarea', required: false },
      {
        id: 'additionalStudents', label: 'Additional child(ren) enrolling? List name and grade for each',
        type: 'textarea', required: false,
      },
    ],
  },

  // Priced per number of dancers registering together (1/2/3 kids).
  // NOTE: the form only captures full details (name/age/grade/shirt) for
  // one dancer, since this system doesn't currently support dynamically
  // repeating a field group per selected tier. A second text field
  // catches details for any additional dancers in the meantime.
  'greek-dance-youth': {
    type: 'registration',
    ministry: 'Greek Dance (Youth)',
    title: 'Greek Dance — Youth',
    subtitle: '2026–2027 Season',
    icon: 'ti-music',
    description: 'The Greek Dance ministry at SSPP is dedicated to promoting, celebrating, and preserving our Greek heritage through the art of song and dance. Each youth group meets once a week, providing the opportunity to build friendships while learning a variety of dances from different regions of Greece.',
    schedule: 'Elementary: Sundays 12:00–1:00 PM · Middle School: Sundays 1:00–2:00 PM',
    returnTo: { url: 'resources.html', label: 'Resources' },
    options: [
      { id: 'one-dancer', label: '1 Dancer', amount: 12000 },
      { id: 'two-dancers', label: '2 Dancers', amount: 20000 },
      { id: 'three-dancers', label: '3 Dancers', amount: 26000 },
    ],
    fields: [
      { id: 'dancerName', label: "Dancer's name", type: 'text', required: true },
      { id: 'dancerAge', label: "Dancer's age", type: 'number', required: true },
      { id: 'dancerGrade', label: "Dancer's grade", type: 'text', required: true },
      {
        id: 'dancerShirt', label: 'T-shirt size', type: 'select', required: true,
        options: ['Youth S', 'Youth M', 'Youth L', 'Adult S', 'Adult M', 'Adult L'],
      },
      {
        id: 'additionalDancers', label: 'Additional dancer(s)? List name, age, grade, and shirt size for each',
        type: 'textarea', required: false,
      },
    ],
  },

  // PLACEHOLDER PRICE — $1,800/semester was made up as a placeholder.
  // Replace `amount` below with Agape's real Fall 2026 tuition.
  'agape-preschool-fall-2026': {
    type: 'registration',
    ministry: 'AGAPE Preschool',
    title: 'Agape Preschool — Fall 2026',
    subtitle: 'Fall Semester',
    icon: 'ti-building-church',
    description: 'AGAPE Preschool is a ministry program of our parish, committed to a high-quality educational experience that emphasizes the Orthodox Christian Faith. Our program provides a loving, caring environment where children can develop spiritually, emotionally, socially, cognitively, and physically. We are DCFS approved.',
    schedule: 'Monday–Friday, 8:00 AM – 2:00 PM',
    returnTo: { url: 'resources.html', label: 'Resources' },
    options: [
      { id: 'student', label: 'Per Child (Fall Semester)', amount: 180000 }, // PLACEHOLDER — confirm real tuition
    ],
    fields: [
      { id: 'childName', label: "Child's full name", type: 'text', required: true },
      { id: 'childDob', label: "Child's date of birth", type: 'text', required: true },
      {
        id: 'siblingDiscount', label: 'Additional sibling enrolling? (–$100)', type: 'checkbox',
        priceImpact: -10000,
      },
      { id: 'allergies', label: 'Allergies or medical notes', type: 'textarea', required: false },
      {
        id: 'additionalChildren', label: 'Additional child(ren) enrolling? List name and date of birth for each',
        type: 'textarea', required: false,
      },
    ],
  },

};

// Merges type-based smart defaults with whatever the entry set explicitly.
// The entry's own fields always win. Never mutates PAYMENT_ITEMS itself.
const PAYMENT_TYPE_DEFAULTS = {
  ticket:       { mode: 'tiers',  allowQuantity: true,  allowCustomAmount: false },
  sponsorship:  { mode: 'tiers',  allowQuantity: false, allowCustomAmount: true  },
  donation:     { mode: 'custom', allowQuantity: false, allowCustomAmount: true  },
  registration: { mode: 'tiers',  allowQuantity: false, allowCustomAmount: false },
};

function resolvePaymentItem(rawItem) {
  const defaults = PAYMENT_TYPE_DEFAULTS[rawItem.type] || {};
  return { ...defaults, ...rawItem };
}

// Returns a display string for the price pill — e.g. "$10–$60", "$50",
// or '' if there's no fixed range to show (pure custom-amount donations).
function getPaymentPriceLabel(itemKey) {
  const raw = PAYMENT_ITEMS[itemKey];
  if (!raw) return '';
  const item = resolvePaymentItem(raw);

  if (!item.options || item.options.length === 0) return '';

  const amounts = item.options.map((o) => o.amount);
  const min = Math.min(...amounts);
  const max = Math.max(...amounts);
  const fmt = (c) => `$${(c / 100).toFixed(c % 100 === 0 ? 0 : 2)}`;
  return min === max ? fmt(min) : `${fmt(min)}–${fmt(max)}`;
}

// ============================================
// Open Registrations (used by resources.html)
//
// Ordered list of PAYMENT_ITEMS keys currently open for registration.
// To open a new one: add its key here (and make sure it exists above).
// To close one: just remove its key — the card disappears from
// Resources automatically, nothing else to edit.
// ============================================
const OPEN_REGISTRATIONS = [
  'greek-dance-youth',
  'church-school-registration',
  'agape-preschool-fall-2026',
];
