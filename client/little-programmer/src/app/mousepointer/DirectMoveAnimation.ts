import {DirectMoveFunction} from "../level1/DirectMoveFunction";

export default class DirectMoveAnimation {
  private speed = 2.1;
  private curState: DirectMoveFunction;
  private curX;
  private curY;

  private readonly route: DirectMoveFunction[];
  private readonly cords: { x: number, y: number }[];
  private curBarrier: { x: number, y: number };
  private curCord = 0;
  private curStateIdx = 0;

  constructor(route: DirectMoveFunction[], cords: { x: number; y: number }[]) {
    if (!route || route.length == 0) {
      throw new Error("Empty route array");
    }

    this.route = route;
    this.cords = cords;

    this.curX = this.cords[this.curCord].x;
    this.curY = this.cords[this.curCord].y;

    if (this.cords.length > 1) {
      this.curBarrier = this.cords[this.curCord + 1];
    } else {
      this.curBarrier = this.cords[this.curCord];
    }
    this.curCord += 2;

    this.curState = DirectMoveFunction.STABLE;
  }

  public activate() {
    this.curState = this.route[this.curStateIdx++];
  }

  public isActive(): boolean {
    return !(this.curState == DirectMoveFunction.STABLE);
  }

  public update(): { x: number, y: number } {
    this.changeState();
    return {x: this.curX, y: this.curY};
  }

  public getCords(): { x: number, y: number } {
    return {x: this.curX, y: this.curY};
  }

  public getState(): DirectMoveFunction {
    return this.curState;
  }

  private changeBarrier(): void {
    if (this.curStateIdx < this.route.length && this.curCord < this.cords.length) {
      this.curX = this.curBarrier.x;
      this.curY = this.curBarrier.y;
      this.curBarrier = this.cords[this.curCord++];
      this.curState = this.route[this.curStateIdx++];
    } else {
      this.curState = DirectMoveFunction.STABLE;
    }
  }

  private changeState(): void {
    switch (this.curState) {
      case DirectMoveFunction.STABLE:
        return;
      case DirectMoveFunction.MOVE_DOWN:
        if (this.curY >= this.curBarrier.y) {
          this.changeBarrier();
        } else {
          this.curY += this.speed;
        }
        break;
      case DirectMoveFunction.MOVE_LEFT:
        if (this.curX <= this.curBarrier.x) {
          this.changeBarrier();
        } else {
          this.curX -= this.speed;
        }
        break;
      case DirectMoveFunction.MOVE_RIGHT:
        if (this.curX >= this.curBarrier.x) {
          this.changeBarrier();
        } else {
          this.curX += this.speed;
        }
        break;
      case DirectMoveFunction.MOVE_UP:
        if (this.curY <= this.curBarrier.y) {
          this.changeBarrier();
        } else {
          this.curY -= this.speed;
        }
        break;
    }
  }
}
