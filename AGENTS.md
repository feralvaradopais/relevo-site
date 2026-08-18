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
- Final headline, final chapter order, public case-study permissions, exact agent
  flow, service taxonomy, pricing, and production stack remain open decisions.
  Surface them instead of guessing.

## Experience direction

- The core narrative is **complexity becoming a working system**.
- The conceptual progression is: weight/friction → understanding → orchestration
  → system → evidence → conversation.
- Dala is the primary reference for the grammar and ambition of the experience,
  not for Relevo's identity or source assets.
- It is acceptable to reinterpret Dala-like mechanics such as a persistent
  particle world, spatial depth, morphing particle forms, reversible
  scroll-scrubbed transitions, cinematic pacing, strong negative space, quiet
  evidence moments, and a final visual resolution into the conversion
  experience.
- Never copy Dala source code, proprietary assets, exact models, exact geometry,
  exact object sequence, exact choreography, timings, camera paths, composition,
  copy, typography, or page structure.
- A brain-like or organic particle sculpture may be explored only as an original
  Relevo asset, not as a reproduction of Dala's sculpture.
- Particles are meaningful generative material, not decoration. They can
  represent work, information, decisions, conversations, actions and knowledge
  becoming coordinated.
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
  not define the final technical architecture.
- Do not assume CSS scroll timelines are the final website solution.
- The signature easing is `cubic-bezier(.25,1,.5,1)`. Overshoot and bounce are
  limited to state micro-interactions, never credibility-critical sections.
- No production framework, styling library, WebGL stack, rendering approach,
  smooth-scroll library, scroll system, or animation stack is approved yet. Do
  not initialize one without instruction.

## Conversion experience

- The preferred primary conversion is an intelligent Relevo conversation, with
  a conventional contact path as fallback.
- The public agent should behave like a lightweight discovery experience: ask
  about the process, people, tools, manual work, volume, friction and desired
  outcome; summarize what it understood; and propose a cautious system
  hypothesis rather than pretending to know a definitive solution.
- A future proposal-aware mode may explain a specific approved proposal using a
  secure non-guessable link or token and strict context isolation.
- Do not treat a sequential quotation number as sufficient access control.
- The proposal-aware mode is future scope and must not block the first visual
  prototype.

## Content and proof

- Write in direct, specific LATAM Spanish: short sentences, concrete verbs,
  operational outcomes, no hype or generic AI language.
- Balance conceptual cinematic statements with concrete evidence.
- Prefer concepts such as systems, operations, intelligent workflows,
  operational clarity, decision evidence, qualified conversations, and lead
  recovery when they accurately describe the content.
- Avoid claims framed as AI magic, chatbots, passive income, fully autonomous
  operation, no-code empires, or generic automation.
- Proposal findings can inspire evidence patterns, but are not automatically
  public case studies or verified outcome claims.
- Do not publish client names, confidential data, performance claims, or
  commercial details without explicit approval.
