import {Type} from "@angular/core";

export default class PropertyEntry<T> {
  public type: Type<T>;
  public endValueProps: T;
}
