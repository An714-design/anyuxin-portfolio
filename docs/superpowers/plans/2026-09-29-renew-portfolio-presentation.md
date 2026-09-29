# 续费侦探 Renew Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static UI/UX portfolio presentation for 续费侦探 Renew that demonstrates subscription detection, renewal radar, cancellation guidance, privacy boundaries, and editorial-finance visual design without implementing real OCR, email, payment, or cancellation integrations.

**Architecture:** Generate ten phone screens, five explanatory diagrams, and three motion/key-visual assets as local HTML with Playwright, then assemble them into a responsive case-study page. The portfolio page is the only user-facing deliverable; generator files exist to reproduce and validate the assets.

**Tech Stack:** HTML, CSS, vanilla JavaScript, Node.js 24, Node test runner, Playwright Chromium.

## Global Constraints

- Final deliverable is `Renew作品集/index.html` plus its local generated assets.
- Do not build a real mobile app, backend, OCR service, email connection, payment connection, automatic cancellation, real AI service, analytics, or persistence.
- Use the approved design document: `docs/superpowers/specs/2026-09-29-renew-subscription-detective-design.md`.
- All subscription names, amounts, dates, confidence scores, and usage records must be simulated and visibly labeled as simulated data.
- Preserve the product principle: 「AI 负责识别，用户负责确认」.
- Do not use real bank names, payment credentials, personal email content, or realistic private data.
- Visual direction is 「编辑感金融 × 侦探线索板」 with the approved colors:
  - Paper `#F4F0E8`
  - Ink `#151515`
  - Signal `#FF5A36`
  - Acid `#C8F45A`
  - Warning `#F3B544`
  - Muted `#8B877E`
  - Surface `#FFFDF8`
- Phone screenshots use a 390 × 844 viewport at device scale factor 2.
- Diagrams use a 1240 × 760 canvas at scale 1.
- Motion posters use a 1600 × 1000 canvas at scale 1.
- Browser executable is `C:\Program Files\Google\Chrome\Application\chrome.exe`.
- Playwright module path is `C:/Users/anyuxin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright`.
- All assets must be local; no remote images, fonts, analytics, CDNs, or network dependencies.
- Every image needs non-empty `alt` text.
- The case-study page must have no horizontal overflow at 1440 × 900 or 390 × 844.
- No placeholder copy, fake testimonials, fake research results, or invented outcome metrics.
- Do not use gradients, glows, bokeh, generic blue fintech styling, or oversized decorative cards that reduce information clarity.

---

## File Structure

- `Renew作品集/package.json` — local scripts and project metadata.
- `Renew作品集/lib/tokens.js` — approved color, font, size, radius, and motion tokens.
- `Renew作品集/lib/capture.js` — Playwright screenshot helper.
- `Renew作品集/lib/screens.js` — all ten phone-screen HTML generators.
- `Renew作品集/lib/diagrams.js` — five portfolio diagrams.
- `Renew作品集/lib/motion.js` — key visual, radar-orbit, and scan-detect HTML posters.
- `Renew作品集/render.js` — asset-generation orchestrator.
- `Renew作品集/scripts/validate.js` — structure, accessibility, link, overflow, and preview validation.
- `Renew作品集/tests/*.test.js` — generator contract tests.
- `Renew作品集/screens/*.png` — generated phone screens.
- `Renew作品集/src/*.html` — generated phone-screen sources.
- `Renew作品集/diagrams/*.png` — generated diagrams.
- `Renew作品集/diagrams/src/*.html` — generated diagram sources.
- `Renew作品集/kv/key-visual.png` — generated key visual.
- `Renew作品集/motion/*.png` — generated motion posters.
- `Renew作品集/index.html` — final case-study presentation.
- `Renew作品集/preview.png` and `Renew作品集/preview-hero.png` — generated validation previews.
- `Renew作品集/使用说明.md` — regeneration, preview, and asset manifest.

---

### Task 1: Create Foundation Tokens and Test Harness

**Files:**
- Create: `Renew作品集/package.json`
- Create: `Renew作品集/lib/tokens.js`
- Create: `Renew作品集/tests/tokens.test.js`

**Interfaces:**
- Consumes: approved palette and sizing rules from the design document.
- Produces: frozen `tokens` object with `colors`, `font`, `screens`, `radius`, and `motion`.

- [ ] **Step 1: Write the failing token test**

`Renew作品集/tests/tokens.test.js`:

```javascript
const test = require('node:test');
const assert = require('node:assert/strict');
const tokens = require('../lib/tokens');

test('uses the approved Renew visual tokens', () => {
  assert.equal(tokens.colors.paper, '#F4F0E8');
  assert.equal(tokens.colors.ink, '#151515');
  assert.equal(tokens.colors.signal, '#FF5A36');
  assert.equal(tokens.colors.acid, '#C8F45A');
  assert.equal(tokens.colors.warning, '#F3B544');
  assert.equal(tokens.colors.muted, '#8B877E');
  assert.equal(tokens.colors.surface, '#FFFDF8');
  assert.deepEqual(tokens.screens, { width: 390, height: 844, scale: 2 });
  assert.deepEqual(tokens.diagrams, { width: 1240, height: 760, scale: 1 });
  assert.equal(tokens.radius.card, 18);
  assert.equal(tokens.radius.control, 12);
  assert.equal(tokens.radius.pill, 999);
});
```

- [ ] **Step 2: Run the token test and verify it fails**

Run from `Renew作品集`: `node --test tests/tokens.test.js`

Expected: FAIL because `../lib/tokens` does not exist.

- [ ] **Step 3: Add package metadata and token implementation**

`Renew作品集/package.json`:

```json
{
  "name": "renew-subscription-detective-portfolio",
  "private": true,
  "scripts": {
    "render": "node render.js",
    "test": "node --test",
    "validate": "node scripts/validate.js"
  }
}
```

`Renew作品集/lib/tokens.js`:

```javascript
module.exports = Object.freeze({
  colors: {
    paper: '#F4F0E8',
    ink: '#151515',
    signal: '#FF5A36',
    acid: '#C8F45A',
    warning: '#F3B544',
    muted: '#8B877E',
    surface: '#FFFDF8',
    line: 'rgba(21,21,21,.14)',
    lineStrong: 'rgba(21,21,21,.28)'
  },
  font: {
    display: '"Noto Serif SC","Songti SC","STSong",serif',
    body: '-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif',
    mono: '"SFMono-Regular","Cascadia Code","Roboto Mono",monospace'
  },
  screens: { width: 390, height: 844, scale: 2 },
  diagrams: { width: 1240, height: 760, scale: 1 },
  radius: { card: 18, control: 12, pill: 999 },
  motion: {
    orbit: '420ms',
    scan: '900ms',
    pulse: '2400ms',
    easing: 'cubic-bezier(.22,.61,.36,1)'
  }
});
```

- [ ] **Step 4: Run the token test and verify it passes**

Run from `Renew作品集`: `node --test tests/tokens.test.js`

Expected: PASS.

- [ ] **Step 5: Commit**

```powershell
git add -- Renew作品集/package.json Renew作品集/lib/tokens.js Renew作品集/tests/tokens.test.js
git commit -m "feat: add Renew portfolio tokens"
```

---

### Task 2: Add the Playwright Capture Helper

**Files:**
- Create: `Renew作品集/lib/capture.js`
- Create: `Renew作品集/tests/capture.test.js`

**Interfaces:**
- Consumes: `tokens.screens` and the local Chrome/Playwright paths from Global Constraints.
- Produces: `captureHtml({ html, output, width, height, scale, fullPage })` and `captureFile({ input, output, width, height, scale, fullPage })`, both returning a Promise.

- [ ] **Step 1: Write the failing capture test**

`Renew作品集/tests/capture.test.js`:

```javascript
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { captureHtml } = require('../lib/capture');

test('captureHtml writes a non-empty screenshot', async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'renew-capture-'));
  const output = path.join(dir, 'smoke.png');
  await captureHtml({
    html: '<body style="margin:0;background:#151515;color:#C8F45A"><h1>Renew</h1></body>',
    output,
    width: 390,
    height: 844,
    scale: 1
  });
  assert.equal(fs.existsSync(output), true);
  assert.ok(fs.statSync(output).size > 1000);
});
```

- [ ] **Step 2: Run the capture test and verify it fails**

Run from `Renew作品集`: `node --test tests/capture.test.js`

Expected: FAIL because `../lib/capture` does not exist.

- [ ] **Step 3: Implement the capture helper**

`Renew作品集/lib/capture.js`:

```javascript
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

async function captureHtml({
  html,
  output,
  width = tokens.screens.width,
  height = tokens.screens.height,
  scale = tokens.screens.scale,
  fullPage = false
}) {
  fs.mkdirSync(path.dirname(output), { recursive: true });
  await withPage({ width, height, scale }, async (page) => {
    await page.setContent(html, { waitUntil: 'load' });
    await page.screenshot({ path: output, fullPage });
  });
}

async function captureFile({
  input,
  output,
  width = tokens.screens.width,
  height = tokens.screens.height,
  scale = tokens.screens.scale,
  fullPage = false
}) {
  fs.mkdirSync(path.dirname(output), { recursive: true });
  await withPage({ width, height, scale }, async (page) => {
    await page.goto(pathToFileURL(input).href, { waitUntil: 'load' });
    await page.screenshot({ path: output, fullPage });
  });
}

module.exports = { captureHtml, captureFile };
```

- [ ] **Step 4: Run the capture test and verify it passes**

Run from `Renew作品集`: `node --test tests/capture.test.js`

Expected: PASS and a screenshot larger than 1 KB is written to a temporary directory.

- [ ] **Step 5: Commit**

```powershell
git add -- Renew作品集/lib/capture.js Renew作品集/tests/capture.test.js
git commit -m "feat: add Renew capture helper"
```

---
### Task 3: Create the Screen Shell and Detection Screens

**Files:**
- Create: `Renew作品集/lib/screens.js`
- Create: `Renew作品集/tests/screens.test.js`

**Interfaces:**
- Consumes: `tokens`.
- Produces: `screens` array where each item is `{ id, label, html }`.
- Produces: internal `shell({ theme, body })` helper returning a complete 390 × 844 HTML document.
- Screen IDs produced in this task: `01-onboarding`, `02-import-center`, `03-detection-queue`, `04-confirmation-editor`.

- [ ] **Step 1: Write the failing screen test for the first four screens**

`Renew作品集/tests/screens.test.js`:

```javascript
const test = require('node:test');
const assert = require('node:assert/strict');
const { screens } = require('../lib/screens');

test('contains the four approved detection screens in order', () => {
  assert.deepEqual(screens.map((screen) => screen.id), [
    '01-onboarding',
    '02-import-center',
    '03-detection-queue',
    '04-confirmation-editor'
  ]);
  assert.match(screens[0].html, /把偷偷续费/);
  assert.match(screens[0].html, /不接入银行卡密码/);
  assert.match(screens[1].html, /导入一条线索/);
  assert.match(screens[2].html, /需要确认 2 个字段/);
  assert.match(screens[3].html, /加入续费雷达/);
});
```

- [ ] **Step 2: Run the screen test and verify it fails**

Run from `Renew作品集`: `node --test tests/screens.test.js`

Expected: FAIL because `../lib/screens` does not exist.

- [ ] **Step 3: Implement the shared screen shell and first four screens**

`Renew作品集/lib/screens.js`:

```javascript
const tokens = require('./tokens');

const FONT = tokens.font.body;
const DISPLAY = tokens.font.display;
const MONO = tokens.font.mono;

const SCREEN_CSS = `
*{box-sizing:border-box;margin:0;padding:0;-webkit-font-smoothing:antialiased}
body{font-family:${FONT};background:${tokens.colors.paper};color:${tokens.colors.ink}}
.screen{position:relative;width:390px;height:844px;overflow:hidden;background:${tokens.colors.paper};color:${tokens.colors.ink}}
.screen.dark{background:${tokens.colors.ink};color:${tokens.colors.surface}}
.status{height:52px;display:flex;align-items:center;justify-content:space-between;padding:0 24px;font-size:11px;font-family:${MONO};letter-spacing:.04em;opacity:.68}
.body{padding:12px 24px 0}
.kicker{font-size:10px;line-height:1.3;letter-spacing:.18em;text-transform:uppercase;color:${tokens.colors.signal}}
h1,h2,h3{font-family:${DISPLAY};font-weight:500;letter-spacing:-.03em}
h1{font-size:34px;line-height:1.16}h2{font-size:26px;line-height:1.18}h3{font-size:17px;line-height:1.28}
p{font-size:13px;line-height:1.6;color:rgba(21,21,21,.65)}
.dark p{color:rgba(255,253,248,.65)}.muted{color:${tokens.colors.muted}}
.mono{font-family:${MONO};font-variant-numeric:tabular-nums}
.card{background:${tokens.colors.surface};border:1px solid ${tokens.colors.line};border-radius:${tokens.radius.card}px;padding:16px}
.dark .card{background:rgba(255,253,248,.06);border-color:rgba(255,253,248,.14)}
.row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 0;border-bottom:1px solid ${tokens.colors.line}}
.row:last-child{border-bottom:0;padding-bottom:0}.row:first-child{padding-top:0}
.chip{display:inline-flex;align-items:center;height:28px;padding:0 10px;border-radius:${tokens.radius.pill}px;background:rgba(255,90,54,.12);color:#B83A22;font-size:11px;font-weight:700}
.chip.acid{background:rgba(200,244,90,.18);color:#465B00}.chip.warn{background:rgba(243,181,68,.18);color:#7A5200}
.btn{height:52px;border-radius:${tokens.radius.control}px;display:flex;align-items:center;justify-content:center;background:${tokens.colors.ink};color:${tokens.colors.surface};font-weight:700;font-size:14px}
.btn.ghost{background:transparent;color:inherit;border:1px solid ${tokens.colors.lineStrong}}
.dark .btn{background:${tokens.colors.acid};color:${tokens.colors.ink}}.dark .btn.ghost{border-color:rgba(255,253,248,.25)}
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.mini{font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:${tokens.colors.muted}}
.source{font-size:11px;line-height:1.45;color:${tokens.colors.muted}}
.confidence{height:6px;border-radius:99px;background:rgba(21,21,21,.08);overflow:hidden}.confidence i{display:block;height:100%;border-radius:99px;background:${tokens.colors.acid}}
.field{border:1px solid ${tokens.colors.line};border-radius:12px;padding:11px 12px;background:rgba(255,253,248,.7)}
.field.warn{border-color:${tokens.colors.warning};background:rgba(243,181,68,.09)}
.field b{display:block;font-size:14px;margin-top:3px}.field span{font-size:10px;color:${tokens.colors.muted}}
.nav{position:absolute;left:0;right:0;bottom:0;height:68px;border-top:1px solid ${tokens.colors.line};display:grid;grid-template-columns:repeat(4,1fr);align-items:center;text-align:center;font-size:10px;color:${tokens.colors.muted};background:rgba(244,240,232,.94)}
.nav b{display:block;font-size:16px;line-height:1;margin-bottom:5px;color:${tokens.colors.ink}}
.dark .nav{background:rgba(21,21,21,.94);border-color:rgba(255,253,248,.12);color:rgba(255,253,248,.48)}.dark .nav b{color:${tokens.colors.surface}}
.phone-bar{position:absolute;left:50%;bottom:8px;transform:translateX(-50%);width:134px;height:5px;border-radius:99px;background:currentColor;opacity:.7}
.amount{font-family:${MONO};font-size:32px;font-weight:700;letter-spacing:-.05em}
.rule{height:1px;background:${tokens.colors.line};margin:14px 0}
.scan{position:relative;overflow:hidden}.scan:after{content:"";position:absolute;left:0;right:0;top:0;height:2px;background:${tokens.colors.signal};animation:scan 900ms ${tokens.motion.easing} infinite}
@keyframes scan{from{transform:translateY(0)}to{transform:translateY(132px)}}
@media(prefers-reduced-motion:reduce){.scan:after{animation:none;transform:translateY(66px)}}
`;

function shell({ theme = 'paper', body }) {
  return `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${SCREEN_CSS}</style></head><body><div class="screen ${theme === 'dark' ? 'dark' : ''}"><div class="status"><span>9:41</span><span class="mono">Renew · DEMO</span><span>5G ▰</span></div>${body}<div class="phone-bar"></div></div></body></html>`;
}

const screens = [
  {
    id: '01-onboarding',
    label: '把续费变透明',
    html: shell({
      body: `<div class="body"><div class="kicker">Renew · Subscription Detective</div><h1 style="margin-top:12px">把偷偷续费，<br>变成看得见的支出。</h1><p style="margin-top:16px;max-width:310px">导入账单、邮件或截图，Renew 帮你识别订阅、标记下一次续费，再决定要不要继续。</p><div class="card" style="margin-top:26px"><div class="row"><div><h3>01 · 导入线索</h3><p>账单、邮件和截图都可以。</p></div><span class="chip">识别</span></div><div class="row"><div><h3>02 · 确认订阅</h3><p>低置信度字段由你确认。</p></div><span class="chip acid">确认</span></div><div class="row"><div><h3>03 · 处理续费</h3><p>保留、暂停、降级或取消。</p></div><span class="chip warn">行动</span></div></div><div class="btn" style="margin-top:18px">导入第一张账单</div><div class="btn ghost" style="margin-top:10px">先手动添加一个订阅</div><p class="source" style="margin-top:14px">不接入银行卡密码，不保存完整邮件。当前为作品集演示数据。</p></div>`
    })
  },
  {
    id: '02-import-center',
    label: '导入一条线索',
    html: shell({
      body: `<div class="body"><div class="kicker">01 · Import</div><h2 style="margin-top:9px">导入一条线索</h2><p style="margin-top:10px">选择一种方式，Renew 只读取你主动提供的文件。</p><div class="card scan" style="margin-top:20px;padding:22px"><div class="mini">主要入口</div><h3 style="margin-top:8px">上传账单截图</h3><p style="margin-top:6px">支持 png、jpg 和 pdf，演示数据将在本地模拟解析。</p><div class="btn" style="margin-top:16px">选择文件</div></div><div class="grid-2" style="margin-top:12px"><div class="card"><span class="chip">邮件</span><h3 style="margin-top:10px">转发邮件</h3><p>复制邮件内容或上传截图。</p></div><div class="card"><span class="chip acid">手动</span><h3 style="margin-top:10px">手动添加</h3><p>已知道金额和周期时更快。</p></div></div><div class="rule"></div><div class="row"><span>最近导入</span><span class="mono">9 月 18 日 · 2 条线索</span></div></div><div class="nav"><div><b>⌂</b>首页</div><div><b>◷</b>日历</div><div><b>▤</b>订阅</div><div><b>↘</b>节省</div></div>`
    })
  },
  {
    id: '03-detection-queue',
    label: '识别队列',
    html: shell({
      body: `<div class="body"><div class="kicker">02 · Review</div><h2 style="margin-top:9px">需要确认 2 个字段</h2><p style="margin-top:8px">高置信度线索已整理，低置信度字段会保留原文来源。</p><div class="card" style="margin-top:18px"><div class="row"><div><h3>StreamMax</h3><p>9 月 18 日 · 来自邮件截图</p></div><span class="chip acid">98%</span></div><div class="confidence"><i style="width:98%"></i></div><p class="source" style="margin-top:10px">金额 ¥68.00 · 月付 · 下次续费 10 月 18 日</p></div><div class="card" style="margin-top:12px"><div class="row"><div><h3>CloudBox</h3><p>9 月 20 日 · 来自 PDF 账单</p></div><span class="chip warn">需确认</span></div><div class="field warn" style="margin-top:12px"><span>币种 · 请检查</span><b>USD $12.99</b></div><div class="field warn" style="margin-top:10px"><span>周期 · 请检查</span><b>年付 / 月付？</b></div></div><div class="btn" style="margin-top:16px">确认高置信度项目</div><div class="btn ghost" style="margin-top:10px">逐条检查</div></div><div class="nav"><div><b>⌂</b>首页</div><div><b>◷</b>日历</div><div><b>▤</b>订阅</div><div><b>↘</b>节省</div></div>`
    })
  },
  {
    id: '04-confirmation-editor',
    label: '确认识别结果',
    html: shell({
      body: `<div class="body"><div class="kicker">03 · Confirm</div><h2 style="margin-top:9px">确认识别结果</h2><p style="margin-top:8px">每个字段都保留来源。你修改后，续费雷达会立即更新。</p><div class="card" style="margin-top:16px"><div class="row"><span>商户</span><b>CloudBox</b></div><div class="row"><span>金额</span><b class="mono">$12.99</b></div><div class="row"><span>周期</span><b>年付</b></div><div class="field warn" style="margin-top:12px"><span>下次续费日 · 低置信度</span><b class="mono">2026-10-20</b></div><div class="source" style="margin-top:8px">来源：CloudBox_Bill_2026.pdf</div></div><div class="card" style="margin-top:12px;background:rgba(200,244,90,.1)"><div class="row" style="border-bottom:0"><div><h3>Renew 判断</h3><p>金额较高，年付周期。建议加入雷达后观察。</p></div><span class="chip acid">保留</span></div></div><div class="btn" style="margin-top:18px">加入续费雷达</div><div class="btn ghost" style="margin-top:10px">修改字段</div></div><div class="nav"><div><b>⌂</b>首页</div><div><b>◷</b>日历</div><div><b>▤</b>订阅</div><div><b>↘</b>节省</div></div>`
    })
  }
];

module.exports = { screens, shell, SCREEN_CSS };
```

- [ ] **Step 4: Run the screen test and verify it passes**

Run from `Renew作品集`: `node --test tests/screens.test.js`

Expected: PASS.

- [ ] **Step 5: Commit**

```powershell
git add -- Renew作品集/lib/screens.js Renew作品集/tests/screens.test.js
git commit -m "feat: add Renew detection screens"
```

---
### Task 4: Add the Renewal Radar, Calendar, and Subscription Detail Screens

**Files:**
- Modify: `Renew作品集/lib/screens.js`
- Modify: `Renew作品集/tests/screens.test.js`

**Interfaces:**
- Consumes: `shell` and `SCREEN_CSS` from Task 3.
- Produces: additional screen IDs `05-renewal-radar`, `06-renewal-calendar`, `07-subscription-detail`.
- Produces: CSS classes `radar`, `radar-center`, `radar-ring`, `radar-node`, `calendar-grid`, `day`, `day.active`, `price-bars`, and `price-bar`.

- [ ] **Step 1: Extend the failing screen test**

Replace the test body in `Renew作品集/tests/screens.test.js` with:

```javascript
const test = require('node:test');
const assert = require('node:assert/strict');
const { screens } = require('../lib/screens');

test('contains the seven approved detection and radar screens in order', () => {
  assert.deepEqual(screens.map((screen) => screen.id), [
    '01-onboarding',
    '02-import-center',
    '03-detection-queue',
    '04-confirmation-editor',
    '05-renewal-radar',
    '06-renewal-calendar',
    '07-subscription-detail'
  ]);
  assert.match(screens[0].html, /把偷偷续费/);
  assert.match(screens[2].html, /需要确认 2 个字段/);
  assert.match(screens[4].html, /未来 7 天/);
  assert.match(screens[5].html, /续费日历/);
  assert.match(screens[6].html, /价格变化/);
});
```

- [ ] **Step 2: Run the screen test and verify it fails**

Run from `Renew作品集`: `node --test tests/screens.test.js`

Expected: FAIL because only four screen IDs exist.

- [ ] **Step 3: Add radar and calendar CSS**

Append the following CSS inside `SCREEN_CSS` in `Renew作品集/lib/screens.js`, immediately before the closing backtick:

```css
.radar{position:relative;width:286px;height:286px;margin:18px auto 4px;border-radius:50%;background:#EAE4D9;border:1px solid rgba(21,21,21,.08)}
.radar-ring{position:absolute;inset:0;border-radius:50%;border:1px dashed rgba(21,21,21,.14)}
.radar-ring.two{inset:31px}.radar-ring.three{inset:62px}
.radar-center{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:72px;height:72px;border-radius:50%;background:${tokens.colors.ink};color:${tokens.colors.surface};display:grid;place-items:center;text-align:center;font-size:11px}
.radar-node{position:absolute;width:18px;height:18px;border-radius:50%;background:${tokens.colors.signal};outline:6px solid rgba(255,90,54,.12)}
.radar-node.yellow{background:${tokens.colors.warning};outline:6px solid rgba(243,181,68,.14)}
.radar-node.gray{background:${tokens.colors.muted};outline:6px solid rgba(139,135,126,.12)}
.radar-label{position:absolute;font-family:${MONO};font-size:9px;padding:4px 6px;border-radius:6px;background:${tokens.colors.surface};border:1px solid ${tokens.colors.line};white-space:nowrap}
.calendar-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:6px;margin-top:18px}
.day{height:56px;border:1px solid ${tokens.colors.line};border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:11px;background:rgba(255,253,248,.55)}
.day b{font-family:${MONO};font-size:13px}.day i{width:6px;height:6px;border-radius:50%;background:${tokens.colors.signal};margin-top:5px}.day.active{border-color:${tokens.colors.ink};background:${tokens.colors.ink};color:${tokens.colors.surface}}.day.active i{background:${tokens.colors.acid}}
.price-bars{height:96px;display:flex;align-items:flex-end;gap:10px;margin-top:18px;padding:0 4px}
.price-bar{flex:1;border-radius:8px 8px 3px 3px;background:rgba(21,21,21,.12);position:relative}.price-bar.on{background:${tokens.colors.ink}}.price-bar span{position:absolute;left:50%;bottom:-22px;transform:translateX(-50%);font-family:${MONO};font-size:9px;color:${tokens.colors.muted}}
```

- [ ] **Step 4: Add the three screen objects**

Before the closing `];` in `Renew作品集/lib/screens.js`, append:

```javascript
  ,
  {
    id: '05-renewal-radar',
    label: '续费雷达',
    html: shell({
      body: `<div class="body"><div class="kicker">Renewal Radar · 模拟数据</div><h2 style="margin-top:8px">未来 7 天<br>将扣 ¥186.00</h2><div class="radar"><div class="radar-ring"></div><div class="radar-ring two"></div><div class="radar-ring three"></div><div class="radar-center"><b>今天</b><span>10.02</span></div><div class="radar-node" style="left:228px;top:44px"></div><div class="radar-label" style="left:242px;top:28px">StreamMax ¥68</div><div class="radar-node yellow" style="left:56px;top:94px"></div><div class="radar-label" style="left:10px;top:72px">CloudBox $12.99</div><div class="radar-node gray" style="left:202px;top:216px"></div><div class="radar-label" style="left:220px;top:218px">Music+ 保留</div></div><div class="card"><div class="row"><div><h3>StreamMax</h3><p>10 月 18 日 · 月付</p></div><b class="mono">¥68.00</b></div><div class="row"><div><h3>CloudBox</h3><p>10 月 20 日 · 年付 · 需检查</p></div><b class="mono">$12.99</b></div></div><p class="source" style="margin-top:12px">节点位置和金额均为作品集模拟数据。</p></div><div class="nav"><div><b>⌂</b>首页</div><div><b>◷</b>日历</div><div><b>▤</b>订阅</div><div><b>↘</b>节省</div></div>`
    })
  },
  {
    id: '06-renewal-calendar',
    label: '续费日历',
    html: shell({
      body: `<div class="body"><div class="kicker">Calendar · October</div><h2 style="margin-top:8px">续费日历</h2><p style="margin-top:8px">看到扣费节奏，也看到哪些日子会集中支出。</p><div class="calendar-grid"><div class="day"><span>一</span><b>5</b></div><div class="day"><span>二</span><b>6</b></div><div class="day active"><span>三</span><b>7</b><i></i></div><div class="day"><span>四</span><b>8</b></div><div class="day"><span>五</span><b>9</b></div><div class="day"><span>六</span><b>10</b></div><div class="day"><span>日</span><b>11</b></div><div class="day"><span>一</span><b>12</b></div><div class="day"><span>二</span><b>13</b></div><div class="day"><span>三</span><b>14</b></div><div class="day"><span>四</span><b>15</b></div><div class="day"><span>五</span><b>16</b></div><div class="day"><span>六</span><b>17</b></div><div class="day"><span>日</span><b>18</b><i></i></div></div><div class="card" style="margin-top:16px"><div class="row"><span>本月预计</span><b class="mono">¥486.00</b></div><div class="row"><span>高风险项目</span><b>2 个</b></div><div class="row"><span>待验证取消</span><b>1 个</b></div></div><p class="source" style="margin-top:12px">日历和金额为模拟数据。</p></div><div class="nav"><div><b>⌂</b>首页</div><div><b>◷</b>日历</div><div><b>▤</b>订阅</div><div><b>↘</b>节省</div></div>`
    })
  },
  {
    id: '07-subscription-detail',
    label: '订阅详情',
    html: shell({
      body: `<div class="body"><div class="kicker">Subscription · CloudBox</div><div class="row" style="margin-top:10px;border-bottom:0;padding:0"><div><h2>CloudBox</h2><p>云存储 · 年付</p></div><span class="chip warn">需检查</span></div><div class="card" style="margin-top:16px"><span class="mini">下次续费</span><div class="amount" style="margin-top:6px">$12.99</div><p class="mono">2026-10-20 · 还有 18 天</p><div class="rule"></div><span class="mini">价格变化</span><div class="price-bars"><div class="price-bar" style="height:48%"><span>2023</span></div><div class="price-bar" style="height:58%"><span>2024</span></div><div class="price-bar on" style="height:84%"><span>2025</span></div><div class="price-bar on" style="height:100%"><span>2026</span></div></div></div><div class="card" style="margin-top:16px"><div class="row"><span>最近使用</span><b>62 天前</b></div><div class="row"><span>识别来源</span><b>PDF 账单</b></div><div class="row"><span>当前判断</span><b>建议观察</b></div></div><div class="grid-2" style="margin-top:16px"><div class="btn">取消订阅</div><div class="btn ghost">暂时保留</div></div><p class="source" style="margin-top:12px">使用记录和价格变化均为模拟数据。</p></div><div class="nav"><div><b>⌂</b>首页</div><div><b>◷</b>日历</div><div><b>▤</b>订阅</div><div><b>↘</b>节省</div></div>`
    })
  }
```

- [ ] **Step 5: Run the screen test and verify it passes**

Run from `Renew作品集`: `node --test tests/screens.test.js`

Expected: PASS.

- [ ] **Step 6: Commit**

```powershell
git add -- Renew作品集/lib/screens.js Renew作品集/tests/screens.test.js
git commit -m "feat: add Renew radar and renewal screens"
```

---
### Task 5: Add Cancellation, Savings, and Privacy Screens

**Files:**
- Modify: `Renew作品集/lib/screens.js`
- Modify: `Renew作品集/tests/screens.test.js`

**Interfaces:**
- Consumes: `shell` and `SCREEN_CSS` from Task 3.
- Produces: additional screen IDs `08-cancel-assistant`, `09-savings-report`, `10-privacy-settings`.
- Produces: CSS classes `step`, `step-num`, `check`, `check.on`, `stamp`, and `swatch`.

- [ ] **Step 1: Extend the failing screen test to all ten screens**

Replace the test body in `Renew作品集/tests/screens.test.js` with:

```javascript
const test = require('node:test');
const assert = require('node:assert/strict');
const { screens } = require('../lib/screens');

test('contains the ten approved Renew screens in order', () => {
  assert.deepEqual(screens.map((screen) => screen.id), [
    '01-onboarding',
    '02-import-center',
    '03-detection-queue',
    '04-confirmation-editor',
    '05-renewal-radar',
    '06-renewal-calendar',
    '07-subscription-detail',
    '08-cancel-assistant',
    '09-savings-report',
    '10-privacy-settings'
  ]);
  assert.match(screens[0].html, /把偷偷续费/);
  assert.match(screens[4].html, /未来 7 天/);
  assert.match(screens[7].html, /取消前检查/);
  assert.match(screens[8].html, /预计节省/);
  assert.match(screens[9].html, /不保存完整邮件/);
});
```

- [ ] **Step 2: Run the screen test and verify it fails**

Run from `Renew作品集`: `node --test tests/screens.test.js`

Expected: FAIL because only seven screen IDs exist.

- [ ] **Step 3: Add cancellation, savings, and privacy CSS**

Append the following CSS inside `SCREEN_CSS` in `Renew作品集/lib/screens.js`, immediately before the closing backtick:

```css
.step{display:flex;gap:12px;padding:12px 0;border-bottom:1px solid ${tokens.colors.line}}.step:last-child{border-bottom:0}
.step-num{width:28px;height:28px;flex:0 0 auto;border-radius:50%;display:grid;place-items:center;background:${tokens.colors.ink};color:${tokens.colors.surface};font-family:${MONO};font-size:11px}
.step.done .step-num{background:${tokens.colors.acid};color:${tokens.colors.ink}}
.check{width:22px;height:22px;border-radius:7px;border:1px solid ${tokens.colors.lineStrong};display:grid;place-items:center;font-size:12px}.check.on{background:${tokens.colors.acid};border-color:${tokens.colors.acid}}
.stamp{display:inline-flex;align-items:center;justify-content:center;height:34px;padding:0 12px;border:1px solid ${tokens.colors.signal};color:${tokens.colors.signal};border-radius:6px;font-family:${MONO};font-size:11px;letter-spacing:.08em;transform:rotate(-3deg)}
.swatch{height:54px;border-radius:12px;border:1px solid ${tokens.colors.line};display:flex;align-items:flex-end;padding:8px;color:${tokens.colors.surface};font-family:${MONO};font-size:9px}.swatch.light{color:${tokens.colors.ink}}
```

- [ ] **Step 4: Add the final three screen objects**

Before the closing `];` in `Renew作品集/lib/screens.js`, append a comma after the last screen and then:

```javascript
  {
    id: '08-cancel-assistant',
    label: '取消助手',
    html: shell({
      body: `<div class="body"><div class="kicker">Cancel Assistant · 4 steps</div><h2 style="margin-top:8px">取消前检查</h2><p style="margin-top:8px">先确认剩余权益、导出内容和取消后的生效时间。</p><div class="card" style="margin-top:16px"><div class="step done"><div class="step-num">✓</div><div><h3>导出内容</h3><p>确认云盘文件已备份。</p></div></div><div class="step done"><div class="step-num">✓</div><div><h3>确认剩余权益</h3><p>取消后仍可使用到 10 月 20 日。</p></div></div><div class="step"><div class="step-num">3</div><div><h3>打开取消入口</h3><p>在账户设置中找到“管理订阅”。</p></div></div><div class="step"><div class="step-num">4</div><div><h3>保存取消凭证</h3><p>截图或记录确认邮件。</p></div></div></div><div class="card" style="margin-top:12px"><div class="mini">客服话术模板</div><p style="margin-top:8px">“你好，我希望取消当前 CloudBox 年付订阅，并确认不会在下个周期自动续费。请提供取消确认编号。”</p></div><div class="btn" style="margin-top:16px">复制话术并开始</div><div class="btn ghost" style="margin-top:10px">我还不想取消</div><div class="stamp" style="margin-top:18px">DEMO CANCEL FLOW</div></div><div class="nav"><div><b>⌂</b>首页</div><div><b>◷</b>日历</div><div><b>▤</b>订阅</div><div><b>↘</b>节省</div></div>`
    })
  },
  {
    id: '09-savings-report',
    label: '节省报告',
    html: shell({
      body: `<div class="body"><div class="kicker">Savings · October</div><h2 style="margin-top:8px">预计节省</h2><div class="amount" style="margin-top:10px">¥816</div><p>来自 3 个已经确认取消的订阅。金额为模拟数据。</p><div class="card" style="margin-top:16px"><div class="row"><div><h3>StreamMax</h3><p>已取消 · 月付</p></div><b class="mono">¥68</b></div><div class="row"><div><h3>CloudBox</h3><p>等待确认 · 年付</p></div><b class="mono">$12.99</b></div><div class="row"><div><h3>FocusKit</h3><p>已取消 · 月付</p></div><b class="mono">¥45</b></div></div><div class="card" style="margin-top:12px;background:rgba(200,244,90,.12)"><div class="row" style="border-bottom:0"><div><h3>下一次验证</h3><p>10 月 20 日再次检查是否扣费。</p></div><span class="chip acid">已安排</span></div></div></div><div class="nav"><div><b>⌂</b>首页</div><div><b>◷</b>日历</div><div><b>▤</b>订阅</div><div><b>↘</b>节省</div></div>`
    })
  },
  {
    id: '10-privacy-settings',
    label: '隐私与设置',
    html: shell({
      body: `<div class="body"><div class="kicker">Privacy · Your boundary</div><h2 style="margin-top:8px">不保存完整邮件</h2><p style="margin-top:8px">Renew 只保留识别所需的字段，并显示每一条信息的来源。</p><div class="card" style="margin-top:16px"><div class="row"><div><h3>不接入银行卡密码</h3><p>演示版本不连接任何真实支付账户。</p></div><span class="check on">✓</span></div><div class="row"><div><h3>不保存完整邮件</h3><p>只保留商户、金额、周期和续费日。</p></div><span class="check on">✓</span></div><div class="row"><div><h3>允许删除识别记录</h3><p>单条删除或清除全部演示数据。</p></div><span class="check on">✓</span></div></div><div class="card" style="margin-top:12px"><span class="mini">演示数据声明</span><p style="margin-top:7px">当前所有订阅名称、金额和日期均为作品集模拟数据，不代表真实用户或真实交易。</p></div><div class="grid-2" style="margin-top:16px"><div class="btn">导出数据</div><div class="btn ghost">删除全部</div></div></div><div class="nav"><div><b>⌂</b>首页</div><div><b>◷</b>日历</div><div><b>▤</b>订阅</div><div><b>↘</b>节省</div></div>`
    })
  }
```

- [ ] **Step 5: Run the screen test and verify it passes**

Run from `Renew作品集`: `node --test tests/screens.test.js`

Expected: PASS.

- [ ] **Step 6: Commit**

```powershell
git add -- Renew作品集/lib/screens.js Renew作品集/tests/screens.test.js
git commit -m "feat: add Renew cancellation and trust screens"
```

---
### Task 6: Add Five Portfolio Diagrams

**Files:**
- Create: `Renew作品集/lib/diagrams.js`
- Create: `Renew作品集/tests/diagrams.test.js`

**Interfaces:**
- Consumes: `tokens`.
- Produces: `diagrams` array where each item is `{ id, label, width, height, html }`.
- Diagram IDs: `detection-flow`, `information-architecture`, `risk-model`, `cancellation-flow`, `trust-boundary`.

- [ ] **Step 1: Write the failing diagram test**

`Renew作品集/tests/diagrams.test.js`:

```javascript
const test = require('node:test');
const assert = require('node:assert/strict');
const { diagrams } = require('../lib/diagrams');

test('contains the five approved Renew diagrams', () => {
  assert.deepEqual(diagrams.map((item) => item.id), [
    'detection-flow',
    'information-architecture',
    'risk-model',
    'cancellation-flow',
    'trust-boundary'
  ]);
  assert.match(diagrams[0].html, /导入线索/);
  assert.match(diagrams[1].html, /首页/);
  assert.match(diagrams[2].html, /高风险/);
  assert.match(diagrams[3].html, /保存凭证/);
  assert.match(diagrams[4].html, /不接入银行卡密码/);
});
```

- [ ] **Step 2: Run the diagram test and verify it fails**

Run from `Renew作品集`: `node --test tests/diagrams.test.js`

Expected: FAIL because `../lib/diagrams` does not exist.

- [ ] **Step 3: Implement the five diagrams**

`Renew作品集/lib/diagrams.js`:

```javascript
const tokens = require('./tokens');

const CSS = `
*{box-sizing:border-box;margin:0;padding:0;-webkit-font-smoothing:antialiased}
body{font-family:${tokens.font.body};background:${tokens.colors.paper};color:${tokens.colors.ink}}
.canvas{width:1240px;height:760px;padding:54px 58px 44px;background:${tokens.colors.paper};position:relative;overflow:hidden}
.head{display:flex;justify-content:space-between;gap:30px;align-items:flex-end;border-bottom:1px solid ${tokens.colors.line};padding-bottom:22px}
.kicker{font-family:${tokens.font.mono};font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:${tokens.colors.signal}}
.title{font-family:${tokens.font.display};font-size:42px;letter-spacing:-.04em;margin-top:7px}.sub{max-width:560px;font-size:14px;line-height:1.6;color:${tokens.colors.muted}}
.grid{display:grid;gap:14px;margin-top:24px}.card{background:${tokens.colors.surface};border:1px solid ${tokens.colors.line};border-radius:18px;padding:18px}
.card h3{font-family:${tokens.font.display};font-size:18px;font-weight:500}.card p,.card li{font-size:13px;line-height:1.55;color:${tokens.colors.muted}}.card ul{padding-left:17px;margin-top:8px}.tag{display:inline-flex;align-items:center;height:25px;padding:0 9px;border-radius:999px;background:rgba(255,90,54,.12);color:#B83A22;font-size:10px;font-weight:700}.tag.acid{background:rgba(200,244,90,.18);color:#465B00}.tag.warn{background:rgba(243,181,68,.18);color:#7A5200}
.node{min-height:86px;border-radius:16px;background:${tokens.colors.surface};border:1px solid ${tokens.colors.line};padding:15px;text-align:center;display:flex;flex-direction:column;justify-content:center}.node b{font-size:15px}.node span{display:block;font-size:11px;color:${tokens.colors.muted};margin-top:5px}.arrow{font-family:${tokens.font.mono};color:${tokens.colors.signal};font-size:24px;display:flex;align-items:center;justify-content:center}.footer{position:absolute;left:58px;right:58px;bottom:26px;display:flex;justify-content:space-between;font-family:${tokens.font.mono};font-size:10px;color:${tokens.colors.muted};letter-spacing:.12em;text-transform:uppercase}
.risk{border-radius:16px;padding:18px;min-height:250px;border:1px solid ${tokens.colors.line};background:${tokens.colors.surface}}.risk.high{border-color:${tokens.colors.signal}}.risk.mid{border-color:${tokens.colors.warning}}.risk.low{border-color:${tokens.colors.acid}}.risk b{font-family:${tokens.font.display};font-size:25px;display:block}.risk p{margin-top:8px}.risk ul{margin-top:14px}
`;

function canvas(title, sub, body) {
  return `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><style>${CSS}</style></head><body><div class="canvas"><div class="head"><div><div class="kicker">Renew · Evidence</div><div class="title">${title}</div></div><div class="sub">${sub}</div></div>${body}<div class="footer"><span>续费侦探 Renew · UI/UX Case Study</span><span>Simulation only</span></div></div></body></html>`;
}

const flowNode = (title, copy) => `<div class="node"><b>${title}</b><span>${copy}</span></div>`;

const detectionFlow = canvas(
  '从线索到决定',
  '识别不是终点。每条线索都要经过用户确认，才能进入续费雷达。',
  `<div class="grid" style="grid-template-columns:repeat(9,1fr)">${[
    ['导入线索', '账单 / 邮件 / 截图'],
    ['解析字段', '商户 / 金额 / 周期'],
    ['置信度', '高置信度直接确认'],
    ['用户确认', '低置信度字段修正'],
    ['加入雷达', '生成续费节点'],
    ['风险分级', '7 天 / 30 天 / 已处理'],
    ['作出决定', '保留 / 暂停 / 取消'],
    ['执行行动', '步骤 / 话术 / 凭证'],
    ['验证结果', '续费日再次检查']
  ].map(([title, copy], index, list) => `${flowNode(title, copy)}${index < list.length - 1 ? '<div class="arrow">→</div>' : ''}`).join('')}</div><div class="card" style="margin-top:22px"><span class="tag">关键原则</span><p style="margin-top:10px">AI 只提供识别结果和风险解释。取消仍然由用户执行，系统只负责把复杂流程拆开。</p></div>`
);

const informationArchitecture = canvas(
  '信息架构',
  '首页负责回答“最近会发生什么”，识别中心负责建立信任，订阅库负责长期管理。',
  `<div class="grid" style="grid-template-columns:repeat(4,1fr)"><div class="card"><span class="tag">01</span><h3 style="margin-top:10px">首页</h3><p>续费雷达、未来 7 天扣费、待确认线索。</p></div><div class="card"><span class="tag">02</span><h3 style="margin-top:10px">日历</h3><p>周、月、年视图，展示扣费节奏和支出冲突。</p></div><div class="card"><span class="tag">03</span><h3 style="margin-top:10px">订阅</h3><p>订阅库、分类、搜索、状态筛选和详情。</p></div><div class="card"><span class="tag">04</span><h3 style="margin-top:10px">节省</h3><p>已取消项目、预计节省和下一次验证。</p></div></div><div class="grid" style="grid-template-columns:repeat(3,1fr);margin-top:18px"><div class="card"><h3>识别中心</h3><p>从首页中央入口进入，承载导入、解析、确认和失败重试。</p></div><div class="card"><h3>订阅详情</h3><p>价格历史、使用记录、识别来源和取消入口。</p></div><div class="card"><h3>设置与隐私</h3><p>数据来源、隐藏规则、导出、删除和关闭智能识别。</p></div></div>`
);

const riskModel = canvas(
  '续费风险模型',
  '风险不是价值判断，而是帮助用户优先处理最紧迫决定。',
  `<div class="grid" style="grid-template-columns:repeat(3,1fr)"><div class="risk high"><span class="tag">高风险</span><b style="margin-top:12px">7 天内</b><p>金额较高、使用频率低或刚刚涨价。</p><ul><li>进入首页最高优先级</li><li>显示原价、现价和生效日期</li><li>提供取消入口</li></ul></div><div class="risk mid"><span class="tag warn">中风险</span><b style="margin-top:12px">30 天内</b><p>需要关注，但不一定马上行动。</p><ul><li>显示在日历中圈</li><li>允许延后提醒</li><li>建议比较使用频率</li></ul></div><div class="risk low"><span class="tag acid">低风险</span><b style="margin-top:12px">已处理</b><p>用户已确认保留、暂停或取消成功。</p><ul><li>不继续打扰</li><li>保留历史来源</li><li>续费日前再次验证</li></ul></div></div>`
);

const cancellationFlow = canvas(
  '取消不是一次按钮点击',
  '把取消拆成准备、操作、确认和验证四个阶段，让用户知道自己在哪一步。',
  `<div class="grid" style="grid-template-columns:repeat(7,1fr)">${[
    ['检查权益', '还剩多少时间'],
    ['导出内容', '避免丢失文件'],
    ['打开入口', '找到管理订阅'],
    ['执行取消', '复制客服话术'],
    ['保存凭证', '记录确认编号'],
    ['等待生效', '显示生效日期'],
    ['再次验证', '续费日检查扣费']
  ].map(([title, copy], index, list) => `${flowNode(title, copy)}${index < list.length - 1 ? '<div class="arrow">→</div>' : ''}`).join('')}</div><div class="card" style="margin-top:22px;background:rgba(200,244,90,.12)"><p><b>成功定义：</b>用户完成明确决策，而不是被产品说服继续付费。</p></div>`
);

const trustBoundary = canvas(
  '信任边界',
  '作品集原型不碰真实支付和隐私数据，所有智能能力都必须可解释、可修改、可撤回。',
  `<div class="grid" style="grid-template-columns:repeat(3,1fr)"><div class="card"><span class="tag">可解释</span><h3 style="margin-top:12px">不接入银行卡密码</h3><p>只处理用户主动提供的账单、邮件或截图。</p></div><div class="card"><span class="tag acid">可修改</span><h3 style="margin-top:12px">每个字段都可修正</h3><p>低置信度字段必须高亮，识别结果不能自动写入永久记录。</p></div><div class="card"><span class="tag warn">可撤回</span><h3 style="margin-top:12px">不保存完整邮件</h3><p>用户可以删除单条线索、清除全部数据或关闭智能识别。</p></div></div><div class="card" style="margin-top:20px"><h3>作品集边界</h3><p style="margin-top:8px">本案例使用模拟账单、模拟邮件和模拟识别结果，不连接真实邮箱、支付平台或订阅账号。</p></div>`
);

const diagrams = [
  { id: 'detection-flow', label: '从线索到决定', width: 1240, height: 760, html: detectionFlow },
  { id: 'information-architecture', label: '信息架构', width: 1240, height: 760, html: informationArchitecture },
  { id: 'risk-model', label: '续费风险模型', width: 1240, height: 760, html: riskModel },
  { id: 'cancellation-flow', label: '取消流程', width: 1240, height: 760, html: cancellationFlow },
  { id: 'trust-boundary', label: '信任边界', width: 1240, height: 760, html: trustBoundary }
];

module.exports = { diagrams };
```

- [ ] **Step 4: Run the diagram test and verify it passes**

Run from `Renew作品集`: `node --test tests/diagrams.test.js`

Expected: PASS.

- [ ] **Step 5: Commit**

```powershell
git add -- Renew作品集/lib/diagrams.js Renew作品集/tests/diagrams.test.js
git commit -m "feat: add Renew portfolio diagrams"
```

---
### Task 7: Add Key Visual and Motion Posters

**Files:**
- Create: `Renew作品集/lib/motion.js`
- Create: `Renew作品集/tests/motion.test.js`

**Interfaces:**
- Consumes: `tokens`.
- Produces: `motionAssets` array where each item is `{ id, label, html, poster, animated }`.
- Asset IDs: `key-visual`, `radar-orbit`, `scan-detect`.
- Poster paths: `kv/key-visual.png`, `motion/radar-orbit.png`, `motion/scan-detect.png`.

- [ ] **Step 1: Write the failing motion test**

`Renew作品集/tests/motion.test.js`:

```javascript
const test = require('node:test');
const assert = require('node:assert/strict');
const { motionAssets } = require('../lib/motion');

test('contains the three approved Renew visual assets', () => {
  assert.deepEqual(motionAssets.map((item) => item.id), [
    'key-visual',
    'radar-orbit',
    'scan-detect'
  ]);
  assert.match(motionAssets[0].html, /Renew/);
  assert.match(motionAssets[1].html, /续费雷达/);
  assert.match(motionAssets[2].html, /低置信度/);
  assert.match(motionAssets[2].html, /prefers-reduced-motion/);
});
```

- [ ] **Step 2: Run the motion test and verify it fails**

Run from `Renew作品集`: `node --test tests/motion.test.js`

Expected: FAIL because `../lib/motion` does not exist.

- [ ] **Step 3: Implement the three local visual assets**

`Renew作品集/lib/motion.js`:

```javascript
const tokens = require('./tokens');

const BASE = `
*{box-sizing:border-box;margin:0;padding:0;-webkit-font-smoothing:antialiased}
body{font-family:${tokens.font.body};background:${tokens.colors.paper};color:${tokens.colors.ink}}
.scene{position:relative;width:1600px;height:1000px;overflow:hidden;background:${tokens.colors.paper}}
.mono{font-family:${tokens.font.mono};font-variant-numeric:tabular-nums}
.display{font-family:${tokens.font.display};font-weight:500;letter-spacing:-.05em}
.kicker{font-family:${tokens.font.mono};font-size:14px;letter-spacing:.2em;text-transform:uppercase;color:${tokens.colors.signal}}
.caption{font-size:16px;line-height:1.6;color:rgba(21,21,21,.64)}
@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
`;

const keyVisual = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><style>${BASE}
.scene{background:${tokens.colors.ink};color:${tokens.colors.surface}}
.grid{position:absolute;inset:0;background:none}
.copy{position:absolute;left:92px;top:92px;z-index:2}.copy h1{font-size:148px;line-height:.86;margin-top:22px}.copy h1 span{display:block;color:${tokens.colors.acid};font-size:78px;letter-spacing:-.02em;margin-top:16px}.copy p{max-width:620px;color:rgba(255,253,248,.64);font-size:21px;line-height:1.55;margin-top:34px}.meta{position:absolute;left:96px;bottom:72px;display:flex;gap:12px}.meta b{font-family:${tokens.font.mono};font-size:12px;font-weight:500;padding:10px 14px;border:1px solid rgba(255,253,248,.22);border-radius:999px;color:rgba(255,253,248,.72)}
.radar{position:absolute;right:70px;top:90px;width:720px;height:720px;border-radius:50%;border:2px solid ${tokens.colors.signal)}
.radar:before,.radar:after{content:"";position:absolute;border-radius:50%;border:1px solid rgba(255,253,248,.18)}.radar:before{inset:112px}.radar:after{inset:224px}
.axis-x{position:absolute;right:70px;top:450px;width:720px;height:1px;background:rgba(255,253,248,.18)}.axis-y{position:absolute;right:430px;top:90px;width:1px;height:720px;background:rgba(255,253,248,.18)}
.node{position:absolute;width:28px;height:28px;border-radius:50%;background:${tokens.colors.signal};outline:9px solid rgba(255,90,54,.14)}.node.a{right:160px;top:172px}.node.b{right:594px;top:274px}.node.c{right:240px;top:650px}.node.d{right:674px;top:610px}.node.e{right:440px;top:438px;background:${tokens.colors.acid};outline:9px solid rgba(200,244,90,.14)}
.center{position:absolute;right:378px;top:378px;width:144px;height:144px;border-radius:50%;background:${tokens.colors.surface};color:${tokens.colors.ink};display:grid;place-items:center;text-align:center;font-size:15px;font-weight:700}.center span{display:block;font-family:${tokens.font.mono};font-size:11px;font-weight:400;color:${tokens.colors.muted};margin-top:5px}
</style></head><body><div class="scene"><div class="grid"></div><div class="copy"><div class="kicker">UI/UX Case Study · Simulation only</div><h1>续费侦探<span>Renew</span></h1><p>把分散在账单、邮件和截图里的订阅，整理成一张可读、可信、可行动的续费地图。</p></div><div class="radar"></div><div class="axis-x"></div><div class="axis-y"></div><div class="node a"></div><div class="node b"></div><div class="node c"></div><div class="node d"></div><div class="node e"></div><div class="center">今天<span>10.02</span></div><div class="meta"><b>识别线索</b><b>续费雷达</b><b>取消助手</b></div></div></body></html>`;

const radarOrbit = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><style>${BASE}
.scene{background:${tokens.colors.ink};color:${tokens.colors.surface}}
.head{position:absolute;left:76px;top:70px}.head h1{font-size:68px;margin-top:10px}.head p{max-width:580px;color:rgba(255,253,248,.64);font-size:18px;line-height:1.55;margin-top:18px}
.stage{position:absolute;right:60px;top:80px;width:820px;height:820px}.ring{position:absolute;inset:0;border-radius:50%;border:1px solid rgba(255,253,248,.18)}.ring.two{inset:120px}.ring.three{inset:240px}
.rotor{position:absolute;inset:0;animation:rotate 18s linear infinite}.node{position:absolute;width:34px;height:34px;border-radius:50%;background:${tokens.colors.signal};outline:12px solid rgba(255,90,54,.14)}.node.a{left:390px;top:12px}.node.b{left:86px;top:346px;background:${tokens.colors.warning};outline:12px solid rgba(243,181,68,.14)}.node.c{left:628px;top:612px;background:${tokens.colors.muted};outline:12px solid rgba(139,135,126,.14)}
.center{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:176px;height:176px;border-radius:50%;background:${tokens.colors.surface};color:${tokens.colors.ink};display:grid;place-items:center;text-align:center;font-size:17px;font-weight:700}.center span{display:block;font-family:${tokens.font.mono};font-size:12px;font-weight:400;color:${tokens.colors.muted};margin-top:5px}
.legend{position:absolute;left:78px;bottom:70px;display:grid;gap:10px}.legend b{font-family:${tokens.font.mono};font-size:12px;font-weight:500;color:rgba(255,253,248,.7)}.legend i{display:inline-block;width:9px;height:9px;border-radius:50%;margin-right:8px}.legend .r{background:${tokens.colors.signal}}.legend .y{background:${tokens.colors.warning}}.legend .g{background:${tokens.colors.muted}}
@keyframes rotate{from{transform:rotate(0)}to{transform:rotate(360deg)}}
</style></head><body><div class="scene"><div class="head"><div class="kicker">Renewal Radar · Simulated data</div><h1>续费雷达</h1><p>临近续费的节点进入内圈。用户先看到金额、来源和日期，再决定是否继续。</p></div><div class="stage"><div class="ring"></div><div class="ring two"></div><div class="ring three"></div><div class="rotor"><div class="node a"></div><div class="node b"></div><div class="node c"></div></div><div class="center">今天<span>即将扣费 3 笔</span></div></div><div class="legend"><b><i class="r"></i>7 天内高风险</b><b><i class="y"></i>30 天内需关注</b><b><i class="g"></i>已处理或暂停</b></div></div></body></html>`;

const scanDetect = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><style>${BASE}
.scene{background:${tokens.colors.paper}}
.head{position:absolute;left:76px;top:70px}.head h1{font-size:68px;margin-top:10px}.head p{max-width:700px;color:rgba(21,21,21,.62);font-size:18px;line-height:1.55;margin-top:18px}
.stage{position:absolute;left:76px;right:76px;top:270px;bottom:70px;display:grid;grid-template-columns:1fr 1fr;gap:34px}
.panel{background:${tokens.colors.surface};border:1px solid ${tokens.colors.line};border-radius:24px;padding:28px;position:relative;overflow:hidden}.panel h2{font-family:${tokens.font.display};font-size:28px;font-weight:500}.bill{position:absolute;left:34px;right:34px;top:98px;bottom:34px;background:#EDE7DC;border:1px solid rgba(21,21,21,.18);padding:28px;font-family:${tokens.font.mono};font-size:14px;line-height:2.05}.scanline{position:absolute;left:0;right:0;top:0;height:4px;background:${tokens.colors.signal};animation:scan 3.2s ${tokens.motion.easing} infinite}
.field{border:1px solid ${tokens.colors.line};border-radius:14px;padding:15px;margin-top:12px}.field span{display:block;font-size:11px;color:${tokens.colors.muted};letter-spacing:.08em;text-transform:uppercase}.field b{display:block;font-family:${tokens.font.mono};font-size:22px;margin-top:6px}.field.warn{border-color:${tokens.colors.warning};background:rgba(243,181,68,.1)}.field.acid{border-color:${tokens.colors.acid};background:rgba(200,244,90,.12)}.tag{display:inline-flex;align-items:center;height:30px;padding:0 11px;border-radius:999px;background:rgba(255,90,54,.12);color:#B83A22;font-size:11px;font-weight:700}
@keyframes scan{0%{transform:translateY(0)}50%{transform:translateY(430px)}100%{transform:translateY(0)}}
</style></head><body><div class="scene"><div class="head"><div class="kicker">Detection · Human in the loop</div><h1>识别，但不替用户确认</h1><p>扫描结果保留来源和置信度。低置信度字段必须由用户检查后才能进入续费雷达。</p></div><div class="stage"><div class="panel"><span class="tag">账单截图</span><h2 style="margin-top:14px">CloudBox Invoice</h2><div class="bill"><div>CloudBox Pro</div><div>Billing cycle: annual</div><div>Amount: USD 12.99</div><div>Next charge: 2026-10-20</div><div style="margin-top:70px;color:${tokens.colors.muted}">source · simulated bill</div></div><div class="scanline"></div></div><div class="panel"><span class="tag">识别结果</span><h2 style="margin-top:14px">确认字段</h2><div class="field"><span>商户</span><b>CloudBox</b></div><div class="field acid"><span>金额</span><b>$12.99</b></div><div class="field warn"><span>周期 · 低置信度</span><b>年付 / 月付？</b></div><div class="field warn"><span>下次续费日 · 低置信度</span><b>2026-10-20</b></div></div></div></div></body></html>`;

const motionAssets = [
  { id: 'key-visual', label: '项目主视觉', html: keyVisual, poster: 'kv/key-visual.png', animated: false },
  { id: 'radar-orbit', label: '续费雷达轨道', html: radarOrbit, poster: 'motion/radar-orbit.png', animated: true },
  { id: 'scan-detect', label: '识别扫描演示', html: scanDetect, poster: 'motion/scan-detect.png', animated: true }
];

module.exports = { motionAssets };
```

- [ ] **Step 4: Run the motion test and verify it passes**

Run from `Renew作品集`: `node --test tests/motion.test.js`

Expected: PASS.

- [ ] **Step 5: Commit**

```powershell
git add -- Renew作品集/lib/motion.js Renew作品集/tests/motion.test.js
git commit -m "feat: add Renew motion posters"
```

---
### Task 8: Add the Asset Render Orchestrator

**Files:**
- Create: `Renew作品集/render.js`
- Create: `Renew作品集/tests/render.test.js`

**Interfaces:**
- Consumes: `captureHtml`, `screens`, `diagrams`, `motionAssets`, `tokens`.
- Produces: exported async functions `renderScreens()`, `renderDiagrams()`, `renderMotionAssets()`, and `main()`.
- Writes: `screens/*.png`, `src/*.html`, `diagrams/*.png`, `diagrams/src/*.html`, `kv/key-visual.png`, and `motion/*.png`.

- [ ] **Step 1: Write the failing render contract test**

`Renew作品集/tests/render.test.js`:

```javascript
const test = require('node:test');
const assert = require('node:assert/strict');
const render = require('../render');

test('exports the three asset render phases', () => {
  assert.equal(typeof render.renderScreens, 'function');
  assert.equal(typeof render.renderDiagrams, 'function');
  assert.equal(typeof render.renderMotionAssets, 'function');
  assert.equal(typeof render.main, 'function');
});
```

- [ ] **Step 2: Run the render test and verify it fails**

Run from `Renew作品集`: `node --test tests/render.test.js`

Expected: FAIL because `../render` does not exist.

- [ ] **Step 3: Implement the render orchestrator**

`Renew作品集/render.js`:

```javascript
const fs = require('node:fs');
const path = require('node:path');
const { captureHtml } = require('./lib/capture');
const { screens } = require('./lib/screens');
const { diagrams } = require('./lib/diagrams');
const { motionAssets } = require('./lib/motion');
const tokens = require('./lib/tokens');

const ROOT = __dirname;
const SCREEN_DIR = path.join(ROOT, 'screens');
const SRC_DIR = path.join(ROOT, 'src');
const DIAGRAM_DIR = path.join(ROOT, 'diagrams');
const DIAGRAM_SRC_DIR = path.join(DIAGRAM_DIR, 'src');
const KV_DIR = path.join(ROOT, 'kv');
const MOTION_DIR = path.join(ROOT, 'motion');

async function renderScreens() {
  fs.mkdirSync(SCREEN_DIR, { recursive: true });
  fs.mkdirSync(SRC_DIR, { recursive: true });
  for (const screen of screens) {
    fs.writeFileSync(path.join(SRC_DIR, `${screen.id}.html`), screen.html, 'utf8');
    await captureHtml({
      html: screen.html,
      output: path.join(SCREEN_DIR, `${screen.id}.png`),
      width: tokens.screens.width,
      height: tokens.screens.height,
      scale: tokens.screens.scale
    });
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

async function renderMotionAssets() {
  fs.mkdirSync(KV_DIR, { recursive: true });
  fs.mkdirSync(MOTION_DIR, { recursive: true });
  for (const asset of motionAssets) {
    const output = path.join(ROOT, asset.poster);
    const source = asset.id === 'key-visual'
      ? path.join(KV_DIR, 'key-visual.html')
      : path.join(MOTION_DIR, `${asset.id}.html`);
    fs.writeFileSync(source, asset.html, 'utf8');
    await captureHtml({
      html: asset.html,
      output,
      width: 1600,
      height: 1000,
      scale: 1
    });
    console.log(`motion ${asset.id}`);
  }
}

async function main() {
  await renderScreens();
  await renderDiagrams();
  await renderMotionAssets();
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

module.exports = { renderScreens, renderDiagrams, renderMotionAssets, main };
```

- [ ] **Step 4: Run the render contract test and generate all assets**

Run from `Renew作品集`:

```powershell
node --test tests/render.test.js
npm run render
```

Expected: PASS, then generated logs for 10 screens, 5 diagrams, and 3 motion assets.

- [ ] **Step 5: Verify generated counts**

Run from repository root:

```powershell
(Get-ChildItem 'Renew作品集\screens' -Filter '*.png').Count
(Get-ChildItem 'Renew作品集\diagrams' -Filter '*.png').Count
(Get-ChildItem 'Renew作品集\motion' -Filter '*.png').Count
```

Expected: `10`, `5`, and `2`. The key visual is stored at `Renew作品集/kv/key-visual.png`.

- [ ] **Step 6: Commit**

```powershell
git add -- Renew作品集/render.js Renew作品集/tests/render.test.js Renew作品集/src Renew作品集/screens Renew作品集/diagrams Renew作品集/kv Renew作品集/motion
git commit -m "feat: render Renew portfolio assets"
```

---
### Task 9: Build the Responsive Case-Study Page

**Files:**
- Create: `Renew作品集/index.html`
- Create: `Renew作品集/tests/index.test.js`

**Interfaces:**
- Consumes: generated images in `kv/`, `screens/`, `diagrams/`, and `motion/`.
- Produces: a single responsive HTML case study with required section IDs in this order:
  `hero`, `thesis`, `screens`, `detection`, `radar`, `cancellation`, `trust`, `system`, `metrics`, `quality`.

- [ ] **Step 1: Write the failing index test**

`Renew作品集/tests/index.test.js`:

```javascript
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

test('portfolio prioritizes product logic, UI, trust, and visual system', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  const ordered = ['hero', 'thesis', 'screens', 'detection', 'radar', 'cancellation', 'trust', 'system', 'metrics', 'quality'];
  for (const id of ordered) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
  const positions = ordered.map((id) => html.indexOf(`id="${id}"`));
  assert.deepEqual(positions, [...positions].sort((a, b) => a - b));
  assert.match(html, /续费侦探 Renew/);
  assert.match(html, /AI 负责识别，用户负责确认/);
  assert.match(html, /所有订阅、金额和日期均为模拟数据/);
  assert.doesNotMatch(html, /https?:\/\//);
});
```

- [ ] **Step 2: Run the index test and verify it fails**

Run from `Renew作品集`: `node --test tests/index.test.js`

Expected: FAIL because `index.html` does not exist.

- [ ] **Step 3: Implement `index.html`**

`Renew作品集/index.html`:

```html
<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>续费侦探 Renew · 订阅管理 App — UI/UX 作品集</title>
<style>
:root{
  --paper:#F4F0E8;--surface:#FFFDF8;--ink:#151515;--signal:#FF5A36;--acid:#C8F45A;--warning:#F3B544;--muted:#8B877E;
  --line:rgba(21,21,21,.14);--line-strong:rgba(21,21,21,.28);--r:20px;--ease:cubic-bezier(.22,.61,.36,1)
}
*{box-sizing:border-box;margin:0;padding:0;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
html{scroll-behavior:smooth}
body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif;background:var(--paper);color:var(--ink);line-height:1.6;letter-spacing:.002em}
img{display:block;max-width:100%;height:auto}a{color:inherit;text-decoration:none}
nav{position:sticky;top:0;z-index:90;height:58px;background:rgba(244,240,232,.94);border-bottom:1px solid var(--line)}
nav .in,.wrap{max-width:1220px;margin:0 auto;padding:0 32px}
nav .in{height:100%;display:flex;align-items:center;justify-content:space-between}
.brand{font-family:"Noto Serif SC","Songti SC",serif;font-size:17px}.brand b{color:var(--signal)}
.links{display:flex;gap:22px;font-size:12px;color:var(--muted)}.links a:hover{color:var(--ink)}
section{padding:104px 0;position:relative}.tight{padding:82px 0}.dark{background:var(--ink);color:var(--surface)}.dark p,.dark .lead{color:rgba(255,253,248,.68)}.surface{background:var(--surface)}
.eyebrow{font-family:"SFMono-Regular","Cascadia Code",monospace;font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--signal)}
h1,h2,h3{font-family:"Noto Serif SC","Songti SC","STSong",serif;font-weight:500}
h2{font-size:52px;line-height:1.08;letter-spacing:-.045em;margin-top:12px;max-width:900px}h3{font-size:20px;line-height:1.3;letter-spacing:-.02em}
.lead{font-size:19px;line-height:1.62;color:rgba(21,21,21,.65);margin-top:18px;max-width:830px}.small{font-size:13px;color:var(--muted)}
.block{margin-top:44px}.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:20px}.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:15px}
.card{background:var(--surface);border:1px solid var(--line);border-radius:var(--r);padding:24px}.dark .card{background:rgba(255,253,248,.055);border-color:rgba(255,253,248,.14)}
.card p{font-size:14px;color:rgba(21,21,21,.64);margin-top:8px}.dark .card p{color:rgba(255,253,248,.66)}
.tag{display:inline-flex;align-items:center;min-height:28px;padding:0 10px;border-radius:999px;background:rgba(255,90,54,.12);color:#B83A22;font-size:11px;font-weight:700}.tag.acid{background:rgba(200,244,90,.22);color:#465B00}.tag.warn{background:rgba(243,181,68,.18);color:#7A5200}
.hero{background:var(--ink);color:var(--surface);padding:0;border-bottom:1px solid rgba(255,253,248,.12)}
.hero .copy{padding-top:96px;display:grid;grid-template-columns:1.08fr .92fr;gap:48px;align-items:end}
.hero h1{font-size:102px;line-height:.88;letter-spacing:-.07em}.hero h1 span{display:block;color:var(--acid);font-size:58px;margin-top:12px;letter-spacing:-.04em}.hero .lead{max-width:650px}
.hero .meta{display:flex;gap:9px;flex-wrap:wrap;margin-top:28px}.hero .meta span{border:1px solid rgba(255,253,248,.22);border-radius:999px;padding:8px 12px;font-size:11px;color:rgba(255,253,248,.72)}
.hero .visual{margin-top:54px;border-top:1px solid rgba(255,253,248,.14);padding:34px 0 48px}.hero .visual img{border:1px solid rgba(255,253,248,.18);border-radius:24px}
.screens{display:grid;grid-template-columns:repeat(5,1fr);gap:16px}.screen-card{background:var(--surface);border:1px solid var(--line);border-radius:20px;padding:10px}.screen-card img{border:1px solid var(--line);border-radius:13px}.screen-card .label{padding:11px 3px 3px;font-size:12px;color:var(--muted)}.screen-card b{font-family:"SFMono-Regular","Cascadia Code",monospace;color:var(--signal);margin-right:6px}
.fig{background:var(--surface);border:1px solid var(--line);border-radius:24px;overflow:hidden}.fig img{width:100%}.fig figcaption{border-top:1px solid var(--line);padding:14px 18px;font-size:12px;color:var(--muted)}
.flowline{display:grid;grid-template-columns:repeat(5,1fr);gap:10px}.step{border:1px solid var(--line);border-radius:16px;padding:16px;background:var(--surface);min-height:118px}.step b{display:block;font-size:15px}.step span{display:block;font-size:12px;color:var(--muted);margin-top:7px}
.stack{display:grid;gap:12px}.stack-row{display:grid;grid-template-columns:150px 1fr auto;gap:18px;align-items:start;border-bottom:1px solid var(--line);padding:18px 0}.stack-row:last-child{border-bottom:0}.stack-row b{font-family:"SFMono-Regular","Cascadia Code",monospace;font-size:12px;color:var(--muted)}
.risk{border:1px solid var(--line);border-radius:18px;padding:20px;background:var(--surface)}.risk.high{border-color:var(--signal)}.risk.mid{border-color:var(--warning)}.risk.low{border-color:var(--acid)}.risk h3{margin-top:14px}.risk p{font-size:13px;color:var(--muted);margin-top:8px}
.swatches{display:grid;grid-template-columns:repeat(7,1fr);gap:10px}.swatch{height:78px;border:1px solid var(--line);border-radius:14px;display:flex;align-items:flex-end;padding:10px;font-family:"SFMono-Regular","Cascadia Code",monospace;font-size:10px}.swatch.light{color:var(--ink)}
.metrics .stack-row{grid-template-columns:260px 1fr}.quality-box{border:1px solid var(--signal);border-radius:22px;padding:26px;background:rgba(255,90,54,.06)}
footer{padding:30px 0;border-top:1px solid var(--line);font-size:12px;color:var(--muted)}
@media(max-width:1000px){.hero h1{font-size:78px}.screens{grid-template-columns:repeat(3,1fr)}.grid-4{grid-template-columns:repeat(2,1fr)}}
@media(max-width:680px){nav .links{display:none}.wrap,nav .in{padding:0 20px}h2{font-size:36px}.lead{font-size:17px}.hero .copy{grid-template-columns:1fr;padding-top:64px}.hero h1{font-size:58px}.hero h1 span{font-size:38px}.screens{grid-template-columns:1fr 1fr;gap:12px}.grid-2,.grid-3,.grid-4,.flowline{grid-template-columns:1fr}.swatches{grid-template-columns:1fr 1fr}.stack-row,.metrics .stack-row{grid-template-columns:1fr;gap:5px}.screen-card{padding:7px}}
</style>
</head>
<body>
<nav><div class="in"><div class="brand">续费侦探 <b>Renew</b></div><div class="links"><a href="#thesis">产品逻辑</a><a href="#screens">关键界面</a><a href="#trust">信任边界</a><a href="#system">视觉系统</a></div></div></nav>

<header id="hero" class="hero">
  <div class="wrap">
    <div class="copy">
      <div><div class="eyebrow">UI/UX Case Study · 2026</div><h1>续费侦探<span>Renew</span></h1></div>
      <div><p class="lead">把分散在账单、邮件和截图里的订阅，整理成一张可读、可信、可行动的续费地图。</p><div class="meta"><span>订阅识别</span><span>续费雷达</span><span>取消助手</span><span>模拟数据</span></div></div>
    </div>
    <div class="visual"><img src="kv/key-visual.png" alt="续费侦探 Renew 项目主视觉，中央是续费雷达和品牌标题"></div>
  </div>
</header>

<section id="thesis">
  <div class="wrap">
    <div class="eyebrow">01 · 机会</div><h2>订阅不是一笔支出，而是一组会自己回来的决定。</h2>
    <p class="lead">用户的问题不是不会记账，而是不知道下周会扣什么、哪些订阅已经失去价值，以及取消要从哪里开始。</p>
    <div class="grid-3 block">
      <article class="card"><span class="tag">看不见</span><h3 style="margin-top:12px">续费日期分散</h3><p>邮件、应用内通知和支付记录彼此分离，用户缺少统一视图。</p></article>
      <article class="card"><span class="tag warn">来不及</span><h3 style="margin-top:12px">提醒发生得太晚</h3><p>免费试用和年度订阅常在用户想起之前完成扣费。</p></article>
      <article class="card"><span class="tag acid">难行动</span><h3 style="margin-top:12px">取消路径不透明</h3><p>识别出问题只是第一步，真正困难的是确认剩余权益并完成取消。</p></article>
    </div>
    <div class="grid-2 block">
      <article class="card"><span class="tag">主 Persona</span><h3 style="margin-top:12px">林知夏 · 27 岁 · 互联网运营</h3><p>同时拥有 8～12 个订阅。会为了免费试用先开通服务，月底才发现扣费；不想做复杂预算，只想让订阅和续费变得透明。</p></article>
      <article class="card"><span class="tag acid">竞品间隙</span><h3 style="margin-top:12px">从记录历史，走向处理决定</h3><p>记账工具解释过去，提醒工具只发通知。Renew 把识别、风险解释和取消行动放在同一条路径里。</p></article>
    </div>
  </div>
</section>

<section id="screens" class="surface">
  <div class="wrap">
    <div class="eyebrow">02 · 关键界面</div><h2>十个界面，覆盖识别、判断和行动。</h2>
    <p class="lead">所有订阅名称、金额和日期均为模拟数据，用于展示产品逻辑和视觉系统。</p>
    <div class="screens block">
      <div class="screen-card"><img src="screens/01-onboarding.png" alt="Onboarding：把偷偷续费变成看得见的支出"><div class="label"><b>01</b>把续费变透明</div></div>
      <div class="screen-card"><img src="screens/02-import-center.png" alt="导入中心：上传账单截图、邮件或手动添加"><div class="label"><b>02</b>导入一条线索</div></div>
      <div class="screen-card"><img src="screens/03-detection-queue.png" alt="识别队列：高置信度和低置信度线索"><div class="label"><b>03</b>识别队列</div></div>
      <div class="screen-card"><img src="screens/04-confirmation-editor.png" alt="确认识别结果：修改低置信度字段"><div class="label"><b>04</b>确认识别结果</div></div>
      <div class="screen-card"><img src="screens/05-renewal-radar.png" alt="续费雷达：未来七天扣费节点和风险分级"><div class="label"><b>05</b>续费雷达</div></div>
      <div class="screen-card"><img src="screens/06-renewal-calendar.png" alt="续费日历：按周月年查看扣费节奏"><div class="label"><b>06</b>续费日历</div></div>
      <div class="screen-card"><img src="screens/07-subscription-detail.png" alt="订阅详情：价格变化、使用记录和取消入口"><div class="label"><b>07</b>订阅详情</div></div>
      <div class="screen-card"><img src="screens/08-cancel-assistant.png" alt="取消助手：检查、操作、确认和保存凭证"><div class="label"><b>08</b>取消助手</div></div>
      <div class="screen-card"><img src="screens/09-savings-report.png" alt="节省报告：已取消项目和下一次验证"><div class="label"><b>09</b>节省报告</div></div>
      <div class="screen-card"><img src="screens/10-privacy-settings.png" alt="隐私与设置：不保存完整邮件和演示数据声明"><div class="label"><b>10</b>隐私与设置</div></div>
    </div>
  </div>
</section>

<section id="detection">
  <div class="wrap">
    <div class="eyebrow">03 · 识别流程</div><h2>AI 负责识别，用户负责确认。</h2>
    <p class="lead">Renew 不把 OCR 结果直接变成扣费事实。每个字段都保留来源，低置信度信息必须经过用户检查。</p>
    <figure class="fig block"><img src="diagrams/detection-flow.png" alt="从线索到决定的流程图：导入、解析、确认、雷达、风险、行动和验证"><figcaption>识别流程将自动能力限制在建议层，避免错误信息直接进入用户的财务视图</figcaption></figure>
    <div class="flowline block">
      <div class="step"><b>01 导入</b><span>账单、邮件、PDF 或截图</span></div>
      <div class="step"><b>02 解析</b><span>商户、金额、周期、日期</span></div>
      <div class="step"><b>03 确认</b><span>低置信度字段由用户修正</span></div>
      <div class="step"><b>04 归档</b><span>加入订阅库和模型</span></div>
      <div class="step"><b>05 行动</b><span>保留、暂停、降级或取消</span></div>
    </div>
  </div>
</section>

<section id="radar" class="dark">
  <div class="wrap">
    <div class="eyebrow">04 · 续费雷达</div><h2>用一张图回答：我最近会被扣什么钱？</h2>
    <p class="lead">中心是今天，轨道按时间展开。高、中、低风险帮助用户安排处理顺序，而不是制造焦虑。</p>
    <div class="grid-2 block">
      <figure class="fig"><img src="motion/radar-orbit.png" alt="续费雷达动效海报：订阅节点围绕今天旋转"><figcaption>轨道动效仅用于展示时间关系，不影响阅读</figcaption></figure>
      <div class="stack">
        <div class="risk high"><span class="tag">高风险</span><h3>7 天内高风险</h3><p>金额较高、使用频率低或刚刚涨价，进入首页最高优先级。</p></div>
        <div class="risk mid"><span class="tag warn">中风险</span><h3>30 天内需关注</h3><p>显示在日历内圈，用户可以选择延后提醒。</p></div>
        <div class="risk low"><span class="tag acid">低风险</span><h3>已处理或暂停</h3><p>不继续打扰，保留来源，并在续费日再次验证。</p></div>
      </div>
    </div>
  </div>
</section>

<section id="cancellation" class="surface">
  <div class="wrap">
    <div class="eyebrow">05 · 取消助手</div><h2>取消不是一次按钮点击。</h2>
    <p class="lead">把取消拆成准备、操作、确认和验证四个阶段，让用户知道自己在哪一步，也知道什么时候算真正完成。</p>
    <figure class="fig block"><img src="diagrams/cancellation-flow.png" alt="取消流程图：检查权益、导出内容、打开入口、执行取消、保存凭证、等待生效和再次验证"><figcaption>成功定义是用户完成明确决策，而不是被产品说服继续付费</figcaption></figure>
    <div class="grid-4 block">
      <article class="card"><span class="tag">准备</span><h3 style="margin-top:12px">检查剩余权益</h3><p>确认取消后还能使用到哪一天，是否需要先导出内容。</p></article>
      <article class="card"><span class="tag">操作</span><h3 style="margin-top:12px">找到取消入口</h3><p>提供路径说明、客服话术和取消注意事项。</p></article>
      <article class="card"><span class="tag acid">确认</span><h3 style="margin-top:12px">保存取消凭证</h3><p>记录确认编号、邮件或截图，避免模糊状态。</p></article>
      <article class="card"><span class="tag warn">验证</span><h3 style="margin-top:12px">续费日再次检查</h3><p>如果没有扣费，写入节省报告；如果仍然扣费，提醒再次处理。</p></article>
    </div>
  </div>
</section>

<section id="trust">
  <div class="wrap">
    <div class="eyebrow">06 · 信任边界</div><h2>识别能力越强，边界越要说清楚。</h2>
    <p class="lead">作品集版本不碰真实支付和隐私数据。产品设计必须让用户知道信息从哪里来、会被保存什么、以及如何撤回。</p>
    <figure class="fig block"><img src="diagrams/trust-boundary.png" alt="信任边界图：可解释、可修改、可撤回和作品集模拟数据声明"><figcaption>Renew 的原则是：可解释、可修改、可撤回</figcaption></figure>
    <div class="grid-3 block">
      <article class="card"><h3>不接入银行卡密码</h3><p>演示版本不连接真实支付账户，也不保存支付凭证。</p></article>
      <article class="card"><h3>不保存完整邮件</h3><p>只保留识别所需的字段，并显示每个字段的来源。</p></article>
      <article class="card"><h3>不自动取消</h3><p>用户始终执行最后动作，系统只提供步骤、模板和检查清单。</p></article>
    </div>
  </div>
</section>

<section id="system" class="surface">
  <div class="wrap">
    <div class="eyebrow">07 · 视觉系统</div><h2>编辑感金融 × 侦探线索板。</h2>
    <p class="lead">用纸张底色、墨黑文字、信号橙和酸绿色建立识别度，避免传统银行 App 的蓝色渐变和信息表格。</p>
    <div class="swatches block">
      <div class="swatch" style="background:#F4F0E8;color:#151515"><span>#F4F0E8<br>Paper</span></div>
      <div class="swatch" style="background:#151515"><span>#151515<br>Ink</span></div>
      <div class="swatch" style="background:#FF5A36"><span>#FF5A36<br>Signal</span></div>
      <div class="swatch" style="background:#C8F45A;color:#151515"><span>#C8F45A<br>Acid</span></div>
      <div class="swatch" style="background:#F3B544;color:#151515"><span>#F3B544<br>Warning</span></div>
      <div class="swatch" style="background:#8B877E"><span>#8B877E<br>Muted</span></div>
      <div class="swatch" style="background:#FFFDF8;color:#151515"><span>#FFFDF8<br>Surface</span></div>
    </div>
    <div class="grid-3 block">
      <article class="card"><h3>字体</h3><p>衬线标题负责杂志感，无衬线正文负责可读性，等宽字体用于金额、日期和置信度。</p></article>
      <article class="card"><h3>卡片</h3><p>12–20px 圆角、1px 描边和克制层级。一个页面最多一个主要行动按钮。</p></article>
      <article class="card"><h3>动效</h3><p>轨道旋转、扫描线和风险节点脉冲都保持低幅度，并支持减少动态效果。</p></article>
    </div>
  </div>
</section>

<section id="metrics" class="metrics">
  <div class="wrap">
    <div class="eyebrow">08 · 成功指标</div><h2>不要只展示“识别了多少”，要展示“完成了什么决定”。</h2>
    <p class="lead">作品集不展示虚假测试数据，只展示产品定义的成功指标和执行边界。</p>
    <div class="stack block">
      <div class="stack-row"><b>北极星</b><div><h3>有效续费决策数</h3><p>用户在收到提醒后完成保留、暂停、降级或取消中的明确选择。</p></div></div>
      <div class="stack-row"><b>识别质量</b><div><h3>识别成功率与修正率</h3><p>既要看能否提取字段，也要看用户需要修改多少信息。</p></div></div>
      <div class="stack-row"><b>提醒质量</b><div><h3>从提醒到决策的完成率</h3><p>提醒是否帮助用户行动，而不是制造更多待办。</p></div></div>
      <div class="stack-row"><b>取消闭环</b><div><h3>取消完成率与再次扣费率</h3><p>不仅记录用户点击了取消，还要验证后续是否真的停止扣费。</p></div></div>
      <div class="stack-row"><b>信任</b><div><h3>识别结果被修正、删除或撤回的比例</h3><p>用户是否理解自动识别的不确定性，并能控制最终结果。</p></div></div>
    </div>
    <div class="grid-3 block">
      <article class="card"><span class="tag">免费版</span><h3 style="margin-top:12px">手动添加与基础提醒</h3><p>适合少量订阅，保留基础续费和试用提醒。</p></article>
      <article class="card"><span class="tag acid">Pro 版</span><h3 style="margin-top:12px">批量识别与取消助手</h3><p>提供批量识别、价格变化历史、取消模板和节省报告。</p></article>
      <article class="card"><span class="tag warn">排序原则</span><h3 style="margin-top:12px">不因佣金改变结果</h3><p>订阅排序只依据用户数据、风险和偏好，不依据商业合作。</p></article>
    </div>
  </div>
</section>

<section id="quality" class="surface">
  <div class="wrap">
    <div class="eyebrow">09 · 作品集边界</div><h2>这是一个产品概念和界面案例，不是金融工具。</h2>
    <div class="quality-box block"><p><strong>作品集声明：</strong>本案例不接入真实邮箱、OCR 服务、支付平台、银行账户或取消接口。所有订阅、金额和日期均为模拟数据。Renew 不提供金融建议，也不自动执行支付、退款或取消操作。</p></div>
    <div class="grid-3 block">
      <article class="card"><h3>展示重点</h3><p>用户研究、产品边界、信息架构、复杂流程、数据可视化、视觉系统和信任设计。</p></article>
      <article class="card"><h3>可扩展方向</h3><p>家庭订阅共享、跨账号视图、价格变化历史和取消话术模板。</p></article>
      <article class="card"><h3>交付形式</h3><p>静态响应式案例页、十张手机界面、五张流程图、三张动效海报和可复现的本地生成脚本。</p></article>
    </div>
    <div class="grid-4 block">
      <article class="card"><h3>重复线索</h3><p>同一订阅出现多条账单时，允许合并或忽略，不重复进入雷达。</p></article>
      <article class="card"><h3>多币种</h3><p>币种不明确时高亮字段，避免把美元金额直接当成人民币。</p></article>
      <article class="card"><h3>家庭共享</h3><p>账号使用人和付款人可能不同，详情页必须允许备注实际支付者。</p></article>
      <article class="card"><h3>取消后仍扣费</h3><p>保留取消凭证，并在续费日附近提醒用户再次验证。</p></article>
    </div>
  </div>
</section>

<footer><div class="wrap">续费侦探 Renew · UI/UX Portfolio · Simulation only · 2026</div></footer>
</body>
</html>
```

- [ ] **Step 4: Run the index test and verify it passes**

Run from `Renew作品集`: `node --test tests/index.test.js`

Expected: PASS.

- [ ] **Step 5: Commit**

```powershell
git add -- Renew作品集/index.html Renew作品集/tests/index.test.js
git commit -m "feat: compose Renew case study"
```

---
### Task 10: Add Validation, Usage Guide, and Final Verification

**Files:**
- Create: `Renew作品集/scripts/validate.js`
- Create: `Renew作品集/tests/validate.test.js`
- Create: `Renew作品集/使用说明.md`

**Interfaces:**
- Consumes: `index.html`, generated PNGs, local Chrome, and the Playwright dependency path.
- Produces: exported `localTargets(html)`, `imageTags(html)`, `validateStructure()`, and `validateLayoutAndExport()`.
- Writes: `preview-hero.png` and `preview.png` during layout validation.

- [ ] **Step 1: Write the failing validation helper test**

`Renew作品集/tests/validate.test.js`:

```javascript
const test = require('node:test');
const assert = require('node:assert/strict');
const { localTargets } = require('../scripts/validate');

test('localTargets returns local targets and rejects remote URLs', () => {
  assert.deepEqual(localTargets('<a href="screens/01-onboarding.png">x</a><a href="#trust">y</a>'), [
    'screens/01-onboarding.png'
  ]);
  assert.throws(
    () => localTargets('<img src="https://example.com/a.png" alt="remote">'),
    /remote URL is not allowed/
  );
});
```

- [ ] **Step 2: Run the validation helper test and verify it fails**

Run from `Renew作品集`: `node --test tests/validate.test.js`

Expected: FAIL because `../scripts/validate` does not exist.

- [ ] **Step 3: Implement the validation script**

`Renew作品集/scripts/validate.js`:

```javascript
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
```

- [ ] **Step 4: Run the validation helper test and verify it passes**

Run from `Renew作品集`: `node --test tests/validate.test.js`

Expected: PASS.

- [ ] **Step 5: Write the usage guide**

`Renew作品集/使用说明.md`:

```markdown
# 续费侦探 Renew · 使用说明

## 项目定位

这是一个 UI/UX 作品集案例，不是可上线的订阅管理工具。

所有订阅名称、金额、日期、置信度和使用记录均为模拟数据。项目不接入真实邮箱、OCR、银行卡、支付平台、退款或自动取消接口。

## 目录说明

- `index.html`：最终作品集页面；
- `screens/`：十张手机界面截图；
- `src/`：手机界面生成源；
- `diagrams/`：五张产品流程图；
- `kv/key-visual.png`：项目主视觉；
- `motion/`：续费雷达和识别扫描海报；
- `lib/`：生成器和设计 token；
- `scripts/validate.js`：结构与布局验证；
- `tests/`：生成器契约测试；
- `preview.png`、`preview-hero.png`：验证时导出的页面预览。

## 重新生成

```powershell
cd 'C:\Users\anyuxin\Documents\ChatGPT\UI作品集（互联网方向）\Renew作品集'
npm test
npm run render
npm run validate
```

`npm run render` 会重新生成手机界面、流程图和动效海报。`npm run validate` 会检查本地资源、图片 alt、锚点、桌面与移动端横向溢出，并导出预览图。

## 设计原则

- AI 负责识别，用户负责确认；
- 低置信度字段必须可修改；
- 风险提示帮助决策，不制造焦虑；
- 取消助手只提供步骤和模板，不自动执行取消；
- 不保存完整邮件，不接入银行卡密码；
- 作品集不编造用户测试结果或商业数据。

## 数据声明

所有视觉和交互数据仅用于演示。任何真实产品化都需要重新评估隐私、合规、OCR 准确率、支付平台规则和用户授权流程。
```

- [ ] **Step 6: Run the complete test suite**

Run from `Renew作品集`: `npm test`

Expected: all token, capture, screen, diagram, motion, render, index, and validation tests pass.

- [ ] **Step 7: Re-render and validate the final portfolio**

Run from `Renew作品集`:

```powershell
npm run render
npm run validate
```

Expected: render logs for 10 screens, 5 diagrams, and 3 assets, followed by:

```text
portfolio structure is valid
layout, anchors, assets, alt text, and previews are valid
```

- [ ] **Step 8: Verify final generated files**

Run from repository root:

```powershell
Test-Path 'Renew作品集\index.html'
Test-Path 'Renew作品集\preview.png'
Test-Path 'Renew作品集\preview-hero.png'
Test-Path 'Renew作品集\screens\10-privacy-settings.png'
Test-Path 'Renew作品集\diagrams\trust-boundary.png'
Test-Path 'Renew作品集\motion\scan-detect.png'
```

Expected: every command prints `True`.

- [ ] **Step 9: Commit**

```powershell
git add -- Renew作品集/scripts/validate.js Renew作品集/tests/validate.test.js Renew作品集/使用说明.md Renew作品集/preview.png Renew作品集/preview-hero.png
git commit -m "test: validate Renew portfolio"
```

---

## Self-Review Checklist

- [x] Spec coverage: product positioning, target user, detection source B, ten screens, renewal radar, cancellation assistant, savings report, privacy boundary, visual system, metrics, commercialization direction, portfolio boundaries, and acceptance criteria each map to one or more tasks.
- [x] Placeholder scan: no unresolved markers, deferred implementation, or vague edge-case instructions remain.
- [x] Type consistency: `screens`, `diagrams`, `motionAssets`, `captureHtml`, `captureFile`, `localTargets`, and `imageTags` keep consistent names and shapes across tasks.
- [x] Test coverage: each generator has a contract test; capture and validation have integration smoke tests; final render and layout validation are explicit.
- [x] Scope check: the plan builds only the static portfolio case study and local generated assets. It does not implement the real mobile app, OCR, email connection, payment connection, or automatic cancellation.





