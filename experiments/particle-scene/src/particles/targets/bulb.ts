import type { Seeds } from './seeds';
import { arcTable, radiusAt, sampleY, roughen, type Profile } from './lathe';

/**
 * AMPOLLETA — understanding.
 *
 * Built as three parts that read as one object: a glass shell, a threaded
 * screw base, and a filament suspended inside. The filament matters more than
 * it looks: without something bright and structured behind the glass the shape
 * is just an outline, and the eye reads a balloon.
 *
 * Note for the record — a lightbulb is an object Dala also uses. It was
 * flagged before building and kept at the client's explicit direction. The
 * profile, the threaded base, the coil geometry, the colour treatment and the
 * position in the sequence are all authored here rather than matched to
 * theirs.
 */

const TAU = Math.PI * 2;

// Profile in normalised units, y from base to top. Radii are half-widths.
const GLASS: Profile = {
  points: [
    [0.00, 0.30],
    [0.12, 0.275],
    [0.24, 0.29],
    [0.36, 0.375],
    [0.48, 0.485],
    [0.60, 0.580],
    [0.72, 0.648],
    [0.84, 0.685],
    [0.96, 0.680],
    [1.06, 0.640],
    [1.14, 0.575],
    [1.22, 0.480],
    [1.29, 0.350],
    [1.34, 0.185],
    [1.37, 0.00],
  ],
};

const BASE: Profile = {
  points: [
    [-0.44, 0.00],
    [-0.42, 0.13],
    [-0.38, 0.21],
    [-0.30, 0.25],
    [-0.04, 0.26],
    [0.00, 0.30],
  ],
};

export interface BulbParams {
  scale: number;
  /** Fraction of the population on the glass shell. */
  glassShare: number;
  /** Fraction on the screw base. */
  baseShare: number;
  /** Fraction that stays inside the glass as sparse volume. */
  innerShare: number;
  /** Depth of the screw thread. */
  thread: number;
  /** Turns of the filament coil. */
  coilTurns: number;
  surfaceNoise: number;
  tilt: number;
}

export function buildBulb(seeds: Seeds, p: BulbParams, out: Float32Array): void {
  const { count, u, accent } = seeds;
  const glassTable = arcTable(GLASS);
  const baseTable = arcTable(BASE);
  const tmp = [0, 0, 0];
  const s = p.scale;
  const cosT = Math.cos(p.tilt);
  const sinT = Math.sin(p.tilt);

  const glassEnd = p.glassShare;
  const baseEnd = glassEnd + p.baseShare;
  const innerEnd = baseEnd + p.innerShare;

  for (let i = 0; i < count; i++) {
    const u1 = u[i * 4 + 0];
    const u2 = u[i * 4 + 1];
    const u3 = u[i * 4 + 2];
    const u4 = u[i * 4 + 3];
    const sel = accent[i];

    let x: number, y: number, z: number;

    if (sel < glassEnd) {
      // Glass shell.
      y = sampleY(glassTable, u2);
      const r = radiusAt(GLASS, y);
      const a = u3 * TAU;
      x = Math.cos(a) * r;
      z = Math.sin(a) * r;
    } else if (sel < baseEnd) {
      // Screw base, with a helical thread cut into the radius.
      y = sampleY(baseTable, u2);
      let r = radiusAt(BASE, y);
      const a = u3 * TAU;
      // The thread is a helix: radius modulates with angle AND height together.
      r += Math.sin(a * 1.0 + y * 62.0) * p.thread * (y < -0.02 ? 1 : 0.25);
      x = Math.cos(a) * r;
      z = Math.sin(a) * r;
    } else if (sel < innerEnd) {
      // Sparse interior so the glass has volume rather than being a soap film.
      y = 0.34 + u2 * 0.72;
      const r = radiusAt(GLASS, y) * Math.pow(u4, 0.5) * 0.9;
      const a = u3 * TAU;
      x = Math.cos(a) * r;
      z = Math.sin(a) * r;
    } else {
      // Filament: a coil between two support wires. This is the part that
      // makes the object read as a lamp and not as a vase.
      if (u4 < 0.3) {
        // Support wires rising from the base into the globe.
        const t = u2;
        const side = u1 < 0.5 ? -1 : 1;
        x = side * 0.062 * (0.4 + t * 0.6);
        y = 0.06 + t * 0.52;
        z = (u3 - 0.5) * 0.014;
      } else {
        // Coil. Kept small and given many turns — an earlier version used a
        // wide five-turn helix and rendered as a chain of separate hoops
        // floating inside the glass rather than as a filament.
        const t = u2;
        const a = t * TAU * p.coilTurns;
        x = (t - 0.5) * 0.26 + Math.cos(a) * 0.055;
        y = 0.60 + Math.sin(a) * 0.055;
        z = (u3 - 0.5) * 0.018;
      }
    }

    x *= s; y *= s; z *= s;
    // Centre the object on the globe rather than on the whole silhouette, so
    // the camera frames what the eye considers the subject.
    y -= 0.42 * s;

    if (p.surfaceNoise > 0 && sel < innerEnd) {
      roughen(x, y, z, p.surfaceNoise, tmp);
      x = tmp[0]; y = tmp[1]; z = tmp[2];
    }

    const xr = x * cosT - z * sinT;
    const zr = x * sinT + z * cosT;

    out[i * 3 + 0] = xr;
    out[i * 3 + 1] = y;
    out[i * 3 + 2] = zr;
  }
}
