const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

test('global tokens and shell files exist', () => {
  assert.equal(fs.existsSync('assets/css/tokens.css'), true);
  assert.equal(fs.existsSync('assets/css/shell.css'), true);
  assert.equal(fs.existsSync('assets/js/site-shell.js'), true);
});
