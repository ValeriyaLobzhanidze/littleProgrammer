import {BallState} from "./BallState";

export default class Ball {
  private x = 0;
  private y = 0;
  private radius = 11;
  private colorHalf1 = "#58fbce";
  private colorHalf2 = "rgba(187, 116, 251, 0.83)";

  private currentX = 0;
  private currentY = 0;

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
  private readonly rollVerticallyBarrierY: number;
  private readonly lengthOfHorizontallyRoll: number;

  private currentState = BallState.FLY;
  private startVerticallyMoveY: number;

  private currentUpdateFuncY: (value: number) => number = this.positiveYFlyDirection;
  private currentUpdateFuncX: (value: number) => number = this.positiveDirection;

  private minRadiusSize = 1;
  private radiusStep = 0.2;

  constructor(flyBarrierX: number, amountOfFlyBarriers: number, startRollHorizontallyX: number, rollVerticallyBarrierY: number, lengthOfHorizontallyRoll: number) {
    this.flyBarrierX = flyBarrierX;
    this.amountOfFlyBarriers = amountOfFlyBarriers;
    this.startRollHorizontallyX = startRollHorizontallyX;
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
          if (this.currentX < 0) {
            this.currentX = 0;
            this.currentY = this.currentUpdateFuncY(this.currentX);

            this.currentUpdateFuncX = this.positiveDirection;
            this.currentUpdateFuncY = this.positiveYFlyDirection;

          }
          if (this.barrierCounter == this.amountOfFlyBarriers) {
            if (this.currentX > this.startRollHorizontallyX && this.currentUpdateFuncY == this.positiveYFlyDirection) {
              this.currentState = BallState.ROLL_HOR;

              this.currentX = this.startRollHorizontallyX;
              this.currentY = this.currentUpdateFuncY(this.currentX);

              this.currentUpdateFuncY = null;
              this.currentUpdateFuncX = this.positiveDirection;
              this.speed = 1.2;
            }
          } else {
            if (this.currentX > this.flyBarrierX) {
              this.currentX = this.flyBarrierX;
              this.currentY = this.currentUpdateFuncY(this.currentX);

              this.currentShiftOfTrajectory += Ball.trajectoryFlyFunction(this.flyBarrierX) * Ball.TRAJECTORY_STEP;
              this.currentUpdateFuncX = this.negativeDirection;
              this.currentUpdateFuncY = this.negativeYFlyDirection;
              this.barrierCounter++;
            }
          }
        }
        break;
      case BallState.ROLL_HOR:
        if (this.currentX > this.startRollHorizontallyX + this.lengthOfHorizontallyRoll) {
          this.currentState = BallState.ROLL_V;
          this.currentX = this.startRollHorizontallyX + this.lengthOfHorizontallyRoll;

          this.currentUpdateFuncX = null;
          this.currentUpdateFuncY = this.positiveDirection;
          this.startVerticallyMoveY = this.y;
        }
        break;
      case BallState.ROLL_V:
        if (this.currentY > this.startVerticallyMoveY + this.rollVerticallyBarrierY) {
          this.currentY = this.startVerticallyMoveY + this.rollVerticallyBarrierY;
          this.currentState = BallState.STABLE;
          this.colorHalf1 = this.colorHalf2;
        }
        break;
      case BallState.STABLE:
        return;
    }

    if (this.currentState != BallState.STABLE) {
      this.x = this.currentX;
      this.y = this.currentY;

      if (this.curTick == 0) {
        if (this.currentState != BallState.FLY) {
          this.decreaseSize();
          this.changeAngle();
        }
      }
      this.updateAnimationTick();

      if (this.currentUpdateFuncX) {
        this.currentX = this.currentUpdateFuncX(this.x);
        if (this.currentUpdateFuncY && this.currentX > 0) {
          this.currentY = this.currentUpdateFuncY(this.currentX);
        }
      } else if (this.currentUpdateFuncY) {
        this.currentY = this.currentUpdateFuncY(this.currentY);
      }
    }
  }

  public static trajectoryFlyFunction(value: number): number {
    return Math.sqrt(value) * 4;
  }

  private positiveYFlyDirection(value: number): number {
    return this.currentShiftOfTrajectory + Ball.trajectoryFlyFunction(value);
  }

  private negativeYFlyDirection(value: number): number {
    return this.currentShiftOfTrajectory - Ball.trajectoryFlyFunction(value);
  }

  private positiveDirection(value: number): number {
    return value + this.speed;
  }

  private negativeDirection(value: number): number {
    return value - this.speed;
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

  public getCurrentCords(): { x: number, y: number } {
    return {x: this.x, y: this.y};
  }
}
