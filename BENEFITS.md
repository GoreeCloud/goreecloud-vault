# GoreeCloud Vault Server Benefits

## Original GoreeCloud ownership

The native path provides a clear GoreeCloud-owned implementation boundary rather than treating an inherited application as the permanent product architecture.

This improves the ability to evolve server behavior around GoreeCloud requirements while retaining narrow compatibility and security foundations where replacing them would add risk.

## Explicit migration safety

Vaultwarden-compatible source remains available during development as a controlled compatibility, migration, and rollback baseline. Native functionality can therefore be introduced in reviewed increments instead of requiring an unsafe one-time rewrite.

## Zero-knowledge discipline

The native encrypted-record foundation treats protected data as opaque bytes. It does not add a plaintext shortcut, server-side decryption, content logging, or test dependence on production vault exports.

## Multi-user isolation from the first domain slice

The first native record store is owner-scoped and tests cross-owner negative behavior. Multi-user boundaries are therefore part of the native design rather than a later retrofit.

## Privacy by default

The native foundation has no telemetry, analytics, external integration, network listener, or credential input. Its status surface reports only non-sensitive lifecycle state, and record debug output excludes ciphertext.

## Fail-closed readiness

Source completion cannot silently become production approval. Missing storage, client, recovery, governance, target-environment, or approval gates keep readiness false.

The same is true for every Integral Platform System. GoreeCloud Manager, Privacy Shield, Wardveil Security, Everkeep, Glaze UI, GoreeCloud Mesh, and GoreeCloud Identity remain independently blocked until their applicable contracts accept real implementation and evidence. The repository-root `goreecloud.platform.yaml` is authoritative for those states; a native readiness flag cannot override it.

## Independent validation

The native crate has its own exact-head workflow with a locked dependency graph, formatting, strict linting, tests, build validation, and lifecycle checks.

Passing that workflow proves only the bounded source foundation was validated at the tested revision. It does not establish production, platform, RC, Stable, or native-architecture acceptance.

## Controlled dependency growth

The first native crate has no third-party runtime dependencies. Future dependencies must have an explicit role and review boundary, reducing accidental inheritance of product architecture or unnecessary supply-chain surface.

## Recovery-oriented evolution

Everkeep, migration, rollback, backup, and destructive restore requirements remain explicit production gates. Native development is therefore required to preserve recoverability rather than optimize only for feature parity.

## Continued interoperability path

The transitional compatibility runtime and existing compatibility harness provide a reference for supported client behavior while native protocol support is developed and tested.
