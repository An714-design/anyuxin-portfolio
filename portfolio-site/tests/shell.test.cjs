const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

test('global tokens and shell files exist', () => {
  assert.equal(fs.existsSync('assets/css/tokens.css'), true);
  assert.equal(fs.existsSync('assets/css/shell.css'), true);
  assert.equal(fs.existsSync('assets/js/site-shell.js'), true);
});

test('navigation links use explicit index.html files for file mode', () => {
  const shell = fs.readFileSync('assets/js/site-shell.js', 'utf8');
  const home = fs.readFileSync('index.html', 'utf8');
  assert.match(shell, /index\.html/);
  for (const href of ['./work/index.html', './thinking/index.html', './aigc-process/index.html', './resume/index.html']) {
    assert.equal(home.includes(href), true, `home missing ${href}`);
  }
});


test('project navigation is compact and consistent', () => {
  const shellCss = fs.readFileSync('assets/global/project-shell.css', 'utf8');
  assert.match(shellCss, /width:\s*30px/);
  assert.match(shellCss, /height:\s*30px/);
  assert.match(shellCss, /svg/);
  for (const slug of ['soundscape', 'renew', 'lightmap', 'lumen', 'flow']) {
    const html = fs.readFileSync(`projects/${slug}/index.html`, 'utf8');
    assert.match(html, /data-prev-href="\.\.\/[^"]+\/index\.html"/);
    assert.match(html, /data-next-href="\.\.\/[^"]+\/index\.html"/);
  }
});

