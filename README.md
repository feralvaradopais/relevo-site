# Relevo Studio website

Production implementation repository for the Relevo Studio public website.

## Current status

This repository contains the approved Relevo Studio Design System v5 “Festa,”
brand assets, strategic website context, the approved Website Experience Brief
v1, and the approved Technical Architecture v1.

The project is now entering the **Scene Lab / visual-engine prototype phase**.
The first implementation milestone is intentionally not the complete homepage:
it is an isolated particle-scene prototype that must prove the visual quality,
scroll choreography and performance direction before full production integration.

## Repository map

- [`context/relevo-strategy.md`](context/relevo-strategy.md) — concise,
  website-specific strategic context derived from stable Relevo Studio strategy.
- [`context/website-experience-brief.md`](context/website-experience-brief.md) —
  approved v1 website objective, narrative direction, Dala reference grammar,
  particle-system meaning, preliminary narrative acts, evidence principles,
  agent-led conversion direction, and implementation constraints.
- [`context/technical-architecture-v1.md`](context/technical-architecture-v1.md) —
  approved v1 production stack, Scene Lab workflow, particle-engine direction,
  AI-assisted development roles, performance principles and integration gates.
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

Canonical strategic context, the experience brief, technical architecture,
design docs and tokens should guide implementation. Reference files preserve
approved visual artifacts and their original runtime, but are not production
source to copy wholesale.

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

## Selected v1 technical direction

The approved direction is:

- Next.js;
- TypeScript;
- direct Three.js for the persistent WebGL scene;
- custom GLSL where useful for GPU-driven particle behavior;
- GSAP + ScrollTrigger for the reversible narrative timeline;
- CSS Modules / scoped plain CSS using canonical Relevo tokens;
- Vercel as the intended initial production deployment target.

Lenis is intentionally deferred until the experience works correctly with native
scrolling. Additional visual libraries should not be introduced without a
concrete requirement.

The first implementation should be an isolated Scene Lab under an
`experiments/particle-scene/` direction. The visual engine should be integrated
into the production Next.js application only after it reaches the quality gate
defined in `context/technical-architecture-v1.md`.

Claude Code is the preferred initial builder for the Scene Lab, Cursor may be
used for rapid visual iteration, and an independent coding agent such as Codex
may be used for architecture/performance hardening at major milestones.

Generative video tools such as Higgsfield are optional creative-reference tools,
not part of the production rendering stack.

## Sources of truth

`relevo-studio-os` remains the strategic source of truth for positioning,
product architecture, brand strategy, and business context.

`context/relevo-strategy.md` is the website-facing strategic snapshot.

`context/website-experience-brief.md` is the approved experience-direction
source of truth for the first website.

`context/technical-architecture-v1.md` is the approved technical-direction source
of truth for v1 implementation.

The Design System in this repository is the visual source of truth, while this
repository itself is the implementation source of truth.
