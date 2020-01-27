import SpriteComponent from "./SpriteComponent";
import {DirectMoveFunction} from "./DirectMoveFunction";
import {ComponentI} from "../engine/ComponentI";
import {SharedService} from "../SharedService";

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
  private childComponent: ComponentI;

  private readonly arcRadius: number = 12;
  private targetNums: { x: number, y: number }[] = [];
  private targetCords: { x: number, y: number }[] = [];

  constructor(width: number, height: number, isDefaultRoute: boolean = true, sharedService?: SharedService) {
    this.width = width;
    this.height = height;

    let diam = this.arcRadius * 2;
    this.startX = diam;
    this.startY = diam;

    this.diffX = diam + this.arcRadius;
    this.diffY = diam + this.arcRadius;

    this.numOfRows = Math.floor((this.height - this.arcRadius * 2) / (diam + this.arcRadius));
    this.numOfCols = Math.floor((this.width - this.arcRadius * 2) / (diam + this.arcRadius));

    let targetRectHeight = this.numOfRows - 4;
    let targetRectTop = 2;
    let targetRectLeft = 2;

    this.targetNums = this.buildRectangle(this.numOfRows, this.numOfCols, targetRectTop, targetRectLeft, targetRectHeight);
    this.targetNums = this.targetNums.concat(this.buildRectangle(this.numOfRows, this.numOfCols, targetRectTop + 2, targetRectLeft + 2, targetRectHeight - 4));
    this.calculateCords();

    if (isDefaultRoute) {
      let route = this.buildDefaultRoute(targetRectTop, targetRectLeft, targetRectHeight);
      this.childComponent = new SpriteComponent(this.cords, this.targetCords, this.numOfRows, this.numOfCols, route);
    } else {
      this.childComponent = new SpriteComponent(this.cords, this.targetCords, this.numOfRows, this.numOfCols, null, sharedService);
    }
  }

  // private findAppropriateRadius(width: number, height: number): number {
  //
  // }

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
    let dx = this.startX;
    let dy = this.startY;
    for (let i = 0; i < this.numOfRows; i++) {
      for (let j = 0; j < this.numOfCols; j++) {
        let cord = {x: dx, y: dy};
        this.cords.push(cord);

        let res = this.targetNums.filter(target => target.x == i && target.y == j);
        if (res.length > 0) {
          this.targetCords.push({x: dx, y: dy});
        }
        dx += this.diffX;
      }
      dx = this.startX;
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

  public render(canvas: any): void {
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this._render(ctx, this.cords, this.backArcsColor);
    this._render(ctx, this.targetCords, this.targetArcsColor);
    this.childComponent.render(canvas);
  }

  public getAmountOfTargets(): number {
    return this.targetCords.length;
  }
}
