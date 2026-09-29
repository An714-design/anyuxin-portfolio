const test = require('node:test');
const assert = require('node:assert/strict');
const { motionAssets } = require('../lib/motion');

test('contains the three approved visual assets', () => {
  assert.deepEqual(motionAssets.map((item) => item.id), [
    'key-visual',
    'breath',
    'night-bus'
  ]);
  assert.match(motionAssets[0].html, /Lumen/);
  assert.match(motionAssets[1].html, /4s/);
  assert.match(motionAssets[2].html, /夜行公交/);
});