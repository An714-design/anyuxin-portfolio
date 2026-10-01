# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build one deployable portfolio website that unifies five existing project presentations under a neutral editorial shell while preserving each project's own visual world.

**Architecture:** Use static HTML, shared CSS, vanilla JavaScript, and a small Node build/validation harness. Copy canonical project assets into `portfolio-site/public/projects/<slug>/`, patch each copied project page with a shared portfolio dock, and build new top-level Work, Thinking, AIGC, About, Resume, and Contact pages around them.

**Tech Stack:** Node.js 24, static HTML/CSS/JavaScript, Node test runner, Playwright Chromium from the bundled Codex runtime, Chrome for local visual QA.

## Global Constraints

- Approved design specification: `docs/superpowers/specs/2026-10-01-portfolio-website-and-pdf-design.md`.
- Final deployable root: `portfolio-site/`.
- Project routes must be ASCII: `soundscape`, `renew`, `lightmap`, `lumen`, `flow`.
- Preserve each project's distinctive visual language and existing page content where possible.
- The shell is neutral and editorial; project pages carry their own accent colors.
- Website motion may keep only Flow's 15-second demonstration.
- Remove the Flow 38-second video section.
- Remove the LIGHTMAP video and demo-video link.
- Remove both Lumen motion iframes.
- Renew and Soundscape remain video-free.
- All fonts, images, and scripts are local; no remote fonts, analytics, or CDN dependencies.
- Every image must have non-empty `alt` text.
- No horizontal overflow at `1440 x 900` or `390 x 844`.
- Use no fake metrics, fake research, or invented outcomes.
- Use real project facts from the existing project pages and the approved specification.
- The final site must work when served from a static host.

---

## File Structure

- `portfolio-site/package.json` - scripts and project metadata.
- `portfolio-site/index.html` - portfolio homepage.
- `portfolio-site/work/index.html` - project index and filters.
- `portfolio-site/thinking/index.html` - cross-project design decision map.
- `portfolio-site/aigc-process/index.html` - AIGC workflow and evidence.
- `portfolio-site/about/index.html` - education, internship, and working style.
- `portfolio-site/resume/index.html` - one-page resume presentation and PDF download entry.
- `portfolio-site/contact/index.html` - contact actions.
- `portfolio-site/assets/css/tokens.css` - global design tokens.
- `portfolio-site/assets/css/shell.css` - global header, footer, cards, and responsive shell.
- `portfolio-site/assets/css/pages.css` - top-level page compositions.
- `portfolio-site/assets/js/site-shell.js` - shared header/footer rendering and active navigation.
- `portfolio-site/assets/js/project-data.js` - browser-readable project and decision data.
- `portfolio-site/assets/js/home.js` - homepage project rendering.
- `portfolio-site/assets/js/work.js` - project filtering.
- `portfolio-site/assets/js/thinking.js` - decision map rendering.
- `portfolio-site/assets/js/project-shell.js` - project-page dock and next-project navigation.
- `portfolio-site/assets/global/project-shell.css` - styles for injected project pages.
- `portfolio-site/content/profile.json` - resume and contact facts.
- `portfolio-site/content/projects.json` - canonical five-project content.
- `portfolio-site/content/decisions.json` - cross-project decision records.
- `portfolio-site/scripts/import-projects.cjs` - copies and patches existing project pages.
- `portfolio-site/scripts/validate-site.cjs` - link, media, accessibility, and content validation.
- `portfolio-site/scripts/visual-check.cjs` - responsive screenshot and overflow validation.
- `portfolio-site/scripts/serve.cjs` - local static server.
- `portfolio-site/tests/content.test.cjs` - project and decision content contracts.
- `portfolio-site/tests/import.test.cjs` - media exclusion and project patch contracts.
- `portfolio-site/public/projects/<slug>/` - copied project deliverables.
- `portfolio-site/qa/` - generated QA screenshots, not required on production deploys.

---

### Task 1: Create Static Site Foundation And Validation Harness

**Files:**
- Create: `portfolio-site/package.json`
- Create: `portfolio-site/assets/css/tokens.css`
- Create: `portfolio-site/assets/css/shell.css`
- Create: `portfolio-site/assets/js/site-shell.js`
- Create: `portfolio-site/scripts/serve.cjs`
- Create: `portfolio-site/tests/shell.test.cjs`

**Interfaces:**
- Consumes: approved visual tokens from the design specification.
- Produces: `renderSiteHeader({ active })`, `renderSiteFooter()`, and `resolveStaticPath(urlPath)` runtime helpers.

- [ ] **Step 1: Write the failing shell test**

```javascript
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

test('global tokens and shell files exist', () => {
  assert.equal(fs.existsSync('assets/css/tokens.css'), true);
  assert.equal(fs.existsSync('assets/css/shell.css'), true);
  assert.equal(fs.existsSync('assets/js/site-shell.js'), true);
});
```

- [ ] **Step 2: Run the shell test and verify failure**

Run from `portfolio-site`: `node --test tests/shell.test.cjs`  
Expected: FAIL because the shell files do not exist.

- [ ] **Step 3: Add package metadata and local server**

`package.json`:

```json
{
  "name": "anyuxin-uiux-product-portfolio",
  "private": true,
  "scripts": {
    "serve": "node scripts/serve.cjs",
    "import": "node scripts/import-projects.cjs",
    "validate": "node scripts/validate-site.cjs",
    "visual": "node scripts/visual-check.cjs",
    "test": "node --test"
  }
}
```

`scripts/serve.cjs`:

```javascript
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.pdf': 'application/pdf'
};

http.createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const requested = pathname === '/' ? '/index.html' : pathname;
  let file = path.resolve(root, `.${requested}`);
  if (!file.startsWith(root)) {
    res.writeHead(403).end('Forbidden');
    return;
  }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  fs.readFile(file, (error, data) => {
    if (error) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(4173, '127.0.0.1', () => console.log('http://127.0.0.1:4173'));
```

- [ ] **Step 4: Add global tokens and shell**

`assets/css/tokens.css`:

```css
:root {
  --canvas: #f3f1ec;
  --surface: #fffdf8;
  --ink: #151515;
  --muted: #6f6b64;
  --line: rgba(21, 21, 21, .14);
  --soft-line: rgba(21, 21, 21, .08);
  --soundscape: #7e74a2;
  --renew: #c8f45a;
  --lightmap: #e0a93e;
  --lumen: #d8a15e;
  --flow: #8faf88;
  --radius-sm: 12px;
  --radius-md: 22px;
  --radius-lg: 36px;
  --shadow: 0 18px 55px rgba(21, 21, 21, .08);
  --max: 1320px;
  --ease: cubic-bezier(.22, .61, .36, 1);
}
```

`assets/css/shell.css`:

```css
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { margin: 0; background: var(--canvas); color: var(--ink); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif; -webkit-font-smoothing: antialiased; }
img { display: block; max-width: 100%; }
a { color: inherit; text-decoration: none; }
button, input { font: inherit; }
.wrap { width: min(calc(100% - 64px), var(--max)); margin: 0 auto; }
.site-header { position: sticky; top: 0; z-index: 50; backdrop-filter: blur(18px); background: rgba(243, 241, 236, .84); border-bottom: 1px solid var(--soft-line); }
.site-nav { min-height: 68px; display: flex; align-items: center; justify-content: space-between; gap: 24px; }
.brand { font-weight: 700; letter-spacing: -.02em; }
.nav-links { display: flex; gap: 24px; color: var(--muted); font-size: 13px; }
.nav-links a[aria-current="page"], .nav-links a:hover { color: var(--ink); }
.site-footer { padding: 72px 0 40px; border-top: 1px solid var(--line); margin-top: 100px; }
@media (max-width: 760px) {
  .wrap { width: min(calc(100% - 40px), var(--max)); }
  .nav-links { display: none; }
}
```

`assets/js/site-shell.js`:

```javascript
(() => {
  const base = document.documentElement.dataset.base || '.';
  const active = document.body.dataset.page || '';
  const links = [
    ['work', 'Work'],
    ['thinking', 'Thinking'],
    ['aigc-process', 'AIGC'],
    ['about', 'About'],
    ['resume', 'Resume'],
    ['contact', 'Contact']
  ];
  const href = key => `${base}/${key === 'work' ? 'work/' : `${key}/`}`;
  document.querySelectorAll('[data-site-header]').forEach(node => {
    node.innerHTML = `<header class="site-header"><div class="wrap site-nav"><a class="brand" href="${base}/">安雨鑫 / UI · UX · Product</a><nav class="nav-links" aria-label="主导航">${links.map(([key, label]) => `<a href="${href(key)}"${active === key ? ' aria-current="page"' : ''}>${label}</a>`).join('')}</nav></div></header>`;
  });
  document.querySelectorAll('[data-site-footer]').forEach(node => {
    node.innerHTML = `<footer class="site-footer"><div class="wrap"><strong>Open to UI / UX / Product Designer roles.</strong><p><a href="mailto:18939807980@163.com">18939807980@163.com</a></p></div></footer>`;
  });
})();
```

- [ ] **Step 5: Run the shell test and verify success**

Run from `portfolio-site`: `node --test tests/shell.test.cjs`  
Expected: PASS.

- [ ] **Step 6: Commit the foundation**

```powershell
git add -- portfolio-site/package.json portfolio-site/assets/css/tokens.css portfolio-site/assets/css/shell.css portfolio-site/assets/js/site-shell.js portfolio-site/scripts/serve.cjs portfolio-site/tests/shell.test.cjs
git commit -m "feat: add portfolio website foundation"
```

---

### Task 2: Define Canonical Project, Profile, And Decision Content

**Files:**
- Create: `portfolio-site/content/profile.json`
- Create: `portfolio-site/content/projects.json`
- Create: `portfolio-site/content/decisions.json`
- Create: `portfolio-site/assets/js/project-data.js`
- Create: `portfolio-site/tests/content.test.cjs`

**Interfaces:**
- Consumes: facts from the five existing project pages and the approved design specification.
- Produces: `window.PORTFOLIO.projects`, `window.PORTFOLIO.profile`, and `window.PORTFOLIO.decisions`.

- [ ] **Step 1: Write the failing content contract**

```javascript
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

const projects = JSON.parse(fs.readFileSync('content/projects.json', 'utf8'));
const decisions = JSON.parse(fs.readFileSync('content/decisions.json', 'utf8'));

test('projects use the approved order and required fields', () => {
  assert.deepEqual(projects.map(project => project.slug), ['soundscape', 'renew', 'lightmap', 'lumen', 'flow']);
  for (const project of projects) {
    assert.ok(project.title);
    assert.ok(project.thesis);
    assert.ok(project.role);
    assert.ok(project.duration);
    assert.ok(project.domain);
    assert.ok(project.cover);
    assert.ok(project.capabilities.length >= 3);
  }
});

test('decision map has one record per project', () => {
  assert.deepEqual(decisions.map(record => record.slug), ['soundscape', 'renew', 'lightmap', 'lumen', 'flow']);
  for (const record of decisions) {
    assert.ok(record.problem);
    assert.ok(record.tension);
    assert.ok(record.decision);
    assert.ok(record.rejected);
    assert.ok(record.rationale);
    assert.ok(record.unresolved);
  }
});
```

- [ ] **Step 2: Run the content test and verify failure**

Run from `portfolio-site`: `node --test tests/content.test.cjs`  
Expected: FAIL because the content files do not exist.

- [ ] **Step 3: Add the five canonical project records**

`content/projects.json` must contain this exact order and these exact core claims:

```json
[
  {
    "slug": "soundscape",
    "title": "声场 Soundscape",
    "thesis": "让空间音频成为看得见的界面语言。",
    "role": "独立完成 UI/UX、视觉系统、用户旅程与高保真界面",
    "duration": "6 周 · 3 轮迭代",
    "domain": "空间音频 · 音乐体验",
    "cover": "assets/covers/soundscape.png",
    "capabilities": ["用户旅程", "信息架构", "视觉系统", "高保真 UI"],
    "projectPath": "public/projects/soundscape/index.html",
    "accent": "#7e74a2"
  },
  {
    "slug": "renew",
    "title": "续费侦探 Renew",
    "thesis": "把分散的续费线索，转化为可确认、可行动的订阅决策。",
    "role": "独立完成产品逻辑、UX 流程、视觉系统与 10 张核心界面",
    "duration": "概念项目 · 端到端设计",
    "domain": "订阅管理 · AI 决策辅助",
    "cover": "assets/covers/renew.png",
    "capabilities": ["产品逻辑", "信息架构", "AI 信任边界", "核心界面"],
    "projectPath": "public/projects/renew/index.html",
    "accent": "#c8f45a"
  },
  {
    "slug": "lightmap",
    "title": "拾光 LIGHTMAP",
    "thesis": "用编号把侦察、拍摄、上传与复盘串成一段完整的城市光影游戏。",
    "role": "独立完成世界观、游戏循环、UX 流程、UI 与设计系统",
    "duration": "概念项目 · 完整设计系统",
    "domain": "沉浸式游戏 · 光影侦察",
    "cover": "assets/covers/lightmap.png",
    "capabilities": ["游戏化", "跨屏串联", "设计系统", "战术 UI"],
    "projectPath": "public/projects/lightmap/index.html",
    "accent": "#e0a93e"
  },
  {
    "slug": "lumen",
    "title": "光合 Lumen",
    "thesis": "睡眠陪伴不是让用户依赖产品，而是逐步获得对夜晚的控制感。",
    "role": "独立完成用户研究、产品叙事、AI 边界、视觉系统与 12 张界面",
    "duration": "概念项目 · AIGC 辅助视觉",
    "domain": "睡眠陪伴 · 情绪设计",
    "cover": "assets/covers/lumen.png",
    "capabilities": ["用户研究", "情绪设计", "AI 边界", "夜行叙事"],
    "projectPath": "public/projects/lumen/index.html",
    "accent": "#d8a15e"
  },
  {
    "slug": "flow",
    "title": "Flow 流",
    "thesis": "把专注、日程与睡前清空组织成一组可以完成的流。",
    "role": "独立完成信息架构、Bento UI、10 张界面与 15 秒演示",
    "duration": "概念项目 · UI 系统与动效",
    "domain": "效率工具 · Calm 生产力",
    "cover": "assets/covers/flow.png",
    "capabilities": ["Bento 系统", "信息架构", "动效", "完整流程"],
    "projectPath": "public/projects/flow/index.html",
    "accent": "#8faf88"
  }
]
```

- [ ] **Step 4: Add profile and decision records**

`content/profile.json` must preserve the factual resume information: 上海理工大学产品设计专业, GPA 3.6, 专业排名前 10%, Homestyler AIGC 实习, Badcase 博物馆, SCI 期刊可视化, 迪卡侬 CMF. Do not add degree, employer, metric, or result that is absent from the source resume.

`content/decisions.json` must contain one record for each project with these exact core decisions:

```json
[
  { "slug": "soundscape", "problem": "空间音频缺少可理解、可操作的界面语言。", "tension": "沉浸感与信息可读性容易互相冲突。", "decision": "用同心波场和波形条表达空间方位。", "rejected": "只把空间音频做成普通歌单入口。", "rationale": "可视化让用户先理解声音方位，再决定操作。", "unresolved": "真实空间音频设备与不同听力条件下的可用性仍需验证。" },
  { "slug": "renew", "problem": "用户不知道未来会被扣什么钱，也不清楚如何取消。", "tension": "AI 识别能力越强，财务决策的信任风险越高。", "decision": "AI 提供识别建议，用户负责确认和触发行动。", "rejected": "让系统自动取消订阅。", "rationale": "低置信度修正、来源保留和凭证保存降低了误操作风险。", "unresolved": "OCR 准确率、支付平台规则和合规边界需要真实接入后验证。" },
  { "slug": "lightmap", "problem": "城市光影玩法容易在不同页面之间失去目标和连续性。", "tension": "游戏感和系统清晰度必须同时成立。", "decision": "用同一编号贯穿地图、详情、拍摄和复盘。", "rejected": "每页独立使用不同的信息结构。", "rationale": "编号形成稳定的任务锚点，让玩家始终知道自己追踪什么。", "unresolved": "长期游戏循环和真实玩家留存需要后续测试。" },
  { "slug": "lumen", "problem": "夜猫族想睡，但不想结束今天，直接劝睡会制造对抗。", "tension": "陪伴感与依赖风险同时存在。", "decision": "先接住噪声，再提供微行动，把睡眠选择权交还用户。", "rejected": "用连续提醒和强刺激推动用户立即入睡。", "rationale": "低刺激、可退出、可控制的体验更符合夜间心理状态。", "unresolved": "睡眠效果、语音识别和长期行为改善不能由作品集演示代替。" },
  { "slug": "flow", "problem": "专注工具容易同时制造更多任务和更多打断。", "tension": "功能完整性与 Calm 体验之间需要取舍。", "decision": "以 Bento 模块承载单个动作，并以一条完整的流串联。", "rejected": "把首页设计成密集的任务仪表盘。", "rationale": "每一屏只有一个主要动作，减少切换和认知负担。", "unresolved": "不同工作节奏下的个性化提醒需要真实使用验证。" }
]
```

- [ ] **Step 5: Expose the content to browser scripts**

After creating the JSON files, run:

```powershell
node -e "const fs=require('fs'); const p=JSON.parse(fs.readFileSync('content/projects.json','utf8')); const d=JSON.parse(fs.readFileSync('content/decisions.json','utf8')); fs.writeFileSync('assets/js/project-data.js', 'window.PORTFOLIO = '+JSON.stringify({profile:JSON.parse(fs.readFileSync('content/profile.json','utf8')),projects:p,decisions:d},null,2)+';\n')"
```

- [ ] **Step 6: Run the content test and verify success**

Run from `portfolio-site`: `node --test tests/content.test.cjs`  
Expected: PASS with 2 tests.

- [ ] **Step 7: Commit canonical content**

```powershell
git add -- portfolio-site/content portfolio-site/assets/js/project-data.js portfolio-site/tests/content.test.cjs
git commit -m "feat: define portfolio project and decision content"
```

---

### Task 3: Import, Patch, And Validate Five Existing Project Pages

**Files:**
- Create: `portfolio-site/scripts/import-projects.cjs`
- Create: `portfolio-site/assets/global/project-shell.css`
- Create: `portfolio-site/assets/js/project-shell.js`
- Create: `portfolio-site/tests/import.test.cjs`
- Create: `portfolio-site/public/projects/soundscape/`
- Create: `portfolio-site/public/projects/renew/`
- Create: `portfolio-site/public/projects/lightmap/`
- Create: `portfolio-site/public/projects/lumen/`
- Create: `portfolio-site/public/projects/flow/`

**Interfaces:**
- Consumes: canonical source folders and `content/projects.json`.
- Produces: five static project folders whose `index.html` files load locally and contain the shared portfolio dock.

- [ ] **Step 1: Write the failing import contract**

```javascript
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const projects = ['soundscape', 'renew', 'lightmap', 'lumen', 'flow'];

test('all project indexes exist', () => {
  for (const slug of projects) assert.equal(fs.existsSync(path.join('public', 'projects', slug, 'index.html')), true);
});

test('only the Flow 15-second video remains', () => {
  const videos = [];
  for (const slug of projects) {
    const html = fs.readFileSync(path.join('public', 'projects', slug, 'index.html'), 'utf8');
    for (const match of html.matchAll(/<video[^>]+src=["']([^"']+)["']/gi)) videos.push(`${slug}:${match[1]}`);
  }
  assert.deepEqual(videos, ['flow:showcase/flow-demo-15s.mp4']);
  assert.equal(fs.existsSync('public/projects/flow/showcase/flow-demo-15s.mp4'), true);
});
```

- [ ] **Step 2: Run the import test and verify failure**

Run from `portfolio-site`: `node --test tests/import.test.cjs`  
Expected: FAIL because the project folders do not exist.

- [ ] **Step 3: Implement deterministic asset import**

`scripts/import-projects.cjs` must use these canonical sources:

```javascript
const sources = {
  soundscape: 'C:/Users/anyuxin/WorkBuddy/2026-09-29-13-24-39/portfolio_site',
  renew: 'C:/Users/anyuxin/Documents/ChatGPT/UI作品集（互联网方向）/Renew作品集',
  flow: 'C:/Users/anyuxin/Documents/ChatGPT/UI作品集（互联网方向）/Flow作品集-CalmBento',
  lumen: 'C:/Users/anyuxin/Documents/ChatGPT/UI作品集（互联网方向）/Lumen作品集',
  lightmap: 'C:/Users/anyuxin/WorkBuddy/2026-09-29-13-24-39/portfolio_lm'
};
```

The script must:

- Delete and recreate only `public/projects/<slug>/`.
- Skip `.git`, `.pw-browsers`, `node_modules`, `src`, `lib`, `scripts`, `tests`, `package.json`, `render.js`, `使用说明.md`, and cache folders.
- Skip all `.mp4` files except `flow/showcase/flow-demo-15s.mp4`.
- Skip `flow/showcase/flow-demo.mp4`, `flow/showcase/flow-showcase.mp4`, `flow/showcase/demo-audio.wav`, and `flow/showcase/demo-15s-audio.wav`.
- Copy all remaining referenced media and page files.
- Copy covers from the canonical preview or hero files to `assets/covers/<slug>.png`.

- [ ] **Step 4: Patch project media and navigation**

Apply these exact transformations after copy:

- Flow: remove the complete `<section id="kv">...</section>` block containing the 38-second video and GIF motion samples.
- Flow: keep the `<section id="short">...</section>` block and change its caption to say `15 秒精华版 · 唯一保留的动态演示`.
- Lumen: remove both `<div class="motion-card">...</div>` blocks in `.motion-lab`.
- Lightmap: remove `.videobox`, remove `#vplayer`, and remove the link to `demo.html`.
- Soundscape: rewrite all saved-web absolute navigation links to `#overview`, `#screens`, `#thinking`, `#process`, and `#highlights`.
- Renew: preserve same-page hash navigation.
- All projects: inject before `</head>`:

```html
<link rel="stylesheet" href="../../assets/global/project-shell.css">
```

- All projects: inject before `</body>`:

```html
<script src="../../assets/js/project-shell.js" defer></script>
```

- All projects: inject `<body data-project="<slug>" data-project-title="<title>" data-next-href="<next route>">` by replacing the existing `<body>` opening tag.

- [ ] **Step 5: Add the shared project dock**

`assets/global/project-shell.css`:

```css
.project-dock { position: fixed; left: 50%; bottom: 18px; transform: translateX(-50%); z-index: 999; display: flex; align-items: center; gap: 10px; padding: 7px; border: 1px solid rgba(255,255,255,.18); border-radius: 999px; background: rgba(20,20,20,.82); color: #fff; box-shadow: 0 14px 40px rgba(0,0,0,.22); backdrop-filter: blur(18px); font: 12px/1 -apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",sans-serif; }
.project-dock a, .project-dock span { padding: 9px 13px; border-radius: 999px; white-space: nowrap; }
.project-dock a:hover { background: rgba(255,255,255,.14); }
.project-dock .current { max-width: 210px; overflow: hidden; text-overflow: ellipsis; color: rgba(255,255,255,.62); }
@media (max-width: 620px) { .project-dock { bottom: 10px; max-width: calc(100% - 20px); } .project-dock .current { display: none; } }
```

`assets/js/project-shell.js`:

```javascript
(() => {
  const body = document.body;
  const slug = body.dataset.project;
  if (!slug) return;
  const dock = document.createElement('nav');
  dock.className = 'project-dock';
  dock.setAttribute('aria-label', '作品集项目导航');
  dock.innerHTML = `<a href="../../work/">全部项目</a><span class="current">${body.dataset.projectTitle}</span><a href="${body.dataset.nextHref}">下一个项目</a>`;
  body.appendChild(dock);
})();
```

- [ ] **Step 6: Run the import test and verify success**

Run from `portfolio-site`:

```powershell
node scripts/import-projects.cjs
node --test tests/import.test.cjs
```

Expected: PASS, with exactly one video source: `flow:showcase/flow-demo-15s.mp4`.

- [ ] **Step 7: Commit imported projects**

```powershell
git add -- portfolio-site/scripts/import-projects.cjs portfolio-site/assets/global/project-shell.css portfolio-site/assets/js/project-shell.js portfolio-site/tests/import.test.cjs portfolio-site/public/projects
git commit -m "feat: unify five portfolio project pages"
```

---

### Task 4: Build Homepage And Work Index

**Files:**
- Create: `portfolio-site/index.html`
- Create: `portfolio-site/work/index.html`
- Create: `portfolio-site/assets/css/pages.css`
- Create: `portfolio-site/assets/js/home.js`
- Create: `portfolio-site/assets/js/work.js`

**Interfaces:**
- Consumes: `window.PORTFOLIO.projects` from `assets/js/project-data.js`.
- Produces: homepage project cards and filterable Work index.

- [ ] **Step 1: Add homepage markup**

Homepage sections must be `Identity`, `Project Index`, `Capability Evidence`, `AIGC Method Preview`, and `About And Contact`. The page must include these exact top-level actions:

```html
<a href="./resume/">Download Resume</a>
<a href="mailto:18939807980@163.com">18939807980@163.com</a>
<a href="./work/">Explore Five Projects</a>
```

The project grid uses `<div data-project-grid></div>`. The AIGC preview links to `./aigc-process/`. The design decision link goes to `./thinking/`.

- [ ] **Step 2: Add project card rendering**

`assets/js/home.js`:

```javascript
(() => {
  const grid = document.querySelector('[data-project-grid]');
  if (!grid || !window.PORTFOLIO) return;
  grid.innerHTML = window.PORTFOLIO.projects.map((project, index) => `
    <article class="project-card" style="--accent:${project.accent}">
      <a href="../${project.projectPath.replace('public/', '')}">
        <div class="project-card__no">${String(index + 1).padStart(2, '0')}</div>
        <img src="./${project.cover}" alt="${project.title} 项目封面">
        <div class="project-card__body">
          <p>${project.domain}</p>
          <h3>${project.title}</h3>
          <p>${project.thesis}</p>
          <dl><dt>Role</dt><dd>${project.role}</dd><dt>Duration</dt><dd>${project.duration}</dd></dl>
        </div>
      </a>
    </article>
  `).join('');
})();
```

- [ ] **Step 3: Add Work filtering**

`assets/js/work.js`:

```javascript
(() => {
  const grid = document.querySelector('[data-project-grid]');
  const buttons = [...document.querySelectorAll('[data-filter]')];
  const projects = window.PORTFOLIO?.projects || [];
  const render = filter => {
    const visible = filter === 'all' ? projects : projects.filter(project => project.capabilities.includes(filter));
    grid.innerHTML = visible.map(project => `<a class="work-row" href="../${project.projectPath.replace('public/', '')}"><img src="../${project.cover}" alt="${project.title} 项目封面"><span>${project.domain}</span><strong>${project.title}</strong><small>${project.thesis}</small></a>`).join('');
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === filter)));
  };
  buttons.forEach(button => button.addEventListener('click', () => render(button.dataset.filter)));
  render('all');
})();
```

- [ ] **Step 4: Add page layout and responsive rules**

`assets/css/pages.css` must define project-card image ratio `4 / 3`, card spacing, Work row layout, mobile single-column layout, 44px minimum tap targets, and `prefers-reduced-motion` handling. The images must use `aspect-ratio` and `object-fit: cover`.

- [ ] **Step 5: Validate structure**

Run from `portfolio-site`:

```powershell
node --test tests/content.test.cjs
rg -n "data-project-grid|aigc-process|thinking|Download Resume" index.html work/index.html
```

Expected: content tests PASS and all required markers are present.

- [ ] **Step 6: Commit homepage and Work index**

```powershell
git add -- portfolio-site/index.html portfolio-site/work/index.html portfolio-site/assets/css/pages.css portfolio-site/assets/js/home.js portfolio-site/assets/js/work.js
git commit -m "feat: add portfolio homepage and work index"
```

---

### Task 5: Build Thinking And AIGC Process Pages

**Files:**
- Create: `portfolio-site/thinking/index.html`
- Create: `portfolio-site/aigc-process/index.html`
- Create: `portfolio-site/assets/js/thinking.js`

**Interfaces:**
- Consumes: `window.PORTFOLIO.decisions`.
- Produces: five decision records and the approved eight-stage AIGC workflow.

- [ ] **Step 1: Add the thinking page**

The page must render one card per project with fields `Problem`, `Tension`, `Decision`, `Rejected`, `Rationale`, and `Unresolved`. `assets/js/thinking.js` maps decisions into `<article class="decision-card">` elements. Each card must link to its project page.

- [ ] **Step 2: Add the AIGC process page**

The page must contain this exact ordered workflow:

```text
01 问题定义
02 资料整理
03 AI 辅助发散
04 人工筛选
05 Prompt 迭代
06 视觉与语义一致性
07 可用性与质量检查
08 人工最终决策
```

The page must also contain the projects `Badcase 博物馆`, `Homestyler AIGC 工作流`, `Lumen`, `Renew`, and `LIGHTMAP`.

- [ ] **Step 3: Add the evidence statements**

Use these exact core statements:

```text
不展示用了多少 AI，而是展示如何让 AI 结果变得可用、可信、可复用。
AI 负责识别，用户负责确认。
AIGC 辅助视觉，人工统一光源、构图与叙事。
以 Prompt Diff、收敛轮次和根因分析建立可复用出图方法。
用 SOP、Token 成本和准确率划定 AI 与人工的边界。
```

- [ ] **Step 4: Validate and commit**

Run from `portfolio-site`:

```powershell
rg -n "问题定义|AI 辅助发散|人工最终决策|Badcase|Homestyler" thinking/index.html aigc-process/index.html
```

Expected: all required headings and evidence strings appear.

```powershell
git add -- portfolio-site/thinking portfolio-site/aigc-process portfolio-site/assets/js/thinking.js
git commit -m "feat: add design decision and AIGC process pages"
```

---

### Task 6: Build About, Resume, And Contact Pages

**Files:**
- Create: `portfolio-site/about/index.html`
- Create: `portfolio-site/resume/index.html`
- Create: `portfolio-site/contact/index.html`
- Create: `portfolio-site/public/安雨鑫-UIUX-Product-简历.pdf`

**Interfaces:**
- Consumes: `content/profile.json` and the approved source resume.
- Produces: factual About content, Resume download page, and contact actions.

- [ ] **Step 1: Build About content**

About must include:

- 上海理工大学产品设计专业
- GPA 3.6，专业排名前 10%
- Homestyler 3D 数字资产运营（AIGC 向）
- Badcase 博物馆
- 学术可视化、迪卡侬 CMF、UI/UX、3D、摄影修图
- Working style: 先定义问题，再建立结构，最后统一视觉与交互

Do not add unsupported employment dates, awards, or job titles.

- [ ] **Step 2: Build Resume page**

The page must present a one-page visual summary and link to `../public/安雨鑫-UIUX-Product-简历.pdf`. The PDF copy must preserve the source resume facts and be visually redesigned before final delivery. The page must not inline the raw dense PDF text.

- [ ] **Step 3: Build Contact page**

The page includes:

```text
Email: 18939807980@163.com
Role: UI / UX / Product Designer
Specialty: AIGC-oriented product and interface design
Availability: Open to full-time and internship opportunities
```

- [ ] **Step 4: Validate and commit**

Run from `portfolio-site`:

```powershell
rg -n "上海理工大学|GPA 3.6|Homestyler|Badcase|18939807980@163.com" about/index.html resume/index.html contact/index.html
```

Expected: all facts appear in the appropriate page and no unsupported claim appears.

```powershell
git add -- portfolio-site/about portfolio-site/resume portfolio-site/contact portfolio-site/public
git commit -m "feat: add profile resume and contact pages"
```

---

### Task 7: Implement Full-Site Validation And Visual QA

**Files:**
- Create: `portfolio-site/scripts/validate-site.cjs`
- Create: `portfolio-site/scripts/visual-check.cjs`
- Create: `portfolio-site/qa/`
- Modify: `portfolio-site/package.json`

**Interfaces:**
- Consumes: final static site.
- Produces: machine-readable validation failures and desktop/mobile screenshots.

- [ ] **Step 1: Implement structural validation**

`scripts/validate-site.cjs` must fail when:

- A required route is missing.
- Any local `href` or `src` resolves to a missing file or directory.
- Any `file:///` URL appears.
- Any remote `http://` or `https://` resource is referenced by the site.
- Any `<img>` has missing or empty `alt`.
- More than one `<video>` source exists across all pages.
- The only video source is not `showcase/flow-demo-15s.mp4`.

- [ ] **Step 2: Implement responsive visual checks**

`scripts/visual-check.cjs` must use:

```javascript
const { chromium } = require('C:/Users/anyuxin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const executablePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
```

It must start the local server through `node scripts/serve.cjs`, visit `/`, `/work/`, `/thinking/`, `/aigc-process/`, `/about/`, `/resume/`, `/contact/`, and all five project routes at `1440 x 900` and `390 x 844`, then fail on:

- Horizontal overflow
- Failed page load
- Broken image with `naturalWidth === 0`
- Missing injected project dock on project routes
- Console errors

It writes screenshots to `qa/<route>-<viewport>.png`.

- [ ] **Step 3: Add scripts**

Update `package.json` scripts:

```json
{
  "test": "node --test",
  "validate": "node scripts/validate-site.cjs",
  "visual": "node scripts/visual-check.cjs",
  "check": "npm run test && npm run validate && npm run visual"
}
```

- [ ] **Step 4: Run all checks**

Run from `portfolio-site`:

```powershell
npm test
npm run import
npm run validate
npm run visual
```

Expected:

- All tests PASS.
- Structural validation reports zero errors.
- Visual check reports zero overflow and zero console errors.
- Only Flow's 15-second video appears.

- [ ] **Step 5: Commit validation**

```powershell
git add -- portfolio-site/package.json portfolio-site/scripts/validate-site.cjs portfolio-site/scripts/visual-check.cjs portfolio-site/qa
git commit -m "test: validate portfolio structure and responsive layouts"
```

---

### Task 8: Deployment Preparation And Final Website Handoff

**Files:**
- Create: `portfolio-site/README.md`
- Create: `portfolio-site/public/robots.txt`
- Create: `portfolio-site/public/sitemap.xml`
- Create: `portfolio-site/vercel.json` only if deploying to Vercel

**Interfaces:**
- Consumes: validated static site.
- Produces: deployment-ready documentation and host configuration.

- [ ] **Step 1: Add deployment documentation**

`README.md` must document:

- Local preview: `npm run serve`
- Full check: `npm run check`
- Deploy root: `portfolio-site/`
- Supported hosts: GitHub Pages, Cloudflare Pages, Vercel static hosting
- PDF path: `public/安雨鑫-UIUX-Product-简历.pdf`
- Project route list
- Media rule: Flow 15-second demo is the only video

- [ ] **Step 2: Add crawler files**

`public/robots.txt`:

```text
User-agent: *
Allow: /
```

`sitemap.xml` must list `/`, `/work/`, `/thinking/`, `/aigc-process/`, `/about/`, `/resume/`, `/contact/`, and the five project routes.

- [ ] **Step 3: Run final validation from a clean process**

Run from `portfolio-site`:

```powershell
npm run check
```

Expected: all content tests, structural validation, and responsive visual checks PASS.

- [ ] **Step 4: Inspect representative screenshots**

Open and inspect:

```text
qa/home-1440.png
qa/home-390.png
qa/soundscape-1440.png
qa/renew-1440.png
qa/lightmap-1440.png
qa/lumen-1440.png
qa/flow-1440.png
```

Confirm no overlap, clipped text, blank page, broken media, or project-dock obstruction.

- [ ] **Step 5: Commit deployment preparation**

```powershell
git add -- portfolio-site/README.md portfolio-site/public/robots.txt portfolio-site/public/sitemap.xml
git commit -m "docs: prepare portfolio website for deployment"
```

---

## Final Website Acceptance

- Homepage loads without an external network dependency.
- Work index lists five projects in the approved order.
- Thinking page displays five decision records.
- AIGC page displays all eight stages and required evidence.
- Five project pages load with their distinctive visual systems.
- Only Flow's `showcase/flow-demo-15s.mp4` remains.
- Project pages contain a consistent dock for Work and next-project navigation.
- All routes work at 1440 x 900 and 390 x 844.
- No horizontal overflow, broken images, remote assets, or console errors.
- The site can be deployed by serving `portfolio-site/` as a static root.



