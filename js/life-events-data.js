// ============================================
// Life Events calendar (Resources page)
//
// One entry per scheduled baptism, wedding, memorial, or funeral.
// Add entries whenever they get booked — even months ahead of time.
// The Resources page automatically shows only the ones falling in
// the CURRENT calendar week (Sunday–Saturday); everything else stays
// hidden until its week arrives. No weekly editing needed here.
//
// date: 'YYYY-MM-DD' (the actual day of the service)
// type: 'baptism' | 'wedding' | 'memorial' | 'funeral'
// ============================================
const LIFE_EVENTS = [
  { type: 'baptism', name: '[Name]', date: '2026-08-30', time: '11:00 AM' },
  { type: 'wedding', name: 'Nick & Elena Kostas', date: '2026-09-05', time: '1:00 PM' },
  { type: 'memorial', name: '40-Day Memorial for [name]', date: '2026-09-06', time: 'After Liturgy' },
  { type: 'funeral', name: 'Funeral for [Name]', date: '2026-08-23', time: '10:00 AM' },
];
