const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

test('PDF foundation files exist', () => {
  assert.equal(fs.existsSync('src/styles.css'), true);
  assert.equal(fs.existsSync('scripts/prepare-images.py'), true);
  assert.equal(fs.existsSync('scripts/validate-pdf.py'), true);
});
