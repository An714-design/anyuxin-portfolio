const test = require('node:test');
const assert = require('node:assert/strict');
const render = require('../render');

test('exports the three asset render phases', () => {
  assert.equal(typeof render.renderScreens, 'function');
  assert.equal(typeof render.renderDiagrams, 'function');
  assert.equal(typeof render.renderMotionAssets, 'function');
  assert.equal(typeof render.main, 'function');
});
