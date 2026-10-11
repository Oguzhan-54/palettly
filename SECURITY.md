# Palettly – Security

The repository is public and the site will be public. Security is a requirement from day one, not a later add-on. Every change must respect this file.

## 1. Threat model

- **No backend and no database in V1.** There is no SQL injection or server-side attack surface. If a backend is ever added, this file must be extended first (parameterized queries only, auth, rate limiting, etc.).
- Main risks in V1: XSS, malicious input via the share link, malicious uploads (fonts, later images), vulnerable dependencies, supply-chain attacks, misconfigured hosting.

## 2. XSS prevention

- Never use `dangerouslySetInnerHTML`, `innerHTML`, `eval`, `new Function`, `document.write`.
- Render all user-controlled text (color labels etc.) only as React text nodes.
- Never put user input into `style` strings, CSS text or `<style>` tags unvalidated. Colors are validated HEX values only; CSS variables are set via `style.setProperty` with validated values.
- Escape user input in every export format (CSS, Tailwind config, JSON, file names).
- Links: external links use `rel="noopener noreferrer"`. No `javascript:` URLs.

## 3. Input validation

- Validate everything with Zod at the boundary: URL hash, uploaded files, imported JSON, clipboard input.
- HEX colors: strict regex, normalized. Fonts: only IDs from the whitelist. Labels: max length, allowed character set.
- Share link: max length, versioned schema, unknown fields dropped, invalid data falls back to defaults. Never trust the hash.
- Never use `JSON.parse` results without schema validation.

## 4. Uploads (V2/V3, local only)

- Files are processed in the browser only and never sent anywhere.
- Fonts: allow `.woff2`, `.ttf`, `.otf` only. Check extension **and** magic bytes. Size limit (e.g. 2 MB). Load via FontFace API.
- Images (V3): allow PNG, JPEG, WebP only. **Block SVG and HTML.** Size and dimension limits. Use object URLs and revoke them after use.
- Reject everything else with a neutral error message.

## 3b. Dependencies and supply chain

- Keep dependencies minimal; prefer well-maintained packages.
- Commit the lockfile. Use `npm ci` in CI.
- Enable Dependabot (security and version updates) and GitHub secret scanning and code scanning.
- Run `npm audit` in CI; fail on high/critical.
- Pin GitHub Actions to commit SHAs. Minimal permissions for workflows.
- No postinstall scripts from unknown packages. Review new dependencies before adding.

## 5. Hosting and HTTP headers

Set these via the host (Cloudflare Pages `_headers` or Vercel config):

- `Content-Security-Policy`: `default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' blob:; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'` (tighten further where possible; avoid `unsafe-inline` for scripts)
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy`: disable camera, microphone, geolocation, etc.
- `Cross-Origin-Opener-Policy: same-origin`
- HTTPS only, HTTP redirects to HTTPS.

## 4b. Privacy

- No analytics, no cookies, no third-party requests (fonts are self-hosted, no CDN).
- No user data is stored or transmitted. localStorage may only hold non-sensitive UI preferences (theme, last palette); wrap access in try/catch.

## 6. Repository hygiene (public repo)

- Never commit secrets, `.env`, tokens or keys. Add `.env*` to `.gitignore`.
- Use GitHub secret scanning and push protection.
- Add a `SECURITY.md` disclosure section (or GitHub Security Advisories) so researchers know how to report issues.
- Protect `main`: pull requests, required checks (lint, typecheck, test, audit), no force pushes.

## 7. Review checklist (before every release)

- [ ] No `dangerouslySetInnerHTML` / `eval` / `innerHTML` in the codebase
- [ ] All external input goes through Zod validation
- [ ] Exports escape user-controlled strings
- [ ] CSP and security headers verified (e.g. securityheaders.com)
- [ ] `npm audit` clean (no high/critical)
- [ ] No secrets in repo or history
- [ ] Upload validation tests pass (if uploads exist)
- [ ] Dependabot and secret scanning enabled

## 8. Reporting a vulnerability

Please do **not** open a public issue for security problems. Report them privately via GitHub Security Advisories: https://github.com/Oguzhan-54/palettly/security/advisories/new

Include a description, steps to reproduce and the affected version or commit. You will get a response as soon as possible; please allow time for a fix before disclosing publicly.
