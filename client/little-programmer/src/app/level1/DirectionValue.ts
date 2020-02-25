import {DirectMoveFunction} from "./DirectMoveFunction";

export default class DirectionValue {
  public direction: DirectMoveFunction;
  public val: number;

  constructor(direction: DirectMoveFunction, val: number) {
    this.direction = direction;
    this.val = val;
  }
}
