import SpriteComponent from "./SpriteComponent";
import {DirectMoveFunction} from "./DirectMoveFunction";
import {ComponentI} from "../engine/ComponentI";
import {SharedService} from "../SharedService";
import CanvasShapesLib from "../lib/CanvasShapesLib";

export default class RoundGridComponent implements ComponentI {

  private cords: { x: number, y: number }[] = [];
  private numOfRows: number;
  private numOfCols: number;
  private startX: number;
  private startY: number;

  private width: number;
  private height: number;

  private diffX: number;
  private diffY: number;
  private backArcsColor: string = "rgb(75,191,151, 0.1)";
  private targetArcsColor: string = "rgb(99, 177, 117, 0.64)";
  // private targetArcsColor: string = "rgba(159, 146, 255, 0.64)";
  private childComponent: SpriteComponent;

  private readonly arcRadius: number = 12;
  private targetNums: { x: number, y: number }[] = [];
  private targetCords: { x: number, y: number }[] = [];
  private startCanvasX: number;
  private startCanvasY: number;

  private startDragRoundCords: { x: number, y: number } = {x: 0, y: 0};
  private horizontalDrag: boolean;
  private dragAmountOfSteps: number;

  constructor() {

  }

  init(props: any) {
    this.width = props.width;
    this.height = props.height;

    this.startCanvasX = props.startCanvasX || 0;
    this.startCanvasY = props.startCanvasY || 0;

    let diam = this.arcRadius * 2;
    this.startX = diam;
    this.startY = diam;

    this.diffX = diam + this.arcRadius;
    this.diffY = diam + this.arcRadius;

    this.numOfRows = Math.floor(((this.height - this.startCanvasY) - this.arcRadius * 2) / (diam + this.arcRadius));
    this.numOfCols = Math.floor(((this.width - this.startCanvasX) - this.arcRadius * 2) / (diam + this.arcRadius));

    let targetRectHeight = this.numOfCols - 4;
    let targetRectTop = 2;
    let targetRectLeft = 2;

    if (props.isDefaultTarget) {
      this.targetNums = this.buildRectangle(this.numOfRows, this.numOfCols, targetRectTop, targetRectLeft, targetRectHeight);
      this.targetNums = this.targetNums.concat(this.buildRectangle(this.numOfRows, this.numOfCols, targetRectTop + 2,
        targetRectLeft + 2, targetRectHeight - 4));
    }

    this.calculateCords();

    if (props.isDefaultRoute) {
      let route = this.buildDefaultRoute(targetRectTop, targetRectLeft, targetRectHeight);
      this.childComponent = new SpriteComponent(this.cords, this.targetCords, this.numOfRows, this.numOfCols, route, null, props.isPopUpUsed);
    } else {
      this.childComponent = new SpriteComponent(this.cords, this.targetCords, this.numOfRows, this.numOfCols, null, props.sharedService, props.isPopUpUsed);
    }
  }

  public unsubscribeFromGettingCodeLines() {
    this.childComponent.unsubscribeFromGettingCodeLines();
  }

  public subscribeForGettingCodeLines() {
    this.childComponent.subscribeForGettingCodeLines();
  }

  private buildDefaultRoute(top: number, left: number, height: number): { direction: DirectMoveFunction, val: number } [] {
    return ([{direction: DirectMoveFunction.MOVE_RIGHT, val: left},
      {direction: DirectMoveFunction.MOVE_DOWN, val: top + height - 1},
      {direction: DirectMoveFunction.MOVE_RIGHT, val: height - 1},
      {direction: DirectMoveFunction.MOVE_UP, val: height - 1},
      {direction: DirectMoveFunction.MOVE_LEFT, val: height}]);
  }

  private buildRectangle(row: number, col: number, top: number, left: number, height: number): { x: number, y: number }[] {
    let cords = [];
    if ((top < row && top >= 0) && (left < col && left >= 0)) {
      for (let i = top; i < top + height; i++) {
        for (let j = left; j < left + height; j++) {
          cords.push({x: i, y: j});
          if (i != top && i != top + height - 1) {
            cords.push({x: i, y: left + height - 1});
            break;
          }
        }
      }
    } else {
      return null;
    }
    return cords;
  }

  private calculateCords(): void {
    let dx = this.startCanvasX + this.startX;
    let dy = this.startCanvasY + this.startY;
    for (let i = 0; i < this.numOfRows; i++) {
      for (let j = 0; j < this.numOfCols; j++) {
        let cord = {x: dx, y: dy};
        this.cords.push(cord);

        if (this.targetNums) {
          let res = this.targetNums.filter(target => target && target.x == i && target.y == j);
          if (res.length > 0) {
            this.targetCords.push({x: dx, y: dy});
          }
        }

        dx += this.diffX;
      }
      dx = this.startCanvasX + this.startX;
      dy += this.diffY;
    }
  }

  private _render(ctx, cords: { x: number, y: number }[], color: string): void {
    for (let cord of cords) {
      ctx.beginPath();
      ctx.arc(cord.x, cord.y, this.arcRadius, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
    }
  }

  private renderRectLine(canvas: any) {
    let width;
    let height;

    let stepX = 0;
    let stepY = 0;

    let shiftX = 0;
    let shiftY = 0;

    let shiftTextY = 0;
    let shiftTextX = 0;

    let reverseShiftX = 0;
    let reverseShiftY = 0;

    if (this.horizontalDrag) {
      width = this.arcRadius / 2;
      height = this.arcRadius / 3;
      stepX = this.arcRadius + this.arcRadius / 4;
      shiftX = this.arcRadius / 4;
      shiftTextY = 4;
      if (this.dragAmountOfSteps < 0) {
        reverseShiftX = this.arcRadius / 2;
      }
    } else {
      width = this.arcRadius / 3;
      height = this.arcRadius / 2;
      stepY = this.arcRadius + this.arcRadius / 4;
      shiftY = this.arcRadius / 4;
      shiftTextX = 6;
      shiftTextY = -5;
      if (this.dragAmountOfSteps < 0) {
        reverseShiftY = this.arcRadius / 2;
      }
    }
    let curX = this.startDragRoundCords.x;
    let curY = this.startDragRoundCords.y - 2;

    if (this.dragAmountOfSteps < 0) {
      stepX *= -1;
      stepY *= -1;
    }

    for (let i = 0; i < Math.abs(this.dragAmountOfSteps); i++) {
      CanvasShapesLib.roundStrokeRect(canvas, curX - shiftX, curY - shiftY, width, height, 2, "rgb(85,85,169)", "rgba(159, 146, 255, 0.4)");
      CanvasShapesLib.roundStrokeRect(canvas, curX + stepX - reverseShiftX, curY + stepY - reverseShiftY, width, height, 2, "rgb(85,85,169)", "rgba(159, 146, 255, 0.4)");
      CanvasShapesLib.text(canvas, i + 1 as unknown as string, curX + stepX + shiftTextX, curY + stepY - shiftTextY, 10, "KBSticktoIt", "rgb(85,85,169)");

      if (this.horizontalDrag) {
        let diff = this.arcRadius * 1.5 + this.arcRadius / 4;
        if (this.dragAmountOfSteps < 0) {
          diff *= -1;
        }
        curX += diff + stepX;
      } else {
        let diff = this.arcRadius * 1.5 + this.arcRadius / 4;
        if (this.dragAmountOfSteps < 0) {
          diff *= -1;
        }
        curY += diff + stepY;
      }
    }
    CanvasShapesLib.roundStrokeRect(canvas, curX - shiftX, curY - shiftY, width, height, 2, "rgb(85,85,169)", "rgba(159, 146, 255, 0.4)");
  }

  public render(canvas: any): void {
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this._render(ctx, this.cords, this.backArcsColor);
    this._render(ctx, this.targetCords, this.targetArcsColor);
    if (this.startDragRoundCords && this.dragAmountOfSteps) {
      this.renderRectLine(canvas);
    }
    this.childComponent.render(canvas);
  }

  public getAmountOfTargets(): number {
    return this.targetCords.length;
  }

  private isPointInsideRound(x0: number, y0: number, xPoint: number, yPoint: number): boolean {
    return Math.sqrt((xPoint - x0) * (xPoint - x0) + (yPoint - y0) * (yPoint - y0)) <= this.arcRadius;
  }

  private startPointIdentityCheck(x: number, y: number): boolean {
    if (this.startDragRoundCords) {
      return x == this.startDragRoundCords.x && y == this.startDragRoundCords.y
    } else {
      return false;
    }
  }

  private findClosestRound(x: number, y: number): { x: number, y: number } {
    for (let round of this.cords) {
      if (this.isPointInsideRound(round.x, round.y, x, y) && !this.startPointIdentityCheck(round.x, round.y)) {
        return {x: round.x, y: round.y};
      }
    }
    return null;
  }

  private calculateDistanceInSteps(value: number): number {
    return value / (this.arcRadius * 3);
  }

  public onMouseDown(x: number, y: number): void {
    this.startDragRoundCords = this.findClosestRound(x, y);
  }

  public onMouseMove(x: number, y: number): void {
    if (this.startDragRoundCords) {
      let closestRoundCords = this.findClosestRound(x, y);
      if (closestRoundCords) {
        if (closestRoundCords.x == this.startDragRoundCords.x) {
          let distance = closestRoundCords.y - this.startDragRoundCords.y;
          this.dragAmountOfSteps = this.calculateDistanceInSteps(distance);
          this.horizontalDrag = false;

        } else if (closestRoundCords.y == this.startDragRoundCords.y) {
          let distance = closestRoundCords.x - this.startDragRoundCords.x;
          this.dragAmountOfSteps = this.calculateDistanceInSteps(distance);
          this.horizontalDrag = true;
        }
      }
    }
  }

  public onMouseUp(): void {
    this.startDragRoundCords = null;
    this.dragAmountOfSteps = null;
  }

  public getCords(): { x: number, y: number }[] {
    return this.cords;
  }

  public getAmountOfRows(): number {
    return this.numOfRows;
  }

  public getAmountOfCols(): number {
    return this.numOfCols;
  }
}
