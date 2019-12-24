import {DirectMoveFunction} from "../DirectMoveFunction";
import {CanvasAnimation} from "../CanvasAnimation";

export class ChildAnimation implements CanvasAnimation {
  private curPos = 0;
  private startFlag = 0;
  private amountOfVisitedCords = 0;

  private matrixCords;
  private speed;
  private dx: { val: number } = {val: 0};
  private dy: { val: number } = {val: 0};
  private readonly route: { direction: DirectMoveFunction, val: number }[];
  private readonly numOfCols: number;
  private readonly numOfRows: number;
  private numOfLastErrLine = -1;
  // private readonly epsilonX: number;
  // private readonly epsilonY: number;
  // private visitedCords: { x: number, y: number }[] = [];
  private currentRow: number = 0;

  constructor(matrixCords, numOfRows: number, numOfCols: number, route, speed: number = 0.4) {
    this.matrixCords = matrixCords;
    this.speed = speed;
    this.dx.val = matrixCords[0].x;
    this.dy.val = matrixCords[0].y;
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
      case DirectMoveFunction.MOVE_RIGHT:
        if (this.curPos + curEntry.val < this.numOfCols * this.currentRow + this.numOfCols) {
          this.curPos += curEntry.val;
          this.curBoundary = this.matrixCords[this.curPos].x;
          this.activeCord = this.dx;
          this.comparableFunction = this.isLess;
        } else {
          this.numOfLastErrLine = this.amountOfVisitedCords;
        }
        break;

      case DirectMoveFunction.MOVE_LEFT:
        if (this.curPos - curEntry.val >= this.numOfCols * this.currentRow) {
          this.curPos -= curEntry.val;
          this.curBoundary = this.matrixCords[this.curPos].x;
          this.activeCord = this.dx;
          this.comparableFunction = this.isGreater;
          this.speed *= -1;
        } else {
          this.numOfLastErrLine = this.amountOfVisitedCords;
        }
        break;

      case DirectMoveFunction.MOVE_UP:
        if (this.curPos - curEntry.val * this.numOfCols >= 0) {
          this.currentRow -= curEntry.val;
          this.curPos -= curEntry.val * this.numOfCols;
          this.curBoundary = this.matrixCords[this.curPos].y;
          this.activeCord = this.dy;
          this.comparableFunction = this.isGreater;
          this.speed *= -1;
        } else {
          this.numOfLastErrLine = this.amountOfVisitedCords;
        }
        break;

      case DirectMoveFunction.MOVE_DOWN:
        if (this.curPos + curEntry.val * this.numOfCols < this.numOfCols * this.numOfRows) {
          this.currentRow += curEntry.val;
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

    // let result = this.targetCords.filter(cord => {
    //   return ((this.dx.val < (cord.x + this.epsilonX) && this.dx.val > (cord.x - this.epsilonX))
    //     && (this.dy.val < (cord.y + this.epsilonY) && this.dy.val > (cord.y - this.epsilonY))
    //     && !this.isInclude(this.visitedCords, cord));
    //
    // });
    // if (result.length > 0) {
    //   this.visitedCords.push(result[0]);
    // }
    return {dx: this.dx.val, dy: this.dy.val};
  }

  // private isInclude(arr: { x: number, y: number }[], targetElem: { x: number, y: number }): boolean {
  //   let result = arr.filter(elem => {
  //     return elem.x == targetElem.x && elem.y == targetElem.y
  //   });
  //   return result.length > 0;
  // }

  public shouldEnd(): boolean {
    return this.amountOfVisitedCords >= this.route.length;
  }

  public getNumOfLastErrLine(): number {
    return this.numOfLastErrLine;
  }
}
