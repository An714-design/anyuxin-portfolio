const fs = require('node:fs');
const path = require('node:path');
const { captureHtml } = require('./lib/capture');
const { screens } = require('./lib/screens');

const ROOT = __dirname;
const SCREEN_DIR = path.join(ROOT, 'screens');
const SRC_DIR = path.join(ROOT, 'src');

async function renderScreens() {
  fs.mkdirSync(SCREEN_DIR, { recursive: true });
  fs.mkdirSync(SRC_DIR, { recursive: true });
  for (const screen of screens) {
    const source = path.join(SRC_DIR, `${screen.id}.html`);
    fs.writeFileSync(source, screen.html, 'utf8');
    await captureHtml({ html: screen.html, output: path.join(SCREEN_DIR, `${screen.id}.png`) });
    console.log(`screen ${screen.id}`);
  }
}

async function main() {
  await renderScreens();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});