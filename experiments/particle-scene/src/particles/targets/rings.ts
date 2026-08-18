import type { Seeds } from './seeds';

/**
 * ANILLOS — the system.
 *
 * The Relevo isotipo, in three dimensions: two stroked circles overlapping,
 * the left one delivering, the right one receiving. Geometry is taken from
 * design-system/docs/logo.md rather than eyeballed — r 21.5, centres at cx 39
 * and 63, stroke 12 — which fixes the ratios exactly:
 *
 *     centre separation / radius = 24 / 21.5
 *     stroke / radius            = 12 / 21.5
 *
 * "Dirección: nunca invertir el par: el método precede al sistema." The
 * delivering ring stays on the left in every framing.
 *
 * The pair is tilted out of the picture plane so it reads as an object in the
 * world rather than a logo pasted onto the canvas — the design system is
 * explicit that the mark must not become decoration. Seen at an angle, the two
 * tori interlock in depth and the overlap becomes a real intersection in
 * space, which is the handoff the mark is describing.
 */

const TAU = Math.PI * 2;

// Canonical logo ratios.
const SEP_OVER_R = 24 / 21.5;
const STROKE_OVER_R = 12 / 21.5;

export interface RingsParams {
  /** Radius of each ring in world units. */
  radius: number;
  /** Fraction of particles on the tube surface rather than inside it. */
  shellShare: number;
  /** Tilt about X, radians — leans the pair away from the camera. */
  pitch: number;
  /** Tilt about Y, radians — turns the pair so the two rings separate in depth. */
  yaw: number;
  /** Small in-plane rotation. */
  roll: number;
  /** Fraction of particles that leave the rings and cross between them. */
  transferShare: number;
}

export function buildRings(seeds: Seeds, p: RingsParams, out: Float32Array): void {
  const { count, u, cohort01, accent } = seeds;

  const R = p.radius;
  const tube = (R * STROKE_OVER_R) / 2;
  const sep = (R * SEP_OVER_R) / 2;

  const cp = Math.cos(p.pitch), sp = Math.sin(p.pitch);
  const cy = Math.cos(p.yaw), sy = Math.sin(p.yaw);
  const cr = Math.cos(p.roll), sr = Math.sin(p.roll);

  for (let i = 0; i < count; i++) {
    const u2 = u[i * 4 + 1];
    const u3 = u[i * 4 + 2];
    const u4 = u[i * 4 + 3];

    // Cohort decides which ring. Low cohorts are the delivering side and carry
    // eta < 0, so the left ring is purple by the same rule that colours every
    // other state — the identity is not re-declared here, it is inherited.
    const isReceiver = cohort01[i] >= 0.5;
    const cx = isReceiver ? sep : -sep;

    let x: number, y: number, z: number;

    if (accent[i] < p.transferShare) {
      // A thin population caught mid-handoff, arcing through the overlap from
      // one ring to the other. Without it the two rings are two objects; with
      // it they are one gesture.
      // A handful of particles caught mid-handoff, arcing over the top of the
      // overlap from one ring to the other. An earlier version fanned them
      // across the whole intersection and rendered as a bright wedge sitting
      // in the middle of the mark, which read as a rendering fault rather than
      // as transfer.
      const t = u2;
      const a0 = Math.PI * 0.5 + (u3 - 0.5) * 0.5;
      const from = { x: -sep + Math.cos(a0) * R, y: Math.sin(a0) * R };
      const to = { x: sep + Math.cos(a0) * R, y: Math.sin(a0) * R };
      const it = 1 - t;
      const mx = (from.x + to.x) * 0.5;
      const my = (from.y + to.y) * 0.5 + R * 0.42;
      x = it * it * from.x + 2 * it * t * mx + t * t * to.x;
      y = it * it * from.y + 2 * it * t * my + t * t * to.y;
      z = (u4 - 0.5) * R * 0.1;
    } else {
      // Torus surface. A shell keeps the stroke reading as a stroke; a filled
      // tube at this density would clip to white and lose the ring entirely.
      const a = u2 * TAU;
      const b = u3 * TAU;
      const rr = accent[i] < p.shellShare ? tube : tube * Math.pow(u4, 0.45) * 0.85;
      // Oblate cross-section. A circular tube renders as a bagel; the logo is
      // a STROKE, so the section is flattened in depth and the ring reads as a
      // drawn line that happens to exist in space.
      const ringR = R + Math.cos(b) * rr;
      x = cx + Math.cos(a) * ringR;
      y = Math.sin(a) * ringR;
      z = Math.sin(b) * rr * 0.4;
    }

    // roll → pitch → yaw
    let x1 = x * cr - y * sr;
    let y1 = x * sr + y * cr;
    let z1 = z;

    const y2 = y1 * cp - z1 * sp;
    const z2 = y1 * sp + z1 * cp;

    const x3 = x1 * cy + z2 * sy;
    const z3 = -x1 * sy + z2 * cy;

    out[i * 3 + 0] = x3;
    out[i * 3 + 1] = y2;
    out[i * 3 + 2] = z3;
  }
}
