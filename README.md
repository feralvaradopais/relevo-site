# Relevo Studio website

Production implementation repository for the Relevo Studio public website.

## Current status

This repository currently contains the approved Relevo Studio Design System v5
“Festa,” its brand assets, strategic website context, an approved v1 experience
brief, and implementation guidance.

The project is now in the **experience-definition / architecture phase**. No
production website framework, WebGL stack, scroll system, animation library, or
page implementation has been initialized yet.

The first visual prototype should be designed from the approved strategic and
experience briefs rather than from framework defaults.

## Repository map

- [`context/relevo-strategy.md`](context/relevo-strategy.md) — concise,
  website-specific strategic context derived from stable Relevo Studio strategy.
- [`context/website-experience-brief.md`](context/website-experience-brief.md) —
  approved v1 website objective, narrative direction, Dala reference grammar,
  particle-system meaning, preliminary narrative acts, evidence principles,
  agent-led conversion direction, and implementation constraints.
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

Canonical strategic context, the experience brief, design docs, and tokens
should guide implementation. Reference files preserve approved visual artifacts
and their original runtime, but are not production source to copy wholesale.

## Website v1 direction

The first public site is intended to be a premium credibility artifact and
experiential proof for prospects arriving from outreach, proposals, referrals
and demos.

The homepage should sell the **Relevo Studio capability**, not a generic service
catalog or product portfolio. Its central narrative is **complexity becoming a
working system**, expressed through a dark, cinematic, particle-led experience
that ends in an intelligent conversational conversion flow.

Dala is the primary reference for the ambition and grammar of the motion
experience, but not for Relevo identity, source code, proprietary assets, exact
models, choreography or page structure.

## Sources of truth

`relevo-studio-os` remains the strategic source of truth for positioning,
product architecture, brand strategy, and business context.

`context/relevo-strategy.md` is the website-facing strategic snapshot.

`context/website-experience-brief.md` is the approved experience-direction
source of truth for the first website.

The Design System in this repository is the visual source of truth, while this
repository itself is the implementation source of truth.
