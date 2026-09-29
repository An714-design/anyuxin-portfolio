const test = require('node:test');
const assert = require('node:assert/strict');
const { motionAssets } = require('../lib/motion');

test('contains the three approved Renew visual assets', () => {
  assert.deepEqual(motionAssets.map((item) => item.id), [
    'key-visual',
    'radar-orbit',
    'scan-detect'
  ]);
  assert.match(motionAssets[0].html, /Renew/);
  assert.match(motionAssets[1].html, /续费雷达/);
  assert.match(motionAssets[2].html, /低置信度/);
  assert.match(motionAssets[2].html, /prefers-reduced-motion/);
});
