import type { Seeds } from './seeds';

/**
 * DISPERSIÓN — friction, rendered as congestion rather than confetti.
 *
 * The lazy way to show "things are a mess" is to scatter particles at random.
 * That reads as noise and says nothing about an organisation.
 *
 * Here the population falls into separate horizontal strata that cannot reach
 * each other, and inside each stratum the work piles up against a wall near
 * the centre, with only a thin trickle getting past. Stacked queues, all
 * jammed at the same point, nothing crossing between them — a recognisable
 * picture of a company where meaningful work waits on a manual handoff.
 */
export interface DispersedParams {
  spacing: number;
  reach: number;
  depth: number;
  thickness: number;
  /** Position of the blocking wall along the flow axis, as a fraction of reach. */
  wall: number;
  leak: number;
}

function vhash(x: number, y: number, z: number): number {
  const s = Math.sin(x * 12.9898 + y * 78.233 + z * 37.719) * 43758.5453;
  return s - Math.floor(s);
}

export function buildDispersed(seeds: Seeds, p: DispersedParams, out: Float32Array): void {
  const { count, u, cohort, cohorts, accent } = seeds;
  const mid = (cohorts - 1) / 2;

  for (let i = 0; i < count; i++) {
    const u2 = u[i * 4 + 1];
    const u3 = u[i * 4 + 2];
    const u4 = u[i * 4 + 3];

    const layer = cohort[i] - mid;

    // The exponent pushes the distribution hard against the wall: an
    // accumulation, not a spread.
    let x = -p.reach + p.reach * (1 + p.wall) * Math.pow(u2, 0.34);

    if (accent[i] < p.leak) {
      x = p.reach * p.wall + Math.pow(u3, 1.8) * p.reach * (1 - p.wall) * 1.7;
    }

    const sag = Math.sin(x * 0.05 + layer * 0.9) * p.spacing * 0.24;
    const y = layer * p.spacing + (u3 - 0.5) * p.thickness + sag;
    const z = (u4 - 0.5) * 2 * p.depth * (0.3 + 0.7 * vhash(x * 0.04, layer, u2 * 3));

    out[i * 3 + 0] = x;
    out[i * 3 + 1] = y;
    out[i * 3 + 2] = z;
  }
}
