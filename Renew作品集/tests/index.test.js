const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

test('portfolio prioritizes product logic, UI, trust, and visual system', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  const ordered = ['hero', 'thesis', 'screens', 'detection', 'radar', 'cancellation', 'trust', 'system', 'metrics', 'quality'];
  for (const id of ordered) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
  const positions = ordered.map((id) => html.indexOf(`id="${id}"`));
  assert.deepEqual(positions, [...positions].sort((a, b) => a - b));
  assert.match(html, /续费侦探 Renew/);
  assert.match(html, /AI 负责识别，用户负责确认/);
  assert.match(html, /所有订阅、金额和日期均为模拟数据/);
  assert.doesNotMatch(html, /https?:\/\//);
});
