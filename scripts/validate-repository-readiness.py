#!/usr/bin/env python3
"""Validate GoreeCloud Vault Server identity, governance, and readiness contracts."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REQUIRED_FILES = {
    "README.md", "VAULT.md", "BRANDING.md", "CONTRIBUTING.md", "SECURITY.md",
    "FEATURES.md", "FEATURE-ROADMAP.md", "BENEFITS.md", "COMPETITIVE-OBJECTIVES.md",
    "SPECIFICATIONS.md", "USER-MANUAL.md", "goreecloud.platform.yaml",
    "docs/SERVER-IDENTITY.md", "docs/server-identity.json", "docs/GLAZE-UI.md",
    "docs/OPEN-READINESS-BLOCKERS.md", "docs/PRODUCTION-DEPLOYMENT.md",
    "docs/PRODUCTION-READINESS.md", "docs/REPOSITORY-STRUCTURE.md",
    "docs/SECURITY-MODEL.md", "docs/STABLE-EVIDENCE.md", "docs/UPSTREAM.md",
    "docs/WEB-CLIENT-CONTRACT.md", "scripts/validate-glaze-ui.py",
    "scripts/validate-production-deployment.sh", "scripts/validate-stable-evidence.py",
}

class ReadinessError(ValueError):
    pass


def require(condition: bool, message: str) -> None:
    if not condition:
        raise ReadinessError(message)


def read(path: str) -> str:
    return (ROOT / path).read_text(encoding="utf-8")


def validate_files() -> None:
    missing = sorted(path for path in REQUIRED_FILES if not (ROOT / path).is_file())
    require(not missing, f"missing required files: {', '.join(missing)}")
    require(not (ROOT / "GOREVAULT.md").exists(), "retired active product document GOREVAULT.md must not exist")
    for path in (".github/FUNDING.yml", ".github/security-contact.gif", ".github/ISSUE_TEMPLATE/bug_report.yml", ".github/ISSUE_TEMPLATE/config.yml"):
        require(not (ROOT / path).exists(), f"forbidden inherited repository UX exists: {path}")


def validate_identity() -> None:
    readme = read("README.md")
    require(readme.startswith("# GoreeCloud Vault Server\n"), "README must use canonical server heading")
    require("GoreeVault is retired" in readme, "README must record retirement of the former product name")
    require("GoreeCloud Vault Web" in readme and "GoreeCloud Vault CLI" in readme, "README must use current Vault family names")
    require("VAULT.md" in readme, "README must link the current product-family record")
    require("not approved" in readme.lower(), "README must preserve non-Stable boundary")
    require("multi-user" in readme.lower(), "README must preserve multi-user requirement")
    require("GoreeCloud Manager" in readme and "GoreeCloud Mesh" in readme and "GoreeCloud Identity" in readme, "README must evaluate all current platform systems")

    human = read("docs/SERVER-IDENTITY.md")
    require("former product name **GoreeVault** is retired" in human, "server identity must record product retirement")
    require("GoreeCloud Vault Web" in human and "GoreeCloud Vault CLI" in human, "server identity must use current family names")

    try:
        data = json.loads(read("docs/server-identity.json"))
    except json.JSONDecodeError as exc:
        raise ReadinessError(f"invalid server identity JSON: {exc}") from exc
    expected = {
        "schema_version": 2,
        "canonical_name": "GoreeCloud Vault Server",
        "product_family_name": "GoreeCloud Vault",
        "short_name": "Vault Server",
        "repository": "GoreeCloud/goreecloud-vault-server",
        "canonical_service_url": "https://vault.goreecloud.com",
        "former_server_name": "GoreeVault Server",
        "retired_product_name": "GoreeVault",
        "development_model": "forked-to-native-transitional",
        "upstream_project": "Vaultwarden",
        "upstream_repository": "dani-garcia/vaultwarden",
        "design_language": "Glaze UI",
        "security_framework": "Wardveil Security",
        "privacy_framework": "Privacy Shield",
        "continuity_framework": "Everkeep",
        "license": "AGPL-3.0-only",
        "lifecycle": "development",
        "stable_approved": False,
    }
    require(data == expected, "server identity manifest does not exactly match the canonical schema-v2 identity")

    for path in ("src/static/templates/email/email_header.hbs", "src/static/templates/email/email_footer.hbs", "src/static/templates/email/email_footer_text.hbs"):
        text = read(path)
        require("GoreeCloud Vault" in text, f"{path} must present GoreeCloud Vault")
        require("GoreeVault" not in text, f"{path} must not present the retired product identity")


def validate_codeowners() -> None:
    text = read(".github/CODEOWNERS")
    for line in ("/README.md @GoreeCloud", "/VAULT.md @GoreeCloud", "/goreecloud.platform.yaml @GoreeCloud", "/docs/** @GoreeCloud", "/src/** @GoreeCloud", "/tests/** @GoreeCloud", "/scripts/** @GoreeCloud", "/deploy/** @GoreeCloud"):
        require(line in text, f"CODEOWNERS missing {line}")
    require("/GOREVAULT.md @GoreeCloud" not in text, "CODEOWNERS must not treat retired document as current")


def validate_platform_contract() -> None:
    text = read("goreecloud.platform.yaml")
    for token in ("schema_version: '0.2'", "id: goreecloud-vault-server", "product_name: GoreeCloud Vault Server", "product_family: GoreeCloud Vault", "lifecycle: development", "manager:", "privacy_shield:", "wardveil_security:", "everkeep:", "glaze_ui:", "mesh:", "identity:", "glaze_ui_required: '1.3.0'", "status: nonconformant", "stable_approved"):
        if token == "stable_approved":
            continue
        require(token in text, f"platform contract missing {token!r}")
    require(text.count("result: applicable-blocked") >= 7, "all seven current platform systems must remain explicitly blocked until accepted")
    require("No Stable or production-approved release evidence is declared" in text, "platform contract must preserve release boundary")


def validate_security_and_release() -> None:
    security = read("SECURITY.md")
    require("security@goreecloud.com" in security, "SECURITY.md missing private security contact")
    require("https://www.goreecloud.com/security.html" in security, "SECURITY.md missing public security policy")

    readiness = read("docs/PRODUCTION-READINESS.md")
    stable = read("docs/STABLE-EVIDENCE.md")
    blockers = read("docs/OPEN-READINESS-BLOCKERS.md")
    require("Stable is therefore blocked" in readiness, "readiness must explicitly block Stable")
    require("Schema version 2" in stable, "Stable evidence schema-v2 requirement missing")
    require("Status:** Stable blocked" in blockers, "blocker tracker must remain Stable blocked")
    for blocker in ("GitHub repository governance", "Real supported-client matrix", "Real WebAuthn/passkey path", "Target-environment production rehearsal", "Product-wide Glaze UI ownership", "Exact-RC Stable evidence"):
        require(blocker in blockers, f"open readiness tracker missing blocker: {blocker}")


def validate_mutable_images() -> None:
    mutable = re.compile(r"(?:image\s*:\s*|docker\s+(?:pull|run)\s+)[^\s]+:latest\b", re.I)
    for path in ("README.md", "docs/PRODUCTION-DEPLOYMENT.md", "deploy/compose.production.yaml", "deploy/.env.production.example"):
        match = mutable.search(read(path))
        require(match is None, f"{path} contains mutable production image example")


def main() -> int:
    try:
        validate_files()
        validate_identity()
        validate_codeowners()
        validate_platform_contract()
        validate_security_and_release()
        validate_mutable_images()
    except (OSError, UnicodeError, ReadinessError) as exc:
        print(f"Repository readiness validation failed: {exc}", file=sys.stderr)
        return 1
    print("GoreeCloud Vault Server repository readiness validation passed.")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
