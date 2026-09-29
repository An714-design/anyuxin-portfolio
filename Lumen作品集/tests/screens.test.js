const test = require('node:test');
const assert = require('node:assert/strict');
const { screens } = require('../lib/screens');

test('contains twelve ordered screens with approved content', () => {
  const ids = screens.map((screen) => screen.id);
  assert.equal(ids.length, 12);
  assert.equal(ids[0], '01-onboarding');
  assert.equal(ids[11], '12-memory-privacy');
  assert.match(screens.find((screen) => screen.id === '02-home').html, /今晚这一页/);
  assert.match(screens.find((screen) => screen.id === '03-checkin').html, /脑子很吵/);
  assert.match(screens.find((screen) => screen.id === '04-listener').html, /把最吵的一句话放在这里/);
  assert.match(screens.find((screen) => screen.id === '12-memory-privacy').html, /默认不保存具体对话/);
});