const fs = require('node:fs');
const path = require('node:path');
const { renderBook } = require('../src/book.cjs');

const root = path.resolve(__dirname, '..');
fs.mkdirSync(path.join(root, 'dist'), { recursive: true });
fs.writeFileSync(path.join(root, 'dist', 'casebook.html'), renderBook(), 'utf8');
