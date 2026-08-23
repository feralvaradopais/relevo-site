/**
 * Development-only readout. Hidden by default and toggled with D, because a
 * permanent overlay contaminates every judgement about the composition — the
 * eye starts reading the numbers instead of the frame.
 */
export interface DebugFields {
  fps: number;
  ms: number;
  dpr: number;
  tier: string;
  points: number;
  progress: number;
  from: string;
  to: string;
  transit: number;
  camera: string;
  fov: number;
  reduced: boolean;
  drawCalls: number;
}

export class Debug {
  private el: HTMLElement;
  private frames = 0;
  private acc = 0;
  private fps = 0;
  private msAcc = 0;
  visible = false;

  constructor(el: HTMLElement) {
    this.el = el;
    addEventListener('keydown', (e) => {
      if (e.key === 'd' || e.key === 'D') this.toggle();
    });
  }

  toggle(): void {
    this.visible = !this.visible;
    this.el.hidden = !this.visible;
  }

  /** Called every frame; only touches the DOM four times a second. */
  tick(dt: number, frameMs: number, fields: Omit<DebugFields, 'fps' | 'ms'>): void {
    this.frames++;
    this.acc += dt;
    this.msAcc += frameMs;
    if (this.acc >= 0.25) {
      this.fps = this.frames / this.acc;
      const ms = this.msAcc / this.frames;
      this.frames = 0;
      this.acc = 0;
      this.msAcc = 0;
      if (this.visible) this.render({ ...fields, fps: this.fps, ms });
    }
  }

  private render(f: DebugFields): void {
    this.el.innerHTML =
      `<b>fps</b>  ${f.fps.toFixed(0).padStart(3)}   <b>cpu</b> ${f.ms.toFixed(2)}ms\n` +
      `<b>dpr</b>  ${f.dpr.toFixed(2)}  <b>tier</b> ${f.tier}\n` +
      `<b>pts</b>  ${f.points.toLocaleString()}  <b>draw</b> ${f.drawCalls}\n` +
      `<b>prog</b> ${f.progress.toFixed(4)}\n` +
      `<b>state</b> <u>${f.from}</u>${f.from === f.to ? ' (hold)' : ` → <u>${f.to}</u>`}\n` +
      `<b>tran</b> ${f.transit.toFixed(3)}\n` +
      `<b>cam</b>  ${f.camera}  fov ${f.fov.toFixed(1)}\n` +
      `<b>rmot</b> ${f.reduced ? 'on' : 'off'}`;
  }
}
