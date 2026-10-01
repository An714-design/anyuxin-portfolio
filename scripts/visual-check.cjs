const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');
const { chromium } = require('C:/Users/anyuxin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

const root = path.resolve(__dirname, '..');
const qaRoot = path.join(root, 'qa');
const executablePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const routes = [
  ['home', '/'],
  ['work', '/work/'],
  ['thinking', '/thinking/'],
  ['aigc-process', '/aigc-process/'],
  ['about', '/about/'],
  ['resume', '/resume/'],
  ['contact', '/contact/'],
  ['soundscape', '/projects/soundscape/'],
  ['renew', '/projects/renew/'],
  ['lightmap', '/projects/lightmap/'],
  ['lumen', '/projects/lumen/'],
  ['flow', '/projects/flow/']
];
const viewports = [
  ['1440', { width: 1440, height: 900 }],
  ['390', { width: 390, height: 844 }]
];

async function waitForServer() {
  for (let i = 0; i < 40; i += 1) {
    try {
      const response = await fetch('http://127.0.0.1:4173/');
      if (response.ok) return;
    } catch {}
    await new Promise(resolve => setTimeout(resolve, 150));
  }
  throw new Error('Local server did not become ready');
}

(async () => {
  fs.mkdirSync(qaRoot, { recursive: true });
  const server = spawn(process.execPath, ['scripts/serve.cjs'], { cwd: root, stdio: ['ignore', 'pipe', 'pipe'] });
  const failures = [];
  try {
    await waitForServer();
    const browser = await chromium.launch({ headless: true, executablePath });
    for (const [name, route] of routes) {
      for (const [width, viewport] of viewports) {
        const page = await browser.newPage({ viewport });
        const consoleErrors = [];
        const failedRequests = [];
        page.on('console', message => { if (message.type() === 'error') consoleErrors.push(message.text()); });
        page.on('response', response => { if (response.status() >= 400) consoleErrors.push(HTTP  ); });
        page.on('requestfailed', request => {
          const failure = request.failure()?.errorText || 'failed';
          if (!(request.resourceType() === 'media' && failure.includes('ERR_ABORTED'))) failedRequests.push(`${request.url()} ${failure}`);
        });
        const response = await page.goto(`http://127.0.0.1:4173${route}`, { waitUntil: 'load', timeout: 30000 });
        await page.waitForTimeout(400);
        const state = await page.evaluate(() => ({
          overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
          brokenImages: [...document.images].filter(image => image.src && (!image.complete || image.naturalWidth === 0)).map(image => image.src),
          hasDock: Boolean(document.querySelector('.project-dock'))
        }));
        if (!response || !response.ok()) failures.push(`${name}-${width}: HTTP ${response?.status()}`);
        if (state.overflow) failures.push(`${name}-${width}: horizontal overflow`);
        if (state.brokenImages.length) failures.push(`${name}-${width}: broken images ${state.brokenImages.join(', ')}`);
        if (name !== 'home' && name !== 'work' && name !== 'thinking' && name !== 'aigc-process' && name !== 'about' && name !== 'resume' && name !== 'contact' && !state.hasDock) failures.push(`${name}-${width}: missing project dock`);
        if (consoleErrors.length) failures.push(`${name}-${width}: console ${consoleErrors.join(' | ')}`);
        if (failedRequests.length) failures.push(`${name}-${width}: requests ${failedRequests.join(' | ')}`);
        await page.screenshot({ path: path.join(qaRoot, `${name}-${width}.png`), fullPage: false });
        await page.close();
      }
    }
    await browser.close();
  } finally {
    server.kill();
  }
  if (failures.length) {
    console.error(failures.join('\n'));
    process.exit(1);
  }
  console.log(JSON.stringify({ routes: routes.length, viewports: viewports.length, screenshots: routes.length * viewports.length }, null, 2));
})();

