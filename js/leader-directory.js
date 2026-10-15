// ============================================
// Ministry Leaders accordion (Resources page)
// Builds one collapsible section per category from
// MINISTRY_CATEGORIES, listing only ministries with a
// real (non-TBD) contact. Requires ministries-data.js first.
// ============================================
document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('leaderAccordion');
  if (!container || typeof MINISTRY_CATEGORIES === 'undefined') return;

  // People who lead several ministries get ONE row, shown in their home
  // category. Keyed by the exact contact name used in ministries-data.js.
  //   title:          the line under their name
  //   listMinistries: also show every ministry they lead beneath the title
  const MERGED_LEADERS = {
    'Steven Thell': { home: 'youth', title: 'Youth Director', listMinistries: true },
    'Steven Conway & Chris Batrich': { home: 'youth', title: 'Athletics', listMinistries: false },
  };

  function isListed(m) {
    return m.contact && m.contact.name && m.contact.name !== 'TBD' && !m.inactive;
  }

  // Collect every ministry each merged person leads, across all categories
  const mergedMinistries = {};
  Object.keys(MERGED_LEADERS).forEach(function (name) { mergedMinistries[name] = []; });
  MINISTRY_CATEGORIES.forEach(function (cat) {
    cat.ministries.forEach(function (m) {
      if (isListed(m) && MERGED_LEADERS[m.contact.name]) {
        mergedMinistries[m.contact.name].push({ ministry: m, categoryId: cat.id });
      }
    });
  });

  MINISTRY_CATEGORIES.forEach(function (category) {
    const rows = [];

    // Merged people whose home is this category go first
    Object.keys(MERGED_LEADERS).forEach(function (name) {
      const cfg = MERGED_LEADERS[name];
      const found = mergedMinistries[name];
      if (cfg.home !== category.id || found.length === 0) return;

      // Home-category ministries first, then the rest
      found.sort(function (a, b) {
        return (b.categoryId === cfg.home) - (a.categoryId === cfg.home);
      });

      rows.push({
        name: name,
        role: cfg.title,
        sub: cfg.listMinistries
          ? found.map(function (f) { return f.ministry.name.split(' - ')[0]; }).join(' · ')
          : '',
        email: found[0].ministry.contact.email,
      });
    });

    // Everyone else, one row per ministry, as before
    category.ministries.forEach(function (m) {
      if (!isListed(m) || MERGED_LEADERS[m.contact.name]) return;
      rows.push({ name: m.contact.name, role: m.name, sub: '', email: m.contact.email });
    });

    if (rows.length === 0) return;

    const details = document.createElement('details');
    details.className = 'rs-leader-cat';

    const summary = document.createElement('summary');
    summary.textContent = category.label;
    details.appendChild(summary);

    const rowsWrap = document.createElement('div');
    rowsWrap.className = 'rs-leader-rows';

    rows.forEach(function (r) {
      const row = document.createElement('div');
      row.className = 'rs-leader-row';
      row.innerHTML =
        '<div>' +
          '<div class="rs-leader-name">' + r.name + '</div>' +
          '<div class="rs-leader-role">' + r.role + '</div>' +
          (r.sub ? '<div class="rs-leader-sub">' + r.sub + '</div>' : '') +
        '</div>' +
        '<a href="mailto:' + r.email + '" class="rs-leader-email">' +
          '<i class="ti ti-mail" aria-hidden="true"></i>' +
        '</a>';
      rowsWrap.appendChild(row);
    });

    details.appendChild(rowsWrap);
    container.appendChild(details);
  });
});
