import Point from "../level1/Point";

export default class AnglePoint extends Point {
  public angel: number;

  constructor(x: number, y: number, angel: number) {
    super(x, y);
    this.angel = angel;
  }

  copy(): AnglePoint {
    return new AnglePoint(this.x, this.y, this.angel);
  }
}
