import type { Seeds } from './seeds';
import { buildDispersed, type DispersedParams } from './dispersed';
import { buildBulb, type BulbParams } from './bulb';
import { buildFlow, type FlowParams } from './flow';
import { buildRings, type RingsParams } from './rings';
import { buildDataField, type DataFieldParams } from './dataField';
import { buildBubbles, type BubbleParams } from './bubbles';

export { makeSeeds } from './seeds';
export type { Seeds } from './seeds';

/**
 * The six states of the Relevo world.
 *
 * Alternating abstract and figurative: the abstract chapters carry atmosphere
 * and movement, the figurative ones anchor meaning. A run of six abstract
 * states asks the viewer to interpret everything and they interpret nothing; a
 * run of six objects turns a cinematic scene into a slideshow of icons.
 *
 *   01  DISPERSIÓN   abstract    friction — stacked queues jammed at a wall
 *   02  AMPOLLETA    figurative  understanding
 *   03  FLUJO        abstract    transfer — directed channels
 *   04  ANILLOS      figurative  the system — the Relevo mark in three dimensions
 *   05  EVIDENCIA    abstract    measurement, and the quiet beat
 *   06  CONVERSACIÓN figurative  two speech bubbles, delivering and receiving
 *
 * These are experimental Scene Lab states, not approved homepage chapters.
 */
export const STATE_NAMES = [
  'DISPERSION',
  'AMPOLLETA',
  'FLUJO',
  'ANILLOS',
  'EVIDENCIA',
  'CONVERSACION',
] as const;

export type StateName = (typeof STATE_NAMES)[number];
export const STATE_COUNT = STATE_NAMES.length;

const DISPERSION: DispersedParams = {
  // Wide gaps between strata matter more than the strata themselves: the
  // subject of this state is the space the work cannot cross.
  spacing: 11.0,
  reach: 58,
  depth: 38,
  thickness: 1.5,
  wall: 0.06,
  leak: 0.09,
};

const AMPOLLETA: BulbParams = {
  scale: 33,
  glassShare: 0.48,
  baseShare: 0.15,
  innerShare: 0.22,
  thread: 0.022,
  coilTurns: 9,
  surfaceNoise: 0.5,
  tilt: 0.3,
};

const FLUJO: FlowParams = {
  origin: 70,
  nodes: 5,
  nodeRadius: 22,
  bow: 28,
  tube: 5.0,
  twist: 0.5,
  shellShare: 0.7,
};

const ANILLOS: RingsParams = {
  radius: 21,
  shellShare: 0.6,
  pitch: 0.42,
  yaw: 0.55,
  roll: -0.08,
  transferShare: 0.05,
};

const EVIDENCIA: DataFieldParams = {
  spanX: 54,
  spanZ: 40,
  grid: 13,
  rise: 20,
  groundShare: 0.5,
  groundJitter: 1.4,
  columnR: 1.5,
  pitch: 0.16,
};

const CONVERSACION: BubbleParams = {
  width: 42,
  height: 28,
  radius: 7.5,
  depth: 4.0,
  // The stroke covers a fraction of the screen area the interior does, so an
  // equal share of particles makes it hundreds of times denser and it clips to
  // a solid white band. Share has to follow area, not importance.
  strokeShare: 0.3,
  strokeWidth: 1.9,
  separation: 36,
  stagger: 7,
  tailLength: 9,
};

/** Builds all six position sets. Called once, at startup, on the CPU. */
export function buildAllTargets(seeds: Seeds): Float32Array[] {
  const n = seeds.count;
  const t = Array.from({ length: STATE_COUNT }, () => new Float32Array(n * 3));
  buildDispersed(seeds, DISPERSION, t[0]);
  buildBulb(seeds, AMPOLLETA, t[1]);
  buildFlow(seeds, FLUJO, t[2]);
  buildRings(seeds, ANILLOS, t[3]);
  buildDataField(seeds, EVIDENCIA, t[4]);
  buildBubbles(seeds, CONVERSACION, t[5]);
  return t;
}
