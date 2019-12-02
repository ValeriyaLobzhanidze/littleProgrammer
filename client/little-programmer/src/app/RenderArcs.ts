import {Render} from "./Render";

export class RenderArcs implements Render {
  private ctx: any;
  private readonly numOfArcsInRow: number;
  private readonly numOfArcsInCol: number;
  private readonly startX: number;
  private readonly startY: number;

  private readonly diffX: number = 70;
  private readonly diffY: number = 100;
  private readonly color: string = "rgb(73,200,158)";
  private readonly radius: number = 8;

  constructor(ctx: any, numOfArcsInRow: number, numOfArcsInCol: number, startX: number, startY: number) {
    this.ctx = ctx;
    this.numOfArcsInRow = numOfArcsInRow;
    this.numOfArcsInCol = numOfArcsInCol;
    this.startX = startX;
    this.startY = startY;
  }

  public render(): { x: number, y: number }[] {
    let cords: { x: number, y: number }[] = [];
    let dx = this.startX;
    let dy = this.startY;
    for (let i = 0; i < this.numOfArcsInCol; i++) {
      for (let j = 0; j < this.numOfArcsInRow; j++) {
        let cord = {x: dx, y: dy};
        cords.push(cord);
        this.ctx.beginPath();
        this.ctx.arc(dx, dy, this.radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        dx += this.diffX;
      }
      dx = this.startX;
      dy += this.diffY;
    }
    return cords;
  }
}
