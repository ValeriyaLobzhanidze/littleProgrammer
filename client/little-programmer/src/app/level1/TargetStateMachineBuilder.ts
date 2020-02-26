import Point from "./Point";
import StateMachine from "../statemachine/StateMachine";
import StateEntry from "../statemachine/StateEntry";
import {DirectMoveFunction} from "./DirectMoveFunction";
import {CirclePoint} from "./CirclePoint";

export default class TargetStateMachineBuilder {
  public static build(startPoint: CirclePoint, endPoint: CirclePoint, speed: number = 1.0): StateMachine<CirclePoint> {
    let stateList: StateEntry<CirclePoint>[] = [];
    let stateFunctionList: Map<any, (value: CirclePoint) => CirclePoint> = new Map<any, (value: CirclePoint) => CirclePoint>();
    let stateComparingFunctionList: Map<any, (val1: CirclePoint, val2: CirclePoint) => boolean> = new Map<any, (val1: CirclePoint, val2: CirclePoint) => boolean>();

    stateList.push(new StateEntry(DirectMoveFunction.MOVE_UP, endPoint));

    let moveUpHandler = (point: CirclePoint) => {
      point.y -= speed;
      return point
    };
    stateFunctionList.set(DirectMoveFunction.MOVE_UP, moveUpHandler);

    let moveUpComparator = (point1: Point, point2: Point) => {
      return point1.y > point2.y
    };
    stateComparingFunctionList.set(DirectMoveFunction.MOVE_UP, moveUpComparator);

    return new StateMachine<CirclePoint>(startPoint, stateList, stateFunctionList, stateComparingFunctionList);

  }
}
