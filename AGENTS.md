# Project architecture

This is a static HTML/CSS/vanilla JavaScript website with no package manager, framework, server or compilation step. Netlify publishes the repository root. Do not add a framework or custom backend for the existing registration workflow.

## Key files

- `index.html`: semantic landing page and authoritative Netlify Forms HTML definition.
- `styles.css`: cream, charcoal, blush and muted-gold editorial design; breakpoints at 1100, 850 and 600px.
- `script.js`: progressive three-step registration, conditional fields, native validity checks, product preselection, bilingual content and brand hydration.
- `config.js`: public centralized configuration. Never add secrets.
- `thank-you.html`: success page, supports `?lang=fr`.
- `img/`: generated editorial/product concepts, not supplied production photography.
- `.netlify/features/netlify-forms`: deployment feature activation marker; preserve it.

## Conventions and decisions

Use `data-en` and `data-fr` for bilingual copy. Avoid embedding translatable content around elements that JavaScript needs to retain, because language switching replaces the contents of these elements. User-authored text and stable form values must survive language changes. Keep brand/contact/social details in config.js. Initial static metadata remains in HTML for crawlers and must be synchronized when final branding is supplied.

Preserve all form field names and the `apparel-interest-registration` form name. Every submitted field must exist in static HTML. Add conditional required fields using `data-required="true"`; JavaScript enables their validation only when the relevant section is active. Inactive conditional controls are disabled and excluded from payloads, while inactive form steps retain enabled fields for final submission. Use `checkValidity()` and reveal the invalid step before `reportValidity()`.

Submissions use an actual URL-encoded POST to `/`; navigate to `/thank-you` only after an OK response. Keep native POST fallback, honeypot, required contact consent and separately optional unchecked marketing consent. Never simulate success or persist leads in browser storage. Data storage is Netlify Forms; no separate database is required.

Use Netlify Image CDN URLs for generated bitmap assets. Maintain concept labels until owners approve actual product photography. Never invent prices, stock, reviews, delivery coverage or production timelines. Unconfigured external contacts are plain placeholders, not fake anchors.
