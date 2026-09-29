const test = require('node:test');
const assert = require('node:assert/strict');
const { diagrams } = require('../lib/diagrams');

test('contains the five approved Renew diagrams', () => {
  assert.deepEqual(diagrams.map((item) => item.id), [
    'detection-flow',
    'information-architecture',
    'risk-model',
    'cancellation-flow',
    'trust-boundary'
  ]);
  assert.match(diagrams[0].html, /导入线索/);
  assert.match(diagrams[1].html, /首页/);
  assert.match(diagrams[2].html, /高风险/);
  assert.match(diagrams[3].html, /保存凭证/);
  assert.match(diagrams[4].html, /不接入银行卡密码/);
});
