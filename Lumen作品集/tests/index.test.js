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