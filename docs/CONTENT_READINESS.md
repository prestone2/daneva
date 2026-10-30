# Content and asset approval register

Phase 3B review of the current source. Existing unverified copy was not silently promoted into verified facts. This register is an internal launch gate, not evidence that operating claims have been independently certified.

| Item | Current presentation/evidence | Required action |
| --- | --- | --- |
| Red logo | Phase 1C handoff identifies `src/assets/brand/danevalogo.png` as approved; exact source preserved | Confirm final production branding sign-off, inspect derived favicons/social card |
| Actual company truck | `src/assets/images/daneva-truck.jpg` still absent | Obtain authentic, licensed landscape photograph; review alt text, crop, responsive sizes and image quality; keep existing fallback meanwhile |
| Other raster assets | `hero.png` is unused; `daneva-logo.png` is a brand presentation sheet, unused as a standalone logo | Preserve sources; never treat these as verified company truck photography |
| Kampala address | `/contact`: Plot 3B, Sembuule Road, Kampala, Uganda; visible approval notice | Client verify address and headquarters status |
| Kenya presence | Mombasa/Nairobi on contact/about/corridor pages | Client verify supplied operational presence and service scope |
| Additional location | Shell Bonje Hill Station, Mombasa–Nairobi Road; no invented office type | Confirm location, office type and postal association before launch |
| Postal address | P.O. Box 41997; no country/type invented | Confirm complete postal address |
| Telephone | +256 703 761117; visible final-approval caveat | Client verify ownership and publication consent |
| Corporate/recipient email | No invented public corporate email; FormSubmit recipient remains unset | Approve and activate the FormSubmit mailbox and confirm the privacy contact |
| Mission/vision | `/about` explicitly labels summaries as subject to approval | Approve summaries and values |
| Container support | Services note says 20ft/40ft support requires confirmation; form expresses a request | Confirm actual supported sizes/handling; no capacity/tonnage assurance is implied |
| Fleet specifications/counts | No counts, models, ages, own-fleet quantities or technical capacities claimed | Obtain evidence before adding any specifics |
| Workshop capabilities | Current fleet copy states general maintenance/readiness principles | Do not infer an owned workshop, equipment or staffing capability |
| Tracking infrastructure | No tracking portal, live GPS, vehicle positions or telematics claim | Obtain evidence before adding |
| Driver training | Copy discusses readiness, rest, fatigue and professional driving principles | Do not claim certified training, named programs or schedules without evidence |
| Insurance | No insurance coverage, underwriter or compensation guarantee published | Confirm actual terms if client requests publication |
| Certification/regulatory status | General regulatory preparation principles; no certification badges or accreditation numbers | Require evidence and approval for any named credential or compliance guarantee |
| Delivery/service claims | Homepage describes reliable freight; services state Kenya–Uganda haulage/Mombasa clearing; no timing/arrival guarantees | Client approve actual service capability and all qualitative claims; no transit time, schedule or guaranteed delivery added |
| Freight schematic | Explicitly schematic, without travel times, distances or vehicle positions | Verify destinations/corridor description; do not treat as navigation or tracking |
| Privacy | Brief processing-purpose notice in configured forms; full policy not finalized | Complete `PRIVACY_DRAFT.md` review before live collection |
| Terms | No invented freight contract/terms page | Client/legal adviser decide what contractual terms are required |

## Asset audit and generation

- Approved source: 2000×2000 PNG, 433021 bytes; SHA-256 `883976b2f595636d010bcb56f626cb1ecd6f3476e93337e9069b40fee4527d5e`.
- Header/footer use responsive 400/600-square lossless WebP derivatives, retaining the existing CSS artwork viewport and reserved dimensions. Source shape/colour/artwork are not redrawn or recoloured.
- JSON-LD logo: 600-square PNG derivative for broad crawler support.
- Social card: real 1200×630 PNG, approved logo plus existing Manrope/navy/red typography and supplied Kenya–Uganda positioning. This is a branded graphic, not company photography. It contains no generated or stock vehicle image.
- PNG 32/64 favicons, 180 Apple touch icon and ICO derive from the full approved wordmark. Their small-size legibility should receive final branding review; no replacement logo symbol is invented.
- `npm run assets:prepare` regenerates branding derivatives from the preserved source and local Manrope font. No network calls or truck generation occur. Sharp is a development dependency.
- Existing unused React/Vite/legacy SVG assets are preserved, not linked as branding. The oversized source PNG, presentation sheet and unused hero raster are not imported into client bundles.
- Manrope Latin variable WOFF2 is locally served with preload and font-display swap. Source TTF and SIL OFL license are preserved; the public license is included. Font sources: official Google Fonts repository and fonts.gstatic.com. Additional scripts/glyph ranges use the sans-serif fallback; no unverified font subsets are fabricated.
- There is no truck photo to optimize or measure. When supplied, create reviewed responsive WebP/AVIF variants and use picture/srcset with the genuine source as fallback, retain hero eager/high-priority loading and lazy editorial images, and verify aspect ratios and crops at the launch widths. Do not add an untested claim that this missing-image work is complete.
