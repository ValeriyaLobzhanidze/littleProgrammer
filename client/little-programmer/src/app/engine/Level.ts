export default class Level {
  private readonly rootComponent;

  constructor(rootComponent: any) {
    this.rootComponent = rootComponent;
  }

  public getRootComponent(): any {
    return this.rootComponent;
  }
}
