const test = require('node:test');
const assert = require('node:assert/strict');
const pages = require('../src/pages/lightmap.cjs');

test('LIGHTMAP has four pages and the number chain', () => {
  assert.equal(pages.length, 4);
  assert.match(pages.join(''), /编号 03/);
  assert.match(pages.join(''), /发现.*侦察.*抵达.*拍摄.*上传.*复盘/s);
});
