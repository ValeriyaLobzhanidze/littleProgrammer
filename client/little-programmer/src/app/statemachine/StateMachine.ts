import StateEntry from "./StateEntry";

/**
 *
 *
 *
 * */
export default class StateMachine<T> {
  private readonly stateList: StateEntry<T>[];
  private readonly stateFunctionList: Map<any, (value: T) => T>;
  private readonly stateComparingFunctionList: Map<any, (val1: T, val2: T) => boolean>;

  private curProp: T;
  private curShouldReachProp: T;

  private curState: any;
  private curHandler: (value: T) => T;
  private curComparator: (val1: T, val2: T) => boolean;

  private stateIdx = 0;
  private isSmActive = true;
  private numOfLastErr: number = -1;

  constructor(startValue: T, stateList: StateEntry<T>[], stateFunctionList: Map<any, any>, stateComparingFunctionList: Map<any, any>) {
    this.curProp = startValue;
    this.stateList = stateList;
    this.stateFunctionList = stateFunctionList;
    this.stateComparingFunctionList = stateComparingFunctionList;
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
      this.curHandler = this.stateFunctionList.get(this.curState);
      this.curComparator = this.stateComparingFunctionList.get(this.curState);
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
