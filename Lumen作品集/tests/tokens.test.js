const test = require('node:test');
const assert = require('node:assert/strict');
const tokens = require('../lib/tokens');

test('uses the approved Lumen visual tokens', () => {
  assert.equal(tokens.colors.paper, '#F7F1E8');
  assert.equal(tokens.colors.ink, '#121319');
  assert.equal(tokens.colors.night, '#202B46');
  assert.equal(tokens.colors.amber, '#D8A15E');
  assert.equal(tokens.colors.dusk, '#7B6C9D');
  assert.equal(tokens.colors.moon, '#ECE2C6');
  assert.equal(tokens.colors.sprout, '#A8C8A0');
  assert.deepEqual(tokens.screens, { width: 390, height: 844, scale: 2 });
});