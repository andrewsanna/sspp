// ============================================
// SSPP Homepage — "What's Happening" preview
// Pulls the next 4 events from the Featured Events Google Calendar
// (same calendar calendar.js uses for its Featured card / Coming up list),
// and renders them in the same 2-column card style as the calendar page
// (wraps into a 2x2 grid). Clicking a card sends the visitor to
// calendar.html?event=<id>, which auto-opens that event's detail modal.
// ============================================

// const HOME_GOOGLE_API_KEY = 'AIzaSyCNAL3x2J53-OgUuCqQLNRh1nh33xqDrEw';
// const HOME_FEATURED_CALENDAR_ID = '59943aebd742db92a7b197ae2fd895fe962e80537fc70217f55ba20013ccab0e@group.calendar.google.com';
const HOME_EVENTS_COUNT = 2;

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

function homeFormatDayHeader(date) {
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
}

function homeFormatEventTime(ev) {
  if (ev.isAllDay) return 'All day';
  return ev.start.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
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

function homeGetDescriptionText(description, maxLength = 100) {
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

  const text = normalized
    .split('\n')
    .filter(line => !/^\s*IMAGE\s*:/i.test(line))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();

  return text.length > maxLength ? text.slice(0, maxLength).trim() + '…' : text;
}

// ============================================
// "This Week" — pulls from every non-featured calendar,
// merges, groups by day. Featured calendar is excluded here
// since it already has its own section above.
// ============================================
async function fetchCalendarEvents(calendarId, timeMin, timeMax) {
  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?` +
    new URLSearchParams({
      key: GOOGLE_API_KEY,
      singleEvents: 'true',
      orderBy: 'startTime',
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      maxResults: '20',
    });
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for calendar ${calendarId}`);
  return res.json();
}

async function fetchUpcomingDaysEvents(days) {
  const timeMin = new Date();
  const timeMax = new Date();
  timeMax.setDate(timeMax.getDate() + days);

  const nonFeaturedCalendars = CALENDARS.filter(c => !c.featured);

  const results = await Promise.allSettled(
    nonFeaturedCalendars.map(cal =>
      fetchCalendarEvents(cal.id, timeMin, timeMax).then(data => ({ data, category: cal.category }))
    )
  );

  const events = [];
  results.forEach((result) => {
    if (result.status !== 'fulfilled') {
      console.warn('Next days events: a calendar failed to load', result.reason);
      return;
    }
    const { data, category } = result.value;
    (data.items || []).forEach((raw) => {
      const isAllDay = !raw.start?.dateTime;
      const startRaw = raw.start?.dateTime || raw.start?.date;
      const start = homeParseGoogleDate(startRaw, isAllDay);
      if (!start) return;
      events.push({
        id: raw.id,
        title: raw.summary || 'Untitled event',
        start,
        isAllDay,
        category,
      });
    });
  });

  return events
    .filter(e => e.start.getTime() >= Date.now() - 86400000)
    .sort((a, b) => a.start - b.start);
}

function renderDayGroupedList(containerId, events) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (events.length === 0) {
    container.innerHTML = `<p style="text-align:center; color:var(--mt); font-size:0.85rem; padding:1rem 0;">Nothing else on the calendar right now.</p>`;
    return;
  }

  const groups = [];
  let currentDay = null;
  let currentGroup = null;
  events.forEach((ev) => {
    const dayKey = ev.start.toDateString();
    if (dayKey !== currentDay) {
      currentDay = dayKey;
      currentGroup = { date: ev.start, events: [] };
      groups.push(currentGroup);
    }
    currentGroup.events.push(ev);
  });

  container.innerHTML = groups.map(group => `
    <div class="week-day-group">
      <div class="week-day-header">${homeEscapeHtml(homeFormatDayHeader(group.date))}</div>
      ${group.events.map(ev => `
        <div class="week-row" data-event-id="${homeEscapeHtml(ev.id)}">
          <span class="week-time">${homeEscapeHtml(homeFormatEventTime(ev))}</span>
          <span class="week-title">${homeEscapeHtml(ev.title)}</span>
          <span class="week-tag">${homeEscapeHtml(CATEGORY_LABELS[ev.category] || ev.category)}</span>
        </div>
      `).join('')}
    </div>
  `).join('');

  container.querySelectorAll('.week-row').forEach(row => {
    row.addEventListener('click', () => {
      const id = row.dataset.eventId;
      window.location.href = `calendar.html?event=${encodeURIComponent(id)}`;
    });
  });
}

// ============================================
// Fetch
// ============================================
async function fetchHomeFeaturedEvents() {
  const featuredCalendar = CALENDARS.find(c => c.featured);
  if (!featuredCalendar) return [];

  const timeMin = new Date();
  const timeMax = new Date();
  timeMax.setMonth(timeMax.getMonth() + MONTHS_AHEAD);

  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(featuredCalendar.id)}/events?` +
    new URLSearchParams({
      key: GOOGLE_API_KEY,
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
  const descText = homeGetDescriptionText(ev.description);

  return `
    <article class="featured-event-compact" data-event-id="${homeEscapeHtml(ev.id)}">
      ${imageUrl ? `
        <div class="fe-thumb-wrap">
          <img class="fe-thumb" src="${homeEscapeHtml(imageUrl)}" alt="" loading="lazy">
        </div>
      ` : ''}
      <div class="fe-content">
        <h2 class="featured-event-title">${homeEscapeHtml(ev.title)}</h2>
        <span class="fe-date">${homeEscapeHtml(homeFormatPillDate(ev.start, ev.end, ev.isAllDay))}</span>
        <div class="featured-event-meta">
          <span><i class="ti ti-clock" aria-hidden="true"></i> ${homeEscapeHtml(homeFormatMeta(ev))}</span>
        </div>
         ${descText ? `<p class="featured-event-desc">${homeEscapeHtml(descText)}</p>` : ''}
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
// Featured ministry spotlights (homepage)
// Pulls the two most recently dated 'ministry' posts from
// PARISH_LIFE_POSTS into the two Get Involved feature cards.
// ============================================
function getLatestMinistryPosts(count = 2) {
  if (typeof PARISH_LIFE_POSTS === 'undefined') return [];
  const ministryPosts = PARISH_LIFE_POSTS.filter(p => p.category === 'ministry');
  return ministryPosts
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, count);
}

function renderFeaturedMinistryCard(elementId, post) {
  const block = document.getElementById(elementId);
  if (!block || !post) return; // leave fallback markup in place

  const photo = post.photos && post.photos.length
    ? post.photos[0].src
    : 'images/ministries/default.jpg';

  block.innerHTML = `
    <div class="photo-placeholder">
      <img src="${photo}" alt="${post.title}" />
    </div>
    <div class="min-feature-body">
      <h3 class="min-feature-title">${post.title}</h3>
      <p class="min-feature-desc">${post.excerpt}</p>
      <a href="parish-life.html#${post.id}" class="text-link">Read more <i class="ti ti-arrow-right" aria-hidden="true"></i></a>
    </div>
  `;
}

function renderFeaturedMinistries() {
  const [first, second] = getLatestMinistryPosts(2);
  renderFeaturedMinistryCard('minFeature1', first);
  renderFeaturedMinistryCard('minFeature2', second);
}

document.addEventListener('DOMContentLoaded', renderFeaturedMinistries);

// ============================================
// Boot
// ============================================
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const events = await fetchHomeFeaturedEvents();
    renderHomeEvents(events);
  } catch (err) {
    console.warn('Homepage featured events failed to load:', err);
    renderHomeEvents([]);
  }

  try {
    const nextDaysEvents = await fetchUpcomingDaysEvents(3);
    renderDayGroupedList('next3DaysList', nextDaysEvents);
  } catch (err) {
    console.warn('Next 3 days events failed to load:', err);
    renderDayGroupedList('next3DaysList', []);
  }
});
