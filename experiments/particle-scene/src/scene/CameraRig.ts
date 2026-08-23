import * as THREE from 'three';
import { damp } from '../utils/math';
import type { CameraKey } from '../timeline/chapters';

/**
 * Camera choreography.
 *
 * The camera is keyed per chapter and interpolated by scroll, so it is as
 * reversible as everything else. On top of that sit two small continuous
 * offsets — a slow drift and a damped pointer parallax — which are the only
 * parts of the camera that are not a pure function of scroll.
 *
 * Both are kept deliberately small. The failure mode of a scroll-driven camera
 * is that ambient movement starts competing with authored movement and the
 * whole thing feels seasick. Authored motion has to stay clearly dominant.
 *
 * There is no easing curve applied here per frame and no spring. Bounce in a
 * camera reads as cheap immediately, and the design system is explicit that
 * overshoot belongs to state micro-interactions and nowhere near a section
 * where credibility is at stake.
 */
export class CameraRig {
  readonly camera: THREE.PerspectiveCamera;

  /** Pointer target in -1..1, set by the input layer. */
  readonly pointerTarget = new THREE.Vector2();
  /** Damped pointer, consumed by the rig and by the particle shaders. */
  readonly pointer = new THREE.Vector2();

  parallax = 2.6;
  drift = 1;
  motion = 1;

  private readonly pos = new THREE.Vector3();
  private readonly look = new THREE.Vector3();
  private readonly up = new THREE.Vector3(0, 1, 0);
  private readonly tmp = new THREE.Vector3();
  private readonly right = new THREE.Vector3();
  private readonly fwd = new THREE.Vector3();

  constructor(aspect: number) {
    this.camera = new THREE.PerspectiveCamera(33, aspect, 0.5, 2000);
    this.camera.position.set(46, 15, 132);
  }

  /** Distance from the camera to what it is pointed at — drives auto-focus. */
  get subjectDistance(): number {
    return this.pos.distanceTo(this.look);
  }

  apply(key: CameraKey, time: number, dt: number): void {
    this.pos.set(key.pos[0], key.pos[1], key.pos[2]);
    this.look.set(key.look[0], key.look[1], key.look[2]);

    this.pointer.x = damp(this.pointer.x, this.pointerTarget.x, 0.14, dt);
    this.pointer.y = damp(this.pointer.y, this.pointerTarget.y, 0.14, dt);

    const focusDist = this.subjectDistance;

    // Slow authored drift so a held chapter is never a still frame. Amplitude
    // scales with subject distance so it reads the same at any framing.
    if (this.motion > 0) {
      const s = this.drift * this.motion * (0.004 * focusDist);
      this.pos.x += Math.sin(time * 0.07) * s;
      this.pos.y += Math.cos(time * 0.053) * s * 0.7;
      this.pos.z += Math.sin(time * 0.041 + 1.3) * s * 0.5;
    }

    // Pointer parallax moves the camera in its own screen plane and swings the
    // aim point the opposite way. Translating alone slides the whole frame;
    // countering the aim is what turns it into a look-around.
    if (this.parallax > 0) {
      this.fwd.subVectors(this.look, this.pos).normalize();
      this.right.crossVectors(this.fwd, this.up).normalize();
      this.tmp.crossVectors(this.right, this.fwd).normalize(); // true up

      const k = this.parallax * this.motion * (0.01 * focusDist);
      this.pos.addScaledVector(this.right, this.pointer.x * k);
      this.pos.addScaledVector(this.tmp, this.pointer.y * k);
      this.look.addScaledVector(this.right, -this.pointer.x * k * 0.22);
      this.look.addScaledVector(this.tmp, -this.pointer.y * k * 0.22);
    }

    this.camera.position.copy(this.pos);
    this.camera.up.set(Math.sin(key.roll), Math.cos(key.roll), 0);
    this.camera.lookAt(this.look);

    if (this.camera.fov !== key.fov) {
      this.camera.fov = key.fov;
      this.camera.updateProjectionMatrix();
    }
  }

  resize(aspect: number): void {
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();
  }
}
