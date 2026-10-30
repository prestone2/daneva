# Daneva website

A React and TypeScript freight and logistics website with eight prerendered pages, a photo carousel, interactive regional map, and responsive enquiry forms. The project is frontend-only. Contact messages and freight quote requests use FormSubmit.

## Development

```sh
npm ci
npm run dev
```

Set the client-approved receiving email or activated FormSubmit token as `VITE_FORMSUBMIT_RECIPIENT` in `.env.local` and rebuild to enable submissions. Until the recipient is confirmed, forms allow enquiry preparation and direct visitors to the telephone contact. See [FormSubmit setup](docs/FORMSUBMIT.md).

## Checks and builds

- `npm test`: frontend validation, forms, submission, route and SEO tests.
- `npm run build`: typecheck and prerender all pages to `dist/`.
- `npm run preview`: serve the generated static site and security headers locally.
- `npm run verify:built`: check generated HTML, assets, metadata, sitemap and headers.
- `npm run test:browser`: browser and accessibility checks; set `CHROME_BIN` to an installed Chrome if needed. Form submissions are mocked.
- `npm run build:production`: requires the approved HTTPS `VITE_SITE_URL`.
- `npm run measure:build`: measure generated assets.
- `npm run assets:prepare`: regenerate supplied-logo derivatives.
- `npm run verify:deployment`: check the static Nginx template in an isolated container using an existing local Nginx image.

A blank `VITE_SITE_URL` produces a noindex preview. Publish the generated `dist/` directory. See [static deployment](docs/DEPLOYMENT.md), [maps](docs/MAPS.md), and [launch checklist](LAUNCH_CHECKLIST.md).
# daneva
