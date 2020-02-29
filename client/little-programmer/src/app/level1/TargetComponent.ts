import Point from "./Point";
import StateMachine from "../statemachine/StateMachine";
import TargetStateMachineBuilder from "./TargetStateMachineBuilder";
import {CirclePoint} from "./CirclePoint";
import {SharedService} from "../SharedService";

export default class TargetComponent {
  private targetPoint: CirclePoint;
  private stateMachine: StateMachine<CirclePoint>;
  private activated: boolean = false;
  private static SPEED = 5.0;
  private sharedService: SharedService;

  constructor(point: CirclePoint, sharedService: SharedService) {
    this.targetPoint = point;
    this.sharedService = sharedService;
    this.buildStateMachine();
  }

  private buildStateMachine() {
    this.stateMachine = TargetStateMachineBuilder.build(new CirclePoint(this.targetPoint.x, this.targetPoint.y, this.targetPoint.radius, this.targetPoint.color),
      new CirclePoint(0, -10, this.targetPoint.radius, this.targetPoint.color),
      TargetComponent.SPEED);
  }

  public wasActivated(): boolean {
    return this.activated;
  }

  public activateIfTarget(point: Point) {
    if (!this.activated && this.targetPoint.isPointInsideRound(point)) {
      this.activated = true;
      this.sharedService.incrementScore();
    }
  }

  public render(canvas: any): void {
    this._render(canvas);
    this.updateTargets();
  }

  private updateTargets() {
    if (this.activated && this.stateMachine.isActive()) {
      this.targetPoint = this.stateMachine.update();
    }
  }

  private _render(canvas: any): void {
    let ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(this.targetPoint.x, this.targetPoint.y, this.targetPoint.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.targetPoint.color;
    ctx.fill();
  }
}
