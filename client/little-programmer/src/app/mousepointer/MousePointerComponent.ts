import {ComponentI} from "../engine/ComponentI";
import Point from "../level1/Point";
import StateEntry from "../statemachine/StateEntry";
import StateMachine from "../statemachine/StateMachine";
import DirectMoveStateMachineBuilder from "../level1/DirectMoveStateMachineBuilder";

export default class MousePointerComponent implements ComponentI {
  private static readonly WIDTH = 24;
  private static readonly HEIGHT = 24;

  private readonly image;
  private curPoint: Point;
  private stateMachine: StateMachine<Point>;
  private activated: boolean = false;
  public activate: () => void;

  constructor(startPoint: Point, stateEntries: StateEntry<Point>[]) {
    this.curPoint = startPoint;
    this.image = new Image(0, 0);
    this.image.src = "/assets/images/mouse-pointer.png";
    this.activate = () => {
      this.stateMachine = DirectMoveStateMachineBuilder.buildWithoutTranslation(startPoint, stateEntries);
      this.activated = true;
    }
  }

  public wasActivated(): boolean {
    return this.activated;
  }

  public isActive(): boolean {
    return this.stateMachine && this.stateMachine.isActive();
  }

  private _render(canvas: any) {
    let ctx = canvas.getContext('2d');
    ctx.drawImage(this.image, this.curPoint.x, this.curPoint.y, MousePointerComponent.WIDTH, MousePointerComponent.HEIGHT);
  }

  public render(canvas: any) {
    if (this.stateMachine && this.stateMachine.isActive()) {
      this.curPoint = this.stateMachine.update();
    }
    this._render(canvas);
  }

  public getState() {
    return this.stateMachine.getCurState();
  }

  public getCurPoint(): Point {
    return this.curPoint;
  }
}
