import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const tokensPath = fileURLToPath(new URL("../src/styles/tokens.css", import.meta.url));
const css = readFileSync(tokensPath, "utf8");

function extractBlock(source, selector) {
  const start = source.indexOf(selector);
  if (start === -1) throw new Error(`Selector no encontrado: ${selector}`);
  const braceStart = source.indexOf("{", start);
  const braceEnd = source.indexOf("}", braceStart);
  return source.slice(braceStart + 1, braceEnd);
}

function parseVars(block) {
  const vars = {};
  for (const match of block.matchAll(/--([a-z0-9-]+):\s*([^;]+);/g)) {
    vars[match[1].trim()] = match[2].trim();
  }
  return vars;
}

function resolve(vars, rawValue) {
  const refMatch = rawValue.match(/^var\(--([a-z0-9-]+)\)$/);
  if (refMatch) return resolve(vars, vars[refMatch[1]]);
  return rawValue;
}

const rootVars = parseVars(extractBlock(css, ":root"));
const lightVars = { ...rootVars, ...parseVars(extractBlock(css, '[data-theme="light"]')) };

function hexToRgb(hex) {
  const value = hex.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(value.slice(i, i + 2), 16));
}

function relativeLuminance([r, g, b]) {
  const channel = (c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  const [rl, gl, bl] = [r, g, b].map(channel);
  return 0.2126 * rl + 0.7152 * gl + 0.0722 * bl;
}

function contrastRatio(hexA, hexB) {
  const lumA = relativeLuminance(hexToRgb(hexA));
  const lumB = relativeLuminance(hexToRgb(hexB));
  const [lighter, darker] = lumA > lumB ? [lumA, lumB] : [lumB, lumA];
  return (lighter + 0.05) / (darker + 0.05);
}

const pairs = [
  ["texto / fondo", "c-text", "c-bg", 4.5],
  ["texto secundario / fondo", "c-text-muted", "c-bg", 4.5],
  ["texto / superficie", "c-text", "c-surface", 4.5],
  ["texto secundario / superficie", "c-text-muted", "c-surface", 4.5],
  ["texto secundario / superficie alta", "c-text-muted", "c-surface-high", 4.5],
  ["acento (enlace) / fondo", "c-accent", "c-bg", 4.5],
  ["acento (enlace) / superficie", "c-accent", "c-surface", 4.5],
  ["texto sobre acento (botón)", "c-on-accent", "c-accent", 4.5],
  ["borde fuerte / fondo", "c-line-strong", "c-bg", 3],
  ["tinta / papel", "c-ink", "c-paper", 4.5],
  ["tinta suave / papel", "c-ink-muted", "c-paper", 4.5],
  ["éxito / superficie", "c-success", "c-surface", 4.5],
  ["error / superficie", "c-error", "c-surface", 4.5],
];

let failed = false;

for (const themeName of ["oscuro", "claro"]) {
  const vars = themeName === "oscuro" ? rootVars : lightVars;
  console.log(`\nTema ${themeName}:`);
  for (const [label, fgKey, bgKey, minRatio] of pairs) {
    const fg = resolve(vars, vars[fgKey]);
    const bg = resolve(vars, vars[bgKey]);
    const ratio = contrastRatio(fg, bg);
    const pass = ratio >= minRatio;
    if (!pass) failed = true;
    const status = pass ? "OK" : "FALLA";
    console.log(
      `  [${status}] ${label}: ${ratio.toFixed(2)}:1 (mínimo ${minRatio}:1), ${fg} sobre ${bg}`
    );
  }
}

if (failed) {
  console.error("\nContraste insuficiente en uno o más pares. Ajusta los tokens.");
  process.exit(1);
} else {
  console.log("\nTodos los pares cumplen WCAG AA.");
}
