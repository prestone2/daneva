# Current implementation

The project is a frontend-only React, TypeScript and Vite website. All eight public routes are prerendered for static hosting and hydrated for navigation and interactions.

The site includes the supplied Daneva logo, generated service imagery, automatic hero carousel, interactive OpenStreetMap city connections, scroll reveals, reduced-motion support, branded loading states, contact form and four-step freight quote form.

Enquiries use FormSubmit exclusively. The client has not yet confirmed the receiving mailbox, so submission remains unconfigured until `VITE_FORMSUBMIT_RECIPIENT` is supplied. Validation, review and telephone contact remain available.

The former API, database, migrations, email worker, server configuration and associated tests and operational documents have been removed. Build and preview scripts are development/static-generation tools, not an application backend.

See README.md for commands, docs/FORMSUBMIT.md for email setup, docs/DEPLOYMENT.md for static hosting, and docs/MAPS.md for map behavior.
