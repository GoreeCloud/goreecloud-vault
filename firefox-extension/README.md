# GoreeCloud Vault Firefox Extension

**Version:** 0.1.0  
**Lifecycle:** Pre-Alpha / implementation foundation  
**Stable:** No

This directory is the first-party Firefox client component for GoreeCloud Vault. It is maintained inside the canonical `GoreeCloud/goreecloud-vault` product-family repository and is intentionally separate from GoreeCloud Browser's native Vault integration.

## Implemented in this slice

- Firefox Manifest V3 package metadata with an explicit GoreeCloud extension ID and no-data-collection declaration.
- No install-time host permissions and no declarative all-sites content script.
- `activeTab` + `scripting` for explicit user-initiated page access; HTTP/HTTPS host access is declared only as optional future capability.
- Glaze-aligned popup shell with locked/pre-alpha state.
- Local cryptographic password generator with configurable length and character classes.
- Username/password field detection that inspects field metadata only and never reads field values.
- Explicit user-initiated generated-password fill into a focused or unambiguous password field.
- Protected fill blocked on ordinary insecure HTTP origins; HTTPS and loopback development origins are accepted.
- Background capability contract that rejects real Vault credential queries until the reviewed client connection exists.
- Zero-dependency Node tests for generator, origin policy, manifest permissions, and fail-closed capability state.

## Not implemented yet

This slice does **not** claim real Vault credential retrieval/autofill, save/update prompts, account sign-in, encrypted cache, Vault unlock, passphrase generation, passkeys/WebAuthn, TOTP, payment/identity autofill, persistent site access, automatic inline suggestions, Firefox signing, production update delivery, or Stable acceptance.

Those features remain gated by the shared versioned Vault client contract, reviewed authentication/encryption connection, privacy/security acceptance, and release evidence.

## Security boundary

The extension does not store credentials, tokens, generated passwords, page metadata, or form values. The content script never reads existing input values. A generated password exists only in the popup/background message path long enough to perform the explicit fill action and is not written to extension storage.

The runtime credential source remains deliberately blocked. Do not add test passwords, placeholder vault data, fake encryption, or a second credential database to make the UI appear complete.

## Validation

```sh
cd firefox-extension
npm test
```

The component requires Node.js 20 or newer for its zero-dependency test harness.
