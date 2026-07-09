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
      "{window}": rand(DATA.window),
      "{emoji}": rand(DATA.cryptic),
      "{year}": String(randInt(2026, 2028)),
      "{tenths}": (randInt(2, 9) / 10).toFixed(1),
      "{money}": String(randInt(20, 300))
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

  // Capitalise the first letter of the tweet and the first letter after
  // sentence-ending punctuation. Runs on the fully-filled text so it works
  // even when a template starts with a token. Leaves mid-sentence lowercase
  // (the intentional vaguepost voice), proper nouns, and ALL-CAPS intact;
  // skips decimals (0.3) and ellipses (...).
  function properCase(s) {
    s = s.replace(/\bi\b/g, "I"); // pronoun (also covers i'm, i've, i'll, i'd)
    const a = Array.from(s);
    let cap = true; // waiting to capitalise the next letter
    for (let i = 0; i < a.length; i++) {
      const c = a[i];
      if (cap) {
        if (/\p{L}/u.test(c)) { if (/\p{Ll}/u.test(c)) a[i] = c.toUpperCase(); cap = false; }
        else if (/\p{N}/u.test(c)) { cap = false; } // sentence starts with a number
        // otherwise (space, quote, emoji, punctuation): keep waiting
      }
      if (c === "." || c === "!" || c === "?") {
        const prev = a[i - 1] || "", next = a[i + 1] || "";
        if (c === "." && (prev === "." || next === ".")) continue;     // ellipsis
        if (c === "." && /\d/.test(prev) && /\d/.test(next)) continue; // decimal
        cap = true;
      }
    }
    return a.join("");
  }

  function formatCount(n) {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
    if (n >= 1000) return (n / 1000).toFixed(1) + "K";
    return String(n);
  }

  // Current avatar look, kept so the screenshot canvas can redraw it.
  let avatarHue = 0, avatarEmoji = "🏎️";

  function setPersona() {
    const p = rand(DATA.personas);
    $("display-name").textContent = p.name;
    $("handle").textContent = "@" + p.handle;
    // Deterministic emoji avatar via inline SVG (no external requests → GH Pages friendly).
    avatarHue = randInt(0, 360);
    avatarEmoji = p.emoji;
    const svg =
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>` +
      `<rect width='100' height='100' rx='50' fill='hsl(${avatarHue},70%,45%)'/>` +
      `<text x='50' y='68' font-size='52' text-anchor='middle'>${avatarEmoji}</text></svg>`;
    $("avatar").src = "data:image/svg+xml;utf8," + encodeURIComponent(svg);
  }

  function setTimestamp() {
    const r = Math.random();
    let t;
    if (r < 0.12) t = "Just now";
    else if (r < 0.30) t = randInt(5, 59) + "s";
    else if (r < 0.65) t = randInt(1, 59) + "m";
    else if (r < 0.90) t = randInt(1, 23) + "h";
    else t = randInt(1, 6) + "d";
    $("timestamp").textContent = t;
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
    currentText = properCase(pickTemplate());
    const el = $("tweet-text");
    el.textContent = currentText;

    setPersona();
    setStats();
    setTimestamp();

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

  // ---- Screenshot: redraw the tweet card onto a canvas ----
  const CARD_FONT = '"Segoe UI", system-ui, -apple-system, Roboto, Helvetica, Arial, sans-serif';
  const font = (weight, size) => `${weight} ${size}px ${CARD_FONT}`;

  function wrapText(ctx, text, maxWidth) {
    const words = text.split(" ");
    const lines = [];
    let line = "";
    for (const w of words) {
      const test = line ? line + " " + w : w;
      if (line && ctx.measureText(test).width > maxWidth) { lines.push(line); line = w; }
      else line = test;
    }
    if (line) lines.push(line);
    return lines;
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function buildCardCanvas() {
    const S = 2, W = 600, PAD = 24, LINE_H = 34;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    ctx.font = font(500, 26);
    const lines = wrapText(ctx, currentText, W - PAD * 2);

    const textTop = PAD + 48 + 16;
    const textBottom = textTop + lines.length * LINE_H;
    const metaY = textBottom + 20;
    const sepY = metaY + 14;
    const statsY = sepY + 28;
    const H = statsY + 20;

    canvas.width = W * S;
    canvas.height = H * S;
    ctx.scale(S, S);
    ctx.textBaseline = "alphabetic";

    // card background
    roundRect(ctx, 0.5, 0.5, W - 1, H - 1, 16);
    ctx.fillStyle = "#16161e"; ctx.fill();
    ctx.strokeStyle = "#2a2a35"; ctx.lineWidth = 1; ctx.stroke();

    // avatar
    ctx.save();
    ctx.beginPath();
    ctx.arc(PAD + 24, PAD + 24, 24, 0, Math.PI * 2);
    ctx.fillStyle = `hsl(${avatarHue},70%,45%)`; ctx.fill();
    ctx.font = font(400, 28); ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText(avatarEmoji, PAD + 24, PAD + 26);
    ctx.restore();

    // name + verified + handle
    const nameX = PAD + 48 + 12;
    ctx.textAlign = "left"; ctx.textBaseline = "alphabetic";
    ctx.font = font(700, 17); ctx.fillStyle = "#f3f3f5";
    const name = $("display-name").textContent;
    ctx.fillText(name, nameX, PAD + 20);
    const nameW = ctx.measureText(name).width;
    ctx.fillStyle = "#1d9bf0"; ctx.font = font(700, 14);
    ctx.fillText("✔", nameX + nameW + 5, PAD + 20);
    ctx.font = font(400, 15); ctx.fillStyle = "#8a8a97";
    ctx.fillText($("handle").textContent, nameX, PAD + 40);

    // X logo (top-right)
    ctx.font = font(700, 22); ctx.fillStyle = "#f3f3f5"; ctx.textAlign = "right";
    ctx.fillText("𝕏", W - PAD, PAD + 26);
    ctx.textAlign = "left";

    // tweet text
    ctx.font = font(500, 26); ctx.fillStyle = "#f3f3f5";
    lines.forEach((ln, i) => ctx.fillText(ln, PAD, textTop + 26 + i * LINE_H));

    // meta line
    ctx.font = font(400, 15); ctx.fillStyle = "#8a8a97";
    ctx.fillText($("timestamp").textContent + " · " + $("views").textContent, PAD, metaY);

    // separator
    ctx.strokeStyle = "#2a2a35"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(PAD, sepY); ctx.lineTo(W - PAD, sepY); ctx.stroke();

    // stats row
    ctx.font = font(400, 15); ctx.fillStyle = "#8a8a97";
    const stats = [
      "💬 " + $("stat-replies").textContent,
      "🔁 " + $("stat-rts").textContent,
      "❤️ " + $("stat-likes").textContent,
      "🔖 " + $("stat-bookmarks").textContent
    ];
    const colW = (W - PAD * 2) / 4;
    stats.forEach((s, i) => ctx.fillText(s, PAD + i * colW, statsY));

    return canvas;
  }

  function copyScreenshot() {
    const btn = $("copy-shot");
    const original = btn.dataset.label || btn.textContent;
    btn.dataset.label = original;
    const done = (msg) => { btn.textContent = msg; setTimeout(() => (btn.textContent = original), 1600); };
    const canvas = buildCardCanvas();
    const toBlob = () => new Promise((res) => canvas.toBlob(res, "image/png"));

    // Preferred: copy image to clipboard. Pass a Promise<Blob> to ClipboardItem
    // synchronously so Safari keeps it inside the user gesture.
    if (navigator.clipboard && window.ClipboardItem) {
      try {
        const item = new ClipboardItem({ "image/png": toBlob() });
        navigator.clipboard.write([item]).then(() => done("✅ Copied!")).catch(download);
        return;
      } catch (e) { /* fall through to download */ }
    }
    download();

    function download() {
      toBlob().then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url; a.download = "f1-vaguepost.png";
        document.body.appendChild(a); a.click(); a.remove();
        URL.revokeObjectURL(url);
        done("⬇️ Saved image");
      });
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
  $("copy-shot").addEventListener("click", copyScreenshot);

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
