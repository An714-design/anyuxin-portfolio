const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require('C:/Users/anyuxin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

const ROOT = path.join(__dirname, '..');
const INPUT = path.join(ROOT, 'index.html');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function localTargets(html) {
  const targets = [];
  for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    const target = match[1];
    if (target.startsWith('#') || target.startsWith('mailto:') || target.startsWith('tel:')) continue;
    if (/^https?:\/\//i.test(target)) throw new Error(`remote URL is not allowed: ${target}`);
    targets.push(target.split('#')[0]);
  }
  return [...new Set(targets)];
}

function imageTags(html) {
  return [...html.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0]);
}

async function validateStructure() {
  assert(fs.existsSync(INPUT), 'index.html is missing');
  const html = fs.readFileSync(INPUT, 'utf8');
  assert(!/https?:\/\//i.test(html), 'index.html contains a remote URL');
  for (const target of localTargets(html)) {
    assert(fs.existsSync(path.join(ROOT, target)), `missing local asset: ${target}`);
  }
  for (const tag of imageTags(html)) {
    const alt = tag.match(/alt="([^"]+)"/);
    assert(alt && alt[1].trim().length > 0, `image is missing alt text: ${tag}`);
  }
  const ids = new Set([...html.matchAll(/id="([^"]+)"/g)].map((match) => match[1]));
  for (const match of html.matchAll(/href="#([^"]+)"/g)) {
    assert(ids.has(match[1]), `anchor target is missing: #${match[1]}`);
  }
  console.log('portfolio structure is valid');
}

async function validateLayoutAndExport() {
  const browser = await chromium.launch({ headless: true, executablePath: CHROME });
  try {
    const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    await desktop.goto(pathToFileURL(INPUT).href, { waitUntil: 'load' });
    await desktop.waitForTimeout(400);
    for (const selector of ['#hero', '#screens', '#detection', '#radar', '#cancellation', '#trust', '#system', '#metrics', '#quality']) {
      assert(await desktop.locator(selector).isVisible(), `required section is not visible: ${selector}`);
    }
    const desktopOverflow = await desktop.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    assert(desktopOverflow <= 1, `desktop horizontal overflow: ${desktopOverflow}px`);
    await desktop.screenshot({ path: path.join(ROOT, 'preview-hero.png') });
    await desktop.screenshot({ path: path.join(ROOT, 'preview.png'), fullPage: true });
    await desktop.close();

    const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
    await mobile.goto(pathToFileURL(INPUT).href, { waitUntil: 'load' });
    await mobile.waitForTimeout(400);
    const mobileOverflow = await mobile.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    assert(mobileOverflow <= 1, `mobile horizontal overflow: ${mobileOverflow}px`);
    await mobile.close();
  } finally {
    await browser.close();
  }
  console.log('layout, anchors, assets, alt text, and previews are valid');
}

if (require.main === module) {
  (async () => {
    await validateStructure();
    await validateLayoutAndExport();
  })().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

module.exports = { localTargets, imageTags, validateStructure, validateLayoutAndExport };
