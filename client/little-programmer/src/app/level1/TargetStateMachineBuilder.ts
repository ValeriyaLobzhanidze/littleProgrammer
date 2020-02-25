import Point from "./Point";
import StateMachine from "../statemachine/StateMachine";
import StateEntry from "../statemachine/StateEntry";
import {DirectMoveFunction} from "./DirectMoveFunction";

export default class TargetStateMachineBuilder {
  public static build(startPoint: Point, endPoint: Point, speed: number = 1.0): StateMachine<Point> {
    let stateList: StateEntry<Point>[] = [];
    let stateFunctionList: Map<any, (value: Point) => Point> = new Map<any, (value: Point) => Point>();
    let stateComparingFunctionList: Map<any, (val1: Point, val2: Point) => boolean> = new Map<any, (val1: Point, val2: Point) => boolean>();

    stateList.push(new StateEntry(DirectMoveFunction.MOVE_UP, endPoint));

    let moveUpHandler = (point: Point) => {
      point.y -= speed;
      return point
    };
    stateFunctionList.set(DirectMoveFunction.MOVE_UP, moveUpHandler);

    let moveUpComparator = (point1: Point, point2: Point) => {
      return point1.y > point2.y
    };
    stateComparingFunctionList.set(DirectMoveFunction.MOVE_UP, moveUpComparator);

    return new StateMachine<Point>(startPoint, stateList, stateFunctionList, stateComparingFunctionList);

  }
}
