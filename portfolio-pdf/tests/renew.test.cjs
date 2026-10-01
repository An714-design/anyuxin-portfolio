const test = require('node:test');
const assert = require('node:assert/strict');
const pages = require('../src/pages/renew.cjs');

test('Renew has four complete pages', () => {
  assert.equal(pages.length, 4);
  assert.match(pages.join(''), /AI 负责识别，用户负责确认/);
  assert.match(pages.join(''), /不自动取消/);
  assert.match(pages.join(''), /有效续费决策/);
});
