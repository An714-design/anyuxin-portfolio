const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require('C:/Users/anyuxin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

(async () => {
  const root = path.resolve(__dirname, '..');
  const outputDir = path.join(root, 'dist', 'media', 'shared');
  const pageFile = path.join(root, '..', 'portfolio-site', 'projects', 'flow', 'index.html');
  fs.mkdirSync(outputDir, { recursive: true });
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto(pathToFileURL(pageFile).href, { waitUntil: 'load' });
  const video = page.locator('video[src*="flow-demo-15s"]');
  await video.waitFor({ state: 'attached' });
  await page.waitForFunction(() => {
    const node = [...document.querySelectorAll('video')].find(video => video.src.includes('flow-demo-15s'));
    return node && node.readyState >= 2;
  });
  await video.evaluate(node => { node.pause(); node.controls = false; });
  for (const [index, seconds] of [2, 6, 10, 14].entries()) {
    await video.evaluate(async (node, time) => {
      await new Promise(resolve => {
        if (Math.abs(node.currentTime - time) < 0.05 && node.readyState >= 2) return resolve();
        node.addEventListener('seeked', resolve, { once: true });
        node.currentTime = time;
      });
    }, seconds);
    await page.waitForTimeout(120);
    await video.screenshot({ path: path.join(outputDir, `flow-storyboard-0${index + 1}.jpg`), type: 'jpeg', quality: 88 });
  }
  await browser.close();
  console.log(JSON.stringify({ storyboards: 4 }));
})();
