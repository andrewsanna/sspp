// ============================================
// main.js — Mobile nav toggle, nav dropdowns
// (Community, Calendar, Resources), and automatic
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

  // --- Nav dropdowns (Community, Calendar, Resources) ---
  // Two kinds share this code: a plain dropdown whose label is a
  // <button class="nav-dropdown-toggle"> (Community, Resources), and a link + separate
  // caret button (Calendar: the label goes to calendar.html). Either way the
  // control below opens/closes the submenu.
  const dropdowns = document.querySelectorAll('.nav-dropdown');
  const CONTROL = '.nav-dropdown-toggle, .nav-dropdown-caret-btn';

  function setOpen(dropdown, open) {
    dropdown.classList.toggle('is-open', open);
    const control = dropdown.querySelector(CONTROL);
    if (control) control.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  function closeAllDropdowns(except) {
    dropdowns.forEach(function (dd) {
      if (dd !== except) setOpen(dd, false);
    });
  }

  dropdowns.forEach(function (dropdown) {
    const control = dropdown.querySelector(CONTROL);
    if (!control) return;

    control.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      // A click right after hover opened the menu should keep it open,
      // not toggle it shut.
      if (dropdown.dataset.hoverOpened === 'true') {
        dropdown.dataset.hoverOpened = 'false';
        return;
      }
      const willOpen = !dropdown.classList.contains('is-open');
      closeAllDropdowns(willOpen ? dropdown : null);
      setOpen(dropdown, willOpen);
    });

    // Desktop hover open
    dropdown.addEventListener('mouseenter', function () {
      if (window.innerWidth > 860) {
        closeAllDropdowns(dropdown);
        dropdown.dataset.hoverOpened = dropdown.classList.contains('is-open') ? 'false' : 'true';
        setOpen(dropdown, true);
      }
    });
    dropdown.addEventListener('mouseleave', function () {
      if (window.innerWidth > 860) {
        dropdown.dataset.hoverOpened = 'false';
        setOpen(dropdown, false);
      }
    });
  });

  // Close any open dropdown on outside click
  document.addEventListener('click', function (e) {
    dropdowns.forEach(function (dropdown) {
      if (!dropdown.contains(e.target)) setOpen(dropdown, false);
    });
  });

  // Escape closes an open dropdown and returns focus to its control
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    dropdowns.forEach(function (dropdown) {
      if (!dropdown.classList.contains('is-open')) return;
      setOpen(dropdown, false);
      const control = dropdown.querySelector(CONTROL);
      if (control && dropdown.contains(document.activeElement)) control.focus();
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
        const parentLabel = parentDropdown.querySelector('.nav-dropdown-toggle, .nav-dropdown-link');
        if (parentLabel) parentLabel.classList.add('active');
      }
    }
  });

  // Whole sections (e.g. every /ministries/ page under Community)
  document.querySelectorAll('.nav-dropdown[data-active-path]').forEach(function (dropdown) {
    if (window.location.pathname.indexOf(dropdown.getAttribute('data-active-path')) === -1) return;
    const label = dropdown.querySelector('.nav-dropdown-toggle, .nav-dropdown-link');
    if (label) label.classList.add('active');
  });
});
