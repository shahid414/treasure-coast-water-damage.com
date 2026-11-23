// Treasure Coast Water Damage Restoration — main.js
// Mobile nav toggle, FAQ accordion, lead form handling.

(function () {
  "use strict";

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
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

  /* ---------- Lead form ---------- */
  // TODO (OWNER — REQUIRED BEFORE LAUNCH):
  // Connect this form to your real lead endpoint (RankLocal or your chosen CRM).
  // Replace FORM_ENDPOINT below ("#") with the real POST URL and add any
  // required fields (e.g. RankLocal siteId) to the payload. Until then every
  // submission will fail and visitors will see the honest error message with
  // the phone number — that is intentional. Do NOT fake a success message.
  var FORM_ENDPOINT = "#"; // <-- replace with real endpoint before launch

  var forms = document.querySelectorAll("form.lead-form");
  forms.forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var button = form.querySelector('button[type="submit"]');
      var status = form.querySelector(".form-status");
      var originalText = button.textContent;

      status.className = "form-status";
      status.textContent = "";
      button.disabled = true;
      button.textContent = "Sending…";

      var payload = new FormData(form);
      // TODO: if your CRM needs extra fields (e.g. RankLocal siteId), append them here:
      // payload.append("siteId", "YOUR_SITE_ID");

      fetch(FORM_ENDPOINT, { method: "POST", body: payload })
        .then(function (response) {
          if (!response.ok) {
            throw new Error("Request failed with status " + response.status);
          }
          status.className = "form-status success";
          status.textContent = "Request received — we will call you shortly.";
          button.textContent = "Request Received";
          form.reset();
        })
        .catch(function () {
          status.className = "form-status error";
          status.textContent = "Something went wrong — please call (772) 555-0100 or try again.";
          button.disabled = false;
          button.textContent = originalText;
        });
    });
  });

  /* ---------- Footer year ---------- */
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
