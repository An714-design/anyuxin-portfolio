const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { captureHtml } = require('../lib/capture');

test('captureHtml writes a non-empty screenshot', async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'renew-capture-'));
  const output = path.join(dir, 'smoke.png');
  await captureHtml({
    html: '<body style="margin:0;background:#151515;color:#C8F45A"><h1>Renew</h1></body>',
    output,
    width: 390,
    height: 844,
    scale: 1
  });
  assert.equal(fs.existsSync(output), true);
  assert.ok(fs.statSync(output).size > 1000);
});