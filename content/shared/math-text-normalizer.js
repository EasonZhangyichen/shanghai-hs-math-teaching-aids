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

  const skippedSelector = "script, style, textarea, [data-math-normalize='off'], .math-frac";
  const SVG_NS = "http://www.w3.org/2000/svg";

  function installMathStyles() {
    if (document.getElementById("sh-math-text-normalizer-styles")) {
      return;
    }

    const style = document.createElement("style");
    style.id = "sh-math-text-normalizer-styles";
    style.textContent = `
      .math-frac {
        display: inline-grid;
        grid-template-rows: auto auto;
        align-items: center;
        justify-items: center;
        margin: 0 0.04em;
        vertical-align: -0.36em;
        color: inherit;
        line-height: 1;
        white-space: nowrap;
      }

      .math-frac > span:first-child {
        min-width: 1.1em;
        padding: 0 0.08em 0.07em;
        border-bottom: 1px solid currentColor;
      }

      .math-frac > span:last-child {
        padding: 0.06em 0.08em 0;
      }
    `;
    document.head.appendChild(style);
  }

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

  function buildMathFragment(value) {
    const text = formatMathText(value);
    const fragment = document.createDocumentFragment();
    const fractionPattern = /(-?)(\d*)π\/(\d+)/g;
    let cursor = 0;

    for (const match of text.matchAll(fractionPattern)) {
      const [token, sign, coefficient, denominator] = match;
      const index = match.index ?? 0;
      const numerator = `${coefficient || ""}π`;

      appendText(fragment, text.slice(cursor, index));
      appendText(fragment, sign);
      fragment.appendChild(createFractionNode({ token, numerator, denominator }));
      cursor = index + token.length;
    }

    appendText(fragment, text.slice(cursor));
    return fragment;
  }

  function appendText(parent, value) {
    if (value) {
      parent.appendChild(document.createTextNode(value));
    }
  }

  function createFractionNode({ token, numerator, denominator }) {
    const fraction = document.createElement("span");
    fraction.className = "math-frac";
    fraction.setAttribute("aria-label", token.replace(/^-/, ""));

    const numeratorNode = document.createElement("span");
    numeratorNode.textContent = numerator;
    const denominatorNode = document.createElement("span");
    denominatorNode.textContent = denominator;

    fraction.append(numeratorNode, denominatorNode);
    return fraction;
  }

  function setMathHTML(element, value) {
    if (!element) {
      return;
    }

    element.replaceChildren(buildMathFragment(value));
  }

  function normalizeRichTextNode(node) {
    if (isSkipped(node)) {
      return;
    }

    if (node.parentElement?.ownerSVGElement) {
      normalizeSvgTextNode(node);
      return;
    }

    const text = formatMathText(node.nodeValue);
    if (!/-?\d*π\/\d+/.test(text)) {
      if (text !== node.nodeValue) {
        node.nodeValue = text;
      }
      return;
    }

    node.replaceWith(buildMathFragment(text));
  }

  function normalizeSvgTextNode(node) {
    const parent = node.parentElement;
    const nextValue = formatMathText(node.nodeValue);
    const fractionMatch = nextValue.trim().match(/^(-?)(\d*)π\/(\d+)$/);

    if (!fractionMatch || parent?.tagName?.toLowerCase() !== "text") {
      if (nextValue !== node.nodeValue) {
        node.nodeValue = nextValue;
      }
      return;
    }

    if (parent.dataset?.mathSvgFrac === "true") {
      return;
    }

    const [, sign, coefficient, denominator] = fractionMatch;
    const numerator = `${coefficient || ""}π`;
    const x = Number.parseFloat(parent.getAttribute("x") || "0");
    const y = Number.parseFloat(parent.getAttribute("y") || "0");
    const anchor = parent.getAttribute("text-anchor") || "start";
    const className = parent.getAttribute("class");
    const fill = parent.getAttribute("fill");
    const transform = parent.getAttribute("transform");
    const centerOffset = anchor === "start" ? 13 : anchor === "end" ? -13 : 0;

    const group = document.createElementNS(SVG_NS, "g");
    group.setAttribute("transform", `${transform ? `${transform} ` : ""}translate(${x} ${y})`);
    group.setAttribute("aria-label", nextValue.trim().replace(/^-/, ""));
    group.dataset.mathSvgFrac = "true";

    const signNode =
      sign === "-"
        ? createSvgText({
            x: centerOffset - 19,
            y: 2,
            className,
            fill,
            text: "-",
            anchor: "middle",
          })
        : null;
    const numeratorNode = createSvgText({
      x: centerOffset,
      y: -7,
      className,
      fill,
      text: numerator,
      anchor: "middle",
    });
    const denominatorNode = createSvgText({
      x: centerOffset,
      y: 13,
      className,
      fill,
      text: denominator,
      anchor: "middle",
    });
    const bar = document.createElementNS(SVG_NS, "line");
    bar.setAttribute("x1", centerOffset - 10);
    bar.setAttribute("x2", centerOffset + 10);
    bar.setAttribute("y1", 0);
    bar.setAttribute("y2", 0);
    bar.setAttribute("stroke", fill || "#5d6c7b");
    bar.setAttribute("stroke-width", "1");

    if (className) {
      bar.setAttribute("class", className);
    }

    if (signNode) {
      group.appendChild(signNode);
    }
    group.append(numeratorNode, bar, denominatorNode);
    parent.replaceWith(group);
  }

  function createSvgText({ x, y, className, fill, text, anchor }) {
    const element = document.createElementNS(SVG_NS, "text");
    element.setAttribute("x", x);
    element.setAttribute("y", y);
    element.setAttribute("text-anchor", anchor);
    if (className) {
      element.setAttribute("class", className);
    }
    if (fill) {
      element.setAttribute("fill", fill);
    }
    element.textContent = text;
    return element;
  }

  function normalizeRichTree(root) {
    if (!root || isSkipped(root)) {
      return;
    }

    if (root.nodeType === Node.TEXT_NODE) {
      normalizeRichTextNode(root);
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
    textNodes.forEach(normalizeRichTextNode);
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
        normalizeRichTree(this);
      },
    });
  }

  function startObserver() {
    if (!document.body) {
      return;
    }

    installMathStyles();
    normalizeRichTree(document.body);
    new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "characterData") {
          normalizeRichTextNode(mutation.target);
          return;
        }

        mutation.addedNodes.forEach(normalizeRichTree);
      });
    }).observe(document.body, {
      childList: true,
      characterData: true,
      subtree: true,
    });
  }

  window.SHMathTextNormalizer = {
    buildMathFragment,
    formatMathText,
    normalizeTree,
    normalizeRichTree,
    setMathHTML,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startObserver, { once: true });
  } else {
    startObserver();
  }
})();
