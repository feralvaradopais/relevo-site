# Agent instructions

## Sources of truth

- This repository is the implementation source of truth for the Relevo Studio production website.
- `relevo-studio-os` is the strategic source of truth for positioning, product architecture, brand strategy, and business context.
- [`context/relevo-strategy.md`](context/relevo-strategy.md) is the required website-specific strategic brief.
- [`context/website-experience-brief.md`](context/website-experience-brief.md) is the required experience brief. Read it before proposing homepage structure, motion architecture, 3D concepts, conversion flows, messaging, copy, or major interaction patterns.
- [`context/technical-architecture-v1.md`](context/technical-architecture-v1.md) is the approved v1 technical direction. Read it before scaffolding the app, adding rendering or animation dependencies, changing the Scene Lab approach, or proposing a different production stack.
- [`context/homepage-storyboard-v1.md`](context/homepage-storyboard-v1.md) is the approved six-act homepage copy, narrative architecture and cinematic direction for the keyframe phase and next Scene Lab iteration. Read it before changing chapter structure, copy, visual materials, camera / transition choreography, particle behavior, mobile composition, evidence behavior or Scene Lab quality criteria.
- [`design-system/`](design-system/) is the visual source of truth. Inspect its README, relevant docs, tokens, and Claude Design reference before building UI.
- Canonical values live in `design-system/tokens/tokens.css`; preserved Claude Design files under `design-system/reference/` are inspection material, not production code.
- The handoff has documented inconsistencies in `design-system/UNRESOLVED.md`. If canonical docs, tokens, and visual reference disagree, surface the conflict instead of guessing.

## Strategic implementation

- Relevo Studio is an AI-native systems studio that designs intelligent operational systems connecting people, tools, data, workflows, and customer conversations.
- Preserve the core idea: "Relevo designs intelligent systems for organizations in motion."
- The first website is primarily a premium credibility artifact and experiential proof for prospects arriving from outreach, proposals, referrals and demos.
- Do not position Relevo as a traditional consultancy, software factory, chatbot agency, generic AI automation shop, AI hype brand, or content agency.
- Favor operational problems, outcomes, systems, evidence, and clarity over feature catalogs or abstract AI language.
- Preserve the commercial pattern: inspect first, find the real point of friction, design a system, demonstrate concretely, and deliver working capability rather than stopping at a presentation.
- Do not create a generic service catalog or Products section by default. The v1 homepage sells the studio capability.
- Workieo must not be mentioned anywhere on the public Relevo Studio website.
- Serchi and Cauvia remain absent from the v1 public homepage unless explicitly approved later.
- `Relevo Engage` is historical context only and must not be used as a current customer-facing brand.
- Do not invent the public relationship between Cauvia and Relevo Studio.
- The current homepage direction uses **six cognitive acts** and one continuous visual world. The approved six-act copy is frozen in `context/homepage-storyboard-v1.md`. Exact production geometry, keyframe artwork, scroll distances, particle counts, shader implementation and final agent UX remain open until explicitly approved.

## Experience direction

- The core narrative is **complexity becoming a working system**.
- The approved cinematic progression is: **WORLD → DISASSEMBLY → INSPECTION → REORGANIZATION → VERIFICATION → RESOLVED WORLD**.
- The current homepage storyboard resolves this into **six cognitive acts** with roughly 12–16 internal cinematic beats. Do not turn every cinematic beat into a separate section or headline.
- The approved opening is **“Hacer ligero lo que pesa.”**
- The experience must feel like one film controlled by scroll, not a sequence of unrelated animated sections.
- The visual language is deliberately limited to three materials:
  - **WORLD** — atmospheric digital landscape, topography, aerial sculptural forms, haze and environmental light;
  - **MATTER** — persistent particle material used for terrain, fragmentation, friction, flows, structures and reconstruction;
  - **OPTICS** — restrained lensing, refraction, focus, halo and depth used to reveal hidden structure.
- The hero direction is an original dark digital landscape with abstract aerial forms loosely reminiscent of balloons. Do not create literal Cappadocia photography or colourful tourism balloons.
- The hero must physically reveal that it is built from particle matter as the experience enters Act 02. Do not fade to a separate particle scene.
- Act 03 uses an abstract optical inspection lens to reveal the real structural gap. Do not create a literal detective magnifying glass.
- Act 04 is the primary cinematic climax: the same particle matter reorganizes into a coherent working system and morphs through abstract configurations corresponding to agent, tool, flow and data layer without becoming four literal icons.
- Act 05 deliberately lowers spectacle and proves the system through repeated successful signals, then leaves it operating.
- Act 06 reconstructs a lighter, calmer version of the hero world and integrates the conversational interface into the final composition.
- Dala is the primary reference for the grammar and ambition of the experience, not for Relevo's identity or source assets.
- It is acceptable to reinterpret Dala-like mechanics such as a persistent particle world, spatial depth, morphing particle forms, reversible scroll-scrubbed transitions, cinematic pacing, strong negative space, quiet evidence moments, and a final visual resolution into the conversion experience.
- Never copy Dala source code, proprietary assets, exact models, exact geometry, exact object sequence, exact choreography, timings, camera paths, composition, copy, typography, page structure, or its characteristic triangle particle primitive.
- Avoid unrelated visual tricks. Every major motion idea should support the systems narrative or the emotional pacing of the page.

## Visual implementation

- Do not invent or alter colors, typography, spacing, radii, shadows, layout conventions, motion values, or brand geometry without explicit approval.
- Preserve the semantic distinction between identity and action colors. Pink `#B62C64` is the action/CTA/focus color. Purple and teal are identity colors and must not casually replace it. Pink never appears in the logo.
- The public website is dark-first. Light mode is reserved for product, documentation, and stationery unless explicitly approved otherwise.
- One chroma should dominate each screen; keep all others below 10% of its area. Gradients are for section entries and closings, not content backgrounds.
- Use the 4px spacing scale except where an approved component specifies a literal optical value. Follow the 12-column/1140px layout rules and do not introduce intermediate breakpoints without approval.
- Preserve the logo's ring order and geometry. Do not modify approved assets in `public/brand/` without explicit instruction.
- Use Plus Jakarta Sans for display and Hanken Grotesk for body/UI roles at the approved weights. Production fonts must eventually be self-hosted WOFF2 with `font-display: swap`, not loaded from Google Fonts.
- Functional icons use a 24px grid, 1.75px rounded strokes, `currentColor`, and no emoji or solid fill except approved active states.
- Photography, if used, should show real work and operations, not generic office stock, robots, circuits, holograms, or fabricated charts.
- Any generated visual reference is art-direction material only. Production DOM typography, navigation, buttons, spacing and color use must follow Festa, not image-generator inventions.

## Approved technical direction

- Build the production site with **Next.js + TypeScript**.
- Use **Three.js directly** for the persistent WebGL scene. Do not introduce React Three Fiber unless an explicit later decision changes the architecture.
- Use **custom GLSL** when it materially improves GPU-driven particle morphing or another visual behavior; do not shader-ize simple effects without reason.
- Use **GSAP + ScrollTrigger** as the primary narrative timeline and scroll-scene orchestration layer.
- Use **CSS Modules / scoped plain CSS** driven by canonical Relevo design tokens. Do not introduce Tailwind by default.
- Treat **Vercel** as the intended initial production deployment target.
- **Lenis is deferred** until native scrolling and ScrollTrigger work correctly; do not add it merely because smooth-scroll is fashionable.
- Do not add overlapping visual stacks such as Spline, Rive, Framer Motion or extra particle libraries without a concrete requirement and explicit approval.
- Higgsfield or similar generative video tools may be used only for creative previsualization/reference, not as the production renderer for the interactive scene.

## Scene Lab first

- Do not begin by building the complete homepage.
- The first implementation milestone remains an isolated `experiments/particle-scene/` Scene Lab that proves the core visual engine and interaction quality.
- The next iteration should specifically prove the storyboard transitions rather than optimize “cool particles” in isolation:
  - hero world revealing particle matter;
  - operational friction through particle behavior;
  - abstract inspection lens revealing the structural gap;
  - coherent Act 04 system morph / reorganization;
  - quiet verification state that continues operating;
  - pullback that reconstructs the final world;
  - reversible scroll behavior;
  - mobile and reduced-motion variants.
- Before asking a coding agent to implement the entire cinematic sequence, create and approve six static keyframes from the same visual film: Hero World, Friction / Fragmentation, Inspection Lens / Structural Gap, Working System / Morph Climax, Verified System, and Resolved World / Conversation.
- Integrate the visual engine into Next.js only after the Scene Lab reaches the quality gates defined in both `context/technical-architecture-v1.md` and `context/homepage-storyboard-v1.md`.
- Do not hide a mediocre scene behind more sections, cards, copy, postprocessing or effects.

## Motion architecture and accessibility

- The intended experience should be designed around a persistent visual scene, not a stack of independent section animations.
- Important visual states should be mappable continuously to normalized scroll or chapter progress and reversible when users scroll backward.
- Keep semantic text and interactive content in the DOM rather than baking critical content into a 3D canvas.
- Choreograph intensity. Act 04 is the main spectacle peak; Act 05 deliberately becomes quieter; Act 06 reopens the world.
- Respect `prefers-reduced-motion`; reduced-motion behavior is mandatory and must preserve the story rather than merely disable everything.
- Mobile is a first-class composition, not a shrunken desktop scene.
- Existing motion tokens and keyframes describe approved motion language but do not define every scene implementation detail.
- The signature easing is `cubic-bezier(.25,1,.5,1)`. Overshoot and bounce are limited to state micro-interactions, never credibility-critical sections.
- Avoid unnecessary allocations in the render loop and design for explicit GPU resource lifecycle, device-pixel-ratio caps and quality tiers.

## AI-assisted development workflow

- Claude Code is the preferred primary builder for the initial Scene Lab and heavy visual implementation. Model selection is operational and may change without changing the architecture.
- Cursor is appropriate for fast local visual iteration, code navigation and targeted implementation changes.
- Codex or another independent coding agent may be used to audit major milestones, especially WebGL architecture, performance, shader/buffer design, mobile degradation, accessibility, bundle boundaries and later agent/server security.
- No coding agent may override repository sources of truth merely because it can generate a plausible alternative.
- Coding agents should not invent major art direction while implementing the cinematic sequence. Use approved keyframes and `context/homepage-storyboard-v1.md` as visual / narrative constraints.

## Conversion experience

- The preferred primary conversion is an intelligent Relevo conversation, with a conventional contact path as fallback.
- The current approved final-scene copy begins with **“Hay una parte de tu operación que podría estar funcionando mucho mejor. Encontrémosla.”**
- The public agent should behave like a lightweight discovery experience: ask about the process, people, tools, manual work, volume, friction and desired outcome; summarize what it understood; and propose a cautious system hypothesis rather than pretending to know a definitive solution.
- The final agent should not feel like a generic floating chatbot in the corner. It should become the primary interface of the resolved world in Act 06.
- A future proposal-aware mode may explain a specific approved proposal using a secure non-guessable link or token and strict context isolation.
- Do not treat a sequential quotation number as sufficient access control.
- The proposal-aware mode is future scope and must not block the first visual prototype.

## Content and proof

- Write in direct, specific LATAM Spanish: short sentences, concrete verbs, operational outcomes, no hype or generic AI language.
- The preferred copy direction is extremely understandable, close and empathetic. As visual sophistication increases, keep language simpler rather than more abstract.
- The six-act homepage copy in `context/homepage-storyboard-v1.md` is approved. Do not rewrite it casually during visual implementation.
- Avoid claims framed as AI magic, chatbots, passive income, fully autonomous operation, no-code empires, or generic automation.
- Proposal findings can inspire evidence patterns and methodology, but are not automatically public case studies or verified outcome claims.
- Do not publish prospect names, prospect logos, confidential data, identifying proposal metrics, performance claims, or commercial details without explicit approval.
- Do not imply that a proposal, demo or prospect engagement is completed client work unless that status and public permission are explicitly approved.
