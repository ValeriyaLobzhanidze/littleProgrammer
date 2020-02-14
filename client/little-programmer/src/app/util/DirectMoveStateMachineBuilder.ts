import DirectionValue from "./DirectionValue";
import Point from "../level1/Point";
import PointTranslator from "./PointTranslator";
import DirectionPoint from "./DirectionPoint";

export default class DirectMoveStateMachineBuilder {
  private directionPoint: DirectionPoint[];

  constructor(directionList: DirectionValue[], matrixCords: Point[][]) {
    this.directionPoint = new PointTranslator(directionList, matrixCords).getDirectPointList();
  }
}
