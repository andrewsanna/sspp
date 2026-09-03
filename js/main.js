// ============================================
// main.js — Mobile nav toggle, nav dropdowns
// (Community, Resources), and automatic
// active-link highlighting
// ============================================
document.addEventListener('DOMContentLoaded', function () {
  // --- Mobile hamburger toggle ---
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      navToggle.innerHTML = isOpen
        ? '<i class="ti ti-x" aria-hidden="true"></i>'
        : '<i class="ti ti-menu-2" aria-hidden="true"></i>';
    });
    // Close menu (and any open dropdown) when a link is clicked (mobile)
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.innerHTML = '<i class="ti ti-menu-2" aria-hidden="true"></i>';
        closeAllDropdowns();
      });
    });
  }

  // --- Nav dropdowns (Community, Resources) ---
  // Each dropdown is a link (navigates to its own page, e.g. Community ->
  // parish-life.html) plus a separate caret button that opens/closes its
  // submenu. Handles any number of .nav-dropdown elements the same way,
  // so adding a third one later needs no JS changes.
  const dropdowns = document.querySelectorAll('.nav-dropdown');

  function closeAllDropdowns(except) {
    dropdowns.forEach(function (dd) {
      if (dd === except) return;
      dd.classList.remove('is-open');
      const caret = dd.querySelector('.nav-dropdown-caret-btn');
      if (caret) caret.setAttribute('aria-expanded', 'false');
    });
  }

  dropdowns.forEach(function (dropdown) {
    const caret = dropdown.querySelector('.nav-dropdown-caret-btn');
    if (!caret) return;

    caret.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      const willOpen = !dropdown.classList.contains('is-open');
      closeAllDropdowns(willOpen ? dropdown : null);
      dropdown.classList.toggle('is-open', willOpen);
      caret.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    });

    // Desktop hover open
    dropdown.addEventListener('mouseenter', function () {
      if (window.innerWidth > 860) {
        closeAllDropdowns(dropdown);
        dropdown.classList.add('is-open');
        caret.setAttribute('aria-expanded', 'true');
      }
    });
    dropdown.addEventListener('mouseleave', function () {
      if (window.innerWidth > 860) {
        dropdown.classList.remove('is-open');
        caret.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Close any open dropdown on outside click
  document.addEventListener('click', function (e) {
    dropdowns.forEach(function (dropdown) {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('is-open');
        const caret = dropdown.querySelector('.nav-dropdown-caret-btn');
        if (caret) caret.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // --- Active link highlighting ---
  // Compares each nav link's href against the current page filename,
  // so "active" state is computed once here instead of hand-set in
  // every page's HTML (which is what caused the earlier inconsistencies).
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-page]').forEach(function (link) {
    if (link.getAttribute('data-page') === currentFile) {
      link.classList.add('active');
      // If the active page is inside a dropdown submenu (e.g. Sacraments
      // under Community), also mark that dropdown's own top-level link
      // (Community / Resources) as active, so the section reads as
      // highlighted even though the visible label is the parent's.
      const parentDropdown = link.closest('.nav-dropdown');
      if (parentDropdown) {
        const parentLink = parentDropdown.querySelector('.nav-dropdown-link');
        if (parentLink) parentLink.classList.add('active');
      }
    }
  });
});
