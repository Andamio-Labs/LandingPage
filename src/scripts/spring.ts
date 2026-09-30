export interface SpringConfig {
  response: number;
  damping: number;
}

export class Spring {
  value: number;
  velocity = 0;
  target: number;
  private stiffness = 0;
  private friction = 0;

  constructor(value: number, config: SpringConfig) {
    this.value = value;
    this.target = value;
    this.configure(config);
  }

  configure({ response, damping }: SpringConfig) {
    this.stiffness = (2 * Math.PI / response) ** 2;
    this.friction = (4 * Math.PI * damping) / response;
  }

  jump(value: number) {
    this.value = value;
    this.target = value;
    this.velocity = 0;
  }

  step(deltaSeconds: number) {
    let remaining = Math.min(deltaSeconds, 0.064);
    while (remaining > 0) {
      const dt = Math.min(remaining, 1 / 240);
      const force = -this.stiffness * (this.value - this.target) - this.friction * this.velocity;
      this.velocity += force * dt;
      this.value += this.velocity * dt;
      remaining -= dt;
    }
  }

  get settled() {
    return Math.abs(this.velocity) < 0.02 && Math.abs(this.value - this.target) < 0.02;
  }
}

export class VelocityTracker {
  private samples: { t: number; x: number; y: number }[] = [];

  reset() {
    this.samples = [];
  }

  add(x: number, y: number) {
    const t = performance.now();
    this.samples.push({ t, x, y });
    while (this.samples.length > 2 && t - this.samples[0].t > 100) this.samples.shift();
  }

  velocity() {
    if (this.samples.length < 2) return { x: 0, y: 0 };
    const first = this.samples[0];
    const last = this.samples[this.samples.length - 1];
    const seconds = Math.max((last.t - first.t) / 1000, 0.001);
    return { x: (last.x - first.x) / seconds, y: (last.y - first.y) / seconds };
  }
}

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function rubberband(overshoot: number, dimension: number, constant = 0.55) {
  return (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot));
}

export function frameLoop(tick: (deltaSeconds: number) => boolean) {
  let last = performance.now();
  let handle = 0;
  let running = false;

  const frame = (now: number) => {
    const delta = (now - last) / 1000;
    last = now;
    running = tick(delta);
    handle = running ? requestAnimationFrame(frame) : 0;
  };

  return {
    start() {
      if (running) return;
      running = true;
      last = performance.now();
      handle = requestAnimationFrame(frame);
    },
    stop() {
      cancelAnimationFrame(handle);
      running = false;
    },
  };
}
