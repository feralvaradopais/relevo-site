# Relevo Studio — Claude Code Cinematic Implementation Brief v1

## Purpose

Use this brief for the next **Scene Lab cinematic implementation pass**.

The task is not to redesign the homepage and not to invent new art direction. The task is to connect the approved visual states into **one continuous reversible scroll-driven film**.

Read before implementation:

- `AGENTS.md`
- `context/relevo-strategy.md`
- `context/website-experience-brief.md`
- `context/technical-architecture-v1.md`
- `context/homepage-storyboard-v1.md`
- `context/homepage-keyframes-v1.md`
- `design-system/`

If local visual references exist under `.local-references/relevo-keyframes/`, inspect all nine before changing scene composition.

---

## 1. Non-negotiable narrative

The homepage has **six cognitive acts** but **nine visual target states**.

Do not create nine sections.

The film is:

> **WORLD → DISASSEMBLY → OPERATION → INSPECTION → ENTER SYSTEM → BUILD → VERIFY → SYSTEM BECOMES WORLD → RESOLVED WORLD**

Everything must visibly come from the same world and the same matter.

---

## 2. Approved visual targets

Use these local paths when available:

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

These images are **art-direction references only**.

Do not reproduce generated labels, fake navigation, warning icons, pseudo-HUDs, provisional typography or generated chat UI.

Production DOM/UI follows Festa.

---

## 3. Production visual grammar

Use only three visual materials.

### WORLD

Digital landscape, topography, aerial sculptural forms, haze, depth and environmental light.

### MATTER

Persistent particles used for terrain, structural sculpture, transfer signals, morphing structures and reconstruction into geography.

### OPTICS

Lensing, refraction, focus, subtle halo, controlled distortion and depth isolation.

Do not add generic AI brains, robots, HUDs, floating dashboards, Matrix code, glowing cubes, literal database icons, literal magnifying-glass props or tourism-balloon treatment.

---

## 4. Technical direction

Follow `context/technical-architecture-v1.md`.

- Direct Three.js for the persistent scene.
- Custom GLSL where it materially improves particle morphing or lens behavior.
- GSAP + ScrollTrigger for deterministic narrative orchestration.
- Native scroll first; Lenis remains deferred.
- Semantic DOM copy over the canvas.
- Reuse buffers and materials wherever practical.
- No large allocations during scroll.
- Explicit quality tiers for DPR, particles, atmosphere and postprocessing.

The immediate task remains the isolated Scene Lab, not the full production homepage.

---

## 5. Required scene continuity

Prefer one persistent Three.js scene.

Do not solve transitions by hiding one scene and showing another.

The same underlying matter should change interpretation through scale, density, topology, camera position, morph targets, active-path emphasis, optics, lighting and atmospheric depth.

A successful implementation should make it difficult for a viewer to identify where one scene ends and another begins.

---

## 6. State-by-state targets

### KF01 — HERO WORLD

Target:

- wide dark valley / canyon;
- purple atmosphere;
- restrained warm routes;
- 5–8 abstract ascending aerial forms;
- calm, monumental, premium;
- strong negative space for copy.

Motion:

- slow push-in;
- subtle parallax;
- independent aerial drift / ascent;
- haze movement;
- extremely restrained particles.

Do not make the aerial objects colourful tourism balloons.

### KF01 → KF02 — WORLD DISASSEMBLY

Do not fade.

Progressively reveal particulate construction:

1. emissive regions expose points;
2. haze becomes matter;
3. terrain edges granulate;
4. aerial surfaces release particles;
5. camera continues forward;
6. world becomes particle space.

Must reverse cleanly. No explosion.

### KF02 — WORLD DISASSEMBLY

Preserve enough geography that the viewer still understands it is the hero world.

Friction begins appearing through incomplete paths, waiting signals, detours and repeated handoffs.

Do not implement generated warning icons.

### KF02 → KF02.5 — OPERATION EMERGES

The fragmented world matter should progressively condense / reconfigure into one suspended operational sculpture.

The viewer should feel:

> the geography was the outside view; this sculpture is the operation inside it.

### KF02.5 — OPERATION SCULPTURE

Build one memorable asymmetric sculpture using structural particles.

Desired character:

> **topology + current + architecture + organism**

The sculpture is functional, not broken.

Show friction locally through signal waits, detours, repeated transfer, manual-bridge-like dependencies and accumulation at handoffs.

Use fewer, clearer structural particles rather than a homogeneous cloud of micro-points.

Do not use labels from the generated concept image.

### KF02.5 → KF03 — ISOLATE

Slow the world, move camera toward one region that already exhibited friction, reduce background priority and introduce OPTICS without introducing a new visual universe.

### KF03 — INSPECTION LENS / GAP

Implement an abstract optical lens using refraction, focus difference, controlled edge glow, local particle emphasis and subtle chromatic aberration.

Outside lens: complex / ambiguous.

Inside lens: quieter secondary matter, clearer paths, two relevant structures and a small missing relationship between them.

Do not render `GAP`, `ORIGEN`, `DESTINO` or explanatory labels.

The composition must communicate the missing connection through spacing and signal behavior.

Teal becomes dominant in the inspected region.

### KF03 → KF03.5 — ENTER THE SYSTEM

Expand the lens until its edge passes outside the viewport. The viewer should no longer perceive a lens object. The full viewport now has the legibility previously available only inside the lens.

Do not cut.

### KF03.5 — ENTER SYSTEM

The camera is close. Two major structural regions remain separated. Particles begin orienting toward the gap. Potential trajectories appear. Matter starts preparing to build but has not solved the problem yet.

This is a tension state. Teal begins yielding to purple.

### KF03.5 → KF04 — BUILD

Move from potential trajectories to actual reorganization. The new structure should emerge from existing matter on both sides.

Avoid a literal bridge asset appearing from nowhere.

### KF04 — BUILD / REORGANIZATION

This is the primary spectacle peak.

Two existing regions remain readable while a new intermediate architecture forms.

Use structural particle migration, threads, nodes, partial surfaces and active transfer paths.

The target is **mid-build**, not finished.

Some signals can already cross while the architecture is still assembling.

Act 04 internal morphs may suggest agent, tool, flow and data layer, but do not create four literal objects or icons.

Use one system changing configuration.

Purple is dominant; teal is active connection.

### KF04 → KF05 — SETTLE

Deliberately reduce spectacle.

- stabilize camera;
- lower ambient particle noise;
- finish structural alignment;
- reduce saturation / bloom if necessary;
- maintain active paths.

The emotional transition is:

> possible → credible.

### KF05 — VERIFIED SYSTEM

The system is calm and complete.

Show several signals at different stages: incoming, traversing, crossing the formerly missing relationship and exiting.

The new connection should no longer visually shout. It belongs to the whole.

Do not implement labels from the generated reference.

The system should remain alive after the successful test with no further intervention.

This state supports:

> **Primero lo comprobamos. Después lo dejamos funcionando.**

### KF05 → KF05.5 — PULL BACK

Begin the largest camera-scale transition in the film.

Keep the system functioning while pulling away.

Do not freeze and crossfade.

As scale changes, progressively reinterpret the same structure as terrain.

### KF05.5 — SYSTEM BECOMES WORLD

Target approximately 50% system / 50% landscape.

At this state:

- nodes already read partly as distant lights;
- network paths partly read as valleys / routes;
- particle masses partly read as mountains;
- suspended matter partly reads as haze;
- distant aerial forms may begin to reappear.

The viewer should be able to read both interpretations simultaneously.

Do not implement explanatory labels visible in generated references.

### KF05.5 → KF06 — RESOLVE

Continue pullback and environmental reconstruction.

Reduce exposed network graphics progressively. Integrate routes into geography. Open the horizon. Raise / separate aerial forms. Create deliberate negative space for the conversation interface.

### KF06 — RESOLVED WORLD / CONVERSATION

Return to the family of KF01, but not to the identical frame.

Target feeling:

> **clarity + calm + capacity + possibility**

Compared with KF01:

- lighter horizon;
- more open space;
- calmer atmosphere;
- higher aerial forms;
- better-integrated routes;
- more breathable composition.

Do not create a naive “happy future” or a corporate before/after.

The conversation becomes the primary DOM interface in the final composition.

The generated chat UI is not production UI. Use Festa for all interface implementation.

---

## 7. Chroma behavior

Approximate arc:

```text
KF01     near-black + purple
KF02     purple + sparse friction pink
KF02.5   purple
KF03     teal
KF03.5   teal → purple
KF04     purple + teal
KF05     deep purple + restrained teal
KF05.5   purple + warmer horizon
KF06     purple + warm open horizon
```

One chroma dominates per state. Do not create rainbow particle scenes. Pink remains action / signal / focus color according to Festa.

---

## 8. Copy and composition

The approved copy lives in `context/homepage-storyboard-v1.md`.

Do not rewrite it during Scene Lab implementation and do not bake copy into WebGL.

Every key state needs authored negative space / contrast for the matching DOM copy.

Particularly:

- KF01 needs clean hero-copy territory;
- KF02.5 needs space for Act 02 beats;
- KF03 needs a readable territory outside the inspection focal area;
- KF04 can be visually dense but copy must remain readable;
- KF05 should be calm and editorial;
- KF06 must deliberately accommodate the conversation experience.

---

## 9. Scroll model

Use normalized deterministic progress.

Every major state should be addressable as a known point / range in the master timeline.

Do not implement critical transitions as time-only animations detached from scroll.

Scrolling upward must reverse particle morphs, lens expansion, camera paths, structural assembly and system-to-world reconstruction.

Avoid irreversible procedural state. Ambient noise can remain procedural only if visually secondary and unable to break backward continuity.

---

## 10. Mobile

Mobile preserves the same story but can skip intermediate visual complexity.

Recommended target sequence:

> **KF01 → simplified KF02 / KF02.5 → KF03 → one main KF04 morph → KF05 → KF06**

Requirements:

- fewer particles;
- larger structural marks;
- fewer simultaneous flows;
- fewer aerial forms;
- simpler camera paths;
- one dominant visual event at a time;
- authored mobile composition, not scaled desktop.

Do not remove the six cognitive acts.

---

## 11. Reduced motion

Mandatory.

Provide high-quality static / near-static states for the six acts.

Reduced motion does not need to reproduce all nine transitional states.

Use excellent still compositions, restrained fades, no long camera journeys, no required particle explosions and no aggressive optical distortion.

The story must remain understandable without the cinematic transitions.

---

## 12. Performance expectations

Architect for:

- persistent buffers;
- bounded DPR;
- adaptive particle counts;
- adaptive postprocessing;
- no per-frame garbage allocation;
- minimal shader branching where practical;
- predictable target-state memory;
- clean disposal;
- visibility / tab throttling;
- responsive resize behavior.

A Scene Lab that only works on a top desktop GPU is not a successful prototype.

---

## 13. Implementation order

1. establish KF01 world / camera / aerial forms;
2. prove KF01 → KF02 material reveal;
3. create KF02.5 operation sculpture from the same matter;
4. prove camera isolation + KF03 lens;
5. prove KF03 → KF03.5 lens expansion;
6. build KF04 reorganization morph;
7. settle into KF05 and prove repeated successful signals;
8. prove KF05 → KF05.5 → KF06 pullback / reconstruction;
9. integrate scroll master timeline;
10. tune DOM copy territories;
11. add mobile quality tier;
12. add reduced motion;
13. performance audit and cleanup.

Do not proceed to full homepage integration until the visual engine passes the storyboard quality gate.

---

## 14. Definition of done

This pass is complete when the Scene Lab can demonstrate:

> **hero world → visible material reveal → operation sculpture → inspection gap → enter system → build missing structure → verify successful operation → pull back into geography → resolved world**

with coherent art direction, deterministic scroll, backward reversibility, production-aware performance, Festa-compatible DOM composition and no major new art-direction invention by the coding agent.

Do not optimize for the number of effects.

Optimize for:

> **continuity, meaning, art direction, restraint and credibility.**
