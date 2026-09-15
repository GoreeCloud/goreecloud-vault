# GoreeCloud Vault Client Integration Contract

**Contract version:** 0.1.0  
**Status:** Draft / implementation control  
**Applies to:** GoreeCloud Vault Firefox Extension, native GoreeCloud Browser integration, and future approved Vault clients

## Purpose

This contract defines the common authority and capability boundary used by first-party GoreeCloud Vault clients. It does not create a second vault protocol or credential store. Server compatibility, encryption, authentication, synchronization, and protected-item semantics remain owned by GoreeCloud Vault.

## Authority model

GoreeCloud Vault is the sole authority for protected credentials, passkeys, secrets, secure-autofill material, encryption, Vault state, account state, lock state, and credential authorization.

A client surface may own presentation, page or browser event integration, and user interaction. It must not:

- read or reinterpret the Vault database directly;
- persist plaintext credentials as client-owned durable state;
- manufacture credential authority from browser history, form values, or a secondary password database;
- silently downgrade to an unverified credential source;
- treat an unavailable capability as an empty successful result when doing so could cause insecure fallback.

## Version and capability negotiation

Every client integration must identify a contract version and an explicit capability set. Unknown major versions fail closed. A client must distinguish at least these states:

- `available` — capability is implemented and authorized for this client/context;
- `locked` — Vault exists but protected use requires unlock or reauthentication;
- `blocked` — policy, privacy, security, or acceptance state prohibits use;
- `unsupported` — the client or Vault endpoint does not implement the requested capability;
- `version-mismatch` — client and Vault contract versions are incompatible.

Initial capability identifiers are:

- `vault.state.read`
- `vault.account.select`
- `vault.credentials.query`
- `vault.credentials.fill`
- `vault.credentials.save-update`
- `vault.generator.password`
- `vault.generator.passphrase`
- `vault.totp.read`
- `vault.passkeys.webauthn`
- `vault.lock`

## Request context

Protected operations must carry sufficient ephemeral context for authorization without turning the browser into a tracking database. Context may include:

- contract version;
- unique request identifier;
- requested operation;
- normalized top-level origin;
- account/vault selection when explicitly chosen;
- normal/private/isolated-private context classification;
- current lock/reauthentication requirement;
- capability evidence/version.

Clients must not durably persist ordinary browsing origin activity, fill events, page metadata, or private-context activity merely to invoke Vault.

## Origin rule

Credential queries and fills are exact-origin operations by default. Related-domain, subdomain, application-specific, or user-defined equivalence requires an explicit Vault-controlled rule. Client presentation may explain or request the rule; it must not silently broaden it.

Protected fill fails closed on origins that do not satisfy the approved transport/origin policy. The Firefox foundation currently permits HTTPS and loopback development origins and blocks ordinary external HTTP protected fill.

## Secret handling

Protected values must cross a client boundary only for an authorized operation and only for the minimum lifetime necessary. Clients must not write master secrets, decryption keys, reusable authentication material, plaintext credentials, TOTP seeds, or decrypted vault payloads to ordinary browser storage, telemetry, crash reports, diagnostics, or logs.

Generated passwords are also treated as sensitive ephemeral values. The Firefox foundation does not persist them.

## Private contexts

Normal, Private, and Isolated Private contexts require distinct runtime context evidence. Private-context use must not silently persist private origin activity, fill events, page metadata, credential-use metadata, or private-window history into ordinary client state or synchronization datasets.

## Current Firefox implementation state

Firefox Extension 0.1.0 implements only:

- `vault.generator.password` locally;
- page field detection as non-secret client presentation support;
- explicit user-initiated filling of a newly generated password.

Real `vault.credentials.query`, `vault.credentials.fill`, `vault.credentials.save-update`, `vault.generator.passphrase`, `vault.totp.read`, and `vault.passkeys.webauthn` remain `blocked` or `unsupported` until their reviewed Vault-backed implementations exist. The extension must not fabricate credentials to simulate those capabilities.

## Native GoreeCloud Browser

Native GoreeCloud Browser integration must consume this same authority model and version/capability semantics while using Browser-native presentation and form-event integration. It must not require the Firefox extension or another WebExtension and must not directly access Vault storage.

## Acceptance boundary

A source implementation of this contract is not production acceptance. Stable support requires exact-client build/signing evidence, supported Firefox/Browser versions, representative site workflows, phishing/origin tests, WebAuthn/passkey tests where implemented, accessibility, localization/RTL, private-context validation, update/rollback, provenance, security/privacy review, and applicable GoreeCloud platform acceptance.
