// ============================================
// SSPP Parish Life page
// Renders PARISH_LIFE_POSTS (js/parish-life-data.js) as a responsive
// masonry grid (3 columns desktop / 2 tablet / 1 mobile). Cards with a
// photo get a featured image; text-only posts get a colored accent
// header instead. Clicking a card expands it in place — only one card
// open at a time, same scroll-lock technique as the Get Involved page.
// ============================================

let plOpenPostId = null;
let plCurrentColumnCount = null;
let plResizeTimer = null;

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
// Keeps the three columns roughly balanced without a layout library.

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

// ---- Card rendering ----

function plRenderCard(post) {
  const cat = PARISH_LIFE_CATEGORIES[post.category] || { label: post.category, color: 'navy', icon: 'ti-news' };
  const hasFeatured = !!(post.photos && post.photos.length > 0);
  const featuredSrc = hasFeatured ? post.photos[0].src : null;

  return `
    <article class="pl-item ${hasFeatured ? 'pl-item--featured' : 'pl-item--text'}" data-post-id="${post.id}">
      <button class="pl-head" data-toggle-post="${post.id}" aria-expanded="false">
        ${hasFeatured
          ? `<div class="pl-card-image"><img src="${plEscapeHtml(featuredSrc)}" alt="" loading="lazy"></div>`
          : `<div class="pl-card-accent pl-card-accent--${cat.color}"><i class="ti ${cat.icon}" aria-hidden="true"></i></div>`
        }
        <div class="pl-head-main">
          <div class="pl-head-top">
            <span class="pl-badge pl-badge--${cat.color}">${plEscapeHtml(cat.label)}</span>
            <span class="pl-date">${plEscapeHtml(post.date)}</span>
          </div>
          <div class="pl-title">${plEscapeHtml(post.title)}</div>
          <div class="pl-excerpt">${plEscapeHtml(post.excerpt)}</div>
        </div>
        <i class="ti ti-chevron-down pl-chevron" aria-hidden="true"></i>
      </button>
      <div class="pl-body">
        <div class="pl-body-inner">
          ${post.author ? `<div class="pl-author">${plEscapeHtml(post.author)}</div>` : ''}
          <div class="pl-text">${plFormatBody(post.body)}</div>
          ${plRenderGallery(post.photos)}
        </div>
      </div>
    </article>
  `;
}

// ---- Full render ----

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

  // Restore whichever post was open before a re-render (e.g. a
  // window resize that changed the column count), no animation needed.
  if (plOpenPostId) {
    const btn = document.querySelector(`[data-toggle-post="${plOpenPostId}"]`);
    const item = document.querySelector(`[data-post-id="${plOpenPostId}"]`);
    if (btn && item) {
      btn.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      const body = item.querySelector('.pl-body');
      if (body) body.classList.add('is-open');
    } else {
      plOpenPostId = null;
    }
  }
}

function attachParishLifeHandlers() {
  document.querySelectorAll('[data-toggle-post]').forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();

      const postId = btn.dataset.togglePost;
      const item = document.querySelector(`[data-post-id="${postId}"]`);
      if (!item) return;

      const isCurrentlyOpen = btn.classList.contains('open');
      const willOpen = !isCurrentlyOpen;

      // Hard scroll lock: pin the body in place with position:fixed for
      // the duration of the DOM mutation, then release it — same
      // technique used on the Get Involved page so the page never jumps.
      const lockedScrollY = window.scrollY;
      const bodyEl = document.body;
      bodyEl.style.position = 'fixed';
      bodyEl.style.top = `-${lockedScrollY}px`;
      bodyEl.style.left = '0';
      bodyEl.style.right = '0';

      if (willOpen) {
        // Only one card open at a time, across the whole grid.
        document.querySelectorAll('.pl-head.open').forEach((openBtn) => {
          if (openBtn !== btn) {
            openBtn.classList.remove('open');
            openBtn.setAttribute('aria-expanded', 'false');
            const otherBody = openBtn.closest('.pl-item')?.querySelector('.pl-body');
            if (otherBody) otherBody.classList.remove('is-open');
          }
        });
      }

      btn.classList.toggle('open', willOpen);
      btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
      const body = item.querySelector('.pl-body');
      if (body) body.classList.toggle('is-open', willOpen);

      plOpenPostId = willOpen ? postId : null;

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
