import StateEntry from "./StateEntry";
import Point from "../level1/Point";

/**
 *
 *
 *
 * */
export default class StateMachine<T extends Copyable | string> {
  private readonly stateList: StateEntry<T>[];
  private readonly stateToHandlerMap: Map<any, (value: T) => T>;
  private readonly stateToComparatorMap: Map<any, (val1: T, val2: T) => boolean>;

  private curPoint: T;
  private curShouldReachPoint: T;

  private curState: any;
  private curHandler: (value: T) => T;
  private curComparator: (val1: T, val2: T) => boolean;

  private stateIdx = 0;
  private isSmActive = true;
  private numOfLastErr: number = -1;

  constructor(startValue: T, stateList: StateEntry<T>[], stateToHandler: Map<any, (value: T) => T>,
              stateToComparator: Map<any, (val1: T, val2: T) => boolean>) {
    this.curPoint = startValue;
    this.stateList = stateList;
    this.stateToHandlerMap = stateToHandler;
    this.stateToComparatorMap = stateToComparator;
    this._update();
  }

  private _update() {
    if (this.stateIdx < this.stateList.length) {
      if (this.stateIdx > 0) {
        this.curPoint = this.curShouldReachPoint;
      }
      let stateEntry = this.stateList[this.stateIdx];
      if (stateEntry.endValue == null) {
        this.numOfLastErr = this.stateIdx;
        this.isSmActive = false;
        return;
      }

      this.curState = stateEntry.state;
      let copy = stateEntry.endValue instanceof Point ? stateEntry.endValue.copy() : stateEntry.endValue;
      this.curShouldReachPoint = copy;
      this.curHandler = this.stateToHandlerMap.get(this.curState);
      this.curComparator = this.stateToComparatorMap.get(this.curState);
      this.stateIdx++;
    } else {
      this.isSmActive = false;
    }
  }

  public update(): T {
    if (this.isSmActive) {
      let isActual: boolean = this.curComparator(this.curPoint, this.curShouldReachPoint);
      if (!isActual) {
        this._update();
      }
      if (this.isActive() && this.getNumOfLastErr() == -1) {
        this.curPoint = this.curHandler(this.curPoint);
      }
    }
    return this.curPoint;
  }

  public getNumOfLastErr(): number {
    return this.numOfLastErr;
  }

  public isActive(): boolean {
    return this.isSmActive;
  }

  public getCurState(): any {
    return this.curState;
  }
}
