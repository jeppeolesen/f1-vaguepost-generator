/* F1 Vaguepost Generator — logic. */

(function () {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  let mode = "mixed";
  let currentText = "";

  /* Resolve {tokens} in a template. Two distinct drivers guaranteed for
     templates that reference both {driver} and {driver2}. */
  function fill(template) {
    const driver = rand(DATA.drivers);
    let driver2 = rand(DATA.drivers);
    while (driver2 === driver) driver2 = rand(DATA.drivers);

    const map = {
      "{driver}": driver,
      "{driver2}": driver2,
      "{team}": rand(DATA.teams),
      "{nationality}": rand(DATA.nationalities),
      "{gp}": rand(DATA.grandsPrix),
      "{journalist}": rand(DATA.journalists),
      "{sponsor}": rand(DATA.sponsors),
      "{bodyPart}": rand(DATA.bodyParts),
      "{vibe}": rand(DATA.vibes),
      "{year}": String(randInt(2026, 2028)),
      "{tenths}": (randInt(2, 9) / 10).toFixed(1),
      "{money}": String(randInt(20, 300)),
      "{age}": String(randInt(16, 19))
    };

    return template.replace(/\{[a-zA-Z0-9]+\}/g, (t) => map[t] ?? t);
  }

  function pickTemplate() {
    if (mode === "rumour") return fill(rand(DATA.rumours));
    if (mode === "vague") return fill(rand(DATA.vagueposts));
    // mixed: weight slightly toward vagueposts, they're the funnier ones.
    const pool = Math.random() < 0.55 ? DATA.vagueposts : DATA.rumours;
    return fill(rand(pool));
  }

  function formatCount(n) {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
    if (n >= 1000) return (n / 1000).toFixed(1) + "K";
    return String(n);
  }

  function setPersona() {
    const p = rand(DATA.personas);
    $("display-name").textContent = p.name;
    $("handle").textContent = "@" + p.handle;
    // Deterministic emoji avatar via inline SVG (no external requests → GH Pages friendly).
    const hue = randInt(0, 360);
    const svg =
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>` +
      `<rect width='100' height='100' rx='50' fill='hsl(${hue},70%,45%)'/>` +
      `<text x='50' y='68' font-size='52' text-anchor='middle'>${p.emoji}</text></svg>`;
    $("avatar").src = "data:image/svg+xml;utf8," + encodeURIComponent(svg);
  }

  function setStats() {
    const likes = randInt(1200, 90000);
    $("stat-likes").textContent = formatCount(likes);
    $("stat-rts").textContent = formatCount(randInt(200, likes / 3 | 0));
    $("stat-replies").textContent = formatCount(randInt(80, likes / 5 | 0));
    $("stat-bookmarks").textContent = formatCount(randInt(50, likes / 6 | 0));
    $("views").textContent = formatCount(randInt(200000, 5000000)) + " Views";
  }

  function generate() {
    currentText = pickTemplate();
    const el = $("tweet-text");
    el.textContent = currentText;

    setPersona();
    setStats();

    // Update share link.
    const share = "https://twitter.com/intent/tweet?text=" +
      encodeURIComponent(currentText);
    $("tweet-it").href = share;

    // Little replay animation.
    const card = $("tweet-card");
    card.classList.remove("pop");
    void card.offsetWidth; // reflow to restart animation
    card.classList.add("pop");
  }

  function copyText() {
    if (!currentText) return;
    const btn = $("copy");
    const done = () => {
      const original = btn.textContent;
      btn.textContent = "✅ Copied!";
      setTimeout(() => (btn.textContent = original), 1400);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(currentText).then(done).catch(fallbackCopy);
    } else {
      fallbackCopy();
    }
    function fallbackCopy() {
      const ta = document.createElement("textarea");
      ta.value = currentText;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); done(); } catch (e) { /* noop */ }
      document.body.removeChild(ta);
    }
  }

  // ---- Wire up ----
  document.querySelectorAll(".mode-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".mode-btn").forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      mode = btn.dataset.mode;
      generate();
    });
  });

  $("generate").addEventListener("click", generate);
  $("copy").addEventListener("click", copyText);

  // Spacebar = generate (unless focused on the share link).
  document.addEventListener("keydown", (e) => {
    if (e.code === "Space" && e.target.tagName !== "A") {
      e.preventDefault();
      generate();
    }
  });

  // First post on load.
  generate();
})();
