// js/seasonal/holy-week.js
// Renders hero, dates band, lent weeks, holy week days, pascha, pentecost, resources
// from holy-week-data.js

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function renderHero() {
  const src = document.getElementById('hw-hero-video-src');
  const video = document.getElementById('hw-hero-video');
  if (src && HW_EVENT.heroVideoUrl) {
    src.src = HW_EVENT.heroVideoUrl;
    if (video) video.load();
  }
  if (video && HW_EVENT.heroPosterUrl) {
    video.setAttribute('poster', HW_EVENT.heroPosterUrl);
  }

  const subtitle = document.getElementById('hw-hero-subtitle');
  if (subtitle) {
    subtitle.textContent = `Great Lent begins ${HW_EVENT.greatLentStart.label} · Pascha is ${HW_EVENT.paschaDate.label} · Pentecost is ${HW_EVENT.pentecostDate.label}`;
  }
}

function renderDetailsBand() {
  const root = document.getElementById('hw-details-band');
  if (!root) return;
  root.innerHTML = `
    <div class="hw-detail-item">
      <div class="hw-detail-item__label">Great Lent Begins</div>
      <div class="hw-detail-item__value">${escapeHtml(HW_EVENT.greatLentStart.label)}</div>
    </div>
    <div class="hw-detail-item">
      <div class="hw-detail-item__label">Pascha</div>
      <div class="hw-detail-item__value">${escapeHtml(HW_EVENT.paschaDate.label)}</div>
    </div>
    <div class="hw-detail-item">
      <div class="hw-detail-item__label">Pentecost</div>
      <div class="hw-detail-item__value">${escapeHtml(HW_EVENT.pentecostDate.label)}</div>
    </div>
    <div class="hw-detail-item">
      <div class="hw-detail-item__label">Location</div>
      <div class="hw-detail-item__value"><a href="${HW_EVENT.address.mapUrl}" target="_blank" rel="noopener noreferrer">${escapeHtml(HW_EVENT.address.line)}</a></div>
    </div>
  `;
}

function renderLearnMore(url) {
  if (!url || url === '#') return '';
  return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="hw-learn-more">Read More <i class="ti ti-arrow-right" aria-hidden="true"></i></a>`;
}

function renderLentWeeks() {
  const root = document.getElementById('hw-lent-weeks');
  if (!root) return;
  root.innerHTML = HW_LENT_WEEKS.map((week, i) => `
    <div class="acc-item">
      <button class="acc-head" data-acc-toggle="lent-${i}" aria-expanded="false">
        <div class="acc-head-text">
          <div class="acc-title"><i class="ti ${escapeHtml(week.icon)}" aria-hidden="true"></i> ${escapeHtml(week.name)}</div>
          <div class="acc-blurb">${escapeHtml(week.blurb)}</div>
        </div>
        <div class="acc-meta">
          <span class="acc-count">${escapeHtml(week.dateLabel)}</span>
          <i class="ti ti-chevron-down acc-chevron" aria-hidden="true"></i>
        </div>
      </button>
      <div class="acc-body" id="lent-${i}">
        <div class="hw-acc-body-inner">
          <img class="hw-lent-icon-image" src="${week.imageUrl}" alt="Icon of ${escapeHtml(week.name)}" loading="lazy">
          <p>${escapeHtml(week.description)}</p>
          ${renderLearnMore(week.learnMoreUrl)}
        </div>
      </div>
    </div>
  `).join('');
  attachAccordionToggles(root);
}

function attachAccordionToggles(root) {
  root.querySelectorAll('.acc-head').forEach((btn) => {
    btn.addEventListener('click', () => {
      const body = document.getElementById(btn.dataset.accToggle);
      const isOpen = btn.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));
      if (body) body.classList.toggle('is-open', isOpen);
    });
  });
}

function getSmartColumnCount(count) {
  if (count % 4 === 0) return 4;
  if (count % 3 === 0) return 3;
  if (count % 2 === 0) return 2;
  return 3; // odd/prime counts (e.g. 5) fall back to 3 -- last row centers itself
}

function renderServiceList(services) {
  if (!services || !services.length) return '';
  return `
    <div class="hw-service-list">
      ${services.map((s) => `
        <div class="hw-service-item">
          <span class="hw-service-time">${escapeHtml(s.time)}</span>
          <span class="hw-service-name">${escapeHtml(s.name)}</span>
          ${s.description ? `<span class="hw-service-desc">${escapeHtml(s.description)}</span>` : ''}
        </div>
      `).join('')}
    </div>
  `;
}

function renderHolyWeekDays() {
  const root = document.getElementById('hw-holy-week-days');
  if (!root) return;
  root.innerHTML = HW_HOLY_WEEK_DAYS.map((day, i) => `
    <div class="hw-hw-row${i % 2 === 1 ? ' is-reverse' : ''}">
      <div class="hw-hw-image">
        <img src="${day.imageUrl}" alt="Icon of ${escapeHtml(day.name)}" loading="lazy">
        <span class="hw-hw-badge"><i class="ti ${escapeHtml(day.icon)}" aria-hidden="true"></i></span>
      </div>
      <div class="hw-hw-content">
        <span class="hw-hw-date">${escapeHtml(day.dateLabel)}</span>
        <h3>${escapeHtml(day.name)}</h3>
        <p class="hw-hw-theme">${escapeHtml(day.theme)}</p>
        <p class="hw-hw-desc">${escapeHtml(day.description)}</p>
        ${renderServiceList(day.services)}
        ${renderLearnMore(day.learnMoreUrl)}
      </div>
    </div>
  `).join('');
}

function renderPascha() {
  const root = document.getElementById('hw-pascha-content');
  if (!root) return;
  root.innerHTML = `
    <div class="hw-pascha-grid">
      <div class="hw-pascha-image">
        <img src="${HW_PASCHA.imageUrl}" alt="Icon of the Resurrection" loading="lazy">
      </div>
      <div class="hw-pascha-text">
        <p class="hw-pascha-desc">${escapeHtml(HW_PASCHA.description)}</p>
        ${renderServiceList(HW_PASCHA.services)}
        ${renderLearnMore(HW_PASCHA.learnMoreUrl)}
      </div>
    </div>
  `;
}

function renderPentecostSeason() {
  const root = document.getElementById('hw-pentecost-cards');
  if (!root) return;
  root.style.setProperty('--hw-cols', getSmartColumnCount(HW_PENTECOST_SEASON.length));
  root.innerHTML = HW_PENTECOST_SEASON.map((item) => `
    <div class="hw-pentecost-card">
      <div class="hw-pentecost-icon"><i class="ti ${escapeHtml(item.icon)}" aria-hidden="true"></i></div>
      <h4>${escapeHtml(item.name)}</h4>
      <span class="hw-pentecost-date">${escapeHtml(item.dateLabel)}</span>
      <p>${escapeHtml(item.description)}</p>
      ${renderLearnMore(item.learnMoreUrl)}
    </div>
  `).join('');
}

function renderWatch() {
  const link = document.getElementById('hw-livestream-link');
  if (link) link.href = HW_EVENT.livestreamUrl;
}

function renderResources() {
  const root = document.getElementById('hw-resources');
  if (!root) return;
  root.innerHTML = HW_RESOURCES.map((r) => `
    <a href="${r.url}" target="_blank" rel="noopener noreferrer" class="hw-resource-card">
      <span>${escapeHtml(r.name)}</span>
      <i class="ti ti-arrow-right" aria-hidden="true"></i>
    </a>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderHero();
  renderDetailsBand();
  renderLentWeeks();
  renderHolyWeekDays();
  renderPascha();
  renderPentecostSeason();
  renderWatch();
  renderResources();
});
