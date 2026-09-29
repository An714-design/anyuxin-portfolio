const test = require('node:test');
const assert = require('node:assert/strict');
const { localTargets } = require('../scripts/validate');

test('localTargets returns local targets and rejects remote URLs', () => {
  assert.deepEqual(localTargets('<a href="screens/01-onboarding.png">x</a><a href="#trust">y</a>'), [
    'screens/01-onboarding.png'
  ]);
  assert.throws(
    () => localTargets('<img src="https://example.com/a.png" alt="remote">'),
    /remote URL is not allowed/
  );
});
