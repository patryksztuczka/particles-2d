export class Vector {
  private x: number;
  private y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  get() {
    return {
      x: this.x,
      y: this.y,
    };
  }

  add(vec: Vector) {
    this.x += vec.x;
    this.y += vec.y;
  }
}
