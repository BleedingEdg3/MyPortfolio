/* ============================================================
   NITISH PORTFOLIO — script.js
   Clean, single-file, no duplicate DOMContentLoaded
   ============================================================ */

(function () {
  "use strict";

  /* ── Welcome Overlay ──────────────────────────────────────── */
  const overlay = document.getElementById("welcome-overlay");
  if (overlay) {
    setTimeout(() => overlay.classList.add("hidden"), 1600);
  }

  /* ── Theme ────────────────────────────────────────────────── */
  const themeBtn = document.getElementById("theme-toggle");
  const body = document.body;

  function applyTheme(theme) {
    if (theme === "light") {
      body.classList.add("light");
    } else {
      body.classList.remove("light");
    }
  }

  const saved = localStorage.getItem("theme") || "dark";
  applyTheme(saved);

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const isLight = body.classList.contains("light");
      const next = isLight ? "dark" : "light";
      applyTheme(next);
      localStorage.setItem("theme", next);
    });
  }

  /* ── Mobile Nav ───────────────────────────────────────────── */
  const menuBtn = document.getElementById("menu-btn");
  const nav = document.querySelector("header nav");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      nav.classList.toggle("mobile-open");
      menuBtn.classList.toggle("open");
    });

    // Close on link click
    nav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        nav.classList.remove("mobile-open");
        menuBtn.classList.remove("open");
      });
    });
  }

  /* ── Header scroll state ──────────────────────────────────── */
  const header = document.querySelector("header");
  function onScroll() {
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 20);
    }
    updateActiveNav();
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ── Active nav link ──────────────────────────────────────── */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("nav a[href^='#']");

  function updateActiveNav() {
    let current = "";
    sections.forEach((sec) => {
      if (window.scrollY >= sec.offsetTop - 120) {
        current = sec.getAttribute("id");
      }
    });
    navLinks.forEach((a) => {
      a.classList.toggle("active", a.getAttribute("href") === `#${current}`);
    });
  }

  /* ── Scroll Reveal ────────────────────────────────────────── */
  const revealEls = document.querySelectorAll(".reveal");
  revealEls.forEach((el) => el.classList.add("visible"));

  /* ── Skill bar animation ──────────────────────────────────── */
  const skillFills = document.querySelectorAll(".skill-fill");
  if ("IntersectionObserver" in window && skillFills.length) {
    const skillIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const target = e.target.getAttribute("data-width");
            e.target.style.width = target;
            skillIO.unobserve(e.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    skillFills.forEach((el) => skillIO.observe(el));
  }

  /* ── Typing animation ─────────────────────────────────────── */
  const typingEl = document.getElementById("typing-text");
  if (typingEl) {
    const roles = [
      "Data Scientist",
      "ML Engineer",
      "Software Developer",
      "Data Analyst",
    ];
    let rIdx = 0,
      cIdx = 0,
      deleting = false;
    const SPEED = 90,
      DEL_SPEED = 45,
      PAUSE = 1600;

    function tick() {
      const role = roles[rIdx];
      if (deleting) {
        typingEl.textContent = role.slice(0, --cIdx);
        if (cIdx === 0) {
          deleting = false;
          rIdx = (rIdx + 1) % roles.length;
          setTimeout(tick, SPEED * 2);
          return;
        }
        setTimeout(tick, DEL_SPEED);
      } else {
        typingEl.textContent = role.slice(0, ++cIdx);
        if (cIdx === role.length) {
          deleting = true;
          setTimeout(tick, PAUSE);
          return;
        }
        setTimeout(tick, SPEED);
      }
    }
    setTimeout(tick, 800);
  }

  /* ── Marquee duplication (seamless loop) ──────────────────── */
  document.querySelectorAll(".marquee-track").forEach((track) => {
    track.innerHTML += track.innerHTML;
  });

  /* ── Project cards: expand detail on desktop ──────────────── */
  // All linking handled via anchor tags directly — no JS needed for this.
  // If you add a modal in future, wire it here.

})();
