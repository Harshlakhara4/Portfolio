/**
 * Automated responsive audit using Playwright (Chromium).
 *
 * Usage:
 *   1) In one terminal:  npm run build && npm run start -- -p 3062
 *   2) In another:       BASE_URL=http://localhost:3062 node scripts/responsive-check.mjs
 *
 * Checks, at every target viewport:
 *   - no unintended horizontal overflow (documentElement.scrollWidth vs clientWidth)
 *   - no browser console errors
 * Plus an interaction pass (mobile menu, case-study modal, inquiry modal, FAQ)
 * at 390px, re-checking overflow in each open state.
 *
 * Screenshots are written to $SCREENS_DIR (default ./.responsive-screens).
 */
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const BASE_URL = process.env.BASE_URL || "http://localhost:3062";
const SCREENS_DIR = process.env.SCREENS_DIR || path.resolve(".responsive-screens");
fs.mkdirSync(SCREENS_DIR, { recursive: true });

const viewports = [
  { name: "mobile-320", width: 320, height: 640 },
  { name: "mobile-360", width: 360, height: 800 },
  { name: "mobile-390", width: 390, height: 844 },
  { name: "mobile-430", width: 430, height: 932 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "tabletland-1024", width: 1024, height: 768 },
  { name: "laptop-1280", width: 1280, height: 800 },
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "desktop-1920", width: 1920, height: 1080 },
];

async function overflow(page) {
  return page.evaluate(() => {
    const de = document.documentElement;
    return {
      scrollW: de.scrollWidth,
      clientW: de.clientWidth,
      overflowBy: de.scrollWidth - de.clientWidth,
    };
  });
}

/** Find the element(s) wider than the viewport, for diagnosis. */
async function overflowCulprits(page) {
  return page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const bad = [];
    for (const el of Array.from(document.querySelectorAll("*"))) {
      const r = el.getBoundingClientRect();
      if (r.right > vw + 1.5 || r.left < -1.5) {
        bad.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.className || "").toString().slice(0, 70),
          right: Math.round(r.right),
          left: Math.round(r.left),
        });
      }
    }
    return bad.slice(0, 8);
  });
}

const results = [];
let failures = 0;

const browser = await chromium.launch();

for (const vp of viewports) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
    reducedMotion: "reduce", // make screenshots deterministic
  });
  const page = await context.newPage();
  const consoleErrors = [];
  page.on("console", (m) => {
    if (m.type() === "error") consoleErrors.push(m.text());
  });
  page.on("pageerror", (e) => consoleErrors.push("pageerror: " + e.message));

  await page.goto(BASE_URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(400);

  const o = await overflow(page);
  const culprits = o.overflowBy > 1 ? await overflowCulprits(page) : [];
  await page.screenshot({
    path: path.join(SCREENS_DIR, `${vp.name}.png`),
    fullPage: false,
  });

  const ok = o.overflowBy <= 1 && consoleErrors.length === 0;
  if (!ok) failures++;
  results.push({
    viewport: vp.name,
    w: vp.width,
    overflowBy: o.overflowBy,
    consoleErrors: consoleErrors.length,
    culprits,
    firstErrors: consoleErrors.slice(0, 3),
  });
  await context.close();
}

// ---- Interaction pass at 390px ----
const interactions = [];
{
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto(BASE_URL, { waitUntil: "networkidle" });

  async function step(name, fn) {
    try {
      await fn();
      await page.waitForTimeout(450);
      const o = await overflow(page);
      const culprits = o.overflowBy > 1 ? await overflowCulprits(page) : [];
      await page.screenshot({
        path: path.join(SCREENS_DIR, `interact-${name}.png`),
      });
      const ok = o.overflowBy <= 1;
      if (!ok) failures++;
      interactions.push({ step: name, overflowBy: o.overflowBy, ok, culprits });
    } catch (e) {
      failures++;
      interactions.push({ step: name, error: String(e).slice(0, 120) });
    }
  }

  await step("mobile-menu-open", async () => {
    await page.click('button[aria-label="Open menu"]');
  });
  await step("mobile-menu-closed", async () => {
    await page.keyboard.press("Escape");
  });
  await step("case-study-modal", async () => {
    await page.click('button[aria-label^="Explore project"]');
  });
  await step("case-study-closed", async () => {
    await page.keyboard.press("Escape");
  });
  await step("inquiry-modal", async () => {
    await page.click("text=Get a Custom Quote");
  });
  await step("inquiry-modal-filled", async () => {
    // simulate typing to ensure the keyboard-height/scroll case is sane
    const name = page.locator('[role="dialog"] input').first();
    await name.fill("Test Client");
  });
  await step("inquiry-closed", async () => {
    await page.keyboard.press("Escape");
  });
  await step("faq-open", async () => {
    await page.click("#faq button[aria-expanded]");
  });

  await context.close();
}

await browser.close();

// ---- Report ----
console.log("\n=== VIEWPORT AUDIT (" + BASE_URL + ") ===");
for (const r of results) {
  const flag = r.overflowBy <= 1 && r.consoleErrors === 0 ? "OK " : "FAIL";
  console.log(
    `[${flag}] ${r.viewport.padEnd(16)} overflowX=${String(r.overflowBy).padStart(4)}px  consoleErrors=${r.consoleErrors}`,
  );
  if (r.culprits.length) console.log("        culprits:", JSON.stringify(r.culprits));
  if (r.firstErrors.length) console.log("        errors:", JSON.stringify(r.firstErrors));
}
console.log("\n=== INTERACTION PASS (390px) ===");
for (const it of interactions) {
  if (it.error) console.log(`[FAIL] ${it.step.padEnd(22)} ${it.error}`);
  else
    console.log(
      `[${it.ok ? "OK " : "FAIL"}] ${it.step.padEnd(22)} overflowX=${it.overflowBy}px`,
    );
  if (it.culprits && it.culprits.length)
    console.log("        culprits:", JSON.stringify(it.culprits));
}
console.log(`\nScreenshots: ${SCREENS_DIR}`);
console.log(failures === 0 ? "\nRESULT: PASS\n" : `\nRESULT: ${failures} issue(s)\n`);
process.exit(failures === 0 ? 0 : 1);
