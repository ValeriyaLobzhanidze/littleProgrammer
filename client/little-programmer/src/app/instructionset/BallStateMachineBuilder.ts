import StateMachine from "../statemachine/StateMachine";
import AnglePoint from "./AnglePoint";
import StateEntry from "../statemachine/StateEntry";
import {BallState} from "./BallState";
import Point from "../level1/Point";

export default class BallStateMachineBuilder {
  private static readonly TRAJECTORY_STEP = 2;
  private static readonly BARRIER_X_POS = 50;
  private static BARRIER_POINTS: Point[] = [];

  public static build(startPoint: AnglePoint, amountOfBarriers: number,
                      rollRightBarrier: number, fallDownBarrier: number, speed: number = 5.0): StateMachine<AnglePoint> {

    let stateList: StateEntry<AnglePoint>[] = BallStateMachineBuilder.buildStateList(amountOfBarriers, rollRightBarrier, fallDownBarrier);
    let stateToHandler: Map<any, (value: AnglePoint) => AnglePoint> = BallStateMachineBuilder.buildStateToHandlerMap(speed);
    let stateToComparator: Map<any, (val1: AnglePoint, val2: AnglePoint) => boolean> = BallStateMachineBuilder.buildStateToComparatorMap();

    return new StateMachine<AnglePoint>(startPoint, stateList, stateToHandler, stateToComparator);
  }

  public static getBarrierPoints(): Point[] {
    return BallStateMachineBuilder.BARRIER_POINTS;
  }

  private static trajectoryFlyFunction(value: number): number {
    return Math.sqrt(value) * 4;
  }

  private static rightFlyDirection(origin: number, x: number): number {
    return origin + BallStateMachineBuilder.trajectoryFlyFunction(x);
  }

  private static leftFlyDirection(origin: number, x: number): number {
    return origin - BallStateMachineBuilder.trajectoryFlyFunction(x);
  }

  private static buildStateList(amountOfBarriers: number, rollBarrierPoint: number, fallDownPoint: number): StateEntry<AnglePoint>[] {
    let stateList: StateEntry<AnglePoint>[] = [];
    let curOrigin = 0;
    let curYRightBarrier;
    let curYLeftBarrier;
    let rightBarrierPoint;
    let leftBarrierPoint;
    let constStep = BallStateMachineBuilder.rightFlyDirection(curOrigin, BallStateMachineBuilder.BARRIER_X_POS) * BallStateMachineBuilder.TRAJECTORY_STEP;

    for (let i = 0; i < amountOfBarriers - 1; i++) {
      curYRightBarrier = BallStateMachineBuilder.rightFlyDirection(curOrigin, BallStateMachineBuilder.BARRIER_X_POS);
      rightBarrierPoint = new AnglePoint(BallStateMachineBuilder.BARRIER_X_POS, curYRightBarrier, 0);

      curOrigin += constStep;
      curYLeftBarrier = BallStateMachineBuilder.leftFlyDirection(curOrigin, 0);
      leftBarrierPoint = new AnglePoint(0, curYLeftBarrier, 0);

      let rightState = new StateEntry<AnglePoint>(BallState.FLY_RIGHT, rightBarrierPoint);
      let leftState = new StateEntry<AnglePoint>(BallState.FLY_LEFT, leftBarrierPoint);

      stateList.push(rightState);
      stateList.push(leftState);
      BallStateMachineBuilder.BARRIER_POINTS.push(new Point(rightBarrierPoint.x, rightBarrierPoint.y));
    }

    curYRightBarrier = BallStateMachineBuilder.rightFlyDirection(curOrigin, BallStateMachineBuilder.BARRIER_X_POS);
    rightBarrierPoint = new AnglePoint(BallStateMachineBuilder.BARRIER_X_POS, curYRightBarrier, 0);
    stateList.push(new StateEntry<AnglePoint>(BallState.FLY_RIGHT, rightBarrierPoint));
    BallStateMachineBuilder.BARRIER_POINTS.push(new Point(rightBarrierPoint.x, rightBarrierPoint.y));

    stateList.push(new StateEntry<AnglePoint>(BallState.ROLL_RIGHT, new AnglePoint(rollBarrierPoint, curYRightBarrier, 0)));
    stateList.push(new StateEntry<AnglePoint>(BallState.ROLL_DOWN, new AnglePoint(rollBarrierPoint, curYRightBarrier + fallDownPoint, 0)));

    return stateList;
  }

  private static buildStateToHandlerMap(speed: number): Map<any, (value: AnglePoint) => AnglePoint> {
    let stateToHandler: Map<any, (value: AnglePoint) => AnglePoint> = new Map<any, (value: AnglePoint) => AnglePoint>();

    let origin = 0;
    let isOriginChanged: boolean = false;

    let flyRightHandler = (point: AnglePoint) => {
      isOriginChanged = false;
      point.x += speed;
      point.y = BallStateMachineBuilder.rightFlyDirection(origin, point.x);
      return point;
    };

    let constStep = BallStateMachineBuilder.rightFlyDirection(origin, BallStateMachineBuilder.BARRIER_X_POS) * BallStateMachineBuilder.TRAJECTORY_STEP;
    let flyLeftHandler = (point: AnglePoint) => {
      if (!isOriginChanged) {
        origin += constStep;
        isOriginChanged = true;
      }
      point.x -= speed;
      if(point.x < 0)
        point.x = 0;
      point.y = BallStateMachineBuilder.leftFlyDirection(origin, point.x);
      return point;
    };
    let rollHorHandler = (point: AnglePoint) => {
      point.x += speed;
      point.angel += Math.PI / 3;
      return point;
    };
    let rollVertHandler = (point: AnglePoint) => {
      point.y += speed;
      point.angel += Math.PI / 3;
      return point;
    };

    stateToHandler.set(BallState.FLY_RIGHT, flyRightHandler);
    stateToHandler.set(BallState.FLY_LEFT, flyLeftHandler);
    stateToHandler.set(BallState.ROLL_RIGHT, rollHorHandler);
    stateToHandler.set(BallState.ROLL_DOWN, rollVertHandler);

    return stateToHandler;
  }

  private static buildStateToComparatorMap(): Map<any, (val1: AnglePoint, val2: AnglePoint) => boolean> {
    let stateToComparator: Map<any, (val1: AnglePoint, val2: AnglePoint) => boolean> = new Map<any, (val1: AnglePoint, val2: AnglePoint) => boolean>();

    let flyRightComparator = (val1: AnglePoint, val2: AnglePoint) => {
      return val1.x < val2.x && val1.y < val2.y;
    };
    let flyLeftComparator = (val1: AnglePoint, val2: AnglePoint) => {
      return val1.x > val2.x && val1.y < val2.y;
    };
    let rollRightComparator = (val1: AnglePoint, val2: AnglePoint) => {
      return val1.x < val2.x;
    };
    let rollDownComparator = (val1: AnglePoint, val2: AnglePoint) => {
      return val1.y < val2.y;
    };

    stateToComparator.set(BallState.FLY_LEFT, flyLeftComparator);
    stateToComparator.set(BallState.FLY_RIGHT, flyRightComparator);
    stateToComparator.set(BallState.ROLL_DOWN, rollDownComparator);
    stateToComparator.set(BallState.ROLL_RIGHT, rollRightComparator);

    return stateToComparator;
  }
}
