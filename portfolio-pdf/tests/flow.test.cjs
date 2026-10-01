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
