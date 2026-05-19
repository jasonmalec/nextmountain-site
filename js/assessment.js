/* ============================================================
   NMRA — Assessment flow
   Steps: intro (email capture) -> questions -> submitting -> results.html
   v0.1 · May 13, 2026
   ============================================================ */

// CONFIG — replace with your real endpoint before going live.
// Formspree, ConvertKit, or your own webhook all work. The MVP
// posts a JSON payload and falls through gracefully if unreachable.
const CONFIG = {
  formEndpoint: "https://formspree.io/f/REPLACE_ME",
  resultsPage: "results.html",
};

// Inject data.js by loading it inline before this script in HTML,
// or via dynamic load if data.js is missing.
(function loadDataIfNeeded() {
  if (window.NMRA_DATA) return;
  const s = document.createElement("script");
  s.src = "js/data.js";
  s.onload = init;
  document.head.appendChild(s);
})();

if (window.NMRA_DATA) init();

function init() {
  const D = window.NMRA_DATA;
  if (!D) return;

  // ---------- State ----------
  const state = {
    reader: {},
    answers: {}, // keyed by `${dimensionId}_${questionIndex}` -> 1..5
  };

  // ---------- Step nav helpers ----------
  function showStep(id) {
    document.querySelectorAll(".step").forEach(s => s.classList.remove("active"));
    const target = document.getElementById(id);
    if (target) {
      target.classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  // ---------- Step 1: intro form ----------
  const introForm = document.getElementById("intro-form");
  introForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(introForm);
    state.reader = {
      firstName: (fd.get("firstName") || "").trim(),
      lastName:  (fd.get("lastName")  || "").trim(),
      email:     (fd.get("email")     || "").trim(),
      role:      fd.get("role") || "",
      orgSize:   fd.get("orgSize") || "",
      organization: (fd.get("organization") || "").trim(),
    };
    if (!state.reader.firstName || !state.reader.email) return;
    renderQuestions();
    showStep("step-questions");
  });

  // ---------- Step 2: render questions ----------
  const container = document.getElementById("questions-container");
  const totalQuestions = D.dimensions.reduce((n, d) => n + d.questions.length, 0);
  document.getElementById("progress-total").textContent = totalQuestions;

  function renderQuestions() {
    container.innerHTML = "";
    D.dimensions.forEach((dim, di) => {
      const dh = document.createElement("h2");
      dh.className = "dimension-header";
      dh.textContent = `${di + 1}. ${dim.name}`;
      container.appendChild(dh);

      const dp = document.createElement("p");
      dp.className = "dimension-prompt";
      dp.textContent = dim.prompt;
      container.appendChild(dp);

      dim.questions.forEach((q, qi) => {
        const wrap = document.createElement("div");
        wrap.className = "question";
        wrap.dataset.dim = dim.id;
        wrap.dataset.q = qi;
        wrap.dataset.reversed = q.reversed ? "1" : "0";

        const text = document.createElement("p");
        text.className = "question-text" + (q.reversed ? " reversed" : "");
        text.textContent = q.text;
        wrap.appendChild(text);

        const likert = document.createElement("div");
        likert.className = "likert";
        const labels = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"];
        for (let v = 1; v <= 5; v++) {
          const opt = document.createElement("label");
          opt.className = "likert-option";
          opt.innerHTML = `
            <span class="num">${v}</span>
            <span class="label">${labels[v-1]}</span>
            <input type="radio" name="${dim.id}_${qi}" value="${v}" />
          `;
          opt.addEventListener("click", () => {
            // Mark selected
            likert.querySelectorAll(".likert-option").forEach(o => o.classList.remove("selected"));
            opt.classList.add("selected");
            opt.querySelector("input").checked = true;
            state.answers[`${dim.id}_${qi}`] = v;
            updateProgress();
          });
          likert.appendChild(opt);
        }
        wrap.appendChild(likert);
        container.appendChild(wrap);
      });
    });
  }

  function updateProgress() {
    const answered = Object.keys(state.answers).length;
    const total = totalQuestions;
    const pct = Math.round((answered / total) * 100);
    document.getElementById("progress-fill").style.width = pct + "%";
    document.getElementById("progress-current").textContent = answered;
    document.getElementById("submit-btn").disabled = (answered < total);
  }

  // ---------- Step 3: submit ----------
  document.getElementById("submit-btn").addEventListener("click", async () => {
    showStep("step-submitting");
    const results = computeResults();
    const payload = { reader: state.reader, answers: state.answers, results };

    // Fire-and-forget POST. If endpoint not configured, skip silently.
    if (CONFIG.formEndpoint && !CONFIG.formEndpoint.includes("REPLACE_ME")) {
      try {
        await fetch(CONFIG.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch (err) { /* non-blocking */ }
    }

    // Encode results into the URL so the report is regenerable + shareable.
    const params = encodeResultsToParams(payload);
    setTimeout(() => {
      window.location.href = `${CONFIG.resultsPage}#${params}`;
    }, 800);
  });

  function computeResults() {
    const dims = D.dimensions.map((dim) => {
      let score = 0;
      dim.questions.forEach((q, qi) => {
        const raw = state.answers[`${dim.id}_${qi}`];
        if (raw != null) score += D.scoring.scoreItem(raw, q.reversed);
      });
      return { id: dim.id, name: dim.name, score, band: D.scoring.band(score) };
    });
    const total = dims.reduce((n, d) => n + d.score, 0);
    const zone = D.scoring.zoneFor(total);
    return { total, zone: zone ? zone.name : "—", dimensions: dims };
  }

  function encodeResultsToParams(payload) {
    // Compact: name|email|d1:d2:d3:...:d8 (scores)
    const r = payload.reader;
    const scores = payload.results.dimensions.map(d => d.score).join(":");
    const obj = {
      n: r.firstName,
      e: r.email,
      s: scores,
    };
    return Object.entries(obj)
      .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
      .join("&");
  }
}
