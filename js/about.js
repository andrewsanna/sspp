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
    const bioId = `staffBio-${person.id}`;

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

          <button class="ab-staff-toggle" data-toggle-staff="${bioId}" aria-expanded="false" aria-controls="${bioId}">
            <span>Read full bio</span>
            <i class="ti ti-chevron-down" aria-hidden="true"></i>
          </button>
          <div class="ab-staff-bio" id="${bioId}">${bioParagraphs}</div>

          <a href="mailto:${person.email}" class="btn btn-outline-gold ab-staff-contact-btn">
            <i class="ti ti-mail" aria-hidden="true"></i> Contact ${escapeHtml(person.shortname)}
          </a>
        </div>
      </div>
    `;
  }).join('');

  attachStaffBioToggles();
}

function attachStaffBioToggles() {
  document.querySelectorAll('[data-toggle-staff]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const bioId = btn.dataset.toggleStaff;
      const bio = document.getElementById(bioId);
      if (!bio) return;

      const willOpen = !btn.classList.contains('open');
      btn.classList.toggle('open', willOpen);
      btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
      bio.classList.toggle('is-open', willOpen);
      btn.querySelector('span').textContent = willOpen ? 'Show less' : 'Read full bio';
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
  renderStaffList();
  initHistoryToggle();
});
