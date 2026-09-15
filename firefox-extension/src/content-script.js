(() => {
  if (globalThis.__goreecloudVaultContentScriptInstalled) return;
  globalThis.__goreecloudVaultContentScriptInstalled = true;

  function visible(input) {
    return !input.disabled && !input.readOnly && input.getClientRects().length > 0;
  }

  function passwordFields() {
    return [...document.querySelectorAll('input[type="password"]')].filter(visible);
  }

  function usernameFields() {
    const selectors = [
      'input[autocomplete="username"]',
      'input[autocomplete="email"]',
      'input[type="email"]',
      'input[name*="user" i]',
      'input[name*="email" i]',
    ];
    return [...new Set(selectors.flatMap((selector) => [...document.querySelectorAll(selector)]))]
      .filter((input) => input instanceof HTMLInputElement && visible(input));
  }

  function fieldType(input) {
    if (!(input instanceof HTMLInputElement)) return null;
    if (input.type === 'password') return 'password';
    if (usernameFields().includes(input)) return 'username';
    return null;
  }

  function scan() {
    return {
      passwordFieldCount: passwordFields().length,
      usernameFieldCount: usernameFields().length,
      focusedFieldType: fieldType(document.activeElement),
    };
  }

  function setInputValue(input, value) {
    const descriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');
    if (!descriptor?.set) throw new Error('Unable to access the native input value setter.');
    descriptor.set.call(input, value);
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function fillGeneratedPassword(password) {
    if (typeof password !== 'string' || password.length < 12 || password.length > 128) {
      throw new TypeError('Generated password payload is invalid.');
    }

    const candidates = passwordFields();
    const focused = document.activeElement;
    const target = focused instanceof HTMLInputElement && focused.type === 'password' && visible(focused)
      ? focused
      : candidates.length === 1
        ? candidates[0]
        : null;

    if (!target) {
      return { filled: false, reason: candidates.length === 0 ? 'no-password-field' : 'select-password-field' };
    }

    setInputValue(target, password);
    return { filled: true };
  }

  browser.runtime.onMessage.addListener((message) => {
    if (!message || typeof message !== 'object') return undefined;
    if (message.type === 'GC_VAULT_SCAN') return Promise.resolve(scan());
    if (message.type === 'GC_VAULT_FILL_GENERATED_PASSWORD') {
      return Promise.resolve(fillGeneratedPassword(message.password));
    }
    return undefined;
  });
})();
