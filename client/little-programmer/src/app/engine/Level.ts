import {Component} from "./Component";

export default class Level {
  private readonly rootComponent: Component;

  constructor(rootComponent: Component) {
    this.rootComponent = rootComponent;
  }

  public getRootComponent(): Component {
    return this.rootComponent;
  }
}
