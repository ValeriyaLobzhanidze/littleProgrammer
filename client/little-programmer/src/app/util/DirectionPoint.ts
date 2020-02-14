import {DirectMoveFunction} from "../level1/DirectMoveFunction";
import Point from "../level1/Point";

export default class DirectionPoint {
  public direction: DirectMoveFunction;
  public point: Point;

  constructor(direction: DirectMoveFunction, point: Point) {
    this.direction = direction;
    this.point = point;
  }
}
