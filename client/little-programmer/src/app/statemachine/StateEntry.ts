export default class StateEntry<T> {
  public state: any;
  public endValue: T;

  constructor(state: any, endValue: T) {
    this.state = state;
    this.endValue = endValue;
  }
}
