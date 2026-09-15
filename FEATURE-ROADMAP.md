# GoreeCloud Vault Server — Feature Roadmap

**Status:** Active roadmap control  
**As of:** 2026-09-15  
**Authoritative product record:** Project Specification — GoreeCloud Vault  
**Authoritative backend record:** Project Specification — Vault Server  
**Canonical product-family repository:** GoreeCloud/goreecloud-vault  
**Drive control:** `GoreeCloud/Feature Roadmap/GoreeCloud Vault Server/FEATURE-ROADMAP.docx`

## Purpose

This file is the repository-side feature roadmap control for GoreeCloud Vault Server within the canonical GoreeCloud Vault product-family repository. It records current planned and recommended feature work without replacing authoritative project records, implementation evidence, release gates, or GoreeCloud Tasks Management.

The repository may maintain GoreeCloud Vault Server, GoreeCloud Vault Web, and supported client applications under one source-control umbrella. Each component still retains independent implementation, security, compatibility, release, and acceptance requirements.

## Roadmap

| ID | Feature / obligation | Priority | Current state |
| --- | --- | --- | --- |
| FR-001 | Reconcile and maintain every current planned or recommended Vault Server feature from authoritative project records and verified repository evidence. | High | Ongoing control |
| FR-002 | Move actionable feature obligations into GoreeCloud Tasks Management when required, preserving priority, dependency, and lifecycle disposition. | High | Ongoing control |
| FR-003 | Do not mark features implemented, complete, cancelled, or superseded without authoritative evidence and synchronized repository/Drive roadmap updates. | High | Ongoing control |
| FR-004 | Complete retirement of the former GoreeVault product identity across current documentation, UI, transactional presentation, packages, release materials, websites, artwork, and safely migratable identifiers while preserving truthful historical evidence. The repository rename to `GoreeCloud/goreecloud-vault` is complete; broader identifier retirement remains controlled follow-up work. | Critical | In progress |
| FR-005 | Advance and accept the native GoreeCloud Vault Server architecture so product-defining inherited Vaultwarden architecture becomes transitional rather than permanent. | Critical | In progress; native source foundation integrated |
| FR-006 | Implement and validate the current GoreeCloud Platform Contract across GoreeCloud Manager, Privacy Shield, Wardveil Security, Everkeep, Glaze UI, GoreeCloud Mesh, and GoreeCloud Identity. | Critical | Blocked / incomplete |
| FR-007 | Deliver real supported-client, WebAuthn/passkey, target-environment, migration/rollback, recovery, repository-governance, exact-release, and final Stable evidence. | Critical | Blocked / incomplete |
| FR-008 | Reconcile the renamed product-family repository so current source metadata, documentation, Web/client boundaries, validation, and Drive records use `GoreeCloud/goreecloud-vault` while preserving legitimate server/service/image identifiers and historical repository references. | Critical | In progress |
| FR-009 | Build, support, and validate a dedicated first-party **GoreeCloud Vault Firefox Extension** with secure origin-aware autofill, credential save/update flows, password and passphrase generation, passkeys/WebAuthn, TOTP, Vault search/quick access, lock/reauthentication, least-privilege WebExtension permissions, private-window safeguards, authenticated synchronization, encrypted-client boundaries, signing/update/rollback, and exact-client release evidence. | Critical | Planned / incomplete; product requirement is explicit. No Firefox extension implementation or Stable evidence is claimed. |
| FR-010 | Provide and validate the versioned Vault client/API and authorization contracts required by **GoreeCloud Browser’s native Vault integration** without exposing the Vault database, decryption keys, or plaintext credential material directly to Browser and without creating a second authoritative credential store. | Critical | Planned / incomplete; native Browser integration remains a separate client implementation and acceptance obligation. |

## Maintenance and synchronization

This roadmap and the corresponding Drive `FEATURE-ROADMAP.docx` must remain materially synchronized with one another and with authoritative project records. Update both copies whenever feature scope, priority, dependency, implementation status, cancellation, supersession, recommendation, or verification state materially changes.

No feature may be represented as complete or Stable solely because it appears in this roadmap. Completion and lifecycle claims require applicable implementation, validation, review, release, and production evidence.
