const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

const projects = JSON.parse(fs.readFileSync('content/projects.json', 'utf8'));
const decisions = JSON.parse(fs.readFileSync('content/decisions.json', 'utf8'));

test('projects use the approved order and required fields', () => {
  assert.deepEqual(projects.map(project => project.slug), ['soundscape', 'renew', 'lightmap', 'lumen', 'flow']);
  for (const project of projects) {
    assert.ok(project.title);
    assert.ok(project.thesis);
    assert.ok(project.role);
    assert.ok(project.duration);
    assert.ok(project.domain);
    assert.ok(project.cover);
    assert.ok(project.capabilities.length >= 3);
  }
});

test('decision map has one record per project', () => {
  assert.deepEqual(decisions.map(record => record.slug), ['soundscape', 'renew', 'lightmap', 'lumen', 'flow']);
  for (const record of decisions) {
    assert.ok(record.problem);
    assert.ok(record.tension);
    assert.ok(record.decision);
    assert.ok(record.rejected);
    assert.ok(record.rationale);
    assert.ok(record.unresolved);
  }
});
