import { mulberry32 } from '../../utils/rng';

/**
 * Every particle owns a stable identity: four random scalars plus a cohort
 * index. EVERY target state is a pure function of that identity.
 *
 * This is the single most important decision in the particle architecture.
 * If each state were sampled independently, particle i would land in an
 * unrelated place in every state and the morph would read as mush — the
 * classic "point cloud lerp" that makes a prototype look like a demo.
 *
 * Because all states share the identity, and because `cohort` means the same
 * thing everywhere ("which group do I belong to" — a sheet, a lane, a
 * filament, a ring), groups of particles travel together through the whole
 * narrative. You can watch a lamina become a queue become a channel become a
 * lamina again. That legibility is the art direction, not a side effect.
 */
export interface Seeds {
  readonly count: number;
  readonly cohorts: number;
  /** u1..u4 in [0,1), interleaved xyzw. */
  readonly u: Float32Array;
  /** Integer cohort index per particle. */
  readonly cohort: Uint16Array;
  /** cohort normalised to [0,1]. */
  readonly cohort01: Float32Array;
  /**
   * Handoff coordinate in [-1,1]. -1 = fully on the delivering (purple) side,
   * +1 = fully on the receiving (teal) side, 0 = the handoff plane itself.
   * This is the particle's permanent identity in the relevo and it drives
   * colour in every single state. Only the expression changes, never the fact.
   */
  readonly eta: Float32Array;
  /** Along-structure coordinate in [0,1]. Drives flow pulses and morph stagger. */
  readonly flow: Float32Array;
  /** Per-particle size multiplier, long-tailed so a few particles are notably bigger. */
  readonly sizeMul: Float32Array;
  /** Sparse accent selector in [0,1]; only the top few percent ever take a chroma accent. */
  readonly accent: Float32Array;
}

export function makeSeeds(count: number, cohorts: number, seed = 0x5e1a): Seeds {
  const rnd = mulberry32(seed);
  const u = new Float32Array(count * 4);
  const cohort = new Uint16Array(count);
  const cohort01 = new Float32Array(count);
  const eta = new Float32Array(count);
  const flow = new Float32Array(count);
  const sizeMul = new Float32Array(count);
  const accent = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const u1 = rnd();
    const u2 = rnd();
    const u3 = rnd();
    const u4 = rnd();
    u[i * 4 + 0] = u1;
    u[i * 4 + 1] = u2;
    u[i * 4 + 2] = u3;
    u[i * 4 + 3] = u4;

    // Cohort from u1. Deliberately NOT random per state — this is the thread
    // that stitches the six states into one continuous world.
    const c = Math.min(cohorts - 1, Math.floor(u1 * cohorts));
    cohort[i] = c;
    cohort01[i] = cohorts > 1 ? c / (cohorts - 1) : 0.5;

    // eta spans the handoff axis. Cohorts map linearly onto it so cohort order
    // IS delivery order: low cohorts sit on the purple side, high on the teal.
    eta[i] = cohort01[i] * 2 - 1;

    flow[i] = u2;

    // Size distribution: mostly small, with a long tail. A uniform size makes a
    // particle field look printed; a long tail makes it look photographed.
    sizeMul[i] = 0.55 + Math.pow(u3, 3.2) * 2.6;

    accent[i] = u4;
  }

  return { count, cohorts, u, cohort, cohort01, eta, flow, sizeMul, accent };
}
