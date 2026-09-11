#!/usr/bin/env python3
"""Source-level GoreeCloud Vault Server Glaze UI and current identity checks."""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ADMIN_BASE = ROOT / "src/static/templates/admin/base.hbs"
ADMIN_LOGIN = ROOT / "src/static/templates/admin/login.hbs"
ADMIN_JS = ROOT / "src/static/scripts/admin.js"
ADMIN_CSS = ROOT / "src/static/scripts/admin.css"
ERROR_TEMPLATE = ROOT / "src/static/templates/404.hbs"
ERROR_CSS = ROOT / "src/static/scripts/404.css"
EMAIL_HEADER = ROOT / "src/static/templates/email/email_header.hbs"
EMAIL_FOOTER = ROOT / "src/static/templates/email/email_footer.hbs"
EMAIL_FOOTER_TEXT = ROOT / "src/static/templates/email/email_footer_text.hbs"
GLAZE_DOC = ROOT / "docs/GLAZE-UI.md"
READINESS_DOC = ROOT / "docs/PRODUCTION-READINESS.md"


def read(path: Path) -> str:
    if not path.is_file():
        raise AssertionError(f"required file is missing: {path.relative_to(ROOT)}")
    return path.read_text(encoding="utf-8")


def require(text: str, needle: str, label: str) -> None:
    if needle not in text:
        raise AssertionError(f"{label}: missing {needle!r}")


def reject(text: str, needle: str, label: str) -> None:
    if needle.lower() in text.lower():
        raise AssertionError(f"{label}: forbidden current presentation {needle!r}")


def validate_local_dependencies(template: str, css: str, label: str) -> None:
    patterns = (
        re.compile(r"<script\b[^>]*\bsrc=[\"']https?://", re.I),
        re.compile(r"<link\b[^>]*\bhref=[\"']https?://[^\"']+[\"'][^>]*stylesheet", re.I),
        re.compile(r"@import\s+(?:url\()?\s*[\"']?https?://", re.I),
        re.compile(r"url\(\s*[\"']?https?://", re.I),
    )
    if any(pattern.search(template + "\n" + css) for pattern in patterns):
        raise AssertionError(f"{label}: remote presentation dependency is forbidden")


def validate_email_dependencies(text: str) -> None:
    patterns = (
        re.compile(r"<script\b", re.I),
        re.compile(r"<img\b[^>]*\bsrc=[\"']https?://", re.I),
        re.compile(r"(?:@import|url\()[^\n]*https?://", re.I),
    )
    if any(pattern.search(text) for pattern in patterns):
        raise AssertionError("GoreeCloud Vault email: remote/tracking presentation dependency is forbidden")


def main() -> None:
    admin_base = read(ADMIN_BASE)
    admin_login = read(ADMIN_LOGIN)
    admin_js = read(ADMIN_JS)
    admin_css = read(ADMIN_CSS)
    error_template = read(ERROR_TEMPLATE)
    error_css = read(ERROR_CSS)
    email_header = read(EMAIL_HEADER)
    email_footer = read(EMAIL_FOOTER)
    email_footer_text = read(EMAIL_FOOTER_TEXT)
    glaze_doc = read(GLAZE_DOC)
    readiness = read(READINESS_DOC)

    require(admin_base, "GoreeCloud Vault Server Admin", "admin shell identity")
    require(admin_login, "Sign in to GoreeCloud Vault Server Admin", "admin sign-in identity")
    require(error_template, "GoreeCloud Vault Server", "404 identity")
    for text, label in ((admin_base, "admin shell"), (admin_login, "admin sign-in"), (error_template, "404 shell")):
        reject(text, "GoreeVault Server", label)
        reject(text, ">Vaultwarden<", label)
        reject(text, "github.com/dani-garcia/vaultwarden", label)

    require(admin_base, 'content="noindex,nofollow,noarchive"', "admin robots policy")
    require(admin_base, 'content="same-origin"', "admin referrer policy")
    require(admin_base, 'href="#gv-main"', "admin skip link")
    require(error_template, 'content="noindex,nofollow,noarchive"', "404 robots policy")
    require(error_template, 'content="same-origin"', "404 referrer policy")
    require(error_template, 'tabindex="-1"', "404 focus target")

    require(email_header, "<title>GoreeCloud Vault</title>", "email document identity")
    require(email_header, ">GoreeCloud Vault</div>", "email visible identity")
    require(email_footer, "GoreeCloud Vault", "email footer identity")
    require(email_footer_text, "GoreeCloud Vault · GoreeCloud", "plain email identity")
    for text, label in ((email_header, "email header"), (email_footer, "email footer"), (email_footer_text, "plain email footer")):
        reject(text, "GoreeVault", label)
        reject(text, "Vaultwarden", label)
    validate_email_dependencies(email_header + email_footer)

    # Compatibility key remains legacy internal state until a separate safe migration.
    require(admin_js, 'THEME_STORAGE_KEY = "goreecloud-goreevault-theme"', "legacy local preference key")
    require(admin_js, 'new Set(["system", "light", "dark"])', "appearance modes")
    require(admin_js, 'removeItem(THEME_STORAGE_KEY)', "System appearance reset")

    for css, label in ((admin_css, "admin CSS"), (error_css, "404 CSS")):
        require(css, "min-block-size: 2.75rem", f"{label} minimum target")
        require(css, ":focus-visible", f"{label} focus")
        require(css, "prefers-reduced-motion", f"{label} reduced motion")
        require(css, "prefers-contrast: more", f"{label} contrast")
        require(css, "forced-colors: active", f"{label} forced colors")
        require(css, "@supports not (backdrop-filter", f"{label} solid fallback")

    validate_local_dependencies(admin_base + admin_login, admin_css, "Vault Server Admin")
    validate_local_dependencies(error_template, error_css, "Vault Server 404")

    require(glaze_doc, "GoreeCloud Vault Web", "current browser client name")
    require(glaze_doc, "temporary development divergence", "transitional browser boundary")
    require(glaze_doc, "No production Glaze UI exception is approved", "exception boundary")
    require(glaze_doc, "Stable product readiness is blocked", "Stable blocker")
    require(readiness, "A green source build is necessary but is not production authorization", "release boundary")
    require(readiness, "Stable is therefore blocked", "Stable blocked state")

    print("GoreeCloud Vault Server Glaze UI and current identity validation passed.")


if __name__ == "__main__":
    main()
