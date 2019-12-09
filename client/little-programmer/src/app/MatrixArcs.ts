import {MatrixRender} from "./MatrixRender";

export class MatrixArcs implements MatrixRender {
  private ctx: any;
  private cords: { x: number, y: number }[];
  private readonly numOfRows: number;
  private readonly numOfCols: number;
  private readonly startX: number;
  private readonly startY: number;

  private readonly diffX: number;
  private readonly diffY: number;
  private readonly endX: number;
  private readonly endY: number;
  private readonly color: string = "rgb(75,191,151, 0.1)";
  private readonly radius: number = 8;

  constructor(canvas: any, diffX: number, diffY: number) {
    this.ctx = canvas.getContext('2d');
    this.startX = this.startY = this.radius * 10;
    this.numOfRows = Math.ceil((canvas.height - this.startY) / (this.radius + diffY));
    this.numOfCols = Math.ceil((canvas.width - this.startX) / (this.radius + diffX));
    this.diffX = diffX;
    this.diffY = diffY;
    this.endX = canvas.width - this.startX;
    this.endY = canvas.height - this.startY;
    this.calculateCords();
  }

  private calculateCords(): void {
    let cords: { x: number, y: number }[] = [];
    let dx = this.startX;
    let dy = this.startY;
    for (let i = 0; i < this.numOfRows; i++) {
      for (let j = 0; j < this.numOfCols; j++) {
        let cord = {x: dx, y: dy};
        cords.push(cord);
        dx += this.diffX;
      }
      dx = this.startX;
      dy += this.diffY;
    }
    this.cords = cords;
  }

  public render(): void {
    for (let cord of this.cords) {
      this.ctx.beginPath();
      this.ctx.arc(cord.x, cord.y, this.radius, 0, 2 * Math.PI);
      this.ctx.fillStyle = this.color;
      this.ctx.fill();
    }
  }

  public getCords(): { x: number, y: number }[] {
    return this.cords;
  }

  public getNumOfRows(): number {
    return this.numOfRows;
  }

  public getNumOfCols(): number {
    return this.numOfCols;
  }
}
