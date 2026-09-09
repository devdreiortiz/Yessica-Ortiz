(function () {
  "use strict";

  function initContact() {
    var brand = window.__BRAND__ || {};
    var contact = brand.contact || {};
    var whatsapp = document.querySelector("[data-whatsapp-link]");
    var emailLink = document.querySelector("[data-email-link]");
    var email = document.querySelector("[data-email]");
    var linkedin = document.querySelector("[data-linkedin-link]");
    if (whatsapp && contact.whatsappLink) whatsapp.href = contact.whatsappLink;
    if (emailLink && contact.email) emailLink.href = "mailto:" + contact.email;
    if (email && contact.email) email.textContent = contact.email;
    if (linkedin && contact.linkedin) linkedin.href = contact.linkedin;
  }

  function initCvDownload() {
    var link = document.querySelector("[data-cv-download]");
    if (!link) return;
    link.setAttribute("aria-label", "Descargar currículo PDF de Yessica Alexandra Ortiz Soto");
  }

  function initMenu() {
    var toggle = document.querySelector(".nav-toggle");
    var menu = document.querySelector(".nav-menu");
    if (!toggle || !menu) return;
    function close() {
      toggle.setAttribute("aria-expanded", "false");
      menu.classList.remove("is-open");
    }
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      menu.classList.toggle("is-open", !open);
    });
    menu.querySelectorAll("a").forEach(function (link) { link.addEventListener("click", close); });
    document.addEventListener("keydown", function (event) { if (event.key === "Escape") close(); });
  }

  function initHeader() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    function update() { header.classList.toggle("is-scrolled", window.scrollY > 12); }
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach(function (item) { item.classList.add("is-visible"); });
      return;
    }
    var observer = new IntersectionObserver(function (entries, current) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        current.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -30px" });
    items.forEach(function (item) { observer.observe(item); });
  }

  function initYear() {
    var year = document.querySelector("[data-year]");
    if (year) year.textContent = new Date().getFullYear();
  }

  function boot() {
    initContact();
    initCvDownload();
    initMenu();
    initHeader();
    initReveal();
    initYear();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
