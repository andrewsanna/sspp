// ============================================
// SSPP Get Involved page
// Renders MINISTRY_CATEGORIES (js/ministries-data.js) as a searchable
// directory: one always-visible section per category, each with a grid of
// ministry cards and a detail modal on click.
// ============================================

// One-word label for each category's calendar button. Keyed by
// category id since a couple of these (Committees, Philanthropy) can't be
// derived from the category label automatically.
const CATEGORY_CAL_LABELS = {
  'committees': 'Committees',
  'worship': 'Worship',
  'youth': 'Youth',
  'children': 'Education',
  'adult-learning': 'Faith',
  'adult-activities': 'Activities',
  'outreach': 'Philanthropy',
  'support': 'Support',
  'seasonal': 'Events',
};

function getCategoryCalendar(cat) {
  const counts = {};
  cat.ministries.forEach((m) => {
    if (m.calendarCategory) counts[m.calendarCategory] = (counts[m.calendarCategory] || 0) + 1;
  });
  const entries = Object.entries(counts);
  if (entries.length === 0) return null;

  // A category can name its calendar outright; otherwise use the most common one.
  entries.sort((a, b) => b[1] - a[1]);
  const calendarCategory = cat.calendarCategory || entries[0][0];
  const label = CATEGORY_CAL_LABELS[cat.id] || cat.label.split(' ')[0];

  // Narrow to this category's own calendars when every ministry using that
  // calendar category has a calendarTag (e.g. Church School + Greek School,
  // not all of Youth). Otherwise show the whole calendar category.
  const using = cat.ministries.filter((m) => m.calendarCategory === calendarCategory);
  const tags = using.every((m) => m.calendarTag)
    ? [...new Set(using.flatMap((m) => [].concat(m.calendarTag)))]
    : [];

  return { calendarCategory, label, tags };
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ----- Deep-link helpers -----
// Turns a ministry name into a URL-safe id, e.g. "Sr. GOYA" -> "sr-goya".
// Used both when rendering each ministry card's id and when matching a
// URL hash (get-involved.html#sr-goya) back to a ministry.
function slugify(str) {
  return str.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function findMinistryBySlug(slug) {
  // Exact match first, then a short form of the name: #sr-goya finds
  // "Sr. GOYA - High School" (card id sr-goya-high-school).
  for (const exact of [true, false]) {
    for (const cat of MINISTRY_CATEGORIES) {
      const ministry = cat.ministries.find((m) => {
        const s = slugify(m.name);
        return exact ? s === slug : s.startsWith(slug + '-');
      });
      if (ministry) return { ministry, category: cat };
    }
  }
  return null;
}

function renderDirectory(filterText = '') {
  const root = document.getElementById('ministryDirectory');
  if (!root) return;

  const query = filterText.trim().toLowerCase();
  const isSearching = query.length > 0;

  const html = MINISTRY_CATEGORIES.map((cat) => {
    // Search matches ministry names and category names only (not summaries
    // or descriptions). A category-name match shows that whole category.
    const categoryMatches = isSearching && cat.label.toLowerCase().includes(query);
    const list = cat.ministries.filter((m) => {
      if (!isSearching || categoryMatches) return true;
      return m.name.toLowerCase().includes(query);
    });

    // While searching, a category with no matches is hidden entirely.
    if (list.length === 0) return '';

    const cal = getCategoryCalendar(cat);
    const calLink = cal
      ? `<a href="calendar.html?category=${encodeURIComponent(cal.calendarCategory)}${cal.tags.length ? `&tag=${encodeURIComponent(cal.tags.join(','))}` : ''}" class="gi-category-cal" aria-label="View ${escapeHtml(cal.label)} Calendar" title="View ${escapeHtml(cal.label)} Calendar">
           <i class="ti ti-calendar" aria-hidden="true"></i> ${escapeHtml(cal.label)} Calendar
         </a>`
      : '';

    const id = slugify(cat.label);
    return `
      <section class="gi-category" id="${id}" data-cat-id="${cat.id}" aria-labelledby="${id}-title">
        <div class="gi-category-head">
          <div class="gi-category-text">
            <h2 class="gi-category-title" id="${id}-title">${escapeHtml(cat.label)}</h2>
            <p class="gi-category-blurb">${escapeHtml(cat.blurb)}</p>
          </div>
          <div class="gi-category-meta">
            ${calLink}
            <span class="gi-category-count">${list.length} ${list.length === 1 ? 'ministry' : 'ministries'}</span>
          </div>
        </div>
        <div class="ministry-grid">
          ${list.map((m) => renderMinistryCard(m, cat)).join('')}
        </div>
      </section>
    `;
  }).join('');

  root.innerHTML = html || `
    <div class="no-results">
      <i class="ti ti-search-off" aria-hidden="true"></i>
      <p>No ministries match "${escapeHtml(filterText)}". Try a different search, or <a href="contact.html">contact the office</a> and we'll point you to the right ministry.</p>
    </div>
  `;

  attachCardHandlers();
}

function renderMinistryCard(ministry, category) {
  const inactiveBadge = ministry.inactive
    ? `<span class="inactive-badge">Currently Inactive</span>`
    : '';

  const photo = ministry.image
    ? `<div class="ministry-card-photo"><img src="${escapeHtml(ministry.image)}" alt="" loading="lazy"></div>`
    : '';

  const classes = `ministry-card ${ministry.inactive ? 'is-inactive' : ''} ${ministry.image ? '' : 'no-photo'}`;
  const attrs = `id="${slugify(ministry.name)}" data-ministry="${escapeHtml(ministry.name)}" data-cat="${category.id}"`;
  const inner = `
      ${photo}
      <div class="ministry-card-text">
        <div class="ministry-card-title">${escapeHtml(ministry.name)} ${inactiveBadge}</div>
        <div class="ministry-card-summary">${escapeHtml(ministry.summary)}</div>
      </div>`;

  // Ministries with their own page on this site link straight to it;
  // external, PDF and contact links keep the detail modal.
  if (hasOwnPage(ministry)) {
    return `
    <a class="${classes} is-linked" href="${escapeHtml(ministry.detailPageUrl)}" ${attrs}>${inner}
      <i class="ti ti-arrow-up-right ministry-card-go" aria-hidden="true"></i>
    </a>
  `;
  }

  return `
    <button class="${classes}" ${attrs}>${inner}
    </button>
  `;
}

function hasOwnPage(ministry) {
  return typeof ministry.detailPageUrl === 'string' && ministry.detailPageUrl.startsWith('ministries/');
}

function attachCardHandlers() {
  // Linked cards (<a class="ministry-card is-linked">) navigate on their own.
  document.querySelectorAll('.ministry-card:not(.is-linked)').forEach((card) => {
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

  const placeholderIcon = document.getElementById('ministryModalPlaceholderIcon');
const photoImgEl = document.getElementById('ministryModalPhotoImg');

  if (ministry.image) {
    photoImgEl.src = ministry.image;
    photoImgEl.alt = ministry.name;
    photoImgEl.style.display = 'block';
    placeholderIcon.style.display = 'none';
  } else {
    photoImgEl.style.display = 'none';
    placeholderIcon.style.display = 'block';
  } 
  const inactiveEl = document.getElementById('ministryModalInactive');
  inactiveEl.style.display = ministry.inactive ? 'flex' : 'none';

  const linkEl = document.getElementById('ministryModalFullPageLink');
  if (ministry.detailPageUrl) {
    linkEl.href = ministry.detailPageUrl;
    linkEl.style.display = 'inline-flex';
  } else {
    linkEl.style.display = 'none';
  }

  // ---- Per-ministry "View Calendar" link — replaced by the
  // category-level calendar link in each category's header row. Left here,
  // commented out, in case we ever want to switch back.
  //
  // const calLinkEl = document.getElementById('ministryModalCalLink');
  // if (ministry.calendarCategory) {
  //   calLinkEl.href = `calendar.html?category=${encodeURIComponent(ministry.calendarCategory)}`;
  //   calLinkEl.style.display = 'inline-flex';
  // } else {
  //   calLinkEl.style.display = 'none';
  // }

  // Ministries with an open sign-up (e.g. Coffee Fellowship hosting)
  // get a button that hands off to that sign-up's own modal.
  const signupEl = document.getElementById('ministryModalSignup');
  if (signupEl) {
    const canSignUp = ministry.signup === 'coffee-host' && typeof window.openCoffeeHostModal === 'function';
    signupEl.style.display = canSignUp ? 'inline-flex' : 'none';
  }

  const contactEl = document.getElementById('ministryModalContact');
  if (ministry.contact) {
    document.getElementById('ministryModalContactName').textContent = ministry.contact.name;
    document.getElementById('ministryModalContactRole').textContent = ministry.contact.role || 'Ministry Contact';
    const emailEl = document.getElementById('ministryModalContactEmail');
    emailEl.href = `mailto:${ministry.contact.email}`;
    contactEl.style.display = 'flex';
  } else {
    contactEl.style.display = 'none';
  }

  overlay.classList.add('is-open');
  trapModalFocus(overlay);
}

function closeMinistryModal() {
  const overlay = document.getElementById('ministryModalOverlay');
  if (!overlay.classList.contains('is-open')) return;
  overlay.classList.remove('is-open');
  releaseModalFocus();
}

function initMinistryModal() {
  const overlay = document.getElementById('ministryModalOverlay');
  const closeBtn = document.getElementById('ministryModalClose');

  closeBtn.addEventListener('click', closeMinistryModal);

  const signupBtn = document.getElementById('ministryModalSignup');
  if (signupBtn) {
    signupBtn.addEventListener('click', () => {
      closeMinistryModal();
      window.openCoffeeHostModal();
    });
  }
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
    renderDirectory(input.value);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Deep-link support:
  // - get-involved.html#youth-young-adults scrolls to that category section
  //   (section ids are the slugified category label).
  // - get-involved.html#sr-goya scrolls that ministry's card into view and
  //   opens its detail modal — used by the homepage "Ministry Spotlight"
  //   links (and anywhere else that points at one specific ministry).
  // The sections are rendered by JS after load, so the browser can't jump
  // to the hash on its own; do it here once they exist.
  const hash = window.location.hash.replace('#', '');
  const categoryLink = hash ? MINISTRY_CATEGORIES.find((c) => slugify(c.label) === hash) : null;
  const deepLink = hash && !categoryLink ? findMinistryBySlug(hash) : null;

  renderDirectory();
  initSearch();
  initMinistryModal();

  if (categoryLink) {
    const section = document.getElementById(hash);
    if (section) section.scrollIntoView();
  }

  if (deepLink) {
    const card = document.getElementById(slugify(deepLink.ministry.name));
    if (card) card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    openMinistryModal(deepLink.ministry, deepLink.category);
  }
});
