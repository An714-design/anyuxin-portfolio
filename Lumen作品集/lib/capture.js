const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require('C:/Users/anyuxin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const tokens = require('./tokens');

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function withPage({ width, height, scale }, callback) {
  const browser = await chromium.launch({ headless: true, executablePath: CHROME });
  try {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: scale });
    await callback(page);
  } finally {
    await browser.close();
  }
}

async function captureHtml({ html, output, width = tokens.screens.width, height = tokens.screens.height, scale = tokens.screens.scale, fullPage = false }) {
  fs.mkdirSync(path.dirname(output), { recursive: true });
  await withPage({ width, height, scale }, async (page) => {
    await page.setContent(html, { waitUntil: 'load' });
    await page.screenshot({ path: output, fullPage });
  });
}

async function captureFile({ input, output, width = tokens.screens.width, height = tokens.screens.height, scale = tokens.screens.scale, fullPage = false }) {
  fs.mkdirSync(path.dirname(output), { recursive: true });
  await withPage({ width, height, scale }, async (page) => {
    await page.goto(pathToFileURL(input).href, { waitUntil: 'load' });
    await page.screenshot({ path: output, fullPage });
  });
}

module.exports = { captureHtml, captureFile };