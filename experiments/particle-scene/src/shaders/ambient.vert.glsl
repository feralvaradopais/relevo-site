precision highp float;

// The ambient population never morphs. It exists to give the void a scale.
// Two layers share this program:
//   aKind = 0  deep field  — very far, very small, barely there
//   aKind = 1  foreground  — few, near the camera, heavily defocused
// Foreground motes are the single strongest depth cue in the whole scene: a
// large soft shape drifting past the lens tells the eye there is space in front
// of the subject, which no amount of parallax behind it can do.

attribute vec4 aSeed;
attribute vec4 aMeta; // x: eta, y: unused, z: sizeMul, w: accent
attribute float aKind;

uniform float uTime;
uniform vec2  uPointer;
uniform float uPointerDepth;
uniform float uSize;
uniform float uFocus;
uniform float uFocalRange;
uniform float uDensity;
uniform float uMotion;
uniform float uDrift;

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
varying float vGrad;

void main() {
  vec3 pos = position;

  // Slow independent drift. Each particle has its own axis and rate, so the
  // field never pulses in unison.
  float t = uTime * uMotion;
  float rate = 0.05 + aSeed.y * 0.13;
  pos.x += sin(t * rate + aSeed.x * 6.28) * uDrift * (0.4 + aSeed.z);
  pos.y += cos(t * rate * 0.83 + aSeed.y * 6.28) * uDrift * (0.4 + aSeed.w);
  pos.z += sin(t * rate * 0.61 + aSeed.z * 6.28) * uDrift * 0.6;

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  float camDist = -mv.z;

  // Foreground motes get a much larger parallax coefficient than the deep
  // field. That differential is what reads as depth.
  float par = mix(0.28, 4.2, aKind);
  mv.xy += uPointer * uPointerDepth * par;

  gl_Position = projectionMatrix * mv;

  float defocus = clamp(abs(camDist - uFocus) / uFocalRange, 0.0, 1.0);
  defocus = defocus * defocus;
  vSoft = mix(defocus, 1.0, aKind * 0.85);

  float size = aMeta.z * uSize * mix(0.62, 5.5, aKind);
  size *= 1.0 + vSoft * 2.4;
  float persp = 320.0 / max(camDist, 1.0);
  gl_PointSize = clamp(size * persp, 1.0, 96.0);
  vPx = gl_PointSize;

  // Stable colour bucket. Decorrelated from eta so the palette is mixed
  // through the whole body rather than banded onto one side.
  vChroma = fract(aSeed.w * 7.31 + aSeed.x * 3.77 + aSeed.z * 1.13);

  // Sparkle: a slow shimmer plus an occasional sharp flash, each particle on
  // its own phase and rate so the field never pulses together.
  float sp = sin(uTime * (0.5 + aSeed.z * 1.7) * uMotion + aSeed.w * 6.2831853);
  vSpark = 0.18 * sp + 0.85 * pow(max(sp, 0.0), 14.0);

  // The isotipo appears only on a few of the largest particles.
  vGrad = clamp(position.y / 300.0 + 0.5, 0.0, 1.0);
  vMark = step(0.9965, fract(aSeed.x * 91.7 + aSeed.z * 13.3)) * step(13.0, gl_PointSize);


  float spread = 1.0 / (1.0 + vSoft * 4.0);
  float far = 1.0 - smoothstep(220.0, 900.0, camDist);
  far = 0.06 + 0.94 * far;

  // Motes fade out if they get too close to the near plane, so nothing ever
  // pops in as a full-screen smear.
  float tooClose = smoothstep(6.0, 26.0, camDist);

  vAlpha = spread * far * uDensity * tooClose * mix(0.16, 0.20, aKind) * (0.3 + aSeed.y * 0.7);
  vEta = aMeta.x;
  vHeat = 0.0;
  vAccent = aMeta.w;
  vFlowLit = 0.0;
}
