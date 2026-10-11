# Palettly – Specification

## 1. Goal

A clean, modern tool for designers. The home page *is* the tool: a long, scrollable preview website with a settings bar fixed at the bottom. Changing colors or fonts updates the whole preview instantly.

Design of the tool itself: clean, modern, neutral (no exotic colors), rounded corners, similar feel to realtimecolors.com but its own identity.

## 2. Layout

- **Desktop:** the settings bar is fixed at the bottom of the viewport. The preview fills the rest and scrolls.
- **Mobile:** the bar is a collapsible menu at the bottom (bottom sheet, opens upward, closable).
- Clicking a preview section selects it (visible outline). The bar then shows an additional tab "Section: <name>" (see 6).

## 3. Colors

### Roles
- **Background** (required)
- **Text** (required)
- **Primary** – buttons, links, hero highlights
- **Secondary** – surfaces, section backgrounds
- **Accent** – badges, icons, small highlights
- **Extra colors:** up to 3 more, added with a "+" button next to the swatches. The "+" is always visible so users discover it. Each extra color has a user-editable label.

Background and Text are freely selectable like any other color.

### Distribution rules
- With only Primary/Secondary/Accent: preview blocks use these three as before.
- When extra colors exist, they are distributed **alternately across similar blocks** (e.g. pricing card 1/2/3, feature cards, team cards).
- **One color per block**, never six colors inside one section.
- Distribution must look intentional; keep text readable on every assigned color (use contrast-aware text color on colored blocks).

### Input
- Color picker, HEX input, validation. Invalid input is rejected and never applied.
- Random palette button (spacebar shortcut, ignored while typing in an input).
- Lock toggle per color so random generation keeps locked colors.

## 4. Fonts

- Two roles: **Heading** and **Body**.
- Source: curated list of ~100-150 popular Google Fonts (self-hosted through Fontsource, Latin subset, WOFF2). List can grow later.
- Only the selected fonts are loaded. Dropdown previews load lazily.
- Own fonts (V2): `.woff2`, `.ttf`, `.otf` upload, processed locally in the browser via the FontFace API, never uploaded to a server.
- Font size controls (V2): global scale, plus per-text-element sizes (heading, subheading, body, caption) and later per selected text.

## 5. Light / Dark mode

- Toggle for the preview.
- The dark palette is **derived automatically** from the light palette (no separate manual editing in V1). Derivation lives in `lib/color` and must be unit tested.
- Contrast must stay valid after derivation.

## 6. Section overrides (V2)

- Global settings apply to all sections.
- Click a section, then use the tab "Section: <name>" in the bar to override colors and fonts for that section only.
- Overrides never leak to other sections. Implementation: CSS variables scoped on the section element.
- "Reset to global" button per section.

## 7. Contrast check

- WCAG AA/AAA ratio shown directly next to relevant color pairs (text on background, text on primary, etc.).
- Display only; no automatic blocking or warnings pop-ups.

## 8. Export

Exports everything the user configured (light and dark values, fonts, extra color labels):
- CSS variables
- Tailwind config
- JSON
- HEX list
- PNG image of the palette

Copy to clipboard and download. Generated output must be escaped/sanitized (labels are user input).

## 9. Share link

- State is encoded in the URL **hash** (`#...`), compact and versioned (`v1`).
- No account, no server, no storage.
- On load every value is validated with Zod: HEX colors by regex, fonts only from the whitelist, labels length-limited and sanitized, max URL length enforced. Invalid or unknown data falls back to defaults.

## 10. Preview sections

Common website sections, in this order (list to be refined; research the most common patterns when building):

1. Navbar
2. Hero with CTA
3. Logo cloud
4. Features / cards
5. Pricing
6. Testimonials
7. Stats
8. Portfolio / gallery
9. Team
10. FAQ
11. Blog cards
12. Contact form (non-functional, no data is sent anywhere)
13. Newsletter signup (non-functional)
14. CTA banner
15. Footer

All placeholder content, no external requests, no tracking. Images are local/generated placeholders.

## 11. Roadmap

- **V1:** colors (3 + extra), heading/body fonts, light/dark, all preview sections, contrast check, export (5 formats), share link, random + lock
- **V2:** section overrides, font sizes per text element, own font upload
- **V3:** upload own images to test in the preview (local only, in-browser)
- **Later:** domain, saved palettes (would need accounts and a backend, so a security review comes first)

## 12. Non-goals (V1)

No backend, no accounts, no analytics, no cookies, no multi-language UI.

## 13. Open points

- Project name: **Palettly** (check domain and GitHub name availability)
- License for the public repo (suggestion: MIT)
