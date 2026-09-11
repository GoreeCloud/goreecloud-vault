# GoreeCloud Vault Server

GoreeCloud Vault Server is the synchronized backend for **GoreeCloud Vault**, GoreeCloud's planned zero-knowledge credential, password, passkey, secret, recovery-information, secure-note, and encrypted-vault platform.

> [!IMPORTANT]
> GoreeCloud Vault Server is in **Active Development** and is **not approved for GoreeCloud Stable production use**. Source validation, compatibility tests, or a working deployment do not substitute for the release and platform evidence required by `docs/PRODUCTION-READINESS.md`.

## Canonical identity

The canonical product family is **GoreeCloud Vault**. The canonical backend is **GoreeCloud Vault Server**, and this repository is `GoreeCloud/goreecloud-vault-server`.

The former product name **GoreeVault is retired**. It may appear only where required to preserve historical evidence or a compatibility-sensitive legacy implementation identifier. It must not be presented as a current product, client family, application, service, or brand.

Current family names are:

- **GoreeCloud Vault**
- **GoreeCloud Vault Server**
- **GoreeCloud Vault Web**
- **GoreeCloud Vault Browser**
- **GoreeCloud Vault Desktop**
- **GoreeCloud Vault Mobile**
- **GoreeCloud Vault CLI**

See `VAULT.md`, `docs/SERVER-IDENTITY.md`, and `docs/server-identity.json` for the product and server naming boundaries.

## Architecture and migration state

The current server remains a Vaultwarden-derived transitional implementation because compatibility, migration, recovery, cryptographic, and protocol risks make an immediate replacement unsafe. The long-term product-defining architecture must become original GoreeCloud-owned software. Mature cryptographic primitives, standards, protocol implementations, database engines, and other narrowly justified foundations may remain where replacing them would materially increase risk.

Open PR #41 contains a separately reviewed native GoreeCloud Vault Server foundation. This naming and platform-contract work does not merge, supersede, or falsely complete that native migration.

Protected vault contents remain client-encrypted where required by the compatible zero-knowledge model. The server must not require plaintext access to protected passwords, notes, private keys, passkey private material, payment information, or other protected vault content merely to synchronize it.

## Multi-user and authorization model

GoreeCloud Vault Server is a multi-user service. Stable qualification requires evidence for individual accounts, private-vault isolation, organizations and collections, permission changes, revocation, device/session lifecycle controls, sharing boundaries, and fail-closed authorization independent of private-network membership.

## GoreeCloud Integral Platform Systems

Every release and migration review must evaluate all seven current GoreeCloud Integral Platform Systems:

- **GoreeCloud Manager** — operational, lifecycle, administrative, and health visibility;
- **Privacy Shield** — data minimization, privacy authorization, retention, telemetry, logging, deletion, and privacy-state controls;
- **Wardveil Security** — security policy, trust, protective controls, threat handling, and evidence;
- **Everkeep** — backup, restore, rollback, preservation, migration, portability, and continuity;
- **Glaze UI** — current GoreeCloud presentation, accessibility, adaptive behavior, and interaction requirements;
- **GoreeCloud Mesh** — governed capability, coordination, and interoperability interfaces where applicable;
- **GoreeCloud Identity** — identity and account integration without collapsing Vault's encryption or application-authorization boundaries.

Current platform state is recorded fail-closed in `goreecloud.platform.yaml`. Missing or unaccepted integration keeps this service nonconformant and non-Stable.

## Glaze UI

Every GoreeCloud-controlled Vault interface must follow the current applicable Stable Glaze UI contract. The server-owned Admin and error surfaces are governed by `docs/GLAZE-UI.md`. The bundled upstream-compatible web vault is transitional and is not a permanent production presentation exception.

The primary GoreeCloud browser experience is planned as **GoreeCloud Vault Web**. Product-wide Glaze UI acceptance remains separate from source-level server-surface validation.

## Security and privacy posture

- Do not invent proprietary cryptography for branding or code-ownership goals.
- Do not use production vault exports, production databases, real credentials, or private user data in tests.
- Do not expose the backend listener directly to the public Internet without an explicitly approved hardened architecture.
- Production images must use immutable release identities.
- Public registration remains closed by default in the reviewed production contract.
- Reusable secrets must remain outside source control and ordinary documentation.
- Stable evidence must remain exact-candidate, privacy-minimized, and fail-closed.

See `SECURITY.md`, `docs/SECURITY-MODEL.md`, and `docs/PRODUCTION-DEPLOYMENT.md`.

## Repository structure

```text
.github/       GitHub Actions, CODEOWNERS, release and security automation
deploy/        reviewed deployment contracts and environment templates
docker/        transitional upstream-compatible image build inputs
docs/          architecture, identity, readiness, recovery, UI and governance records
migrations/    compatibility-sensitive database migrations
scripts/       validation, evidence, migration and release tooling
src/           transitional Rust server runtime plus GoreeCloud-owned server presentation
tests/         compatibility and release-blocking regression coverage
native/        proposed long-term GoreeCloud-owned server boundary when accepted
```

See `docs/REPOSITORY-STRUCTURE.md` before changing a product-defining or compatibility-sensitive boundary.

## Development validation

Run the checks relevant to a change. Important repository-owned validators include:

```bash
python3 scripts/validate-repository-readiness.py
python3 scripts/validate-glaze-ui.py
python3 scripts/validate-evidence-tooling.py
python3 tests/test_collect_target_evidence.py
bash scripts/validate-production-deployment.sh
bash scripts/compat.sh
```

Historical workflow names, evidence filenames, local-storage keys, or other internal identifiers containing `goreevault` may remain temporarily when renaming them could break retained evidence, CI history, user preferences, migration tooling, or compatibility. Such identifiers are legacy implementation details, not current product identity, and should be migrated through controlled follow-up work.

## Upstream provenance

The current transitional runtime derives from **Vaultwarden** (`dani-garcia/vaultwarden`) under AGPL-3.0-only. Required license, copyright, attribution, and source-availability obligations remain intact. Upstream provenance does not make Vaultwarden or the retired GoreeVault name the current GoreeCloud product identity.

GoreeCloud Vault Server is not affiliated with or endorsed by Bitwarden, Inc. Bitwarden is a trademark of its respective owner.

## Release boundary

Stable remains blocked until the exact release candidate satisfies the required native-development, security, privacy, accessibility, multi-user, supported-client, WebAuthn/passkey, migration, rollback, target-environment, repository-governance, recovery, Glaze UI, and seven-system platform acceptance gates. No documentation or naming change can waive those requirements.
