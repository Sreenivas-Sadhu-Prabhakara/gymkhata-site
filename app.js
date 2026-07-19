/* GymKhata explainer — tiny progressive enhancements.
   No dependencies. Everything degrades gracefully with JS off. */
(function () {
  "use strict";

  var reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- 1. Sticky-nav shadow when scrolled ---- */
  var nav = document.getElementById("nav");
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle("is-stuck", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- 2. Smooth scroll for in-page anchors (respects reduced motion) ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      if (id === "#" || id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start"
      });
      if (history.replaceState) history.replaceState(null, "", id);
    });
  });

  /* ---- 3a. Build the hero "churn meter": 14 members per row, 3 rows ---- */
  var grid = document.getElementById("churnGrid");
  // Positions (0-41) that start as active but will fade to "lapsing".
  var fadeSet = [3, 9, 11, 18, 20, 27, 31, 33, 39];
  // Of those, these get "won back" (turn accent red) on the loop.
  var wonSet = [3, 11, 20, 31, 33];
  var pips = [];
  if (grid) {
    for (var i = 0; i < 42; i++) {
      var pip = document.createElement("span");
      pip.className = "pip";
      grid.appendChild(pip);
      pips.push(pip);
    }
  }

  /* ---- 3b. Animated counters + the churn-meter story loop ---- */
  function runCounter(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    if (reduceMotion) {
      el.textContent = target + suffix;
      return;
    }
    var start = null;
    var dur = 1100;
    function tick(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(tick);
  }

  function playChurnStory() {
    if (reduceMotion) {
      // Static end-state: show the fade + a couple won.
      fadeSet.forEach(function (idx) {
        if (pips[idx]) pips[idx].classList.add("is-fading");
      });
      wonSet.forEach(function (idx) {
        if (pips[idx]) pips[idx].classList.remove("is-fading");
        if (pips[idx]) pips[idx].classList.add("is-won");
      });
      return;
    }
    // Reset
    pips.forEach(function (p) {
      p.classList.remove("is-fading", "is-won");
    });
    // Members start lapsing (stagger the fade)
    fadeSet.forEach(function (idx, k) {
      setTimeout(function () {
        if (pips[idx]) pips[idx].classList.add("is-fading");
      }, 500 + k * 150);
    });
    // Then the ladder wins some back
    wonSet.forEach(function (idx, k) {
      setTimeout(function () {
        if (pips[idx]) {
          pips[idx].classList.remove("is-fading");
          pips[idx].classList.add("is-won");
        }
      }, 2400 + k * 260);
    });
  }

  // Fire once the hero figure scrolls into view (or immediately as fallback).
  var counters = document.querySelectorAll(".churn__num");
  var fired = false;
  function fireHero() {
    if (fired) return;
    fired = true;
    counters.forEach(runCounter);
    playChurnStory();
    // Gently re-run the story on a slow loop so it feels alive.
    if (!reduceMotion) {
      setInterval(playChurnStory, 7000);
    }
  }

  var figure = document.querySelector(".churn");
  if ("IntersectionObserver" in window && figure) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            fireHero();
            io.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );
    io.observe(figure);
  } else {
    fireHero();
  }

  /* ---- 4. Year stamp is static (2026) in markup; nothing to do. ---- */
})();
