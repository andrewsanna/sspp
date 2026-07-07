// ============================================
// main.js — Mobile nav toggle, Community dropdown,
// and automatic active-link highlighting
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
    // Close menu when a link is clicked (mobile)
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.innerHTML = '<i class="ti ti-menu-2" aria-hidden="true"></i>';
        const dropdown = document.getElementById('communityDropdown');
        if (dropdown) dropdown.classList.remove('is-open');
      });
    });
  }

  // --- Community dropdown ---
  const dropdown = document.getElementById('communityDropdown');
  const dropdownToggle = document.getElementById('communityToggle');
  if (dropdown && dropdownToggle) {
    dropdownToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      const isOpen = dropdown.classList.toggle('is-open');
      dropdownToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    // Desktop hover open
    dropdown.addEventListener('mouseenter', function () {
      if (window.innerWidth > 860) {
        dropdown.classList.add('is-open');
        dropdownToggle.setAttribute('aria-expanded', 'true');
      }
    });
    dropdown.addEventListener('mouseleave', function () {
      if (window.innerWidth > 860) {
        dropdown.classList.remove('is-open');
        dropdownToggle.setAttribute('aria-expanded', 'false');
      }
    });
    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('is-open');
        dropdownToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --- Active link highlighting ---
  // Compares each nav link's href against the current page filename,
  // so "active" state is computed once here instead of hand-set in
  // every page's HTML (which is what caused the earlier inconsistencies).
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-page]').forEach(function (link) {
    if (link.getAttribute('data-page') === currentFile) {
      link.classList.add('active');
      const parentDropdown = link.closest('.nav-dropdown');
      if (parentDropdown) {
        const parentToggle = parentDropdown.querySelector('.nav-dropdown-toggle');
        if (parentToggle) parentToggle.classList.add('active');
      }
    }
  });
});
