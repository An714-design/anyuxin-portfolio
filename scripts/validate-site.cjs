const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const errors = [];
const required = [
  'index.html', 'work/index.html', 'thinking/index.html', 'aigc-process/index.html',
  'about/index.html', 'resume/index.html', 'contact/index.html',
  'projects/soundscape/index.html', 'projects/renew/index.html', 'projects/lightmap/index.html',
  'projects/lumen/index.html', 'projects/flow/index.html'
];

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return [full];
  });
}

function isExternal(value) {
  return /^(?:https?:|file:|mailto:|tel:|javascript:|data:|#)/i.test(value);
}

function resolveReference(file, value) {
  const clean = decodeURIComponent(value.split('#')[0].split('?')[0]);
  if (!clean) return null;
  if (clean.startsWith('/')) return path.join(root, clean.slice(1));
  return path.resolve(path.dirname(file), clean);
}

function checkReference(file, ref) {
  const target = resolveReference(file, ref);
  if (!target) return;
  if (fs.existsSync(target)) return;
  if (!path.extname(target) && fs.existsSync(path.join(target, 'index.html'))) return;
  errors.push(`${path.relative(root, file)} -> missing ${ref}`);
}

for (const rel of required) {
  if (!fs.existsSync(path.join(root, rel))) errors.push(`missing required route ${rel}`);
}

const allFiles = walk(root);
const htmlFiles = allFiles.filter(file => file.endsWith('.html'));
const cssFiles = allFiles.filter(file => file.endsWith('.css'));
const videoSources = [];

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  for (const match of html.matchAll(/\b(?:href|src)=["']([^"']+)["']/gi)) {
    if (isExternal(match[1])) {
      if (/^file:|^https?:/i.test(match[1])) errors.push(`${path.relative(root, file)} uses non-local URL ${match[1]}`);
      continue;
    }
    checkReference(file, match[1]);
  }
  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    const tag = match[0];
    const alt = tag.match(/\balt=["']([^"']*)["']/i);
    if (!alt || !alt[1].trim()) errors.push(`${path.relative(root, file)} image missing alt: ${tag.slice(0, 120)}`);
  }
  for (const match of html.matchAll(/<(?:video|source)\b[^>]*\bsrc=["']([^"']+)["']/gi)) {
    videoSources.push({ file: path.relative(root, file), src: match[1] });
  }
  if (/<iframe\b/i.test(html)) errors.push(`${path.relative(root, file)} still contains iframe content`);
}

for (const file of cssFiles) {
  const css = fs.readFileSync(file, 'utf8');
  for (const match of css.matchAll(/url\(["']?([^"')]+)["']?\)/gi)) {
    const ref = match[1].trim();
    if (isExternal(ref)) {
      if (/^https?:|^file:/i.test(ref)) errors.push(`${path.relative(root, file)} uses remote URL ${ref}`);
      continue;
    }
    checkReference(file, ref);
  }
}

if (videoSources.length !== 1) errors.push(`expected one video source, found ${videoSources.length}`);
for (const source of videoSources) {
  if (!source.src.endsWith('showcase/flow-demo-15s.mp4')) errors.push(`unexpected video source ${source.file}: ${source.src}`);
}

const mp4Files = allFiles.filter(file => file.toLowerCase().endsWith('.mp4'));
if (mp4Files.length !== 1) errors.push(`expected one mp4 file, found ${mp4Files.length}`);

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(JSON.stringify({
  routes: required.length,
  htmlFiles: htmlFiles.length,
  cssFiles: cssFiles.length,
  videoSources,
  mp4Files: mp4Files.map(file => path.relative(root, file))
}, null, 2));
