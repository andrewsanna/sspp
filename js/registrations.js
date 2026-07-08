// ============================================
// Open Registrations — renders cards from OPEN_REGISTRATIONS +
// PAYMENT_ITEMS (see js/payment-data.js), and powers the detail modal.
// Requires payment-data.js to be loaded first.
// ============================================
document.addEventListener('DOMContentLoaded', function () {
  const grid = document.getElementById('openRegistrationsGrid');
  if (!grid || typeof OPEN_REGISTRATIONS === 'undefined') return;

  const overlay = document.getElementById('regModalOverlay');
  const modalIcon = document.getElementById('regModalIcon');
  const modalTitle = document.getElementById('regModalTitle');
  const modalSubtitle = document.getElementById('regModalSubtitle');
  const modalDesc = document.getElementById('regModalDesc');
  const modalSchedule = document.getElementById('regModalSchedule');
  const modalScheduleText = document.getElementById('regModalScheduleText');
  const modalPrice = document.getElementById('regModalPrice');
  const modalCta = document.getElementById('regModalCta');
  const modalClose = document.getElementById('regModalClose');

  function openModal(key) {
    const raw = PAYMENT_ITEMS[key];
    if (!raw || !overlay) return;
    const item = resolvePaymentItem(raw);

    modalIcon.className = 'ti ' + (item.icon || 'ti-calendar-event');
    modalTitle.textContent = item.title || '';
    modalSubtitle.textContent = item.subtitle || '';
    modalDesc.textContent = item.description || '';

    if (item.schedule) {
      modalScheduleText.textContent = item.schedule;
      modalSchedule.style.display = '';
    } else {
      modalSchedule.style.display = 'none';
    }

    modalPrice.textContent = getPaymentPriceLabel(key);
    modalCta.href = 'payment.html?item=' + encodeURIComponent(key);

    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (overlay) {
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });

  // Build one card per open registration
  OPEN_REGISTRATIONS.forEach(function (key) {
    const raw = PAYMENT_ITEMS[key];
    if (!raw) return;
    const item = resolvePaymentItem(raw);
    const priceLabel = getPaymentPriceLabel(key);

    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'rs-reg-card';
    card.setAttribute('data-item', key);
    card.innerHTML =
      '<div class="rs-reg-icon"><i class="ti ' + (item.icon || 'ti-calendar-event') + '" aria-hidden="true"></i></div>' +
      '<div class="rs-reg-title">' + (item.title || '') + '</div>' +
      '<div class="rs-reg-subtitle">' + (item.subtitle || '') + '</div>' +
      (priceLabel ? '<div class="rs-reg-price">' + priceLabel + '</div>' : '');

    card.addEventListener('click', function () {
      openModal(key);
    });

    grid.appendChild(card);
  });
});
