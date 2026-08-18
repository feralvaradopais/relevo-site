# Relevo Studio — Technical Architecture v1

## Status

Approved technical direction for the first production website and its visual prototype phase.

This document translates the approved website strategy and experience brief into a concrete implementation approach. It intentionally separates **what is now selected** from **what is deferred until the visual prototype proves the concept**.

Read together with:

- `context/relevo-strategy.md` — strategic positioning;
- `context/website-experience-brief.md` — experience and narrative direction;
- `design-system/` — visual source of truth;
- `AGENTS.md` — repository-wide implementation guardrails.

## 1. Architecture principle

The site should not be implemented as a stack of independent animated sections.

The intended architecture is:

```text
semantic DOM content
        ↓
normalized page / chapter progress
        ↓
scene controller
        ↓
persistent visual world
(camera, particles, geometry, shaders, lighting, morph states)
```

The persistent visual scene is a first-class subsystem. The semantic website and the visual engine should remain decoupled enough that content, accessibility, SEO and the eventual conversational agent do not depend on the 3D renderer.

## 2. Selected production stack

The selected direction for v1 is:

- **Next.js** — production web application framework;
- **TypeScript** — application and visual-engine language;
- **Three.js directly** — WebGL scene and rendering layer;
- **custom GLSL shaders** — particle morphing and other GPU-driven visual behavior where useful;
- **GSAP + ScrollTrigger** — main narrative timeline and scroll-to-scene orchestration;
- **CSS Modules / plain CSS + Relevo design tokens** — UI styling architecture;
- **Vercel** — intended initial hosting and deployment target.

### Why Three.js directly

The main visual experience is expected to be a highly bespoke, persistent scene with particle fields, morph targets, camera choreography and custom shader behavior.

For this first version, direct Three.js is preferred over React Three Fiber so the visual engine can remain explicit, imperative and isolated from React rendering concerns.

This is a project decision, not a claim that React Three Fiber is unsuitable in general. It can be reconsidered only if a concrete implementation need makes it clearly advantageous.

### Why GSAP + ScrollTrigger

The approved experience requires scroll to behave like a reversible timeline rather than a set of one-off viewport triggers.

The scene should be able to map continuous page progress to states such as:

```text
0.00  initial sculpture / world
0.15  opening / destabilization
0.30  dispersion
0.45  flow / transfer
0.60  new coordinated state
0.78  evidence / quiet state
0.92  convergence
1.00  final conversion state
```

Exact states and timings are not approved by this document. The important decision is that the motion system must support continuous, reversible, scroll-scrubbed choreography.

## 3. Deferred / phase-two choices

### Lenis

Lenis is a candidate for smooth scrolling, but it should **not** be introduced until the complete scene works correctly with native scrolling and ScrollTrigger.

Native scroll behavior is the baseline. Smooth scrolling may be added only if it materially improves the experience without harming accessibility, touch behavior or reliability.

### Additional visual libraries

Do not add Spline, Rive, Framer Motion, multiple particle libraries or overlapping animation systems by default.

A new visual dependency should enter the project only when it solves a concrete problem better than the selected stack.

### Blender / 3D authoring

Blender or another 3D authoring tool may be used if original Relevo meshes or particle target surfaces require it.

The website should not depend on external 3D authoring if procedural or shader-generated geometry produces a better and lighter result.

## 4. Scene Lab before the full website

The first implementation milestone is a **Scene Lab**, not the full homepage.

Its job is to prove that Relevo can reach the required visual quality before framework, copy, navigation, evidence modules and the conversational agent are all developed at once.

A reasonable repository direction is:

```text
experiments/
└── particle-scene/
    ├── index.html
    ├── src/
    │   ├── scene/
    │   ├── shaders/
    │   ├── particles/
    │   └── timeline/
    └── assets/
```

The exact internal structure may evolve during implementation.

The Scene Lab should progress in controlled steps:

1. dark visual world, camera and spatial depth;
2. performant particle field;
3. mouse / pointer parallax where appropriate;
4. one convincing original particle sculpture;
5. multiple particle target states;
6. GPU-driven morphing between states;
7. scroll-controlled reversible timeline;
8. camera choreography and visual transitions;
9. performance tiers, mobile composition and reduced-motion behavior;
10. only then integrate the proven visual engine into the production Next.js site.

The key quality gate is not feature completion. It is whether the prototype reaches the premium, cinematic standard defined in the experience brief.

## 5. Particle architecture direction

For large particle morphs, do not animate individual DOM nodes or create one JavaScript tween per particle.

The preferred pattern is GPU-driven interpolation between particle target states.

Conceptually:

```text
Target A → N particle positions
Target B → N particle positions
Target C → N particle positions
```

A shader can interpolate between position sets using a small number of uniforms such as normalized progress.

The timeline controller should animate scene-level parameters; the GPU should perform the large per-particle work.

This is a direction, not an instruction to prematurely optimize every effect into a shader. Simpler transformations should remain simple when they meet performance and quality targets.

## 6. Production website integration

Once the Scene Lab is approved, the production site should integrate it as a dedicated visual subsystem.

The intended separation is approximately:

```text
Next.js application
├── semantic content / sections
├── navigation
├── evidence modules
├── conversion / agent UI
├── accessibility and SEO
└── visual engine
    ├── renderer
    ├── camera
    ├── particle system
    ├── shaders
    ├── scene state
    └── scroll timeline bridge
```

Critical content must remain semantic DOM content. Do not place important headings, explanations, controls or conversion copy exclusively inside WebGL.

## 7. Styling direction

The website should consume the canonical Relevo design tokens already stored in this repository.

Preferred approach for v1:

- CSS variables derived from canonical tokens;
- CSS Modules or clearly scoped plain CSS;
- minimal abstraction until repeated patterns justify it.

Do not introduce Tailwind by default in v1. This avoids creating a second visual vocabulary alongside the approved Design System and reduces arbitrary utility values that drift from canonical tokens.

This decision can be reconsidered only with explicit approval and a clear token-mapping strategy.

## 8. External generative tools

Tools such as Higgsfield may be used optionally for **creative previsualization**:

- exploring camera language;
- testing transformation ideas;
- visualizing particle density or pacing;
- producing motion references for the implementation agent.

They are **not part of the production rendering stack** and should not be used as a substitute for the interactive WebGL experience.

Do not use generated video as the main implementation of a scene that needs to react continuously to scroll, pointer movement or scene state.

Generated references must also not reproduce another studio's proprietary asset, composition or exact choreography.

## 9. AI-assisted development workflow

The implementation workflow intentionally uses multiple coding agents as complementary roles rather than treating one model as the permanent owner of the codebase.

### Primary builder

**Claude Code** is the preferred primary environment for the initial Scene Lab and heavy visual implementation.

The exact Claude model is an operational choice and may change over time without changing this architecture decision.

The builder should receive:

- `AGENTS.md`;
- strategic context;
- experience brief;
- technical architecture;
- Design System docs and tokens;
- approved Dala video/reference material;
- explicit quality gates for each Scene Lab iteration.

### Daily visual iteration

**Cursor** is appropriate for rapid local inspection, targeted iteration, visual tuning, code navigation and small implementation changes.

### Independent review / hardening

**Codex or another independent coding agent** may be used after major milestones to review the implementation without inheriting all assumptions made by the primary builder.

Useful audit tasks include:

- WebGL architecture review;
- frame-loop allocations and bottlenecks;
- shader and buffer design;
- mobile degradation;
- reduced-motion behavior;
- accessibility;
- bundle boundaries;
- memory and resource cleanup;
- server / agent security once the conversational experience exists.

No agent may bypass the repository sources of truth simply because it can generate a visually plausible alternative.

## 10. Performance and quality rules

The visual system should be designed around measurable constraints rather than desktop-only spectacle.

At minimum:

- avoid unnecessary allocations in the render loop;
- reuse geometries, buffers and materials where appropriate;
- dispose GPU resources explicitly when their lifecycle ends;
- cap device pixel ratio when needed;
- design particle-count / effect-quality tiers;
- create a deliberate mobile composition;
- create a deliberate `prefers-reduced-motion` composition;
- keep critical interaction independent from WebGL availability;
- avoid loading large visual assets before they are needed when progressive loading is possible.

Exact budgets and thresholds will be established after the Scene Lab can be profiled on real devices.

## 11. Explicit non-goals for the first visual milestone

The Scene Lab should **not** attempt to solve all of the following at once:

- final homepage copy;
- final navigation;
- final case-study content;
- proposal-aware agent architecture;
- CRM integration;
- analytics implementation;
- complete responsive site layout;
- full SEO implementation;
- full deployment pipeline.

Its job is to prove the core visual engine and interaction quality.

## 12. Decision gate before production build

The production homepage should not be scaffolded around a mediocre visual prototype merely to make progress look faster.

Before the Scene Lab becomes the site engine, it should demonstrate:

- a convincing original Relevo particle world;
- at least one strong aggregation / dispersion / morph sequence;
- responsive camera and spatial depth;
- smooth reversible scroll control;
- stable performance on representative hardware;
- a credible mobile/reduced-motion plan;
- visual quality that clearly supports the premium studio positioning.

If that quality is not reached, continue the Scene Lab rather than hiding weaknesses behind more sections, cards or copy.

## 13. Current decision summary

### Approved

- Next.js;
- TypeScript;
- direct Three.js;
- custom GLSL where it meaningfully improves particle and visual behavior;
- GSAP + ScrollTrigger;
- CSS Modules / plain CSS using Relevo tokens;
- Vercel as intended initial deployment target;
- Scene Lab before full production integration;
- Claude Code as primary initial builder;
- Cursor for visual iteration;
- independent agent review for hardening.

### Deferred

- Lenis until native scroll works perfectly;
- exact particle count and shader architecture;
- exact 3D authoring workflow;
- exact protagonist geometry and morph states;
- exact performance budgets;
- final agent stack and backend architecture;
- any additional animation / rendering dependency.

### Not part of the production stack

- Higgsfield or similar generated-video tools, except as optional creative references;
- copied Dala code, models, assets or exact choreography;
- video backgrounds as a substitute for the interactive particle system.
