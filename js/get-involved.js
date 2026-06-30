// ============================================
// SSPP Get Involved page
// Renders MINISTRY_CATEGORIES (js/ministries-data.js) as a searchable
// accordion of ministry cards, with a detail modal on click.
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
    btn.addEventListener('click', (event) => {
      event.preventDefault();

      const catId = btn.dataset.toggleCat;
      const item = document.querySelector(`[data-cat-id="${catId}"]`);
      if (!item) return;

      const isCurrentlyOpen = btn.classList.contains('open');
      const willOpen = !isCurrentlyOpen;

      // Hard scroll lock: pin the body in place with position:fixed for
      // the duration of the DOM mutation, then release it. This is the
      // standard technique modal/dialog libraries use to guarantee zero
      // scroll movement during a layout change.
      const lockedScrollY = window.scrollY;
      const bodyEl = document.body;
      bodyEl.style.position = 'fixed';
      bodyEl.style.top = `-${lockedScrollY}px`;
      bodyEl.style.left = '0';
      bodyEl.style.right = '0';

      if (willOpen) {
        document.querySelectorAll('.acc-head.open').forEach((openBtn) => {
          if (openBtn !== btn) {
            openBtn.classList.remove('open');
            openBtn.setAttribute('aria-expanded', 'false');
            const otherBody = openBtn.parentElement.querySelector('.acc-body');
            if (otherBody) otherBody.classList.remove('is-open');
          }
        });
      }

      btn.classList.toggle('open', willOpen);
      btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
      const body = item.querySelector('.acc-body');
      if (body) body.classList.toggle('is-open', willOpen);

      openCategoryId = willOpen ? catId : null;

      // Release the lock on the next frame, after layout has settled.
      // Use behavior:'instant' explicitly — the page has global
      // scroll-behavior:smooth (see main.css), which would otherwise
      // animate this restoration and look like an unwanted jump.
      requestAnimationFrame(() => {
        bodyEl.style.position = '';
        bodyEl.style.top = '';
        bodyEl.style.left = '';
        bodyEl.style.right = '';
        window.scrollTo({ top: lockedScrollY, left: 0, behavior: 'instant' });
      });
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

function attachFeaturedCardHandlers() {
  document.querySelectorAll('.feat-card').forEach((card) => {
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

  const calLinkEl = document.getElementById('ministryModalCalLink');
  if (ministry.calendarCategory) {
    calLinkEl.href = `calendar.html?category=${encodeURIComponent(ministry.calendarCategory)}`;
    calLinkEl.style.display = 'inline-flex';
  } else {
    calLinkEl.style.display = 'none';
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
  attachFeaturedCardHandlers();
});
