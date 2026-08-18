import type { Seeds } from './seeds';

/**
 * EVIDENCIA — the quiet beat.
 *
 * After two volumetric chapters the eye needs a flat one. The population
 * settles onto a wide, shallow plane and organises into a loose lattice with
 * columns of varying height rising from it: measurements, not a chart. It is
 * legible as data without being a literal bar graph, which would look like a
 * dashboard screenshot dropped into a cinematic scene.
 *
 * This is also the chapter that spends yellow — Festa assigns it to data and
 * metrics by convention — and the one where density drops hardest. The loudest
 * thing on screen deliberately stops being the sculpture.
 */
export interface DataFieldParams {
  /** Half-extent of the plane along X. */
  spanX: number;
  /** Half-extent along Z. */
  spanZ: number;
  /** Columns per axis. */
  grid: number;
  /** Maximum column height. */
  rise: number;
  /** Fraction of particles forming the ground plane rather than the columns. */
  groundShare: number;
  /** Scatter of the ground plane. */
  groundJitter: number;
  /** Column thickness. */
  columnR: number;
  /** Tilt of the plane about X. */
  pitch: number;
}

function h2(a: number, b: number): number {
  const s = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

export function buildDataField(seeds: Seeds, p: DataFieldParams, out: Float32Array): void {
  const { count, u, cohort01, accent } = seeds;
  const cp = Math.cos(p.pitch), sp = Math.sin(p.pitch);

  for (let i = 0; i < count; i++) {
    const u2 = u[i * 4 + 1];
    const u3 = u[i * 4 + 2];
    const u4 = u[i * 4 + 3];

    let x: number, y: number, z: number;

    if (accent[i] < p.groundShare) {
      // Ground plane, thinning toward the edges so it has no hard border.
      const rx = Math.pow(u2, 0.72) * (u3 < 0.5 ? -1 : 1);
      x = rx * p.spanX;
      z = (Math.pow(u4, 0.72) * (u2 < 0.5 ? -1 : 1)) * p.spanZ;
      y = (u3 - 0.5) * p.groundJitter;
    } else {
      // Columns on a lattice. Cohort picks the column, so the groups that were
      // filaments a chapter ago become individual measurements here.
      const gi = Math.floor(cohort01[i] * (p.grid - 1) + 0.5);
      const gj = Math.floor(u4 * p.grid);
      const cxu = (gi / (p.grid - 1)) * 2 - 1;
      const czu = (gj / (p.grid - 1)) * 2 - 1;

      const height = p.rise * (0.12 + 0.88 * Math.pow(h2(gi + 1, gj + 1), 1.7));
      const a = u3 * Math.PI * 2;
      const rr = p.columnR * Math.pow(u3, 0.4);

      x = cxu * p.spanX * 0.86 + Math.cos(a) * rr;
      z = czu * p.spanZ * 0.86 + Math.sin(a) * rr;
      y = Math.pow(u2, 0.85) * height;
    }

    const yr = y * cp - z * sp;
    const zr = y * sp + z * cp;

    out[i * 3 + 0] = x;
    out[i * 3 + 1] = yr;
    out[i * 3 + 2] = zr;
  }
}
