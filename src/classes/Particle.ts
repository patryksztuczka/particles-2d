import { Vector } from "./Vector";

export class Particle {
  private position: Vector;
  private velocity: Vector;
  private radius: number;
  private color: string;

  constructor(
    position: Vector,
    velocity: Vector,
    radius: number,
    color: string = "#ca8b04",
  ) {
    this.position = position;
    this.velocity = velocity;
    this.radius = radius;
    this.color = color;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this.position.add(this.velocity);
    ctx.beginPath();
    ctx.arc(
      this.position.get().x,
      this.position.get().y,
      this.radius,
      0,
      2 * Math.PI,
    );
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}
