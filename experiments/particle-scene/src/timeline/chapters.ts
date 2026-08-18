import { clamp01, lerp, smootherstep } from '../utils/math';

/**
 * The Scene Lab schedule.
 *
 * Two rules shape it:
 *
 * 1. HOLDS ARE AS IMPORTANT AS TRANSITS. A scene that morphs continuously never
 *    lets the viewer look at anything. Each state owns a band of scroll where
 *    it is simply itself, and change happens in the gaps between those bands.
 *
 * 2. INTENSITY IS CHOREOGRAPHED. PESO and LECTURA are deliberately the two
 *    quietest chapters — one thin and scattered, one flat and still — so that
 *    RELEVO and APERTURA have something to be loud against. Every chapter being
 *    spectacular is the same as no chapter being spectacular.
 *
 * Everything below is a pure function of scroll progress. Nothing is a tween,
 * nothing has memory, nothing can drift out of sync no matter how the user
 * scrolls. Scrubbing backwards is not a special case; it is the same function
 * evaluated at a smaller number.
 */

export interface Look {
  /** Overall saturation of the population. Friction drains it; orchestration restores it. */
  chroma: number;
  /**
   * How far the population spreads off the brand pair and onto the Festa
   * spectrum. 0 = purple/teal identity only, 1 = the full purple-teal-yellow-
   * orange ramp. This is the knob that decides how colourful a chapter is,
   * and it is deliberately per-chapter rather than global so intensity can
   * still be choreographed.
   */
  spread: number;
  /** Pink permission. Pink is the action colour; only the conversion chapter gets it. */
  actionMix: number;
  /** Yellow permission. Festa assigns yellow to data and metrics. */
  dataMix: number;
  /**
   * How strongly colour follows the particle's height within the form rather
   * than its own bucket. This is what maps a spectrum across an object — warm
   * at the top, cool at the base — instead of scattering hues at random. Kept
   * per-chapter because it suits a solid object far more than a dispersed field.
   */
  grad: number;
  /** Global alpha. Lower = quieter chapter. */
  density: number;
  exposure: number;
  /** Travelling pulse along the filaments. */
  flowPulse: number;
  /** Idle deformation. */
  breath: number;
  /** Depth-of-field aggressiveness. Small = shallow, cinematic. */
  focalRange: number;
  /** Offset applied to the auto-focus distance, in world units. */
  focusBias: number;
  /** Ambient drift amplitude. */
  drift: number;
}

export interface CameraKey {
  pos: [number, number, number];
  look: [number, number, number];
  fov: number;
  roll: number;
}

export interface Chapter {
  name: string;
  /** Scroll band where this state is held stable. */
  hold: [number, number];
  /** Excursion amplitude of the transit LEAVING this chapter. */
  excursion: number;
  /** Stagger of the transit leaving this chapter (0 = lockstep, 0.9 = long wave). */
  stagger: number;
  look: Look;
  camera: CameraKey;
  /** Portrait override. Mobile is a different composition, not a smaller one. */
  cameraPortrait: CameraKey;
  label: string;
  caption: string;
}

export const CHAPTERS: Chapter[] = [
  {
    name: 'DISPERSIÓN',
    hold: [0.0, 0.085],
    excursion: 9.0,
    stagger: 0.7,
    look: {
      chroma: 0.9, spread: 0.85, actionMix: 0, dataMix: 0.7, grad: 0.25,
      density: 0.85, exposure: 1.15, flowPulse: 0, breath: 0.5,
      focalRange: 120, focusBias: -6, drift: 3.0,
    },
    camera:         { pos: [-78, 26, 146], look: [14, -4, -6], fov: 36, roll: 0.025 },
    cameraPortrait: { pos: [-52, 20, 180], look: [10, 0, -6], fov: 44, roll: 0.015 },
    label: '01 · Dispersión',
    caption: 'Capas que no se alcanzan.',
  },
  {
    name: 'AMPOLLETA',
    hold: [0.185, 0.30],
    excursion: 8.0,
    stagger: 0.62,
    look: {
      chroma: 1.0, spread: 0.7, actionMix: 0, dataMix: 1.0, grad: 0.85,
      density: 1.0, exposure: 1.1, flowPulse: 0, breath: 0.3,
      focalRange: 105, focusBias: 2, drift: 1.6,
    },
    camera:         { pos: [34, 6, 190], look: [-4, -1, 0], fov: 29, roll: 0.0 },
    cameraPortrait: { pos: [14, 4, 214], look: [-2, 3, 0], fov: 35, roll: 0.0 },
    label: '02 · Ampolleta',
    caption: 'Entender antes de prescribir.',
  },
  {
    name: 'FLUJO',
    hold: [0.395, 0.50],
    excursion: 10.0,
    stagger: 0.48,
    look: {
      chroma: 1.0, spread: 0.9, actionMix: 0, dataMix: 0.8, grad: 0.35,
      density: 0.92, exposure: 1.02, flowPulse: 1.0, breath: 0.42,
      focalRange: 150, focusBias: 0, drift: 2.2,
    },
    camera:         { pos: [-96, 30, 138], look: [6, -2, 2], fov: 38, roll: -0.03 },
    cameraPortrait: { pos: [-66, 20, 176], look: [4, 4, 2], fov: 44, roll: -0.02 },
    label: '03 · Flujo',
    caption: 'La materia se vuelve direccional.',
  },
  {
    name: 'ANILLOS',
    hold: [0.60, 0.715],
    excursion: 8.5,
    stagger: 0.66,
    look: {
      chroma: 1.0, spread: 0.3, actionMix: 0, dataMix: 0.4, grad: 0.12,
      density: 1.0, exposure: 1.12, flowPulse: 0.35, breath: 0.34,
      focalRange: 110, focusBias: 0, drift: 1.6,
    },
    camera:         { pos: [22, 15, 132], look: [0, 0, 0], fov: 31, roll: 0.0 },
    cameraPortrait: { pos: [12, 10, 168], look: [0, 2, 0], fov: 36, roll: 0.0 },
    label: '04 · Anillos',
    caption: 'El que entrega y el que recibe.',
  },
  {
    name: 'EVIDENCIA',
    hold: [0.80, 0.885],
    excursion: 6.5,
    stagger: 0.72,
    look: {
      chroma: 0.85, spread: 0.5, actionMix: 0, dataMix: 1.0, grad: 0.5,
      density: 0.52, exposure: 0.94, flowPulse: 0, breath: 0.2,
      focalRange: 190, focusBias: 8, drift: 1.2,
    },
    camera:         { pos: [8, 40, 122], look: [0, -2, 0], fov: 30, roll: 0.0 },
    cameraPortrait: { pos: [4, 36, 152], look: [0, 2, 0], fov: 36, roll: 0.0 },
    label: '05 · Evidencia',
    caption: 'El sistema, medido. Aquí el ruido baja.',
  },
  {
    name: 'CONVERSACIÓN',
    hold: [0.945, 1.0],
    excursion: 0,
    stagger: 0.6,
    look: {
      chroma: 1.0, spread: 0.72, actionMix: 1.0, dataMix: 0.5, grad: 0.15,
      density: 0.95, exposure: 1.12, flowPulse: 0, breath: 0.3,
      focalRange: 120, focusBias: -2, drift: 1.8,
    },
    camera:         { pos: [2, 3, 124], look: [0, 0, 0], fov: 34, roll: 0.0 },
    cameraPortrait: { pos: [2, 5, 158], look: [0, 1, 0], fov: 40, roll: 0.0 },
    label: '06 · Conversación',
    caption: 'Dos partes. Una entrega, otra recibe.',
  },
];

export interface Evaluated {
  from: number;
  to: number;
  /** Raw, unshaped progress through the current transit. 0 during a hold. */
  transit: number;
  look: Look;
  camera: CameraKey;
  excursion: number;
  stagger: number;
}

const scratchLook: Look = { ...CHAPTERS[0].look };
const scratchCam: CameraKey = { pos: [0, 0, 0], look: [0, 0, 0], fov: 30, roll: 0 };

function mixLook(a: Look, b: Look, t: number, out: Look): Look {
  out.chroma = lerp(a.chroma, b.chroma, t);
  out.spread = lerp(a.spread, b.spread, t);
  out.actionMix = lerp(a.actionMix, b.actionMix, t);
  out.dataMix = lerp(a.dataMix, b.dataMix, t);
  out.grad = lerp(a.grad, b.grad, t);
  out.density = lerp(a.density, b.density, t);
  out.exposure = lerp(a.exposure, b.exposure, t);
  out.flowPulse = lerp(a.flowPulse, b.flowPulse, t);
  out.breath = lerp(a.breath, b.breath, t);
  out.focalRange = lerp(a.focalRange, b.focalRange, t);
  out.focusBias = lerp(a.focusBias, b.focusBias, t);
  out.drift = lerp(a.drift, b.drift, t);
  return out;
}

function mixCam(a: CameraKey, b: CameraKey, t: number, out: CameraKey): CameraKey {
  for (let i = 0; i < 3; i++) {
    out.pos[i] = lerp(a.pos[i], b.pos[i], t);
    out.look[i] = lerp(a.look[i], b.look[i], t);
  }
  out.fov = lerp(a.fov, b.fov, t);
  out.roll = lerp(a.roll, b.roll, t);
  return out;
}

/**
 * Maps normalised scroll to everything the scene needs. Allocation-free: the
 * two scratch objects are reused every frame.
 */
export function evaluate(p: number, portrait: boolean): Evaluated {
  const t = clamp01(p);
  const last = CHAPTERS.length - 1;

  // Inside a hold?
  for (let i = 0; i <= last; i++) {
    const [h0, h1] = CHAPTERS[i].hold;
    const before = i === 0 && t <= h1;
    const after = i === last && t >= h0;
    if (before || after || (t >= h0 && t <= h1)) {
      const key = portrait ? CHAPTERS[i].cameraPortrait : CHAPTERS[i].camera;
      return {
        from: i, to: i, transit: 0,
        look: mixLook(CHAPTERS[i].look, CHAPTERS[i].look, 0, scratchLook),
        camera: mixCam(key, key, 0, scratchCam),
        excursion: 0,
        stagger: CHAPTERS[i].stagger,
      };
    }
  }

  // Otherwise we are in the gap between hold i and hold i+1.
  let i = 0;
  for (let k = 0; k < last; k++) {
    if (t > CHAPTERS[k].hold[1] && t < CHAPTERS[k + 1].hold[0]) { i = k; break; }
  }
  const a = CHAPTERS[i];
  const b = CHAPTERS[i + 1];
  const raw = clamp01((t - a.hold[1]) / (b.hold[0] - a.hold[1]));

  const ka = portrait ? a.cameraPortrait : a.camera;
  const kb = portrait ? b.cameraPortrait : b.camera;

  // Look and camera use a quintic; the geometry blend does its shaping
  // per-particle in the shader and receives `raw` untouched, because the
  // stagger windows are defined against linear transit time.
  const eased = smootherstep(raw);

  return {
    from: i,
    to: i + 1,
    transit: raw,
    look: mixLook(a.look, b.look, eased, scratchLook),
    camera: mixCam(ka, kb, eased, scratchCam),
    excursion: a.excursion,
    stagger: a.stagger,
  };
}
