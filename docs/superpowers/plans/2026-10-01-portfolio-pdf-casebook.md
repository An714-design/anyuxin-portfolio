# Portfolio PDF Casebook Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 26-page, 16:9 UI/UX portfolio PDF that starts with concise resume content, then devotes 20 pages to complete project narratives across five projects, and finishes with AIGC evidence and contact information.

**Architecture:** Generate a print-specific HTML book with fixed 16:9 pages, optimize source imagery into a local cache, render the book to PDF with Chromium, then validate page count, dimensions, visual output, and the hard 20MB file-size limit. Project content and media come from the validated website content model so the website and PDF remain consistent.

**Tech Stack:** Node.js 24, HTML/CSS, Chromium print-to-PDF through Playwright, Python 3 with Pillow, pypdf, pypdfium2, Poppler `pdfinfo` and `pdftoppm`, Codex PDF artifact tooling.

## Global Constraints

- Approved design specification: `docs/superpowers/specs/2026-10-01-portfolio-website-and-pdf-design.md`.
- Website content dependency: `portfolio-site/content/projects.json`, `portfolio-site/content/profile.json`, and `portfolio-site/content/decisions.json`.
- The final PDF MUST be 20MB or less.
- Required size checks:
  - `file_size <= 20 * 1024 * 1024` bytes
  - `file_size < 20,000,000` bytes
- Content target: 14-18MB.
- The PDF must contain exactly 26 pages.
- Format: 16:9 landscape, 960 x 540 PDF points.
- Front matter is pages 1-3.
- Soundscape is pages 4-7.
- Renew is pages 8-11.
- LIGHTMAP is pages 12-15.
- Lumen is pages 16-19.
- Flow is pages 20-23.
- AIGC evidence and closing are pages 24-26.
- Every project must show problem, research or context, product logic, interface system, interaction, iteration or trade-off, and reflection.
- Do not embed video or animated GIF content.
- Flow's 15-second demonstration becomes a 3-4 frame storyboard with a QR code to the website.
- Do not invent metrics, user findings, commercial results, or outcomes.
- Use vector text and diagrams wherever possible.
- Preserve UI text legibility at normal screen zoom.
- Use only local assets and local fonts.
- The built PDF and generated HTML must never reference a remote URL.

---

## File Structure

- `portfolio-pdf/package.json` - build, validate, and render scripts.
- `portfolio-pdf/src/styles.css` - fixed-page print styles and shared visual system.
- `portfolio-pdf/src/components.cjs` - shared page, header, footer, chart, image, and text components.
- `portfolio-pdf/src/book.cjs` - imports all page arrays and returns the 26-page HTML document.
- `portfolio-pdf/src/pages/front.cjs` - pages 1-3.
- `portfolio-pdf/src/pages/soundscape.cjs` - pages 4-7.
- `portfolio-pdf/src/pages/renew.cjs` - pages 8-11.
- `portfolio-pdf/src/pages/lightmap.cjs` - pages 12-15.
- `portfolio-pdf/src/pages/lumen.cjs` - pages 16-19.
- `portfolio-pdf/src/pages/flow.cjs` - pages 20-23.
- `portfolio-pdf/src/pages/aigc-close.cjs` - pages 24-26.
- `portfolio-pdf/scripts/prepare-images.py` - image resize and JPEG compression.
- `portfolio-pdf/scripts/build-html.cjs` - writes `dist/casebook.html`.
- `portfolio-pdf/scripts/build-pdf.cjs` - renders `dist/casebook.html` to the final PDF.
- `portfolio-pdf/scripts/validate-pdf.py` - validates size, page count, page dimensions, and text extraction.
- `portfolio-pdf/scripts/render-pages.py` - renders PDF pages to PNG and creates a contact sheet.
- `portfolio-pdf/dist/media/` - optimized images consumed by the HTML.
- `portfolio-pdf/dist/qa/` - rendered PDF page PNGs and contact sheet.
- `portfolio-pdf/dist/安雨鑫-UIUX-Product-作品集.pdf` - final deliverable.

---

### Task 1: Create PDF Foundation, Image Pipeline, And Size Validator

**Files:**
- Create: `portfolio-pdf/package.json`
- Create: `portfolio-pdf/src/styles.css`
- Create: `portfolio-pdf/scripts/prepare-images.py`
- Create: `portfolio-pdf/scripts/validate-pdf.py`
- Create: `portfolio-pdf/tests/foundation.test.cjs`

**Interfaces:**
- Consumes: website image assets and approved PDF constraints.
- Produces: optimized `dist/media/*.jpg`, page CSS, and a validator that enforces count, dimensions, and size.

- [ ] **Step 1: Mark the PDF artifact operation as started**

Run exactly once before the first PDF authoring command:

```powershell
node "C:\Users\anyuxin\.codex\plugins\cache\openai-primary-runtime\pdf\26.909.12148\skills\pdf\container_tools\mark_artifact_operation_started.mjs" --operation-kind create --expected-output-count 1 --output-format pdf
```

Expected: success response with no missing-tool error.

- [ ] **Step 2: Write the failing foundation test**

```javascript
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

test('PDF foundation files exist', () => {
  assert.equal(fs.existsSync('src/styles.css'), true);
  assert.equal(fs.existsSync('scripts/prepare-images.py'), true);
  assert.equal(fs.existsSync('scripts/validate-pdf.py'), true);
});
```

- [ ] **Step 3: Run the foundation test and verify failure**

Run from `portfolio-pdf`: `node --test tests/foundation.test.cjs`  
Expected: FAIL because the files do not exist.

- [ ] **Step 4: Add package metadata and page CSS**

`package.json`:

```json
{
  "name": "anyuxin-uiux-product-pdf-casebook",
  "private": true,
  "scripts": {
    "prepare": "C:/Users/anyuxin/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe scripts/prepare-images.py",
    "html": "node scripts/build-html.cjs",
    "pdf": "node scripts/build-pdf.cjs",
    "build": "npm run prepare && npm run html && npm run pdf && npm run validate",
    "validate": "C:/Users/anyuxin/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe scripts/validate-pdf.py",
    "render": "C:/Users/anyuxin/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe scripts/render-pages.py",
    "test": "node --test"
  }
}
```

`src/styles.css`:

```css
@page { size: 13.333in 7.5in; margin: 0; }
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; background: #f3f1ec; color: #151515; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif; -webkit-font-smoothing: antialiased; }
body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
.page { position: relative; width: 13.333in; height: 7.5in; overflow: hidden; page-break-after: always; break-after: page; background: #f3f1ec; }
.page:last-child { page-break-after: auto; break-after: auto; }
.page__rail { position: absolute; left: 0; top: 0; width: 10px; height: 100%; background: var(--accent, #151515); }
.page__content { position: absolute; inset: 0 0 0 10px; padding: 58px 68px 48px; }
.page__number { position: absolute; right: 34px; bottom: 22px; color: rgba(21,21,21,.45); font-size: 11px; }
.dark { background: #0f1114; color: #f1efe8; }
.dark .page__number { color: rgba(241,239,232,.45); }
h1, h2, h3, p { margin-top: 0; }
h1 { font-size: 58px; line-height: 1.02; letter-spacing: -.045em; }
h2 { font-size: 38px; line-height: 1.08; letter-spacing: -.03em; }
h3 { font-size: 21px; line-height: 1.2; }
p { font-size: 15px; line-height: 1.65; }
.eyebrow { font-size: 11px; letter-spacing: .18em; text-transform: uppercase; color: #6f6b64; }
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 36px; }
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
.grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.card { border: 1px solid rgba(21,21,21,.12); border-radius: 22px; background: rgba(255,255,255,.62); padding: 22px; }
.dark .card { border-color: rgba(241,239,232,.14); background: rgba(255,255,255,.05); }
.media { width: 100%; height: 100%; object-fit: cover; border-radius: 18px; }
.phone-row { display: flex; align-items: flex-end; justify-content: center; gap: 14px; height: 360px; }
.phone-row img { height: 100%; width: auto; object-fit: contain; border-radius: 24px; box-shadow: 0 18px 40px rgba(0,0,0,.16); }
.stat { display: grid; gap: 6px; }
.stat strong { font-size: 34px; line-height: 1; letter-spacing: -.04em; }
.stat span { font-size: 12px; color: #6f6b64; }
.section-label { font-size: 11px; letter-spacing: .16em; text-transform: uppercase; color: #6f6b64; }
.footer-note { position: absolute; left: 68px; right: 68px; bottom: 24px; display: flex; justify-content: space-between; font-size: 10px; color: rgba(21,21,21,.42); }
.dark .footer-note { color: rgba(241,239,232,.42); }
```

- [ ] **Step 5: Implement image preparation**

`scripts/prepare-images.py` must read the website's canonical covers and project media, create `dist/media/`, resize raster images to a maximum width of 1800px, convert photographic assets to JPEG quality 84, keep transparent PNGs as PNG, and print a JSON summary containing output file count and total bytes.

The script must fail if the website content files are missing. It must not read or download remote files.

- [ ] **Step 6: Implement PDF validation**

`scripts/validate-pdf.py` must:

```python
from pathlib import Path
from pypdf import PdfReader

pdf = Path("dist/安雨鑫-UIUX-Product-作品集.pdf")
assert pdf.exists(), "PDF missing"
size = pdf.stat().st_size
assert size <= 20 * 1024 * 1024, f"PDF exceeds 20 MiB: {size}"
assert size < 20_000_000, f"PDF is not below 20,000,000 bytes: {size}"
reader = PdfReader(str(pdf))
assert len(reader.pages) == 26, f"Expected 26 pages, found {len(reader.pages)}"
for page in reader.pages:
    width = float(page.mediabox.width)
    height = float(page.mediabox.height)
    assert abs(width - 960) < 1, f"Unexpected width: {width}"
    assert abs(height - 540) < 1, f"Unexpected height: {height}"
print({"bytes": size, "pages": len(reader.pages), "target_max": 20_000_000})
```

Extend the script with a text-size sanity check that rejects fewer than 1,200 extracted characters across the PDF, preventing an accidental image-only export.

- [ ] **Step 7: Run the foundation test and verify success**

Run from `portfolio-pdf`: `node --test tests/foundation.test.cjs`  
Expected: PASS.

- [ ] **Step 8: Commit the PDF foundation**

```powershell
git add -- portfolio-pdf/package.json portfolio-pdf/src/styles.css portfolio-pdf/scripts/prepare-images.py portfolio-pdf/scripts/validate-pdf.py portfolio-pdf/tests/foundation.test.cjs
git commit -m "feat: add PDF casebook foundation"
```

---

### Task 2: Build Shared Components, Front Matter, And PDF Renderer

**Files:**
- Create: `portfolio-pdf/src/components.cjs`
- Create: `portfolio-pdf/src/pages/front.cjs`
- Create: `portfolio-pdf/src/book.cjs`
- Create: `portfolio-pdf/scripts/build-html.cjs`
- Create: `portfolio-pdf/scripts/build-pdf.cjs`
- Create: `portfolio-pdf/tests/component.test.cjs`

**Interfaces:**
- Consumes: `dist/media/`, resume facts, and project metadata.
- Produces: `page({ number, accent, className, body })`, `image(src, alt, className)`, and a 26-page HTML document.

- [ ] **Step 1: Write the failing component test**

```javascript
const test = require('node:test');
const assert = require('node:assert/strict');
const { page, image, grid } = require('../src/components.cjs');

test('page creates fixed PDF page markup', () => {
  const html = page({ number: 1, accent: '#151515', body: '<h1>Test</h1>' });
  assert.match(html, /class="page"/);
  assert.match(html, /page__content/);
  assert.match(html, /page__number">1</);
});

test('image requires alt text', () => {
  assert.throws(() => image('a.jpg', ''));
  assert.match(image('a.jpg', '项目封面'), /alt="项目封面"/);
});
```

- [ ] **Step 2: Run the component test and verify failure**

Run from `portfolio-pdf`: `node --test tests/component.test.cjs`  
Expected: FAIL because `src/components.cjs` does not exist.

- [ ] **Step 3: Implement shared components**

`src/components.cjs` must export:

```javascript
function page({ number, accent = '#151515', className = '', body = '' }) {
  return `<section class="page ${className}" style="--accent:${accent}"><div class="page__rail"></div><div class="page__content">${body}</div><span class="page__number">${number}</span></section>`;
}

function image(src, alt, className = '') {
  if (!alt || !alt.trim()) throw new Error('Image alt text is required');
  return `<img class="${className}" src="${src}" alt="${alt}">`;
}

function grid(columns, items) {
  return `<div class="grid-${columns}">${items.join('')}</div>`;
}

function footer(left, right = '安雨鑫 · UI / UX / Product Designer') {
  return `<div class="footer-note"><span>${left}</span><span>${right}</span></div>`;
}

module.exports = { page, image, grid, footer };
```

- [ ] **Step 4: Build pages 1-3**

`src/pages/front.cjs` must export an array of exactly three page functions returning `page(...)`:

1. Cover: name, role, specialty, year, five-project key visual.
2. Resume snapshot: education, internship, project evidence, AIGC tools and capabilities. Use a resumed visual layout, not the dense source layout.
3. Portfolio overview and AIGC method: five project covers in approved order, one thesis each, and the eight-stage workflow. Label AI-assisted and human-decided work.

The page-2 content must preserve these facts:

```text
上海理工大学 · 产品设计
GPA 3.6 · 专业排名前 10%
Homestyler 3D 数字资产运营（AIGC 向）
Badcase 博物馆 · Prompt Diff · 根因筛选
SCI 期刊可视化 · 迪卡侬 CMF
AIGC 平台、Prompt、Agent 工作流、UI/UX、3D、视觉排版
```

No unsupported claim may be added.

- [ ] **Step 5: Assemble the book and add a failing page-count seam**

`src/book.cjs` must import page arrays and combine them. Before remaining page modules exist, add explicit empty arrays for the other chapters and a test that expects 26 pages. This test must fail until all chapter tasks are complete.

```javascript
function optionalChapter(modulePath) {
  try {
    return require(modulePath);
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND' && error.message.includes(modulePath)) return [];
    throw error;
  }
}

const pages = [
  ...optionalChapter('./pages/front.cjs'),
  ...optionalChapter('./pages/soundscape.cjs'),
  ...optionalChapter('./pages/renew.cjs'),
  ...optionalChapter('./pages/lightmap.cjs'),
  ...optionalChapter('./pages/lumen.cjs'),
  ...optionalChapter('./pages/flow.cjs'),
  ...optionalChapter('./pages/aigc-close.cjs')
];

function renderBook() {
  return `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><link rel="stylesheet" href="../src/styles.css"></head><body>${pages.join('')}</body></html>`;
}

if (require.main === module) process.stdout.write(renderBook());
module.exports = { renderBook };
```

- [ ] **Step 6: Add HTML and PDF renderers**

`scripts/build-html.cjs` writes `dist/casebook.html`.

`scripts/build-pdf.cjs` must:

```javascript
const { chromium } = require('C:/Users/anyuxin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const path = require('node:path');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
  });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto('file:///' + path.resolve('dist/casebook.html').replaceAll('\\', '/'), { waitUntil: 'load' });
  await page.pdf({
    path: 'dist/安雨鑫-UIUX-Product-作品集.pdf',
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' }
  });
  await browser.close();
})();
```

- [ ] **Step 7: Verify the expected failure before remaining chapters**

Run from `portfolio-pdf`:

```powershell
npm run html
node -e "const {renderBook}=require('./src/book.cjs'); const n=(renderBook().match(/class=\"page\"/g)||[]).length; if(n!==26) process.exit(1); console.log(n)"
```

Expected: FAIL because only pages 1-3 exist at this stage.

- [ ] **Step 8: Commit front matter and renderer**

```powershell
git add -- portfolio-pdf/src/components.cjs portfolio-pdf/src/pages/front.cjs portfolio-pdf/src/book.cjs portfolio-pdf/scripts/build-html.cjs portfolio-pdf/scripts/build-pdf.cjs portfolio-pdf/tests/component.test.cjs
git commit -m "feat: add PDF front matter and renderer"
```

---

### Task 3: Build Soundscape Pages 4-7

**Files:**
- Create: `portfolio-pdf/src/pages/soundscape.cjs`
- Create: `portfolio-pdf/dist/media/soundscape/` files selected by the page module
- Create: `portfolio-pdf/tests/soundscape.test.cjs`

**Interfaces:**
- Consumes: Soundscape project record, journey image, six UI screens, and visual-system data.
- Produces: four page functions in approved order.

- [ ] **Step 1: Add the four Soundscape pages**

Page 4 must state the value proposition `让空间音频成为看得见的界面语言。` and show role, six-week timeline, three iterations, hero cover, and project context.

Page 5 must show:

- Commute, exercise, and sleep scenarios
- User journey and emotional curve
- Three insights tied to spatial understanding and decision cost
- The journey map image with a short annotation

Page 6 must show:

- `紫 / 青 / 粉` low-saturation palette
- Spatial audio visualization with concentric wave fields and waveform bars
- Type, component, and icon system
- Three representative UI screens

Page 7 must show:

- Home, now playing, spatial radio, playlist, immersive visualization, and profile
- The complete listen-to-explore-to-immerse flow
- Deep/light theme adaptation
- Reflection: immersion must not reduce readability

- [ ] **Step 2: Add a page-count contract**

```javascript
const test = require('node:test');
const assert = require('node:assert/strict');
const pages = require('../src/pages/soundscape.cjs');

test('Soundscape has four pages', () => {
  assert.equal(pages.length, 4);
  assert.match(pages[0], /空间音频/);
  assert.match(pages[6 - 4], /沉浸|界面|系统/);
});
```

- [ ] **Step 3: Build and inspect pages 4-7**

Run from `portfolio-pdf`:

```powershell
node --test tests/soundscape.test.cjs
npm run html
```

Expected: PASS and four Soundscape page sections exist.

- [ ] **Step 4: Commit Soundscape chapter**

```powershell
git add -- portfolio-pdf/src/pages/soundscape.cjs portfolio-pdf/dist/media/soundscape portfolio-pdf/tests/soundscape.test.cjs
git commit -m "feat: add Soundscape PDF case study"
```

---

### Task 4: Build Renew Pages 8-11

**Files:**
- Create: `portfolio-pdf/src/pages/renew.cjs`
- Create: `portfolio-pdf/dist/media/renew/` files selected by the page module
- Create: `portfolio-pdf/tests/renew.test.cjs`

**Interfaces:**
- Consumes: Renew project record, product diagrams, ten screens, and trust-boundary content.
- Produces: four page functions in approved order.

- [ ] **Step 1: Add the four Renew pages**

Page 8 must state `把分散的续费线索，转化为可确认、可行动的订阅决策。` and show the opportunity, persona Lin Zhixia, user pain points, and the product promise.

Page 9 must show the information architecture:

```text
线索 -> 订阅库 -> 续费雷达 -> 风险优先级 -> 行动 -> 再次验证
```

It must also show why AI recognition is separated from user confirmation.

Page 10 must show:

- AI recognition queue and low-confidence editing
- Renewal radar and risk model
- Cancellation assistant
- Trust boundaries: no bank password, no full email retention, no automatic cancellation

Page 11 must show the end-to-end action flow, the effective renewal decision metric definition, limitations, and the reflection that success means a clear decision rather than retention.

- [ ] **Step 2: Add a content contract**

```javascript
const test = require('node:test');
const assert = require('node:assert/strict');
const pages = require('../src/pages/renew.cjs');

test('Renew has four complete pages', () => {
  assert.equal(pages.length, 4);
  assert.match(pages.join(''), /AI 负责识别，用户负责确认/);
  assert.match(pages.join(''), /不自动取消/);
  assert.match(pages.join(''), /有效续费决策/);
});
```

- [ ] **Step 3: Validate and commit**

Run from `portfolio-pdf`:

```powershell
node --test tests/renew.test.cjs
npm run html
```

Expected: PASS.

```powershell
git add -- portfolio-pdf/src/pages/renew.cjs portfolio-pdf/dist/media/renew portfolio-pdf/tests/renew.test.cjs
git commit -m "feat: add Renew PDF case study"
```

---

### Task 5: Build LIGHTMAP Pages 12-15

**Files:**
- Create: `portfolio-pdf/src/pages/lightmap.cjs`
- Create: `portfolio-pdf/dist/media/lightmap/` files selected by the page module
- Create: `portfolio-pdf/tests/lightmap.test.cjs`

**Interfaces:**
- Consumes: LIGHTMAP project record, six screens, game-loop diagram, UX diagrams, and design-system data.
- Produces: four page functions in approved order.

- [ ] **Step 1: Add the four LIGHTMAP pages**

Page 12 must state `用编号把侦察、拍摄、上传与复盘串成一段完整的城市光影游戏。` and show the worldview, deep tactical palette, project context, and target experience.

Page 13 must show the game loop `发现 -> 侦察 -> 抵达 -> 拍摄 -> 上传 -> 复盘` and the relationship between user motivation, task structure, and reward.

Page 14 must show:

- Deep ink `#141619`
- Parchment `#DAD3C1`
- Tactical gold `#E0A93E`
- Stencil, condensed, and mono type roles
- Mission terminal, map, detail timeline, brief, archive, and report screens

Page 15 must show how `编号 03 · 外滩观景平台` remains continuous across map, detail, capture, and review. It must explain that the numbering is a task anchor, not decoration. End with the unresolved question of long-term retention.

- [ ] **Step 2: Add a content contract**

```javascript
const test = require('node:test');
const assert = require('node:assert/strict');
const pages = require('../src/pages/lightmap.cjs');

test('LIGHTMAP has four pages and the number chain', () => {
  assert.equal(pages.length, 4);
  assert.match(pages.join(''), /编号 03/);
  assert.match(pages.join(''), /发现.*侦察.*抵达.*拍摄.*上传.*复盘/s);
});
```

- [ ] **Step 3: Validate and commit**

Run from `portfolio-pdf`:

```powershell
node --test tests/lightmap.test.cjs
npm run html
```

Expected: PASS.

```powershell
git add -- portfolio-pdf/src/pages/lightmap.cjs portfolio-pdf/dist/media/lightmap portfolio-pdf/tests/lightmap.test.cjs
git commit -m "feat: add LIGHTMAP PDF case study"
```

---

### Task 6: Build Lumen Pages 16-19

**Files:**
- Create: `portfolio-pdf/src/pages/lumen.cjs`
- Create: `portfolio-pdf/dist/media/lumen/` files selected by the page module
- Create: `portfolio-pdf/tests/lumen.test.cjs`

**Interfaces:**
- Consumes: Lumen project record, research diagrams, twelve screens, key visual, and AI boundary content.
- Produces: four page functions in approved order.

- [ ] **Step 1: Add the four Lumen pages**

Page 16 must state `睡眠陪伴不是让用户依赖产品，而是逐步获得对夜晚的控制感。` and show the user tension: users want to sleep but do not want to end the day. Show the night-owl context and product opportunity.

Page 17 must show:

- The seven-night control curve
- Noise classification, naming, and postponement
- Curator, Listener, and Dreamweaver
- Memory and privacy boundaries
- The rule that AI is limited, user-initiated, and avoidant of dependency

Page 18 must show:

- Midnight blue, amber, and moon-cream visual system
- Low-stimulation hierarchy
- Twelve screens grouped by onboarding, check-in, listening, micro-action, sleep, morning, night book, and privacy
- Night-bus dream experience, accessibility, reduced-motion behavior, and memory controls

Page 19 must show the core listening and sleep flow, AIGC-assisted visual role, human art direction, limitations, and the reflection that good sleep companionship should not make users permanently dependent.

- [ ] **Step 2: Add a content contract**

```javascript
const test = require('node:test');
const assert = require('node:assert/strict');
const pages = require('../src/pages/lumen.cjs');

test('Lumen shows research, AI boundaries, and interface system', () => {
  assert.equal(pages.length, 4);
  const html = pages.join('');
  assert.match(html, /夜猫族|控制感/);
  assert.match(html, /Curator|Listener|Dreamweaver/);
  assert.match(html, /低刺激|可退出|记忆/);
});
```

- [ ] **Step 3: Validate and commit**

Run from `portfolio-pdf`:

```powershell
node --test tests/lumen.test.cjs
npm run html
```

Expected: PASS.

```powershell
git add -- portfolio-pdf/src/pages/lumen.cjs portfolio-pdf/dist/media/lumen portfolio-pdf/tests/lumen.test.cjs
git commit -m "feat: add Lumen PDF case study"
```

---

### Task 7: Build Flow Pages 20-23

**Files:**
- Create: `portfolio-pdf/src/pages/flow.cjs`
- Create: `portfolio-pdf/dist/media/flow/` files selected by the page module
- Create: `portfolio-pdf/tests/flow.test.cjs`
- Create: `portfolio-pdf/dist/media/flow/flow-storyboard-*.jpg` generated from the 15-second video

**Interfaces:**
- Consumes: Flow project record, ten screens, Bento system, 15-second video key frames, and calm design principles.
- Produces: four page functions including a storyboard and website QR code.

- [ ] **Step 1: Add the four Flow pages**

Page 20 must state `把专注、日程与睡前清空组织成一组可以完成的流。` and show the problem, Calm principles, product positioning, and comparison with a dense task dashboard.

Page 21 must show Bento modularity, sage green, warm sand, mist blue, whitespace rules, and a ten-screen map.

Page 22 must show the UI system, component hierarchy, calendar and review modules, motion principles, and why each screen has one primary action.

Page 23 must show the complete flow, four storyboard frames from the 15-second video, the rule that this is the only retained motion demo, and a QR code linking to the Flow website route.

- [ ] **Step 2: Generate the Flow storyboard**

Use the validated 15-second video at `portfolio-site/public/projects/flow/showcase/flow-demo-15s.mp4`. Extract four frames at 2s, 6s, 10s, and 14s with the bundled ffmpeg or Playwright video capture. The output names must be:

```text
flow-storyboard-01.jpg
flow-storyboard-02.jpg
flow-storyboard-03.jpg
flow-storyboard-04.jpg
```

- [ ] **Step 3: Add a content contract**

```javascript
const test = require('node:test');
const assert = require('node:assert/strict');
const pages = require('../src/pages/flow.cjs');

test('Flow shows system and only retained motion storyboard', () => {
  assert.equal(pages.length, 4);
  const html = pages.join('');
  assert.match(html, /Bento/);
  assert.match(html, /15 秒/);
  assert.equal((html.match(/flow-storyboard-/g) || []).length, 4);
});
```

- [ ] **Step 4: Validate and commit**

Run from `portfolio-pdf`:

```powershell
node --test tests/flow.test.cjs
npm run html
```

Expected: PASS with four storyboard references.

```powershell
git add -- portfolio-pdf/src/pages/flow.cjs portfolio-pdf/dist/media/flow portfolio-pdf/tests/flow.test.cjs
git commit -m "feat: add Flow PDF case study"
```

---

### Task 8: Build AIGC Evidence And Closing Pages 24-26

**Files:**
- Create: `portfolio-pdf/src/pages/aigc-close.cjs`
- Create: `portfolio-pdf/dist/media/aigc/` files selected by the page module
- Create: `portfolio-pdf/tests/aigc-close.test.cjs`

**Interfaces:**
- Consumes: Badcase Museum, Homestyler AIGC workflow, website URL, resume URL, and contact facts.
- Produces: pages 24, 25, and 26.

- [ ] **Step 1: Build page 24, Badcase Museum**

The page must show:

- 12 real badcases across text, style, subject, material, and composition
- Prompt Diff red/green comparison
- 35 iterations and average 2.9 rounds to convergence
- Root-cause filtering and statistics
- The insight that nearly half of problems are solved by Prompt and workflow optimization rather than changing models

Do not call the metric a production or commercial outcome.

- [ ] **Step 2: Build page 25, Homestyler AIGC workflow**

The page must show:

- SOP from asset download to publish
- Automatic login, batch download, reference capture, model processing, Banner generation
- Human-AI division based on Token cost and accuracy
- Two automated script categories
- 500+ model QA and multilingual publishing
- The three-day to one-day processing-cycle reduction stated in the resume

Label all numbers as internship process outcomes, not portfolio project outcomes.

- [ ] **Step 3: Build page 26, contact and links**

The page must include:

```text
安雨鑫
UI / UX / Product Designer
AIGC-oriented product and interface design
18939807980@163.com
Website QR code
Resume QR code
Portfolio PDF filename
```

Add clickable links for the website and mail address if the PDF renderer preserves links.

- [ ] **Step 4: Add the AIGC evidence contract**

```javascript
const test = require('node:test');
const assert = require('node:assert/strict');
const pages = require('../src/pages/aigc-close.cjs');

test('AIGC evidence and closing pages are complete', () => {
  assert.equal(pages.length, 3);
  const html = pages.join('');
  assert.match(html, /Badcase 博物馆/);
  assert.match(html, /Homestyler/);
  assert.match(html, /18939807980@163.com/);
});
```

- [ ] **Step 5: Validate and commit**

Run from `portfolio-pdf`:

```powershell
node --test tests/aigc-close.test.cjs
npm run html
```

Expected: PASS.

```powershell
git add -- portfolio-pdf/src/pages/aigc-close.cjs portfolio-pdf/dist/media/aigc portfolio-pdf/tests/aigc-close.test.cjs
git commit -m "feat: add AIGC evidence and PDF closing pages"
```

---

### Task 9: Export, Compress, Render, And Validate The Final PDF

**Files:**
- Create: `portfolio-pdf/scripts/render-pages.py`
- Create: `portfolio-pdf/dist/qa/contact-sheet.jpg`
- Create: `portfolio-pdf/README.md`
- Modify: `portfolio-pdf/scripts/prepare-images.py`
- Modify: `portfolio-pdf/package.json`

**Interfaces:**
- Consumes: complete 26-page HTML and optimized media.
- Produces: final PDF below 20MB and visual QA assets.

- [ ] **Step 1: Add PDF page rendering**

`scripts/render-pages.py` must call the bundled Poppler executable:

```text
C:\Users\anyuxin\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\poppler\bin\pdftoppm.cmd
```

Render at 110 DPI into `dist/qa/page-XX.png`, then use Pillow to create `dist/qa/contact-sheet.jpg` with all 26 pages in reading order.

- [ ] **Step 2: Implement the compression ladder**

Modify `prepare-images.py` to support:

```text
Pass A: max width 1800, JPEG quality 84
Pass B: max width 1600, JPEG quality 80
Pass C: max width 1400, JPEG quality 76
Pass D: replace decorative raster gradients with CSS and keep only UI evidence images
```

`build-pdf.cjs` must run the PDF build, read the final byte size, and if the size is over 20,000,000 bytes, rerun the next image pass and rebuild. It must never delete a required page.

- [ ] **Step 3: Add the complete size and quality check**

Run from `portfolio-pdf`:

```powershell
npm run build
npm run render
C:/Users/anyuxin/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe scripts/validate-pdf.py
```

Expected:

```text
pages: 26
page_size: 960 x 540
file_size <= 20 * 1024 * 1024
file_size < 20,000,000
no missing glyphs
no blank pages
no clipped text
```

- [ ] **Step 4: Inspect the contact sheet and representative pages**

Inspect:

```text
dist/qa/contact-sheet.jpg
dist/qa/page-01.png
dist/qa/page-02.png
dist/qa/page-04.png
dist/qa/page-08.png
dist/qa/page-12.png
dist/qa/page-16.png
dist/qa/page-20.png
dist/qa/page-24.png
dist/qa/page-26.png
```

Confirm:

- All 26 pages exist in order.
- The first three pages clearly present the resume and AIGC positioning.
- Each project has four pages.
- UI screens remain sharp.
- No text is clipped.
- No black boxes or missing Chinese glyphs.
- No video is embedded.
- Flow uses four still frames and a QR code.
- The final PDF is visually complete without opening the website.

- [ ] **Step 5: Add PDF README**

`README.md` must document:

- Build command
- Validation command
- Render command
- Final PDF path
- Hard 20MB limit
- Compression pass order
- Page map
- Source website path
- How to regenerate the Flow storyboard

- [ ] **Step 6: Commit the final PDF build system**

```powershell
git add -- portfolio-pdf/scripts/render-pages.py portfolio-pdf/scripts/prepare-images.py portfolio-pdf/package.json portfolio-pdf/README.md
git commit -m "build: add PDF rendering compression and QA"
```

- [ ] **Step 7: Commit the final generated PDF**

```powershell
git add -- portfolio-pdf/dist/安雨鑫-UIUX-Product-作品集.pdf
git commit -m "docs: add 20MB portfolio PDF casebook"
```

---

## Final PDF Acceptance

- Exactly 26 pages.
- Page size exactly 960 x 540 PDF points.
- File size is 20MB or less.
- File size is strictly less than 20,000,000 bytes.
- Target file size is 14-18MB.
- Pages 1-3 contain cover, resume snapshot, and AIGC process overview.
- Pages 4-23 contain four complete pages for each of the five projects.
- Pages 24-26 contain Badcase Museum, Homestyler AIGC workflow, and contact information.
- Each project shows problem, research or context, product logic, UI system, interaction, iteration or trade-off, and reflection.
- Flow's 15-second demo appears only as a four-frame storyboard and website QR link.
- No other video is embedded.
- No remote resources are required.
- No text is clipped or unreadable.
- No fake metrics or unsupported commercial outcomes appear.



