import {ComponentI} from "./ComponentI";

export default class Level {
  private readonly rootComponent: ComponentI;

  constructor(rootComponent: ComponentI) {
    this.rootComponent = rootComponent;
  }

  public getRootComponent(): ComponentI {
    return this.rootComponent;
  }
}
