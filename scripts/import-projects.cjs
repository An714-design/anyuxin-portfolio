const fs = require('node:fs');
const path = require('node:path');

const siteRoot = path.resolve(__dirname, '..');
const projectsRoot = path.join(siteRoot, 'projects');
const coversRoot = path.join(siteRoot, 'assets', 'covers');

const sources = {
  soundscape: 'C:/Users/anyuxin/WorkBuddy/2026-09-29-13-24-39/portfolio_site',
  renew: 'C:/Users/anyuxin/Documents/ChatGPT/UI作品集（互联网方向）/Renew作品集',
  flow: 'C:/Users/anyuxin/Documents/ChatGPT/UI作品集（互联网方向）/Flow作品集-CalmBento',
  lumen: 'C:/Users/anyuxin/Documents/ChatGPT/UI作品集（互联网方向）/Lumen作品集',
  lightmap: 'C:/Users/anyuxin/WorkBuddy/2026-09-29-13-24-39/portfolio_lm'
};

const covers = {
  soundscape: 'images/4_384.png',
  renew: 'preview-hero.png',
  flow: 'preview-hero.png',
  lumen: 'preview-hero.png',
  lightmap: 'images/2_1.png'
};

const titles = {
  soundscape: '声场 Soundscape',
  renew: '续费侦探 Renew',
  flow: 'Flow 流',
  lumen: '光合 Lumen',
  lightmap: '拾光 LIGHTMAP'
};

const next = {
  soundscape: '../renew/',
  renew: '../lightmap/',
  lightmap: '../lumen/',
  lumen: '../flow/',
  flow: '../soundscape/'
};

const skippedDirs = new Set(['.git', '.pw-browsers', 'node_modules', 'src', 'lib', 'scripts', 'tests']);

function shouldCopy(sourceRoot, source) {
  const rel = path.relative(sourceRoot, source).replaceAll('\\', '/');
  if (!rel) return true;
  const first = rel.split('/')[0];
  if (skippedDirs.has(first)) return false;
  if (rel === 'package.json' || rel === 'render.js' || rel === '使用说明.md') return false;
  if (rel.endsWith('.html') && rel !== 'index.html') return false;
  if (/\.(wav|mp3)$/i.test(rel)) return false;
  if (/\.mp4$/i.test(rel)) return rel === 'showcase/flow-demo-15s.mp4';
  if (rel.startsWith('_cache/') || rel.startsWith('.cache/') || rel.startsWith('tool-results/')) return false;
  return true;
}

function removeBalancedElement(html, startMarker, tagName) {
  const start = html.indexOf(startMarker);
  if (start === -1) throw new Error(`Missing ${startMarker}`);
  const pattern = new RegExp(`<\\/?${tagName}\\b[^>]*>`, 'gi');
  pattern.lastIndex = start;
  let match;
  let depth = 0;
  while ((match = pattern.exec(html))) {
    if (match[0].startsWith('</')) depth -= 1;
    else depth += 1;
    if (depth === 0) return html.slice(0, start) + html.slice(pattern.lastIndex);
  }
  throw new Error(`Unbalanced ${tagName} for ${startMarker}`);
}

function patchIndex(slug, file) {
  let html = fs.readFileSync(file, 'utf8');

  if (slug === 'flow') {
    html = removeBalancedElement(html, '<section id="kv"', 'section');
    html = html.replace(/文件：showcase\/flow-demo-15s\.mp4[^<\n]*/g, '文件：showcase/flow-demo-15s.mp4 · 唯一保留的动态演示');
    html = html.replace(/<h2>15 秒精华版<\/h2>/, '<h2>15 秒精华版 · 唯一保留的动态演示</h2>');
  }

  if (slug === 'lumen') {
    html = removeBalancedElement(html, '<div class="motion-lab block">', 'div');
  }

  if (slug === 'lightmap') {
    html = removeBalancedElement(html, '<div class="videobox reveal">', 'div');
    html = html.replace(/  \/\/ 演示视频：食指点击版 \/ 无光标版 切换[\s\S]*?  \}\);\n/g, '');
  }

  if (slug === 'soundscape') {
    html = html.replace(/href="file:\/\/\/[^"#]*#([^"#]+)"/g, 'href="#$1"');
    html = html.replace(/href="[^"]*index\.html#([^"#]+)"/g, 'href="#$1"');
  }

  html = html.replace(/<body([^>]*)>/i, `<body$1 data-project="${slug}" data-project-title="${titles[slug]}" data-next-href="${next[slug]}">`);
  html = html.replace(/<\/head>/i, '  <link rel="stylesheet" href="../../assets/global/project-shell.css">\n</head>');
  html = html.replace(/<\/body>/i, '  <script src="../../assets/js/project-shell.js" defer></script>\n</body>');
  fs.writeFileSync(file, html, 'utf8');
}

fs.mkdirSync(projectsRoot, { recursive: true });
fs.mkdirSync(coversRoot, { recursive: true });

for (const [slug, source] of Object.entries(sources)) {
  const destination = path.resolve(projectsRoot, slug);
  if (!destination.startsWith(projectsRoot + path.sep)) throw new Error(`Unsafe destination: ${destination}`);
  fs.rmSync(destination, { recursive: true, force: true });
  fs.cpSync(source, destination, { recursive: true, filter: src => shouldCopy(source, src) });
  patchIndex(slug, path.join(destination, 'index.html'));

  const coverSource = path.join(source, covers[slug]);
  const coverDestination = path.join(coversRoot, `${slug}.png`);
  if (!fs.existsSync(coverSource)) throw new Error(`Missing cover: ${coverSource}`);
  fs.copyFileSync(coverSource, coverDestination);
}

console.log('Imported projects:', Object.keys(sources).join(', '));
