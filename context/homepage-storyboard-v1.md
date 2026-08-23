# Relevo Studio — Homepage Storyboard & Motion Direction v1

## Status

Approved narrative and visual direction for the **homepage keyframe phase and the next Scene Lab iteration**.

This document freezes the current **six-act homepage copy** and the core cinematic story. It does **not** freeze exact production geometry, final keyframe artwork, scroll distances, particle counts, shader implementation, agent UX details, or final performance budgets.

Read together with:

- `context/relevo-strategy.md` — positioning and strategic context;
- `context/website-experience-brief.md` — experience principles and Dala reference grammar;
- `context/technical-architecture-v1.md` — approved technical direction;
- `design-system/` — canonical Relevo Studio v5 “Festa” visual system;
- `AGENTS.md` — repository-wide implementation guardrails.

If this storyboard conflicts with a more fundamental approved source of truth, surface the conflict instead of guessing.

---

## 1. Creative thesis

The homepage should feel like **one continuous interactive film**, not six independent animated sections.

The cinematic progression is:

> **WORLD → DISASSEMBLY → INSPECTION → REORGANIZATION → VERIFICATION → RESOLVED WORLD**

The business narrative underneath it is:

> A company already works, but some work still depends too much on people bridging gaps between information, tools, decisions and systems. Relevo first understands what is really happening, then connects what already exists and builds what is missing. The result is less friction, more capacity, more conversion and an operation better prepared to work with AI.

The core visual metaphor is therefore:

> **A complete world reveals the systems it is made of. Relevo finds the gap, reorganizes the same matter into a working system, proves it works, and returns to the world now lighter and more resolved.**

The user should never feel that they moved from “hero animation” to “particle section” to “lens section” to “another 3D section”. Everything must visibly come from the **same matter and the same world**.

---

## 2. Homepage copy — approved six-act version

### 01 — RELEVO

> ## Hacer ligero lo que pesa.
>
> Construimos sistemas para que tu operación avance con menos fricción y más capacidad.
>
> **Para empresas que ya funcionan y quieren crecer mejor con software, datos e IA.**

### 02 — EL PUNTO

> ## Tu empresa funciona.
>
> ## Pero demasiado trabajo todavía depende de alguien.
>
> Alguien busca.
>
> Alguien responde.
>
> Alguien conecta lo que debería estar conectado.
>
> ## Y mientras tanto, una venta, una decisión o un cliente espera.

### 03 — LO QUE REALMENTE PASA

> ## El problema que se ve no siempre es el problema real.
>
> Por eso no empezamos por la tecnología.
>
> ## Primero entendemos qué está frenando el negocio.
>
> Después decidimos qué construir, qué automatizar y dónde la IA aporta.
>
> **Antes de sumar otra persona al mismo proceso, vale la pena preguntarse si el proceso debería cambiar.**

### 04 — EL SISTEMA

> ## El sistema empieza antes que la IA.
>
> **Conectamos lo que ya existe.  
> Construimos lo que falta.**
>
> Puede ser un agente.  
> Una herramienta.  
> Un flujo.  
> Una capa de datos.
>
> ## La forma cambia. El objetivo no.
>
> **Más conversión.  
> Más capacidad para el equipo.  
> Una operación preparada para trabajar con IA.**

### 05 — LA FORMA RELEVO

> ## Construimos lo que el día a día nunca alcanza a construir.
>
> **Observamos.  
> Construimos.  
> Probamos.**
>
> Sobre datos, procesos y operación reales.
>
> ## Primero lo comprobamos.
>
> ## Después lo dejamos funcionando.

### 06 — CONVERSACIÓN

> ## Hay una parte de tu operación que podría estar funcionando mucho mejor.
>
> ## Encontrémosla.
>
> Cuéntanos qué está pasando.
>
> **Nosotros hacemos las preguntas.  
> Tú no necesitas tener clara la solución.**
>
> **Empezar conversación →**
>
> **Prefiero hablar con una persona →**

The loader / prelude may exist before Act 01, but it is not a separate cognitive chapter.

---

## 3. Narrative architecture

| Act | Business question answered | Visual state | Emotional job |
| --- | --- | --- | --- |
| **01 · Relevo** | What does Relevo do and for whom? | Complete world | Awe / possibility |
| **02 · El punto** | What problem should I recognize in my operation? | Fragmented world / friction | Recognition |
| **03 · Lo que realmente pasa** | Why does Relevo think differently? | Inspected world | Curiosity / understanding |
| **04 · El sistema** | What do they actually build and what value can it create? | Reorganized world | Possibility / payoff |
| **05 · La forma Relevo** | Why should I trust how they work? | Verified working system | Confidence |
| **06 · Conversación** | How do we start? | Resolved world / interface | Openness / action |

There are **six cognitive acts**, but approximately **12–16 internal cinematic beats**. Do not create new sections just because a transition contains multiple visual events.

---

## 4. Visual language — only three materials

The entire homepage should be constructed from three visual materials.

### 4.1 WORLD

Atmospheric digital landscape, topography, aerial sculptural forms, haze, depth and environmental light.

Use for:

- hero / Act 01;
- the final resolution / Act 06;
- spatial continuity underneath particle states.

### 4.2 MATTER

A persistent particle system capable of representing:

- atmosphere;
- terrain;
- fragmentation;
- flows and handoffs;
- friction;
- structures;
- morphing into working systems;
- reconstruction of the final world.

Particles are meaningful material, not decoration.

### 4.3 OPTICS

A restrained inspection language using:

- lensing;
- refraction;
- focus;
- subtle halo;
- depth;
- controlled distortion.

Use primarily in Act 03 and selectively in Act 05.

### Do not introduce unrelated visual languages

Avoid:

- generic AI brains;
- robots;
- Matrix/code rain;
- floating SaaS dashboards;
- random holograms;
- cyberpunk HUDs;
- decorative 3D cards;
- generic glowing cubes;
- literal database icons;
- literal magnifying-glass props;
- tourism photography;
- literal colourful Cappadocia balloons.

Fewer visual materials should create a stronger Relevo identity.

---

## 5. Design-system guardrails

Relevo Studio v5 **Festa** is canonical.

The generated hero exploration is an **art-direction reference only**. Do not copy any typography, navigation, UI or tokens invented by image generation.

Production UI must follow `design-system/`.

Key principles:

- public experience is dark-first;
- Plus Jakarta Sans for display and Hanken Grotesk for body/UI roles according to Festa;
- purple and teal are identity colors;
- pink is action / signal / CTA color and is not a general decorative replacement for identity colors;
- one chroma should dominate each scene;
- restrained amber/yellow/orange may appear as environmental or data light, not as a competing rainbow palette;
- use Festa spacing, layout, typography, radii and motion tokens for DOM/UI;
- preserve `prefers-reduced-motion` behavior.

The visual world may feel rich and cinematic; the UI around it should remain precise and restrained.

---

## 6. Act 01 — RELEVO

### Narrative objective

Establish Relevo as a sophisticated systems studio without beginning with AI jargon.

The visual should embody the brand idea:

> **Hacer ligero lo que pesa.**

### Keyframe direction

A wide, original digital landscape.

Characteristics:

- dark, premium and cinematic;
- a vast valley / canyon / topographic world at dusk or night;
- deep foreground and distant layers;
- atmospheric haze;
- restrained stars / particles;
- strong negative space for copy;
- 5–8 aerial sculptural forms rising through the scene.

The aerial forms may be **loosely reminiscent of hot-air balloons**, but they must feel original, digital and sculptural rather than touristic.

They can read as:

- capsules;
- inflated sculptural bodies;
- suspended entities;
- engineered aerial forms.

Do not use literal Cappadocia photography or colourful travel balloons.

### Motion

- extremely slow ascent;
- different drift speeds per aerial form;
- subtle parallax between foreground, valley, atmosphere and sky;
- slight haze movement;
- almost imperceptible camera push-in;
- no dramatic orbit or game-camera feeling.

The scene should feel **monumental and quiet**.

### Composition

Keep generous clean space for the approved copy. The visual world can be strongest center/right while the copy has a clear readable territory.

### Chroma

Near-black / charcoal dominant.

Purple atmosphere may dominate. Warm environmental light can live inside or beneath aerial forms. Teal and pink should be minimal at this stage.

### Keyframe status

**Keyframe 01 — HERO WORLD: visual direction approved; final production artwork not frozen.**

---

## 7. Transition 01 → 02 — WORLD TO MATTER

This is one of the most important transitions in the entire website.

The hero must **not fade out**.

It physically reveals that it is built from particles.

Suggested sequence:

1. illuminated areas begin to expose particulate structure;
2. surfaces of the aerial forms release subtle particles;
3. terrain edges become granular;
4. haze turns into particle matter;
5. the camera continues forward into the same space;
6. the landscape loses its continuous surface and becomes the persistent particle world.

Do not make it a violent explosion.

The feeling is:

> **the complete world is revealing what it is made of.**

Scrolling backward must reconstruct the hero coherently.

---

## 8. Act 02 — EL PUNTO

### Narrative objective

Create recognition without telling the visitor their company is broken.

The company already works. The problem is that some work still depends on people manually completing missing connections.

### Visual state

The particle world forms several distinct clusters / regions.

Represent operational friction through **behavior**, not icons.

Examples:

- a particle flow repeatedly travels between two clusters because no direct connection exists;
- a signal arrives and waits;
- information takes an unnecessarily long route;
- a transfer must return to a previous node before continuing;
- a small bridge action is repeatedly required for two otherwise functional regions to work together.

The important metaphor is:

> **a person ends up acting as the bridge between things that should work together.**

### Motion

More active than Act 01, but not chaotic.

The desired feeling is **friction and dependency**.

### Chroma

Dark world remains dominant. Action pink can appear sparingly as a friction / waiting signal.

### Camera

Continue into the matter from the hero. Avoid a reset or scene cut.

### Keyframe status

**Keyframe 02 — FRICTION / FRAGMENTATION: TBD.**

---

## 9. Transition 02 → 03 — ISOLATE THE REAL PROBLEM

The system gradually slows.

The camera identifies one suspicious area.

Other clusters recede in depth and importance.

An abstract optical inspection lens enters the scene.

Do **not** create a literal detective magnifying glass.

The lens should be perceived through:

- a subtle edge or rim;
- refraction;
- controlled distortion;
- focus;
- halo;
- particle reaction.

The world should feel as if we are changing **how we read it**, not importing a new prop from another design language.

---

## 10. Act 03 — LO QUE REALMENTE PASA

### Narrative objective

Show that Relevo does not begin with a predetermined technology solution.

The visible symptom is not necessarily the structural cause.

### Visual state

Outside the lens:

- ambiguity;
- noise;
- apparently unrelated activity.

Inside the lens:

- relationships become legible;
- routes separate into layers;
- dependencies become visible;
- the difference between useful flow and repeated friction becomes clear.

The lens may reveal abstract layers corresponding to:

- information;
- tools;
- decisions;
- people.

These do not need to become literal labeled diagrams.

### Key moment

The lens stops on one missing relationship — a visible **gap** between parts of the system that should be able to coordinate.

That gap is the visual answer to:

> **Primero entendemos qué está frenando el negocio.**

### Chroma

Teal becomes the dominant inspection / legibility chroma.

### Camera

Analytical rather than spectacular.

A slight perspective change can reveal that what looked like noise already contained structure.

### Keyframe status

**Keyframe 03 — INSPECTION LENS / STRUCTURAL GAP: TBD.**

---

## 11. Transition 03 → 04 — ENTER THE REVEALED SYSTEM

The inspection lens grows until its edge moves outside the viewport.

The viewer is no longer looking **through** the lens.

The viewer is now **inside what the lens revealed**.

Particles begin to establish trajectories.

Disconnected regions start attracting, aligning and forming new relationships.

The feeling should be:

> understanding has made redesign possible.

---

## 12. Act 04 — EL SISTEMA

### Narrative objective

Deliver the central commercial and cinematic payoff.

This is the primary spectacle peak of the homepage.

### Visual state

The same particle matter begins behaving like architecture.

Do not render four unrelated literal objects for:

- agent;
- tool;
- flow;
- data layer.

Instead use **one persistent structure** that morphs through four abstract configurations while remaining recognizably made from the same underlying matter.

Possible interpretations:

#### “Un agente”

The structure forms a coordinated core with inputs and outputs.

#### “Una herramienta”

The same matter becomes more compact and task-oriented.

#### “Un flujo”

The structure extends into clear directional pathways.

#### “Una capa de datos”

The same matter reorganizes into stratified / legible layers.

These are cinematic states, not service icons.

### Final resolution

All states converge into one coherent working system connecting regions that were previously separate.

The visual behavior should support the three outcomes:

> **Más conversión.**  
> **Más capacidad para el equipo.**  
> **Una operación preparada para trabajar con IA.**

Prefer behavioral proof over infographics:

- signals reach their destination;
- throughput increases;
- routes become shorter;
- previously isolated regions participate in the same flow.

### Chroma

Purple may return as dominant identity chroma. Teal remains a secondary information / connection signal.

Avoid rainbow spectacle.

### Keyframe status

**Keyframe 04 — WORKING SYSTEM / MORPH CLIMAX: TBD.**

---

## 13. Transition 04 → 05 — FROM POSSIBILITY TO CREDIBILITY

Stop escalating spectacle.

The camera stabilizes.

Environmental particle noise decreases.

The assembled system holds its position.

The emotional shift is:

> **This can be built → now prove that it works.**

This quieter transition is intentional.

---

## 14. Act 05 — LA FORMA RELEVO

### Narrative objective

Create confidence in the Relevo method without falling into a generic consultancy process diagram.

### Visual sequence

Reuse the existing visual language.

#### OBSERVAMOS

A restrained inspection sweep reads the working structure.

#### CONSTRUIMOS

One missing or imperfect element is assembled / adjusted.

#### PROBAMOS

A signal enters the system.

It travels through the system.

It exits successfully.

Then another.

Then another.

Nothing celebrates.

Nothing explodes.

The system simply keeps operating.

### Key payoff

On:

> **Primero lo comprobamos.**

we see the successful test.

On:

> **Después lo dejamos funcionando.**

we stop modifying the scene while the system continues to operate on its own.

This should feel like **quiet confidence**.

### Keyframe status

**Keyframe 05 — VERIFIED SYSTEM: TBD.**

---

## 15. Transition 05 → 06 — SYSTEM BACK TO WORLD

The functioning system remains alive while the camera slowly pulls far back.

As scale changes:

- nodes become distant lights;
- paths become routes / valleys;
- clusters become topographic forms;
- suspended particles become atmosphere;
- the working system progressively reconstructs a landscape.

The viewer realizes:

> **we are returning to the visual world of the hero.**

But not to the identical world.

---

## 16. Act 06 — CONVERSACIÓN

### Narrative objective

Turn the cinematic experience into a discovery interface.

### Visual state

Return to the same visual family as Act 01.

The final landscape should feel:

- more open;
- more legible;
- calmer;
- lighter;
- better connected.

Aerial forms may appear higher in the atmosphere than in the hero.

The horizon may be more open and the routes more coherent.

This is not a literal “before / after” or a triumphal ending.

The feeling is **possibility**.

### Conversation interface

Create significant negative space for the conversational experience.

The Relevo agent should **not** feel like a generic floating chatbot in the bottom corner.

It should become the primary interface of the final scene.

The environment remains alive with extremely restrained ambient motion while the conversation begins.

The conventional human-contact path remains available as fallback.

### Keyframe status

**Keyframe 06 — RESOLVED WORLD / CONVERSATION: TBD.**

---

## 17. Emotional and visual intensity curve

The experience should have peaks and quiet moments.

Approximate relative intensity:

| Act | Emotional state | Relative intensity |
| --- | --- | ---: |
| 01 · Relevo | awe / possibility | 85% |
| 02 · El punto | recognition / friction | 70% |
| 03 · Lo que realmente pasa | curiosity / discovery | 90% |
| 04 · El sistema | possibility / payoff | **100%** |
| 05 · La forma Relevo | confidence / evidence | 50% |
| 06 · Conversación | openness / action | 75% |

Act 04 is the main cinematic climax.

Act 05 must deliberately become quieter.

Act 06 opens the world again instead of trying to beat the Act 04 spectacle.

---

## 18. Approximate narrative scroll allocation

Do not assume one act equals one viewport.

Initial planning distribution:

| Act | Approx. narrative scroll share |
| --- | ---: |
| 01 | 16% |
| 02 | 17% |
| 03 | 18% |
| 04 | 21% |
| 05 | 14% |
| 06 | 14% |

Transitions live **inside these ranges**.

Exact production distances remain open until tested in the browser.

Avoid a structure of:

> section → fade → section → fade → section

The experience must be continuously scrubbed and reversible.

---

## 19. Camera principles

Camera movement exists to reveal meaning.

Use:

- slow push / pull;
- authored perspective changes;
- parallax;
- selective spatial isolation;
- analytical reframing in Act 03;
- deliberate stability in Act 05.

Avoid:

- free orbit for spectacle;
- game-camera movement;
- constant dramatic zooms;
- camera motion that competes with copy;
- motion that cannot reverse cleanly.

The strongest camera change may be the Act 05 → 06 pullback that turns the working system back into landscape.

---

## 20. Scroll and reversibility

The desktop experience should be mapped deterministically to normalized scroll / chapter progress.

Scrolling upward must reproduce the cinematic sequence backward without:

- procedural resets;
- random state mismatches;
- popping geometry;
- particle teleports;
- irreversible one-shot animations.

Where procedural ambient motion is used, keep it visually secondary to the deterministic narrative state.

Dala is a reference for the ambition of a reversible scroll-driven world, not for exact sequence, geometry, timing or camera paths.

---

## 21. Mobile direction

Do not try to brute-force the desktop composition on a phone.

Preserve the same story with fewer simultaneous effects.

Recommended mobile simplification:

> **Hero 2.5D / lightweight world → particles → inspection lens → one primary system morph → verification → resolved world**

Mobile principles:

- fewer particles;
- fewer aerial forms;
- larger structural marks;
- reduced depth complexity;
- one dominant visual event at a time;
- authored text / visual territories;
- simplified camera paths;
- retain the same six cognitive acts;
- never shrink desktop composition mechanically.

---

## 22. Reduced motion

`prefers-reduced-motion` is mandatory.

Reduced-motion mode must preserve comprehension and brand quality.

Use:

- six excellent static / near-static scene states;
- restrained fades / dissolves;
- no long scrubbed camera journeys;
- no required particle explosions or complex morphs to understand the copy;
- no aggressive optical distortion.

The narrative must still work if the canvas were replaced by six art-directed still frames.

---

## 23. Technical implementation principles

Follow `context/technical-architecture-v1.md`.

For this storyboard specifically:

- keep one persistent Three.js world wherever practical;
- use GSAP + ScrollTrigger for narrative orchestration;
- map major WebGL states deterministically to scroll progress;
- prefer morphing / reconfiguration over scene replacement;
- use custom GLSL where it materially improves GPU-driven particle morphing;
- reuse particle buffers, target data and materials rather than allocating large systems during scroll;
- keep semantic copy and interactive UI in the DOM;
- WebGL is presentation and must never be the only carrier of essential meaning;
- create adaptive quality tiers for DPR, particle count, atmosphere, postprocessing and shader complexity;
- maintain explicit GPU resource lifecycle;
- preserve native-scroll correctness before considering Lenis.

Do not integrate the full homepage before the Scene Lab proves the required transitions and visual quality.

---

## 24. Keyframe phase — next creative gate

Before asking a coding agent to implement the entire cinematic sequence, create and approve six static keyframes from the **same film**:

1. **Hero World** — Act 01;
2. **Friction / Fragmentation** — Act 02;
3. **Inspection Lens / Structural Gap** — Act 03;
4. **Working System / Morph Climax** — Act 04;
5. **Verified System** — Act 05;
6. **Resolved World / Conversation** — Act 06.

These are not six independent illustrations.

They must share:

- world geometry language;
- matter / particle language;
- optical language;
- chroma logic;
- atmosphere;
- camera logic;
- recognizable continuity of the same underlying material.

The purpose of the keyframes is to remove unnecessary art-direction invention from the coding agent.

After keyframe approval, the implementation problem becomes:

> **connect these approved visual states into one reversible scroll-driven film.**

---

## 25. Scene Lab success criteria

The next Scene Lab iteration should prove at least the following:

1. the hero world can begin revealing that it is made from particles;
2. the same matter can communicate operational friction without becoming random chaos;
3. an abstract inspection lens can reveal a structural gap without looking like a gimmick;
4. particle matter can reorganize into a memorable, coherent working system;
5. the working system can be tested and then continue operating quietly;
6. the system can pull back and reconstruct the final landscape;
7. all important states reverse correctly with scroll;
8. mobile and reduced-motion variants preserve the story;
9. the result follows Festa rather than generic AI visual tropes.

Do not hide a mediocre core scene behind more sections, copy, postprocessing or decorative effects.

---

## 26. Quality rubric

Before full homepage integration, review the visual engine against five dimensions.

### Continuity

Does every major state visibly come from the same world and matter?

### Meaning

Does motion explain the story, or is it only decorative?

### Art direction

Does the experience feel original, premium, restrained and unmistakably coherent?

### Legibility

Can the visitor read the copy and understand the visual idea without excessive cognitive load?

### Performance

Can the intended quality survive real devices, mobile degradation and reduced-motion requirements?

A scene that scores poorly on continuity or meaning should not be rescued with more effects.

---

## 27. Explicit non-goals for this phase

Do not use this storyboard PR to:

- build the production homepage;
- create a public case-study section;
- publish prospect names, logos, proposal figures or implied client outcomes;
- introduce Serchi, Cauvia or Workieo to the homepage;
- define proposal-aware agent security;
- choose exact final particle counts;
- lock final shader code;
- create a service catalog;
- redesign Festa;
- add visual libraries beyond the approved technical stack.

The immediate next artifact is **keyframe art direction**, followed by a storyboard-aligned Scene Lab iteration.

---

## 28. One-sentence implementation brief

> Build one dark, cinematic Relevo world that rises calmly, reveals itself as particle matter, exposes the hidden operational gap through inspection, reorganizes that same matter into a working system, proves it works, and resolves back into a lighter version of the original world where the conversation begins.
