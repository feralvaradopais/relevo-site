/**
 * Festa palette bridge.
 *
 * Every colour here is a literal value from `design-system/tokens/tokens.css`.
 * Nothing is invented, nothing is re-mixed. The scene consumes the canonical
 * tokens; it does not define a parallel palette.
 *
 * Semantic discipline enforced by this file:
 *   - purple / teal are IDENTITY. They carry the two-ring handoff meaning and
 *     are the only chromas allowed to tint the ambient world.
 *   - yellow is DATA. It is rationed to the evidence chapter.
 *   - pink is ACTION. It is allowed in exactly one chapter (the conversation
 *     state) and never as ambient atmosphere.
 */

export const TOKEN = {
  ink000: '#000000',
  ink100: '#0A0A0A',
  ink300: '#1C1C1C',

  text100: '#FFFFFF',
  text200: '#D6D6D6',
  text300: '#B4B4B4',
  text400: '#8A8A8A',

  purple300: '#B57FCB',
  purple500: '#7B3E9C', // anillo que ENTREGA
  purple800: '#2C1436',

  teal300: '#6FD9CE',
  teal500: '#1FA8A0', // anillo que RECIBE
  teal800: '#146E67',

  pink300: '#E06A96',
  pink500: '#B62C64', // ACCIÓN
  pink800: '#4A0F26',

  yellow400: '#FFDA80',
  yellow500: '#FFC63D', // datos y métricas
  orange300: '#F9A574',
  orange500: '#F2662C',
} as const;

/** sRGB hex -> linear-space rgb triplet, matching three.js colour management. */
export function srgbToLinear(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  const to = (c: number) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return [to((n >> 16) & 255), to((n >> 8) & 255), to(n & 255)];
}
