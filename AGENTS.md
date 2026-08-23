# Agent instructions

## Sources of truth

- This repository is the implementation source of truth for the Relevo Studio production website.
- `relevo-studio-os` is the strategic source of truth for positioning, product architecture, brand strategy, and business context.
- [`context/relevo-strategy.md`](context/relevo-strategy.md) — required website-specific strategic brief.
- [`context/website-experience-brief.md`](context/website-experience-brief.md) — required experience brief.
- [`context/technical-architecture-v1.md`](context/technical-architecture-v1.md) — approved v1 technical direction.
- [`context/homepage-storyboard-v1.md`](context/homepage-storyboard-v1.md) — approved six-act homepage copy, narrative architecture and cinematic direction.
- [`context/homepage-keyframes-v1.md`](context/homepage-keyframes-v1.md) — approved nine-state visual reference sequence for the next Scene Lab pass. This supersedes the earlier six-keyframe planning list in the storyboard while preserving the six cognitive acts.
- [`context/claude-cinematic-brief-v1.md`](context/claude-cinematic-brief-v1.md) — implementation handoff for the next Claude Code cinematic pass.
- [`design-system/`](design-system/) — visual source of truth. Canonical values live in `design-system/tokens/tokens.css`.
- If approved sources conflict, surface the conflict instead of guessing.

## Strategic implementation

- Relevo Studio is an AI-native systems studio that designs intelligent operational systems connecting people, tools, data, workflows, and customer conversations.
- Preserve the core idea: **Relevo designs intelligent systems for organizations in motion.**
- The first website is primarily a premium credibility artifact for prospects arriving from outreach, proposals, referrals and demos.
- Do not position Relevo as a traditional consultancy, software factory, chatbot agency, generic automation shop, AI hype brand or content agency.
- Favor operational problems, outcomes, systems, evidence and clarity over feature catalogs or abstract AI language.
- Preserve the commercial pattern: inspect first, find the real point of friction, design the system, demonstrate concretely, and deliver working capability rather than stopping at a presentation.
- Do not create a generic service catalog or Products section by default.
- Workieo must not be mentioned publicly.
- Serchi and Cauvia remain absent from the v1 public homepage unless explicitly approved later.
- `Relevo Engage` is historical context only.
- Do not invent the public relationship between Cauvia and Relevo Studio.
- The approved six-act copy is frozen in `context/homepage-storyboard-v1.md`; do not rewrite it casually during visual implementation.

## Experience direction

The homepage has **six cognitive acts** and **nine approved visual target states**.

Act-level progression:

> **WORLD → DISASSEMBLY → INSPECTION → REORGANIZATION → VERIFICATION → RESOLVED WORLD**

Implementation reference sequence:

> **WORLD → DISASSEMBLY → OPERATION → INSPECTION → ENTER SYSTEM → BUILD → VERIFY → SYSTEM BECOMES WORLD → RESOLVED WORLD**

The nine references are not nine sections. They are visual states inside one continuous reversible film.

Approved target sequence:

1. **KF01 — Hero World**
2. **KF02 — World Disassembly**
3. **KF02.5 — Operation Sculpture**
4. **KF03 — Inspection Lens / Structural Gap**
5. **KF03.5 — Enter the System**
6. **KF04 — Build / Reorganization**
7. **KF05 — Verified System**
8. **KF05.5 — System Becomes World**
9. **KF06 — Resolved World / Conversation**

The visual language is limited to three materials:

- **WORLD** — landscape, topography, aerial sculptural forms, haze, depth and environmental light;
- **MATTER** — persistent particles for terrain, fragmentation, friction, structures, transfer and reconstruction;
- **OPTICS** — restrained lensing, refraction, focus, halo and depth used to reveal hidden structure.

Do not introduce unrelated visual tricks.

No generic AI brain, robot, Matrix code, floating SaaS dashboards, random holograms, cyberpunk HUDs, glowing cubes, literal database icons or literal detective magnifying glass.

The hero may use dark abstract aerial forms loosely reminiscent of balloons, but never literal Cappadocia / tourism imagery.

Dala is a reference for grammar and ambition only. Never copy its source code, proprietary assets, exact models, geometry, object sequence, choreography, timings, camera paths, composition, copy, typography, page structure or characteristic particle primitive.

## Local visual references

If present, inspect all nine before changing scene composition or art direction:

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

Generated references are art-direction constraints, not production assets or UI source.

Do not reproduce generated warning icons, labels, `GAP` text, captions, fake HUDs, generated typography, navigation or provisional chat controls.

Production DOM/UI follows Festa.

## Visual implementation

- Do not invent or alter colors, typography, spacing, radii, shadows, layout conventions, motion values or brand geometry without explicit approval.
- Public website is dark-first.
- Pink `#B62C64` is action / CTA / focus; purple and teal are identity colors.
- One chroma should dominate each screen.
- Use Plus Jakarta Sans for display and Hanken Grotesk for body/UI roles at approved weights.
- Use Festa spacing, layout, motion and component rules for DOM/UI.
- Generated final-scene typography and chat UI are composition references only.

## Approved technical direction

- Next.js + TypeScript for production.
- Direct Three.js for the persistent WebGL scene.
- Custom GLSL where it materially improves GPU particle morphing or optics.
- GSAP + ScrollTrigger for the reversible narrative timeline.
- CSS Modules / scoped plain CSS using Relevo tokens.
- Vercel as initial deployment target.
- Lenis remains deferred until native scrolling works correctly.
- Do not add overlapping stacks such as React Three Fiber, Spline, Rive, Framer Motion or extra particle libraries without a concrete requirement and explicit approval.

## Scene Lab first

Do not begin by building the complete homepage.

The immediate milestone remains the isolated `experiments/particle-scene/` Scene Lab.

The next pass must prove:

- KF01 → KF02 world-to-matter reveal;
- KF02 → KF02.5 operation sculpture formation;
- KF02.5 → KF03 inspection without replacing the protagonist;
- KF03 → KF03.5 lens expansion / entering the system;
- KF03.5 → KF04 coherent reorganization;
- KF04 → KF05 spectacle-to-proof settling;
- KF05 → KF05.5 → KF06 system-to-world reconstruction;
- deterministic reversible scroll;
- authored mobile composition;
- reduced-motion behavior;
- production-aware performance.

Follow `context/claude-cinematic-brief-v1.md` for implementation order and review criteria.

Integrate the visual engine into the production Next.js application only after it passes the quality gates in the technical architecture, storyboard and approved keyframe sequence.

Do not hide a mediocre core scene behind more sections, cards, copy, postprocessing or effects.

## Motion architecture and accessibility

- Use one persistent visual scene rather than a stack of independent section animations.
- Map important states continuously to normalized scroll / chapter progress.
- Scrolling upward must reverse major transitions without resets, popping or teleports.
- Keep semantic text and interactive content in the DOM.
- Act 04 is the main spectacle peak; Act 05 deliberately becomes quieter; Act 06 reopens the world.
- `prefers-reduced-motion` is mandatory and must preserve the story.
- Mobile is a first-class composition, not a scaled desktop scene.
- Avoid unnecessary render-loop allocations; use explicit GPU resource lifecycle, DPR caps and quality tiers.

## AI-assisted development workflow

- Claude Code is the preferred primary builder for the initial Scene Lab and heavy visual implementation.
- Cursor is appropriate for fast local visual iteration and targeted changes.
- Codex or another independent coding agent may audit major milestones, especially WebGL architecture, performance, shader/buffer design, mobile degradation, accessibility and later agent/server security.
- No coding agent may override repository sources of truth merely because it can generate a plausible alternative.
- Coding agents must not invent major art direction while implementing the cinematic sequence.

## Conversion experience

- Preferred primary conversion is an intelligent Relevo conversation, with a conventional contact path as fallback.
- Final-scene copy begins with **“Hay una parte de tu operación que podría estar funcionando mucho mejor. Encontrémosla.”**
- The public agent should behave like lightweight discovery: ask about process, people, tools, manual work, volume, friction and desired outcome; summarize what it understood; propose a cautious system hypothesis.
- It should not feel like a generic floating chatbot in the corner. It becomes the primary interface of Act 06.
- Proposal-aware mode is future scope and must not block the visual prototype.

## Content and proof

- Write in direct, specific LATAM Spanish: short sentences, concrete verbs, operational outcomes, no hype.
- Keep language simpler as visual sophistication increases.
- Proposal findings may inspire methodology but are not automatically public case studies or verified outcome claims.
- Do not publish prospect names, logos, confidential data, identifying proposal metrics, performance claims or commercial details without explicit approval.
