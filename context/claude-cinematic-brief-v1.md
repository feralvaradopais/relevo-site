# Relevo Studio — Claude Code Cinematic Implementation Brief v1

## Purpose

Use this brief for the next **Scene Lab cinematic implementation pass**.

The task is not to redesign the homepage and not to invent new art direction.

The task is to connect the approved visual states into **one continuous reversible scroll-driven film**.

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

The business story underneath it is:

> The company already works. Some work still depends too much on people manually bridging gaps. Relevo understands the structural cause, builds the missing system, proves it works, and leaves the operation better prepared to move forward.

Everything must visibly come from the same world and the same matter.

---

## 2. Approved visual targets

Use these target names and local paths when available:

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

- digital landscape;
- topography;
- aerial sculptural forms;
- haze;
- depth;
- environmental light.

### MATTER

- persistent particles;
- terrain material;
- structural sculpture;
- transfer / signal particles;
- morphing structures;
- reconstruction into geography.

### OPTICS

- lensing;
- refraction;
- focus;
- subtle halo;
- controlled distortion;
- depth isolation.

Do not add unrelated visual systems.

No generic AI brain, robot, HUD, floating dashboard, Matrix code, glowing cube, literal database icon, literal magnifying-glass prop or tourism balloon treatment.

---

## 4. Technical direction

Follow the approved architecture.

- Next.js + TypeScript for production integration later.
- Direct Three.js for the persistent scene.
- Custom GLSL where it materially improves particle morphing / lens behavior.
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

The same underlying matter should change interpretation through:

- scale;
- density;
- topology;
- camera position;
- morph targets;
- active-path emphasis;
- optics;
- lighting;
- atmospheric depth.

A successful implementation should make it difficult for a viewer to identify where one “scene” ends and another begins.

---

## 6. State-by-state implementation targets

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

---

### KF01 → KF02 — WORLD DISASSEMBLY

Do not fade.

Progressively reveal particulate construction:

1. emissive regions expose points;
2. haze becomes matter;
3. terrain edges granulate;
4. aerial surfaces release particles;
5. camera continues forward;
6. world becomes particle space.

Must reverse cleanly.

No explosion.

---

### KF02 — WORLD DISASSEMBLY

Target reference should preserve enough geography that the viewer still understands it is the hero world.

Friction begins appearing through:

- incomplete paths;
- waiting signals;
- detours;
- repeated handoffs.

Do not implement generated warning icons.

---

### KF02 → KF02.5 — OPERATION EMERGES

This is a critical transition.

The fragmented world matter should not disperse permanently.

It should progressively condense / reconfigure into one suspended operational sculpture.

The viewer should feel:

> the geography was the outside view; this sculpture is the operation inside it.

Preserve material identity so the transition feels inevitable rather than magical replacement.

---

### KF02.5 — OPERATION SCULPTURE

Build one memorable asymmetric sculpture using structural particles.

Desired character:

> topology + current + architecture + organism

The sculpture is functional, not broken.

Show friction behavior locally:

- signal waits;
- route detours;
- repeated transfer;
- manual-bridge-like dependency;
- accumulation at a handoff.

Use fewer, clearer structural particles rather than a homogeneous cloud of micro-points.

Do not use labels from the generated concept image.

---

### KF02.5 → KF03 — ISOLATE

Slow the world.

Move camera toward one region that already exhibited friction.

Reduce background priority.

Introduce OPTICS without introducing a new visual universe.

---

### KF03 — INSPECTION LENS / GAP

Implement an abstract optical lens.

The lens may use:

- screen-space / shader refraction;
- focus difference;
- controlled edge glow;
- local particle emphasis;
- subtle chromatic aberration.

Outside lens:

- complex / ambiguous.

Inside lens:

- quieter secondary matter;
- clearer paths;
- two relevant structures;
- a small missing relationship between them.

Do not render `GAP`, `ORIGEN`, `DESTINO` or explanatory labels.

The composition must communicate the missing connection through spacing and signal behavior.

Teal becomes dominant in the inspected region.

---

### KF03 → KF03.5 — ENTER THE SYSTEM

Expand the lens until the edge passes outside the viewport.

The viewer should no longer perceive a lens object.

The full viewport now has the legibility previously available only inside the lens.

Do not cut.

---

### KF03.5 — ENTER SYSTEM

The camera is close.

Two major structural regions remain separated.

Particles begin orienting toward the gap.

Potential trajectories appear.

Matter starts preparing to build but has not solved the problem yet.

This is a tension state.

Teal begins yielding to purple.

---

### KF03.5 → KF04 — BUILD

Move from potential trajectories to actual reorganization.

The new structure should emerge from existing matter on both sides.

Avoid a literal bridge asset appearing from nowhere.

---

### KF04 — BUILD / REORGANIZATION

This is the primary spectacle peak.

Two existing regions remain readable while a new intermediate architecture forms.

Use:

- structural particle migration;
- threads;
- nodes;
- partial surfaces;
- active transfer paths;
- coherent morph behavior.

The keyframe target is **mid-build**, not finished.

Some signals can already cross while the architecture is still assembling.

Act 04 internal morphs may suggest:

- agent;
- tool;
- flow;
- data layer.

Do not create four literal objects or icons.

Use one system changing configuration.

Purple is dominant; teal is active connection.

---

### KF04 → KF05 — SETTLE

Deliberately reduce spectacle.

- stabilize camera;
- lower ambient particle noise;
- finish structural alignment;
- reduce saturation / bloom if necessary;
- maintain active paths.

The emotional transition is:

> possible → credible.

---

### KF05 — VERIFIED SYSTEM

The system is calm and complete.

Show several signals at different stages:

- incoming;
- traversing;
- crossing the formerly missing relationship;
- exiting.

The new connection should no longer visually shout.

It belongs to the whole.

Do not implement labels from the generated reference.

The system should remain alive after the successful test with no further intervention.

This state supports:

> **Primero lo comprobamos. Después lo dejamos funcionando.**

---

### KF05 → KF05.5 — PULL BACK

Begin the largest camera-scale transition in the film.

Keep the system functioning while pulling away.

Do not freeze and crossfade.

As scale changes, progressively reinterpret the same structure as terrain.

---

### KF05.5 — SYSTEM BECOMES WORLD

Target approximately 50% system / 50% landscape.

At this state:

- nodes already read partly as distant lights;
- network paths partly read as valleys / routes;
- particle masses partly read as mountains;
- suspended matter partly reads as haze;
- distant aerial forms may begin to reappear.

The viewer should be able to read both interpretations simultaneously.

Do not implement explanatory labels visible in the generated reference.

---

### KF05.5 → KF06 — RESOLVE

Continue pullback and environmental reconstruction.

Reduce exposed network graphics progressively.

Integrate routes into geography.

Open the horizon.

Raise / separate aerial forms.

Create deliberate negative space for the conversation interface.

---

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

The generated chat UI is not production UI.

Use Festa for all interface implementation.

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

One chroma dominates per state.

Do not create rainbow particle scenes.

Pink remains action / signal / focus color according to Festa.

---

## 8. Copy and composition

The approved copy lives in `context/homepage-storyboard-v1.md`.

Do not rewrite it during Scene Lab implementation.

Do not bake copy into WebGL.

Every key state needs authored negative space / contrast for the matching DOM copy.

The visuals support the copy; they must not make reading exhausting.

Particularly:

- KF01 needs clean hero-copy territory;
- KF02.5 needs space for the Act 02 beats;
- KF03 needs a readable territory outside the inspection focal area;
- KF04 can be visually dense but copy must remain readable;
- KF05 should be calm and editorial;
- KF06 must deliberately accommodate the conversation experience.

---

## 9. Scroll model

Use normalized deterministic progress.

Every major state should be addressable as a known point / range in the master timeline.

Do not implement critical transitions as time-only animations detached from scroll.

Scrolling upward must reverse:

- particle morphs;
- lens expansion;
- camera paths;
- structural assembly;
- system-to-world reconstruction.

Avoid irreversible procedural state.

Ambient noise can remain procedural only if it is visually secondary and does not break backward continuity.

---

## 10. Mobile

Mobile preserves the same story but can skip intermediate visual complexity.

Recommended mobile target sequence:

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

Use:

- excellent still compositions;
- restrained fades;
- no long camera journeys;
- no required particle explosions;
- no aggressive optical distortion.

The story must remain understandable without the cinematic transitions.

---

## 12. Performance expectations

Do not optimize only after visual implementation.

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

The visual ambition is high, but a Scene Lab that only works on a top desktop GPU is not a successful prototype.

---

## 13. Implementation order

Do not attempt all states at once.

Recommended order:

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

## 14. Review checklist

Before calling the pass complete, answer yes to all of these:

### Continuity

- Does KF02 visibly come from KF01?
- Does KF02.5 visibly come from the disassembled world?
- Is KF03 still the same sculpture?
- Does KF04 emerge from the same matter rather than appearing as a new asset?
- Does KF06 visibly descend from KF05 through scale and reconstruction?

### Meaning

- Does Act 02 communicate friction rather than generic chaos?
- Does the lens reveal something rather than merely decorate?
- Does KF04 feel like construction / coordination?
- Does KF05 feel like proof?
- Does KF06 feel resolved rather than merely brighter?

### Restraint

- Are warning icons, fake HUDs, generated labels and AI clichés absent?
- Is one chroma dominant per state?
- Is Act 05 quieter than Act 04?
- Does UI follow Festa rather than generated references?

### Interaction

- Is every major narrative state deterministic and reversible?
- Does copy stay readable?
- Does mobile preserve the story?
- Does reduced motion preserve comprehension?

### Performance

- Is the prototype stable under real scroll interaction?
- Are buffers / materials reused?
- Are quality tiers available?
- Does resize work without visual corruption?

---

## 15. Definition of done for this pass

This implementation pass is complete when the Scene Lab can demonstrate the full arc:

> **hero world → visible material reveal → operation sculpture → inspection gap → enter system → build missing structure → verify successful operation → pull back into geography → resolved world**

with:

- coherent art direction;
- deterministic scroll;
- backward reversibility;
- production-aware performance;
- Festa-compatible DOM composition;
- no major new art-direction invention by the coding agent.

Do not optimize for the number of effects.

Optimize for:

> **continuity, meaning, art direction, restraint and credibility.**
