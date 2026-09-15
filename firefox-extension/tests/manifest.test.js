import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const manifest = JSON.parse(await readFile(new URL('../manifest.json', import.meta.url), 'utf8'));

test('manifest is Firefox MV3 with explicit signing and data-collection metadata', () => {
  assert.equal(manifest.manifest_version, 3);
  assert.equal(manifest.browser_specific_settings.gecko.id, 'vault-firefox@goreecloud.com');
  assert.equal(manifest.browser_specific_settings.gecko.strict_min_version, '128.0');
  assert.deepEqual(manifest.browser_specific_settings.gecko.data_collection_permissions.required, ['none']);
});

test('manifest requests no install-time host access', () => {
  assert.equal('host_permissions' in manifest, false);
  assert.equal('content_scripts' in manifest, false);
  assert.deepEqual(manifest.permissions.sort(), ['activeTab', 'scripting'].sort());
  assert.deepEqual(manifest.optional_host_permissions, ['http://*/*', 'https://*/*']);
});

test('manifest uses a module background script and local popup', () => {
  assert.deepEqual(manifest.background.scripts, ['src/background.js']);
  assert.equal(manifest.background.type, 'module');
  assert.equal(manifest.action.default_popup, 'popup/popup.html');
});
