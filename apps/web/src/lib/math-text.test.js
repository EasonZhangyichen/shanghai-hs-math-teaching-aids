import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { formatMathText, renderMathText } from "./math-text.js";

function mathFrac(label, numerator, denominator) {
  return `<span class="math-frac" aria-label="${label}"><span>${numerator}</span><span>${denominator}</span></span>`;
}

describe("formatMathText", () => {
  it("renders common trigonometry notation as readable math symbols", () => {
    assert.equal(
      formatMathText("theta, sin theta, cos theta, 2pi, pi/2, 3pi/2"),
      "θ, sin θ, cos θ, 2π, π/2, 3π/2",
    );
  });

  it("renders transformation parameters and simple powers", () => {
    assert.equal(formatMathText("T = 2pi / omega; phi = pi/2; a^2 + b^{2}"), "T = 2π / ω; φ = π/2; a² + b²");
  });

  it("renders relation symbols in domain statements", () => {
    assert.equal(formatMathText("x != pi/2 + kpi, k in Z"), "x ≠ π/2 + kπ, k ∈ Z");
  });

  it("escapes html after formatting math text for UI rendering", () => {
    assert.equal(renderMathText("<theta> & pi"), "&lt;θ&gt; &amp; π");
  });

  it("renders simple pi fractions as vertical inline math markup", () => {
    assert.equal(
      renderMathText("x != pi/2 + kpi，区间 (-pi/2, pi/2)"),
      [
        "x ≠ ",
        mathFrac("π/2", "π", "2"),
        " + kπ，区间 (-",
        mathFrac("π/2", "π", "2"),
        ", ",
        mathFrac("π/2", "π", "2"),
        ")",
      ].join(""),
    );
  });

  it("renders normalized period and phase slash fractions as vertical inline math markup", () => {
    assert.equal(
      renderMathText("T = 2pi / omega；相移 = -phi/omega；关键角 pi/2, 3pi/2, kpi"),
      [
        "T = ",
        mathFrac("2π/ω", "2π", "ω"),
        "；相移 = -",
        mathFrac("φ/ω", "φ", "ω"),
        "；关键角 ",
        mathFrac("π/2", "π", "2"),
        ", ",
        mathFrac("3π/2", "3π", "2"),
        ", kπ",
      ].join(""),
    );
  });
});
