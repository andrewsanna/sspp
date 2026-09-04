// js/seasonal/greek-fest.js
// Greek Fest page: renders hero, menu, sponsors, logistics from greek-fest-data.js

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function formatMenuPrice(item) {
  if (item.priceOptions) {
    return item.priceOptions.map((o) => `${o.qty} for $${o.price}`).join(' · ');
  }
  return item.price != null ? `$${item.price}` : '';
}

function renderHero() {
  const datesRoot = document.getElementById('gf-hero-dates');
  if (datesRoot) {
    datesRoot.innerHTML = GF_EVENT.dates
      .map(
        (d) => `
      <div class="gf-date-pill">
        <div class="gf-date-pill__day">${escapeHtml(d.label)}</div>
        <div class="gf-date-pill__hours">${escapeHtml(d.hours)}</div>
      </div>
    `
      )
      .join('');
  }

  const addressRoot = document.getElementById('gf-hero-address');
  if (addressRoot) {
    addressRoot.innerHTML = `<a href="${GF_EVENT.address.mapUrl}" target="_blank" rel="noopener noreferrer">${escapeHtml(
      GF_EVENT.address.line
    )}</a> · ${escapeHtml(GF_EVENT.admission)}`;
  }

  const volunteerLink = document.getElementById('gf-cta-volunteer');
  if (volunteerLink) volunteerLink.href = GF_EVENT.ctas.volunteerUrl;

  document.querySelectorAll('[id^="gf-cta-sponsor"]').forEach((el) => {
    el.href = GF_EVENT.ctas.sponsorUrl;
  });
}

function renderDetailsBand() {
  const root = document.getElementById('gf-details-band');
  if (!root) return;
  root.innerHTML = `
    <div class="gf-detail-item">
      <div class="gf-detail-item__label">Admission</div>
      <div class="gf-detail-item__value">${escapeHtml(GF_EVENT.admission)}</div>
    </div>
    <div class="gf-detail-item">
      <div class="gf-detail-item__label">Location</div>
      <div class="gf-detail-item__value"><a href="${GF_EVENT.address.mapUrl}" target="_blank" rel="noopener noreferrer">${escapeHtml(
    GF_EVENT.address.line
  )}</a></div>
    </div>
    <div class="gf-detail-item">
      <div class="gf-detail-item__label">Free Parking</div>
      <div class="gf-detail-item__value"><a href="${GF_EVENT.parking.free.mapUrl}" target="_blank" rel="noopener noreferrer">${escapeHtml(
    GF_EVENT.parking.free.location
  )} + Shuttle</a></div>
    </div>
    <div class="gf-detail-item">
      <div class="gf-detail-item__label">Payment</div>
      <div class="gf-detail-item__value">${escapeHtml(GF_EVENT.paymentNote)}</div>
    </div>
  `;
}

function renderMenuItem(item) {
  return `
    <div class="gf-menu-item">
      <div>
        <h4>${escapeHtml(item.name)}</h4>
        ${item.description ? `<p>${escapeHtml(item.description)}</p>` : ''}
      </div>
      <div class="gf-menu-price">${escapeHtml(formatMenuPrice(item))}</div>
    </div>
  `;
}

function renderMenuPanel(category, isActive) {
  return `
    <div class="gf-menu-panel${isActive ? ' is-active' : ''}" id="gf-panel-${category.id}">
      <div class="gf-menu-grid">
        ${category.items.map(renderMenuItem).join('')}
      </div>
    </div>
  `;
}

function renderMenu() {
  const tabsRoot = document.getElementById('gf-menu-tabs');
  const panelsRoot = document.getElementById('gf-menu-panels');
  if (!tabsRoot || !panelsRoot) return;

  tabsRoot.innerHTML = GF_MENU_CATEGORIES.map(
    (cat, i) => `<button class="gf-menu-tab${i === 0 ? ' is-active' : ''}" data-tab="${cat.id}">${escapeHtml(cat.label)}</button>`
  ).join('');

  panelsRoot.innerHTML = GF_MENU_CATEGORIES.map((cat, i) => renderMenuPanel(cat, i === 0)).join('');

  attachMenuTabToggles();
}

function attachMenuTabToggles() {
  const tabsRoot = document.getElementById('gf-menu-tabs');
  const panelsRoot = document.getElementById('gf-menu-panels');
  if (!tabsRoot || !panelsRoot) return;

  tabsRoot.querySelectorAll('.gf-menu-tab').forEach((btn) => {
    btn.addEventListener('click', () => {
      tabsRoot.querySelectorAll('.gf-menu-tab').forEach((t) => t.classList.remove('is-active'));
      panelsRoot.querySelectorAll('.gf-menu-panel').forEach((p) => p.classList.remove('is-active'));
      btn.classList.add('is-active');
      const panel = document.getElementById(`gf-panel-${btn.dataset.tab}`);
      if (panel) panel.classList.add('is-active');
    });
  });
}

function renderChurchTours() {
  const root = document.getElementById('gf-tours-times');
  if (!root) return;
  const timeBadges = GF_CHURCH_TOURS.times.map((t) => `<span class="gf-time-badge">${escapeHtml(t)}</span>`).join('');
  root.innerHTML = `${timeBadges}<span class="gf-time-badge">${escapeHtml(GF_CHURCH_TOURS.duration)}</span>`;
}

function renderSponsorCard(sponsor) {
  return `
    <div class="gf-sponsor-card">
      ${sponsor.logoUrl ? `<img src="${sponsor.logoUrl}" alt="${escapeHtml(sponsor.name)}" loading="lazy" />` : escapeHtml(sponsor.name)}
    </div>
  `;
}

function renderSponsorTier(tier) {
  const inTier = GF_SPONSORS.filter((s) => s.tier === tier.id);
  if (!inTier.length) return '';
  return `
    <div class="gf-sponsor-tier">
      <span class="gf-sponsor-tier__label">${escapeHtml(tier.label)}</span>
      <div class="gf-sponsor-row">${inTier.map(renderSponsorCard).join('')}</div>
    </div>
  `;
}

function renderSponsors() {
  const sponsorsRoot = document.getElementById('gf-sponsors');
  if (sponsorsRoot) {
    sponsorsRoot.innerHTML = GF_SPONSOR_TIERS.map(renderSponsorTier).join('');
  }

  const partnersRoot = document.getElementById('gf-partners');
  if (partnersRoot) {
    partnersRoot.innerHTML = GF_PARTNERS.map(renderSponsorCard).join('');
  }
}

function renderLogistics() {
  const root = document.getElementById('gf-logistics');
  if (!root) return;
  const hoursLines = GF_EVENT.dates.map((d) => `${escapeHtml(d.label)} · ${escapeHtml(d.hours)}`).join('<br>');
  root.innerHTML = `
    <div class="gf-logistics-card">
      <h4>Location</h4>
      <p>${escapeHtml(GF_EVENT.subtitle)}<br><a href="${GF_EVENT.address.mapUrl}" target="_blank" rel="noopener noreferrer">${escapeHtml(
    GF_EVENT.address.line
  )}</a></p>
    </div>
    <div class="gf-logistics-card">
      <h4>Valet Parking</h4>
      <p>${escapeHtml(GF_EVENT.parking.valet.cost)} — ${escapeHtml(GF_EVENT.parking.valet.note)}</p>
    </div>
    <div class="gf-logistics-card">
      <h4>Free Parking + Shuttle</h4>
      <p>Free parking at <a href="${GF_EVENT.parking.free.mapUrl}" target="_blank" rel="noopener noreferrer">${escapeHtml(
    GF_EVENT.parking.free.location
  )}</a> with a complimentary shuttle.</p>
    </div>
    <div class="gf-logistics-card">
      <h4>Payment</h4>
      <p>${escapeHtml(GF_EVENT.paymentNote)}.</p>
    </div>
    <div class="gf-logistics-card">
      <h4>Admission</h4>
      <p>${escapeHtml(GF_EVENT.admission)}. Supports ${escapeHtml(GF_EVENT.beneficiaries.join(' & '))}.</p>
    </div>
    <div class="gf-logistics-card">
      <h4>Hours</h4>
      <p>${hoursLines}</p>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  renderHero();
  renderDetailsBand();
  renderMenu();
  renderChurchTours();
  renderSponsors();
  renderLogistics();
});
