# Website feedback follow-up

Local revisions based on “Website comments Danver.pdf” (11 November 2026).
The PDF is stakeholder feedback; it does not authorize outreach or publication.

## Implemented

- Homepage reduced to six sections: hero, company introduction, services, routes, fleet, quote CTA.
- Services overview cards, concise service copy, and four What We Carry categories.
- Replaced the imported terminal illustration and clearing illustration with existing client photography. Unused generated source assets are retained but not referenced by page components.
- Routes navigation label, origin-based connection cards, map heading and direction markers. The map remains schematic; existing URLs are preserved.
- Our Team page with driver, mechanic and office sections, without invented profiles or unapproved personal photographs.
- Fleet gallery placed before operational summaries.
- Prominent Send a Quote Request link on Contact, and darker supporting text on light backgrounds.

## Required before completing client review

- Maurine: select and approve actual photos and videos, and coordinate the consent records requested in the feedback. Existing client-supplied images are not evidence of consent.
- Supply separate home and About videos, driver group photography, mechanic/office media and an approved TikTok profile URL. Confirm any named individuals' participation.
- Supply photographs for bagged, bulk and loose cargo. Current category cards use icons rather than unrelated photographs.
- Confirm all truck types and capacities, with corresponding photographs; do not infer these from generated assets.
- Confirm the spelling of the wheat collection facility name supplied as “Bulstream” / “Bulsktream”, plus exact collection addresses. The website currently uses geographic descriptions. Map connections remain schematic rather than verified road geometry.
- Verify Uganda and Kenya physical addresses, postal-address association, phone numbers, email and WhatsApp. Existing supplied details remain marked for approval.
- Supply the quote receiving mailbox/token, configure VITE_FORMSUBMIT_RECIPIENT, activate FormSubmit, rebuild and verify receipt end to end. Online delivery remains unavailable without configuration.
- Confirm company mission/vision and contact details already marked as pending approval in the current site.

No publication, external messages or live form submissions were performed as part of these revisions.

## Verification

- Production bundle and prerender build passed (preview configuration).
- Built-page checks passed for eight public routes and the 404 page.
- All 54 unit/component tests passed.
- Chrome browser checks passed across 81 route/viewport combinations, with 19 accessibility scans and eight routes checked without JavaScript.
- No detected accessibility violations, runtime errors, CSP/console errors or unexpected third-party requests.
- Browser review exposed low-contrast homepage index text and fleet captions; both were darkened and the full browser suite then passed.
- Bagged Cargo and Loose Cargo were added to quote cargo options and contact subjects to match Services.
- Browser form checks exercised the unconfigured state. Configured form behavior is covered by mocked tests; real mailbox receipt remains unverified.

## Routes confirmed — 16 November 2026

The client confirmed three cargo movements:

1. Export cargo from Kampala / Uganda to Mombasa port.
2. Wheat grains from Nairobi (Embakasi) and Mombasa collection facilities to Kampala, in bulk and loose form.
3. Containers and loose cargo from Mombasa port to destinations in Uganda.

Updated the route cards, homepage route summary, About and Services descriptions, route metadata, quote location suggestions and map. The map uses separate coloured connections and direction arrows for exports, wheat and port imports. Nairobi’s marker identifies the Embakasi area; no exact facility address is asserted. The wheat facility name is pending spelling confirmation.

Verification after the route update: build and all 54 tests passed. The full browser suite passed 81 route/viewport checks and 19 accessibility scans without runtime, CSP or accessibility errors. Additional map checks at 375px and 1440px confirmed three visible coloured connections, six arrows, no horizontal overflow and preserved arrows after zooming.
