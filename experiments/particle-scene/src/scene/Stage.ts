import * as THREE from 'three';

/**
 * Renderer, canvas and frame lifecycle.
 *
 * Responsibilities kept deliberately narrow: own the WebGL context, own the
 * resize contract, own requestAnimationFrame, and stop doing work when the page
 * is not visible. Everything visual lives elsewhere.
 */
export class Stage {
  readonly renderer: THREE.WebGLRenderer;
  readonly scene = new THREE.Scene();
  readonly canvas: HTMLCanvasElement;

  /** Effective device pixel ratio after capping. */
  dpr = 1;
  width = 1;
  height = 1;

  private maxDpr: number;
  private raf = 0;
  private last = 0;
  private running = false;
  private onFrame?: (dt: number, time: number) => void;
  private readonly onVisibility: () => void;
  private readonly onResizeBound: () => void;
  private resizeTimer = 0;
  private resizeCb?: () => void;

  constructor(canvas: HTMLCanvasElement, maxDpr: number) {
    this.canvas = canvas;
    this.maxDpr = maxDpr;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false, // points do their own edge shaping; MSAA would only cost fill rate
      alpha: false,
      powerPreference: 'high-performance',
      stencil: false,
      depth: false, // additive points never depth-test, so no depth buffer is allocated
      // Dev-only: lets the scene be captured to a file for art direction at
      // viewport sizes the review pane cannot display. Off by default because
      // preserving the drawing buffer costs bandwidth on tiled GPUs.
      preserveDrawingBuffer: new URLSearchParams(location.search).has('capture'),
    });
    this.renderer.setClearColor(0x000000, 1);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    // The scene is authored as light accumulating in a void; a filmic tonemap
    // would fight that by rolling off exactly the highlights the density is
    // meant to produce. Linear out, and the brightness is controlled by
    // per-chapter exposure instead.
    this.renderer.toneMapping = THREE.NoToneMapping;

    this.onVisibility = () => {
      if (document.hidden) this.pause();
      else this.resume();
    };
    document.addEventListener('visibilitychange', this.onVisibility);

    this.onResizeBound = () => {
      this.resize();
      // ScrollTrigger and friends want a settled viewport, and mobile browsers
      // fire resize continuously while the URL bar animates.
      clearTimeout(this.resizeTimer);
      this.resizeTimer = window.setTimeout(() => this.resizeCb?.(), 180);
    };
    addEventListener('resize', this.onResizeBound);
    addEventListener('orientationchange', this.onResizeBound);

    this.resize();
  }

  onSettledResize(cb: () => void): void { this.resizeCb = cb; }

  setMaxDpr(v: number): void { this.maxDpr = v; this.resize(); }

  resize(): void {
    this.width = Math.max(1, innerWidth);
    this.height = Math.max(1, innerHeight);
    this.dpr = Math.min(devicePixelRatio || 1, this.maxDpr);
    this.renderer.setPixelRatio(this.dpr);
    this.renderer.setSize(this.width, this.height, false);
  }

  start(cb: (dt: number, time: number) => void): void {
    this.onFrame = cb;
    this.running = true;
    this.last = performance.now();
    const loop = (now: number) => {
      this.raf = requestAnimationFrame(loop);
      // Clamp dt so a backgrounded tab or a stalled main thread does not
      // teleport every damped value on the first frame back.
      const dt = Math.min((now - this.last) / 1000, 1 / 20);
      this.last = now;
      this.onFrame?.(dt, now / 1000);
    };
    this.raf = requestAnimationFrame(loop);
  }

  pause(): void {
    if (!this.running) return;
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  resume(): void {
    if (this.running || !this.onFrame) return;
    this.running = true;
    this.last = performance.now();
    const loop = (now: number) => {
      this.raf = requestAnimationFrame(loop);
      const dt = Math.min((now - this.last) / 1000, 1 / 20);
      this.last = now;
      this.onFrame?.(dt, now / 1000);
    };
    this.raf = requestAnimationFrame(loop);
  }

  dispose(): void {
    this.pause();
    document.removeEventListener('visibilitychange', this.onVisibility);
    removeEventListener('resize', this.onResizeBound);
    removeEventListener('orientationchange', this.onResizeBound);
    clearTimeout(this.resizeTimer);
    this.renderer.dispose();
  }
}
