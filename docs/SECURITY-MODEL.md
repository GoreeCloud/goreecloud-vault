# GoreeCloud Vault Server Security Model — v0.1.0

## Security posture

GoreeCloud Vault Server v0.1.0 is intentionally conservative. It changes ownership and product surface before it changes security-critical implementation.

**GoreeCloud Vault** is the canonical current product/client family and **GoreeCloud Vault Server** is its backend service. **GoreeVault is retired** as a current product identity. Historical and compatibility-sensitive `GoreeVault`/`goreevault` identifiers may remain only when preservation is necessary for migration, rollback, interoperability, evidence continuity, or historical truth.

## Protected assets

- encrypted vault items
- account encryption metadata
- authentication/session material
- TOTP secrets stored inside encrypted vault items
- passkey and WebAuthn-related records
- SSH/private-key items stored by clients in encrypted vault data
- attachments and Sends
- server RSA/private keys
- database credentials
- administrator credentials
- backups

## Rules

- Never log plaintext vault item content or secrets.
- Never store master passwords.
- Never add server-side plaintext inspection of vault contents.
- Never commit production secrets or `.env` files.
- Keep admin access private where operationally possible.
- Use HTTPS/WSS for every client connection.
- Treat backups as sensitive security material.
- Restore testing is part of backup correctness.
- Dependency and upstream changes require review before production promotion.
- Do not equate canonical naming with authorization to change cryptographic or compatibility-sensitive identifiers.
- Do not claim Wardveil Security, Privacy Shield, Everkeep, GoreeCloud Mesh, GoreeCloud Identity, GoreeCloud Manager, or Glaze UI acceptance without that system's own qualifying evidence.

## Transport security boundary

Production client traffic terminates HTTPS/WSS at the trusted GoreeCloud reverse proxy. The GoreeCloud Vault Server Rocket listener is intentionally HTTP-only behind that boundary and must never be directly exposed to untrusted networks.

Allowed proxy-to-application transport is limited to a trusted local/private path, such as host loopback or an isolated container/VM network. The current Compose baseline publishes the server only on `127.0.0.1:8080`, while an attached trusted reverse proxy may instead use a private service network.

Rocket embedded TLS is disabled in the production dependency graph. This is a deliberate attack-surface reduction, not permission to serve plaintext traffic to clients. CI rejects re-enabling Rocket's `tls` feature or reintroducing the legacy TLS dependency branch that was removed during production hardening.

A deployment is not production-eligible if the backend HTTP listener is bound to a public interface, forwarded directly through NAT/firewall rules, or otherwise reachable by untrusted clients without the trusted TLS proxy.

## Administrative boundary

Application access and infrastructure administration are separate trust planes. Administrative access should use the approved GoreeCloud private-access boundary, including GoreeCloud Mesh where accepted and any currently approved underlying private-network implementation where applicable. The public vault endpoint must not become a general-purpose management path to the host, database, container engine, or backup system.

## v0.1.0 cryptographic scope

No vault cryptographic primitives are replaced in v0.1.0. This includes encryption, key derivation, Argon2 processing, JWT/token signing, WebAuthn behavior and client-side vault cryptography assumptions. Removing Rocket's optional server-side TLS feature changes only the server transport termination boundary; it does not alter Bitwarden-compatible vault cryptography.

## Development environment rule

Use a fresh database and non-production credentials. Do not point v0.1.0 development builds at the current production Vaultwarden data directory or database.
