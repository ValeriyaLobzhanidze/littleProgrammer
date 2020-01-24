import {BallState} from "./BallState";

export default class Ball {
  private x = 0;
  private y = 0;
  private radius = 10;
  private colorHalf1 = "#58fbce";
  private colorHalf2 = "rgba(187, 116, 251, 0.83)";

  private tickPerFrame = 6;
  private startAngel = 0;
  private curTick = 0;
  private speed = 1.8;
  public static TRAJECTORY_STEP = 2;

  private currentShiftOfTrajectory = 0;

  private readonly flyBarrierX: number;
  private readonly amountOfFlyBarriers: number;
  private barrierCounter = 0;

  private readonly startRollHorizontallyX: number;
  private readonly startRollHorizontallyY: number;
  private readonly rollVerticallyBarrierY: number;
  private readonly lengthOfHorizontallyRoll: number;

  private currentUpdateFunc = this.positiveFlyDirection;
  private currentState = BallState.FLY;
  private startVerticallyMoveY: number;

  private minRadiusSize = 3;
  private radiusStep = 0.2;


  constructor(flyBarrierX: number, amountOfFlyBarriers: number, startRollHorizontallyX: number,
              startRollHorizontallyY: number, rollVerticallyBarrierY: number, lengthOfHorizontallyRoll: number) {
    this.flyBarrierX = flyBarrierX;
    this.amountOfFlyBarriers = amountOfFlyBarriers;
    this.startRollHorizontallyX = startRollHorizontallyX;
    this.startRollHorizontallyY = startRollHorizontallyY;
    this.rollVerticallyBarrierY = rollVerticallyBarrierY;
    this.lengthOfHorizontallyRoll = lengthOfHorizontallyRoll;
  }

  public render(canvas: any): void {
    this.update();
    this._render(canvas);
  }

  private _render(canvas: any) {
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = this.colorHalf1;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, this.startAngel, this.startAngel + Math.PI, true);
    ctx.fill();

    ctx.fillStyle = this.colorHalf2;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, this.startAngel + Math.PI, this.startAngel + 2 * Math.PI, true);
    ctx.fill();
  }

  private update() {
    switch (this.currentState) {
      case BallState.FLY:
        if (this.barrierCounter < this.amountOfFlyBarriers + 1) {
          if (this.barrierCounter == this.amountOfFlyBarriers) {
            if (this.x <= 0) {
              this.currentUpdateFunc = this.positiveFlyDirection;
            } else if (this.x >= this.startRollHorizontallyX && this.currentUpdateFunc == this.positiveFlyDirection) {
              this.currentState = BallState.ROLL_HOR;
              this.currentUpdateFunc = this.rollHorizontally;
            }
          } else {
            if (this.x <= 0) {
              this.currentUpdateFunc = this.positiveFlyDirection;
            }
            if (this.x >= this.flyBarrierX && this.y >= this.currentShiftOfTrajectory + Ball.trajectoryFlyFunction(this.flyBarrierX)) {
              this.currentShiftOfTrajectory += Ball.trajectoryFlyFunction(this.flyBarrierX) * Ball.TRAJECTORY_STEP;
              this.currentUpdateFunc = this.negativeFlyDirection;
              this.barrierCounter++;
            }
          }
        }
        break;
      case BallState.ROLL_HOR:
        if (this.x >= this.startRollHorizontallyX + this.lengthOfHorizontallyRoll) {
          this.currentState = BallState.ROLL_V;
          this.currentUpdateFunc = this.rollVertically;
          this.startVerticallyMoveY = this.y;
        }
        break;
      case BallState.ROLL_V:
        if (this.y >= this.startVerticallyMoveY + this.rollVerticallyBarrierY) {
          this.currentState = BallState.STABLE;
          this.colorHalf1 = this.colorHalf2;
        }
        break;
      case BallState.STABLE:
        return;
    }

    if (this.currentState != BallState.STABLE) {
      this.currentUpdateFunc();
    }
  }

  public static trajectoryFlyFunction(value: number): number {
    return Math.sqrt(value) * 5;
  }

  private positiveFlyDirection(): void {
    if (this.x < 0) {
      this.x = 0;
    }
    let sqrt = this.currentShiftOfTrajectory + Ball.trajectoryFlyFunction(this.x);
    this.x += this.speed;
    this.y = sqrt;
  }

  private negativeFlyDirection(): void {
    if (this.x < 0) {
      this.x = 0;
    }
    let sqrt = this.currentShiftOfTrajectory - Ball.trajectoryFlyFunction(this.x);
    this.x -= this.speed;
    this.y = sqrt;
  }

  private updateAnimationTick() {
    if (this.curTick < this.tickPerFrame) {
      this.curTick++;
    } else {
      this.curTick = 0;
    }
  }

  private changeAngle() {
    this.startAngel += Math.PI / 4;
  }

  private decreaseSize() {
    if (this.radius > this.minRadiusSize) {
      this.radius -= this.radiusStep;
    }
  }

  private rollHorizontally(): void {
    this.updateAnimationTick();
    if (this.curTick == 0) {
      this.changeAngle();
      this.decreaseSize();
    }
    this.x += this.speed;
  }

  private rollVertically(): void {
    this.updateAnimationTick();
    if (this.curTick == 0) {
      this.changeAngle();
    }
    this.y += this.speed;
  }

  public getCurrentCords(): { x: number, y: number } {
    return {x: this.x, y: this.y};
  }
}
