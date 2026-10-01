const test = require('node:test');
const assert = require('node:assert/strict');
const pages = require('../src/pages/lumen.cjs');

test('Lumen shows research, AI boundaries, and interface system', () => {
  assert.equal(pages.length, 4);
  const html = pages.join('');
  assert.match(html, /夜猫族|控制感/);
  assert.match(html, /Curator|Listener|Dreamweaver/);
  assert.match(html, /低刺激|可退出|记忆/);
});
