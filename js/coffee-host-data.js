// ============================================
// Coffee Fellowship hosting — booked Sundays
//
// The "Sign Up to Host" form (Get Involved + Resources) shows the next
// several Sundays as date chips. Any Sunday listed here shows as taken
// (struck through, not selectable), so two families can't pick the
// same week.
//
// When a sign-up is confirmed, add a row here. Past dates can stay or
// be deleted; the form only ever shows upcoming Sundays.
//
// date: 'YYYY-MM-DD' (the Sunday)
// host: who is hosting. Only shown as a hover tooltip on the chip.
// ============================================
const COFFEE_HOST_BOOKED = [
  { date: '2026-10-04', host: 'Philoptochos' },
  { date: '2026-10-18', host: '[Family name]' },
];

// How many upcoming Sundays to offer, and how many days' notice a
// host needs (a Sunday closer than this is left off the list).
const COFFEE_HOST_WEEKS_AHEAD = 12;
const COFFEE_HOST_MIN_NOTICE_DAYS = 5;
