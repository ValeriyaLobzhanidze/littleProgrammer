import SpriteComponent from "./SpriteComponent";
import {DirectMoveFunction} from "./DirectMoveFunction";
import {ComponentI} from "../engine/ComponentI";
import {SharedService} from "../SharedService";
import CanvasLib from "../lib/CanvasLib";
import Global from "../global/Global";
import Point from "./Point";
import RoundGridComponentProps from "./RoundGridComponentProps";

export default class RoundGridComponent implements ComponentI {

  private roundCords: Point[] = [];
  private numOfRows: number;
  private numOfCols: number;
  private startX: number;
  private startY: number;

  private width: number;
  private height: number;

  private diffX: number;
  private diffY: number;
  private ordinaryRoundColor: string = Global.LIGHT_GREEN;
  private targetRoundColor: string = Global.DEEP_GREEN;
  private childComponent: SpriteComponent;

  private readonly roundRadius: number = 12;
  private targetNums: Point[] = [];
  private targetCords: Point[] = [];

  private startDragRoundCords: Point = new Point(0, 0);
  private horizontalDrag: boolean;
  private dragAmountOfSteps: number;

  constructor() {
  }

  init(props: RoundGridComponentProps) {
    this.width = props.canvasWidth;
    this.height = props.canvasHeight;

    let diam = this.roundRadius * 2;
    this.startX = diam;
    this.startY = diam;

    this.diffX = diam + this.roundRadius;
    this.diffY = diam + this.roundRadius;

    this.numOfRows = Math.floor(((this.height - props.canvasTop) - this.roundRadius * 2) / (diam + this.roundRadius));
    this.numOfCols = Math.floor(((this.width - props.canvasLeft) - this.roundRadius * 2) / (diam + this.roundRadius));

    let targetRectHeight = this.numOfCols - 4;
    let targetRectTop = 2;
    let targetRectLeft = 2;

    if (props.isDefaultTarget) {
      this.targetNums = this.buildRectangle(this.numOfRows, this.numOfCols, targetRectTop, targetRectLeft, targetRectHeight);
      this.targetNums = this.targetNums.concat(this.buildRectangle(this.numOfRows, this.numOfCols, targetRectTop + 2,
        targetRectLeft + 2, targetRectHeight - 4));
    }

    this.calculateCords(props.canvasLeft, props.canvasTop);

    if (props.isDefaultRoute) {
      let route = this.buildDefaultRoute(targetRectTop, targetRectLeft, targetRectHeight);
      this.childComponent = new SpriteComponent(this.roundCords, this.targetCords, this.numOfRows, this.numOfCols, route, null, props.isPopUpUsed);
    } else {
      this.childComponent = new SpriteComponent(this.roundCords, this.targetCords, this.numOfRows, this.numOfCols, null, props.sharedService, props.isPopUpUsed);
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

  private buildRectangle(row: number, col: number, top: number, left: number, height: number): Point[] {
    let cords = [];
    if ((top < row && top >= 0) && (left < col && left >= 0)) {
      for (let i = top; i < top + height; i++) {
        for (let j = left; j < left + height; j++) {
          cords.push(new Point(i, j));
          if (i != top && i != top + height - 1) {
            cords.push(new Point(i, left + height - 1));
            break;
          }
        }
      }
    } else {
      return null;
    }
    return cords;
  }

  private calculateCords(canvasLeft: number, canvasTop: number): void {
    let dx = canvasLeft + this.startX;
    let dy = canvasTop + this.startY;
    for (let i = 0; i < this.numOfRows; i++) {
      for (let j = 0; j < this.numOfCols; j++) {
        let cord = new Point(dx, dy);
        this.roundCords.push(cord);

        if (this.targetNums) {
          let res = this.targetNums.filter(target => target && target.x == i && target.y == j);
          if (res.length > 0) {
            this.targetCords.push(new Point(dx, dy));
          }
        }

        dx += this.diffX;
      }
      dx = canvasLeft + this.startX;
      dy += this.diffY;
    }
  }

  private _render(ctx, cords: { x: number, y: number }[], color: string): void {
    for (let cord of cords) {

      ctx.beginPath();//TODO move to CanvasLib
      ctx.arc(cord.x, cord.y, this.roundRadius, 0, 2 * Math.PI);
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
      width = this.roundRadius / 2;
      height = this.roundRadius / 3;
      stepX = this.roundRadius + this.roundRadius / 4;
      shiftX = this.roundRadius / 4;
      shiftTextY = 4;
      if (this.dragAmountOfSteps < 0) {
        reverseShiftX = this.roundRadius / 2;
      }
    } else {
      width = this.roundRadius / 3;
      height = this.roundRadius / 2;
      stepY = this.roundRadius + this.roundRadius / 4;
      shiftY = this.roundRadius / 4;
      shiftTextX = 6;
      shiftTextY = -5;
      if (this.dragAmountOfSteps < 0) {
        reverseShiftY = this.roundRadius / 2;
      }
    }
    let curX = this.startDragRoundCords.x;
    let curY = this.startDragRoundCords.y - 2;

    if (this.dragAmountOfSteps < 0) {
      stepX *= -1;
      stepY *= -1;
    }

    for (let i = 0; i < Math.abs(this.dragAmountOfSteps); i++) {
      CanvasLib.roundStrokeRect(canvas, curX - shiftX, curY - shiftY, width, height, 2, Global.DEEP_PURPLE, Global.LIGHT_PURPLE);
      CanvasLib.roundStrokeRect(canvas, curX + stepX - reverseShiftX, curY + stepY - reverseShiftY, width, height, 2, Global.DEEP_PURPLE, Global.LIGHT_PURPLE);
      CanvasLib.text(canvas, String(i + 1), curX + stepX + shiftTextX, curY + stepY - shiftTextY, 10, Global.MAIN_FONT, Global.DEEP_PURPLE);

      if (this.horizontalDrag) {
        let diff = this.roundRadius * 1.5 + this.roundRadius / 4;
        if (this.dragAmountOfSteps < 0) {
          diff *= -1;
        }
        curX += diff + stepX;
      } else {
        let diff = this.roundRadius * 1.5 + this.roundRadius / 4;
        if (this.dragAmountOfSteps < 0) {
          diff *= -1;
        }
        curY += diff + stepY;
      }
    }
    CanvasLib.roundStrokeRect(canvas, curX - shiftX, curY - shiftY, width, height, 2, Global.DEEP_PURPLE, Global.LIGHT_PURPLE);
  }

  public render(canvas: any): void {
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this._render(ctx, this.roundCords, this.ordinaryRoundColor);
    this._render(ctx, this.targetCords, this.targetRoundColor);
    if (this.startDragRoundCords && this.dragAmountOfSteps) {
      this.renderRectLine(canvas);
    }
    this.childComponent.render(canvas);
  }

  public getAmountOfTargets(): number {
    return this.targetCords.length;
  }

  private isPointInsideRound(x0: number, y0: number, xPoint: number, yPoint: number): boolean {
    return Math.sqrt((xPoint - x0) * (xPoint - x0) + (yPoint - y0) * (yPoint - y0)) <= this.roundRadius;
  }

  private startPointIdentityCheck(x: number, y: number): boolean {
    if (this.startDragRoundCords) {
      return x == this.startDragRoundCords.x && y == this.startDragRoundCords.y
    } else {
      return false;
    }
  }

  private findClosestRound(x: number, y: number): Point {
    for (let round of this.roundCords) {
      if (this.isPointInsideRound(round.x, round.y, x, y) && !this.startPointIdentityCheck(round.x, round.y)) {
        return new Point(round.x, round.y);
      }
    }
    return null;
  }

  private calculateDistanceInSteps(value: number): number {
    return value / (this.roundRadius * 3);
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

  public getCords(): Point[] {
    return this.roundCords;
  }

  public getAmountOfRows(): number {
    return this.numOfRows;
  }

  public getAmountOfCols(): number {
    return this.numOfCols;
  }
}
