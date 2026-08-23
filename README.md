# Relevo Studio website

Production implementation repository for the Relevo Studio public website.

## Current status

This repository contains the approved Relevo Studio Design System v5 “Festa,” brand assets, strategic website context, the approved Website Experience Brief v1, the approved Technical Architecture v1, and the Homepage Storyboard & Motion Direction v1 for the next narrative / cinematic iteration.

The project is in the **Scene Lab / visual-engine prototype phase**. The first implementation milestone is intentionally not the complete homepage: it is an isolated visual-engine prototype that must prove art direction, scroll choreography, continuity and performance before full production integration.

The next creative gate is the six-keyframe art-direction set defined in `context/homepage-storyboard-v1.md`. The next Scene Lab iteration should then be evaluated against those approved visual states rather than optimizing particle effects in isolation.

## Repository map

- [`context/relevo-strategy.md`](context/relevo-strategy.md) — concise, website-specific strategic context derived from stable Relevo Studio strategy.
- [`context/website-experience-brief.md`](context/website-experience-brief.md) — approved v1 website objective, narrative direction, Dala reference grammar, particle-system meaning, evidence principles, agent-led conversion direction, and implementation constraints.
- [`context/technical-architecture-v1.md`](context/technical-architecture-v1.md) — approved v1 production stack, Scene Lab workflow, particle-engine direction, AI-assisted development roles, performance principles and integration gates.
- [`context/homepage-storyboard-v1.md`](context/homepage-storyboard-v1.md) — approved six-act homepage copy plus cinematic direction: world → disassembly → inspection → reorganization → verification → resolved world; visual materials, act states, transitions, keyframe plan, camera / scroll principles, mobile behavior and Scene Lab quality gates.
- [`design-system/`](design-system/) — visual foundations and usage guidance.
- [`design-system/tokens/`](design-system/tokens/) — canonical approved token values.
- [`design-system/docs/`](design-system/docs/) — canonical extracted guidance for color, typography, layout, motion, components, and logo use.
- [`design-system/reference/claude-design-v5/`](design-system/reference/claude-design-v5/) — preserved Claude Design source and inspection-only implementation material.
- [`public/brand/`](public/brand/) — canonical, unmodified SVG exports intended for eventual website use.
- [`AGENTS.md`](AGENTS.md) — repository-wide instructions for coding agents.

Canonical strategic context, the experience brief, homepage storyboard, technical architecture, design docs and tokens should guide implementation. Reference files preserve approved visual artifacts and their original runtime, but are not production source to copy wholesale.

## Website v1 direction

The first public site is intended to be a premium credibility artifact and experiential proof for prospects arriving from outreach, proposals, referrals and demos.

The homepage should sell the **Relevo Studio capability**, not a generic service catalog or product portfolio. Its central narrative is **complexity becoming a working system**, expressed through one dark cinematic world that changes continuously with scroll and ends in an intelligent conversational conversion flow.

The approved storyboard now resolves the homepage into **six cognitive acts**:

1. Relevo;
2. El punto;
3. Lo que realmente pasa;
4. El sistema;
5. La forma Relevo;
6. Conversación.

The approved opening is **“Hacer ligero lo que pesa.”** The approved copy for all six acts lives in `context/homepage-storyboard-v1.md` and should not be casually rewritten during visual implementation.

The visual grammar is deliberately limited to three materials:

- **WORLD** — atmospheric landscape, topography, aerial sculptural forms, haze and environmental light;
- **MATTER** — persistent particle material that can fragment, flow, connect, morph and reconstruct the world;
- **OPTICS** — restrained lensing, focus, refraction and depth used to reveal hidden structure.

The hero direction is an original dark digital landscape with abstract ascending aerial forms loosely reminiscent of balloons, but not literal Cappadocia / tourism imagery. The hero physically reveals itself as particle matter, Act 03 uses an abstract inspection lens to expose the structural gap, Act 04 reorganizes the same matter into a working system, Act 05 proves it works, and Act 06 resolves back into a lighter version of the original world where the conversation begins.

Dala is the primary reference for the ambition and grammar of the motion experience, but not for Relevo identity, source code, proprietary assets, exact models, choreography, timing, camera paths or page structure.

## Keyframe gate

Before implementing the full cinematic sequence, create and approve six static visual keyframes from the same film:

1. **Hero World**;
2. **Friction / Fragmentation**;
3. **Inspection Lens / Structural Gap**;
4. **Working System / Morph Climax**;
5. **Verified System**;
6. **Resolved World / Conversation**.

These are not six independent illustrations. They should share the same world, matter, optics, atmosphere, chroma logic and camera language.

The purpose is to reduce art-direction invention during coding: once approved, the Scene Lab task becomes connecting known visual states into one reversible scroll-driven film.

## Selected v1 technical direction

The approved direction is:

- Next.js;
- TypeScript;
- direct Three.js for the persistent WebGL scene;
- custom GLSL where useful for GPU-driven particle behavior;
- GSAP + ScrollTrigger for the reversible narrative timeline;
- CSS Modules / scoped plain CSS using canonical Relevo tokens;
- Vercel as the intended initial production deployment target.

Lenis is intentionally deferred until the experience works correctly with native scrolling. Additional visual libraries should not be introduced without a concrete requirement.

The first implementation should be an isolated Scene Lab under an `experiments/particle-scene/` direction. The visual engine should be integrated into the production Next.js application only after it reaches the quality gates defined in `context/technical-architecture-v1.md` and `context/homepage-storyboard-v1.md`.

Claude Code is the preferred initial builder for the Scene Lab, Cursor may be used for rapid visual iteration, and an independent coding agent such as Codex may be used for architecture/performance hardening at major milestones.

Generative visual / video tools may be used for creative previsualization and keyframe exploration, not as the production renderer for the interactive scene.

## Sources of truth

`relevo-studio-os` remains the strategic source of truth for positioning, product architecture, brand strategy, and business context.

`context/relevo-strategy.md` is the website-facing strategic snapshot.

`context/website-experience-brief.md` is the approved experience-direction source of truth for the first website.

`context/homepage-storyboard-v1.md` is the approved homepage copy, narrative and cinematic direction for the keyframe phase and next Scene Lab iteration. It does not freeze exact production geometry, keyframe artwork, scroll distances, particle counts, shader implementation or final agent UX.

`context/technical-architecture-v1.md` is the approved technical-direction source of truth for v1 implementation.

The Design System in this repository is the visual source of truth, while this repository itself is the implementation source of truth.
