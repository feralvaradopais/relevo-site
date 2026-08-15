# Motion — sección 08

El easing firma aprobado es `cubic-bezier(.25,1,.5,1)`. El documento fuente
ejecuta las muestras en loops CSS para inspección y el handoff propone
`animation-timeline: view()` para activarlas por scroll. Esa propuesta no
selecciona la arquitectura técnica final del website. Los keyframes literales
se preservan como referencia en
[`../reference/claude-design-v5/motion.css`](../reference/claude-design-v5/motion.css).

## Curvas

| Nombre | Valor | Uso |
|---|---|---|
| quart · firma | `cubic-bezier(.25,1,.5,1)` | default de todo |
| in-out | `cubic-bezier(.4,0,.2,1)` | transiciones simétricas |
| overshoot | `cubic-bezier(.34,1.26,.64,1)` | micro-interacciones de estado |
| bounce | `cubic-bezier(.175,.885,.32,1.2)` | confirmaciones puntuales |
| carousel | `cubic-bezier(.65,0,.35,1)` | sliders y carruseles |

Duraciones: **300ms** hover y estados, **1s** entradas por scroll.

> Overshoot y bounce solo para micro-interacciones de estado. Nunca en secciones donde se
> juega la credibilidad: ahí el movimiento confirma, no entretiene.

## Catálogo

| Animación | Qué hace | Timing |
|---|---|---|
| `reveal-from-center` (`rv-reveal`) | clip-path inset 50%→0 | 1s · quart |
| `text-reveal` (`rv-text`) | translateY 110%→0 + máscara | 1s · quart |
| `letter-reveal` (`rv-letter`) | color de acento → off-white, stagger 60ms | .5s · quart |
| `mask-slide-in` (`rv-mask`) | translateY + opacity | 1s · in-out |
| `grow-in` (`rv-grow`) | scale .5→1 + opacity | 1s · quart |
| `slide-in-from-bottom` (`rv-slide`) | translateY 33%→0 | 1s · ease-out |
| `handoff` (`rv-handoff` / `rv-handoff-b`) | **firma**: el isotipo entrega la posta, los anillos se separan 5px | 4.2s · quart · loop |
| `progress-fill` (`rv-bar`) | scaleX 0→1, origen izquierdo | 1.2s · quart |
| `rv-marquee` | translateX 0→-50%, loop lineal | continuo |
| `rv-pulse` | punto de estado: scale 1→1.5, opacidad 1→.35 | 2s ease-in-out infinite |
| `rv-breathe` | halo de atmósfera: scale 1→1.08 | lento, infinite |
| `rv-sweep` | barrido horizontal de atmósfera | lento, infinite |

## Accesibilidad

`@media (prefers-reduced-motion: reduce){ * { animation:none!important; transition:none!important } }`
— ya incluido en `motion.css`. Es obligatorio.

## Atmósfera (sección 06)

Cuatro comportamientos superpuestos, todos decorativos y con `pointer-events:none`:
1. **Halo** — degradado radial del par de marca que respira (`rv-breathe`).
2. **Interferencia** — ondas concéntricas con moiré.
3. **Espectro** — puente morado → turquesa → amarillo (`--rv-spectrum-gradient`).
4. **Grano y viñeta** — capa final, siempre arriba.

En modo claro el halo va a **un tercio** de la intensidad.
