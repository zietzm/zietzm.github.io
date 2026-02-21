const trueProbInput = document.getElementById("trueProb");
const impliedProbInput = document.getElementById("impliedProb");
const errorEl = document.getElementById("error");

const kellyPercentEl = document.getElementById("kellyPercent");
const halfKellyPercentEl = document.getElementById("halfKellyPercent");
const quarterKellyPercentEl = document.getElementById("quarterKellyPercent");
const heatmapCanvas = document.getElementById("kellyHeatmap");
const heatmapTooltip = document.getElementById("heatmapTooltip");
const heatmapHoverEl = document.getElementById("heatmapHover");
const heatmapCtx = heatmapCanvas.getContext("2d");

const HEATMAP_TRUE_MIN = 0;
const HEATMAP_TRUE_MAX = 100;
const HEATMAP_IMPLIED_MIN = 0;
const HEATMAP_IMPLIED_MAX = 99;

function formatDirectionalPercent(value) {
  const absPercent = `${(Math.abs(value) * 100).toFixed(1)}%`;
  if (value > 0) return `Long ${absPercent}`;
  if (value < 0) return `Short ${absPercent}`;
  return `Flat ${absPercent}`;
}

function calculateKellyFraction(p, implied) {
  if (p > implied) {
    return (p - implied) / (1 - implied);
  }
  if (p < implied) {
    // Size shorts via the complementary market (NO side), then map back to "Short".
    return -((implied - p) / implied);
  }
  return 0;
}

function setRowValues(percentEl, value) {
  percentEl.textContent = formatDirectionalPercent(value);
}

function clearValues() {
  [kellyPercentEl, halfKellyPercentEl, quarterKellyPercentEl].forEach((el) => {
    el.textContent = "-";
  });
}

function calculate() {
  const pPercent = Number.parseFloat(trueProbInput.value);
  const impliedPercent = Number.parseFloat(impliedProbInput.value);

  if (!Number.isFinite(pPercent) || !Number.isFinite(impliedPercent)) {
    errorEl.textContent = "Enter numeric values for both probabilities.";
    clearValues();
    return;
  }

  if (pPercent < 0 || pPercent > 100 || impliedPercent < 0 || impliedPercent >= 100) {
    errorEl.textContent = "Use p in [0, 100] and implied probability in [0, 100).";
    clearValues();
    return;
  }

  const p = pPercent / 100;
  const implied = impliedPercent / 100;
  const kelly = calculateKellyFraction(p, implied);

  const halfKelly = kelly / 2;
  const quarterKelly = kelly / 4;

  errorEl.textContent = "";
  setRowValues(kellyPercentEl, kelly);
  setRowValues(halfKellyPercentEl, halfKelly);
  setRowValues(quarterKellyPercentEl, quarterKelly);
}

function colorForKelly(kelly) {
  const magnitude = Math.min(Math.abs(kelly), 1);
  const lightness = 94 - magnitude * 46;
  if (kelly > 0) return `hsl(145 62% ${lightness}%)`;
  if (kelly < 0) return `hsl(8 74% ${lightness}%)`;
  return "hsl(210 15% 90%)";
}

function drawHeatmap() {
  for (let impliedPct = HEATMAP_IMPLIED_MIN; impliedPct <= HEATMAP_IMPLIED_MAX; impliedPct += 1) {
    for (let truePct = HEATMAP_TRUE_MIN; truePct <= HEATMAP_TRUE_MAX; truePct += 1) {
      const p = truePct / 100;
      const implied = impliedPct / 100;
      const kelly = calculateKellyFraction(p, implied);

      heatmapCtx.fillStyle = colorForKelly(kelly);
      heatmapCtx.fillRect(
        truePct - HEATMAP_TRUE_MIN,
        impliedPct - HEATMAP_IMPLIED_MIN,
        1,
        1,
      );
    }
  }
}

function hideHeatmapTooltip() {
  heatmapTooltip.setAttribute("aria-hidden", "true");
}

function showHeatmapTooltip(clientX, clientY, truePct, impliedPct, kelly) {
  heatmapTooltip.innerHTML = `True: <b>${truePct}%</b><br>Implied: <b>${impliedPct}%</b><br>Kelly: <b>${formatDirectionalPercent(kelly)}</b>`;
  heatmapTooltip.style.left = `${clientX + 12}px`;
  heatmapTooltip.style.top = `${clientY + 12}px`;
  heatmapTooltip.setAttribute("aria-hidden", "false");
}

function onHeatmapHover(event) {
  const rect = heatmapCanvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const truePct = Math.floor((x / rect.width) * heatmapCanvas.width);
  const impliedPct = Math.floor((y / rect.height) * heatmapCanvas.height);

  if (
    truePct < HEATMAP_TRUE_MIN ||
    truePct > HEATMAP_TRUE_MAX ||
    impliedPct < HEATMAP_IMPLIED_MIN ||
    impliedPct > HEATMAP_IMPLIED_MAX
  ) {
    hideHeatmapTooltip();
    heatmapHoverEl.textContent = "Hover the chart to inspect a point.";
    return;
  }

  const kelly = calculateKellyFraction(truePct / 100, impliedPct / 100);
  showHeatmapTooltip(event.clientX, event.clientY, truePct, impliedPct, kelly);
  heatmapHoverEl.textContent = `True ${truePct}% · Implied ${impliedPct}% · Kelly ${formatDirectionalPercent(kelly)}`;
}

heatmapCanvas.addEventListener("mousemove", onHeatmapHover);
heatmapCanvas.addEventListener("mouseleave", () => {
  hideHeatmapTooltip();
  heatmapHoverEl.textContent = "Hover the chart to inspect a point.";
});

trueProbInput.addEventListener("input", calculate);
impliedProbInput.addEventListener("input", calculate);

drawHeatmap();
calculate();
