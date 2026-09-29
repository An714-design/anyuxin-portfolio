const test = require('node:test');
const assert = require('node:assert/strict');
const { diagrams } = require('../lib/diagrams');

test('contains the five approved diagrams', () => {
  assert.deepEqual(diagrams.map((item) => item.id), [
    'empathy-map',
    'weekly-journey',
    'ai-system',
    'memory-flow',
    'core-flow'
  ]);
  assert.match(diagrams[2].html, /Curator/);
  assert.match(diagrams[3].html, /默认不保存具体对话/);
});