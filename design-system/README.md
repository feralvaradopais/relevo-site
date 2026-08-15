# Relevo Studio Design System v5 “Festa”

The approved visual source of truth for the Relevo Studio website. The system
is high fidelity: do not reinterpret its colors, typography, spacing, radii,
shadows, logo geometry, or motion values.

## Canonical material

- [`tokens/tokens.css`](tokens/tokens.css) contains the approved design-token
  values.
- [`docs/`](docs/) contains extracted implementation guidance.
- [`../public/brand/`](../public/brand/) contains the canonical, unmodified SVG
  exports for website use.

## Reference material

[`reference/claude-design-v5/`](reference/claude-design-v5/) preserves the
editable Claude Design document, its required generated runtime, and extracted
CSS implementation references. Open the `.dc.html` file directly in a browser
with `support.js` beside it.

Reference HTML and CSS demonstrate the approved look and behavior. They are not
production code and do not select the website framework, scroll system, or
animation architecture.

## Reading order

1. Read [`../AGENTS.md`](../AGENTS.md).
2. Read the relevant file in [`docs/`](docs/).
3. Use [`tokens/tokens.css`](tokens/tokens.css) for literal token values.
4. Inspect the Claude Design source for visual context and sections not covered
   by extracted docs, including iconography, photography, and voice.

The handoff contains unresolved conflicts between the visual source, extracted
docs, and CSS. Review [`UNRESOLVED.md`](UNRESOLVED.md) and do not silently
choose a value when the sources disagree. Known conflicts are intentionally
preserved rather than “corrected” during repository bootstrap.

## Core rules

- The public website is dark-first.
- Pink `#B62C64` is the action color. Purple and teal are identity colors.
- One chroma dominates each screen; other chromas stay below 10% of the area.
- The signature easing is `cubic-bezier(.25,1,.5,1)`.
- Reduced-motion support is mandatory.
- Production fonts must eventually be self-hosted WOFF2 files using the
  approved families and weights.
