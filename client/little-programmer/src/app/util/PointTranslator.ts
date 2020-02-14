import DirectionValue from "./DirectionValue";
import DirectionPoint from "./DirectionPoint";
import Point from "../level1/Point";
import {DirectMoveFunction} from "../level1/DirectMoveFunction";

export default class PointTranslator {
  private readonly directionList: DirectionValue[];
  private readonly matrixCords: Point[][];
  private currentPoint: Point = new Point(0, 0);

  constructor(directionList: DirectionValue[], matrixCords: Point[][]) {
    this.directionList = directionList;
    this.matrixCords = matrixCords;
  }

  private getPoint(direction: DirectionValue): Point {
    switch (direction.direction) {
      case DirectMoveFunction.MOVE_RIGHT:
        if (this.currentPoint.x + direction.val < this.matrixCords[1].length) {
          this.currentPoint.x += direction.val;
          return this.matrixCords[this.currentPoint.x][this.currentPoint.y];
        } else {
          return null;
        }

      case DirectMoveFunction.MOVE_LEFT:
        if (this.currentPoint.x - direction.val >= 0) {
          this.currentPoint.x -= direction.val;
          return this.matrixCords[this.currentPoint.x][this.currentPoint.y];
        } else {
          return null;
        }

      case DirectMoveFunction.MOVE_UP:
        if (this.currentPoint.y - direction.val >= 0) {
          this.currentPoint.y -= direction.val;
          return this.matrixCords[this.currentPoint.x][this.currentPoint.y];
        } else {
          return null;
        }

      case DirectMoveFunction.MOVE_DOWN:
        if (this.currentPoint.y + direction.val < this.matrixCords[0].length * this.matrixCords[1].length) {
          this.currentPoint.y += direction.val;
          return this.matrixCords[this.currentPoint.x][this.currentPoint.y];
        } else {
          return null;
        }
      default:
        return null;
    }
  }

  public getDirectPointList(): DirectionPoint[] {
    let directionPointList: DirectionPoint[] = [];
    for (let direction of this.directionList) {
      directionPointList.push(new DirectionPoint(direction.direction, this.getPoint(direction)));
    }
    return directionPointList;
  }
}
