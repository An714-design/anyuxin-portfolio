const test = require('node:test');
const assert = require('node:assert/strict');
const { screens } = require('../lib/screens');

test('contains the seven approved detection and radar screens in order', () => {
  assert.deepEqual(screens.map((screen) => screen.id), [
    '01-onboarding',
    '02-import-center',
    '03-detection-queue',
    '04-confirmation-editor',
    '05-renewal-radar',
    '06-renewal-calendar',
    '07-subscription-detail'
  ]);
  assert.match(screens[0].html, /把偷偷续费/);
  assert.match(screens[2].html, /需要确认 2 个字段/);
  assert.match(screens[4].html, /未来 7 天/);
  assert.match(screens[5].html, /续费日历/);
  assert.match(screens[6].html, /价格变化/);
});
