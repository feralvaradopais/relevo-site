# Relevo Studio website

Production implementation repository for the Relevo Studio public website.

## Current status

This repository currently contains the approved Relevo Studio Design System v5
“Festa,” its brand assets, and implementation guidance. It is in the
repository/design-system bootstrap phase: no website pages or production
framework have been initialized.

The web framework, styling system, rendering approach, and animation stack are
intentionally undecided.

## Repository map

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

Canonical docs and tokens should guide implementation. Reference files preserve
the approved visual artifact and its original runtime, but are not production
source to copy wholesale.

## Related source of truth

`relevo-studio-os` remains the strategic source of truth for positioning,
product architecture, brand strategy, and business context. The Design System
in this repository is the visual source of truth for the website.
