const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const projects = ['soundscape', 'renew', 'lightmap', 'lumen', 'flow'];

test('all project indexes exist', () => {
  for (const slug of projects) assert.equal(fs.existsSync(path.join('projects', slug, 'index.html')), true);
});

test('only the Flow 15-second video remains', () => {
  const videos = [];
  for (const slug of projects) {
    const html = fs.readFileSync(path.join('projects', slug, 'index.html'), 'utf8');
    for (const match of html.matchAll(/<video[^>]+src=["']([^"']+)["']/gi)) videos.push(`${slug}:${match[1]}`);
  }
  assert.deepEqual(videos, ['flow:showcase/flow-demo-15s.mp4']);
  assert.equal(fs.existsSync('projects/flow/showcase/flow-demo-15s.mp4'), true);
});
