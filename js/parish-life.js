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

  if
