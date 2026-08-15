# Layout, grid y espaciado — secciones 09 y 10

## Grid

Doce columnas, contenedor **1140px**, gutter **24px** (16px por debajo de 720px).

| Token | Valor | Nota |
|---|---|---|
| container | 1140px | márgenes 40px desktop / 22px mobile |
| gutter | 24px | 16px bajo 720px |
| section-y | 120px / 72px | desktop / mobile. **Nunca menos de 56px** |
| breakpoints | 720 · 1024 | mobile, tablet, desktop. Nada intermedio |

Full-bleed solo para paneles de color y piezas de motion.

### Ritmo de página
1. Hero — texto a 7 columnas
2. Panel full-bleed — 3 × 4 columnas
3. Split — 5 + 7 columnas
4. Centrado — 8 columnas

## Espaciado — base 4px

`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 120`

Ningún valor fuera de esta escala.

## Radios

`xs 8 · sm 14 · md 20 · lg 32 · xl 40 · pill 999`

Inputs y chips 14, cards e imágenes 20, paneles de sección 32, contenedores hero 40.

## Bordes

Una sola línea en todo el sistema: **1px**.
- Oscuro: `rgba(255,255,255,.12)` — variante `.1` en contenedores de nav.
- Oscuro fuerte: `#262626`.
- Claro: `rgba(0,0,0,.1)`; sobre arena `#E3DACA`.
- Ghost button: excepción a 1.5px.

## Elevación

Solo dos sombras tokenizadas, más el estado plano (borde 1px):
- `--rv-shadow-cta: 0 4px 16px rgba(182,44,100,.4)` — exclusiva del hover de botón.
- `--rv-shadow-card: 0 24px 64px rgba(0,0,0,.22), 0 4px 16px rgba(0,0,0,.1)` — paneles flotantes.
