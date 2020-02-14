import StateEntry from "./StateEntry";
import StateHandler from "./StateHandler";
import StateComparator from "./StateComparator";

/**
 *
 *
 *
 * */
export default class StateMachine<T> {
  private readonly stateList: StateEntry<T>[];
  private readonly stateFunctionList: Map<any, StateHandler<T>>;
  private readonly stateComparingFunctionList: Map<any, StateComparator<T>>;

  private curProp: T;
  private curConditionToStop: T;
  private curState: any;
  private curHandler: StateHandler<any>;
  private curComparator: StateComparator<any>;

  private stateIdx = 0;
  private IS_ACTIVE = true;

  constructor(startValue: T, stateList: StateEntry[], stateFunctionList: Map<any, any>, stateComparingFunctionList: Map<any, any>) {
    this.curProp = startValue;
    this.stateList = stateList;
    this.stateFunctionList = stateFunctionList;
    this.stateComparingFunctionList = stateComparingFunctionList;
    this._update();
  }

  private _update() {
    if (this.stateIdx < this.stateList.length) {
      if (this.stateIdx > 0) {
        this.curProp = this.curConditionToStop;
      }
      let stateEntry = this.stateList[this.stateIdx++];

      let stopValue = stateEntry.property.endValueProps;
      this.curConditionToStop = new T(stopValue);

      this.curState = stateEntry.state;
      this.curHandler = this.stateFunctionList.get(this.curState);
      this.curComparator = this.stateComparingFunctionList.get(this.curState);
    } else {
      this.IS_ACTIVE = false;
    }
  }

  public update(): any {
    if (this.IS_ACTIVE) {
      let isTargetReached = this.curComparator.compare(this.curProp, this.curConditionToStop);
      if (isTargetReached) {
        this._update();
      }
      this.curProp = this.curHandler.handle(this.curProp);
    }
    return this.curProp;
  }
}
