// ============================================
// Shared modal accessibility helper
//
// Used by get-involved.js (ministry modal), calendar.js (event modal),
// and registrations.js (registration modal). Each of those already
// toggles an `is-open` class to show/hide its overlay — this file adds
// the two things that were missing on top of that:
//   1. On open: move keyboard focus into the modal, and trap Tab /
//      Shift+Tab so focus can't leave it while it's open.
//   2. On close: return focus to whatever element opened the modal,
//      so a keyboard user isn't left stranded at the top of the page.
//
// Usage in each modal's open function, right after showing the overlay:
//   trapModalFocus(overlayEl);
// Usage in each modal's close function, right before hiding the overlay:
//   releaseModalFocus();
// ============================================

let _modalTriggerEl = null;
let _modalKeydownHandler = null;

function _getFocusableEls(container) {
  return Array.from(
    container.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    )
  ).filter((el) => el.offsetParent !== null); // skip hidden elements
}

function trapModalFocus(overlayEl) {
  _modalTriggerEl = document.activeElement;

  const focusable = _getFocusableEls(overlayEl);
  if (focusable.length) {
    focusable[0].focus();
  } else {
    overlayEl.setAttribute('tabindex', '-1');
    overlayEl.focus();
  }

  _modalKeydownHandler = function (e) {
    if (e.key !== 'Tab') return;
    const focusableNow = _getFocusableEls(overlayEl);
    if (!focusableNow.length) return;

    const first = focusableNow[0];
    const last = focusableNow[focusableNow.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  document.addEventListener('keydown', _modalKeydownHandler);
}

function releaseModalFocus() {
  if (_modalKeydownHandler) {
    document.removeEventListener('keydown', _modalKeydownHandler);
    _modalKeydownHandler = null;
  }
  if (_modalTriggerEl && typeof _modalTriggerEl.focus === 'function') {
    _modalTriggerEl.focus();
  }
  _modalTriggerEl = null;
}
