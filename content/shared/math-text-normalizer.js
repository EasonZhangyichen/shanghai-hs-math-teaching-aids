(function installMathTextNormalizer() {
  if (window.SHMathTextNormalizer) {
    return;
  }

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

  const skippedSelector = "script, style, textarea, [data-math-normalize='off']";

  function formatMathText(value) {
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

  function isSkipped(node) {
    const element = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
    return Boolean(element?.closest?.(skippedSelector));
  }

  function normalizeTextNode(node) {
    if (isSkipped(node)) {
      return;
    }

    const nextValue = formatMathText(node.nodeValue);
    if (nextValue !== node.nodeValue) {
      node.nodeValue = nextValue;
    }
  }

  function normalizeTree(root) {
    if (!root || isSkipped(root)) {
      return;
    }

    if (root.nodeType === Node.TEXT_NODE) {
      normalizeTextNode(root);
      return;
    }

    if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
      return;
    }

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }
    textNodes.forEach(normalizeTextNode);
  }

  const textContentDescriptor = Object.getOwnPropertyDescriptor(Node.prototype, "textContent");
  if (textContentDescriptor?.get && textContentDescriptor?.set) {
    Object.defineProperty(Node.prototype, "textContent", {
      configurable: true,
      get() {
        return textContentDescriptor.get.call(this);
      },
      set(value) {
        textContentDescriptor.set.call(this, isSkipped(this) ? value : formatMathText(value));
      },
    });
  }

  const innerHTMLDescriptor = Object.getOwnPropertyDescriptor(Element.prototype, "innerHTML");
  if (innerHTMLDescriptor?.get && innerHTMLDescriptor?.set) {
    Object.defineProperty(Element.prototype, "innerHTML", {
      configurable: true,
      get() {
        return innerHTMLDescriptor.get.call(this);
      },
      set(value) {
        innerHTMLDescriptor.set.call(this, value);
        normalizeTree(this);
      },
    });
  }

  function startObserver() {
    if (!document.body) {
      return;
    }

    normalizeTree(document.body);
    new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "characterData") {
          normalizeTextNode(mutation.target);
          return;
        }

        mutation.addedNodes.forEach(normalizeTree);
      });
    }).observe(document.body, {
      childList: true,
      characterData: true,
      subtree: true,
    });
  }

  window.SHMathTextNormalizer = {
    formatMathText,
    normalizeTree,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startObserver, { once: true });
  } else {
    startObserver();
  }
})();
