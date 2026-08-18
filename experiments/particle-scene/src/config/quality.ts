export type Tier = 'high' | 'medium' | 'low';

export interface QualityProfile {
  tier: Tier;
  sculpture: number;
  deepField: number;
  motes: number;
  cohorts: number;
  maxDpr: number;
  /** Base point scale, tuned per tier so a lower count still reads as dense. */
  pointScale: number;
}

const PROFILES: Record<Tier, Omit<QualityProfile, 'tier'>> = {
  high:   { sculpture: 118000, deepField: 20000, motes: 800, cohorts: 13, maxDpr: 2.0, pointScale: 1.62 },
  medium: { sculpture:  70000, deepField: 12000, motes: 520, cohorts: 12, maxDpr: 1.75, pointScale: 1.85 },
  low:    { sculpture:  38000, deepField:  6500, motes: 300, cohorts: 10, maxDpr: 1.5, pointScale: 2.15 },
};

/**
 * Tier selection is intentionally coarse and cheap. Anything cleverer — timing
 * a probe frame, reading renderer strings — is guesswork that fails on the
 * machines that matter. Screen class plus memory plus pointer type gets the
 * decision right often enough, and the debug overlay allows overriding it while
 * art-directing.
 */
export function detectQuality(): QualityProfile {
  const coarse = matchMedia('(pointer: coarse)').matches;
  const narrow = Math.min(innerWidth, innerHeight) < 700;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
  const cores = navigator.hardwareConcurrency ?? 8;

  let tier: Tier = 'high';
  if (coarse || narrow) tier = 'medium';
  if (mem <= 4 || cores <= 4) tier = 'low';
  if (coarse && (mem <= 4 || cores <= 4)) tier = 'low';

  const override = new URLSearchParams(location.search).get('tier') as Tier | null;
  if (override && override in PROFILES) tier = override;

  return { tier, ...PROFILES[tier] };
}

export function prefersReducedMotion(): boolean {
  if (new URLSearchParams(location.search).has('reduced')) return true;
  return matchMedia('(prefers-reduced-motion: reduce)').matches;
}
