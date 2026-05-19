/* ============================================================
   NMRA — Results renderer
   Reads scores from URL hash, renders the personalized report.
   v0.1 · May 13, 2026
   ============================================================ */

(function loadDataIfNeeded() {
  if (window.NMRA_DATA) return render();
  const s = document.createElement("script");
  s.src = "js/data.js";
  s.onload = render;
  document.head.appendChild(s);
})();

function render() {
  const D = window.NMRA_DATA;
  if (!D) return;

  // ---------- Parse URL hash ----------
  const hash = (window.location.hash || "").replace(/^#/, "");
  const params = new URLSearchParams(hash);
  const name = params.get("n") || "";
  const email = params.get("e") || "";
  const scoresRaw = params.get("s") || "";
  const scores = scoresRaw.split(":").map(s => Number(s));

  // Validate
  if (scores.length !== D.dimensions.length || scores.some(n => isNaN(n))) {
    document.getElementById("loading").innerHTML = `
      <p class="kicker">Report unavailable</p>
      <h1>We can’t find that report.</h1>
      <p>It looks like the URL is incomplete. <a href="assessment.html">Take the assessment again</a> to generate a fresh report.</p>
    `;
    return;
  }

  // ---------- Build dimension records ----------
  const dims = D.dimensions.map((dim, i) => ({
    id: dim.id,
    name: dim.name,
    score: scores[i],
    band: D.scoring.band(scores[i]),
    diagnostic: dim.diagnostics[D.scoring.band(scores[i])],
  }));
  const total = dims.reduce((n, d) => n + d.score, 0);
  const zone = D.scoring.zoneFor(total);

  // Strongest + growth (lowest)
  const sortedDesc = [...dims].sort((a, b) => b.score - a.score);
  const top = sortedDesc[0];
  const bottom = sortedDesc[sortedDesc.length - 1];

  // ---------- Render ----------
  document.getElementById("loading").classList.add("hidden");
  document.getElementById("report").classList.remove("hidden");

  document.getElementById("zone-name").textContent = zone ? zone.name : "—";
  document.getElementById("zone-diagnostic").textContent = zone ? zone.diagnostic : "";
  document.getElementById("reader-name").textContent = name || "you";
  document.getElementById("total-score").textContent = total;

  document.getElementById("top-dimension").textContent = top.name;
  document.getElementById("top-diagnostic").textContent = top.diagnostic;
  document.getElementById("bottom-dimension").textContent = bottom.name;
  document.getElementById("bottom-diagnostic").textContent = bottom.diagnostic;
  document.getElementById("email-display").textContent = email || "your inbox";

  // Eight-dimension bars
  const bars = document.getElementById("dimension-bars");
  bars.innerHTML = "";
  dims.forEach((d) => {
    const row = document.createElement("div");
    row.className = "bar-row";
    const pct = Math.round((d.score / 15) * 100);
    row.innerHTML = `
      <div class="bar-label">${d.name}</div>
      <div class="bar-track"><div class="bar-fill ${d.band}" style="width: 0%"></div></div>
      <div class="bar-score">${d.score} / 15</div>
    `;
    bars.appendChild(row);
    // Animate next tick
    requestAnimationFrame(() => {
      row.querySelector(".bar-fill").style.width = pct + "%";
    });
  });

  // Update page title with zone
  if (zone) {
    document.title = `${zone.name} — Your Next Mountain Readiness Report`;
  }
}
