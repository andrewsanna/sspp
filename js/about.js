// js/about.js
// About page: parish history "read more" toggle + clergy accordion,
// reusing the acc-item / acc-head / acc-body pattern from Get Involved.

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

let openClergyId = null;

function renderClergyAccordion() {
  const root = document.getElementById('clergyAccordion');
  if (!root) return;

  root.innerHTML = CLERGY.map((person) => {
    const isOpen = openClergyId === person.id;
    const bioParagraphs = person.bio
      .split('\n\n')
      .map((p) => `<p>${escapeHtml(p)}</p>`)
      .join('');

    return `
      <div class="acc-item" data-clergy-id="${person.id}">
        <button class="acc-head ${isOpen ? 'open' : ''}" data-toggle-clergy="${person.id}" aria-expanded="${isOpen}">
          <div class="clergy-head-photo">
            <img src="${person.photo}" alt="${escapeHtml(person.name)}" loading="lazy" />
          </div>
          <div class="acc-head-text">
            <div class="acc-title">${escapeHtml(person.name)}</div>
            <div class="acc-blurb">${escapeHtml(person.role)} — ${escapeHtml(person.summary)}</div>
          </div>
          <div class="acc-meta">
            <i class="ti ti-chevron-down acc-chevron" aria-hidden="true"></i>
          </div>
        </button>
        <div class="acc-body ${isOpen ? 'is-open' : ''}">
          <div class="clergy-bio">
            ${bioParagraphs}
            <a href="mailto:${person.email}" class="clergy-email">
              <i class="ti ti-mail" aria-hidden="true"></i> ${person.email}
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');

  attachClergyAccordionHandlers();
}

function attachClergyAccordionHandlers() {
  document.querySelectorAll('[data-toggle-clergy]').forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();

      const clergyId = btn.dataset.toggleClergy;
      const item = document.querySelector(`[data-clergy-id="${clergyId}"]`);
      if (!item) return;

      const isCurrentlyOpen = btn.classList.contains('open');
      const willOpen = !isCurrentlyOpen;

      // Same scroll-lock technique as get-involved.js: pin the body during
      // the DOM mutation so opening/closing never causes a scroll jump.
      const lockedScrollY = window.scrollY;
      const bodyEl = document.body;
      bodyEl.style.position = 'fixed';
      bodyEl.style.top = `-${lockedScrollY}px`;
      bodyEl.style.left = '0';
      bodyEl.style.right = '0';

      if (willOpen) {
        document.querySelectorAll('#clergyAccordion .acc-head.open').forEach((openBtn) => {
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

      openClergyId = willOpen ? clergyId : null;

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

function initHistoryToggle() {
  const toggle = document.getElementById('historyToggle');
  const full = document.getElementById('historyFull');
  if (!toggle || !full) return;

  toggle.addEventListener('click', () => {
    const willOpen = !toggle.classList.contains('open');
    toggle.classList.toggle('open', willOpen);
    toggle.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    full.classList.toggle('is-open', willOpen);
    toggle.querySelector('span').textContent = willOpen
      ? 'Show less'
      : 'Read the full parish history';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderClergyAccordion();
  initHistoryToggle();
});
