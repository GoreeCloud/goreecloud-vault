# GoreeCloud Vault Server Repository Structure

## Purpose

This document defines the source-control structure of GoreeCloud Vault Server and the responsibility boundary of each major repository area.

The structure is intended to keep the transitional Vaultwarden compatibility core understandable while making GoreeCloud-owned native development, security, deployment, release, Glaze UI, governance, evidence, Platform Contract, and client-boundary work easy to locate and review.

**GoreeCloud Vault** is the single canonical current product family and **GoreeCloud Vault Server** is its backend service. **GoreeVault is retired** as a current product identity. Historical and compatibility-sensitive `GoreeVault`/`goreevault` identifiers may remain only where preservation is necessary for migration, rollback, interoperability, evidence continuity, or historical truth.

## Structural principles

1. Keep compatibility-sensitive server code close to the upstream layout while the runtime remains transitional unless a different structure provides a clear security or maintenance benefit.
2. Keep GoreeCloud-owned native development, validation, deployment, governance, evidence, Platform Contract, and product documentation explicit rather than hiding it inside upstream files.
3. Do not create new top-level directories merely for visual organization; a directory should represent a durable ownership, build, runtime, or lifecycle boundary.
4. Keep reusable secrets and private production values outside the repository.
5. Keep generated files traceable to their generator/source inputs.
6. Keep release-blocking validators deterministic and dependency-light where practical.
7. Treat repository documentation as an implementation companion to authoritative GoreeCloud governance records, not as a replacement for those records.
8. Keep future client applications separated from the server when they own independent cryptographic, browser-storage, dependency, release, and UI lifecycles.
9. Do not rename compatibility-sensitive paths merely for branding. Migrate them only with explicit compatibility, rollback, data-integrity, and evidence review.
10. Treat the presence or buildability of `native/` as source-development evidence only; it does not independently establish native architecture acceptance, platform conformance, production authorization, or Stable qualification.

## Top-level layout

### `.github/`

Repository automation and review governance.

Includes:

- GitHub Actions workflows;
- CODEOWNERS;
- pull-request and issue configuration where applicable;
- release, security, compatibility, recovery, deployment, Glaze UI, evidence-tooling, repository-readiness, and native-foundation automation.

Changes here are security-sensitive because workflows may control release publication, registry access, evidence collection, or repository permissions. Existing `goreevault-*` workflow filenames/display names are legacy automation identifiers until a separately validated migration changes them; they are not current product identity. The native-foundation workflow currently retains such a filename under this compatibility rule while its display text and current product documentation use GoreeCloud Vault naming.

### `deploy/`

GoreeCloud-owned production deployment contract.

This directory is separate from upstream development examples. Production deployment files must preserve immutable image references, private backend publication, database isolation, least privilege, backup/recovery requirements, and the canonical GoreeCloud service origin.

### `docker/`

Container build sources and generated image build definitions.

The repository retains upstream-compatible Docker generation where practical. Generated Dockerfiles must be changed through their documented source/generator path when the upstream build process requires it.

The root `Dockerfile` and generated Dockerfiles are build inputs, not production deployment manifests. Production runtime policy belongs in `deploy/`.

### `docs/`

GoreeCloud Vault Server implementation, architecture, security, compatibility, operational, release, client-boundary, and governance records.

Important documents include:

- `SERVER-IDENTITY.md` — canonical server identity and naming boundary;
- `GLAZE-UI.md` — repository Glaze UI implementation contract;
- `WEB-CLIENT-CONTRACT.md` — future **GoreeCloud Vault Web** zero-knowledge, multi-user, storage, Glaze UI, accessibility, dependency, release, migration, and rollback boundary;
- `PRODUCTION-READINESS.md` — RC and Stable gates;
- `PRODUCTION-DEPLOYMENT.md` — reviewed deployment contract;
- `SECURITY-MODEL.md` — security and zero-knowledge boundaries;
- `STABLE-EVIDENCE.md` — machine-readable Stable evidence contract and target-environment collection process;
- `UPSTREAM.md` — upstream synchronization and provenance expectations;
- `ROADMAP.md` — staged product direction;
- `OPEN-READINESS-BLOCKERS.md` — unresolved exact-candidate gates;
- `RC-EVIDENCE.md` — human-readable exact-candidate evidence index;
- `REPOSITORY-STRUCTURE.md` — this document.

Repository documentation must not store reusable credentials, production secrets, private vault data, or sensitive recovery material.

### `migrations/`

Database schema migrations inherited from and maintained with the compatibility server.

Migration changes are release-critical and require migration, rollback, recovery, and compatibility review as appropriate.

### `native/`

Development-only original GoreeCloud-owned Vault Server foundation and proposed long-term product-defining implementation boundary.

The current native crate is intentionally narrow. It contains:

- an isolated Rust crate with its own lockfile/workspace boundary;
- a fail-closed readiness model whose production gates are false by default;
- explicit readiness gates for all seven GoreeCloud Integral Platform Systems plus persistent storage, supported clients, WebAuthn/passkey acceptance, migration/rollback, repository/release governance, target-environment acceptance, and production approval;
- an in-memory owner-scoped store for already-protected opaque encrypted record bytes;
- synthetic tests for owner isolation, bounded inputs, record revision rules, and ciphertext-safe debug behavior;
- a bounded CLI status/ready surface with no network listener or credential input.

`native_foundation=true` means only that this development source boundary exists. The controlling `goreecloud.platform.yaml` remains nonconformant with GoreeCloud Manager, Privacy Shield, Wardveil Security, Everkeep, Glaze UI, GoreeCloud Mesh, and GoreeCloud Identity all `applicable-blocked`. Native source must not claim those acceptances itself.

The native foundation does not implement production authentication, HTTP APIs, persistent storage, synchronization, organization/collection authorization, attachments, passkey/WebAuthn flows, production deployment, or production approval. It must not be treated as a migration target or used to retire the transitional runtime until exact-candidate migration, rollback, recovery, real-client, platform, governance, target-environment, and release evidence is accepted.

### `scripts/`

GoreeCloud-owned and inherited automation used for development, validation, security, compatibility, deployment, release, recovery, and evidence checks.

Release-blocking scripts should fail closed on missing or malformed required state. A script that only validates source should not silently mutate production state.

`scripts/collect-target-evidence.py` is explicitly read-only. It may inspect the reviewed production contract, restricted non-repository environment configuration, live Docker metadata, immutable image identity, and canonical HTTPS health, but it must not deploy, restart, stop, delete, back up, restore, or reconfigure production resources. It must not serialize secrets or full container environments.

### `src/`

Rust server runtime and server-owned presentation.

This area includes authentication, authorization, persistence, configuration, API behavior, cryptographic integration, rate limiting, server-side templates, and GoreeCloud Vault Server-owned Admin/error presentation.

Internal `vaultwarden` or `goreevault` names may remain only when renaming them would create unnecessary protocol, database, build, migration, evidence, or upstream-maintenance risk. User-facing server-owned presentation must use GoreeCloud Vault / GoreeCloud Vault Server identity as applicable and Glaze UI.

### `tests/`

Release-blocking regression and compatibility coverage plus dependency-light tests for GoreeCloud-owned validation/evidence tooling.

Tests must use synthetic identities and data. Production databases, vault exports, credentials, backups, and private user content are prohibited test fixtures.

`tests/test_collect_target_evidence.py` validates the target-evidence collector's fail-closed parsing and Docker-metadata decisions without a Docker daemon, target environment, production credentials, or private data.

### `web-client/`

Temporary **GoreeCloud Vault Web** incubation boundary inside the server repository.

This directory is not the approved long-term source-control boundary for the browser client. The long-term client should live in the dedicated `GoreeCloud/goreecloud-vault-web` repository once that repository is created and the migration is authorized. Until then, the incubation source remains development-only and must not be treated as accepted production credential-processing code merely because its validation checks pass.

## Root files

### `README.md`

Public entry point for the GoreeCloud Vault Server repository. It must describe GoreeCloud Vault Server as the backend of GoreeCloud Vault, record GoreeVault as retired, preserve explicitly classified compatibility/historical identifiers where necessary, and must not recommend mutable production image tags.

### `VAULT.md`

Current product-family boundary, provenance, compatibility policy, security policy, platform integration state, and GoreeCloud-specific direction. This replaces the former active `GOREVAULT.md` product-family document.

### `goreecloud.platform.yaml`

Machine-readable GoreeCloud Platform Contract for this service. It declares lifecycle, release boundary, required Glaze UI version, and independent applicability/acceptance state for GoreeCloud Manager, Privacy Shield, Wardveil Security, Everkeep, Glaze UI, GoreeCloud Mesh, and GoreeCloud Identity. The contract remains fail-closed until qualifying evidence changes an individual system state.

### `FEATURES.md`

Implemented native-development behavior and the explicit boundary between source foundations, transitional compatibility capabilities, and features that remain unimplemented or unaccepted.

### `SPECIFICATIONS.md`

Repository-local native server implementation specification. It must remain subordinate to authoritative GoreeCloud governance and must not convert source implementation into production, platform, or Stable acceptance.

### `BENEFITS.md`

Benefits and intended advantages of the native development direction. Benefits are product-direction statements rather than evidence that the corresponding production capability has been accepted.

### `COMPETITIVE-OBJECTIVES.md`

Product and engineering objectives for the native direction. Objectives are not implementation-completion claims.

### `FEATURE-ROADMAP.md`

Repository-side feature roadmap control synchronized with the canonical Drive feature-roadmap record.

### `BRANDING.md`

Repository branding boundary. Canonical artwork authority remains the unified GoreeCloud branding repository.

### `USER-MANUAL.md`

Current operational/user guidance for the Development/non-Stable service and its release boundaries.

### `CONTRIBUTING.md`

Contributor expectations and validation requirements.

### `SECURITY.md`

Vulnerability reporting and security support boundary.

### `Cargo.toml`, `Cargo.lock`, `rust-toolchain.toml`, `build.rs`

Rust dependency, toolchain, and build inputs. Changes can alter runtime or supply-chain behavior and require corresponding validation.

### `DockerSettings.yaml`, `Dockerfile.j2`, generated Dockerfiles

Container-build generation inputs and outputs. Follow the generator comments and upstream-compatible workflow instead of editing generated outputs inconsistently.

## UI ownership boundary

GoreeCloud Vault Server-owned server UI belongs under the existing server static/template layout rather than a new top-level frontend tree.

The future **GoreeCloud Vault Web** client uses a separate application/repository boundary because it owns its own client-side cryptographic lifecycle, dependency graph, browser storage, build pipeline, compatibility matrix, release lifecycle, and full Glaze UI presentation. The server repository defines the implementation contract in `docs/WEB-CLIENT-CONTRACT.md`; that contract does not collapse the client into the server source tree.

Until that client exists and passes its required gates, the bundled upstream-compatible web vault is a temporary compatibility dependency. It is not a permanent Glaze UI exception and blocks product-wide Stable readiness under the current GoreeCloud baseline.

## Multi-user boundary

GoreeCloud Vault Server is a multi-user credential service, not an administrator-only single-user component.

Repository changes must preserve:

- individual user identities;
- private vault isolation;
- authorization checks on user-owned resources;
- organization and collection access boundaries;
- safe invitation/member lifecycle behavior;
- session/device revocation behavior;
- separation of network access from application authorization.

Multi-user regressions are release blockers.

## Adding a new component

Before adding a new top-level directory, repository, runtime service, client, or supporting component, document:

- Role and Purpose;
- ownership and maintenance boundary;
- security and privacy impact;
- data ownership and authoritative storage;
- authentication and authorization model;
- dependency and update model;
- backup/recovery impact;
- release/testing model;
- Integral Platform System applicability and acceptance boundary;
- Glaze UI applicability for user-facing surfaces;
- migration and retirement path.

Prefer the simplest structure that keeps those boundaries clear and recoverable.
