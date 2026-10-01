const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require('C:/Users/anyuxin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

(async () => {
  const root = path.resolve(__dirname, '..');
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const failures = [];
  await page.goto(pathToFileURL(path.join(root, 'index.html')).href, { waitUntil: 'load' });

  const workLink = page.locator('a', { hasText: 'Work' }).first();
  await Promise.all([page.waitForLoadState('load'), workLink.click()]);
  if (!(await page.title()).startsWith('Work')) failures.push(`Work link opened ${page.url()} with title ${await page.title()}`);

  await page.goto(pathToFileURL(path.join(root, 'index.html')).href, { waitUntil: 'load' });
  await Promise.all([page.waitForLoadState('load'), page.locator('a[href*="projects/soundscape/index.html"]').first().click()]);
  if (!(await page.title()).includes('声场 Soundscape')) failures.push(`Soundscape link opened ${page.url()} with title ${await page.title()}`);

  const dockBox = await page.locator('.project-dock').boundingBox();
  if (!dockBox || dockBox.width > 130 || dockBox.height > 44) {
    failures.push(`Project dock is too large: ${JSON.stringify(dockBox)}`);
  }

  const dockWork = page.locator('.project-dock a[aria-label="全部项目"]');
  await Promise.all([page.waitForLoadState('load'), dockWork.click()]);
  if (!(await page.title()).startsWith('Work')) failures.push(`Project dock returned to ${page.url()} with title ${await page.title()}`);

  const directoryLinks = await page.evaluate(() => [...document.querySelectorAll('a[href]')]
    .map(anchor => ({ text: anchor.textContent.trim(), href: anchor.href }))
    .filter(link => link.href.startsWith('file:') && /\/$/.test(new URL(link.href).pathname)));
  if (directoryLinks.length) failures.push(`Directory links remain: ${directoryLinks.map(link => `${link.text} -> ${link.href}`).join(', ')}`);

  const layoutRoutes = [
    'index.html', 'work/index.html', 'thinking/index.html', 'aigc-process/index.html', 'about/index.html', 'resume/index.html', 'contact/index.html',
    'projects/soundscape/index.html', 'projects/renew/index.html', 'projects/lightmap/index.html', 'projects/lumen/index.html', 'projects/flow/index.html'
  ];
  for (const route of layoutRoutes) {
    await page.goto(pathToFileURL(path.join(root, route)).href, { waitUntil: 'load' });
    const layout = await page.evaluate(() => {
      const lineCount = element => {
        const style = getComputedStyle(element);
        const lineHeight = parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.2;
        return Math.max(1, Math.round(element.getBoundingClientRect().height / lineHeight));
      };
      return [...document.querySelectorAll('h1, h2')]
        .filter(element => element.offsetParent !== null)
        .map(element => ({ text: element.textContent.trim().replace(/\s+/g, ' '), lines: lineCount(element) }))
        .filter(item => item.lines > 1);
    });
    if (layout.length) failures.push(`${route} has wrapped desktop headings: ${JSON.stringify(layout)}`);
  }
  await browser.close();
  if (failures.length) {
    console.error(failures.join('\n'));
    process.exit(1);
  }
  console.log(JSON.stringify({ fileNavigation: 'pass' }));
})();

