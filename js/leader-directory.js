// ============================================
// Ministry Leaders accordion (Resources page)
// Builds one collapsible section per category from
// MINISTRY_CATEGORIES, listing only ministries with a
// real (non-TBD) contact. Requires ministries-data.js first.
// ============================================
document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('leaderAccordion');
  if (!container || typeof MINISTRY_CATEGORIES === 'undefined') return;

  MINISTRY_CATEGORIES.forEach(function (category) {
    const leaders = category.ministries.filter(function (m) {
      return m.contact && m.contact.name && m.contact.name !== 'TBD' && !m.inactive;
    });
    if (leaders.length === 0) return;

    const details = document.createElement('details');
    details.className = 'rs-leader-cat';

    const summary = document.createElement('summary');
    summary.textContent = category.label;
    details.appendChild(summary);

    const rowsWrap = document.createElement('div');
    rowsWrap.className = 'rs-leader-rows';

    leaders.forEach(function (m) {
      const row = document.createElement('div');
      row.className = 'rs-leader-row';
      row.innerHTML =
        '<div>' +
          '<div class="rs-leader-name">' + m.contact.name + '</div>' +
          '<div class="rs-leader-role">' + (m.contact.role || m.name) + '</div>' +
        '</div>' +
        '<a href="mailto:' + m.contact.email + '" class="rs-leader-email">' +
          '<i class="ti ti-mail" aria-hidden="true"></i>' +
        '</a>';
      rowsWrap.appendChild(row);
    });

    details.appendChild(rowsWrap);
    container.appendChild(details);
  });
});
