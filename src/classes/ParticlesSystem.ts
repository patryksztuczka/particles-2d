import { Particle } from "./Particle";

export class ParticlesSystem {
  particles: Particle[] = [];

  constructor() {}

  run(ctx: CanvasRenderingContext2D): void {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.run(ctx);
      if (p.isDead()) {
        this.particles.splice(i, 1);
      }
    }
  }

  addParticle(particle: Particle): void {
    this.particles.push(particle);
  }
}
