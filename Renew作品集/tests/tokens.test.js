const test = require('node:test');
const assert = require('node:assert/strict');
const tokens = require('../lib/tokens');

test('uses the approved Renew visual tokens', () => {
  assert.equal(tokens.colors.paper, '#F4F0E8');
  assert.equal(tokens.colors.ink, '#151515');
  assert.equal(tokens.colors.signal, '#FF5A36');
  assert.equal(tokens.colors.acid, '#C8F45A');
  assert.equal(tokens.colors.warning, '#F3B544');
  assert.equal(tokens.colors.muted, '#8B877E');
  assert.equal(tokens.colors.surface, '#FFFDF8');
  assert.deepEqual(tokens.screens, { width: 390, height: 844, scale: 2 });
  assert.deepEqual(tokens.diagrams, { width: 1240, height: 760, scale: 1 });
  assert.equal(tokens.radius.card, 18);
  assert.equal(tokens.radius.control, 12);
  assert.equal(tokens.radius.pill, 999);
});
