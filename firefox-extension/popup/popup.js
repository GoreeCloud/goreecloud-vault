import { generatePassword, passwordGeneratorDefaults } from '../src/password-generator.js';

const elements = {
  lifecycle: document.querySelector('#lifecycle'),
  pageResult: document.querySelector('#page-result'),
  scanPage: document.querySelector('#scan-page'),
  length: document.querySelector('#length'),
  lengthOutput: document.querySelector('#length-output'),
  lowercase: document.querySelector('#lowercase'),
  uppercase: document.querySelector('#uppercase'),
  digits: document.querySelector('#digits'),
  symbols: document.querySelector('#symbols'),
  excludeAmbiguous: document.querySelector('#exclude-ambiguous'),
  generatedPassword: document.querySelector('#generated-password'),
  generate: document.querySelector('#generate'),
  fillGenerated: document.querySelector('#fill-generated'),
  actionResult: document.querySelector('#action-result'),
};

let generatedPassword = '';

function generatorOptions() {
  return {
    length: Number(elements.length.value),
    lowercase: elements.lowercase.checked,
    uppercase: elements.uppercase.checked,
    digits: elements.digits.checked,
    symbols: elements.symbols.checked,
    excludeAmbiguous: elements.excludeAmbiguous.checked,
  };
}

function messageForError(error) {
  switch (error?.code) {
    case 'insecure-origin': return 'Protected fill is blocked on insecure HTTP origins.';
    case 'unsupported-scheme': return 'This Firefox page does not allow Vault page integration.';
    case 'no-active-tab': return 'No active tab is available.';
    default: return error?.message || 'The requested action could not be completed.';
  }
}

function refreshPassword() {
  try {
    generatedPassword = generatePassword(generatorOptions());
    elements.generatedPassword.value = generatedPassword;
    elements.fillGenerated.disabled = false;
    elements.actionResult.textContent = 'New password generated locally.';
  } catch (error) {
    generatedPassword = '';
    elements.generatedPassword.value = '';
    elements.fillGenerated.disabled = true;
    elements.actionResult.textContent = messageForError(error);
  }
}

async function loadState() {
  const state = await browser.runtime.sendMessage({ type: 'GC_VAULT_GET_STATE' });
  const lifecycle = state?.capabilities?.lifecycle ?? 'pre-alpha';
  elements.lifecycle.textContent = lifecycle.replace('-', ' ');
}

elements.length.addEventListener('input', () => {
  elements.lengthOutput.value = elements.length.value;
  elements.lengthOutput.textContent = elements.length.value;
});

elements.scanPage.addEventListener('click', async () => {
  elements.pageResult.textContent = 'Scanning this tab…';
  try {
    const result = await browser.runtime.sendMessage({ type: 'GC_VAULT_SCAN_ACTIVE_TAB' });
    const passwordCount = result.fields?.passwordFieldCount ?? 0;
    const usernameCount = result.fields?.usernameFieldCount ?? 0;
    const security = result.origin?.safeForProtectedFill ? 'protected fill permitted' : 'protected fill blocked';
    elements.pageResult.textContent = `${usernameCount} username candidate(s), ${passwordCount} password field(s); ${security}.`;
  } catch (error) {
    elements.pageResult.textContent = messageForError(error);
  }
});

elements.generate.addEventListener('click', refreshPassword);

elements.fillGenerated.addEventListener('click', async () => {
  if (!generatedPassword) return;
  elements.actionResult.textContent = 'Filling selected password field…';
  try {
    const result = await browser.runtime.sendMessage({
      type: 'GC_VAULT_FILL_GENERATED_PASSWORD',
      password: generatedPassword,
    });
    if (result?.filled) {
      elements.actionResult.textContent = 'Generated password filled. It was not stored by the extension.';
    } else if (result?.reason === 'select-password-field') {
      elements.actionResult.textContent = 'Focus the password field you want to fill, then try again.';
    } else {
      elements.actionResult.textContent = 'No eligible password field was found.';
    }
  } catch (error) {
    elements.actionResult.textContent = messageForError(error);
  }
});

loadState().catch(() => {});
Object.entries(passwordGeneratorDefaults).forEach(([key, value]) => {
  if (key === 'length') elements.length.value = String(value);
});
elements.lengthOutput.textContent = elements.length.value;
refreshPassword();
