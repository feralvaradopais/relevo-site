import type { Seeds } from './seeds';

/**
 * CONVERSACIÓN — two speech bubbles.
 *
 * A conversation needs two parties, so there are two bubbles rather than one:
 * the left one belongs to the delivering side, the right one to the receiving
 * side, and they overlap slightly the way the logo's rings do. The final state
 * of the sequence is therefore the same relationship the first mark states,
 * arrived at by a different route.
 *
 * Each bubble is an outlined rounded rectangle with a tail, extruded shallowly
 * so it holds depth, and left mostly hollow. The outline carries the shape;
 * the sparse interior keeps it from looking like a cut-out.
 */


export interface BubbleParams {
  width: number;
  height: number;
  radius: number;
  /** Extrusion depth. */
  depth: number;
  /** Fraction of particles on the outline. */
  strokeShare: number;
  /** Thickness of the outline. */
  strokeWidth: number;
  /** Horizontal separation of the two bubbles. */
  separation: number;
  /** Vertical offset applied in opposite directions to each bubble. */
  stagger: number;
  tailLength: number;
}

/** Perimeter walk of a rounded rectangle, returning a point and its outward normal. */
function roundedRect(t: number, w: number, h: number, r: number): [number, number, number, number] {
  const sw = w - 2 * r;
  const sh = h - 2 * r;
  const arc = (Math.PI / 2) * r;
  const total = 2 * sw + 2 * sh + 4 * arc;
  let d = t * total;

  if (d < sw) return [-sw / 2 + d, h / 2, 0, 1];
  d -= sw;
  if (d < arc) { const a = (d / arc) * (Math.PI / 2); return [sw / 2 + Math.sin(a) * r, sh / 2 + Math.cos(a) * r, Math.sin(a), Math.cos(a)]; }
  d -= arc;
  if (d < sh) return [w / 2, sh / 2 - d, 1, 0];
  d -= sh;
  if (d < arc) { const a = (d / arc) * (Math.PI / 2); return [sw / 2 + Math.cos(a) * r, -sh / 2 - Math.sin(a) * r, Math.cos(a), -Math.sin(a)]; }
  d -= arc;
  if (d < sw) return [sw / 2 - d, -h / 2, 0, -1];
  d -= sw;
  if (d < arc) { const a = (d / arc) * (Math.PI / 2); return [-sw / 2 - Math.sin(a) * r, -sh / 2 - Math.cos(a) * r, -Math.sin(a), -Math.cos(a)]; }
  d -= arc;
  if (d < sh) return [-w / 2, -sh / 2 + d, -1, 0];
  d -= sh;
  const a = (d / arc) * (Math.PI / 2);
  return [-sw / 2 - Math.cos(a) * r, sh / 2 + Math.sin(a) * r, -Math.cos(a), Math.sin(a)];
}

export function buildBubbles(seeds: Seeds, p: BubbleParams, out: Float32Array): void {
  const { count, u, cohort01, accent } = seeds;

  for (let i = 0; i < count; i++) {
    const u2 = u[i * 4 + 1];
    const u3 = u[i * 4 + 2];
    const u4 = u[i * 4 + 3];

    const isReceiver = cohort01[i] >= 0.5;
    const side = isReceiver ? 1 : -1;
    const ox = side * p.separation * 0.5;
    const oy = side * p.stagger;

    // The receiving bubble is slightly smaller — a reply, not a restatement.
    const k = isReceiver ? 0.84 : 1.0;
    const w = p.width * k;
    const h = p.height * k;
    const r = p.radius * k;

    let x: number, y: number, z: number;
    const sel = accent[i];

    if (sel < p.strokeShare) {
      const [px, py, nx, ny] = roundedRect(u2, w, h, r);
      const j = (u3 - 0.5) * p.strokeWidth;
      x = px + nx * j;
      y = py + ny * j;
      z = (u4 - 0.5) * p.depth;
    } else if (sel < p.strokeShare + 0.1) {
      // Tail, angled down and outward from the bubble that is speaking.
      const t = u2;
      const bx = side * (w * 0.5 - r * 1.2);
      x = bx + side * t * p.tailLength * 0.5;
      y = -h / 2 - t * p.tailLength;
      const taper = (1 - t) * p.strokeWidth * 1.6;
      x += (u3 - 0.5) * taper;
      z = (u4 - 0.5) * p.depth * 0.7;
    } else {
      // Sparse interior fill.
      const fx = (u2 - 0.5) * (w - p.strokeWidth * 2);
      const fy = (u3 - 0.5) * (h - p.strokeWidth * 2);
      // Reject the rounded corners approximately, so the fill respects the shape.
      const cxm = Math.max(0, Math.abs(fx) - (w / 2 - r));
      const cym = Math.max(0, Math.abs(fy) - (h / 2 - r));
      const over = Math.hypot(cxm, cym) > r ? 0.86 : 1.0;
      x = fx * over;
      y = fy * over;
      z = (u4 - 0.5) * p.depth * 0.9;
    }

    // Turn each bubble slightly toward the viewer, mirrored, so the pair reads
    // as two things facing each other rather than two flat cards.
    const yaw = side * 0.24;
    const cy = Math.cos(yaw), sy = Math.sin(yaw);
    const xr = x * cy + z * sy;
    const zr = -x * sy + z * cy;

    out[i * 3 + 0] = xr + ox;
    out[i * 3 + 1] = y + oy;
    out[i * 3 + 2] = zr;
  }
}
