// ============================================
// Ministry page "Upcoming events" widget
// Requires js/calendar-config.js loaded first, and ONE of these
// page-level variables set before this script runs:
//   MINISTRY_CALENDAR_CATEGORY — matches a calendar's `category`
//   MINISTRY_CALENDAR_TAG      — matches anything in a calendar's `tags`
// Use TAG when a page needs a narrower slice than a whole category
// (e.g. just GOYA's 3 calendars, not all 9 youth calendars).
// ============================================

function buildEventsUrl(calendarId, timeMin, timeMax) {
  const base = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`;
  const params = new URLSearchParams({
    key: GOOGLE_API_KEY,
    singleEvents: 'true',
    orderBy: 'startTime',
    timeMin: timeMin.toISOString(),
    timeMax: timeMax.toISOString(),
    maxResults: '50',
  });
  return `${base}?${params.toString()}`;
}

function parseGoogleDate(dateStr, isAllDay) {
  if (!dateStr) return null;
  if (isAllDay) {
    const [y, m, d] = dateStr.split('-').map(Number);
    return new Date(y, m - 1, d);
  }
  return new Date(dateStr);
}

function normalizeEvent(raw) {
  const isAllDay = !raw.start?.dateTime;
  return {
    id: raw.id,
    title: raw.summary || 'Untitled event',
    location: raw.location || '',
    start: parseGoogleDate(raw.start?.dateTime || raw.start?.date, isAllDay),
    isAllDay,
    htmlLink: raw.htmlLink || '#',
  };
}

function getRelevantCalendars() {
  if (typeof MINISTRY_CALENDAR_TAG !== 'undefined') {
    return CALENDARS.filter((c) => c.tags?.includes(MINISTRY_CALENDAR_TAG));
  }
  if (typeof MINISTRY_CALENDAR_CATEGORY !== 'undefined') {
    return CALENDARS.filter((c) => c.category === MINISTRY_CALENDAR_CATEGORY);
  }
  return [];
}

async function fetchMinistryEvents() {
  const relevantCalendars = getRelevantCalendars();
  if (relevantCalendars.length === 0) return [];

  const timeMin = new Date();
  const timeMax = new Date();
  timeMax.setMonth(timeMax.getMonth() + MONTHS_AHEAD);

  const results = await Promise.all(
    relevantCalendars.map(async (cal) => {
      const res = await fetch(buildEventsUrl(cal.id, timeMin, timeMax));
      if (!res.ok) return [];
      const data = await res.json();
      return (data.items || []).map(normalizeEvent);
    })
  );

  return results
    .flat()
    .filter((e) => e.start && e.start.getTime() >= Date.now() - 86400000)
    .sort((a, b) => a.start - b.start)
    .slice(0, 3);
}

function formatEventDate(date, isAllDay) {
  if (!date) return '';
  const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  if (isAllDay) return dateStr;
  const timeStr = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  return `${dateStr} · ${timeStr}`;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

async function renderMinistryEvents() {
  const container = document.getElementById('ministryUpcomingEvents');
  if (!container) return;

  const events = await fetchMinistryEvents();

  if (events.length === 0) {
    container.innerHTML = `<p style="font-size:0.85rem; color:var(--mt);">No upcoming events scheduled right now — check back soon.</p>`;
    return;
  }

  container.innerHTML = events.map((ev) => `
    <a href="${escapeHtml(ev.htmlLink)}" target="_blank" rel="noopener noreferrer" class="mp-event-card">
      <div class="mp-event-card-date">${formatEventDate(ev.start, ev.isAllDay)}</div>
      <div class="mp-event-card-title">${escapeHtml(ev.title)}</div>
      ${ev.location ? `<div class="mp-event-card-loc"><i class="ti ti-map-pin" aria-hidden="true"></i> ${escapeHtml(ev.location)}</div>` : ''}
    </a>
  `).join('');
}

document.addEventListener('DOMContentLoaded', renderMinistryEvents);
