// ============================================
// SSPP Parish Life page
// Renders PARISH_LIFE_POSTS (js/parish-life-data.js) as a chronological
// feed of cards that expand in place, accordion-style (only one open
// at a time) — same interaction pattern and scroll-lock technique as
// the Get Involved ministries directory.
// ============================================

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

function plRenderPhotos(photos) {
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

function renderParishLifeFeed() {
  const root = document.getElementById('parishLifeFeed');
  if (!root) return;

  const html = PARISH_LIFE_POSTS.map((post) => {
    const cat = PARISH_LIFE_CATEGORIES[post.category] || { label: post.category, color: 'navy' };

    return `
      <article class="pl-item" data-post-id="${post.id}">
        <button class="pl-head" data-toggle-post="${post.id}" aria-expanded="false">
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
            ${plRenderPhotos(post.photos)}
          </div>
        </div>
      </article>
    `;
  }).join('');

  root.innerHTML = html || `
    <div class="no-results">
      <i class="ti ti-mood-empty" aria-hidden="true"></i>
      <p>Nothing posted yet — check back soon.</p>
    </div>
  `;

  attachParishLifeHandlers();
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
        // Only one post open at a time.
        document.querySelectorAll('.pl-head.open').forEach((openBtn) => {
          if (openBtn !== btn) {
            openBtn.classList.remove('open');
            openBtn.setAttribute('aria-expanded', 'false');
            const otherBody = openBtn.parentElement.querySelector('.pl-body');
            if (otherBody) otherBody.classList.remove('is-open');
          }
        });
      }

      btn.classList.toggle('open', willOpen);
      btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
      const body = item.querySelector('.pl-body');
      if (body) body.classList.toggle('is-open', willOpen);

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

document.addEventListener('DOMContentLoaded', () => {
  renderParishLifeFeed();
});
