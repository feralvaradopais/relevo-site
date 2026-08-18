precision highp float;

// ---------------------------------------------------------------------------
// PARTICLE IDENTITY
//
// Shape: rings. The Relevo isotipo is two overlapping stroked circles, so a
// stroked ring is the brand's own primitive rather than a borrowed one. The
// stroke-to-diameter ratio below (0.22) is taken from the logo geometry
// itself — r 21.5, stroke 12 — so a particle at any size carries the same
// optical weight as the mark.
//
// Colour: each particle owns ONE saturated token, picked once and never
// blended. An earlier build interpolated every particle along a smooth ramp
// and the whole field went muddy grey-lilac: averaging saturated colours in a
// dense additive cloud destroys exactly the vibrancy it was meant to create.
// Discrete assignment is what makes a particle field read as confetti of
// light instead of fog.
// ---------------------------------------------------------------------------

uniform vec3  uNeutral;
uniform vec3  uDeliver;   // purple — the ring that hands over
uniform vec3  uReceive;   // teal — the ring that takes over
uniform vec3  uData;      // yellow — data and metrics by convention
uniform vec3  uWarm;      // orange — campaign and heat
uniform vec3  uAction;    // pink — action, rationed per chapter

uniform float uChroma;    // 0 = all neutral, 1 = full palette
uniform float uSpread;    // how much of the population leaves the brand pair
uniform float uActionMix;
uniform float uDataMix;
uniform float uHeatTint;
uniform float uExposure;
uniform float uOutline;   // ring vs filled bias
uniform float uSparkle;
uniform float uGrad;

varying float vAlpha;
varying float vSoft;
varying float vEta;
varying float vHeat;
varying float vAccent;
varying float vFlowLit;
varying float vChroma;
varying float vSpark;
varying float vPx;
varying float vMark;
varying float vGrad;      // >0.5 = this particle is drawn as the isotipo

void main() {
  vec2 d = gl_PointCoord - 0.5;

  // One pixel in point-coord units. Antialiasing has to happen in this space
  // or small particles alias and large ones look rubbery.
  float px = 1.0 / max(vPx, 1.0);
  float edge = px * 1.4 + vSoft * 0.3;

  float mask;

  if (vMark > 0.5) {
    // The relevo itself: two overlapping rings, left delivering, right
    // receiving. Only ever drawn on a few of the largest near-camera
    // particles, so it is a signature you discover rather than a motif
    // stamped across the field. AGENTS.md is explicit that the logo must not
    // become decoration; a fraction of a percent of the population is the
    // difference between a signature and wallpaper.
    float rr = 0.30, w = 0.075;
    float dl = abs(length(d - vec2(-0.10, 0.0)) - rr) - w;
    float dr = abs(length(d - vec2(0.10, 0.0)) - rr) - w;
    mask = max(1.0 - smoothstep(-edge, edge, dl), 1.0 - smoothstep(-edge, edge, dr));
  } else {
    float r = length(d);
    if (r > 0.5) discard;

    // Rings above the size where a stroke is legible, solid dots below it.
    // A 1px ring is just a dimmer dot, so switching on size keeps both
    // populations sharp instead of quietly losing half the field.
    float ring = 1.0 - smoothstep(-edge, edge, abs(r - 0.34) - 0.075);
    float dot = 1.0 - smoothstep(0.0, 0.30 + edge, r);
    float wantRing = step(5.5, vPx) * uOutline * step(vAccent, 0.72);
    mask = mix(dot, ring, wantRing);

    // A faint core inside the rings so dense regions have something to
    // accumulate and the cloud does not read as empty wireframe.
    mask += (1.0 - smoothstep(0.0, 0.42, r)) * 0.13 * wantRing;
  }

  // Defocused particles keep their shape but lose their edge — which is what a
  // real aperture does, and what a post-process blur cannot do per-particle.
  mask *= mix(1.0, 0.5, vSoft);

  if (mask < 0.004) discard;

  // --- colour -------------------------------------------------------------
  // Six discrete buckets. The particle's position in the handoff biases which
  // bucket it can fall into, so the delivering side of any form still leans
  // purple and the receiving side still leans teal, while the population as a
  // whole stays varied.
  float c = vChroma;
  float side = clamp(vEta * 0.5 + 0.5, 0.0, 1.0);

  // Bucket widths are a colour-balance decision, not an arbitrary split. The
  // neutral share was originally 44% and the dense regions summed to white
  // regardless of everything else — in an additive cloud the achromatic
  // majority always wins. Keeping neutrals under a third is what lets the
  // palette survive into the densest parts of a form.
  vec3 col;
  if (c < 0.30) {
    col = uNeutral;
  } else if (c < 0.60) {
    col = uData;                                     // yellow carries the field
  } else if (c < 0.80) {
    col = mix(uDeliver, uReceive, step(0.5, side));  // identity, biased by side
  } else if (c < 0.90) {
    col = mix(uReceive, uDeliver, step(0.5, side));  // the opposite one, sparsely
  } else if (c < 0.96) {
    col = uWarm;
  } else {
    col = uAction;
  }

  // Yellow and pink are gated rather than ambient: Festa assigns yellow to
  // data and reserves pink for action, so chapters grant them explicitly.
  col = mix(col, uNeutral, step(0.30, c) * step(c, 0.60) * (1.0 - uDataMix) * 0.8);
  col = mix(col, uWarm, step(0.96, c) * (1.0 - uActionMix));

  // Spectral mapping across the form: warm at the top, cool at the base,
  // following --rv-spectrum-gradient. Applied per chapter, because a solid
  // object wants a gradient over it while a dispersed field wants variety.
  vec3 grad;
  if (vGrad < 0.5) grad = mix(uDeliver, uReceive, vGrad * 2.0);
  else             grad = mix(uReceive, mix(uData, uWarm, 0.35), (vGrad - 0.5) * 2.0);
  col = mix(col, mix(col, grad, 0.75), uGrad);

  // uSpread pulls the population back toward the brand pair for chapters that
  // should be less colourful; uChroma desaturates the whole field.
  vec3 pair = mix(uDeliver, uReceive, side);
  col = mix(pair, col, uSpread);

  // Desaturation pulls toward a DIM neutral, not toward the bright text token.
  // Mixing toward #D6D6D6 was quietly adding a white wash to every particle in
  // the scene, which is what made the whole field look milky.
  col = mix(uNeutral * 0.55, col, uChroma);

  // Sparkle. Mostly a slow shimmer with an occasional sharp flash, which is
  // what stops a static field from looking like a printed texture.
  float gain = 1.0 + vSpark * uSparkle * 1.6;
  gain += vHeat * 0.42 + vFlowLit * 0.8;
  col = mix(col, vec3(1.0), vHeat * uHeatTint);

  float a = mask * vAlpha * gain * uExposure;
  if (a < 0.002) discard;

  gl_FragColor = vec4(col * a, a);
}
