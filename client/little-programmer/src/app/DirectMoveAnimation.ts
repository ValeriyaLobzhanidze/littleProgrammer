import {CanvasAnimation} from "./CanvasAnimation";
import {DirectMoveFunctions} from "./DirectMoveFunctions";

export class DirectMoveAnimation implements CanvasAnimation {
  private curPos = 0;
  private startFlag = 0;
  private amountOfVisitedCords = 0;

  private matrixCords;
  private speed;
  private dx: { val: number } = {val: 0};
  private dy: { val: number } = {val: 0};
  private readonly route: { direction: DirectMoveFunctions, val: number }[];
  private readonly numOfCols: number;
  private readonly numOfRows: number;
  private numOfLastErrLine = -1;

  constructor(matrixCords, route, numOfRows: number, numOfCols: number, speed: number, dx: number, dy: number) {
    this.matrixCords = matrixCords;
    this.speed = speed;
    this.dx.val = dx;
    this.dy.val = dy;
    this.numOfCols = numOfCols;
    this.numOfRows = numOfRows;
    this.route = route;
  }

  private activeCord: { val: number };
  private curBoundary: number;
  private comparableFunction: (first: number, second: number) => boolean;

  private isGreater(first: number, second: number): boolean {
    return first > second;
  }

  private isLess(first: number, second: number): boolean {
    return first < second;
  }

  //this method updates current state: active coordinate(can be dx or dy) and comparable function
  //changing state happens when current dx has reached its current boundary
  private updateState(): void {
    let curEntry = this.route[this.amountOfVisitedCords];

    switch (curEntry.direction) {
      case DirectMoveFunctions.MOVE_RIGHT:
        if (this.curPos + curEntry.val < this.numOfCols) {
          this.curPos += curEntry.val;
          this.curBoundary = this.matrixCords[this.curPos].x;
          this.activeCord = this.dx;
          this.comparableFunction = this.isLess;
        } else {
          this.numOfLastErrLine = this.amountOfVisitedCords;
        }
        break;

      case DirectMoveFunctions.MOVE_LEFT:
        if (this.curPos - curEntry.val >= 0) {
          this.curPos -= curEntry.val;
          this.curBoundary = this.matrixCords[this.curPos].x;
          this.activeCord = this.dx;
          this.comparableFunction = this.isGreater;
          this.speed *= -1;
        } else {
          this.numOfLastErrLine = this.amountOfVisitedCords;
        }
        break;

      case DirectMoveFunctions.MOVE_UP:
        if (this.curPos - curEntry.val * this.numOfCols >= 0) {
          this.curPos -= curEntry.val * this.numOfCols;
          this.curBoundary = this.matrixCords[this.curPos].y;
          this.activeCord = this.dy;
          this.comparableFunction = this.isGreater;
          this.speed *= -1;
        } else {
          this.numOfLastErrLine = this.amountOfVisitedCords;
        }
        break;

      case DirectMoveFunctions.MOVE_DOWN:
        if (this.curPos + curEntry.val * this.numOfCols < this.numOfCols * this.numOfRows) {
          this.curPos += curEntry.val * this.numOfCols;
          this.curBoundary = this.matrixCords[this.curPos].y;
          this.activeCord = this.dy;
          this.comparableFunction = this.isLess;
        } else {
          this.numOfLastErrLine = this.amountOfVisitedCords;
        }
        break;
      default:
        this.numOfLastErrLine = this.amountOfVisitedCords;
    }
  }

  public update(): { dx: number, dy: number } {
    if (!this.startFlag) {
      this.updateState();
      this.startFlag = 1;
    }

    if (this.comparableFunction(this.activeCord.val, this.curBoundary)) {
      this.activeCord.val += this.speed;
    } else {
      if (this.speed < 0) {
        this.speed *= -1;
      }
      this.amountOfVisitedCords++;
      if (!this.shouldEnd()) {
        this.updateState();
      }
    }
    return {dx: this.dx.val, dy: this.dy.val};
  }

  public shouldEnd(): boolean {
    return this.amountOfVisitedCords >= this.route.length;
  }

  public getNumOfLastErrLine(): number {
    return this.numOfLastErrLine;
  }
}
