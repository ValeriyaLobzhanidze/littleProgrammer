import SpriteComponent from "./SpriteComponent";
import {DirectMoveFunction} from "./DirectMoveFunction";
import {ComponentI} from "../engine/ComponentI";
import {SharedService} from "../SharedService";
import CanvasShapesLib from "../lib/CanvasShapesLib";

export default class RoundGridComponent implements ComponentI {

  private cords: { x: number, y: number }[] = [];
  private readonly numOfRows: number;
  private readonly numOfCols: number;
  private readonly startX: number;
  private readonly startY: number;

  private readonly width: number;
  private readonly height: number;

  private readonly diffX: number;
  private readonly diffY: number;
  private readonly backArcsColor: string = "rgb(75,191,151, 0.1)";
  private readonly targetArcsColor: string = "rgba(159, 146, 255, 0.64)";
  private childComponent: SpriteComponent;

  private readonly arcRadius: number = 12;
  private readonly targetNums: { x: number, y: number }[] = [];
  private targetCords: { x: number, y: number }[] = [];
  private readonly startCanvasX: number;
  private readonly startCanvasY: number;

  private startDragRoundCords: { x: number, y: number };
  private horizontalDrag: boolean;
  private dragAmountOfSteps: number;

  constructor(width: number, height: number, isDefaultRoute: boolean = true, sharedService?: SharedService,
              startCanvasX?: number, startCanvasY?: number, isDefaultTarget: boolean = true, isPopUpUsed = true) {
    this.width = width;
    this.height = height;

    this.startCanvasX = startCanvasX || 0;
    this.startCanvasY = startCanvasY || 0;

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

    if (isDefaultTarget) {
      this.targetNums = this.buildRectangle(this.numOfRows, this.numOfCols, targetRectTop, targetRectLeft, targetRectHeight);
      this.targetNums = this.targetNums.concat(this.buildRectangle(this.numOfRows, this.numOfCols, targetRectTop + 2,
        targetRectLeft + 2, targetRectHeight - 4));
    }

    this.calculateCords();

    if (isDefaultRoute) {
      let route = this.buildDefaultRoute(targetRectTop, targetRectLeft, targetRectHeight);
      this.childComponent = new SpriteComponent(this.cords, this.targetCords, this.numOfRows, this.numOfCols, route, null, isPopUpUsed);
    } else {
      this.childComponent = new SpriteComponent(this.cords, this.targetCords, this.numOfRows, this.numOfCols, null, sharedService, isPopUpUsed);
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
    if (this.horizontalDrag) {
      width = this.arcRadius;
      height = this.arcRadius / 2;
    } else {
      width = this.arcRadius / 2;
      height = this.arcRadius ;
    }
    let curX = this.startDragRoundCords.x;
    let curY = this.startDragRoundCords.y - 2;
    for (let i = 0; i < this.dragAmountOfSteps; i++) {
      CanvasShapesLib.roundStrokeRect(canvas, curX, curY, width, height, 2, "rgba(159, 146, 255, 0.4)",
        "rgba(159, 146, 255, 0.4)");
      if (this.horizontalDrag) {
        curX += this.arcRadius * 3;
      } else {
        curY += this.arcRadius * 3;
      }
    }
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
          let distance = Math.abs(this.startDragRoundCords.y - closestRoundCords.y);
          this.dragAmountOfSteps = this.calculateDistanceInSteps(distance);
          this.horizontalDrag = false;

        } else if (closestRoundCords.y == this.startDragRoundCords.y) {
          let distance = Math.abs(this.startDragRoundCords.x - closestRoundCords.x);
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
}
