// Treasure Coast Water Damage Restoration — main.js
// Mobile nav toggle and FAQ accordion. No forms on this site — calls only.

(function () {
  "use strict";

  /* ---------- Mobile nav ---------- */
  var toggles = document.querySelectorAll(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggles.length && nav) {
    toggles.forEach(function (toggle) {
      toggle.addEventListener("click", function () {
        var open = nav.classList.toggle("open");
        toggles.forEach(function (t) {
          t.setAttribute("aria-expanded", open ? "true" : "false");
        });
      });
    });
  }

  /* ---------- Services dropdown ---------- */
  /* Click/tap toggles the dropdown (desktop click + mobile tap).
     Desktop hover is handled in CSS. Closes on outside click,
     Escape, or when a dropdown link is chosen. */
  var dropBtns = document.querySelectorAll(".nav-drop-btn");
  function closeAllDropdowns() {
    document.querySelectorAll(".has-dropdown.open").forEach(function (el) {
      el.classList.remove("open");
      el.querySelector(".nav-drop-btn").setAttribute("aria-expanded", "false");
    });
  }
  dropBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var item = btn.closest(".has-dropdown");
      var willOpen = !item.classList.contains("open");
      closeAllDropdowns();
      if (willOpen) {
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".has-dropdown")) {
      closeAllDropdowns();
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeAllDropdowns();
    }
  });
  document.querySelectorAll(".dropdown-menu a").forEach(function (a) {
    a.addEventListener("click", function () {
      closeAllDropdowns();
      if (nav) {
        nav.classList.remove("open");
      }
      toggles.forEach(function (t) {
        t.setAttribute("aria-expanded", "false");
      });
    });
  });

  /* ---------- FAQ accordion ---------- */
  var faqButtons = document.querySelectorAll(".faq-q");
  faqButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".faq-item");
      var wasOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(function (el) {
        el.classList.remove("open");
        el.querySelector(".faq-q").setAttribute("aria-expanded", "false");
      });
      if (!wasOpen) {
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ---------- Footer year ---------- */
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
