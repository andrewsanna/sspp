// ============================================
// Learning Library page: renders LEARNING_LIBRARY (js/learning-library-data.js)
// into collapsible groups (shared .acc-* accordion) with a live title search.
//
// - Search matches link titles; groups without matches are hidden, groups
//   with matches open, and each shows its match count.
// - Clearing the search collapses everything again.
// - learning-library.html#sacraments (any group id) opens that group.
// ============================================

(function () {
  const root = document.getElementById('llGroups');
  const input = document.getElementById('llSearch');
  const status = document.getElementById('llStatus');
  if (!root || typeof LEARNING_LIBRARY === 'undefined') return;

  const TYPE_LABELS = { pdf: 'PDF', video: 'Video', website: 'Website', word: 'Word file' };

  const esc = (str) => {
    const d = document.createElement('div');
    d.textContent = str || '';
    return d.innerHTML;
  };
  const countText = (n) => n + (n === 1 ? ' item' : ' items');

  // ---- Build the groups ----
  root.innerHTML = LEARNING_LIBRARY_GROUPS.map((g) => {
    const links = LEARNING_LIBRARY.filter((l) => l.group === g.id);
    if (!links.length) return '';
    return `
      <div class="acc-item ll-group" id="${esc(g.id)}">
        <button type="button" class="acc-head" aria-expanded="false" aria-controls="ll-body-${esc(g.id)}">
          <span class="acc-head-text"><span class="acc-title">${esc(g.label)}</span></span>
          <span class="acc-meta">
            <span class="acc-count" data-total="${links.length}">${countText(links.length)}</span>
            <i class="ti ti-chevron-down acc-chevron" aria-hidden="true"></i>
          </span>
        </button>
        <div class="acc-body" id="ll-body-${esc(g.id)}">
          <ul class="ll-list">
            ${links.map((l) => `
              <li data-title="${esc(l.title.toLowerCase())}">
                <a class="ll-link" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.title)}</a>
                <span class="ll-tag">${esc(TYPE_LABELS[l.type] || l.type)}</span>
              </li>`).join('')}
          </ul>
        </div>
      </div>`;
  }).join('') + '<p class="ll-empty" id="llEmpty" hidden></p>';

  const groups = Array.from(root.querySelectorAll('.ll-group'));
  const empty = document.getElementById('llEmpty');

  function setOpen(group, open) {
    const head = group.querySelector('.acc-head');
    head.classList.toggle('open', open);
    head.setAttribute('aria-expanded', open);
    group.querySelector('.acc-body').classList.toggle('is-open', open);
  }

  groups.forEach((group) => {
    group.querySelector('.acc-head').addEventListener('click', () => {
      setOpen(group, !group.querySelector('.acc-head').classList.contains('open'));
    });
  });

  // ---- Search ----
  function search() {
    const query = input.value.trim().toLowerCase();
    let total = 0;
    groups.forEach((group) => {
      const items = Array.from(group.querySelectorAll('li'));
      const count = group.querySelector('.acc-count');
      if (!query) {
        items.forEach((li) => { li.hidden = false; });
        group.hidden = false;
        count.textContent = countText(Number(count.dataset.total));
        setOpen(group, false);
        return;
      }
      let matches = 0;
      items.forEach((li) => {
        const hit = li.dataset.title.includes(query);
        li.hidden = !hit;
        if (hit) matches++;
      });
      total += matches;
      group.hidden = matches === 0;
      count.textContent = countText(matches);
      setOpen(group, matches > 0);
    });

    if (!query) {
      status.textContent = '';
      empty.hidden = true;
    } else if (total === 0) {
      status.textContent = '';
      empty.textContent = `No documents match "${input.value.trim()}". Try a shorter word, or clear the search to browse by topic.`;
      empty.hidden = false;
    } else {
      status.textContent = `${total} ${total === 1 ? 'match' : 'matches'} for "${input.value.trim()}".`;
      empty.hidden = true;
    }
  }
  input.addEventListener('input', search);

  // ---- #group links from other pages open that group ----
  function openFromHash() {
    const group = window.location.hash && document.getElementById(window.location.hash.slice(1));
    if (!group || !group.classList.contains('ll-group')) return;
    setOpen(group, true);
    group.scrollIntoView();
  }
  openFromHash();
  window.addEventListener('hashchange', openFromHash);
})();
