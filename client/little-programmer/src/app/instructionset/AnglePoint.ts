import Point from "../level1/Point";

export default class AnglePoint extends Point {
  public angel: number;

  constructor(x: number, y: number, angel: number) {
    super(x, y);
    this.angel = angel;
  }
}
