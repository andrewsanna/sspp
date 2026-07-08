// ============================================
// SSPP Homepage — "What's Happening" preview
// Pulls the next 3 events from the Featured Events Google Calendar
// (same calendar calendar.js uses for its Featured card / Coming up list).
// Falls back to the static cards already in index.html if the
// fetch fails or there are no upcoming featured events.
// Clicking a card sends the visitor to calendar.html?event=<id>,
// which auto-opens that event's detail modal.
// Images come from an "IMAGE: <url>" line in the event description,
// same convention calendar.js uses for the Featured card.
// ============================================

const HOME_GOOGLE_API_KEY = 'AIzaSyCNAL3x2J53-OgUuCqQLNRh1nh33xqDrEw';
const HOME_FEATURED_CALENDAR_ID = '59943aebd742db92a7b197ae2fd895fe962e80537fc70217f55ba20013ccab0e@group.calendar.google.com';
const HOME_EVENTS_COUNT = 3;
const HOME_PLACEHOLDER_CLASSES = ['photo-placeholder--rust', 'photo-placeholder--blue', 'photo-placeholder--gold'];
const HOME_TAG_CLASSES = ['ev-tag--rust', 'ev-tag--green', 'ev-tag--gold'];

// ============================================
// Helpers
// ============================================
function homeParseGoogleDate(dateStr, isAllDay) {
  if (!dateStr) return null;
  if (isAllDay) {
    // "2026-06-14" — parse as LOCAL midnight, not UTC, to avoid off-by-one-day bugs
    const [y, m, d] = dateStr.split('-').map(Number);
    return new Date(y, m - 1, d);
  }
  return new Date(dateStr);
}

function homeEscapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function homeFormatPillDate(start, end, isAllDay) {
  if (!start) return '';
  const opts = { month: 'short', day: 'numeric' };
  const startStr = start.toLocaleDateString('en-US', opts);
  if (!end || start.toDateString() === end.toDateString()) return startStr;
  const endStr = end.toLocaleDateString('en-US', opts);
  return `${startStr}–${endStr}`;
}

function homeFormatMeta(ev) {
  const parts = [];
  if (ev.isAllDay) {
    parts.push(homeFormatPillDate(ev.start, ev.end, true));
  } else {
    parts.push(ev.start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    parts.push(ev.start.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }));
  }
  if (ev.location) parts.push(ev.location);
  return parts.join(' · ');
}

// Same Drive-link normalizer calendar.js uses — turns a Drive "share" link
// into a direct-viewable thumbnail URL. Anything else passes through as-is.
function homeNormalizeImageUrl(url) {
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (driveMatch) {
    return `https://drive.google.com/thumbnail?id=${driveMatch[1]}&sz=w1000`;
  }
  return url;
}

// Pulls just the "IMAGE: <url>" line out of a Calendar description.
// Handles the same HTML-wrapping Google Calendar adds (auto-linked URLs,
// <br>/<div> line breaks) that calendar.js already accounts for.
function homeExtractImageUrl(description) {
  if (!description) return '';

  const normalized = description
    .replace(/<a\s+[^>]*href="([^"]+)"[^>]*>.*?<\/a>/gi, '$1')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div)>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

  let imageUrl = '';
  normalized.split('\n').forEach((line) => {
    const match = line.match(/^\s*IMAGE\s*:\s*(\S+)/i);
    if (match) imageUrl = homeNormalizeImageUrl(match[1]);
  });
  return imageUrl;
}

// ============================================
// Fetch
// ============================================
async function fetchHomeFeaturedEvents() {
  const timeMin = new Date();
  const timeMax = new Date();
  timeMax.setMonth(timeMax.getMonth() + 6);

  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(HOME_FEATURED_CALENDAR_ID)}/events?` +
    new URLSearchParams({
      key: HOME_GOOGLE_API_KEY,
      singleEvents: 'true',
      orderBy: 'startTime',
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      maxResults: '20',
    });

  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();

  return (data.items || [])
    .map((raw) => {
      const isAllDay = !raw.start?.dateTime;
      const startRaw = raw.start?.dateTime || raw.start?.date;
      const endRaw = raw.end?.dateTime || raw.end?.date;
      let end = homeParseGoogleDate(endRaw, isAllDay);
      if (isAllDay && end) end = new Date(end.getFullYear(), end.getMonth(), end.getDate() - 1);
      return {
        id: raw.id,
        title: raw.summary || 'Untitled event',
        location: raw.location || '',
        description: raw.description || '',
        start: homeParseGoogleDate(startRaw, isAllDay),
        end,
        isAllDay,
      };
    })
    .filter((e) => e.start && e.start.getTime() >= Date.now() - 86400000)
    .sort((a, b) => a.start - b.start)
    .slice(0, HOME_EVENTS_COUNT);
}

// ============================================
// Render
// ============================================
function renderHomeEvents(events) {
  const container = document.getElementById('homeEventsGrid');
  if (!container || events.length === 0) return; // leave the static fallback cards in place

  container.innerHTML = events.map((ev, i) => {
    const isFeatured = i === 0;
    const photoClass = HOME_PLACEHOLDER_CLASSES[i] || 'photo-placeholder--rust';
    const tagClass = HOME_TAG_CLASSES[i] || 'ev-tag--gold';
    const imageUrl = homeExtractImageUrl(ev.description);

    return `
      <article class="ev-card ${isFeatured ? 'featured' : ''}" data-event-id="${homeEscapeHtml(ev.id)}" style="cursor:pointer;">
        <div class="photo-placeholder ${imageUrl ? '' : photoClass}">
          ${imageUrl
            ? `<img class="ph-image" src="${homeEscapeHtml(imageUrl)}" alt="" loading="lazy">`
            : `<i class="ti ti-camera ph-icon" aria-hidden="true"></i>`
          }
          ${isFeatured ? `<span class="ev-date-pill">${homeEscapeHtml(homeFormatPillDate(ev.start, ev.end, ev.isAllDay))}</span>` : ''}
        </div>
        <div class="ev-body">
          <h3 class="ev-title">${homeEscapeHtml(ev.title)}</h3>
          <p class="ev-meta"><i class="ti ti-clock" aria-hidden="true"></i> ${homeEscapeHtml(homeFormatMeta(ev))}</p>
          <span class="ev-tag ${tagClass}">Featured Event</span>
        </div>
      </article>
    `;
  }).join('');

  container.querySelectorAll('.ev-card').forEach((card) => {
    card.addEventListener('click', () => {
      const id = card.dataset.eventId;
      window.location.href = `calendar.html?event=${encodeURIComponent(id)}`;
    });
  });
}

// ============================================
// Boot
// ============================================
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const events = await fetchHomeFeaturedEvents();
    renderHomeEvents(events);
  } catch (err) {
    console.warn('Homepage featured events failed to load, keeping fallback cards:', err);
  }
});
