# Website photography

The website uses client-supplied Daneva fleet and yard photographs received in November 2026. Eight selected photographs appear across the home carousel, service cards, internal banners, company and safety sections, and fleet gallery.

Original JPG/WhatsApp files are preserved. Optimised, correctly oriented WebP copies live in `client/`; regenerate them with `node scripts/prepare-client-photos.mjs`. Source mappings are recorded in that script, and descriptions are in `src/config/assets.ts`.

The older `daneva-*-generated.jpg` files and `services/` illustrations are retained as archive assets. They are no longer imported by the website. The generation JSON files document those archived concepts.
