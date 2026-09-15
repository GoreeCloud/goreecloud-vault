import assert from 'node:assert/strict';
import test from 'node:test';
import { generatePassword } from '../src/password-generator.js';

const cryptoImpl = globalThis.crypto;

test('generator produces the requested length and each enabled class', () => {
  const password = generatePassword({ length: 32, excludeAmbiguous: false }, cryptoImpl);
  assert.equal(password.length, 32);
  assert.match(password, /[a-z]/);
  assert.match(password, /[A-Z]/);
  assert.match(password, /[0-9]/);
  assert.match(password, /[!@#$%^&*()\-_=+\[\]{}:,.?]/);
});

test('generator excludes ambiguous characters by default', () => {
  for (let index = 0; index < 50; index += 1) {
    assert.doesNotMatch(generatePassword({ length: 64 }, cryptoImpl), /[0O1Il|]/);
  }
});

test('generator rejects unsafe lengths and empty character selections', () => {
  assert.throws(() => generatePassword({ length: 11 }, cryptoImpl), /between 12 and 128/);
  assert.throws(() => generatePassword({
    length: 24,
    lowercase: false,
    uppercase: false,
    digits: false,
    symbols: false,
  }, cryptoImpl), /At least one character class/);
});
