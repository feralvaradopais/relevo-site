export const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
export const clamp01 = (v: number) => clamp(v, 0, 1);
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const smoothstep = (t: number) => {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
};

/** Quintic smootherstep — zero 1st and 2nd derivative at both ends. Used for
 *  camera segments so chapter boundaries have no visible velocity break. */
export const smootherstep = (t: number) => {
  const x = clamp01(t);
  return x * x * x * (x * (x * 6 - 15) + 10);
};

export const invLerp = (a: number, b: number, v: number) => (b === a ? 0 : (v - a) / (b - a));

/**
 * Framerate-independent exponential approach. `halfLife` is in seconds: the
 * distance to the target halves every `halfLife`. Used instead of a naive
 * `lerp(current, target, 0.1)` so damping does not change with frame rate.
 */
export const damp = (current: number, target: number, halfLife: number, dt: number) =>
  target + (current - target) * Math.pow(2, -dt / halfLife);
