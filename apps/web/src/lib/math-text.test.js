import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { formatMathText, renderMathText } from "./math-text.js";

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
});
