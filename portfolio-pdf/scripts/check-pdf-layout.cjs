const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require('C:/Users/anyuxin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

(async () => {
  const root = path.resolve(__dirname, '..');
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto(pathToFileURL(path.join(root, 'dist', 'casebook.html')).href, { waitUntil: 'load' });
  const report = await page.evaluate(() => {
    const pages = [...document.querySelectorAll('.page')];
    return pages.map((page, index) => {
      const content = page.querySelector('.page__content');
      const pageRect = page.getBoundingClientRect();
      const contentRect = content.getBoundingClientRect();
      const clipped = [...content.querySelectorAll('*')].filter(node => {
        const rect = node.getBoundingClientRect();
        return rect.bottom > pageRect.bottom + 1 || rect.right > pageRect.right + 1 || rect.top < pageRect.top - 1 || rect.left < pageRect.left - 1;
      }).map(node => `${node.tagName}.${node.className || ''}`).slice(0, 8);
      return {
        page: index + 1,
        contentOverflow: content.scrollHeight - content.clientHeight,
        clipped
      };
    });
  });
  const broken = await page.evaluate(() => [...document.images].filter(image => !image.complete || image.naturalWidth === 0).map(image => image.src));
  await browser.close();
  const failures = report.filter(item => item.contentOverflow > 1 || item.clipped.length);
  console.log(JSON.stringify({ pages: report.length, brokenImages: broken, failures }, null, 2));
  if (broken.length || report.length !== 26 || failures.length) process.exit(1);
})();
