// ============================================
// SSPP Parish Life page
// Renders PARISH_LIFE_POSTS (js/parish-life-data.js) as a responsive
// masonry grid (3 columns desktop / 2 tablet / 1 mobile). Cards with a
// photo get a featured image; text-only posts get a colored accent
// header instead. Clicking a card opens the full post in a modal.
// ============================================

let plCurrentColumnCount = null;
let plResizeTimer = null;
let plLastFocusedEl = null;

function plEscapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function plFormatBody(body) {
  return body
    .split('\n\n')
    .map((para) => `<p>${plEscapeHtml(para).replace(/\n/g, '<br>')}</p>`)
    .join('');
}

function plRenderGallery(photos) {
  if (!photos || photos.length === 0) return '';
  return `
    <div class="pl-photo-grid ${photos.length === 1 ? 'pl-photo-grid--single' : ''}">
      ${photos.map((p) => `
        <figure class="pl-photo">
          <img src="${plEscapeHtml(p.src)}" alt="${plEscapeHtml(p.caption || '')}" loading="lazy">
          ${p.caption ? `<figcaption>${plEscapeHtml(p.caption)}</figcaption>` : ''}
        </figure>
      `).join('')}
    </div>
  `;
}

// ---- Responsive column count ----

function plGetColumnCount() {
  const w = window.innerWidth;
  if (w < 640) return 1;
  if (w < 980) return 2;
  return 3;
}

// ---- Simple greedy masonry distribution ----
// We don't know real rendered height ahead of time, so estimate a
// "weight" per card (photo cards are taller) and always add the next
// post to whichever column currently has the lowest total weight.

function plEstimateWeight(post) {
  let weight = 130; // badge + title + chrome
  weight += Math.min(post.excerpt.length, 160) * 0.6;
  if (post.photos && post.photos.length > 0) weight += 190;
  return weight;
}

function plDistributeIntoColumns(posts, numCols) {
  const columns = Array.from({ length: numCols }, () => ({ items: [], weight: 0 }));
  posts.forEach((post) => {
    const target = columns.reduce((min, c) => (c.weight < min.weight ? c : min), columns[0]);
    target.items.push(post);
    target.weight += plEstimateWeight(post);
  });
  return columns.map((c) => c.items);
}

// ---- Card rendering (collapsed tile only — no inline expand anymore) ----

function plRenderCard(post) {
  const cat = PARISH_LIFE_CATEGORIES[post.category] || { label: post.category, color: 'navy', icon: 'ti-news' };
  const hasFeatured = !!(post.photos && post.photos.length > 0);
  const featuredSrc = hasFeatured ? post.photos[0].src : null;

  return `
    <article class="pl-item ${hasFeatured ? 'pl-item--featured' : 'pl-item--text'}" data-post-id="${post.id}">
      <button class="pl-head" data-open-post="${post.id}" aria-haspopup="dialog">
        ${hasFeatured
          ? `<div class="pl-card-image"><img src="${plEscapeHtml(featuredSrc)}" alt="" loading="lazy"></div>`
          : `<div class="pl-card-accent pl-card-accent--${cat.color}"></div>`
        }
        <div class="pl-head-main">
          <div class="pl-head-top">
            <span class="pl-badge pl-badge--${cat.color}">${plEscapeHtml(cat.label)}</span>
            <span class="pl-date">${plEscapeHtml(post.date)}</span>
          </div>
          <div class="pl-title">${plEscapeHtml(post.title)}</div>
          <div class="pl-excerpt">${plEscapeHtml(post.excerpt)}</div>
          <span class="pl-read-more">Read more <i class="ti ti-arrow-right" aria-hidden="true"></i></span>
        </div>
      </button>
    </article>
  `;
}
// ---- Full grid render ----

function renderParishLifeFeed() {
  const root = document.getElementById('parishLifeFeed');
  if (!root) return;

  const numCols = plGetColumnCount();
  plCurrentColumnCount = numCols;
  const columns = plDistributeIntoColumns(PARISH_LIFE_POSTS, numCols);

  if (PARISH_LIFE_POSTS.length === 0) {
    root.innerHTML = `
      <div class="no-results">
        <i class="ti ti-mood-empty" aria-hidden="true"></i>
        <p>Nothing posted yet — check back soon.</p>
      </div>
    `;
    return;
  }

  root.innerHTML = `
    <div class="pl-grid">
      ${columns.map((colPosts) => `
        <div class="pl-column">
          ${colPosts.map((post) => plRenderCard(post)).join('')}
        </div>
      `).join('')}
    </div>
  `;

  attachParishLifeHandlers();
}

function attachParishLifeHandlers() {
  document.querySelectorAll('[data-open-post]').forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      plOpenModal(btn.dataset.openPost, btn);
    });
  });
}

// ---- Modal ----

function plOpenModal(postId, triggerEl) {
  const post = PARISH_LIFE_POSTS.find((p) => p.id === postId);
  if (!post) return;

  const modalRoot = document.getElementById('plModalRoot');
  if (!modalRoot) return;

  const cat = PARISH_LIFE_CATEGORIES[post.category] || { label: post.category, color: 'navy', icon: 'ti-news' };

  modalRoot.innerHTML = `
    <div class="pl-modal-backdrop" data-close-modal></div>
    <div class="pl-modal" role="dialog" aria-modal="true" aria-labelledby="plModalTitle">
      <button class="pl-modal-close" data-close-modal aria-label="Close">
        <i class="ti ti-x" aria-hidden="true"></i>
      </button>
      <div class="pl-modal-scroll">
        ${post.photos && post.photos.length > 0
          ? `<div class="pl-modal-hero"><img src="${plEscapeHtml(post.photos[0].src)}" alt=""></div>`
          : `<div class="pl-modal-hero pl-modal-hero--accent pl-card-accent--${cat.color}"></div>`
        }
        <div class="pl-modal-body">
          <div class="pl-head-top">
            <span class="pl-badge pl-badge--${cat.color}">${plEscapeHtml(cat.label)}</span>
            <span class="pl-date">${plEscapeHtml(post.date)}</span>
          </div>
          <h2 class="pl-modal-title" id="plModalTitle">${plEscapeHtml(post.title)}</h2>
          ${post.author ? `<div class="pl-author">${plEscapeHtml(post.author)}</div>` : ''}
          <div class="pl-text">${plFormatBody(post.body)}</div>
          ${post.photos && post.photos.length > 1 ? plRenderGallery(post.photos.slice(1)) : ''}
        </div>
      </div>
    </div>
  `;

  plLastFocusedEl = triggerEl || document.activeElement;
  document.body.classList.add('pl-modal-open');
  modalRoot.classList.add('is-open');

  requestAnimationFrame(() => {
    modalRoot.querySelector('.pl-modal-close')?.focus();
  });

  modalRoot.querySelectorAll('[data-close-modal]').forEach((el) => {
    el.addEventListener('click', plCloseModal);
  });
  document.addEventListener('keydown', plHandleModalKeydown);
}

function plCloseModal() {
  const modalRoot = document.getElementById('plModalRoot');
  if (!modalRoot) return;

  modalRoot.classList.remove('is-open');
  document.body.classList.remove('pl-modal-open');
  document.removeEventListener('keydown', plHandleModalKeydown);

  // Wait for the fade-out transition, then clear the DOM.
  setTimeout(() => {
    modalRoot.innerHTML = '';
  }, 200);

  if (plLastFocusedEl) {
    plLastFocusedEl.focus();
    plLastFocusedEl = null;
  }
}

function plHandleModalKeydown(event) {
  if (event.key === 'Escape') {
    plCloseModal();
  }
}

// Re-distribute into columns if the column count actually changes
// (crossing a breakpoint) — not on every pixel of a resize.
function plHandleResize() {
  clearTimeout(plResizeTimer);
  plResizeTimer = setTimeout(() => {
    const newCount = plGetColumnCount();
    if (newCount !== plCurrentColumnCount) {
      renderParishLifeFeed();
    }
  }, 150);
}

document.addEventListener('DOMContentLoaded', () => {
  renderParishLifeFeed();
  window.addEventListener('resize', plHandleResize);
});
