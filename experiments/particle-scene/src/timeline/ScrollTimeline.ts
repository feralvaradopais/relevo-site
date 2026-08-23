import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { damp } from '../utils/math';

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll as time.
 *
 * ScrollTrigger owns the scroll maths and the refresh lifecycle — measuring the
 * scroller, recomputing on resize, handling the endless browser-specific
 * nonsense around scroll position. That is exactly what it is good at.
 *
 * What it deliberately does NOT own here is any tween of scene state. There is
 * no `scrub` tween, no timeline of animated properties, no per-particle tween.
 * The scene reads `progress` as a plain number each frame and derives
 * everything from it as a pure function.
 *
 * The reason is desynchronisation. A scrubbed tween carries state between
 * frames, and state is what gets out of step when the user flings the scroll
 * bar to the bottom, back to the top, and back down before the tween has
 * settled. With a pure mapping there is no state to get out of step: scroll
 * position 0.63 means the same thing whether it was reached from above, from
 * below, or by a jump. Reversing is not handled — it simply cannot fail.
 *
 * The one piece of state is the damped follower below, and it is a critically
 * damped approach toward the true value, so it always converges and never
 * overshoots.
 */
export class ScrollTimeline {
  /** Raw scroll progress, 0..1. Exact, never smoothed. */
  raw = 0;
  /** Damped follower used by the scene. */
  smooth = 0;
  /** Signed direction of travel, for morph wave orientation. */
  direction = 1;

  private trigger: ScrollTrigger;
  private lastRaw = 0;

  constructor(scroller: HTMLElement) {
    this.trigger = ScrollTrigger.create({
      trigger: scroller,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => { this.raw = self.progress; },
      onRefresh: (self) => { this.raw = self.progress; },
    });
    this.raw = this.trigger.progress;
    this.smooth = this.raw;
  }

  update(dt: number, damping: number): void {
    // Read straight off the instance rather than trusting the last onUpdate:
    // during a refresh or a programmatic scroll the callback order is not
    // guaranteed, but the instance's progress always is.
    this.raw = this.trigger.progress;

    if (this.raw > this.lastRaw + 1e-5) this.direction = 1;
    else if (this.raw < this.lastRaw - 1e-5) this.direction = -1;
    this.lastRaw = this.raw;

    this.smooth = damping <= 0 ? this.raw : damp(this.smooth, this.raw, damping, dt);

    // Snap when close enough, so a held state is bit-exact and the shader's
    // transit energy actually reaches zero instead of asymptotically hovering.
    if (Math.abs(this.smooth - this.raw) < 0.00015) this.smooth = this.raw;
  }

  refresh(): void { ScrollTrigger.refresh(); }

  dispose(): void { this.trigger.kill(); }
}
