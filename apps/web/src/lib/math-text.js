const GREEK_SYMBOLS = new Map([
  ["alpha", "α"],
  ["Alpha", "Α"],
  ["beta", "β"],
  ["Beta", "Β"],
  ["gamma", "γ"],
  ["Gamma", "Γ"],
  ["theta", "θ"],
  ["Theta", "Θ"],
  ["omega", "ω"],
  ["Omega", "Ω"],
  ["phi", "φ"],
  ["Phi", "Φ"],
]);

export function formatMathText(value) {
  let text = String(value ?? "");

  text = text.replace(/\b(alpha|Alpha|beta|Beta|gamma|Gamma|theta|Theta|omega|Omega|phi|Phi)\b/g, (match) =>
    GREEK_SYMBOLS.get(match),
  );
  text = text.replace(/([+-]?\d*)k\s*pi\b/g, "$1kπ");
  text = text.replace(/([+-]?\d+(?:\.\d+)?)\s*pi\b/g, "$1π");
  text = text.replace(/\bpi\b/g, "π");
  text = text.replace(/\^\{2\}|\^2\b/g, "²");
  text = text.replace(/\^\{3\}|\^3\b/g, "³");
  text = text.replace(/!=/g, "≠");
  text = text.replace(/<=/g, "≤");
  text = text.replace(/>=/g, "≥");
  text = text.replace(/->/g, "→");
  text = text.replace(/\b([A-Za-z])\s+in\s+Z\b/g, "$1 ∈ Z");
  text = text.replace(/\bin\s+Z\b/g, "∈ Z");

  return text;
}

export function renderMathText(value) {
  return escapeHtml(formatMathText(value));
}

export function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return entities[character];
  });
}
