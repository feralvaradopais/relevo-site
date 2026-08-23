import { fbm3 } from '../../utils/noise';

/**
 * Surface-of-revolution sampling.
 *
 * Every figurative form in the scene is built as a SHELL, never as a filled
 * volume. This is the single decision that fixed the look: a solid tube or a
 * filled body packs so many particles into the same screen pixels that additive
 * blending clips them to white, and the entire palette dies in exactly the
 * places the form is most visible. A shell with a sparse interior keeps black
 * between the particles, and black between particles is what lets colour and
 * silhouette survive.
 */

export interface Profile {
  /** Ordered [y, radius] control points, y descending or ascending consistently. */
  points: [number, number][];
}

/** Linear interpolation along a lathe profile. */
export function radiusAt(profile: Profile, y: number): number {
  const p = profile.points;
  if (y <= p[0][0]) return p[0][1];
  if (y >= p[p.length - 1][0]) return p[p.length - 1][1];
  for (let i = 0; i < p.length - 1; i++) {
    const [y0, r0] = p[i];
    const [y1, r1] = p[i + 1];
    if (y >= y0 && y <= y1) {
      const t = (y - y0) / (y1 - y0 || 1);
      return r0 + (r1 - r0) * t;
    }
  }
  return p[p.length - 1][1];
}

/** Cumulative arc length table, so sampling is even over the surface rather
 *  than bunched wherever the profile happens to have control points. */
export function arcTable(profile: Profile, steps = 256): { y: number[]; cum: number[] } {
  const p = profile.points;
  const y0 = p[0][0];
  const y1 = p[p.length - 1][0];
  const y: number[] = [];
  const cum: number[] = [0];
  let prevY = y0;
  let prevR = radiusAt(profile, y0);
  y.push(y0);
  for (let i = 1; i <= steps; i++) {
    const yy = y0 + ((y1 - y0) * i) / steps;
    const rr = radiusAt(profile, yy);
    // Weight by radius so wide bands of the surface receive proportionally
    // more particles — otherwise the narrow neck of a bulb is as dense as its
    // globe and the form reads inside out.
    const seg = Math.hypot(yy - prevY, rr - prevR) * Math.max(rr, 0.08);
    cum.push(cum[i - 1] + seg);
    y.push(yy);
    prevY = yy;
    prevR = rr;
  }
  return { y, cum };
}

/** Inverse-CDF lookup: maps u in [0,1] to a y position with even surface density. */
export function sampleY(table: { y: number[]; cum: number[] }, u: number): number {
  const total = table.cum[table.cum.length - 1];
  const target = u * total;
  let lo = 0;
  let hi = table.cum.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (table.cum[mid] < target) lo = mid + 1; else hi = mid;
  }
  return table.y[Math.max(0, lo - 1)];
}

/** Small coherent displacement so a mathematical surface looks made, not plotted. */
export function roughen(x: number, y: number, z: number, amt: number, out: number[]): void {
  out[0] = x + fbm3(x * 0.09, y * 0.09, z * 0.09) * amt;
  out[1] = y + fbm3(y * 0.085 + 12.7, z * 0.085, x * 0.085) * amt;
  out[2] = z + fbm3(z * 0.088, x * 0.088 + 4.1, y * 0.088) * amt;
}
