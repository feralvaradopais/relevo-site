# Color — secciones 03, 04, 04 · bis y 05

## Estructura

La base es **negra**; la jerarquía tipográfica se hace por opacidad de blanco.
Sobre esa base hay **dos cromas de marca** y **tres de apoyo**.

| Rango | Croma | Hex | Trabajo |
|---|---|---|---|
| Marca | Morado | `#7B3E9C` | Anillo que **entrega**. Método, diagnóstico, research |
| Marca | Turquesa | `#1FA8A0` | Anillo que **recibe**. Producto, sistema y estado correcto |
| Apoyo | Rosa | `#B62C64` | **Acción**: CTA, foco, énfasis. Nunca decorativo, nunca en el logo |
| Apoyo | Amarillo | `#FFC63D` | Datos y métricas por convención; libre como croma |
| Apoyo | Naranja | `#F2662C` | Campaña y calor. Croma pleno, nunca botón primario |

**Regla de composición:** un croma domina cada pantalla; el resto aparece en dosis
**bajo el 10% del área**.

## Estado

No son cromas de marca. Correcto reusa el turquesa (`#1FA8A0` sobre `#0B2A25`);
incorrecto es rojo (`#FF5C5C` sobre `#2E0F12`).

## Rampas

Siete familias más estado — ink, text, pink, purple, teal, yellow, orange.
Los pasos extraídos están en [`../tokens/tokens.css`](../tokens/tokens.css) y
la referencia visual completa permanece en la sección 04 del documento fuente.

## Modo claro

Se usa **solo para producto, documentación y papelería**. La cara pública es oscura.

- Fondo de producto: `#F7F7F5`. Neutro cálido para impresos y aplicaciones: arena `#FBF8F1`, hundido `#F3EDE1`.
- Texto `#111111`, secundario `#5A5A5A`, líneas `rgba(0,0,0,.1)` / `#E3DACA` sobre arena.
- **Correcciones obligatorias de contraste en claro:** el morado pasa sin cambios (6.6:1 sobre arena); el turquesa baja a **600 · `#1B8F86`** para alcanzar 3:1. El 500 de la cara oscura no alcanza sobre claro. El rosa usa `#98204F` y el amarillo `#D19410`.

## Gradientes

| Token | Valor | Uso |
|---|---|---|
| `--rv-brand-gradient` | `135deg, #7B3E9C → #1FA8A0` | el par del logotipo; entradas y cierres |
| `--rv-pink-gradient` | `135deg, #B62C64 → #2A0A17` | bloques de acción |
| `--rv-yellow-gradient` | `135deg, #FFC63D → #2A1F08` | bloques de dato |
| `--rv-spectrum-gradient` | `224deg, #7B3E9C -26% → #1FA8A0 40% → #FFC63D 112%` | atmósfera: de marca a apoyo |
| `--rv-panel-gradient` | `137.63deg, #1C1C1C → #000000` | paneles oscuros |

Los gradientes son solo para entradas y cierres de sección, nunca fondo de contenido.
