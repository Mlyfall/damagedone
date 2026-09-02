/* ==========================================================================
   Damage Done Tattoo - Interaktion
   1) Galerie-Vorschau auf der Startseite
   2) Galerie-Raster + Lightbox auf gallery.html
   3) FAQ-Akkordeon (maus- und tastaturbedienbar)
   4) About-Link scrollt die rechte Spalte
   5) Sprachumschaltung Deutsch / Englisch
   ========================================================================== */
(function () {
  "use strict";

  /* ---- 1) Vorschau auf der Startseite ----------------------------------- */
  var previewList = document.getElementById("preview-list");
  if (previewList && typeof galleryImages !== "undefined") {
    // Bevorzugt die in gallery-data.js mit  home: true  markierten Bilder;
    // ist keines markiert, die obersten der Liste.
    var count = (typeof homePreviewCount === "number") ? homePreviewCount : 4;
    var auswahl = galleryImages.filter(function (item) { return item.home; });
    if (!auswahl.length) auswahl = galleryImages.slice(0, count);
    auswahl.forEach(function (item) {
      var figure = document.createElement("figure");
      // Jedes Vorschaubild führt auf die Galerie-Seite
      var link = document.createElement("a");
      link.href = "gallery.html";
      link.setAttribute("aria-label", "Zur Galerie - " + item.alt);
      link.setAttribute("data-en-aria-label", "To the gallery - " + (item.altEn || item.alt));
      link.appendChild(makeImage(item));
      figure.appendChild(link);
      previewList.appendChild(figure);
    });
  }

  /* ---- 2) Galerie-Raster + Lightbox ------------------------------------- */
  var grid = document.getElementById("gallery-grid");
  if (grid && typeof galleryImages !== "undefined") {
    galleryImages.forEach(function (item) {
      var figure = document.createElement("figure");
      var button = document.createElement("button");
      button.type = "button";
      button.setAttribute("aria-label", "Bild vergrößern: " + item.alt);
      button.setAttribute("data-en-aria-label", "Enlarge image: " + (item.altEn || item.alt));

      button.appendChild(makeImage(item, true));
      figure.appendChild(button);
      grid.appendChild(figure);

      button.addEventListener("click", function () { openLightbox(item); });
    });
  }

  // Bild-Element aus einem Eintrag von gallery-data.js bauen.
  // Kein lazy-loading in der Vorschau: die wenigen Bilder sollen sofort ihre
  // Höhe haben, damit der Sprung zum About-Abschnitt exakt sitzt.
  function makeImage(item, lazy) {
    var img = document.createElement("img");
    img.src = item.src;
    img.alt = item.alt;
    img.setAttribute("data-en-alt", item.altEn || item.alt);
    if (lazy) img.loading = "lazy";
    return img;
  }

  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightbox-img");
  var lastFocused = null;

  function openLightbox(item) {
    if (!lightbox) return;
    lastFocused = document.activeElement;
    lightboxImg.src = item.src;
    lightboxImg.alt = (currentLang === "en") ? (item.altEn || item.alt) : item.alt;
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
    var closeBtn = lightbox.querySelector(".lightbox-close");
    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("is-open");
    lightboxImg.removeAttribute("src");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  if (lightbox) {
    lightbox.addEventListener("click", function (event) {
      // Klick auf den Hintergrund oder den Schließen-Button schließt
      if (event.target === lightbox || event.target.closest(".lightbox-close")) {
        closeLightbox();
      }
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && lightbox.classList.contains("is-open")) closeLightbox();
    });
  }

  /* ---- 3) FAQ-Akkordeon -------------------------------------------------- */
  // <button> ist von Haus aus per Tastatur bedienbar (Tab + Enter/Leertaste).
  var questions = document.querySelectorAll(".faq-question");
  Array.prototype.forEach.call(questions, function (button) {
    button.addEventListener("click", function () {
      var expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      var answer = document.getElementById(button.getAttribute("aria-controls"));
      if (answer) answer.hidden = expanded;
    });
  });

  /* ---- 4) About-Link scrollt die rechte Spalte --------------------------- */
  var scrollPane = document.getElementById("scroll-pane");
  var aboutLink = document.querySelector('[data-scroll-target="about"]');
  var about = document.getElementById("about");
  if (scrollPane && aboutLink && about) {
    aboutLink.addEventListener("click", function (event) {
      // Nur im Split-Layout eingreifen; mobil scrollt die Seite normal.
      if (scrollPane.scrollHeight > scrollPane.clientHeight) {
        event.preventDefault();
        // Abstand über die aktuelle Position berechnen - unabhängig davon,
        // wie weit die Spalte gerade schon gescrollt ist.
        var delta = about.getBoundingClientRect().top - scrollPane.getBoundingClientRect().top;
        scrollPane.scrollTo({ top: scrollPane.scrollTop + delta - 16, behavior: "smooth" });
      }
    });
  }

  /* ==========================================================================
     5) Sprachumschaltung - Deutsch ist Standard
     --------------------------------------------------------------------------
     Im HTML gibt es zwei Bauweisen:
       a) Kurze Texte:   <a data-en="About">Über mich</a>
                         auch Attribute: data-en-alt, data-en-aria-label,
                         data-en-placeholder, data-en-title (auf <body>)
       b) Lange Texte:   <p data-lang="de">…</p><p data-lang="en" hidden>…</p>
     Die gewählte Sprache wird im Browser gemerkt (localStorage).
     ========================================================================== */

  var STORAGE_KEY = "ddt-lang";
  var currentLang = "de";
  var originals = new Map();          // merkt sich die deutschen Originaltexte
  var ATTRS = ["alt", "aria-label", "placeholder", "value"];

  function applyLang(lang) {
    currentLang = (lang === "en") ? "en" : "de";
    document.documentElement.lang = currentLang;

    // a) Kurze Texte
    document.querySelectorAll("[data-en]").forEach(function (el) {
      if (!originals.has(el)) originals.set(el, el.innerHTML);
      el.innerHTML = (currentLang === "en") ? el.getAttribute("data-en") : originals.get(el);
    });

    // a2) Attribute (alt, aria-label, placeholder, value)
    ATTRS.forEach(function (attr) {
      document.querySelectorAll("[data-en-" + attr + "]").forEach(function (el) {
        // Deutschen Originalwert beim ersten Mal sichern
        if (!el.hasAttribute("data-de-" + attr)) {
          el.setAttribute("data-de-" + attr, el.getAttribute(attr) || "");
        }
        var value = (currentLang === "en")
          ? el.getAttribute("data-en-" + attr)
          : el.getAttribute("data-de-" + attr);
        el.setAttribute(attr, value || "");
      });
    });

    // b) Lange Textblöcke
    document.querySelectorAll("[data-lang]").forEach(function (el) {
      el.hidden = (el.getAttribute("data-lang") !== currentLang);
    });

    // Seitentitel im Browser-Tab
    var enTitle = document.body.getAttribute("data-en-title");
    if (enTitle) {
      if (!document.body.hasAttribute("data-de-title")) {
        document.body.setAttribute("data-de-title", document.title);
      }
      document.title = (currentLang === "en") ? enTitle : document.body.getAttribute("data-de-title");
    }

    // Zustand der Umschalt-Buttons
    document.querySelectorAll("[data-set-lang]").forEach(function (button) {
      button.setAttribute("aria-pressed", String(button.getAttribute("data-set-lang") === currentLang));
    });
  }

  document.querySelectorAll("[data-set-lang]").forEach(function (button) {
    button.addEventListener("click", function () {
      var lang = button.getAttribute("data-set-lang");
      applyLang(lang);
      try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* z. B. privater Modus */ }
    });
  });

  var saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { /* ignorieren */ }
  applyLang(saved === "en" ? "en" : "de");
})();
