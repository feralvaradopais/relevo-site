precision highp float;

// ---------------------------------------------------------------------------
// Attributes
// `position` is target 0 (LATENTE). Reusing the built-in slot saves one
// attribute and one buffer; the other five states ride alongside.
// ---------------------------------------------------------------------------
attribute vec3 aT1;   // PESO
attribute vec3 aT2;   // CANALES
attribute vec3 aT3;   // RELEVO
attribute vec3 aT4;   // LECTURA
attribute vec3 aT5;   // APERTURA
attribute vec4 aSeed; // u1..u4, stable per particle
attribute vec4 aMeta; // x: eta (handoff coord), y: flow, z: sizeMul, w: accent

// ---------------------------------------------------------------------------
// Uniforms
// ---------------------------------------------------------------------------
// One-hot selectors for the outgoing and incoming state. Kept as weight arrays
// rather than integer indices because GLSL ES 1.0 cannot index attributes
// dynamically, and because arrays leave the door open for a cross-blend between
// non-adjacent states if the art direction ever wants one.
uniform float uFromW[6];
uniform float uToW[6];
uniform float uTime;
uniform float uTransit;      // 0 = settled, 1 = mid-transition. Global energy.
uniform float uTransitDir;   // +1 forward through the narrative, -1 backward
uniform float uStagger;      // how much of the transition is spent waiting
uniform float uExcursion;    // curl bow amplitude during transit
uniform float uBreath;       // idle deformation amplitude (0 in reduced motion)
uniform float uMotion;       // global motion gate: 1 normal, 0 reduced-motion
uniform vec2  uPointer;      // -1..1, damped
uniform float uPointerDepth; // parallax strength
uniform float uSize;         // global point scale (DPR / quality aware)
uniform float uFocus;        // camera-space depth of the focal plane
uniform float uFocalRange;   // how quickly particles go out of focus
uniform float uFlowPulse;    // strength of the travelling pulse (CANALES)
uniform float uDensity;      // global alpha scale, used to thin quiet chapters

varying float vAlpha;
varying float vSoft;      // 0 = crisp core, 1 = fully diffused bokeh
varying float vEta;
varying float vHeat;      // transit energy: particles in motion emit light
varying float vAccent;
varying float vFlowLit;
varying float vChroma;
varying float vSpark;
varying float vPx;
varying float vMark;
varying float vGrad;

#include <noise>

void main() {
  // -------------------------------------------------------------------------
  // 1. Per-particle transition schedule.
  //
  // A single global progress applied to every particle is what makes a morph
  // look like a spreadsheet. Instead each particle gets its own window inside
  // the transition, offset by a spatial field. Because the offset is built from
  // the cohort (aSeed.x) and the along-structure coordinate (aMeta.y), whole
  // laminae move together and the change propagates through the body as a wave.
  // -------------------------------------------------------------------------
  float delayField = fract(aSeed.x * 0.83 + aMeta.y * 0.37);
  // Reverse the propagation direction when scrolling backwards so the wave
  // always travels with the narrative rather than against it.
  delayField = mix(1.0 - delayField, delayField, step(0.0, uTransitDir));

  float w = clamp(uStagger, 0.0, 0.95);
  float local = clamp((uTransit - delayField * w) / max(1.0 - w, 1e-3), 0.0, 1.0);

  // A particle's personal energy peaks in the middle of its own window.
  float heat = sin(local * 3.14159265) * step(0.001, uTransit);
  heat *= smoothstep(0.0, 0.12, uTransit) * smoothstep(0.0, 0.12, 1.0 - uTransit);

  // -------------------------------------------------------------------------
  // 2. State blend, interpolated with the particle's OWN progress.
  //
  // This is the difference between a morph that looks designed and one that
  // looks computed. A single global blend factor moves every particle in
  // lockstep, so the population arrives as one flat sheet of change. Using
  // `local` here means the transformation sweeps through the body: cohorts
  // near the head of the delay field have already arrived while cohorts behind
  // them are still leaving, and the eye reads a wave passing through matter.
  //
  // The CPU owns the schedule; the GPU owns every one of the 168k
  // interpolations. Twelve multiply-adds per vertex is nothing.
  // -------------------------------------------------------------------------
  vec3 from =
      position * uFromW[0] + aT1 * uFromW[1] + aT2 * uFromW[2]
    + aT3      * uFromW[3] + aT4 * uFromW[4] + aT5 * uFromW[5];
  vec3 to =
      position * uToW[0]   + aT1 * uToW[1]   + aT2 * uToW[2]
    + aT3      * uToW[3]   + aT4 * uToW[4]   + aT5 * uToW[5];

  // Shape the personal progress. Quintic in, so a particle leaves and arrives
  // without a velocity step at either end.
  float shaped = local * local * local * (local * (local * 6.0 - 15.0) + 10.0);
  vec3 blended = mix(from, to, shaped);

  // -------------------------------------------------------------------------
  // 3. Art-directed excursion.
  //
  // Straight interpolation between two point clouds always looks cheap: every
  // particle takes the shortest path, so the whole population collapses through
  // the centre at the same moment. Bowing each particle along a divergence-free
  // curl field turns the transition into a dispersal-and-regather. Amplitude
  // follows the particle's own window, so the bow opens and closes locally.
  // -------------------------------------------------------------------------
  vec3 pos = blended;
  float bow = sin(local * 3.14159265);
  bow *= bow * (3.0 - 2.0 * bow); // smoothstep-shaped, no sharp onset

  if (uExcursion > 0.001) {
    vec3 c = curl(blended * 0.018 + vec3(aSeed.z * 3.1, aSeed.w * 2.7, uTime * 0.02), 0.35);
    float amp = uExcursion * (0.35 + aSeed.z * 1.3);
    pos += c * bow * amp;
    // Depth migration: particles drift toward the camera as they travel, which
    // makes the transition happen in front of the viewer rather than beside it.
    pos.z += bow * amp * 0.55 * (aSeed.w - 0.35);
  }

  // -------------------------------------------------------------------------
  // 4. Idle life.
  //
  // Even a settled state must not be frozen. A slow low-amplitude curl keeps
  // the body breathing. Gated by uMotion so reduced-motion gets a still image
  // that is still a composed image.
  // -------------------------------------------------------------------------
  if (uBreath > 0.001) {
    float t = uTime * 0.045;
    vec3 b = curl(blended * 0.012 + vec3(t, t * 0.7, -t * 0.5), 0.6);
    pos += b * uBreath * (0.4 + aSeed.y * 0.9);
  }

  // -------------------------------------------------------------------------
  // 5. Pointer parallax, applied in world space and scaled by distance.
  //
  // The goal is not "the object follows the cursor". Near particles must
  // respond more than far ones, because that differential is the only thing
  // that actually communicates depth. A uniform offset communicates nothing.
  // -------------------------------------------------------------------------
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  float camDist = -mv.z;
  float near01 = clamp(1.0 - camDist / 220.0, 0.0, 1.0);
  mv.xy += uPointer * uPointerDepth * (0.15 + near01 * near01 * 1.85);

  gl_Position = projectionMatrix * mv;

  // -------------------------------------------------------------------------
  // 6. Size, focus and luminance.
  //
  // Defocus is faked entirely in the point profile: a particle far from the
  // focal plane gets larger, softer and dimmer, conserving roughly its total
  // energy. This buys most of the look of depth of field for the cost of one
  // smoothstep, and unlike a post-process blur it keeps every particle crisp
  // where it matters.
  // -------------------------------------------------------------------------
  float defocus = clamp(abs(camDist - uFocus) / uFocalRange, 0.0, 1.0);
  defocus = defocus * defocus;
  vSoft = defocus;

  float size = aMeta.z * uSize;
  size *= 1.0 + defocus * 2.2;              // out-of-focus points bloom outward
  size *= 1.0 + heat * 0.5;                  // moving particles read hotter
  float persp = 320.0 / max(camDist, 1.0);
  gl_PointSize = clamp(size * persp, 1.0, 72.0);
  vPx = gl_PointSize;

  // Stable colour bucket. Decorrelated from eta so the palette is mixed
  // through the whole body rather than banded onto one side.
  vChroma = fract(aSeed.w * 7.31 + aSeed.x * 3.77 + aSeed.z * 1.13);

  // Sparkle: a slow shimmer plus an occasional sharp flash, each particle on
  // its own phase and rate so the field never pulses together.
  float sp = sin(uTime * (0.5 + aSeed.z * 1.7) * uMotion + aSeed.w * 6.2831853);
  vSpark = 0.18 * sp + 0.85 * pow(max(sp, 0.0), 14.0);

  // The isotipo appears only on a few of the largest particles.
  // Normalised height inside the form, for the per-chapter spectral mapping.
  vGrad = clamp(blended.y / 46.0 + 0.5, 0.0, 1.0);

  vMark = step(0.9965, fract(aSeed.x * 91.7 + aSeed.z * 13.3)) * step(13.0, gl_PointSize);



  // Energy conservation: a point spread over more area must be dimmer.
  float spread = 1.0 / (1.0 + defocus * 3.4);

  // Distance falloff. Deliberately gentle — the deep field has to stay just
  // visible so the void has a floor, otherwise the world has no scale.
  float far = 1.0 - smoothstep(180.0, 620.0, camDist);
  far = 0.1 + 0.9 * far;

  // Travelling pulse along the filaments. The particles do not move; the light
  // on them does. Costs one sine and reads as traffic.
  float pulse = sin(aMeta.y * 26.0 - uTime * 1.35 + aSeed.x * 6.28);
  vFlowLit = uFlowPulse * uMotion * smoothstep(0.35, 1.0, pulse);

  // Low per-particle alpha is not a brightness choice, it is a COLOUR choice.
  // Under additive blending a few overlapping particles at high alpha clip to
  // pure white and every hue in the cloud is destroyed; the field only stays
  // coloured if a single particle contributes a small fraction and density
  // does the work of building luminance. This is the difference between a
  // field that reads as confetti of light and one that reads as fog.
  vAlpha = spread * far * uDensity * (0.035 + aSeed.y * 0.085);
  vEta = aMeta.x;
  vHeat = heat;
  vAccent = aMeta.w;
}
