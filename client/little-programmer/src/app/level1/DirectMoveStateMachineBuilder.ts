import DirectionValue from "./DirectionValue";
import Point from "./Point";
import PointTranslator from "./PointTranslator";
import StateEntry from "../statemachine/StateEntry";
import {DirectMoveFunction} from "./DirectMoveFunction";
import StateMachine from "../statemachine/StateMachine";

export default class DirectMoveStateMachineBuilder {

  public static build(directionList: DirectionValue[], matrixCords: Point[][], speed: number = 1.0): StateMachine<Point> {
    let stateList: StateEntry<Point>[] = new PointTranslator(directionList, matrixCords).getDirectPointList();

    let stateFunctionList: Map<any, (value: Point) => Point> = new Map<any, (value: Point) => Point>();
    let moveRightHandler = (point: Point) => {
      point.x += speed;
      return point
    };
    let moveLeftHandler = (point: Point) => {
      point.x -= speed;
      return point
    };
    let moveUpHandler = (point: Point) => {
      point.y -= speed;
      return point
    };
    let moveDownHandler = (point: Point) => {
      point.y += speed;
      return point
    };

    stateFunctionList.set(DirectMoveFunction.MOVE_RIGHT, moveRightHandler);
    stateFunctionList.set(DirectMoveFunction.MOVE_LEFT, moveLeftHandler);
    stateFunctionList.set(DirectMoveFunction.MOVE_UP, moveUpHandler);
    stateFunctionList.set(DirectMoveFunction.MOVE_DOWN, moveDownHandler);

    let stateComparingFunctionList: Map<any, (val1: Point, val2: Point) => boolean> = new Map<any, (val1: Point, val2: Point) => boolean>();
    let moveRightComparator = (point1: Point, point2: Point) => {
      return point1.x < point2.x
    };
    let moveLeftComparator = (point1: Point, point2: Point) => {
      return point1.x > point2.x
    };
    let moveUpComparator = (point1: Point, point2: Point) => {
      return point1.y > point2.y
    };
    let moveDownComparator = (point1: Point, point2: Point) => {
      return point1.y < point2.y
    };

    stateComparingFunctionList.set(DirectMoveFunction.MOVE_RIGHT, moveRightComparator);
    stateComparingFunctionList.set(DirectMoveFunction.MOVE_LEFT, moveLeftComparator);
    stateComparingFunctionList.set(DirectMoveFunction.MOVE_UP, moveUpComparator);
    stateComparingFunctionList.set(DirectMoveFunction.MOVE_DOWN, moveDownComparator);

    return new StateMachine<Point>(new Point(matrixCords[0][0].x, matrixCords[0][0].y), stateList, stateFunctionList, stateComparingFunctionList);
  }
}
