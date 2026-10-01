// ============================================
// Coffee Fellowship host sign-up modal
//
// Builds the upcoming-Sunday date chips (marking the ones listed in
// COFFEE_HOST_BOOKED as taken), fills the backup-Sunday dropdown, and
// opens the modal from any [data-modal="coffee-host"] trigger or a
// #host-coffee URL hash. Exposes openCoffeeHostModal() for other
// scripts (the ministry modal's sign-up button uses it).
// Requires modal-a11y.js and coffee-host-data.js to be loaded first.
// ============================================
(function () {
  function toIsoDate(d) {
    const pad = (n) => String(n).padStart(2, '0');
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }

  function upcomingSundays() {
    const first = new Date();
    first.setHours(0, 0, 0, 0);
    first.setDate(first.getDate() + COFFEE_HOST_MIN_NOTICE_DAYS);
    first.setDate(first.getDate() + ((7 - first.getDay()) % 7));

    const sundays = [];
    for (let i = 0; i < COFFEE_HOST_WEEKS_AHEAD; i++) {
      const d = new Date(first);
      d.setDate(first.getDate() + i * 7);
      sundays.push(d);
    }
    return sundays;
  }

  document.addEventListener('DOMContentLoaded', function () {
    const overlay = document.getElementById('coffeeHostOverlay');
    if (!overlay || typeof COFFEE_HOST_BOOKED === 'undefined') return;

    const chipsEl = document.getElementById('chDateChips');
    const backupEl = document.getElementById('chBackup');
    const closeBtn = document.getElementById('coffeeHostClose');

    const booked = {};
    COFFEE_HOST_BOOKED.forEach(function (b) { booked[b.date] = b.host || ''; });

    const longFmt = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    const sundays = upcomingSundays().map(function (d) {
      const iso = toIsoDate(d);
      return {
        iso: iso,
        label: d.toLocaleDateString('en-US', longFmt),
        month: d.toLocaleDateString('en-US', { month: 'short' }),
        day: d.getDate(),
        taken: Object.prototype.hasOwnProperty.call(booked, iso),
        host: booked[iso],
      };
    });

    // ----- Preferred Sunday chips -----
    sundays.forEach(function (s, i) {
      const chip = document.createElement('label');
      chip.className = 'date-chip' + (s.taken ? ' is-taken' : '');
      if (s.taken) chip.title = s.host ? 'Hosted by ' + s.host : 'Already taken';

      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'preferred_sunday';
      input.value = s.label;
      input.required = true;
      input.disabled = s.taken;
      input.id = 'chSunday' + i;
      input.setAttribute('aria-label', s.label + (s.taken ? ' (taken)' : ''));

      const face = document.createElement('span');
      face.className = 'date-chip__face';
      face.setAttribute('aria-hidden', 'true');
      face.innerHTML =
        '<span class="date-chip__month">' + s.month + '</span>' +
        '<span class="date-chip__day">' + s.day + '</span>';

      chip.appendChild(input);
      chip.appendChild(face);
      chipsEl.appendChild(chip);
    });

    // ----- Backup Sunday dropdown -----
    // Same open Sundays as the chips, minus whichever one is picked as
    // the first choice, plus a "flexible" option.
    function renderBackupOptions() {
      const checked = chipsEl.querySelector('input:checked');
      const preferred = checked ? checked.value : null;
      const current = backupEl.value;

      let html = '<option value="" disabled' + (current ? '' : ' selected') + '>Choose a second choice</option>' +
        '<option value="Flexible, any open Sunday">I\'m flexible, any open Sunday</option>';
      sundays.forEach(function (s) {
        if (s.taken || s.label === preferred) return;
        html += '<option value="' + s.label + '">' + s.label + '</option>';
      });
      backupEl.innerHTML = html;
      if (current && current !== preferred) backupEl.value = current;
    }

    renderBackupOptions();
    chipsEl.addEventListener('change', renderBackupOptions);

    // ----- Open / close -----
    function openModal() {
      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      trapModalFocus(overlay);
    }

    function closeModal() {
      if (!overlay.classList.contains('is-open')) return;
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
      releaseModalFocus();
    }

    window.openCoffeeHostModal = openModal;

    document.querySelectorAll('[data-modal="coffee-host"]').forEach(function (trigger) {
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        openModal();
      });
    });

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });

    // Deep link, e.g. from a Parish Life thank-you post:
    // get-involved.html#host-coffee
    if (window.location.hash === '#host-coffee') {
      const band = document.getElementById('host-coffee');
      if (band) band.scrollIntoView({ block: 'center' });
      openModal();
    }
  });
})();
