// ============================================
// SSPP Get Involved page
// Renders MINISTRY_CATEGORIES (js/ministries-data.js) as a searchable
// accordion of ministry cards, with a detail modal on click.
// If a ministry has a detailPageUrl, the modal shows a "View full
// page →" link in addition to the popup content.
// ============================================

let openCategoryId = null;

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function renderAccordion(filterText = '') {
  const root = document.getElementById('ministryAccordion');
  if (!root) return;

  const query = filterText.trim().toLowerCase();
  const isSearching = query.length > 0;

  const html = MINISTRY_CATEGORIES.map((cat) => {
    const matches = cat.ministries.filter((m) => {
      if (!isSearching) return true;
      return m.name.toLowerCase().includes(query) ||
        m.summary.toLowerCase().includes(query) ||
        m.description.toLowerCase().includes(query);
    });

    if (isSearching && matches.length === 0) return '';

    const isOpen = isSearching ? true : openCategoryId === cat.id;
    const list = isSearching ? matches : cat.ministries;

    return `
      <div class="acc-item" data-cat-id="${cat.id}">
        <button class="acc-head ${isOpen ? 'open' : ''}" data-toggle-cat="${cat.id}" aria-expanded="${isOpen}">
          <div class="acc-head-text">
            <div class="acc-title">${escapeHtml(cat.label)}</div>
            <div class="acc-blurb">${escapeHtml(cat.blurb)}</div>
          </div>
          <div class="acc-meta">
            <span class="acc-count">${list.length} ${list.length === 1 ? 'ministry' : 'ministries'}</span>
            <i class="ti ti-chevron-down acc-chevron" aria-hidden="true"></i>
          </div>
        </button>
        <div class="acc-body ${isOpen ? 'is-open' : ''}">
          <div class="ministry-grid">
            ${list.map((m) => renderMinistryCard(m, cat)).join('')}
          </div>
        </div>
      </div>
    `;
  }).join('');

  root.innerHTML = html || `
    <div class="no-results">
      <i class="ti ti-search-off" aria-hidden="true"></i>
      <p>No ministries match "${escapeHtml(filterText)}". Try a different search, or <a href="contact.html">contact the office</a> — we'll help you find your place.</p>
    </div>
  `;

  attachAccordionHandlers();
  attachCardHandlers();
}

function renderMinistryCard(ministry, category) {
  const inactiveBadge = ministry.inactive
    ? `<span class="inactive-badge">Currently Inactive</span>`
    : '';

  return `
    <button class="ministry-card ${ministry.inactive ? 'is-inactive' : ''}" data-ministry="${escapeHtml(ministry.name)}" data-cat="${category.id}">
      <div class="ministry-card-photo">
        <i class="ti ti-camera" aria-hidden="true"></i>
      </div>
      <div class="ministry-card-text">
        <div class="ministry-card-title">${escapeHtml(ministry.name)} ${inactiveBadge}</div>
        <div class="ministry-card-summary">${escapeHtml(ministry.summary)}</div>
      </div>
    </button>
  `;
}

function attachAccordionHandlers() {
  document.querySelectorAll('[data-toggle-cat]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const catId = btn.dataset.toggleCat;
      openCategoryId = openCategoryId === catId ? null : catId;
      renderAccordion(document.getElementById('ministrySearch').value);

      if (openCategoryId === catId) {
        const el = document.querySelector(`[data-cat-id="${catId}"]`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function attachCardHandlers() {
  document.querySelectorAll('.ministry-card').forEach((card) => {
    card.addEventListener('click', () => {
      const catId = card.dataset.cat;
      const name = card.dataset.ministry;
      const category = MINISTRY_CATEGORIES.find((c) => c.id === catId);
      const ministry = category?.ministries.find((m) => m.name === name);
      if (ministry) openMinistryModal(ministry, category);
    });
  });
}

function openMinistryModal(ministry, category) {
  const overlay = document.getElementById('ministryModalOverlay');
  document.getElementById('ministryModalCategory').textContent = category.label;
  document.getElementById('ministryModalTitle').textContent = ministry.name;
  document.getElementById('ministryModalDesc').textContent = ministry.description;

  const inactiveEl = document.getElementById('ministryModalInactive');
  inactiveEl.style.display = ministry.inactive ? 'flex' : 'none';

  const linkEl = document.getElementById('ministryModalFullPageLink');
  if (ministry.detailPageUrl) {
    linkEl.href = ministry.detailPageUrl;
    linkEl.style.display = 'inline-flex';
  } else {
    linkEl.style.display = 'none';
  }

  overlay.classList.add('is-open');
}

function closeMinistryModal() {
  document.getElementById('ministryModalOverlay').classList.remove('is-open');
}

function initMinistryModal() {
  const overlay = document.getElementById('ministryModalOverlay');
  const closeBtn = document.getElementById('ministryModalClose');

  closeBtn.addEventListener('click', closeMinistryModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeMinistryModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMinistryModal();
  });
}

function initSearch() {
  const input = document.getElementById('ministrySearch');
  if (!input) return;
  input.addEventListener('input', () => {
    renderAccordion(input.value);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderAccordion();
  initSearch();
  initMinistryModal();
});
