/**
 * Smooth 3D value noise for build-time geometry perturbation.
 *
 * A hash alone gives white noise, which only ever reads as jitter. To make a
 * mathematical surface look grown rather than plotted, neighbouring points have
 * to move together — that requires interpolation between lattice values, which
 * is what this provides.
 */
function hash3(ix: number, iy: number, iz: number): number {
  let h = ix * 374761393 + iy * 668265263 + iz * 2147483647;
  h = (h ^ (h >>> 13)) * 1274126177;
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

export function valueNoise3(x: number, y: number, z: number): number {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
  const xf = fade(x - xi), yf = fade(y - yi), zf = fade(z - zi);

  const c000 = hash3(xi, yi, zi),         c100 = hash3(xi + 1, yi, zi);
  const c010 = hash3(xi, yi + 1, zi),     c110 = hash3(xi + 1, yi + 1, zi);
  const c001 = hash3(xi, yi, zi + 1),     c101 = hash3(xi + 1, yi, zi + 1);
  const c011 = hash3(xi, yi + 1, zi + 1), c111 = hash3(xi + 1, yi + 1, zi + 1);

  const x00 = mix(c000, c100, xf), x10 = mix(c010, c110, xf);
  const x01 = mix(c001, c101, xf), x11 = mix(c011, c111, xf);
  return mix(mix(x00, x10, yf), mix(x01, x11, yf), zf) * 2 - 1;
}

/** Two octaves is enough for surface character and costs half of three. */
export function fbm3(x: number, y: number, z: number): number {
  return valueNoise3(x, y, z) * 0.66 + valueNoise3(x * 2.13, y * 2.13, z * 2.13) * 0.34;
}
