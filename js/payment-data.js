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
