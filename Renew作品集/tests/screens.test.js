const test = require('node:test');
const assert = require('node:assert/strict');
const { screens } = require('../lib/screens');

test('contains the four approved detection screens in order', () => {
  assert.deepEqual(screens.map((screen) => screen.id), [
    '01-onboarding',
    '02-import-center',
    '03-detection-queue',
    '04-confirmation-editor'
  ]);
  assert.match(screens[0].html, /把偷偷续费/);
  assert.match(screens[0].html, /不接入银行卡密码/);
  assert.match(screens[1].html, /导入一条线索/);
  assert.match(screens[2].html, /需要确认 2 个字段/);
  assert.match(screens[3].html, /加入续费雷达/);
});
