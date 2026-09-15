import assert from 'node:assert/strict';
import test from 'node:test';
import { assertProtectedFillOrigin, classifyPageUrl } from '../src/origin-policy.js';

test('HTTPS origins are eligible for protected fill', () => {
  const result = classifyPageUrl('https://accounts.example.com/login');
  assert.equal(result.supported, true);
  assert.equal(result.safeForProtectedFill, true);
  assert.equal(result.origin, 'https://accounts.example.com');
});

test('external HTTP origins are detected but blocked for protected fill', () => {
  const result = classifyPageUrl('http://example.com/login');
  assert.equal(result.supported, true);
  assert.equal(result.safeForProtectedFill, false);
  assert.equal(result.reason, 'insecure-origin');
  assert.throws(() => assertProtectedFillOrigin('http://example.com/login'), /will not fill protected material/);
});

test('HTTP loopback is permitted for local development', () => {
  assert.equal(classifyPageUrl('http://localhost:8080/login').safeForProtectedFill, true);
  assert.equal(classifyPageUrl('http://127.0.0.1:8080/login').safeForProtectedFill, true);
});

test('privileged and extension schemes are rejected', () => {
  assert.equal(classifyPageUrl('about:logins').supported, false);
  assert.equal(classifyPageUrl('moz-extension://example/popup.html').supported, false);
});
