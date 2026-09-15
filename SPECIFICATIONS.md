# GoreeCloud Vault Server Specifications

## Status

Active native development. Not approved for Stable production use.

## Role and purpose

GoreeCloud Vault Server is the server component for GoreeCloud credential, secret, secure-note, passkey, and encrypted-vault services. The long-term implementation is original GoreeCloud-owned native software.

The inherited Vaultwarden-compatible runtime is transitional compatibility, migration, rollback, and behavioral-reference material. It is not the native product architecture target.

## Current native implementation

The implemented native foundation under `native/` currently provides:

- an isolated Rust 2024 crate using the repository-pinned Rust toolchain;
- no third-party runtime dependencies;
- an explicit fail-closed production-readiness gate model;
- a development-only in-memory encrypted-record store;
- owner-scoped record creation, lookup, list, and deletion behavior inside the native domain;
- opaque ciphertext handling with no encryption, decryption, parsing, indexing, or content logging;
- bounded owner identifiers, record identifiers, ciphertext payloads, and positive record revisions;
- synthetic regression coverage for cross-owner isolation, bounded inputs, deterministic owner-scoped listing, deletion isolation, and ciphertext-safe debug output;
- a bounded CLI status surface with no network listener or credential input;
- dedicated exact-head native CI.

This source foundation is development evidence only. It does not by itself establish native architecture acceptance, Platform Contract conformance, production authorization, Release Candidate status, or Stable qualification.

## Native security model

The native server must preserve a zero-knowledge boundary appropriate to the supported client model.

Protected vault content must remain opaque to server code where the protocol requires client-side encryption. Native server logic must not add plaintext storage or server-side decryption merely to simplify implementation.

The native application must not invent cryptographic primitives. Mature and independently reviewed cryptographic, KDF, WebAuthn/passkey, protocol, codec, runtime, or database foundations may be used narrowly when reimplementation would materially increase security or interoperability risk.

## Multi-user and authorization requirements

Native behavior must be multi-user from the beginning.

Required properties include:

- stable authenticated user identity;
- fail-closed missing or invalid identity;
- owner-scoped private record access;
- organization and collection authorization;
- session/device lifecycle and revocation;
- cross-user negative testing;
- application authorization independent of private-network reachability.

The current native foundation uses synthetic owner identifiers only for domain-isolation tests. It does not implement production authentication.

## Data and persistence

Current native record storage is memory-only development state.

A future production store must:

- use an approved persistent database boundary;
- preserve owner isolation in storage queries and uniqueness rules;
- store only protocol-required server-visible data;
- treat protected record payloads as opaque;
- support safe schema evolution;
- support Everkeep backup, restore, rollback, continuity, and destructive recovery rehearsal;
- avoid reusable secrets in source, logs, fixtures, or ordinary documentation;
- provide bounded privacy-safe errors.

No native production schema or data migration exists yet.

## APIs and networking

The current native foundation has no network listener and no HTTP/API surface.

A future network API requires separate review for:

- GoreeCloud Identity authentication;
- authorization on every private resource;
- bounded request/response bodies;
- method and content-type handling;
- rate limiting and abuse controls;
- privacy-safe errors and logs;
- reverse-proxy trust;
- GoreeCloud Mesh applicability;
- TLS and internal transport assumptions;
- negative cross-user tests.

The backend must not be published directly to the public internet.

## Platform integration

Stable requires current accepted integration with all seven applicable GoreeCloud Integral Platform Systems:

- GoreeCloud Manager
- Privacy Shield
- Wardveil Security
- Everkeep
- Glaze UI
- GoreeCloud Mesh
- GoreeCloud Identity

The repository-root `goreecloud.platform.yaml` is the controlling machine-readable Platform Contract. At this development checkpoint all seven systems remain `applicable-blocked` and overall conformance remains `nonconformant`.

Platform integration must be substantive. Naming a system, importing a shared package, or exposing a readiness flag without implementing the required behavior and acceptance does not satisfy the gate.

## Compatibility and migration

The repository retains a Vaultwarden-compatible runtime and compatibility test harness during the native transition.

Native replacement must be demonstrated against exact supported workflows before inherited runtime retirement. Migration acceptance must prove authentication, synchronization, authorized data access, organization/collection behavior, attachments and required second-factor flows without private-data leakage or corruption.

Rollback must preserve a safe path to the previously accepted service state. A successful process start or schema migration is not migration acceptance.

## Recovery

Production acceptance requires complete backup coverage for every required persistent component and an isolated destructive restore rehearsal. Recovery must not depend on undocumented local state or a single surviving production host.

## User interface

Server-owned user-facing surfaces must use current Glaze UI requirements. The primary browser vault is a separate **GoreeCloud Vault Web** client lifecycle and must become GoreeCloud-owned and Glaze-conformant before product-wide Stable qualification unless a separately documented material exception is explicitly approved.

The current native server foundation has no user-facing UI.

## Supported browser client surfaces — planned

GoreeCloud Vault must support two distinct first-party browser delivery surfaces that share the same authoritative Vault security, encryption, synchronization, item, device, and authorization model:

1. **GoreeCloud Vault Firefox Extension** — a dedicated Firefox WebExtension providing secure origin-aware username/password autofill, inline and one-click credential suggestions, save/update prompts, Vault item access, configurable password and passphrase generation, passkey/WebAuthn flows, TOTP retrieval/fill, supported payment and identity autofill, quick Vault search, account/vault selection, lock/unlock, reauthentication, and security warnings.
2. **Native GoreeCloud Browser integration** — GoreeCloud Vault functionality built directly into GoreeCloud Browser as a native first-party capability. GoreeCloud Browser must not require installation of the Firefox extension or another WebExtension to provide its supported Vault experience.

The Firefox extension must follow least-privilege WebExtension permissions and conservative private-window behavior. Protected vault contents, master secrets, decryption keys, reusable authentication material, and plaintext credentials must not be written to ordinary browser storage, diagnostics, telemetry, crash reports, or logs. Any local cache must preserve the approved encrypted-client and lock boundaries.

For native GoreeCloud Browser integration, Browser owns the native presentation and browser-event integration while GoreeCloud Vault remains the sole authority for protected credentials, passkeys, secrets, secure-autofill material, encryption, vault state, and credential authorization. Browser must consume explicit versioned Vault client capabilities, fail closed when required authorization or capability evidence is unavailable, and must not directly read the Vault database, create a second credential database, or durably persist plaintext Vault material as Browser-owned state.

Both surfaces must preserve safe origin matching, device/session revocation, private-context isolation, offline/reconnect behavior where supported, security/privacy boundaries, update/rollback paths, and exact release evidence. Neither surface is currently represented by this specification as implemented, production accepted, or Stable.

## Release lifecycle

Source validation, release acceptance, platform-system acceptance, and production acceptance are separate.

Stable requires exact-artifact evidence for applicable gates, including:

- native implementation acceptance;
- multi-user security;
- real supported clients, including the required first-party browser client surfaces when in release scope;
- real WebAuthn/passkey flows;
- GoreeCloud Manager, Privacy Shield, Wardveil Security, Everkeep, Glaze UI, GoreeCloud Mesh, and GoreeCloud Identity acceptance;
- backup and destructive restore;
- migration and rollback;
- target-environment rehearsal;
- repository/release governance;
- immutable source/tag/image identities;
- final approvals after the evidence being approved.

The native foundation does not satisfy these gates by itself.

## Non-goals

The project does not:

- create new cryptography for branding;
- store plaintext protected vault content on the server;
- treat private networking as user authorization;
- preserve inherited application architecture merely because it exists;
- claim production readiness from green CI;
- use mutable release identities for production;
- use production secrets or private user data as ordinary development fixtures.
