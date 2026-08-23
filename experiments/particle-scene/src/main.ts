import { Stage } from './scene/Stage';
import { CameraRig } from './scene/CameraRig';
import { ParticleSystem } from './particles/ParticleSystem';
import { ScrollTimeline } from './timeline/ScrollTimeline';
import { CHAPTERS, evaluate } from './timeline/chapters';
import { detectQuality, prefersReducedMotion } from './config/quality';
import { Debug } from './ui/debug';
import { clamp01, damp, smootherstep } from './utils/math';

const canvas = document.getElementById('gl') as HTMLCanvasElement;
const scroller = document.getElementById('scroller') as HTMLElement;
const spectrumFill = document.getElementById('spectrum-fill') as HTMLElement;
const debugEl = document.getElementById('debug') as HTMLElement;
const bandEls = Array.from(document.querySelectorAll<HTMLElement>('.band'));
const chapterEls = Array.from(document.querySelectorAll<HTMLElement>('.chapter'));

// The browser restoring a scroll position on reload fights every measurement
// this scene makes on startup. In a scroll-driven experience that is not a
// convenience, it is a bug.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

const quality = detectQuality();
const reduced = prefersReducedMotion();

const stage = new Stage(canvas, quality.maxDpr);
const rig = new CameraRig(stage.width / stage.height);
const particles = new ParticleSystem(quality);
stage.scene.add(particles.group);

const timeline = new ScrollTimeline(scroller);
const debug = new Debug(debugEl);

// ---------------------------------------------------------------------------
// Scroll length.
//
// Each chapter needs enough travel that a transition can be inspected slowly,
// and enough hold that a settled state can simply be looked at. Portrait gets
// a shorter page: the same distance feels twice as long on a phone.
// ---------------------------------------------------------------------------
function layoutScroll(): void {
  const portrait = isPortrait();
  const per = portrait ? 108 : 132;
  bandEls.forEach((el) => { el.style.height = `${per}vh`; });
}

function isPortrait(): boolean {
  return stage.height > stage.width || stage.width < 720;
}

// ---------------------------------------------------------------------------
// Reduced motion.
//
// Not a blank screen and not a frozen one either. The world, the depth, the
// sculpture and all six states survive; what goes away is continuous movement.
// Transitions become near-discrete by compressing them into the last sliver of
// each gap, so scrolling still advances the story but nothing drifts, breathes,
// bows or parallaxes while a state is held.
// ---------------------------------------------------------------------------
const MOTION = reduced ? 0 : 1;
rig.motion = MOTION;
rig.parallax = reduced ? 0 : 2.6;
particles.uniforms.uMotion.value = MOTION;

const pointerFine = matchMedia('(pointer: fine)').matches;
if (pointerFine && !reduced) {
  addEventListener('pointermove', (e) => {
    rig.pointerTarget.set(
      (e.clientX / stage.width) * 2 - 1,
      -((e.clientY / stage.height) * 2 - 1),
    );
  }, { passive: true });
  // Recentre when the pointer leaves, so the frame always returns to its
  // authored composition rather than staying skewed.
  addEventListener('pointerleave', () => rig.pointerTarget.set(0, 0), { passive: true });
}

let focusDist = 130;

// Dev-only capture hook. Calling toDataURL from outside the frame loop returns
// whatever the compositor last saw, which silently produced duplicate frames;
// the only reliable moment is immediately after the renderer's own draw call,
// inside the same task.
let captureResolve: ((data: string) => void) | null = null;
let spectrumScale = -1;
const chapterOpacity = new Float32Array(CHAPTERS.length).fill(-1);

function frame(dt: number, time: number): void {
  const t0 = performance.now();

  // Reduced motion still damps, just far more sharply, so a scroll step lands
  // as a change rather than a slide.
  timeline.update(dt, reduced ? 0.02 : 0.085);

  const portrait = isPortrait();
  const p = timeline.smooth;
  const ev = evaluate(p, portrait);

  // --- state weights ------------------------------------------------------
  const fw = particles.uniforms.uFromW.value;
  const tw = particles.uniforms.uToW.value;
  for (let i = 0; i < fw.length; i++) { fw[i] = 0; tw[i] = 0; }
  fw[ev.from] = 1;
  tw[ev.to] = 1;

  // In reduced motion the transit is squeezed into the tail of the gap: the
  // state holds, then changes, instead of continuously morphing.
  const transit = reduced ? smootherstep(clamp01((ev.transit - 0.62) / 0.3)) : ev.transit;

  const u = particles.uniforms;
  u.uTransit.value = transit;
  u.uTransitDir.value = timeline.direction;
  u.uStagger.value = reduced ? 0 : ev.stagger;
  u.uExcursion.value = reduced ? 0 : ev.excursion;
  u.uTime.value = time;

  // --- look ---------------------------------------------------------------
  const look = ev.look;
  u.uChroma.value = look.chroma;
  u.uSpread.value = look.spread;
  u.uActionMix.value = look.actionMix;
  u.uDataMix.value = look.dataMix;
  u.uGrad.value = look.grad;
  u.uSparkle.value = reduced ? 0.25 : 1.0;
  u.uDensity.value = look.density * (portrait ? 0.94 : 1);
  u.uExposure.value = look.exposure;
  u.uFlowPulse.value = look.flowPulse;
  u.uBreath.value = reduced ? 0 : look.breath;
  u.uDrift.value = reduced ? 0 : look.drift;
  u.uFocalRange.value = look.focalRange;
  u.uPointerDepth.value = reduced ? 0 : 3.4;
  u.uPointer.value.copy(rig.pointer);
  // Points are sized in device pixels, so a retina display must not render the
  // same particle at twice the apparent diameter.
  u.uSize.value = quality.pointScale * stage.dpr * (portrait ? 0.88 : 1);

  // --- camera -------------------------------------------------------------
  rig.apply(ev.camera, time, dt);

  // Auto-focus on whatever the camera is aimed at, damped so the depth of
  // field does not snap at chapter boundaries.
  const targetFocus = rig.subjectDistance + look.focusBias;
  focusDist = reduced ? targetFocus : damp(focusDist, targetFocus, 0.12, dt);
  u.uFocus.value = focusDist;

  // --- DOM, driven by the same pure function -------------------------------
  // Chapter copy fades on its own hold band. Computed, never tweened, so it can
  // never be left stranded at the wrong opacity by a fast scroll.
  for (let i = 0; i < CHAPTERS.length; i++) {
    const [h0, h1] = CHAPTERS[i].hold;
    const pad = 0.055;
    const inBand =
      smootherstep(clamp01((p - (h0 - pad)) / pad)) *
      (1 - smootherstep(clamp01((p - h1) / pad)));
    const o = Math.round(inBand * 100) / 100;
    if (o !== chapterOpacity[i]) {
      chapterOpacity[i] = o;
      const el = chapterEls[i];
      el.style.opacity = String(o);
      el.style.transform = `translate3d(0, ${((1 - o) * 22).toFixed(1)}px, 0)`;
      el.style.visibility = o < 0.01 ? 'hidden' : 'visible';
    }
  }

  const sx = Math.round(p * 1000) / 1000;
  if (sx !== spectrumScale) {
    spectrumScale = sx;
    spectrumFill.style.transform = `scaleX(${sx})`;
  }

  stage.renderer.render(stage.scene, rig.camera);

  if (captureResolve) {
    const r = captureResolve;
    captureResolve = null;
    r(canvas.toDataURL('image/png'));
  }

  debug.tick(dt, performance.now() - t0, {
    dpr: stage.dpr,
    tier: quality.tier,
    points: particles.counts.sculpture + particles.counts.ambient,
    progress: p,
    from: CHAPTERS[ev.from].name,
    to: CHAPTERS[ev.to].name,
    transit,
    camera: `${rig.camera.position.x.toFixed(0)},${rig.camera.position.y.toFixed(0)},${rig.camera.position.z.toFixed(0)}`,
    fov: rig.camera.fov,
    reduced,
    drawCalls: stage.renderer.info.render.calls,
  });
}

function onResize(): void {
  rig.resize(stage.width / stage.height);
  layoutScroll();
  timeline.refresh();
}

stage.onSettledResize(onResize);
layoutScroll();
timeline.refresh();
stage.start(frame);

// Keep a handle for console poking while art-directing.
Object.assign(window as unknown as Record<string, unknown>, {
  RELEVO: {
    stage, rig, particles, timeline, quality, reduced, CHAPTERS,
    /** Dev-only. Jump to a normalised progress and settle instantly. */
    seek(p: number) {
      const max = document.documentElement.scrollHeight - innerHeight;
      scrollTo(0, Math.round(p * max));
      timeline.raw = p;
      timeline.smooth = p;
      focusDist = rig.subjectDistance;
    },
    /** Dev-only. Evaluates the scroll→scene mapping without rendering, so
     *  reversibility can be verified as the pure function it is meant to be. */
    evaluateAt(p: number, portrait = false) {
      const e = evaluate(p, portrait);
      return {
        from: e.from, to: e.to,
        transit: +e.transit.toFixed(9),
        look: JSON.parse(JSON.stringify(e.look)),
        camera: JSON.parse(JSON.stringify(e.camera)),
        excursion: e.excursion, stagger: e.stagger,
      };
    },
    /** Dev-only. Resolves with the next rendered frame as a PNG data URL. */
    capture(): Promise<string> {
      return new Promise((res) => { captureResolve = res; });
    },
    /** Dev-only. Seeks, settles, and posts a frame to the dev server. */
    async shot(name: string, p: number, settle = 500) {
      this.seek(p);
      await new Promise((r) => setTimeout(r, settle));
      const data = await this.capture();
      const res = await fetch('/__shot', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name, data }),
      });
      return res.json();
    },
  },
});
