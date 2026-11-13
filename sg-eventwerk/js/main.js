/*
  main.js – Interaktivität der Seite.
  1) Handy-Menü auf-/zuklappen
  2) Aktuelles Jahr im Fußbereich
  3) Abschnitte beim Scrollen sanft einblenden
  4) Kopfzeile beim Scrollen kompakter machen
*/

// Markiert die Seite als "JavaScript aktiv" – erst dann werden die
// Abschnitte für die Einblend-Animation zunächst ausgeblendet.
document.documentElement.classList.add("js");

// Logo-Reveal: Overlay nach der Animation entfernen, nur einmal pro Sitzung
(function () {
  var intro = document.getElementById("intro");
  if (!intro) return;
  try { sessionStorage.setItem("sgIntro", "1"); } catch (e) {}
  setTimeout(function () { if (intro.parentNode) intro.parentNode.removeChild(intro); }, 4400);
})();

document.addEventListener("DOMContentLoaded", function () {

  /* --- 1. Handy-Menü --- */
  const menuKnopf = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-nav");
  if (menuKnopf && navigation) {
    menuKnopf.addEventListener("click", function () {
      navigation.classList.toggle("open");
      menuKnopf.setAttribute("aria-expanded", navigation.classList.contains("open"));
    });
    // Nach Klick auf einen Menüpunkt das Menü wieder schließen:
    navigation.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navigation.classList.remove("open");
      });
    });
  }

  /* --- 2. Aktuelles Jahr --- */
  const jahrFeld = document.querySelector("#jahr");
  if (jahrFeld) {
    jahrFeld.textContent = new Date().getFullYear();
  }

  /* --- 3. Einblenden beim Scrollen ---
     Der "IntersectionObserver" meldet, sobald ein Abschnitt in den
     sichtbaren Bereich scrollt – dann blenden wir ihn ein. */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const beobachter = new IntersectionObserver(function (eintraege) {
      eintraege.forEach(function (eintrag) {
        if (eintrag.isIntersecting) {
          eintrag.target.classList.add("is-visible");
          beobachter.unobserve(eintrag.target); // nur einmal einblenden
        }
      });
    }, { threshold: 0.15 });
    reveals.forEach(function (el) { beobachter.observe(el); });
  } else {
    // Falls der Browser das nicht kann: einfach alles sofort zeigen.
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* --- 4. Kopfzeile beim Scrollen --- */
  const header = document.querySelector(".site-header");
  if (header) {
    window.addEventListener("scroll", function () {
      header.classList.toggle("scrolled", window.scrollY > 40);
    });
  }

});
