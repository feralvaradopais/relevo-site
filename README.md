# Relevo Studio website

Production implementation repository for the Relevo Studio public website.

## Current status

This repository currently contains the approved Relevo Studio Design System v5
“Festa,” its brand assets, strategic website context, and implementation
guidance. It is in the repository/design-system/strategy bootstrap phase: no
website pages or production framework have been initialized.

The web framework, styling system, rendering approach, and animation stack are
intentionally undecided.

## Repository map

- [`context/relevo-strategy.md`](context/relevo-strategy.md) — concise,
  website-specific strategic brief derived from the stable Relevo Studio
  context. Required reading before proposing messaging, site structure, or
  product framing.
- [`design-system/`](design-system/) — visual foundations and usage guidance.
- [`design-system/tokens/`](design-system/tokens/) — canonical approved token
  values.
- [`design-system/docs/`](design-system/docs/) — canonical extracted guidance
  for color, typography, layout, motion, components, and logo use.
- [`design-system/reference/claude-design-v5/`](design-system/reference/claude-design-v5/)
  — preserved Claude Design source and inspection-only implementation material.
- [`public/brand/`](public/brand/) — canonical, unmodified SVG exports intended
  for eventual website use.
- [`AGENTS.md`](AGENTS.md) — repository-wide instructions for coding agents.

Canonical strategic context, design docs, and tokens should guide
implementation. Reference files preserve the approved visual artifact and its
original runtime, but are not production source to copy wholesale.

## Sources of truth

`relevo-studio-os` remains the strategic source of truth for positioning,
product architecture, brand strategy, and business context.

`context/relevo-strategy.md` is a deliberately concise website-facing snapshot
of that stable context. It does not replace `relevo-studio-os` and explicitly
keeps unresolved website decisions open rather than inventing answers.

The Design System in this repository is the visual source of truth for the
website, while this repository itself is the implementation source of truth.
