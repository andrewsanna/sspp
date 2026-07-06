// js/about.js
// About page: parish history "read more" toggle + staff profile list.
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
function renderStaffList() {
  const root = document.getElementById('staffList');
  if (!root) return;
  root.innerHTML = CLERGY.map((person, index) => {
    const bioParagraphs = person.bio
      .split('\n\n')
      .map((p) => `<p>${escapeHtml(p)}</p>`)
      .join('');
    const reversed = index % 2 === 1 ? 'is-reversed' : '';
    const featured = person.featured ? 'is-featured' : '';
    const badgeLabel = person.type === 'clergy' ? 'Clergy' : 'Staff';
    const badgeClass = person.type === 'clergy' ? 'is-clergy' : 'is-staff';

    return `
      <div class="ab-staff-row ${reversed} ${featured}">
        <div class="ab-staff-photo">
          <img src="${person.photo}" alt="${escapeHtml(person.name)}" loading="lazy" />
        </div>
        <div class="ab-staff-text">
          <div class="ab-staff-meta">
            <span class="ab-staff-badge ${badgeClass}">${badgeLabel}</span>
            <span class="ab-staff-role">${escapeHtml(person.role)}</span>
          </div>
          <h3 class="ab-staff-name">${escapeHtml(person.name)}</h3>
          <p class="ab-staff-summary">${escapeHtml(person.summary)}</p>
          <div class="ab-staff-bio">${bioParagraphs}</div>
          <a href="mailto:${person.email}" class="clergy-email">
            <i class="ti ti-mail" aria-hidden="true"></i> ${person.email}
          </a>
        </div>
      </div>
    `;
  }).join('');
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
  renderStaffList();
  initHistoryToggle();
});
