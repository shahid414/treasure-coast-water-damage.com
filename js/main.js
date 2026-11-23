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
