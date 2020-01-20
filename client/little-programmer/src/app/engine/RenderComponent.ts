import ChildComponent from "./ChildComponent";
import {DirectMoveFunction} from "../DirectMoveFunction";

export default class RenderComponent {

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
  private readonly targetColor: string = "rgba(159, 146, 255, 0.64)";
  private childComponent;

  private readonly radius: number = 8;
  private targets: { i: number, j: number }[] = [];
  private targetCords: { x: number, y: number }[] = [];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;

    let diam = this.radius * 2;
    this.startX = diam;
    this.startY = this.startX;

    this.diffX = diam + this.radius;
    this.diffY = diam + this.radius;

    this.numOfRows = Math.ceil((this.height - this.startX * 2) / (diam + this.radius));
    this.numOfCols = Math.ceil((this.width - this.startY * 2) / (diam + this.radius));

    this.targets = this.generateRectangleTargets(this.numOfRows, this.numOfCols, 2, 2, 8);
    this.calculateCords();

    let route = ([{direction: DirectMoveFunction.MOVE_RIGHT, val: 2},
      {direction: DirectMoveFunction.MOVE_DOWN, val: 9},
      {direction: DirectMoveFunction.MOVE_RIGHT, val: 7},
      {direction: DirectMoveFunction.MOVE_UP, val: 7},
      {direction: DirectMoveFunction.MOVE_LEFT, val: 8}]);

    this.childComponent = new ChildComponent(this.cords, this.targetCords, this.numOfRows, this.numOfCols, route);
  }

  private generateRectangleTargets(row: number, col: number, top: number, left: number, height: number) {
    let cords = [];
    if ((top < row && top >= 0) && (left < col && left >= 0)) {
      for (let i = top; i < top + height; i++) {
        for (let j = left; j < left + height; j++) {
          cords.push({i: i, j: j});
          if (i != top && i != top + height - 1) {
            cords.push({i: i, j: left + height - 1});
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

        let res = this.targets.filter(target => target.i == i && target.j == j);
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
      ctx.arc(cord.x, cord.y, this.radius, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
    }
  }

  public render(canvas: any): void {
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this._render(ctx, this.cords, this.backArcsColor);
    this._render(ctx, this.targetCords, this.targetColor);
    this.childComponent.render(canvas);
  }
}
