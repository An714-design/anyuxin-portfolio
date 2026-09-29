# Lumen Portfolio Presentation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the final static portfolio presentation for 光合 Lumen, without implementing the mobile app or any real AI service.

**Architecture:** Generate all phone screens, diagrams, key art, and motion posters as local HTML with Playwright, then assemble them into one responsive case-study page. The portfolio page is the only deliverable; source generators exist solely to reproduce and validate the assets.

**Tech Stack:** HTML, CSS, vanilla JavaScript, Node.js 24, Node test runner, Playwright Chromium.

## Global Constraints

- Final deliverable is `Lumen作品集/index.html` plus its local generated assets.
- Do not build an interactive app, backend, real voice recognition, real AI generation, or persistence.
- Use the approved design document: `docs/superpowers/specs/2026-09-29-lumen-sleep-companion-design.md`.
- Primary persona is 夜猫族「林澈」.
- Hero flow is 「脑子很吵，停不下来」.
- Default experience is sound and breathing; Dreamweaver is user-initiated.
- Visual direction is 温柔诗性、克制高级, using 晨昏光场 and 成人梦境绘本.
- AI capabilities are Curator, Listener, and Dreamweaver, with the approved memory boundary.
- Phone screenshots use a 390 × 844 viewport at device scale factor 2.
- Browser executable is `C:\Program Files\Google\Chrome\Application\chrome.exe`.
- Playwright module path is `C:/Users/anyuxin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright`.
- All assets must be local; no remote images, fonts, analytics, or network dependencies.
- Every image needs non-empty `alt` text.
- The page must have no horizontal overflow at 1440 × 900 or 390 × 844.
- AIGC assets must be labeled as generated and art-directed by the author.
- Use no placeholder copy, fake test results, or invented outcome metrics.

---

## File Structure

- `Lumen作品集/index.html` — final portfolio presentation.
- `Lumen作品集/render.js` — asset generation orchestrator.
- `Lumen作品集/lib/tokens.js` — approved color, font, size, radius, and easing tokens.
- `Lumen作品集/lib/capture.js` — Playwright screenshot and recording helper.
- `Lumen作品集/lib/screens.js` — all phone-screen HTML.
- `Lumen作品集/lib/diagrams.js` — research and system diagrams.
- `Lumen作品集/lib/motion.js` — key visual and animated HTML demos.
- `Lumen作品集/scripts/validate.js` — link, asset, accessibility, and overflow checks.
- `Lumen作品集/tests/*.test.js` — generator contract tests.
- `Lumen作品集/screens/*.png` — generated phone screens.
- `Lumen作品集/diagrams/*.png` — generated diagrams.
- `Lumen作品集/kv/*` — generated key visual source and PNG.
- `Lumen作品集/motion/*` — generated motion source and posters.
- `Lumen作品集/package.json` — local scripts, no dependencies.
- `Lumen作品集/使用说明.md` — regeneration, preview, and asset manifest.

---

### Task 1: Create Foundation Tokens and Test Harness

**Files:**
- Create: `Lumen作品集/package.json`
- Create: `Lumen作品集/lib/tokens.js`
- Create: `Lumen作品集/tests/tokens.test.js`

**Interfaces:**
- Consumes: approved palette and sizing rules from the design document.
- Produces: `tokens` object with `colors`, `font`, `screens`, `radius`, and `easing`.

- [ ] **Step 1: Write the failing token test**

```javascript
const test = require('node:test');
const assert = require('node:assert/strict');
const tokens = require('../lib/tokens');

test('uses the approved Lumen visual tokens', () => {
  assert.equal(tokens.colors.paper, '#F7F1E8');
  assert.equal(tokens.colors.ink, '#121319');
  assert.equal(tokens.colors.night, '#202B46');
  assert.equal(tokens.colors.amber, '#D8A15E');
  assert.equal(tokens.colors.dusk, '#7B6C9D');
  assert.equal(tokens.colors.moon, '#ECE2C6');
  assert.equal(tokens.colors.sprout, '#A8C8A0');
  assert.deepEqual(tokens.screens, { width: 390, height: 844, scale: 2 });
});
```

- [ ] **Step 2: Run the token test and verify failure**

Run: `node --test tests/tokens.test.js` from `Lumen作品集`  
Expected: FAIL because `lib/tokens.js` does not exist.

- [ ] **Step 3: Add package metadata and token implementation**

`package.json`:

```json
{
  "name": "lumen-portfolio",
  "private": true,
  "scripts": {
    "render": "node render.js",
    "test": "node --test",
    "validate": "node scripts/validate.js"
  }
}
```

`lib/tokens.js`:

```javascript
module.exports = Object.freeze({
  colors: {
    paper: '#F7F1E8',
    ink: '#121319',
    night: '#202B46',
    amber: '#D8A15E',
    dusk: '#7B6C9D',
    moon: '#ECE2C6',
    sprout: '#A8C8A0',
    white: '#FFFDF8',
    muted: '#7E7A78',
    line: 'rgba(236,226,198,.16)'
  },
  font: {
    display: '"Noto Serif SC","Songti SC","STSong",serif',
    body: '-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif'
  },
  screens: { width: 390, height: 844, scale: 2 },
  radius: { phone: 34, card: 24, chip: 999 },
  easing: { sleep: 'cubic-bezier(.22,.61,.36,1)' }
});
```

- [ ] **Step 4: Run the token test and verify success**

Run: `node --test tests/tokens.test.js` from `Lumen作品集`  
Expected: PASS with 1 test.

- [ ] **Step 5: Commit the foundation**

```powershell
git add -- 'Lumen作品集/package.json' 'Lumen作品集/lib/tokens.js' 'Lumen作品集/tests/tokens.test.js'
git commit -m "feat: add Lumen portfolio tokens"
```

---

### Task 2: Build the Playwright Capture Harness

**Files:**
- Create: `Lumen作品集/lib/capture.js`
- Create: `Lumen作品集/tests/capture.test.js`

**Interfaces:**
- Consumes: `tokens.screens` for default viewport values.
- Produces: `captureHtml({ html, output, width, height, scale, fullPage })` and `captureFile({ input, output, width, height, scale, fullPage })`.

- [ ] **Step 1: Write the failing capture test**

```javascript
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { captureHtml } = require('../lib/capture');

test('captureHtml writes a non-empty screenshot', async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'lumen-capture-'));
  const output = path.join(dir, 'smoke.png');
  await captureHtml({
    html: '<body style="margin:0;background:#121319;color:#ECE2C6"><h1>Lumen</h1></body>',
    output,
    width: 390,
    height: 844,
    scale: 1
  });
  assert.equal(fs.existsSync(output), true);
  assert.ok(fs.statSync(output).size > 1000);
});
```

- [ ] **Step 2: Run the capture test and verify failure**

Run: `node --test tests/capture.test.js` from `Lumen作品集`  
Expected: FAIL because `lib/capture.js` does not exist.

- [ ] **Step 3: Implement the capture helper**

```javascript
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require('C:/Users/anyuxin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const tokens = require('./tokens');

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function captureHtml({ html, output, width = tokens.screens.width, height = tokens.screens.height, scale = tokens.screens.scale, fullPage = false }) {
  fs.mkdirSync(path.dirname(output), { recursive: true });
  const browser = await chromium.launch({ headless: true, executablePath: CHROME });
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: scale });
  await page.setContent(html, { waitUntil: 'load' });
  await page.screenshot({ path: output, fullPage });
  await browser.close();
}

async function captureFile({ input, output, width = tokens.screens.width, height = tokens.screens.height, scale = tokens.screens.scale, fullPage = false }) {
  fs.mkdirSync(path.dirname(output), { recursive: true });
  const browser = await chromium.launch({ headless: true, executablePath: CHROME });
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: scale });
  await page.goto(pathToFileURL(input).href, { waitUntil: 'load' });
  await page.screenshot({ path: output, fullPage });
  await browser.close();
}

module.exports = { captureHtml, captureFile };
```

- [ ] **Step 4: Run the capture test and verify success**

Run: `node --test tests/capture.test.js` from `Lumen作品集`  
Expected: PASS with 1 test.

- [ ] **Step 5: Commit the capture harness**

```powershell
git add -- 'Lumen作品集/lib/capture.js' 'Lumen作品集/tests/capture.test.js'
git commit -m "feat: add portfolio capture harness"
```

---

### Task 3: Generate the Twelve Core Phone Screens

**Files:**
- Create: `Lumen作品集/lib/screens.js`
- Create: `Lumen作品集/tests/screens.test.js`
- Create: `Lumen作品集/render.js`
- Generate: `Lumen作品集/screens/01-onboarding.png` through `Lumen作品集/screens/12-memory-privacy.png`
- Generate: `Lumen作品集/src/01-onboarding.html` through `Lumen作品集/src/12-memory-privacy.html`

**Interfaces:**
- Consumes: `tokens`, approved copy, and hero flow.
- Produces: `screens`, an array of `{ id, label, html }`.

Required screen contract:

| ID | Label | Required content |
|---|---|---|
| `01-onboarding` | 夜晚从哪儿开始 | 你的夜晚通常从哪里开始 |
| `02-home` | 今晚这一页 | 脑子很吵 / 舍不得结束今天 |
| `03-checkin` | 噪声分类 | 未完成的事 / 反复想的话 / 明天的担心 |
| `04-listener` | 说给夜晚听 | 把最吵的一句话放在这里 |
| `05-micro-action` | 放进明早的信封 | 今晚不用想清楚，明早再回来 |
| `06-audio-player` | 默认声音与呼吸 | 窗边夜雨 / 城市远处 / 深夜车厢 |
| `07-sleep-mode` | 熄灯 | 音频继续 / 屏幕暗下 |
| `08-dream-bus` | 夜行公交 | 它们没有消失，只是不再贴着你 |
| `09-morning-note` | 晨光留言 | 现在处理 / 继续放在那里 / 不再需要 |
| `10-night-book` | 七页夜之书 | 七夜轨迹与本周摘要 |
| `11-ai-system` | 光种的三种方式 | Curator / Listener / Dreamweaver |
| `12-memory-privacy` | 记忆边界 | 默认不保存具体对话 |

- [ ] **Step 1: Write the failing screen contract test**

```javascript
const test = require('node:test');
const assert = require('node:assert/strict');
const { screens } = require('../lib/screens');

test('contains twelve ordered screens with approved content', () => {
  const ids = screens.map((screen) => screen.id);
  assert.equal(ids.length, 12);
  assert.equal(ids[0], '01-onboarding');
  assert.equal(ids[11], '12-memory-privacy');
  assert.match(screens.find((screen) => screen.id === '02-home').html, /今晚这一页/);
  assert.match(screens.find((screen) => screen.id === '03-checkin').html, /脑子很吵/);
  assert.match(screens.find((screen) => screen.id === '04-listener').html, /把最吵的一句话放在这里/);
  assert.match(screens.find((screen) => screen.id === '12-memory-privacy').html, /默认不保存具体对话/);
});
```

- [ ] **Step 2: Run the screen test and verify failure**

Run: `node --test tests/screens.test.js` from `Lumen作品集`  
Expected: FAIL because `lib/screens.js` does not exist.

- [ ] **Step 3: Implement the screen generator**

Create `lib/screens.js` with shared helpers for status bar, phone frame, chips, cards, captions, and the Lumen light-seed mark. Export the twelve objects in the required order. Each screen uses `width:390px;height:844px`, dark or dawn backgrounds from `tokens`, and the approved copy from the contract. No screen may contain unapproved placeholder labels.

- [ ] **Step 4: Implement the asset orchestrator**

Create `render.js`:

```javascript
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
    fs.writeFileSync(path.join(SRC_DIR, `${screen.id}.html`), screen.html, 'utf8');
    await captureHtml({ html: screen.html, output: path.join(SCREEN_DIR, `${screen.id}.png`) });
  }
}

async function main() {
  await renderScreens();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
```

- [ ] **Step 5: Run tests and render the screens**

Run from `Lumen作品集`: `npm test`  
Expected: all tests PASS.

Run from `Lumen作品集`: `npm run render`  
Expected: twelve PNG files in `screens/` and twelve HTML files in `src/`.

- [ ] **Step 6: Verify generated dimensions and commit**

Run:

```powershell
node -e "const fs=require('fs');const files=fs.readdirSync('screens');if(files.length!==12)throw new Error('expected 12');console.log(files.join('\n'))"
```

Expected: exactly twelve screen filenames.

```powershell
git add -- 'Lumen作品集/lib/screens.js' 'Lumen作品集/tests/screens.test.js' 'Lumen作品集/render.js' 'Lumen作品集/screens' 'Lumen作品集/src'
git commit -m "feat: generate Lumen phone screens"
```

---

### Task 4: Generate the Five Research and System Diagrams

**Files:**
- Create: `Lumen作品集/lib/diagrams.js`
- Create: `Lumen作品集/tests/diagrams.test.js`
- Modify: `Lumen作品集/render.js`
- Generate: `Lumen作品集/diagrams/empathy-map.png`
- Generate: `Lumen作品集/diagrams/weekly-journey.png`
- Generate: `Lumen作品集/diagrams/ai-system.png`
- Generate: `Lumen作品集/diagrams/memory-flow.png`
- Generate: `Lumen作品集/diagrams/core-flow.png`

**Interfaces:**
- Consumes: approved research, AI, memory, and flow copy.
- Produces: `diagrams`, an array of `{ id, label, width, height, html }`.

- [ ] **Step 1: Write the failing diagram contract test**

```javascript
const test = require('node:test');
const assert = require('node:assert/strict');
const { diagrams } = require('../lib/diagrams');

test('contains the five approved diagrams', () => {
  assert.deepEqual(diagrams.map((item) => item.id), [
    'empathy-map',
    'weekly-journey',
    'ai-system',
    'memory-flow',
    'core-flow'
  ]);
  assert.match(diagrams[2].html, /Curator/);
  assert.match(diagrams[3].html, /默认不保存具体对话/);
});
```

- [ ] **Step 2: Run the diagram test and verify failure**

Run: `node --test tests/diagrams.test.js` from `Lumen作品集`  
Expected: FAIL because `lib/diagrams.js` does not exist.

- [ ] **Step 3: Implement the diagrams**

Each diagram uses a 1240-pixel-wide HTML canvas, warm paper background, thin dividers, and the approved serif/sans pairing.

- `empathy-map`: eight zones for 说、想、做、感受、看、听、痛点、收获.
- `weekly-journey`: seven nights with chapter names, actions, and emotional curve.
- `ai-system`: Curator, Listener, Dreamweaver, shared guardrails, and user control.
- `memory-flow`: tonight → user confirmation → preference/week summary → next recommendation, with explicit deletion paths.
- `core-flow`: Home → Check-in → Listener → Micro-action → Sound/Breath → optional Dreamweaver → Sleep → Morning Note.

- [ ] **Step 4: Extend `render.js` to generate diagrams**

Add `renderDiagrams()` that loops over `diagrams`, writes source HTML to `diagrams/src/`, and captures PNGs with each diagram's own width and height. Call `await renderDiagrams();` inside `main()` after `renderScreens()`.

- [ ] **Step 5: Run tests and generate assets**

Run from `Lumen作品集`: `npm test`  
Expected: all tests PASS.

Run from `Lumen作品集`: `npm run render`  
Expected: five diagram PNGs and five source HTML files.

- [ ] **Step 6: Commit the diagrams**

```powershell
git add -- 'Lumen作品集/lib/diagrams.js' 'Lumen作品集/tests/diagrams.test.js' 'Lumen作品集/render.js' 'Lumen作品集/diagrams'
git commit -m "feat: add Lumen research and system diagrams"
```

---

### Task 5: Generate Key Visual and Motion Demos

**Files:**
- Create: `Lumen作品集/lib/motion.js`
- Create: `Lumen作品集/tests/motion.test.js`
- Modify: `Lumen作品集/render.js`
- Generate: `Lumen作品集/kv/key-visual.html`
- Generate: `Lumen作品集/kv/key-visual.png`
- Generate: `Lumen作品集/motion/breath.html`
- Generate: `Lumen作品集/motion/breath-poster.png`
- Generate: `Lumen作品集/motion/night-bus.html`
- Generate: `Lumen作品集/motion/night-bus-poster.png`

**Interfaces:**
- Consumes: the visual token system and approved dream-bus narrative.
- Produces: `motionAssets`, an array of `{ id, label, html, poster, animated }`.

- [ ] **Step 1: Write the failing motion asset test**

```javascript
const test = require('node:test');
const assert = require('node:assert/strict');
const { motionAssets } = require('../lib/motion');

test('contains the three approved visual assets', () => {
  assert.deepEqual(motionAssets.map((item) => item.id), [
    'key-visual',
    'breath',
    'night-bus'
  ]);
  assert.match(motionAssets[0].html, /Lumen/);
  assert.match(motionAssets[1].html, /4s/);
  assert.match(motionAssets[2].html, /夜行公交/);
});
```

- [ ] **Step 2: Run the motion test and verify failure**

Run: `node --test tests/motion.test.js` from `Lumen作品集`  
Expected: FAIL because `lib/motion.js` does not exist.

- [ ] **Step 3: Implement the key visual**

Create a 1600 × 1000 key visual using pure CSS and inline SVG. The scene must contain a private room, a window, one amber light source, a night-city silhouette, and the Lumen light seed. Do not place generated text inside raster artwork; render all text with HTML.

- [ ] **Step 4: Implement the motion demos**

`breath.html` must include a 10-second CSS loop with 4-second inhale and 6-second exhale. `night-bus.html` must include at least three parallax layers, one dimming light seed, and no autoplay audio. Both demos must support `prefers-reduced-motion: reduce` by switching to a static or fade-only state.

- [ ] **Step 5: Extend `render.js` and generate assets**

Write source HTML into `kv/` and `motion/`, then call `captureHtml` for the key visual and the two posters. The animated HTML files remain the live sources used by the portfolio page.

- [ ] **Step 6: Run tests, generate, and commit**

Run from `Lumen作品集`: `npm test` and `npm run render`  
Expected: all tests PASS and three PNG posters exist.

```powershell
git add -- 'Lumen作品集/lib/motion.js' 'Lumen作品集/tests/motion.test.js' 'Lumen作品集/render.js' 'Lumen作品集/kv' 'Lumen作品集/motion'
git commit -m "feat: add Lumen key visual and motion demos"
```

---

### Task 6: Compose the Final Portfolio Presentation

**Files:**
- Create: `Lumen作品集/index.html`
- Create: `Lumen作品集/tests/index.test.js`
- Consume: every generated asset from Tasks 3–5.

**Interfaces:**
- Consumes: screen PNGs, diagram PNGs, key visual, motion posters, and approved copy.
- Produces: one static responsive page with anchor navigation.

Page section contract:

1. `hero` — 光合 Lumen, one-line positioning, tags, key visual, three hero screens.
2. `opportunity` — why night-owl sleep procrastination is not a discipline problem.
3. `persona` — 林澈, empathy map, three primary pain points.
4. `insight` — 夜晚不是解决问题的时间; design principles.
5. `journey` — seven-night journey diagram and emotional curve.
6. `ai-system` — Curator, Listener, Dreamweaver, memory flow.
7. `core-flow` — 脑子很吵 complete flow diagram.
8. `screens` — twelve phone screens in three-column desktop and one-column mobile layout.
9. `visual-system` — approved palette, typography, material, and motion rules.
10. `dream-bus` — five-act storyboard, night-bus motion demo, sample narration.
11. `voice-memory` — voice/text parallel interaction and memory confirmation card.
12. `aigc` — ChatGPT, Midjourney, 即梦 AI responsibilities and art-direction disclosure.
13. `quality` — ethical decisions, success metrics, and what was intentionally not built.
14. `footer` — project credit and regeneration note.

- [ ] **Step 1: Write the failing page contract test**

```javascript
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

test('portfolio includes all required sections and local assets', () => {
  const file = path.join(__dirname, '..', 'index.html');
  const html = fs.readFileSync(file, 'utf8');
  for (const id of ['hero', 'opportunity', 'persona', 'insight', 'journey', 'ai-system', 'core-flow', 'screens', 'visual-system', 'dream-bus', 'voice-memory', 'aigc', 'quality']) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
  assert.doesNotMatch(html, /https?:\/\//);
  assert.match(html, /光合 Lumen/);
  assert.match(html, /默认陪伴，主动造梦/);
});
```

- [ ] **Step 2: Run the page test and verify failure**

Run: `node --test tests/index.test.js` from `Lumen作品集`  
Expected: FAIL because `index.html` does not exist.

- [ ] **Step 3: Build the page shell and navigation**

Use a 1200-pixel content width, sticky translucent navigation, light paper sections for research, warm-dark sections for product experience, and one repeated primary section rhythm. The page must remain readable without JavaScript; no framework is allowed.

- [ ] **Step 4: Add all approved content and assets**

Use the generated `screens/*.png` images in the screen gallery. Label each with its ID and Chinese title. Use the five diagrams in their corresponding sections. Place `kv/key-visual.png` in the hero and the motion poster files in the dream-bus section.

- [ ] **Step 5: Add the motion lab**

Embed `motion/breath.html` and `motion/night-bus.html` in one responsive motion lab using two lazy-loaded iframes. Below each iframe, add a static poster with a short caption so the page remains understandable if iframe animation is unavailable.

- [ ] **Step 6: Run the page test and commit**

Run: `node --test tests/index.test.js` from `Lumen作品集`  
Expected: PASS.

```powershell
git add -- 'Lumen作品集/index.html' 'Lumen作品集/tests/index.test.js'
git commit -m "feat: compose Lumen portfolio presentation"
```

---

### Task 7: Validate Layout and Export Previews

**Files:**
- Create: `Lumen作品集/scripts/validate.js`
- Generate: `Lumen作品集/preview-hero.png`
- Generate: `Lumen作品集/preview.png`

**Interfaces:**
- Consumes: `Lumen作品集/index.html` and all local assets.
- Produces: validated page plus 1440 × 900 hero preview and full-page preview.

- [ ] **Step 1: Write the failing validation entry point**

Create `scripts/validate.js` with a first assertion that fails if `index.html` is missing:

```javascript
const fs = require('node:fs');
const path = require('node:path');
const input = path.join(__dirname, '..', 'index.html');
if (!fs.existsSync(input)) throw new Error('index.html is missing');
console.log('portfolio structure is valid');
```

- [ ] **Step 2: Run validation and verify the first implementation passes**

Run from `Lumen作品集`: `npm run validate`  
Expected: PASS and print `portfolio structure is valid`.

- [ ] **Step 3: Implement full validation and preview export**

Extend `scripts/validate.js` with Playwright to check:

- every local `src` and `href` target exists;
- every `img` has non-empty `alt`;
- every anchor points to an existing `id`;
- no remote URLs are present;
- `document.documentElement.scrollWidth <= innerWidth + 1` at 1440 × 900 and 390 × 844;
- `preview-hero.png` is captured at 1440 × 900;
- `preview.png` is captured with `fullPage:true`;
- required selectors `#hero`, `#screens`, `#dream-bus`, and `#quality` are visible.

- [ ] **Step 4: Run validation and tests**

Run from `Lumen作品集`:

```powershell
npm test
npm run validate
```

Expected: all tests PASS, validation PASS, and both preview PNGs exist.

- [ ] **Step 5: Inspect the generated presentation**

Open `Lumen作品集/index.html` in the in-app browser. Confirm:

- the hero reads as 温柔诗性、克制高级;
- cards do not overlap;
- mobile screenshots retain readable hierarchy;
- no section uses more than one dominant light source;
- text contrast is sufficient;
- the page has no more than three consecutive dense sections without a visual pause.

If the image viewer is unavailable, use Playwright screenshots and DOM overflow checks as the source of truth.

- [ ] **Step 6: Commit validation and previews**

```powershell
git add -- 'Lumen作品集/scripts/validate.js' 'Lumen作品集/preview-hero.png' 'Lumen作品集/preview.png'
git commit -m "test: validate Lumen portfolio presentation"
```

---

### Task 8: Document Regeneration and Run Final Acceptance

**Files:**
- Create: `Lumen作品集/使用说明.md`
- Modify: `Lumen作品集/package.json` only if an exact command path needs correction.
- Verify: all files in `Lumen作品集/`.

**Interfaces:**
- Consumes: the complete portfolio and generator scripts.
- Produces: a reproducible handoff and final verified build.

- [ ] **Step 1: Write the usage and asset guide**

Document:

- project purpose;
- command `npm run render`;
- command `npm test`;
- command `npm run validate`;
- output locations for screens, diagrams, key visual, motion, and previews;
- Playwright and Chrome absolute paths;
- the fact that product AI is conceptual and no real service is implemented;
- the AIGC disclosure rule;
- how to open `index.html` locally.

- [ ] **Step 2: Run the full clean acceptance sequence**

Run from `Lumen作品集`:

```powershell
npm run render
npm test
npm run validate
```

Expected:

- 12 screen PNGs;
- 5 diagram PNGs;
- `kv/key-visual.png`;
- `motion/breath-poster.png`;
- `motion/night-bus-poster.png`;
- `preview-hero.png`;
- `preview.png`;
- all tests and validation pass.

- [ ] **Step 3: Audit the final scope**

Run:

```powershell
Select-String -Path 'Lumen作品集\index.html','Lumen作品集\使用说明.md' -Pattern '真实 AI 服务|未实现|作品集呈现|AIGC' -CaseSensitive:$false
```

Expected: the files clearly state that only the portfolio presentation is delivered and that product AI is conceptual.

- [ ] **Step 4: Commit the documentation**

```powershell
git add -- 'Lumen作品集/使用说明.md' 'Lumen作品集/package.json'
git commit -m "docs: add Lumen portfolio usage guide"
```

- [ ] **Step 5: Report final paths and evidence**

Report:

- `Lumen作品集/index.html`;
- `Lumen作品集/preview.png`;
- `Lumen作品集/preview-hero.png`;
- test command and pass count;
- validation command and pass result;
- commit hashes.

Do not claim usability-test results, sleep improvement, or product impact because this deliverable is a portfolio presentation, not a validated product.