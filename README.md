# [BRAND NAME] — Christian apparel

A responsive English/French landing page and pre-order interest platform for a Christian-inspired clothing launch in Cameroon. Visitors explore sample designs, request personalization or group apparel, and submit their preferences for direct follow-up. No checkout or payments are collected.

## Technology and files

Plain HTML5, CSS3 and vanilla JavaScript with no dependencies or build step. Netlify Forms stores registrations; Netlify Image CDN delivers generated concept imagery at appropriate sizes. Google Fonts supplies Playfair Display, DM Sans and Manrope.

- `index.html`: full landing page, static detectable form, English and French content.
- `styles.css`: responsive design, accessible focus states and reduced-motion support.
- `script.js`: language switching, mobile navigation, product selection, progressive form validation and submission.
- `config.js`: centralized brand name, bilingual tagline and site description, WhatsApp number, email and social URLs.
- `thank-you.html`: bilingual confirmation page after successful submission.
- `img/`: concept and reference product visuals for the 14 featured designs (T-shirts, sweatshirts and hoodies).
- `assets/favicon.svg`: temporary brand monogram.

## Local preview

Use Node.js and the Netlify CLI:

```sh
netlify dev --port 8889
```

Open http://localhost:8889. Use Netlify Dev for image transformations. Forms are captured on a deployed Netlify site, not by opening the HTML as a local file.

## Deployment

Connect this repository to Netlify. No build command is required. The publish directory is the repository root (`.`), defined in `netlify.toml`. The included feature marker enables Forms detection during deployment. The static HTML form is named `apparel-interest-registration` and contains all submitted fields.

After deployment, send a real registration using the published site. Confirm it appears in Netlify → Forms → apparel-interest-registration, including conditional fields and consent values. Check Spam if an expected submission is missing. Notifications can be configured through the dashboard. No extra database or custom backend is needed.

## Brand updates

Edit `config.js` to change the brand name, descriptions, tagline, WhatsApp number and social URLs. Empty contact links display honest editable placeholders rather than broken links. Use full HTTPS social URLs and an international WhatsApp number. `contact.email` is reserved for future published contact details; the site currently offers the registration form for contact.

The configuration updates visible branding and metadata in the browser. For search engines and social crawlers that do not run JavaScript, also update the initial title and metadata in both HTML documents when the final name is selected. Replace the favicon monogram then as well.

Replace generated concept imagery with approved product photography before representing it as production imagery. Current visuals are explicitly labelled as concepts, and all availability, sizing, pricing, timing and fulfilment remain subject to confirmation.

## Registration behavior

Product buttons carry the design, garment and colour preference into the form. Custom and group choices reveal the relevant fields. Hidden conditional fields are disabled and excluded from submissions; values are retained only in the current page so users can change their selection. The form checks each step and every enabled field before URL-encoded submission to Netlify. The thank-you page opens only after a successful HTTP response; network errors preserve entries and allow retrying. No request is stored in local storage.

English/French switching preserves selections and free-text entries. Stable English field values keep dashboard submissions consistent, and the submitted `language` field records the visitor's preference. A no-JavaScript fallback exposes the complete static form with a native POST to the confirmation route.

## Verification

Source files and generated imagery were reviewed. Local build, dev-server and test commands were intentionally not run; the deployment pipeline performs platform validation. Confirm end-to-end Forms capture on the deployed URL before launch.
