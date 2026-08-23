# Relevo Studio website

Production implementation repository for the Relevo Studio public website.

## Current status

This repository contains the approved Relevo Studio Design System v5 “Festa,” brand assets, strategic website context, the approved Website Experience Brief v1, the approved Technical Architecture v1, the Homepage Storyboard & Motion Direction v1, the approved nine-state keyframe sequence, and the Claude Code cinematic implementation brief for the next Scene Lab pass.

The project is in the **Scene Lab / visual-engine prototype phase**. The first implementation milestone is intentionally not the complete homepage: it is an isolated visual-engine prototype that must prove art direction, scroll choreography, continuity and performance before full production integration.

The visual direction is now defined by **six cognitive acts and nine approved visual reference states**. The next Scene Lab iteration should connect those states into one reversible film rather than optimize particle effects in isolation.

## Repository map

- [`context/relevo-strategy.md`](context/relevo-strategy.md) — concise, website-specific strategic context derived from stable Relevo Studio strategy.
- [`context/website-experience-brief.md`](context/website-experience-brief.md) — approved v1 website objective, narrative direction, Dala reference grammar, particle-system meaning, evidence principles, agent-led conversion direction, and implementation constraints.
- [`context/technical-architecture-v1.md`](context/technical-architecture-v1.md) — approved v1 production stack, Scene Lab workflow, particle-engine direction, AI-assisted development roles, performance principles and integration gates.
- [`context/homepage-storyboard-v1.md`](context/homepage-storyboard-v1.md) — approved six-act homepage copy plus cinematic direction.
- [`context/homepage-keyframes-v1.md`](context/homepage-keyframes-v1.md) — approved nine-state visual reference sequence; supersedes the earlier six-keyframe planning list while preserving the six cognitive acts.
- [`context/claude-cinematic-brief-v1.md`](context/claude-cinematic-brief-v1.md) — implementation brief for Claude Code: state-by-state targets, transitions, art-direction constraints, scroll/reversibility rules, mobile/reduced-motion requirements and definition of done.
- [`design-system/`](design-system/) — visual foundations and usage guidance.
- [`design-system/tokens/`](design-system/tokens/) — canonical approved token values.
- [`design-system/docs/`](design-system/docs/) — canonical extracted guidance for color, typography, layout, motion, components, and logo use.
- [`design-system/reference/claude-design-v5/`](design-system/reference/claude-design-v5/) — preserved Claude Design source and inspection-only implementation material.
- [`public/brand/`](public/brand/) — canonical, unmodified SVG exports intended for eventual website use.
- [`AGENTS.md`](AGENTS.md) — repository-wide instructions for coding agents.

Canonical strategic context, the experience brief, homepage storyboard, approved keyframe sequence, technical architecture, design docs and tokens should guide implementation. Generated visual references are art-direction material, not production assets or UI source to copy wholesale.

## Website v1 direction

The first public site is intended to be a premium credibility artifact and experiential proof for prospects arriving from outreach, proposals, referrals and demos.

The homepage should sell the **Relevo Studio capability**, not a generic service catalog or product portfolio. Its central narrative is **complexity becoming a working system**, expressed through one dark cinematic world that changes continuously with scroll and ends in an intelligent conversational conversion flow.

The homepage has **six cognitive acts**:

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

The hero physically reveals itself as particle matter, the operation becomes a particle sculpture, Act 03 uses an abstract inspection lens to expose the structural gap, Act 04 reorganizes the same matter into a working system, Act 05 proves it works, and Act 06 resolves back into a lighter version of the original world where the conversation begins.

Dala is the primary reference for the ambition and grammar of the motion experience, but not for Relevo identity, source code, proprietary assets, exact models, choreography, timing, camera paths or page structure.

## Approved keyframe sequence

The six acts are supported by **nine visual reference states**:

1. **KF01 — Hero World**;
2. **KF02 — World Disassembly**;
3. **KF02.5 — Operation Sculpture**;
4. **KF03 — Inspection Lens / Structural Gap**;
5. **KF03.5 — Enter the System**;
6. **KF04 — Build / Reorganization**;
7. **KF05 — Verified System**;
8. **KF05.5 — System Becomes World**;
9. **KF06 — Resolved World / Conversation**.

These are not nine sections and not nine independent illustrations. They are stills from the same film and must share the same world, matter, optics, atmosphere, chroma logic and camera language.

The intermediate states `02.5`, `03.5` and `05.5` make the core transformations legible and continuous:

- world → operation;
- inspection → intervention;
- system → world.

The canonical visual-reference specification lives in `context/homepage-keyframes-v1.md`.

## Local visual references

Expected local convention:

```text
.local-references/relevo-keyframes/
  kf01-hero-world.png
  kf02-world-disassembly.png
  kf02-5-operation-sculpture.png
  kf03-inspection-gap.png
  kf03-5-enter-system.png
  kf04-build-reorganization.png
  kf05-verified-system.png
  kf05-5-system-to-world.png
  kf06-resolved-world.png
```

If these references exist locally, the coding agent should inspect all nine before changing art direction or scene composition.

Generated warning icons, labels, typography and chat UI are not automatically approved production elements. Production UI must follow Festa.

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

The first implementation should be an isolated Scene Lab under an `experiments/particle-scene/` direction. The visual engine should be integrated into the production Next.js application only after it reaches the quality gates defined in `context/technical-architecture-v1.md`, `context/homepage-storyboard-v1.md` and `context/homepage-keyframes-v1.md`.

Claude Code is the preferred initial builder for the Scene Lab, Cursor may be used for rapid visual iteration, and an independent coding agent such as Codex may be used for architecture/performance hardening at major milestones.

The implementation pass should follow `context/claude-cinematic-brief-v1.md` rather than asking the coding agent to invent the cinematic sequence from scratch.

Generative visual / video tools may be used for creative previsualization and keyframe exploration, not as the production renderer for the interactive scene.

## Sources of truth

`relevo-studio-os` remains the strategic source of truth for positioning, product architecture, brand strategy, and business context.

`context/relevo-strategy.md` is the website-facing strategic snapshot.

`context/website-experience-brief.md` is the approved experience-direction source of truth for the first website.

`context/homepage-storyboard-v1.md` is the approved six-act homepage copy, narrative and cinematic direction.

`context/homepage-keyframes-v1.md` is the approved visual-state source of truth for the next Scene Lab pass and supersedes the earlier six-keyframe planning list in the storyboard.

`context/claude-cinematic-brief-v1.md` is the implementation handoff for connecting those visual states into one reversible film.

`context/technical-architecture-v1.md` is the approved technical-direction source of truth for v1 implementation.

The Design System in this repository is the visual source of truth, while this repository itself is the implementation source of truth.