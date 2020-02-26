import Point from "./Point";

export class CirclePoint extends Point {
  private readonly _radius: number;
  private readonly _color: string;

  constructor(x: number, y: number, radius: number, color: string) {
    super(x, y);
    this._radius = radius;
    this._color = color;
  }

  get radius(): number {
    return this._radius;
  }

  get color(): string {
    return this._color;
  }

  public isPointInsideRound(point: Point): boolean {
    return Math.sqrt((point.x - this.x) * (point.x - this.x) + (point.y - this.y) * (point.y - this.y)) <= this._radius;
  }
}
