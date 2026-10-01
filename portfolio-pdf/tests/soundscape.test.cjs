const test = require('node:test');
const assert = require('node:assert/strict');
const pages = require('../src/pages/soundscape.cjs');

test('Soundscape has four pages', () => {
  assert.equal(pages.length, 4);
  assert.match(pages[0], /空间音频/);
  assert.match(pages[2], /沉浸|界面|系统/);
});
