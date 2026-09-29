const fs = require('node:fs');
const path = require('node:path');
const { captureHtml } = require('./lib/capture');
const { screens } = require('./lib/screens');
const { diagrams } = require('./lib/diagrams');

const ROOT = __dirname;
const SCREEN_DIR = path.join(ROOT, 'screens');
const SRC_DIR = path.join(ROOT, 'src');
const DIAGRAM_DIR = path.join(ROOT, 'diagrams');
const DIAGRAM_SRC_DIR = path.join(DIAGRAM_DIR, 'src');

async function renderScreens() {
  fs.mkdirSync(SCREEN_DIR, { recursive: true });
  fs.mkdirSync(SRC_DIR, { recursive: true });
  for (const screen of screens) {
    fs.writeFileSync(path.join(SRC_DIR, `${screen.id}.html`), screen.html, 'utf8');
    await captureHtml({ html: screen.html, output: path.join(SCREEN_DIR, `${screen.id}.png`) });
    console.log(`screen ${screen.id}`);
  }
}

async function renderDiagrams() {
  fs.mkdirSync(DIAGRAM_DIR, { recursive: true });
  fs.mkdirSync(DIAGRAM_SRC_DIR, { recursive: true });
  for (const diagram of diagrams) {
    fs.writeFileSync(path.join(DIAGRAM_SRC_DIR, `${diagram.id}.html`), diagram.html, 'utf8');
    await captureHtml({
      html: diagram.html,
      output: path.join(DIAGRAM_DIR, `${diagram.id}.png`),
      width: diagram.width,
      height: diagram.height,
      scale: 1
    });
    console.log(`diagram ${diagram.id}`);
  }
}

async function main() {
  await renderScreens();
  await renderDiagrams();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});