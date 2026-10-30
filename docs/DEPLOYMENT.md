# Static website deployment

The site publishes as static files. It has no application server, database, migrations or email worker.

1. Confirm the public domain, contact details, service content and FormSubmit receiving mailbox with the client.
2. Set `VITE_SITE_URL` to the approved HTTPS origin and `VITE_FORMSUBMIT_RECIPIENT` to the approved mailbox or activated FormSubmit token. Public settings are documented in `.env.example` and `deploy/frontend.env.example`.
3. Run `npm ci`, `npm test`, `npm run build:production`, and `npm run verify:built -- --require-indexable --require-forms`.
4. Publish the complete `dist/` directory, including route HTML, hashed assets, sitemap, robots and generated security headers. Do not publish source, environment files or internal documentation.
5. Configure hosting to serve the generated route `index.html` files, with `404.html` and HTTP 404 for unknown routes. The Nginx example is `deploy/nginx/daneva.conf.example`; substitute its domain and certificate paths and include the matching generated `security-headers.conf`.
6. Activate FormSubmit in the receiving mailbox and verify delivery using an explicitly approved test. Automated tests do not send real emails.
7. Verify HTTPS, all routes, mobile navigation, carousel, map, enquiries and metadata on the deployed site.

`npm run preview` serves the build locally. `npm run test:browser` checks layouts and accessibility with mocked submissions. `npm run verify:deployment` optionally syntax-checks the static Nginx example using Docker, an already available `nginx:stable-alpine` image and OpenSSL; it does not deploy the site.

The generated security policy permits local scripts/styles/fonts, OpenStreetMap images and, only when configured, FormSubmit connections. Preserve the generated headers when publishing. Rebuild whenever public settings change. A build without an approved site origin remains a noindex preview.
