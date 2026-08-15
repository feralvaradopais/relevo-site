# Agent instructions

## Sources of truth

- This repository is the implementation source of truth for the Relevo Studio
  production website.
- `relevo-studio-os` is the strategic source of truth for positioning, product
  architecture, brand strategy, and business context.
- [`context/relevo-strategy.md`](context/relevo-strategy.md) is the required
  website-specific strategic brief. Read it before proposing site structure,
  messaging, copy, product framing, or narrative decisions.
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
- Do not position Relevo as a traditional consultancy, software factory,
  chatbot agency, generic AI automation shop, AI hype brand, or content agency.
- Favor operational problems, outcomes, systems, evidence, and clarity over
  feature catalogs or abstract AI language.
- `Relevo Engage` is historical context only and must not be used as a current
  customer-facing brand. Its thesis evolved into Cauvia, whose current source of
  truth lives outside this repository.
- Do not invent the public relationship between Cauvia and Relevo Studio; the
  stable strategic context does not define it yet.
- Website audience, primary CTA, final information architecture, service
  taxonomy, portfolio hierarchy, pricing, case studies, and final product
  prominence remain open decisions. Surface them instead of guessing.

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
- Photography should show real work and operations, not generic office stock,
  robots, brains, circuits, holograms, or fabricated charts.

## Motion and accessibility

- Respect `prefers-reduced-motion`; reduced-motion behavior is mandatory.
- Existing motion tokens and keyframes describe the approved motion language,
  but do not define the final technical motion architecture.
- Do not assume CSS scroll timelines are the final website solution. Advanced
  scroll-linked motion or WebGL may be used later, but no architecture or
  production animation stack has been selected.
- The signature easing is `cubic-bezier(.25,1,.5,1)`. Overshoot and bounce are
  limited to state micro-interactions, never credibility-critical sections.
- Visual spectacle must reinforce the systems narrative rather than obscure the
  value proposition.

## Content and scope

- Write in direct, specific LATAM Spanish: short sentences, concrete verbs,
  operational outcomes, no hype or generic AI language.
- Prefer concepts such as systems, operations, intelligent workflows,
  operational clarity, decision evidence, qualified conversations, and lead
  recovery when they accurately describe the content.
- Avoid claims framed as AI magic, chatbots, passive income, fully autonomous
  operation, no-code empires, or generic automation.
- Dala is a future experience/motion reference only; it is not a source for
  Relevo's visual identity.
- No production framework, styling library, rendering approach, scroll system,
  or animation stack is approved yet. Do not initialize one without instruction.
