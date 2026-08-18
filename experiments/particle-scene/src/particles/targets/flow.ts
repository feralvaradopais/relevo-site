import type { Seeds } from './seeds';

/**
 * FLUJO — transfer.
 *
 * The strata resolve into directed filaments. Each cohort becomes one channel
 * leaving a wide dispersed origin, curving through space and converging on a
 * small number of nodes. The population is unchanged; only its organisation is.
 *
 * Particles are static in this target — the sense of movement comes from the
 * shader, which runs a luminance pulse along each filament using the
 * per-particle flow coordinate. Moving light along a fixed path costs one sine
 * per vertex and reads better than translating geometry, because the channel
 * stays legible while the traffic on it does not.
 *
 * The tubes are hollow. An earlier solid-tube version packed every filament so
 * densely that additive blending clipped it to a white noodle and neither the
 * colour nor the direction survived.
 */
export interface FlowParams {
  origin: number;
  nodes: number;
  nodeRadius: number;
  bow: number;
  tube: number;
  twist: number;
  /** Fraction of particles on the tube wall rather than inside it. */
  shellShare: number;
}

const TAU = Math.PI * 2;

function hash(n: number): number {
  const s = Math.sin(n * 127.1) * 43758.5453;
  return s - Math.floor(s);
}

export function buildFlow(seeds: Seeds, p: FlowParams, out: Float32Array): void {
  const { count, u, cohort, cohorts, accent } = seeds;

  // One path per cohort, so a filament is a shared object rather than a
  // per-particle accident and neighbours stay neighbours.
  const A: number[] = [];
  const B: number[] = [];
  const C: number[] = [];
  for (let c = 0; c < cohorts; c++) {
    const th = hash(c * 3.1) * TAU;
    const ph = Math.acos(1 - 2 * hash(c * 7.7));
    const ox = -p.origin * (0.4 + 0.6 * Math.abs(Math.cos(ph)));
    const oy = p.origin * Math.sin(ph) * Math.cos(th) * 0.8;
    const oz = p.origin * Math.sin(ph) * Math.sin(th) * 0.8;

    const nodeI = c % p.nodes;
    const na = (nodeI / p.nodes) * TAU + 0.4;
    const nz = (nodeI % 2 === 0 ? 1 : -1) * p.nodeRadius * 0.4;
    const dx = p.nodeRadius * 0.5 + Math.cos(na) * p.nodeRadius * 0.26;
    const dy = Math.sin(na) * p.nodeRadius * 0.48;

    const bowDir = hash(c * 11.3) * TAU;
    const bowAmt = p.bow * (0.45 + hash(c * 5.9));

    A.push(ox, oy, oz);
    B.push((ox + dx) * 0.5 + Math.cos(bowDir) * bowAmt * 0.4,
           (oy + dy) * 0.5 + Math.sin(bowDir) * bowAmt,
           (oz + nz) * 0.5 + Math.cos(bowDir * 1.7) * bowAmt);
    C.push(dx, dy, nz);
  }

  for (let i = 0; i < count; i++) {
    const c = cohort[i];
    const u2 = u[i * 4 + 1];
    const u3 = u[i * 4 + 2];
    const u4 = u[i * 4 + 3];

    const t = Math.pow(u2, 0.86);
    const it = 1 - t;
    const q0 = it * it, q1 = 2 * it * t, q2 = t * t;

    const bx = A[c * 3] * q0 + B[c * 3] * q1 + C[c * 3] * q2;
    const by = A[c * 3 + 1] * q0 + B[c * 3 + 1] * q1 + C[c * 3 + 1] * q2;
    const bz = A[c * 3 + 2] * q0 + B[c * 3 + 2] * q1 + C[c * 3 + 2] * q2;

    const taper = 0.24 + 0.76 * it * it;
    const ang = u3 * TAU + t * TAU * p.twist;
    const rr = accent[i] < p.shellShare ? p.tube : p.tube * Math.pow(u4, 0.5);
    const r = rr * taper;

    const tx = C[c * 3] - A[c * 3];
    const ty = C[c * 3 + 1] - A[c * 3 + 1];
    const tz = C[c * 3 + 2] - A[c * 3 + 2];
    const tl = Math.hypot(tx, ty, tz) || 1;
    const nx = tx / tl, ny = ty / tl, nz2 = tz / tl;

    let ax = 0, ay = 1, az = 0;
    if (Math.abs(ny) > 0.9) { ax = 1; ay = 0; }
    let e1x = ny * az - nz2 * ay;
    let e1y = nz2 * ax - nx * az;
    let e1z = nx * ay - ny * ax;
    const e1l = Math.hypot(e1x, e1y, e1z) || 1;
    e1x /= e1l; e1y /= e1l; e1z /= e1l;
    const e2x = ny * e1z - nz2 * e1y;
    const e2y = nz2 * e1x - nx * e1z;
    const e2z = nx * e1y - ny * e1x;

    const ca = Math.cos(ang) * r;
    const sa = Math.sin(ang) * r;

    out[i * 3 + 0] = bx + e1x * ca + e2x * sa;
    out[i * 3 + 1] = by + e1y * ca + e2y * sa;
    out[i * 3 + 2] = bz + e1z * ca + e2z * sa;
  }
}
