import assert from 'node:assert/strict';
import test from 'node:test';
import { extensionCapabilities } from '../src/capabilities.js';

test('pre-alpha extension remains fail-closed for Vault credential access', () => {
  assert.equal(extensionCapabilities.credentialAuthority, 'goreecloud-vault');
  assert.equal(extensionCapabilities.capabilities.passwordGenerator, true);
  assert.equal(extensionCapabilities.capabilities.generatedPasswordFill, true);
  assert.equal(extensionCapabilities.capabilities.credentialQuery, false);
  assert.equal(extensionCapabilities.capabilities.credentialFill, false);
  assert.equal(extensionCapabilities.capabilities.credentialSaveOrUpdate, false);
  assert.equal(extensionCapabilities.capabilities.passkeys, false);
  assert.equal(extensionCapabilities.capabilities.totp, false);
});
