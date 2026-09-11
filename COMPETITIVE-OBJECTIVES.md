# GoreeCloud Vault Server Competitive Objectives

These objectives describe the product direction and acceptance standard. They are not claims that every objective is already implemented or accepted.

## 1. Native product ownership without unsafe reinvention

Build the server as original GoreeCloud-owned software while retaining mature cryptographic, protocol, database, runtime, and interoperability foundations only where independent replacement would materially increase risk.

## 2. Zero-knowledge and privacy as architecture

Preserve client-side protection of vault contents, minimize server-visible data, prohibit plaintext shortcuts, keep telemetry off by default, and make privacy-safe logging and retention part of the implementation contract.

## 3. Strong multi-user isolation

Make private-vault isolation, organization/collection authorization, session revocation, and cross-user negative testing release-critical behavior.

## 4. Evidence-backed security through Wardveil Security

Integrate Wardveil Security and require security decisions to be supported by exact-source tests, vulnerability management, trust-boundary review, protective-control evidence, and target-environment evidence rather than branding or assumptions.

## 5. Durable privacy control through Privacy Shield

Integrate Privacy Shield for data minimization, privacy authorization, purpose limits, telemetry and logging boundaries, retention, deletion, and privacy-state evidence. Privacy claims must remain fail closed when the applicable Privacy Shield contract is unaccepted.

## 6. Operational lifecycle control through GoreeCloud Manager

Integrate GoreeCloud Manager for the applicable operational, administrative, lifecycle, health, inventory, and management boundary without letting management authority bypass Vault authentication, zero-knowledge protection, or application authorization.

## 7. Recoverability as a product feature through Everkeep

Integrate Everkeep so backup, restore, rollback, portability, continuity, and destructive recovery proof are part of release quality, not emergency-only operations.

## 8. GoreeCloud-native experience through Glaze UI

Provide GoreeCloud-owned Glaze UI client and server surfaces with strong accessibility, adaptive layout, privacy, and consistent interaction behavior.

## 9. Safe identity and governed private networking

Use GoreeCloud Identity for production identity integration and GoreeCloud Mesh where applicable for governed private connectivity and interoperability, while keeping network reachability separate from application authorization and vault-encryption authority.

## 10. Controlled compatibility transition

Maintain sufficient Vaultwarden/Bitwarden-compatible behavior during migration to protect users and interoperability, but do not preserve inherited product architecture as the long-term implementation target.

## 11. Exact-artifact release discipline

Bind source, release candidate, image, migration, recovery, governance, client, platform-system, and approval evidence to exact artifacts. Green CI alone must never imply Stable or production approval.

## 12. Minimal supply-chain surface

Prefer standard-library and narrowly reviewed dependencies, immutable pins, deterministic evidence, least-privilege CI, and explicit dependency ownership.

## Success criteria

The competitive objectives are satisfied only when the native server and required clients have independent acceptance evidence for their applicable functionality and the complete GoreeCloud Stable gate set. All seven Integral Platform Systems — GoreeCloud Manager, Privacy Shield, Wardveil Security, Everkeep, Glaze UI, GoreeCloud Mesh, and GoreeCloud Identity — remain independently fail closed until their applicable contracts accept the implementation. Until then, the project remains an active Development candidate rather than a Stable product.
