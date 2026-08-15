# Logos e isotipos

El logotipo **no es un archivo de imagen en el sistema fuente**: está construido en markup
(texto + SVG inline) para que herede el peso y el tracking de Plus Jakarta Sans y se anime.
Los SVG canónicos en [`../../public/brand/`](../../public/brand/) son la
exportación fiel de esa construcción, para usos donde no se puede componer en
markup (favicon, OG image, firmas de email, impresos).

**En el website, construir el lockup en markup**, igual que el sistema fuente:

```html
<span class="rv-lockup">relev<svg viewBox="6 0 90 55" aria-hidden="true">
  <circle cx="39" cy="27.5" r="21.5" fill="none" stroke="#7B3E9C" stroke-width="12"/>
  <circle cx="63" cy="27.5" r="21.5" fill="none" stroke="#1FA8A0" stroke-width="12"/>
</svg><span class="rv-lockup__descriptor">studio</span></span>
```

```css
.rv-lockup{font-family:var(--rv-font-display);font-weight:800;letter-spacing:-.05em;
  line-height:1.1;color:#FFFFFF;white-space:nowrap}
.rv-lockup svg{width:.9em;height:.55em;vertical-align:baseline;margin-bottom:-.012em;overflow:visible}
.rv-lockup__descriptor{font-weight:600;font-size:.58em;letter-spacing:-.04em;
  color:#D6D6D6;margin-left:.16em}
```

## Reglas fijas

| Regla | Valor |
|---|---|
| Anillo que **entrega** (izquierdo) | morado `#7B3E9C` |
| Anillo que **recibe** (derecho) | turquesa `#1FA8A0` — `#1B8F86` sobre fondos claros |
| Dirección | nunca invertir el par: el método precede al sistema |
| Descriptor "studio" | gris, nunca un croma. `#D6D6D6` sobre oscuro, `#5A5A5A` sobre arena, `#FFFFFF` sobre superficies de color |
| Rosa en el logo | **prohibido**. El rosa es acción, no identidad |
| Geometría | dos círculos r=21.5, cx 39 y 63 (solape de 19 unidades), stroke 12 |
| Favicon ≤24px | mismo trazado con stroke 15 |
| Zona de protección | 1× el diámetro del anillo (43 unidades del viewBox) por lado |
| Tamaño mínimo | 96px de ancho en pantalla, 24mm en impreso |

## Archivos

| Archivo | Uso |
|---|---|
| `isotipo-marca.svg` | isotipo sobre fondos oscuros |
| `isotipo-claro.svg` | isotipo sobre arena / blanco (receptor a teal-600) |
| `isotipo-mono-blanco.svg` / `isotipo-mono-negro.svg` | grabado, sello, watermark, una tinta |
| `isotipo-favicon.svg` | favicon y tamaños ≤24px |
| `lockup-horizontal-*.svg` | lockup completo para OG images, firmas, impresos |
