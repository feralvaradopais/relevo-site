# Componentes — sección 13 del design system

Valores literales del documento fuente. Todo lo interactivo responde en **300ms** con el
easing firma `cubic-bezier(.25,1,.5,1)`.

## Botones

Todos son pills full-round (`border-radius:999px`), `display:inline-flex`, `gap:8px`,
`font-family: Plus Jakarta Sans`, `font-weight:600`, con una flecha `↗` como último hijo.

| Variante | Fondo | Texto | Padding | Font-size |
|---|---|---|---|---|
| Secundario (default) | `#1C1C1C` | `#FFFFFF` | 14px 24px | 16px |
| Primario / acción | `#B62C64` | `#FFFFFF` | 14px 24px | 16px |
| Ghost | transparente, borde `1.5px solid rgba(255,255,255,.25)` | `#FFFFFF` | 13px 23px | 16px |
| Link | sin fondo, `border-bottom:1.5px solid rgba(182,44,100,.3)` | `#E06A96` | 8px 2px | 15px, gap 6px |
| Small | `#1C1C1C` | `#FFFFFF` | 11px 20px | 14px |
| Large | `#1C1C1C` | `#FFFFFF` | 17px 30px | 18px |
| Deshabilitado | `#262626` | `rgba(255,255,255,.32)` | 14px 24px | 16px, `cursor:not-allowed` |

**Estados**
- Hover (sólidos y primario): `transform:translateY(-2px)` + `box-shadow:0 4px 16px rgba(182,44,100,.4)`, transición 300ms quart sobre `transform` y `box-shadow`.
- Hover (ghost): `border-color:#FFFFFF`, 300ms quart.
- Hover (link): `border-color:#E06A96`, 300ms.
- Focus visible: `outline:2px solid #B62C64; outline-offset:3px` (global, en `base.css`).
- Deshabilitado: sin hover, sin sombra.
- La flecha `↗` se desplaza en hover; el desplazamiento acompaña al `translateY` del botón.

## Badges y estados

Pills de `padding:8px 16px`, `border-radius:999px`, `font-weight:600`, `font-size:14px`,
con un punto de 8px a la izquierda cuando marcan estado.

| Badge | Fondo | Texto | Punto |
|---|---|---|---|
| En construcción | `#2A0A17` | `#E06A96` | `#B62C64` con `rv-pulse 2s ease-in-out infinite` |
| Esperando definición | `#FFDA80` | `#E06A96` | `#B62C64` |
| Entregado | `#1C1C1C` | `rgba(255,255,255,.68)` | `rgba(94,26,16,.6)` |
| Neutro (p. ej. "Sprint 3 · día 12") | `#1C1C1C` | `#FFFFFF` | — |

Tag rectangular: `padding:5px 12px`, `border-radius:6px`, `font-size:12px`, Hanken Grotesk,
`letter-spacing:.04em`, mayúsculas, fondo `rgba(182,44,100,.12)`, texto `#E06A96`.

## Barra de navegación

Contenedor `border:1px solid rgba(255,255,255,.1)`, `border-radius:24px`.
Fila: `display:flex; align-items:center; gap:26px; padding:16px 26px; background:#0A0A0A;
border-bottom:1px solid rgba(255,255,255,.1); flex-wrap:wrap`.

- Lockup a `font-size:24px` con `margin-right:auto`.
- Links: Hanken Grotesk 14.5px weight 500. Activo `#FFFFFF`, inactivo `#B4B4B4`.
- CTA de nav: pill `#1C1C1C`, `padding:10px 18px`, 14px, gap 7px.

## Paneles de sección

`border-radius:32px`, `padding:30px`, `min-height:200px`, flex column con
`justify-content:space-between`, sombra `0 24px 64px rgba(0,0,0,.22), 0 4px 16px rgba(0,0,0,.1)`.
Flecha `↙` decorativa arriba a la derecha (`align-self:flex-end`, 26px, opacidad .85 sobre
fondo oscuro / .7 sobre amarillo). Titular `font-size:25px`, weight 700,
`letter-spacing:-.04em`, `line-height:1.1`.

Fondos usados: `#B62C64` (texto blanco), `#4A0F26` (texto blanco), `#FFC63D` (texto `#0A0A0A`).
Grid: `repeat(auto-fit, minmax(250px,1fr))`, gap 16px.

## Cards, pricing, formularios, footer, tabs y tabla

Están construidos en la sección 13 del
[documento fuente](../reference/claude-design-v5/Relevo%20Studio%20Design%20System%20v5%20Festa.dc.html)
(y su equivalente en claro en 05 · bis). **Leer el markup directamente ahí**
antes de implementar: cada uno lleva sus valores inline, sin abstracción
intermedia. Patrón común:

- Card: `background:#141414`, `border:1px solid rgba(255,255,255,.12)`, `border-radius:20–32px`, padding 24–30px.
- Input: `border-radius:14px`, borde `rgba(255,255,255,.12)`, placeholder `#8A8A8A`, foco con outline rosa.
- Error: `--rv-state-err #FF5C5C` sobre `#2E0F12`. Correcto: `--rv-state-ok #1FA8A0` sobre `#0B2A25`.
- Overline de sección: Hanken Grotesk 12px, weight 600, mayúsculas, `letter-spacing:.1em`, color del croma dominante de esa sección.

## Reglas de color en componentes

- **El rosa `#B62C64` es el único color de acción.** Si algo es rosa, se hace clic.
- Morado y turquesa son identidad (los anillos del logo); no se usan para CTA.
- Un croma domina cada pantalla; el resto vive bajo el 10% del área.
- El amarillo ordena datos y métricas por convención, pero puede llevar una pieza completa.
- El naranja es croma pleno de campaña, nunca botón primario.
