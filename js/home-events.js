// ============================================
// SSPP Homepage — "What's Happening" preview
// Pulls the next 4 events from the Featured Events Google Calendar
// (same calendar calendar.js uses for its Featured card / Coming up list),
// and renders them in the same 2-column card style as the calendar page
// (wraps into a 2x2 grid). Clicking a card sends the visitor to
// calendar.html?event=<id>, which auto-opens that event's detail modal.
// ============================================

const HOME_GOOGLE_API_KEY = 'AIzaSyCNAL3x2J53-OgUuCqQLNRh1nh33xqDrEw';
const HOME_FEATURED_CALENDAR_ID = '59943aebd742db92a7b197ae2fd895fe962e80537fc70217f55ba20013ccab0e@group.calendar.google.com';
const HOME_EVENTS_COUNT = 3;

// ============================================
// Helpers
// ============================================
function homeParseGoogleDate(dateStr, isAllDay) {
  if (!dateStr) return null;
  if (isAllDay) {
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
    parts.push('All day');
  } else {
    parts.push(ev.start.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }));
  }
  return parts.join(' · ');
}

// Same Drive-link normalizer calendar.js uses.
function homeNormalizeImageUrl(url) {
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (driveMatch) {
    return `https://drive.google.com/thumbnail?id=${driveMatch[1]}&sz=w1000`;
  }
  return url;
}

// Pulls the "IMAGE: <url>" line out of a Calendar description, same
// convention as calendar.js.
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
  if (!container) return;

  if (events.length === 0) {
    container.innerHTML = `<p style="grid-column: 1 / -1; text-align:center; color:rgba(255,255,255,0.5); font-size:0.85rem; padding:1rem 0;">Check back soon for upcoming events.</p>`;
    return;
  }

  container.innerHTML = events.map((ev) => {
    const imageUrl = homeExtractImageUrl(ev.description);

    return `
      <article class="featured-event-compact" data-event-id="${homeEscapeHtml(ev.id)}">
        ${imageUrl ? `
          <div class="fe-thumb-wrap">
            <img class="fe-thumb" src="${homeEscapeHtml(imageUrl)}" alt="" loading="lazy">
          </div>
        ` : ''}
        <div class="fe-content">
          <div class="fe-top">
            <span class="featured-event-badge">Featured Event</span>
            <span class="fe-date">${homeEscapeHtml(homeFormatPillDate(ev.start, ev.end, ev.isAllDay))}</span>
          </div>
          <h2 class="featured-event-title">${homeEscapeHtml(ev.title)}</h2>
          <div class="featured-event-meta">
            <span><i class="ti ti-clock" aria-hidden="true"></i> ${homeEscapeHtml(homeFormatMeta(ev))}</span>
          </div>
        </div>
      </article>
    `;
  }).join('');

  container.querySelectorAll('.featured-event-compact').forEach((card) => {
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
    console.warn('Homepage featured events failed to load:', err);
    renderHomeEvents([]); // shows the "check back soon" message
  }
});
