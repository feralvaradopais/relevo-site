# Tipografía — sección 07

## Familias

| Rol | Familia | Uso |
|---|---|---|
| Display | **Plus Jakarta Sans** | Headers, botones, wordmark, números |
| Texto | **Hanken Grotesk** | Cuerpo largo, etiquetas de UI, overlines |

Ambas son Google Fonts. Carga exacta usada en el sistema:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800&display=swap" rel="stylesheet">
```

Para el website productivo: self-hostear ambas en woff2 con `font-display:swap` y los mismos
pesos. No sustituir por Inter ni por la fuente de sistema.

## Pesos y su trabajo

| Peso | Uso permitido |
|---|---|
| 800 ExtraBold | **solo** H1 y wordmark |
| 700 Bold | H2 y H3 |
| 600 SemiBold | H4, botones, énfasis, overlines |
| 500 Medium | cuerpo destacado |
| 400 Regular | cuerpo largo |

## Escala (valores literales del documento)

| Rol | Familia | Tamaño | Peso | Tracking | Line-height |
|---|---|---|---|---|---|
| H1 hero | Display | `clamp(2.6rem, 6.5vw, 72px)` | 800 | -0.05em | 1.02 |
| H2 sección | Display | 34px | 700 | -0.04em | 1.1 |
| H3 panel | Display | 25px | 700 | -0.04em | 1.1 |
| H4 / card title | Display | 19px | 700 | -0.02em | 1.2 |
| Botón | Display | 16px (S 14 / L 18) | 600 | normal | 1 |
| Nav link | Texto | 14.5px | 500 | normal | 1.4 |
| Cuerpo | Texto | 15px | 400 | normal | 1.6 |
| Cuerpo chico / pie | Texto | 13–13.5px | 400 | normal | 1.6 |
| Overline | Texto | 12px | 600 | 0.1em, mayúsculas | 1.4 |
| Mono / token | `ui-monospace, monospace` | 11px | 400 | normal | 1.4 |
| Descriptor apilado | Display | .58em del wordmark | 600 | -0.04em (0.28em en versión apilada) | — |

`text-wrap: pretty` en todos los párrafos largos.

## Reglas

- Tracking de headers **constante en -0.05em**; nunca positivo.
- La jerarquía sobre negro se hace **por opacidad de blanco**, no por color:
  `#FFFFFF → #D6D6D6 → #B4B4B4 → #8A8A8A`.
- Ancho de medida del cuerpo: `max-width` 700–760px.
