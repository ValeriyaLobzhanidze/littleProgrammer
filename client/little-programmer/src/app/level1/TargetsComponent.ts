import Global from "../global/Global";
import Point from "./Point";
import StateMachine from "../statemachine/StateMachine";
import TargetStateMachineBuilder from "./TargetStateMachineBuilder";

export default class TargetsComponent {
  private color: string = Global.DEEP_GREEN;
  private cords: Point[];
  private radius: number;
  private pointToStateMachine: Map<Point, StateMachine<Point>> = new Map<Point, StateMachine<Point>>();
  private activePoint: Point[] = [];

  constructor(cords: Point[], radius: number) {
    this.cords = cords;
    this.radius = radius;
    this.buildStateMachines();
  }

  private buildStateMachines() {
    for (let point of this.cords) {
      this.pointToStateMachine.set(point, TargetStateMachineBuilder.build(new Point(point.x, point.y), new Point(0, 0), 5.0));
    }
  }

  public activateIfTarget(point: Point) {
    let idx = this.cords.indexOf(point);
    if (idx !== -1) {
      this.activePoint.push(this.cords[idx]);
    }
  }

  public render(canvas: any): void {
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this._render(canvas);
    for (let point of this.activePoint) {
      point = this.pointToStateMachine.get(point).update();
    }
  }

  private _render(canvas: any): void {
    let ctx = canvas.getContext('2d');
    for (let point of this.cords) {
      ctx.beginPath();
      ctx.arc(point.x, point.y, this.radius, 0, 2 * Math.PI);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }
}
