import AnglePoint from "./AnglePoint";
import StateMachine from "../statemachine/StateMachine";
import BallStateMachineBuilder from "./BallStateMachineBuilder";
import {ComponentI} from "../engine/ComponentI";
import Point from "../level1/Point";

export default class Ball implements ComponentI {
  private static WIDTH = 20;
  private static HEIGHT = 20;
  private curPoint: AnglePoint = new AnglePoint(0, 0, 0);
  private readonly stateMachine: StateMachine<AnglePoint>;
  private tickCount = 0;
  private ticksPerFrame = 3;
  private readonly image;

  constructor(amountOfBarriers: number, rollRightXBarrier: number, fallDownYBarrier: number) {
    this.stateMachine = BallStateMachineBuilder.build(new AnglePoint(0, 0, 0), amountOfBarriers, rollRightXBarrier, fallDownYBarrier);
    this.image = new Image(0, 0);
    this.image.src = "/assets/images/gear.png";
  }

  render(canvas: any) {
    let ctx = canvas.getContext('2d');
    ctx.save();
    ctx.translate(this.curPoint.x, this.curPoint.y);
    ctx.rotate(this.curPoint.angel);
    ctx.drawImage(this.image, -(Ball.WIDTH / 2), -(Ball.HEIGHT / 2), Ball.WIDTH, Ball.HEIGHT);
    ctx.restore();

    this.updateTickCount();
      if (this.stateMachine && this.stateMachine.isActive()) {
        this.curPoint = this.stateMachine.update();
      }
  }

  private updateTickCount() {
    this.tickCount++;
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
    }
  }

  public getCurPoint(): AnglePoint {
    return this.curPoint;
  }

  public getBarrierPoints(): Point[] {
    return BallStateMachineBuilder.getBarrierPoints();
  }
}
