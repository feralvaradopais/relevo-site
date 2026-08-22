# Agent instructions

## Sources of truth

- This repository is the implementation source of truth for the Relevo Studio
  production website.
- `relevo-studio-os` is the strategic source of truth for positioning, product
  architecture, brand strategy, and business context.
- [`context/relevo-strategy.md`](context/relevo-strategy.md) is the required
  website-specific strategic brief.
- [`context/website-experience-brief.md`](context/website-experience-brief.md) is
  the required experience brief. Read it before proposing homepage structure,
  motion architecture, 3D concepts, conversion flows, messaging, copy, or major
  interaction patterns.
- [`context/technical-architecture-v1.md`](context/technical-architecture-v1.md)
  is the approved v1 technical direction. Read it before scaffolding the app,
  adding rendering or animation dependencies, changing the Scene Lab approach,
  or proposing a different production stack.
- [`context/homepage-storyboard-v1.md`](context/homepage-storyboard-v1.md) is the
  approved narrative and cinematic direction for the next homepage / Scene Lab
  iteration. Read it before changing chapter structure, copy direction, particle
  hierarchy, the persistent visual protagonist, camera / transition choreography,
  mobile composition, evidence behavior, or Scene Lab quality criteria.
- [`design-system/`](design-system/) is the visual source of truth. Inspect its
  README, relevant docs, tokens, and Claude Design reference before building UI.
- Canonical values live in `design-system/tokens/tokens.css`; preserved Claude
  Design files under `design-system/reference/` are inspection material, not
  production code.
- The handoff has documented inconsistencies in
  `design-system/UNRESOLVED.md`. If canonical docs, tokens, and visual
  reference disagree, surface the conflict instead of guessing.

## Strategic implementation

- Relevo Studio is an AI-native systems studio that designs intelligent
  operational systems connecting people, tools, data, workflows, and customer
  conversations.
- Preserve the core idea: "Relevo designs intelligent systems for organizations
  in motion."
- The first website is primarily a premium credibility artifact and experiential
  proof for prospects arriving from outreach, proposals, referrals and demos.
- Do not position Relevo as a traditional consultancy, software factory,
  chatbot agency, generic AI automation shop, AI hype brand, or content agency.
- Favor operational problems, outcomes, systems, evidence, and clarity over
  feature catalogs or abstract AI language.
- Preserve the commercial pattern: inspect first, find the real point of
  friction, design a system, demonstrate concretely, and deliver working
  capability rather than stopping at a presentation.
- Do not create a generic service catalog or Products section by default. The v1
  homepage sells the studio capability.
- Workieo must not be mentioned anywhere on the public Relevo Studio website.
- Serchi and Cauvia remain absent from the v1 public homepage unless explicitly
  approved later.
- `Relevo Engage` is historical context only and must not be used as a current
  customer-facing brand.
- Do not invent the public relationship between Cauvia and Relevo Studio.
- The current homepage direction uses seven cognitive acts and one persistent
  visual protagonist. Final exact copy, public proof, exact agent flow, service
  taxonomy, pricing, geometry, micro-beats and production timings remain open
  decisions. Surface them instead of guessing.

## Experience direction

- The core narrative is **complexity becoming a working system**.
- The conceptual progression is: weight/friction → understanding → orchestration
  → system → evidence → conversation.
- The current homepage storyboard resolves this into **seven cognitive acts** with
  roughly 12–15 internal cinematic beats. Do not turn every cinematic beat into
  a separate section or headline.
- The current opening direction is **“Hay trabajo que no debería costar tanto
  trabajo.”** Treat it as the preferred v1 direction while the supporting copy is
  still being refined through human creative review.
- The visual experience should be carried by one persistent original protagonist,
  internally called **The Relevo Organism**, rather than unrelated hero objects.
- Dala is the primary reference for the grammar and ambition of the experience,
  not for Relevo's identity or source assets.
- It is acceptable to reinterpret Dala-like mechanics such as a persistent
  particle world, spatial depth, morphing particle forms, reversible
  scroll-scrubbed transitions, cinematic pacing, strong negative space, quiet
  evidence moments, and a final visual resolution into the conversion
  experience.
- Never copy Dala source code, proprietary assets, exact models, exact geometry,
  exact object sequence, exact choreography, timings, camera paths, composition,
  copy, typography, page structure, or its characteristic triangle particle
  primitive.
- A brain-like or organic particle sculpture may be explored only as an original
  Relevo asset, not as a reproduction of Dala's sculpture.
- Particles are meaningful generative material, not decoration. They can
  represent work, information, decisions, conversations, actions and knowledge
  becoming coordinated.
- Preserve particle hierarchy: atmospheric particles for depth, larger structural
  particles for the protagonist and a limited number of hero / transfer particles
  for meaningful spatial events. Do not equate sophistication with maximum
  particle count or a homogeneous field of tiny points.
- Avoid unrelated visual tricks. Every major motion idea should support the
  systems narrative or the emotional pacing of the page.

## Visual implementation

- Do not invent or alter colors, typography, spacing, radii, shadows, layout
  conventions, motion values, or brand geometry without explicit approval.
- Preserve the semantic distinction between identity and action colors.
  Pink `#B62C64` is the action/CTA/focus color. Purple and teal are identity
  colors and must not casually replace it. Pink never appears in the logo.
- The public website is dark-first. Light mode is reserved for product,
  documentation, and stationery unless explicitly approved otherwise.
- One chroma should dominate each screen; keep all others below 10% of its area.
  Gradients are for section entries and closings, not content backgrounds.
- Use the 4px spacing scale except where an approved component specifies a
  literal optical value. Follow the 12-column/1140px layout rules and do not
  introduce intermediate breakpoints without approval.
- Preserve the logo's ring order and geometry. Do not modify approved assets in
  `public/brand/` without explicit instruction.
- Use Plus Jakarta Sans for display and Hanken Grotesk for body/UI roles at the
  approved weights. Production fonts must eventually be self-hosted WOFF2 with
  `font-display: swap`, not loaded from Google Fonts.
- Functional icons use a 24px grid, 1.75px rounded strokes, `currentColor`, and
  no emoji or solid fill except approved active states.
- Photography, if used, should show real work and operations, not generic office
  stock, robots, circuits, holograms, or fabricated charts.

## Approved technical direction

- Build the production site with **Next.js + TypeScript**.
- Use **Three.js directly** for the persistent WebGL scene. Do not introduce React
  Three Fiber unless an explicit later decision changes the architecture.
- Use **custom GLSL** when it materially improves GPU-driven particle morphing or
  another visual behavior; do not shader-ize simple effects without reason.
- Use **GSAP + ScrollTrigger** as the primary narrative timeline and scroll-scene
  orchestration layer.
- Use **CSS Modules / scoped plain CSS** driven by canonical Relevo design tokens.
  Do not introduce Tailwind by default.
- Treat **Vercel** as the intended initial production deployment target.
- **Lenis is deferred** until native scrolling and ScrollTrigger work correctly;
  do not add it merely because smooth-scroll is fashionable.
- Do not add overlapping visual stacks such as Spline, Rive, Framer Motion or
  extra particle libraries without a concrete requirement and explicit approval.
- Higgsfield or similar generative video tools may be used only for creative
  previsualization/reference, not as the production renderer for the interactive
  scene.

## Scene Lab first

- Do not begin by building the complete homepage.
- The first implementation milestone is an isolated `experiments/particle-scene/`
  Scene Lab that proves the core visual engine and interaction quality.
- Progress from world/camera/depth → performant particles → original sculpture →
  multiple target states → GPU morphing → reversible scroll timeline → camera
  choreography → mobile/reduced-motion/performance tiers.
- The next Scene Lab iteration must be evaluated against
  `context/homepage-storyboard-v1.md`: particle scale and hierarchy, memorable
  silhouette, meaningful friction behavior, structure-revealing camera movement,
  a strong Act 04 coordination payoff, quiet evidence states and authored mobile
  composition.
- Integrate the visual engine into Next.js only after the Scene Lab reaches the
  quality gates defined in both `context/technical-architecture-v1.md` and
  `context/homepage-storyboard-v1.md`.
- Do not hide a mediocre scene behind more sections, cards, copy or effects.

## Motion architecture and accessibility

- The intended experience should be designed around a persistent visual scene,
  not a stack of independent section animations.
- Important visual states should be mappable continuously to normalized scroll
  or chapter progress and reversible when users scroll backward.
- Keep semantic text and interactive content in the DOM rather than baking
  critical content into a 3D canvas.
- Choreograph intensity. Spectacle, calm, evidence and interaction need distinct
  rhythms.
- Respect `prefers-reduced-motion`; reduced-motion behavior is mandatory and
  must preserve the story rather than merely disable everything.
- Mobile is a first-class composition, not a shrunken desktop scene.
- Existing motion tokens and keyframes describe approved motion language but do
  not define every scene implementation detail.
- The signature easing is `cubic-bezier(.25,1,.5,1)`. Overshoot and bounce are
  limited to state micro-interactions, never credibility-critical sections.
- Avoid unnecessary allocations in the render loop and design for explicit GPU
  resource lifecycle, device-pixel-ratio caps and quality tiers.

## AI-assisted development workflow

- Claude Code is the preferred primary builder for the initial Scene Lab and
  heavy visual implementation. Model selection is operational and may change
  without changing the architecture.
- Cursor is appropriate for fast local visual iteration, code navigation and
  targeted implementation changes.
- Codex or another independent coding agent may be used to audit major
  milestones, especially WebGL architecture, performance, shader/buffer design,
  mobile degradation, accessibility, bundle boundaries and later agent/server
  security.
- No coding agent may override repository sources of truth merely because it can
  generate a plausible alternative.

## Conversion experience

- The preferred primary conversion is an intelligent Relevo conversation, with
  a conventional contact path as fallback.
- The public agent should behave like a lightweight discovery experience: ask
  about the process, people, tools, manual work, volume, friction and desired
  outcome; summarize what it understood; and propose a cautious system
  hypothesis rather than pretending to know a definitive solution.
- The current conversation entry direction is to ask about work that costs more
  effort than it should, not to ask what the visitor wants to automate.
- A future proposal-aware mode may explain a specific approved proposal using a
  secure non-guessable link or token and strict context isolation.
- Do not treat a sequential quotation number as sufficient access control.
- The proposal-aware mode is future scope and must not block the first visual
  prototype.

## Content and proof

- Write in direct, specific LATAM Spanish: short sentences, concrete verbs,
  operational outcomes, no hype or generic AI language.
- The preferred copy direction is extremely understandable, close and empathetic.
  As visual sophistication increases, keep language simpler rather than more
  abstract.
- Balance conceptual cinematic statements with concrete evidence.
- Prefer concepts such as systems, operations, intelligent workflows,
  operational clarity, decision evidence, qualified conversations, and lead
  recovery when they accurately describe the content.
- Avoid claims framed as AI magic, chatbots, passive income, fully autonomous
  operation, no-code empires, or generic automation.
- Proposal findings can inspire evidence patterns and methodology, but are not
  automatically public case studies or verified outcome claims.
- Do not publish prospect names, prospect logos, confidential data, identifying
  proposal metrics, performance claims, or commercial details without explicit
  approval.
- Do not imply that a proposal, demo or prospect engagement is completed client
  work unless that status and public permission are explicitly approved.