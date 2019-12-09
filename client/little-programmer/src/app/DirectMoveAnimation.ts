import {CanvasAnimation} from "./CanvasAnimation";
import {DirectMoveFunctions} from "./DirectMoveFunctions";

export class DirectMoveAnimation implements CanvasAnimation {
  private curPos = 0;
  private prevPos = -1;
  private amountOfVisitedCords = 0;

  private matrixCords;
  private speed;
  private dx: { val: number } = {val: 0};
  private dy: { val: number } = {val: 0};
  private readonly route = [];
  private numOfCols: number;
  private numOfRows: number;

  constructor(matrixCords, codeLines, numOfRows: number, numOfCols: number, speed: number, dx: number, dy: number) {
    this.matrixCords = matrixCords;
    this.speed = speed;
    this.dx.val = dx;
    this.dy.val = dy;
    this.numOfCols = numOfCols;
    this.numOfRows = numOfRows;
    this.route = this.generateRoute(codeLines, numOfRows, numOfCols);
  }

  private activeCord: { val: number };
  private curBoundary: number;
  private comparableFunction: (first: number, second: number) => boolean;
  private diff: number;

  private handleValue(checkFunction: (val: number) => boolean, checkVal: number, route: number[], numOfLastErr: { val: number }
    , idx: number) {
    if (checkFunction(checkVal)) {
      route.push(checkVal);
    } else {
      numOfLastErr.val = idx;
      route.push(-1);
    }
  }

  private generateRoute(codeLines: Map<DirectMoveFunctions, number>, numOfRows: number, numOfCols: number): number[] {
    let route: number[] = [];
    let idx = -1;
    let numOfLastErr = {val: -1};

    for (let key of codeLines.keys()) {
      let value = codeLines.get(key);
      let checkFunction;
      let checkValue;
      let curPos = route.length > 0 ? route[route.length - 1] : 0;
      switch (key) {
        case DirectMoveFunctions.MOVE_RIGHT:
          checkFunction = (val) => {
            return val < numOfCols
          };
          checkValue = curPos + value;
          break;

        case DirectMoveFunctions.MOVE_LEFT:
          checkFunction = (val) => {
            return val >= 0
          };
          checkValue = curPos - value;
          break;

        case DirectMoveFunctions.MOVE_UP:
          checkFunction = (val) => {
            return val >= 0
          };
          checkValue = curPos - value * numOfCols;
          break;

        case DirectMoveFunctions.MOVE_DOWN:
          checkFunction = (val) => {
            return val < numOfRows * numOfCols
          };
          checkValue = curPos + value * numOfCols;
          break;
      }
      idx++;
      this.handleValue(checkFunction, checkValue, route, numOfLastErr, idx);
      if (numOfLastErr.val != -1) {
        break;
      }
    }
    return route;
  }

  private isGreater(first: number, second: number): boolean {
    return first > second;
  }

  private isLess(first: number, second: number): boolean {
    return first < second;
  }

  private isLeftRightMove(diff: number) {
    return diff < this.numOfCols;
  }

  private updateConfig(): void {
    let index = this.route[this.amountOfVisitedCords];
    let diff = index - this.curPos;
    let curBoundary;
    if (this.isLeftRightMove(diff)) {
      curBoundary = this.matrixCords[index - 1].x;
      this.activeCord = this.dx;
    } else {
      curBoundary = this.matrixCords[index - 1].y;
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
    return this.amountOfVisitedCords >= this.route.length || this.route[this.amountOfVisitedCords] == -1;
  }
}
