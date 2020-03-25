import StateEntry from "./StateEntry";
import AnglePoint from "../instructionset/AnglePoint";
import {BallState} from "../instructionset/BallState";

/**
 *
 *
 *
 * */
export default class StateMachine<T> {
  private readonly stateList: StateEntry<T>[];
  private readonly stateToHandlerMap: Map<any, (value: T) => T>;
  private readonly stateToComparatorMap: Map<any, (val1: T, val2: T) => boolean>;

  private curProp: T;
  private curShouldReachProp: T;

  private curState: any;
  private curHandler: (value: T) => T;
  private curComparator: (val1: T, val2: T) => boolean;

  private stateIdx = 0;
  private isSmActive = true;
  private numOfLastErr: number = -1;

  constructor(startValue: T, stateList: StateEntry<T>[], stateToHandler: Map<any, (value: T) => T>,
              stateToComparator: Map<any, (val1: T, val2: T) => boolean>) {
    this.curProp = startValue;
    this.stateList = stateList;
    this.stateToHandlerMap = stateToHandler;
    this.stateToComparatorMap = stateToComparator;
    this._update();
  }

  private _update() {
    if (this.stateIdx < this.stateList.length) {
      if (this.stateIdx > 0) {
        this.curProp = this.curShouldReachProp;
      }
      let stateEntry = this.stateList[this.stateIdx];
      if (stateEntry.endValue == null) {
        this.numOfLastErr = this.stateIdx;
        this.isSmActive = false;
        return;
      }

      this.curState = stateEntry.state;
      this.curShouldReachProp = stateEntry.endValue;
      this.curHandler = this.stateToHandlerMap.get(this.curState);
      this.curComparator = this.stateToComparatorMap.get(this.curState);
      this.stateIdx++;
    } else {
      this.isSmActive = false;
    }
  }

  public update(): T {
    if (this.isSmActive) {
      let isActual: boolean = this.curComparator(this.curProp, this.curShouldReachProp);
      if (!isActual) {
        this._update();
      }
      if (this.isActive() && this.getNumOfLastErr() == -1) {
        this.curProp = this.curHandler(this.curProp);
      }
    }
    return this.curProp;
  }

  public getNumOfLastErr(): number {
    return this.numOfLastErr;
  }

  public isActive(): boolean {
    return this.isSmActive;
  }
}
