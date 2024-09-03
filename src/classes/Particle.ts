import { Vector } from "./Vector";

export class Particle {
  private position: Vector;
  private velocity: Vector;
  private acceleration: Vector;
  private radius: number;
  private color: string;
  private timeToLive: number;

  constructor(
    position: Vector,
    velocity: Vector,
    acceleration: Vector,
    radius: number,
    color: string = "rgb(202, 139, 4, 1)",
    timeToLive: number = 155,
  ) {
    this.position = position;
    this.velocity = velocity;
    this.acceleration = acceleration;
    this.radius = radius;
    this.color = color;
    this.timeToLive = timeToLive;
  }

  run(ctx: CanvasRenderingContext2D): void {
    this.update();
    this.display(ctx);
  }

  isDead(): boolean {
    return this.timeToLive < 0;
  }

  private update(): void {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.timeToLive -= 2;
  }

  private display(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(
      this.position.get().x,
      this.position.get().y,
      this.radius,
      0,
      2 * Math.PI,
    );
    ctx.fillStyle = `
      rgba(202, 139, 4, ${this.timeToLive / 100})
    `;
    ctx.fill();
  }
}
