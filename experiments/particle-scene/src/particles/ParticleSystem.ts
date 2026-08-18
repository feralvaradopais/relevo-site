import * as THREE from 'three';
import { makeSeeds, buildAllTargets, STATE_COUNT } from './targets';
import { buildAmbient } from './ambient';
import { TOKEN, srgbToLinear } from '../config/palette';
import type { QualityProfile } from '../config/quality';

import vert from '../shaders/particles.vert.glsl?raw';
import frag from '../shaders/particles.frag.glsl?raw';
import ambientVert from '../shaders/ambient.vert.glsl?raw';
import noise from '../shaders/noise.glsl?raw';

const resolveIncludes = (src: string) => src.replace('#include <noise>', noise);

const c = (hex: string) => new THREE.Vector3(...srgbToLinear(hex));

export interface ParticleUniforms {
  uFromW: { value: number[] };
  uToW: { value: number[] };
  uTime: { value: number };
  uTransit: { value: number };
  uTransitDir: { value: number };
  uStagger: { value: number };
  uExcursion: { value: number };
  uBreath: { value: number };
  uMotion: { value: number };
  uPointer: { value: THREE.Vector2 };
  uPointerDepth: { value: number };
  uSize: { value: number };
  uFocus: { value: number };
  uFocalRange: { value: number };
  uFlowPulse: { value: number };
  uDensity: { value: number };
  uDeliver: { value: THREE.Vector3 };
  uReceive: { value: THREE.Vector3 };
  uNeutral: { value: THREE.Vector3 };
  uData: { value: THREE.Vector3 };
  uWarm: { value: THREE.Vector3 };
  uAction: { value: THREE.Vector3 };
  uChroma: { value: number };
  uSpread: { value: number };
  uActionMix: { value: number };
  uDataMix: { value: number };
  uOutline: { value: number };
  uSparkle: { value: number };
  uGrad: { value: number };
  uHeatTint: { value: number };
  uExposure: { value: number };
  uDrift: { value: number };
}

export class ParticleSystem {
  readonly group = new THREE.Group();
  readonly uniforms: ParticleUniforms;
  readonly counts: { sculpture: number; ambient: number };

  private readonly sculptureGeo: THREE.BufferGeometry;
  private readonly ambientGeo: THREE.BufferGeometry;
  private readonly sculptureMat: THREE.ShaderMaterial;
  private readonly ambientMat: THREE.ShaderMaterial;

  constructor(q: QualityProfile) {
    // Shared uniform object: both programs read the same state, so there is one
    // source of truth for exposure, focus, pointer and density. Three.js will
    // upload each uniform once per material per frame; the values never diverge.
    this.uniforms = {
      uFromW: { value: new Array(STATE_COUNT).fill(0) },
      uToW: { value: new Array(STATE_COUNT).fill(0) },
      uTime: { value: 0 },
      uTransit: { value: 0 },
      uTransitDir: { value: 1 },
      uStagger: { value: 0.55 },
      uExcursion: { value: 0 },
      uBreath: { value: 0.5 },
      uMotion: { value: 1 },
      uPointer: { value: new THREE.Vector2() },
      uPointerDepth: { value: 0 },
      uSize: { value: q.pointScale },
      uFocus: { value: 90 },
      uFocalRange: { value: 190 },
      uFlowPulse: { value: 0 },
      uDensity: { value: 1 },
      uDeliver: { value: c(TOKEN.purple300) },
      uReceive: { value: c(TOKEN.teal300) },
      uNeutral: { value: c(TOKEN.text100) },
      uData: { value: c(TOKEN.yellow400) },
      uWarm: { value: c(TOKEN.orange300) },
      uAction: { value: c(TOKEN.pink300) },
      uChroma: { value: 0.5 },
      uSpread: { value: 0.55 },
      uActionMix: { value: 0 },
      uDataMix: { value: 0 },
      uOutline: { value: 1 },
      uSparkle: { value: 1 },
      uGrad: { value: 0.3 },
      // Transit whitening, kept low. At 0.7 the midpoint of every transition
      // bloomed into a white core that erased the palette exactly when the
      // scene was most active — the effect was reading as a blowout rather
      // than as energy.
      uHeatTint: { value: 0.26 },
      uExposure: { value: 1 },
      uDrift: { value: 2.6 },
    };

    // ---- sculpture -------------------------------------------------------
    const seeds = makeSeeds(q.sculpture, q.cohorts);
    const targets = buildAllTargets(seeds);

    const geo = new THREE.BufferGeometry();
    // Target 0 occupies the built-in `position` slot.
    geo.setAttribute('position', new THREE.BufferAttribute(targets[0], 3));
    for (let i = 1; i < STATE_COUNT; i++) {
      geo.setAttribute(`aT${i}`, new THREE.BufferAttribute(targets[i], 3));
    }
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds.u, 4));

    const meta = new Float32Array(q.sculpture * 4);
    for (let i = 0; i < q.sculpture; i++) {
      meta[i * 4 + 0] = seeds.eta[i];
      meta[i * 4 + 1] = seeds.flow[i];
      meta[i * 4 + 2] = seeds.sizeMul[i];
      meta[i * 4 + 3] = seeds.accent[i];
    }
    geo.setAttribute('aMeta', new THREE.BufferAttribute(meta, 4));

    // Additive points need no depth sort, but three.js still frustum-culls by
    // bounding sphere. The cloud moves far outside target 0's bounds during
    // morphs, so an explicit generous sphere prevents it vanishing at the edges.
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 200);

    this.sculptureGeo = geo;
    this.sculptureMat = new THREE.ShaderMaterial({
      vertexShader: resolveIncludes(vert),
      fragmentShader: frag,
      uniforms: this.uniforms as unknown as Record<string, THREE.IUniform>,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      // Premultiplied additive: the fragment shader already multiplies colour by
      // alpha, so light accumulates the way light actually does in a void and
      // there is nothing to sort.
      blending: THREE.CustomBlending,
      blendSrc: THREE.OneFactor,
      blendDst: THREE.OneFactor,
      blendEquation: THREE.AddEquation,
    });

    const points = new THREE.Points(geo, this.sculptureMat);
    points.frustumCulled = false;
    points.renderOrder = 1;
    this.group.add(points);

    // ---- ambient ---------------------------------------------------------
    const amb = buildAmbient(q.deepField, q.motes);
    const ageo = new THREE.BufferGeometry();
    ageo.setAttribute('position', new THREE.BufferAttribute(amb.position, 3));
    ageo.setAttribute('aSeed', new THREE.BufferAttribute(amb.seed, 4));
    ageo.setAttribute('aMeta', new THREE.BufferAttribute(amb.meta, 4));
    ageo.setAttribute('aKind', new THREE.BufferAttribute(amb.kind, 1));
    ageo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1400);

    this.ambientGeo = ageo;
    this.ambientMat = new THREE.ShaderMaterial({
      vertexShader: ambientVert,
      fragmentShader: frag,
      uniforms: this.uniforms as unknown as Record<string, THREE.IUniform>,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: THREE.CustomBlending,
      blendSrc: THREE.OneFactor,
      blendDst: THREE.OneFactor,
      blendEquation: THREE.AddEquation,
    });

    const apoints = new THREE.Points(ageo, this.ambientMat);
    apoints.frustumCulled = false;
    apoints.renderOrder = 0;
    this.group.add(apoints);

    this.counts = { sculpture: q.sculpture, ambient: q.deepField + q.motes };
  }

  dispose(): void {
    this.sculptureGeo.dispose();
    this.ambientGeo.dispose();
    this.sculptureMat.dispose();
    this.ambientMat.dispose();
  }
}
