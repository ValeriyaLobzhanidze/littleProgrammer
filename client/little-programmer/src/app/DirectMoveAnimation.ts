import {CanvasAnimation} from "./CanvasAnimation";

export class DirectMoveAnimation implements CanvasAnimation {
  public curPos = 0;
  public prevPos = -1;
  public amountOfVisitedCords = 0;

  public cords;
  public route;
  public speed;
  public dx: { val: number };
  public dy: { val: number };

  constructor(cords, route, speed: number, dx: number, dy: number) {
    this.cords = cords;
    this.route = route;
    this.speed = speed;
    this.dx.val = dx;
    this.dy.val = dy;
  }

  public activeCord: { val: number };
  public curBoundary: number;
  public comparableFunction: (first: number, second: number) => boolean;
  public diff: number;

  private isGreater(first: number, second: number): boolean {
    return first > second;
  }

  private isLess(first: number, second: number): boolean {
    return first < second;
  }

  private isLeftRightMove(diff: number) {
    return diff == 1 || diff == -1;
  }

  private updateConfig(): void {
    let index = this.route[this.amountOfVisitedCords];
    let diff = index - this.curPos;
    let curBoundary;
    if (this.isLeftRightMove(diff)) {
      curBoundary = this.cords[index - 1].x;
      this.activeCord = this.dx;
    } else {
      curBoundary = this.cords[index - 1].y;
      this.activeCord = this.dy
    }

    let comparableFunction: (first: number, second: number) => boolean;
    if (diff > 0) {
      comparableFunction = this.isLess;
    } else {
      this.speed *= -1;
      comparableFunction = this.isGreater;
    }
    this.curBoundary = curBoundary;
    this.comparableFunction = comparableFunction;
    this.diff = diff;
  }

  public update(): { dx: number, dy: number } {
    if (this.curPos != this.prevPos) {
      this.updateConfig();
      this.prevPos = this.curPos;
    }

    if (this.comparableFunction(this.activeCord.val, this.curBoundary)) {
      this.activeCord.val += this.speed;
    } else {
      if (this.speed < 0) {
        this.speed *= -1;
      }
      this.prevPos = this.curPos;
      this.curPos += this.diff;
      this.amountOfVisitedCords++;
    }
    return {dx: this.dx.val, dy: this.dy.val};
  }

  public shouldEnd(): boolean {
    return this.amountOfVisitedCords < this.route.length
  }
}
