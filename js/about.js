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

  const featured = CLERGY.find((p) => p.featured);
  const rest = CLERGY.filter((p) => !p.featured);

  const featuredHtml = featured ? renderFeaturedCard(featured) : '';
  const gridHtml = `<div class="ab-staff-grid">${rest.map(renderStaffCard).join('')}</div>`;

  root.innerHTML = featuredHtml + gridHtml;
  attachStaffBioToggles();
}

function renderBadgeAndRole(person) {
  const badgeLabel = person.type === 'clergy' ? 'Clergy' : 'Staff';
  const badgeClass = person.type === 'clergy' ? 'is-clergy' : 'is-staff';
  return `
    <div class="ab-staff-meta">
      <span class="ab-staff-badge ${badgeClass}">${badgeLabel}</span>
      <span class="ab-staff-role">${escapeHtml(person.role)}</span>
    </div>
  `;
}

function renderBioToggleAndButton(person) {
  const bioId = `staffBio-${person.id}`;
  const bioParagraphs = person.bio
    .split('\n\n')
    .map((p) => `<p>${escapeHtml(p)}</p>`)
    .join('');

  return `
    <button class="ab-staff-toggle" data-toggle-staff="${bioId}" aria-expanded="false" aria-controls="${bioId}">
      <span>Read full bio</span>
      <i class="ti ti-chevron-down" aria-hidden="true"></i>
    </button>
    <div class="ab-staff-bio" id="${bioId}">${bioParagraphs}</div>
    <a href="mailto:${person.email}" class="btn btn-outline-gold ab-staff-contact-btn">
      <i class="ti ti-mail" aria-hidden="true"></i> Contact ${escapeHtml(person.shortname)}
    </a>
  `;
}

function renderFeaturedCard(person) {
  return `
    <div class="ab-staff-featured">
      <div class="ab-staff-featured-photo">
        <img src="${person.photo}" alt="${escapeHtml(person.name)}" loading="lazy" />
      </div>
      <div class="ab-staff-featured-text">
        ${renderBadgeAndRole(person)}
        <h3 class="ab-staff-name">${escapeHtml(person.name)}</h3>
        <p class="ab-staff-summary">${escapeHtml(person.summary)}</p>
        ${renderBioToggleAndButton(person)}
      </div>
    </div>
  `;
}

function renderStaffCard(person) {
  return `
    <div class="ab-staff-card">
      <div class="ab-staff-card-photo">
        <img src="${person.photo}" alt="${escapeHtml(person.name)}" loading="lazy" />
      </div>
      <div class="ab-staff-card-text">
        ${renderBadgeAndRole(person)}
        <h3 class="ab-staff-name">${escapeHtml(person.name)}</h3>
        <p class="ab-staff-summary">${escapeHtml(person.summary)}</p>
        ${renderBioToggleAndButton(person)}
      </div>
    </div>
  `;
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
