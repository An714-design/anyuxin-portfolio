const test = require('node:test');
const assert = require('node:assert/strict');
const { page, image, grid } = require('../src/components.cjs');

test('page creates fixed PDF page markup', () => {
  const html = page({ number: 1, accent: '#151515', body: '<h1>Test</h1>' });
  assert.match(html, /class="page"/);
  assert.match(html, /page__content/);
  assert.match(html, /page__number">1</);
});

test('image requires alt text', () => {
  assert.throws(() => image('a.jpg', ''));
  assert.match(image('a.jpg', '项目封面'), /alt="项目封面"/);
});
