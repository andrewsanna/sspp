// ============================================
// Life Events — filters LIFE_EVENTS (js/life-events-data.js) down to
// only this calendar week (Sunday–Saturday) and renders them into
// #lifeEventsList on the Bulletin card. Shows an empty-state message
// when nothing falls in the current week.
// ============================================
document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('lifeEventsList');
  if (!container || typeof LIFE_EVENTS === 'undefined') return;

  const ICONS = {
    baptism: 'ti-droplet',
    wedding: 'ti-rings-wedding',
    memorial: 'ti-candle',
    funeral: 'ti-cross',
  };

  const LABELS = {
    baptism: 'Baptism',
    wedding: 'Wedding',
    memorial: 'Memorial',
    funeral: 'Funeral',
  };

  const now = new Date();
  const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  const thisWeek = LIFE_EVENTS
    .filter(function (e) {
      const d = new Date(e.date + 'T00:00:00');
      return d >= startOfWeek && d <= endOfWeek;
    })
    .sort(function (a, b) {
      return new Date(a.date) - new Date(b.date);
    });

  if (thisWeek.length === 0) {
    container.innerHTML = '<p class="rs-lifeevents-empty">No weddings, baptisms, memorials, or funerals scheduled this week.</p>';
    return;
  }

  const list = document.createElement('ul');
  list.className = 'rs-lifeevents-list';
  thisWeek.forEach(function (e) {
    const d = new Date(e.date + 'T00:00:00');
    const dayLabel = d.toLocaleDateString(undefined, { weekday: 'long' });
    const li = document.createElement('li');
    li.innerHTML =
      '<i class="ti ' + (ICONS[e.type] || 'ti-calendar-event') + '" aria-hidden="true"></i>' +
      '<span><strong>' + (LABELS[e.type] || e.type) + '</strong> — ' + e.name + ', ' + dayLabel + ' ' + e.time + '</span>';
    list.appendChild(li);
  });
  container.appendChild(list);
});
