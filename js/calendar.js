// ============================================
// SSPP Calendar page
//
// Pulls events from two Google Calendars:
//   1. MAIN_CALENDAR_ID    — routine services, all events shown in month grid
//   2. FEATURED_CALENDAR_ID — Events, fundraisers, special services.
//                             Powers the "Featured" card + "Coming Up" sidebar.
//
// SETUP REQUIRED before this works — see CALENDAR-SETUP.md
// ============================================

const GOOGLE_API_KEY = 'AIzaSyCNAL3x2J53-OgUuCqQLNRh1nh33xqDrEw';

// One entry per calendar. `featured: true` means events from that
// calendar also appear in the "Featured event" card and "Coming up"
// sidebar list — not just the month grid.
const CALENDARS = [
  {
    id: 'c_ru8ahosqp08ei7va3el5stneuc@group.calendar.google.com',
    category: 'liturgical',
    featured: false,
  },
  {
    id: 'c_3stt4mv6dkp8p6qdv8ku83fav8@group.calendar.google.com',
    category: 'youth', //goya, FLJ, YAL, athletics, greek dance, goyalumni, greek school, church school
    featured: false,
  },
  {
    id: '59943aebd742db92a7b197ae2fd895fe962e80537fc70217f55ba20013ccab0e@group.calendar.google.com',
    category: 'featured', //parish events
    featured: true,
  },
  {
    id: 'c_7k8pr3v1r9ni1mfbufnukb5oj4@group.calendar.google.com',
    category: 'philanthropy', // philoptochos, st. basil's, care for creation, prison outreach
    featured: false,
  },
  {
    id: 'c_tplbp18e1dohtl0ocvdg3b6q0g@group.calendar.google.com',
    category: 'agape',
    featured: false,
  },
  {
    id: 'c_q3kgtkmbhrsbtn5vt7urjddvjg@group.calendar.google.com',
    category: 'adult_faith', // coffee connection, bible study, st stephens mens group, catechism, occ
    featured: false,
  },

  // --- Not wired up yet — add the real calendar ID and uncomment ---
  // {
  //   id: 'YOUR_CALENDAR_ID_HERE',
  //   category: 'adult_activities', //athletics, dynamis, greek dance workshops
  //   featured: false,
  // },
  // {
  //   id: 'YOUR_CALENDAR_ID_HERE',
  //   category: 'support_groups', // grief support, divorce rebuilders, cancer support 
  //   featured: false,
  // },
  // {
  //   id: 'YOUR_CALENDAR_ID_HERE',
  //   category: 'ministries', //pc meetings, greek fest, comms, ETC
  //   featured: false,
  // },
];

const CATEGORY_LABELS = {
  liturgical: 'Liturgical',
  youth: 'Youth & Young Adults',
  featured: 'Events',
  philanthropy: 'Philanthropy',
  agape: 'Agape',
  adult_faith: 'Adult Faith & Learning',
  adult_activities: 'Adult Activities',
  support_groups: 'Support Groups',
  ministries: 'Ministries',
};

// Pill / legend colors per category — pulled from your list
const CATEGORY_COLORS = {
  liturgical: '#1F4E79',
  youth: '#2E7D32',
  featured: '#C9A227',
  philanthropy: '#7B3F98',
  agape: '#C96A23',
  adult_faith: '#0C447C',
  adult_activities: '#3A6FA5',
  support_groups: '#A8763E',
  ministries: '#4A7C6F',
};

const MONTHS_AHEAD = 3;
const COMING_UP_COUNT = 3;

const ACTION_LABELS = {
  INFO: { label: 'More Info', icon: 'ti-info-circle' },
  SIGNUP: { label: 'Sign Up', icon: 'ti-clipboard-check' },
  TICKETS: { label: 'Buy Tickets', icon: 'ti-ticket' },
  RSVP: { label: 'RSVP', icon: 'ti-calendar-check' },
};

// ============================================
// State
// ============================================
let allEvents = [];
let activeFilter = 'all';
let viewMode = 'month'; // 'month' | 'week'

// Anchor date used to derive the visible month (1st of month) or the
// visible week (Sun–Sat containing this date).
let anchorDate = new Date();
anchorDate.setHours(0, 0, 0, 0);

// ============================================
// Fetch helpers
// ============================================
function buildEventsUrl(calendarId, timeMin, timeMax) {
  const base = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`;
  const params = new URLSearchParams({
    key: GOOGLE_API_KEY,
    singleEvents: 'true',
    orderBy: 'startTime',
    timeMin: timeMin.toISOString(),
    timeMax: timeMax.toISOString(),
    maxResults: '250',
  });
  return `${base}?${params.toString()}`;
}

async function fetchCalendar(calendarConfig) {
  const timeMin = new Date();
  timeMin.setMonth(timeMin.getMonth() - 1);
  const timeMax = new Date();
  timeMax.setMonth(timeMax.getMonth() + MONTHS_AHEAD);

  const url = buildEventsUrl(calendarConfig.id, timeMin, timeMax);
  const res = await fetch(url);

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const message = body?.error?.message || `HTTP ${res.status}`;
    throw new Error(`${CATEGORY_LABELS[calendarConfig.category] || calendarConfig.category}: ${message}`);
  }

  const data = await res.json();
  return (data.items || []).map((raw) => normalizeEvent(raw, calendarConfig));
}

function parseGoogleDate(dateStr, isAllDay) {
  if (!dateStr) return null;
  if (isAllDay) {
    // "2026-06-14" — parse as LOCAL midnight, not UTC, to avoid off-by-one-day bugs
    const [y, m, d] = dateStr.split('-').map(Number);
    return new Date(y, m - 1, d);
  }
  return new Date(dateStr);
}

function normalizeEvent(raw, calendarConfig) {
  const isAllDay = !raw.start?.dateTime;
  const startRaw = raw.start?.dateTime || raw.start?.date;
  const endRaw = raw.end?.dateTime || raw.end?.date;

  // Google's all-day "end" date is exclusive (the day AFTER the event ends),
  // so subtract one day to get the actual last day of the event.
  let end = parseGoogleDate(endRaw, isAllDay);
  if (isAllDay && end) {
    end = new Date(end.getFullYear(), end.getMonth(), end.getDate() - 1);
  }

  return {
    id: raw.id,
    title: raw.summary || 'Untitled event',
    description: raw.description || '',
    location: raw.location || '',
    start: parseGoogleDate(startRaw, isAllDay),
    end,
    isAllDay,
    category: calendarConfig.category,
    isFeaturedCalendar: calendarConfig.featured,
    htmlLink: raw.htmlLink || '#',
  };
}

// ============================================
// Init
// ============================================
async function initCalendarPage() {
  const statusEl = document.getElementById('calStatus');

  if (GOOGLE_API_KEY === 'YOUR_API_KEY_HERE' || GOOGLE_API_KEY === 'PASTE_YOUR_KEY_HERE') {
    renderSetupNotice();
    return;
  }

  const unconfigured = CALENDARS.filter((c) => c.id.startsWith('YOUR_'));
  if (unconfigured.length > 0) {
    renderSetupNotice(`Missing calendar ID for: ${unconfigured.map((c) => CATEGORY_LABELS[c.category]).join(', ')}`);
    return;
  }

  try {
    const results = await Promise.all(CALENDARS.map(fetchCalendar));
    allEvents = results.flat();

    if (statusEl) statusEl.remove();

    renderFeaturedEvent();
    renderComingUp();
    renderMonthGrid();
    openEventFromUrl();
  } catch (err) {
    renderError(err.message);
  }
}

function renderSetupNotice(extra) {
  const statusEl = document.getElementById('calStatus');
  if (!statusEl) return;
  statusEl.className = 'cal-status is-error';
  statusEl.innerHTML = `
    <i class="ti ti-alert-triangle" aria-hidden="true"></i>
    <span>Calendar not connected yet — add your Google API key and calendar IDs in <code>js/calendar.js</code> to go live.${extra ? ' ' + escapeHtml(extra) : ''}</span>
  `;
}

function renderError(message) {
  const statusEl = document.getElementById('calStatus');
  if (!statusEl) return;
  statusEl.className = 'cal-status is-error';
  statusEl.innerHTML = `
    <i class="ti ti-alert-triangle" aria-hidden="true"></i>
    <span>Could not load the calendar (${escapeHtml(message)}). Double-check the API key and calendar IDs are correct and all calendars are public.</span>
  `;
}

// ============================================
// Featured event + Coming up — from any calendar flagged featured: true
// ============================================
function getFeaturedEvents() {
  return allEvents
    .filter((e) => e.isFeaturedCalendar && e.start && e.start.getTime() >= Date.now() - 86400000)
    .sort((a, b) => a.start - b.start);
}

// Shows up to 2 featured events side by side as compact cards.
const FEATURED_SLOT_COUNT = 2;

function renderFeaturedEvent() {
  const container = document.getElementById('featuredEventSlot');
  if (!container) return;

  const upcoming = getFeaturedEvents().slice(0, FEATURED_SLOT_COUNT);
  if (upcoming.length === 0) {
    container.innerHTML = '';
    return;
  }

  container.innerHTML = `
    <div class="featured-events-grid ${upcoming.length === 1 ? 'is-single' : ''}">
      ${upcoming.map((ev) => {
        const { cleanText } = parseEventActions(ev.description);
        return `
          <article class="featured-event-compact" data-event-id="${escapeHtml(ev.id)}">
            <div class="fe-top">
              <span class="featured-event-badge">Featured event</span>
              <span class="fe-date">${formatDateRange(ev.start, ev.end, ev.isAllDay)}</span>
            </div>
            <h2 class="featured-event-title">${escapeHtml(ev.title)}</h2>
            ${cleanText ? `<p class="featured-event-desc">${escapeHtml(truncate(cleanText, 120))}</p>` : ''}
            <div class="featured-event-meta">
              <span><i class="ti ti-clock" aria-hidden="true"></i> ${formatTimeRange(ev.start, ev.end, ev.isAllDay)}</span>
              ${ev.location ? `<span><i class="ti ti-map-pin" aria-hidden="true"></i> ${escapeHtml(ev.location)}</span>` : ''}
            </div>
          </article>
        `;
      }).join('')}
    </div>
  `;

  container.querySelectorAll('.featured-event-compact').forEach((card) => {
    card.addEventListener('click', () => {
      const id = card.dataset.eventId;
      const event = upcoming.find((e) => e.id === id);
      if (event) openEventModal(event);
    });
  });
}

function renderComingUp() {
  const container = document.getElementById('comingUpSlot');
  if (!container) return;

  const upcoming = getFeaturedEvents().slice(FEATURED_SLOT_COUNT, FEATURED_SLOT_COUNT + COMING_UP_COUNT);

  if (upcoming.length === 0) {
    container.innerHTML = `<p style="font-size:0.8rem;color:var(--mt);">No other featured events scheduled yet.</p>`;
    return;
  }

  container.innerHTML = upcoming.map((ev, i) => `
    <div class="up-event" data-up-index="${i}" style="cursor:pointer;">
      <div class="up-event-img"><i class="ti ti-calendar-event" aria-hidden="true"></i></div>
      <div>
        <div class="up-event-date">${formatShortDate(ev.start)}</div>
        <div class="up-event-title">${escapeHtml(ev.title)}</div>
        <div class="up-event-meta">${formatTimeRange(ev.start, ev.end, ev.isAllDay)}</div>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.up-event').forEach((el) => {
    el.addEventListener('click', () => {
      const idx = parseInt(el.dataset.upIndex, 10);
      openEventModal(upcoming[idx]);
    });
  });
}

// ============================================
// Calendar grid — Month or Week view, filterable by category
// ============================================
function startOfWeek(date) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  d.setDate(d.getDate() - d.getDay()); // back up to Sunday
  return d;
}

function getVisibleCells() {
  if (viewMode === 'week') {
    const weekStart = startOfWeek(anchorDate);
    const cells = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + i);
      cells.push({ day: date.getDate(), otherMonth: false, date });
    }
    return cells;
  }

  const year = anchorDate.getFullYear();
  const month = anchorDate.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  const startDow = firstOfMonth.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells = [];
  for (let i = startDow - 1; i >= 0; i--) {
    cells.push({ day: daysInPrevMonth - i, otherMonth: true, date: new Date(year, month - 1, daysInPrevMonth - i) });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, otherMonth: false, date: new Date(year, month, d) });
  }
  let trailing = 1;
  while (cells.length % 7 !== 0) {
    cells.push({ day: trailing, otherMonth: true, date: new Date(year, month + 1, trailing) });
    trailing++;
  }
  return cells;
}

function updateCalendarLabel() {
  const label = document.getElementById('calMonthLabel');
  if (!label) return;

  if (viewMode === 'week') {
    const weekStart = startOfWeek(anchorDate);
    const weekEnd = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 6);
    const sameMonth = weekStart.getMonth() === weekEnd.getMonth();
    const startStr = weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const endStr = weekEnd.toLocaleDateString('en-US', sameMonth ? { day: 'numeric', year: 'numeric' } : { month: 'short', day: 'numeric', year: 'numeric' });
    label.textContent = `${startStr} – ${endStr}`;
  } else {
    label.textContent = anchorDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }
}

function renderMonthGrid() {
  const grid = document.getElementById('dayGrid');
  if (!grid) return;

  updateCalendarLabel();

  grid.classList.toggle('view-week', viewMode === 'week');
  grid.classList.toggle('view-month', viewMode === 'month');

  const cells = getVisibleCells();
  const today = new Date();
  const filtered = activeFilter === 'all'
    ? allEvents
    : allEvents.filter((e) => e.category === activeFilter);

  // Week view has a lot more vertical room per day, so show more pills.
  const MAX_VISIBLE = viewMode === 'week' ? 8 : 3;

  grid.innerHTML = cells.map((cell) => {
    const dayEvents = filtered.filter((e) => eventCoversDay(e, cell.date));
    const isToday = isSameDay(cell.date, today);

    const visibleEvents = dayEvents.slice(0, MAX_VISIBLE);
    const extraCount = dayEvents.length - visibleEvents.length;

    return `
      <div class="day-cell ${cell.otherMonth ? 'other-month' : ''} ${isToday ? 'today' : ''}">
        <div class="day-num">${viewMode === 'week' ? cell.date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' }) : cell.day}</div>
        ${visibleEvents.map((e) => {
          const timeLabel = formatPillTime(e.start, e.isAllDay);
          const fullTitle = `${timeLabel ? timeLabel + ' — ' : ''}${e.title}`;
          return `
            <div class="ev-pill" data-event-id="${escapeHtml(e.id)}" title="${escapeHtml(fullTitle)}" style="background:${categoryBg(e.category)}; color:${categoryText(e.category)};">
              ${timeLabel ? `<span class="ev-pill-time">${escapeHtml(timeLabel)}</span> ` : ''}${escapeHtml(truncate(e.title, viewMode === 'week' ? 26 : 16))}
            </div>
          `;
        }).join('')}
        ${extraCount > 0 ? `<div class="day-more">+${extraCount} more</div>` : ''}
      </div>
    `;
  }).join('');

  grid.querySelectorAll('.ev-pill').forEach((pillEl) => {
    pillEl.addEventListener('click', () => {
      const id = pillEl.dataset.eventId;
      const event = allEvents.find((e) => e.id === id);
      if (event) openEventModal(event);
    });
  });
}

// Multi-day events (like a 3-day festival) need to show on every day they
// span, not just the start day.
function eventCoversDay(event, date) {
  if (!event.start) return false;
  const end = event.end || event.start;
  const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const dayEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
  return event.start <= dayEnd && end >= dayStart;
}

// Lighten a hex color for pill backgrounds, keep the base color for text
function categoryBg(category) {
  const hex = CATEGORY_COLORS[category] || CATEGORY_COLORS.other;
  return hexToRgba(hex, 0.14);
}

function categoryText(category) {
  return CATEGORY_COLORS[category] || CATEGORY_COLORS.other;
}

function hexToRgba(hex, alpha) {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// ============================================
// Event detail modal
// ============================================
function parseEventActions(description) {
  if (!description) return { cleanText: '', actions: [] };

  const lines = description.split('\n');
  const actions = [];
  const textLines = [];

  lines.forEach((line) => {
    const match = line.match(/^\s*(INFO|SIGNUP|TICKETS|RSVP)\s*:\s*(\S+)/i);
    if (match) {
      const key = match[1].toUpperCase();
      const url = match[2];
      if (ACTION_LABELS[key]) {
        actions.push({ key, url, ...ACTION_LABELS[key] });
      }
    } else if (line.trim()) {
      textLines.push(line);
    }
  });

  return { cleanText: textLines.join(' ').trim(), actions };
}

function openEventFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const eventId = params.get('event');
  if (!eventId) return;
  const event = allEvents.find((e) => e.id === eventId);
  if (event) openEventModal(event);
}

function openEventModal(event) {
  const overlay = document.getElementById('eventModalOverlay');
  const categoryEl = document.getElementById('eventModalCategory');
  const titleEl = document.getElementById('eventModalTitle');
  const metaEl = document.getElementById('eventModalMeta');
  const descEl = document.getElementById('eventModalDesc');
  const actionsEl = document.getElementById('eventModalActions');

  const { cleanText, actions } = parseEventActions(event.description);

  categoryEl.textContent = CATEGORY_LABELS[event.category] || 'Event';
  categoryEl.style.background = hexToRgba(categoryText(event.category), 0.14);
  categoryEl.style.color = categoryText(event.category);
  titleEl.textContent = event.title;

  metaEl.innerHTML = `
    <div class="event-modal-meta-row">
      <i class="ti ti-calendar" aria-hidden="true"></i>
      <span>${formatDateRange(event.start, event.end, event.isAllDay)}</span>
    </div>
    <div class="event-modal-meta-row">
      <i class="ti ti-clock" aria-hidden="true"></i>
      <span>${formatTimeRange(event.start, event.end, event.isAllDay)}</span>
    </div>
    ${event.location ? `
      <div class="event-modal-meta-row">
        <i class="ti ti-map-pin" aria-hidden="true"></i>
        <span>${escapeHtml(event.location)}</span>
      </div>
    ` : ''}
  `;

  descEl.textContent = cleanText;
  descEl.style.display = cleanText ? 'block' : 'none';

  actionsEl.innerHTML = actions.map((action, i) => `
    <a href="${escapeHtml(action.url)}" target="_blank" rel="noopener noreferrer"
       class="event-modal-btn ${i === 0 ? '' : 'secondary'}">
      <i class="ti ${action.icon}" aria-hidden="true"></i> ${action.label}
    </a>
  `).join('');

  overlay.classList.add('is-open');
}

function closeEventModal() {
  document.getElementById('eventModalOverlay').classList.remove('is-open');
}

function initEventModal() {
  const overlay = document.getElementById('eventModalOverlay');
  const closeBtn = document.getElementById('eventModalClose');

  closeBtn.addEventListener('click', closeEventModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeEventModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeEventModal();
  });
}

// ============================================
// Filter chips
// ============================================
function initFilterChips() {
  const chips = document.querySelectorAll('.filter-chip');
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      activeFilter = chip.dataset.filter;
      renderMonthGrid();
    });
  });

  // If opened with ?category=youth (e.g. from a "View Calendar" button),
  // pre-select that chip.
  const params = new URLSearchParams(window.location.search);
  const requestedCategory = params.get('category');
  if (requestedCategory) {
    const matchingChip = document.querySelector(`.filter-chip[data-filter="${requestedCategory}"]`);
    if (matchingChip) {
      chips.forEach((c) => c.classList.remove('active'));
      matchingChip.classList.add('active');
      activeFilter = requestedCategory;
    }
  }
}

// ============================================
// Month/week navigation
// ============================================
function initMonthNav() {
  const prevBtn = document.getElementById('calPrevMonth');
  const nextBtn = document.getElementById('calNextMonth');
  const todayBtn = document.getElementById('calTodayBtn');

  if (prevBtn) prevBtn.addEventListener('click', () => {
    if (viewMode === 'week') {
      anchorDate.setDate(anchorDate.getDate() - 7);
    } else {
      anchorDate.setMonth(anchorDate.getMonth() - 1);
    }
    renderMonthGrid();
  });

  if (nextBtn) nextBtn.addEventListener('click', () => {
    if (viewMode === 'week') {
      anchorDate.setDate(anchorDate.getDate() + 7);
    } else {
      anchorDate.setMonth(anchorDate.getMonth() + 1);
    }
    renderMonthGrid();
  });

  if (todayBtn) todayBtn.addEventListener('click', () => {
    anchorDate = new Date();
    anchorDate.setHours(0, 0, 0, 0);
    renderMonthGrid();
  });
}

// ============================================
// Month / Week view toggle
// ============================================
function initViewToggle() {
  const buttons = document.querySelectorAll('.cal-view-btn');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.view;
      if (mode === viewMode) return;
      viewMode = mode;
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      renderMonthGrid();
    });
  });
}

// ============================================
// Formatting helpers
// ============================================
function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

function formatShortDate(date) {
  if (!date) return '';
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase();
}

function formatPillTime(date, isAllDay) {
  if (!date || isAllDay) return '';
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    .replace(':00', '')
    .replace(' ', '');
}

function formatDateRange(start, end, isAllDay) {
  if (!start) return '';
  const startStr = start.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  if (!end || isSameDay(start, end)) return startStr;
  const endStr = end.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  return `${startStr} – ${endStr}`;
}

function formatTimeRange(start, end, isAllDay) {
  if (!start) return '';
  if (isAllDay) return 'All day';
  const opts = { hour: 'numeric', minute: '2-digit' };
  const startStr = start.toLocaleTimeString('en-US', opts);
  if (!end) return startStr;
  const endStr = end.toLocaleTimeString('en-US', opts);
  return `${startStr} – ${endStr}`;
}

function truncate(str, max) {
  return str.length > max ? str.slice(0, max - 1) + '…' : str;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ============================================
// Boot
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initFilterChips();
  initMonthNav();
  initViewToggle();
  initEventModal();
  initCalendarPage();
});
