const test = require('node:test');
const assert = require('node:assert/strict');
const { screens } = require('../lib/screens');

test('contains the ten approved Renew screens in order', () => {
  assert.deepEqual(screens.map((screen) => screen.id), [
    '01-onboarding',
    '02-import-center',
    '03-detection-queue',
    '04-confirmation-editor',
    '05-renewal-radar',
    '06-renewal-calendar',
    '07-subscription-detail',
    '08-cancel-assistant',
    '09-savings-report',
    '10-privacy-settings'
  ]);
  assert.match(screens[0].html, /把偷偷续费/);
  assert.match(screens[4].html, /未来 30 天/);
  assert.match(screens[7].html, /取消前检查/);
  assert.match(screens[8].html, /预计节省/);
  assert.match(screens[9].html, /不保存完整邮件/);
});

