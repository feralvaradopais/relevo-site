# Relevo Studio — KF01 Authored Cinematic Asset Kit

## Status

**Approved implementation convention for KF01.**

This document does **not** change the approved homepage narrative, keyframe sequence, or cinematic route.

The authoritative sequence remains:

> **WORLD → DISASSEMBLY → OPERATION → INSPECTION → ENTER SYSTEM → BUILD → VERIFY → SYSTEM BECOMES WORLD → RESOLVED WORLD**

The six cognitive acts and nine visual reference states remain governed by:

- `context/homepage-storyboard-v1.md`
- `context/homepage-keyframes-v1.md`
- `context/claude-cinematic-brief-v1.md`

This document only defines how the first authored WORLD state should be assembled so the Scene Lab does not re-invent the hero art direction procedurally.

---

## 1. Why this kit exists

The Scene Lab proved two things:

1. the WebGL engine is strong at deterministic scroll, particle continuity, morphing, camera choreography and performance;
2. a fully procedural WORLD representation does not reach the approved KF01 illustration quality as efficiently as an authored visual plate.

The approved implementation direction is therefore:

> **author the WORLD visually, then make it spatial, alive and transformable in code.**

The coding agent should act primarily as compositor, motion designer and graphics engineer for KF01 — not as the concept artist for the landscape, aerial vessels or matter language.

---

## 2. Local-only asset location

The authored assets live in an ignored local directory and are **not committed to the repository**:

```text
.local-references/kf01-cinematic-kit/
  kf01-world-base.png
  kf01-vessel-hero.png
  kf01-vessel-support.png
  kf01-vessel-distant.png
  kf01-atmosphere-plate.png
  kf01-matter-language.png
```

If these files exist locally, inspect all six before changing KF01 composition, vessel design, atmosphere or WORLD → MATTER behavior.

If one is missing, surface that explicitly. Do not silently replace the missing authored asset with newly invented procedural art direction.

---

## 3. Relationship to the nine approved keyframes

The authored kit does **not** replace:

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

Use the distinction below:

- `relevo-keyframes/` = **what the film means, where it goes, and the approved art-direction targets**;
- `kf01-cinematic-kit/` = **authored implementation ingredients for building KF01 and beginning KF01 → KF02**.

The keyframes remain authoritative if there is any conflict.

---

## 4. Asset roles

### `kf01-world-base.png`

Primary authored WORLD plate.

Use it to establish:

- the approved canyon / valley geography;
- horizon and recession;
- foreground / midground / background hierarchy;
- dark premium atmosphere;
- restrained embedded route-light language;
- large copy-safe territory on the left.

At rest, KF01 must read as a **finished digital illustration**, not as a procedural terrain demo or visible point field.

A hidden procedural or depth scaffold may support parallax, particle placement, dissolve topology or fallback behavior, but should not become the visible art direction if it lowers fidelity.

### `kf01-vessel-hero.png`

Primary aerial protagonist.

Use one dominant instance, typically around the right-center of the hero composition.

Its job is to counterbalance the large left-side copy block and create the main secondary focal point after the headline.

Do not redesign it procedurally into a generic balloon, pod or sci-fi icon.

### `kf01-vessel-support.png`

Supporting member of the same aerial family.

Use sparingly at smaller apparent size and greater depth.

It should support hierarchy, not compete with the hero vessel.

### `kf01-vessel-distant.png`

Low-priority distant member of the aerial family.

Use for atmospheric depth and scale. It is designed for smaller screen-space presentation rather than simply shrinking the hero asset.

### `kf01-atmosphere-plate.png`

Authored atmospheric guidance / compositing material.

Use selectively for:

- low valley haze;
- purple / rose atmospheric depth;
- restrained warm horizon light;
- wisps and volumetric separation;
- subtle upper-right atmospheric energy.

Do not allow the atmosphere to overpower the WORLD or turn the horizon into the main protagonist.

### `kf01-matter-language.png`

Visual specification for MATTER behavior.

It is **not** a scene, UI board or additional keyframe to reproduce literally.

Use it to guide:

- dust / particulate hierarchy;
- filaments;
- nodes and links;
- wave / layered-mesh behavior;
- luminous route structures;
- physical-surface → matter reveal;
- density, bloom and chroma restraint.

Do not copy labels, layout frames, diagrams, pseudo-UI or example objects from the board into production.

---

## 5. KF01 composition contract

The authored hero should preserve the following hierarchy:

1. **DOM copy** on the left;
2. **one dominant aerial vessel** on the right-center;
3. **the valley recession path** into the distance;
4. supporting aerial forms and embedded lights;
5. atmosphere and ambient particles.

Recommended composition behavior:

- preserve roughly the left 30% as copy-safe negative space;
- place the dominant vessel around the 68–72% horizontal region as a starting reference, then tune visually;
- use only a small number of supporting vessels;
- use distant vessels primarily for depth;
- frame the valley with dark foreground mass;
- avoid equally weighted aerial objects spread uniformly across the sky;
- avoid visually inactive right-side space that fails to counterbalance the copy.

The exact percentages are art-direction guides, not layout constants.

---

## 6. Motion contract for KF01

Motion must remain extremely restrained.

Approved behaviors include:

- almost imperceptible camera push-in;
- shallow 2.5D parallax;
- independent slow aerial ascent and drift;
- low-amplitude atmospheric movement;
- subtle route / environmental light animation;
- very low ambient particle presence.

KF01 should first read as a premium authored image. Motion is there to make the image feel alive, not to announce an animation system.

The existing deterministic scroll, camera and reduced-motion contracts remain authoritative.

---

## 7. KF01 → KF02 material reveal

The approved narrative rule remains:

> **The hero does not disappear. It reveals what it is made of.**

The authored WORLD is therefore not allowed to solve the transition as a crossfade into a separate particle scene.

Preferred model:

```text
AUTHORED WORLD SURFACE
+
CO-LOCATED MATTER
→
selective surface erosion / granulation
→
embedded matter remains visible
→
WORLD progressively becomes MATTER
→
MATTER later reorganizes into OPERATION
```

At the strongest KF02 reference moment, preserve approximately:

> **60–70% recognisable world / 30–40% exposed matter**

Implementation guidance:

- route lights should remain alive through the reveal;
- exposed matter should emerge from the same spatial locations as the visible WORLD features;
- terrain edges may granulate progressively;
- atmosphere may become particulate;
- aerial surfaces may begin releasing restrained matter;
- the camera should continue through the transformation;
- the transition must reverse cleanly with scroll.

Do not use an explosion, hard cut, generic dissolve, warning icons, HUDs or a rainbow network.

---

## 8. Chroma discipline

The authored kit does not alter the approved chroma arc.

For KF01:

> **near-black / charcoal + purple atmosphere + restrained warm environmental light**

For KF02:

> **purple remains dominant + sparse pink only where friction / transition requires it**

Strong teal remains reserved for the KF03 inspection / legibility phase.

Do not allow later cyan / cyberpunk reference imagery to leak backward into KF01 or KF02.

---

## 9. Production vs. reference assets

These current local images are design / implementation inputs for the Scene Lab and should not automatically be treated as final production-delivery files.

Before production integration, review:

- resolution and compression;
- alpha quality on isolated assets;
- edge halos / matte contamination;
- color-management consistency;
- responsive crop behavior;
- whether a final retouched plate is required;
- whether depth / masks should be generated as production-specific derivatives.

Do not commit large generated raster files until an explicit asset-delivery decision is made.

---

## 10. Immediate implementation gate

Before advancing to KF02.5 or later states, the Scene Lab should demonstrate:

1. a polished KF01 assembled from the authored kit;
2. desktop composition close to the approved hero target;
3. an authored portrait composition rather than a simple crop;
4. independent subtle motion of the aerial assets;
5. environmental depth / parallax that does not break the authored image;
6. early KF01 → KF02 reveal samples around ~10%, ~25%, and ~35–40% exposed MATTER;
7. continuous spatial relationship between visible route lights and the matter that survives the reveal;
8. deterministic backward reversibility;
9. production-aware performance.

Do not proceed to the operation sculpture until this gate is visually approved.

---

## 11. Non-negotiable reminder

This asset-kit decision changes the **production method for KF01**.

It does **not** change:

- the six cognitive acts;
- the nine approved visual states;
- their order;
- the approved copy;
- the WORLD → MATTER → OPERATION → SYSTEM → WORLD arc;
- the later inspection, build, verify or resolved-world direction.

The film route stays exactly as approved.