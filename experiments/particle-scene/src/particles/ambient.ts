import { mulberry32 } from '../utils/rng';

/**
 * The ambient population: a deep field that gives the void a floor, and a
 * handful of near-camera motes that give it a ceiling.
 *
 * Neither ever morphs. They are the room the sculpture stands in.
 */
export function buildAmbient(deepCount: number, moteCount: number) {
  const total = deepCount + moteCount;
  const position = new Float32Array(total * 3);
  const seed = new Float32Array(total * 4);
  const meta = new Float32Array(total * 4);
  const kind = new Float32Array(total);
  const rnd = mulberry32(0x9c31);

  for (let i = 0; i < total; i++) {
    const isMote = i >= deepCount;
    const u1 = rnd(), u2 = rnd(), u3 = rnd(), u4 = rnd();

    seed[i * 4 + 0] = u1;
    seed[i * 4 + 1] = u2;
    seed[i * 4 + 2] = u3;
    seed[i * 4 + 3] = u4;

    if (!isMote) {
      // Deep field. A shell rather than a solid ball: a filled volume puts most
      // of its particles near the middle, which reads as fog around the
      // subject instead of distance behind it.
      const r = 260 + Math.pow(rnd(), 0.55) * 620;
      const ct = 1 - 2 * rnd();
      const st = Math.sqrt(Math.max(0, 1 - ct * ct));
      const ph = rnd() * Math.PI * 2;
      position[i * 3 + 0] = r * st * Math.cos(ph);
      // Flatten slightly in Y so the field reads as a space with an orientation
      // rather than an undifferentiated sphere.
      position[i * 3 + 1] = r * ct * 0.68;
      position[i * 3 + 2] = r * st * Math.sin(ph);
      meta[i * 4 + 2] = 0.5 + Math.pow(u3, 3.0) * 1.5;
    } else {
      // Foreground motes, scattered through the volume the camera travels.
      position[i * 3 + 0] = (rnd() - 0.5) * 300;
      position[i * 3 + 1] = (rnd() - 0.5) * 190;
      position[i * 3 + 2] = (rnd() - 0.5) * 300;
      meta[i * 4 + 2] = 0.7 + Math.pow(u3, 2.2) * 2.0;
      kind[i] = 1;
    }

    // Ambient particles carry a handoff coordinate too, so the world is tinted
    // by the same identity logic as the sculpture instead of being grey filler.
    meta[i * 4 + 0] = (u1 * 2 - 1) * 0.85;
    meta[i * 4 + 1] = u2;
    meta[i * 4 + 3] = u4;
  }

  return { position, seed, meta, kind };
}
