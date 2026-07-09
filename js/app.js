/* F1 Vaguepost Generator — logic. */

(function () {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  let mode = "mixed";
  let vagueLevel = 3;
  let currentText = "";

  // Optional focus filters. Empty set = no filter (use everyone).
  const selected = { drivers: new Set(), teams: new Set() };
  const poolFor = (key, all) => (selected[key].size ? [...selected[key]] : all);

  const VAGUE_LABELS = {
    1: "Barely subtle",
    2: "Naming names",
    3: "A shape, no name",
    4: "Gesturing at nothing",
    5: "Pure cryptic void"
  };

  /* Resolve {tokens} in a template. Two distinct drivers guaranteed for
     templates that reference both {driver} and {driver2}. */
  function fill(template) {
    const driverPool = poolFor("drivers", DATA.drivers);
    const driver = rand(driverPool);
    // For a distinct second driver, fall back to the full grid if the
    // focused pool has fewer than two names.
    const secondPool = driverPool.length >= 2 ? driverPool : DATA.drivers;
    let driver2 = rand(secondPool);
    while (driver2 === driver) driver2 = rand(secondPool);

    // Same distinct-pair logic for teams (some templates name two teams).
    const teamPool = poolFor("teams", DATA.teams);
    const team = rand(teamPool);
    const secondTeamPool = teamPool.length >= 2 ? teamPool : DATA.teams;
    let team2 = rand(secondTeamPool);
    while (team2 === team) team2 = rand(secondTeamPool);

    const map = {
      "{driver}": driver,
      "{driver2}": driver2,
      "{team}": team,
      "{team2}": team2,
      "{nationality}": rand(DATA.nationalities),
      "{gp}": rand(DATA.grandsPrix),
      "{journalist}": rand(DATA.journalists),
      "{sponsor}": rand(DATA.sponsors),
      "{bodyPart}": rand(DATA.bodyParts),
      "{vibe}": rand(DATA.vibes),
      "{timeframe}": rand(DATA.timeframes),
      "{emoji}": rand(DATA.cryptic),
      "{year}": String(randInt(2026, 2028)),
      "{tenths}": (randInt(2, 9) / 10).toFixed(1),
      "{money}": String(randInt(20, 300)),
      "{age}": String(randInt(16, 19))
    };

    // Resolve iteratively so tokens nested inside a value (e.g. a timeframe
    // that contains {gp}) also get filled. Capped to avoid any runaway loop.
    let out = template;
    for (let i = 0; i < 4 && /\{[a-zA-Z0-9]+\}/.test(out); i++) {
      out = out.replace(/\{[a-zA-Z0-9]+\}/g, (t) => map[t] ?? t);
    }
    return out;
  }

  // Pick a vaguepost at (or nearest to) the requested vagueness level.
  function pickVaguepost(level) {
    let bucket = DATA.vagueposts.filter((v) => v.vague === level);
    // Widen outward if a level is ever under-stocked.
    for (let d = 1; bucket.length === 0 && d < 5; d++) {
      bucket = DATA.vagueposts.filter(
        (v) => v.vague === level - d || v.vague === level + d
      );
    }
    return rand(bucket).text;
  }

  function pickTemplate() {
    if (mode === "rumour") return fill(rand(DATA.rumours));
    if (mode === "vague") return fill(pickVaguepost(vagueLevel));
    // mixed: weight slightly toward vagueposts, they're the funnier ones.
    if (Math.random() < 0.55) return fill(rand(DATA.vagueposts).text);
    return fill(rand(DATA.rumours));
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
      $("vague-control").classList.toggle("hidden", mode !== "vague");
      generate();
    });
  });

  const slider = $("vague-slider");
  slider.addEventListener("input", () => {
    vagueLevel = Number(slider.value);
    $("vague-level-text").textContent = VAGUE_LABELS[vagueLevel];
  });
  // Regenerate once the user settles on a value (avoids spamming while dragging).
  slider.addEventListener("change", generate);

  $("generate").addEventListener("click", generate);
  $("copy").addEventListener("click", copyText);

  // ---- Focus filter chips ----
  function updateFocusSummary() {
    const d = selected.drivers.size;
    const t = selected.teams.size;
    const parts = [];
    if (d) parts.push(d + (d === 1 ? " driver" : " drivers"));
    if (t) parts.push(t + (t === 1 ? " team" : " teams"));
    $("focus-summary").textContent = parts.length ? parts.join(" · ") : "Everyone";
  }

  function buildChips(containerId, items, key) {
    const container = $(containerId);
    items.forEach((item) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chip";
      chip.textContent = item;
      chip.setAttribute("aria-pressed", "false");
      chip.addEventListener("click", () => {
        if (selected[key].has(item)) {
          selected[key].delete(item);
          chip.classList.remove("on");
          chip.setAttribute("aria-pressed", "false");
        } else {
          selected[key].add(item);
          chip.classList.add("on");
          chip.setAttribute("aria-pressed", "true");
        }
        updateFocusSummary();
        generate();
      });
      container.appendChild(chip);
    });
  }

  buildChips("driver-chips", DATA.drivers, "drivers");
  buildChips("team-chips", DATA.teams, "teams");

  document.querySelectorAll(".focus-clear").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.clear;
      selected[key].clear();
      document.querySelectorAll(`#${key === "drivers" ? "driver" : "team"}-chips .chip`)
        .forEach((c) => {
          c.classList.remove("on");
          c.setAttribute("aria-pressed", "false");
        });
      updateFocusSummary();
      generate();
    });
  });

  // Spacebar = generate (unless focused on the share link).
  const INTERACTIVE = ["A", "BUTTON", "INPUT", "SUMMARY", "TEXTAREA"];
  document.addEventListener("keydown", (e) => {
    if (e.code === "Space" && !INTERACTIVE.includes(e.target.tagName)) {
      e.preventDefault();
      generate();
    }
  });

  // First post on load.
  generate();
})();
