import PropertyEntry from "./PropertyEntry";

export default class StateEntry<T> {
  public state: any;
  public property: PropertyEntry<T>;
}
