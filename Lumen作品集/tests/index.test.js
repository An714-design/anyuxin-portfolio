const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

test('portfolio prioritizes UI, UX, dream experience, then condensed research', () => {
  const file = path.join(__dirname, '..', 'index.html');
  const html = fs.readFileSync(file, 'utf8');
  for (const id of ['hero', 'screens', 'journey', 'core-flow', 'ai-system', 'voice-memory', 'dream-bus', 'persona', 'visual-system', 'aigc', 'quality']) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
  const ordered = ['hero', 'screens', 'journey', 'core-flow', 'ai-system', 'voice-memory', 'dream-bus', 'persona', 'visual-system', 'aigc', 'quality'];
  const positions = ordered.map((id) => html.indexOf(`id="${id}"`));
  assert.deepEqual(positions, [...positions].sort((a, b) => a - b));
  const persona = html.slice(html.indexOf('id="persona"'), html.indexOf('id="visual-system"'));
  assert.ok(persona.length < 2600, 'user research section must stay condensed');
  assert.doesNotMatch(html, /id="opportunity"/);
  assert.doesNotMatch(html, /https?:\/\//);
  assert.match(html, /光合 Lumen/);
  assert.match(html, /默认陪伴，主动造梦/);
});