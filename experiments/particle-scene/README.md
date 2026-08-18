# Relevo Scene Lab v1

An isolated visual prototype for the Relevo Studio particle engine. It is **not**
the production homepage and must not become one. Its job is to prove that a
single persistent particle world can carry the studio narrative — complexity
becoming a working system — with enough craft to justify building the real site
around it.

Read `AGENTS.md`, `context/website-experience-brief.md` and
`context/technical-architecture-v1.md` before changing anything here.

## Run

```bash
npm --prefix experiments/particle-scene install
```

```bash
npm --prefix experiments/particle-scene run dev
```

Then open <http://localhost:5273>.

### Query flags (development only)

| Flag | Effect |
|---|---|
| `?tier=high\|medium\|low` | Override quality-tier detection |
| `?reduced` | Force the reduced-motion composition without changing OS settings |
| `?capture` | Enable `preserveDrawingBuffer` so frames can be written to disk |

## Architecture

```
src/
├── main.ts                  frame loop; maps scroll → uniforms → DOM
├── config/
│   ├── palette.ts           Festa tokens, verbatim, + sRGB→linear
│   └── quality.ts           tiers: counts, DPR caps, point scale
├── scene/
│   ├── Stage.ts             renderer, resize contract, rAF, visibility
│   └── CameraRig.ts         keyed choreography, drift, pointer parallax
├── particles/
│   ├── ParticleSystem.ts    geometry, attributes, materials, uniforms
│   ├── ambient.ts           deep field + foreground motes
│   └── targets/
│       ├── seeds.ts         per-particle identity (see below)
│       ├── lathe.ts         surface-of-revolution sampling helpers
│       ├── dispersed.ts     01 friction
│       ├── bulb.ts          02 understanding
│       ├── flow.ts          03 transfer
│       ├── rings.ts         04 the system
│       ├── dataField.ts     05 evidence
│       ├── bubbles.ts       06 conversation
│       └── index.ts         state registry
├── shaders/
│   ├── particles.vert.glsl  morph, stagger, excursion, focus, size
│   ├── particles.frag.glsl  ring/mark shape, palette, sparkle
│   ├── ambient.vert.glsl    non-morphing layers
│   └── noise.glsl           simplex + curl
├── timeline/
│   ├── chapters.ts          the schedule; pure scroll → scene mapping
│   └── ScrollTimeline.ts    ScrollTrigger bridge + damped follower
└── ui/debug.ts              D-key overlay
```

## Rendering approach

One `WebGLRenderer`, two `THREE.Points` draw calls, no post-processing, no
depth buffer. Particles use premultiplied additive blending, which is the
physically correct model for light accumulating in a void and removes sorting
entirely.

Festa's atmosphere (section 06 — halo, interferencia, espectro, grano y viñeta)
is composited **over** the canvas in CSS and SVG rather than in a shader. The
design system builds those four behaviours natively with zero images, they cost
no fill rate on top of the point cloud, and re-implementing an approved part of
the brand in GLSL would have been a worse answer than using it.

There is deliberately **no bloom**. Every bright area in the scene comes from
particle density, not from a glow pass.

## Particle strategy

Two geometries:

- **Sculpture** (118k at high tier) — six position sets, morphs.
- **Ambient** (20.8k) — a deep field that gives the void a floor, plus ~800
  near-camera motes that give it a ceiling. Never morphs.

Attributes on the sculpture geometry: `position` (state 0, reusing the built-in
slot), `aT1`–`aT5`, `aSeed` (vec4), `aMeta` (vec4). Nine attributes total, well
inside the limit. Buffers are built once on the CPU at startup and never
rewritten; nothing is allocated per frame.

### Particle identity — the decision everything else rests on

Every particle owns four random scalars and a **cohort index**, and every one of
the six states is a pure function of that identity. Cohort means the same thing
everywhere: which group do I belong to — a stratum, a region of the bulb, a
filament, which ring, which column, which speech bubble.

Sampling each state independently would put particle *i* somewhere unrelated in
every state, and the morph would read as mush. Because identity is shared,
groups of particles travel together through the whole narrative and the
transformation is legible as one material rearranging.

`eta` — the particle's permanent position in the handoff, −1 delivering to +1
receiving — drives colour in every state. Only the expression changes.

## Target states

| # | State | Kind | Meaning |
|---|---|---|---|
| 01 | Dispersión | abstract | stacked queues jammed at a wall, nothing crossing |
| 02 | Ampolleta | figurative | understanding |
| 03 | Flujo | abstract | directed channels; light travels before matter |
| 04 | Anillos | figurative | the isotipo in three dimensions — delivers / receives |
| 05 | Evidencia | abstract | measurement, and the quiet beat |
| 06 | Conversación | figurative | two speech bubbles |

Abstract and figurative alternate. Six abstract states ask the viewer to
interpret everything and they interpret nothing; six objects turn a cinematic
scene into a slideshow of icons.

All figurative forms are built as **shells**, not filled volumes. This is the
single change that fixed the look: a solid body packs so many particles into the
same pixels that additive blending clips them to white and the palette dies
exactly where the form is most visible.

## Morphing

Two one-hot weight arrays (`uFromW`, `uToW`) select the outgoing and incoming
states; the GPU interpolates all 118k positions. The blend factor is
**per-particle**, not global:

- a delay field derived from cohort and along-structure coordinate gives each
  particle its own window inside the transition, so change sweeps through the
  body as a wave instead of arriving as one flat sheet;
- the wave reverses direction with scroll direction;
- during its own window each particle bows along a divergence-free curl field,
  turning the transition into a dispersal-and-regather rather than a straight
  line through the centre;
- particles in transit brighten and shift toward white — motion emits light.

No per-particle JavaScript, no tween per particle, no buffer rewritten per frame.

## Scroll

GSAP ScrollTrigger owns scroll measurement and the refresh lifecycle. It does
**not** own any scene state: there is no `scrub` tween and no animated property.
Each frame the scene reads `progress` as a number and derives everything from it
as a pure function.

The reason is desynchronisation. A scrubbed tween carries state between frames,
and state is what gets out of step when someone flings the scrollbar around.
With a pure mapping there is no state to get out of step — reversing is not
handled, it cannot fail.

Verified: 401 sample points evaluated forward and backward produce **byte-identical
scene state**, in both landscape and portrait.

The one piece of state is a damped follower (half-life 85 ms), which always
converges and never overshoots, and snaps when within 1.5e-4 so held states are
exact.

## Camera

Keyed per chapter — position, look-at, fov, roll — interpolated with a quintic
so chapter boundaries have no velocity break. On top sit two small continuous
offsets: a slow authored drift and a damped pointer parallax, both scaled by
subject distance so they read the same at any framing.

No OrbitControls. No spring, no overshoot, no bounce: the design system reserves
those for state micro-interactions, and a bouncing camera reads as cheap
immediately.

Measured continuity: maximum camera translation between adjacent 1/400 scroll
steps is 7.0 world units, at the peak of the eased Ampolleta→Flujo move. That is
the expected peak velocity of the easing curve, not a discontinuity.

## Pointer

Two layers, both damped, both disabled on coarse pointers and under reduced
motion:

- the camera translates in its own screen plane and counter-swings its aim
  point, which turns a slide into a look-around;
- inside the shaders, near particles receive a much larger offset than far ones.
  That differential is the only thing that actually communicates depth; a
  uniform offset communicates nothing.

## Mobile

Portrait is a different composition, not a smaller one. Every chapter carries a
separate camera key: further back, wider fov, subject framed in the upper
two-thirds. Copy drops to the lower third over a gradient scrim, because text
over particles is the one place this scene can become unreadable.

Also reduced on portrait: particle count and DPR via the tier, point scale,
overall density, and scroll length per chapter (108vh vs 132vh — the same
distance feels twice as long on a phone).

## Reduced motion

Not a blank screen and not a frozen one. The world, the depth, the atmosphere,
the palette and all six states survive; what goes away is continuous movement.

Verified contract: excursion, breath, ambient drift, pointer parallax and camera
motion all clamp to zero, sparkle drops to 0.25, and the transition is
compressed into the last ~25% of each gap so states hold and then change rather
than continuously morphing. Measured transit across one gap: 0 until progress
0.36, then 0.30 → 0.99 → 1.0 over the final stretch.

## Debug

Press **D**. Shows fps, CPU frame cost, DPR, tier, point count, draw calls,
scroll progress, current state pair, transit, camera position and fov. Hidden by
default — a permanent overlay contaminates every judgement about composition,
because the eye starts reading numbers instead of the frame.

## Dependencies

| Package | Why |
|---|---|
| `three` 0.169 | approved renderer, used directly, no R3F |
| `gsap` + ScrollTrigger | approved scroll orchestration |
| `vite` + `typescript` | experiment-only dev server and typecheck |

Vite is **experiment-only tooling**, chosen because it is the lightest way to run
an isolated prototype with GLSL `?raw` imports and instant HMR. It is not a
production architecture decision — production remains Next.js per
`context/technical-architecture-v1.md`.

`vite.config.ts` includes a dev-only middleware that writes a rendered frame to
`.shots/` on POST. It exists because the review surface used while building this
was much smaller than a desktop viewport. It never registers in a build.

## Performance

Measured on this machine only — Apple Silicon Mac, WebKit, 1440×820 at DPR 2
(2880×1640 backing store), 138,800 points, high tier — using
`EXT_disjoint_timer_query_webgl2`:

| State | GPU ms/frame |
|---|---|
| Dispersión | 3.65 |
| Ampolleta | 3.57 |
| Flujo | 5.66 |
| Anillos | 3.83 |
| Conversación | 4.61 |

Two draw calls, two geometries, zero textures. Comfortably inside a 16.7 ms
budget with headroom on this hardware.

**Not measured:** real sustained fps (the review browser pane was backgrounded
and rAF throttled), any Windows or Android device, any integrated GPU, thermal
behaviour over time, and memory pressure on low-end mobile. Do not quote these
numbers as cross-device budgets.

## Known limitations

- The three abstract states are weaker than the three figurative ones.
  Dispersión in particular is atmospheric but does not yet read as a specific
  situation the way the bulb, rings and bubbles do.
- Dense regions still trend toward white. Lowering per-particle alpha and moving
  to shells fixed most of it, but the brightest cores lose hue.
- Chapter copy is placeholder scene labels for art direction, not homepage copy.
- No touch-gesture tuning beyond disabling pointer effects.
- No WebGL-unavailable fallback yet.
- Fonts load from Google Fonts. Production must self-host WOFF2 per the design
  system.
- Ampolleta is an object Dala also uses. It was flagged before building and kept
  at explicit client direction; the profile, base, filament, colour treatment and
  sequence position are authored here.

## Still experimental

Every number in `timeline/chapters.ts` and every `*Params` object in
`particles/targets/index.ts` is art direction in progress, not an approved value.
