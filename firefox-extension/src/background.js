import { extensionCapabilities } from './capabilities.js';
import { assertProtectedFillOrigin, classifyPageUrl } from './origin-policy.js';

const CONTENT_SCRIPT = 'src/content-script.js';

async function currentTab() {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) {
    const error = new Error('No active browser tab is available.');
    error.code = 'no-active-tab';
    throw error;
  }
  return tab;
}

async function inject(tabId) {
  await browser.scripting.executeScript({
    target: { tabId },
    files: [CONTENT_SCRIPT],
  });
}

async function scanActiveTab() {
  const tab = await currentTab();
  const origin = classifyPageUrl(tab.url ?? '');
  if (!origin.supported) {
    const error = new Error('This page does not permit GoreeCloud Vault integration.');
    error.code = origin.reason;
    throw error;
  }

  await inject(tab.id);
  const fields = await browser.tabs.sendMessage(tab.id, { type: 'GC_VAULT_SCAN' });
  return { origin, fields };
}

async function fillGeneratedPassword(password) {
  const tab = await currentTab();
  const origin = assertProtectedFillOrigin(tab.url ?? '');
  await inject(tab.id);
  const result = await browser.tabs.sendMessage(tab.id, {
    type: 'GC_VAULT_FILL_GENERATED_PASSWORD',
    password,
  });
  return { origin, ...result };
}

browser.runtime.onMessage.addListener((message) => {
  if (!message || typeof message !== 'object') return undefined;

  switch (message.type) {
    case 'GC_VAULT_GET_STATE':
      return Promise.resolve({ capabilities: extensionCapabilities });
    case 'GC_VAULT_SCAN_ACTIVE_TAB':
      return scanActiveTab();
    case 'GC_VAULT_FILL_GENERATED_PASSWORD':
      return fillGeneratedPassword(message.password);
    case 'GC_VAULT_QUERY_CREDENTIALS': {
      const error = new Error('Vault credential access is not enabled in this pre-alpha slice.');
      error.code = 'credential-source-blocked';
      return Promise.reject(error);
    }
    default:
      return undefined;
  }
});
