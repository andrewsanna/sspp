// ============================================
// SSPP Calendar page
//
// Pulls events from two Google Calendars:
//   1. MAIN_CALENDAR_ID    — routine services, all events shown in month grid
//   2. FEATURED_CALENDAR_ID — Festival, fundraisers, special services.
//                             Powers the "Featured" card + "Coming Up" sidebar.
//
// SETUP REQUIRED before this works:
//   1. Create a Google Cloud project, enable "Google Calendar API"
//   2. Create an API key, restrict it to Calendar API + your domain
//   3. Make both calendars public (Settings > Access permissions >
//      "Make available to public")
//   4. Find each calendar's ID: Calendar Settings > "Integrate calendar" >
//      Calendar ID (looks like an email address, e.g.
//      abc123@group.calendar.google.com)
//   5. Fill in the four constants below
// ============================================

const GOOGLE_API_KEY = 'AIzaSyCNAL3x2J53-OgUuCqQLNRh1nh33xqDrEw';
const MAIN_CALENDAR_ID = 'YOUR_MAIN_CALENDAR_ID_HERE';
const FEATURED_CALENDAR_ID = 'YOUR_FEATURED_CALENDAR_ID_HERE';

// How many months ahead to fetch from the API per request
const MONTHS_AHEAD = 3;
// How many "Coming up" events to show in the sidebar
const COMING_UP_COUNT = 3;

// Maps a Google Calendar event "colorId" to one of our filter categories.
// Set these colors when creating events in Google Calendar so they map
// correctly. Google Calendar's color picker shows names like "Lavender",
// "Sage", "Peacock", etc. — colorId is the number it saves under the hood.
const COLOR_TO_CATEGORY = {
  '1': 'community',   // Lavender
  '2': 'youth',       // Sage
  '3': 'sacraments',  // Grape
  '5': 'festival',    // Banana
  '7': 'liturgical',  // Peacock
  '11': 'festival',   // Tomato
};
const DEFAULT_CATEGORY = 'other';

const CATEGORY_LABELS = {
  liturgical: 'Liturgical',
  youth: 'Youth',
  community: 'Community',
  festival: 'Festival',
  sacraments: 'Sacraments',
  other: 'Other',
};

// ============================================
// State
// ============================================
let allMainEvents = [];
let allFeaturedEvents = [];
let activeFilter = 'all';
let visibleMonth = new Date();
visibleMonth.setDate(1);

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

async function fetchCalendar(calendarId) {
  const timeMin = new Date();
  timeMin.setMonth(timeMin.getMonth() - 1);
  const timeMax = new Date();
  timeMax.setMonth(timeMax.getMonth() + MONTHS_AHEAD);

  const url = buildEventsUrl(calendarId, timeMin, timeMax);
  const res = await fetch(url);

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const message = body?.error?.message || `HTTP ${res.status}`;
    throw new Error(message);
  }

  const data = await res.json();
  return (data.items || []).map(normalizeEvent);
}

function normalizeEvent(raw) {
  const startRaw = raw.start?.dateTime || raw.start?.date;
  const endRaw = raw.end?.dateTime || raw.end?.date;
  const isAllDay = !raw.start?.dateTime;

  return {
    id: raw.id,
    title: raw.summary || 'Untitled event',
    description: raw.description || '',
    location: raw.location || '',
    start: startRaw ? new Date(startRaw) : null,
    end: endRaw ? new Date(endRaw) : null,
    isAllDay,
    category: COLOR_TO_CATEGORY[raw.colorId] || DEFAULT_CATEGORY,
    htmlLink: raw.htmlLink || '#',
  };
}

// ============================================
// Init
// ============================================
async function initCalendarPage() {
  const statusEl = document.getElementById('calStatus');

  if (GOOGLE_API_KEY === 'YOUR_API_KEY_HERE') {
    renderSetupNotice();
    return;
  }

  try {
    const [mainEvents, featuredEvents] = await Promise.all([
      fetchCalendar(MAIN_CALENDAR_ID),
      fetchCalendar(FEATURED_CALENDAR_ID),
    ]);

    allMainEvents = mainEvents;
    allFeaturedEvents = featuredEvents
      .filter((e) => e.start && e.start.getTime() >= Date.now() - 86400000)
      .sort((a, b) => a.start - b.start);

    if (statusEl) statusEl.remove();

    renderFeaturedEvent();
    renderComingUp();
    renderMonthGrid();
  } catch (err) {
    renderError(err.message);
  }
}

function renderSetupNotice() {
  const statusEl = document.getElementById('calStatus');
  if (!statusEl) return;
  statusEl.className = 'cal-status is-error';
  statusEl.innerHTML = `
    <i class="ti ti-alert-triangle" aria-hidden="true"></i>
    <span>Calendar not connected yet — add your Google API key and calendar IDs in <code>js/calendar.js</code> to go live. See the comment block at the top of that file for setup steps.</span>
  `;
}

function renderError(message) {
  const statusEl = document.getElementById('calStatus');
  if (!statusEl) return;
  statusEl.className = 'cal-status is-error';
  statusEl.innerHTML = `
    <i class="ti ti-alert-triangle" aria-hidden="true"></i>
    <span>Could not load the calendar (${escapeHtml(message)}). Double-check the API key and calendar IDs are correct and both calendars are public.</span>
  `;
}

// ============================================
// Featured event (soonest upcoming from the featured calendar)
// ============================================
function renderFeaturedEvent() {
  const container = document.getElementById('featuredEventSlot');
  if (!container) return;

  const next = allFeaturedEvents[0];
  if (!next) {
    container.innerHTML = '';
    return;
  }

  container.innerHTML = `
    <article class="featured-event">
      <div class="featured-event-img" style="background: linear-gradient(160deg, #993c1d, #5c2410);">
        <span class="featured-event-badge">Featured event</span>
      </div>
      <div class="featured-event-body">
        <div class="featured-event-date">${formatDateRange(next.start, next.end, next.isAllDay)}</div>
        <h2 class="featured-event-title">${escapeHtml(next.title)}</h2>
        ${next.description ? `<p class="featured-event-desc">${escapeHtml(truncate(next.description, 160))}</p>` : ''}
        <div class="featured-event-meta">
          <span><i class="ti ti-clock" aria-hidden="true"></i> ${formatTimeRange(next.start, next.end, next.isAllDay)}</span>
          ${next.location ? `<span><i class="ti ti-map-pin" aria-hidden="true"></i> ${escapeHtml(next.location)}</span>` : ''}
        </div>
      </div>
    </article>
  `;
}

// ============================================
// Coming up — next few FEATURED events (not routine services)
// ============================================
function renderComingUp() {
  const container = document.getElementById('comingUpSlot');
  if (!container) return;

  const upcoming = allFeaturedEvents.slice(1, 1 + COMING_UP_COUNT);

  if (upcoming.length === 0) {
    container.innerHTML = `<p style="font-size:0.8rem;color:var(--mt);">No other featured events scheduled yet.</p>`;
    return;
  }

  container.innerHTML = upcoming.map((ev) => `
    <div class="up-event">
      <div class="up-event-img"><i class="ti ti-calendar-event" aria-hidden="true"></i></div>
      <div>
        <div class="up-event-date">${formatShortDate(ev.start)}</div>
        <div class="up-event-title">${escapeHtml(ev.title)}</div>
        <div class="up-event-meta">${formatTimeRange(ev.start, ev.end, ev.isAllDay)}</div>
      </div>
    </div>
  `).join('');
}

// ============================================
// Month grid — all events from the main calendar, filterable
// ============================================
function renderMonthGrid() {
  const grid = document.getElementById('dayGrid');
  const label = document.getElementById('calMonthLabel');
  if (!grid || !label) return;

  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();

  label.textContent = visibleMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const firstOfMonth = new Date(year, month, 1);
  const startDow = firstOfMonth.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells = [];

  // Leading days from previous month
  for (let i = startDow - 1; i >= 0; i--) {
    cells.push({ day: daysInPrevMonth - i, otherMonth: true, date: new Date(year, month - 1, daysInPrevMonth - i) });
  }
  // Days in current month
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, otherMonth: false, date: new Date(year, month, d) });
  }
  // Trailing days to fill the last week
  let trailing = 1;
  while (cells.length % 7 !== 0) {
    cells.push({ day: trailing, otherMonth: true, date: new Date(year, month + 1, trailing) });
    trailing++;
  }

  const today = new Date();
  const filtered = activeFilter === 'all'
    ? allMainEvents
    : allMainEvents.filter((e) => e.category === activeFilter);

  grid.innerHTML = cells.map((cell) => {
    const dayEvents = filtered.filter((e) => e.start && isSameDay(e.start, cell.date));
    const isToday = !cell.otherMonth && isSameDay(cell.date, today);

    const MAX_VISIBLE = 3;
    const visibleEvents = dayEvents.slice(0, MAX_VISIBLE);
    const extraCount = dayEvents.length - visibleEvents.length;

    return `
      <div class="day-cell ${cell.otherMonth ? 'other-month' : ''} ${isToday ? 'today' : ''}">
        <div class="day-num">${cell.day}</div>
        ${visibleEvents.map((e) => `
          <div class="ev-pill ev-${e.category}" title="${escapeHtml(e.title)}">${escapeHtml(truncate(e.title, 18))}</div>
        `).join('')}
        ${extraCount > 0 ? `<div class="day-more">+${extraCount} more</div>` : ''}
      </div>
    `;
  }).join('');
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
}

// ============================================
// Month navigation
// ============================================
function initMonthNav() {
  const prevBtn = document.getElementById('calPrevMonth');
  const nextBtn = document.getElementById('calNextMonth');
  const todayBtn = document.getElementById('calTodayBtn');

  if (prevBtn) prevBtn.addEventListener('click', () => {
    visibleMonth.setMonth(visibleMonth.getMonth() - 1);
    renderMonthGrid();
  });

  if (nextBtn) nextBtn.addEventListener('click', () => {
    visibleMonth.setMonth(visibleMonth.getMonth() + 1);
    renderMonthGrid();
  });

  if (todayBtn) todayBtn.addEventListener('click', () => {
    visibleMonth = new Date();
    visibleMonth.setDate(1);
    renderMonthGrid();
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
  initCalendarPage();
});
