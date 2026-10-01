const test = require('node:test');
const assert = require('node:assert/strict');
const pages = require('../src/pages/aigc-close.cjs');

test('AIGC evidence and closing pages are complete', () => {
  assert.equal(pages.length, 3);
  const html = pages.join('');
  assert.match(html, /Badcase 博物馆/);
  assert.match(html, /Homestyler/);
  assert.match(html, /18939807980@163.com/);
});
