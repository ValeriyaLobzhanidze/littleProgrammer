import {MatrixRender} from "./MatrixRender";

export class MatrixArcs implements MatrixRender {
  private ctx: any;
  private cords: { x: number, y: number }[] = [];
  private readonly numOfRows: number;
  private readonly numOfCols: number;
  private readonly startX: number;
  private readonly startY: number;

  private readonly diffX: number;
  private readonly diffY: number;
  private readonly backArcsColor: string = "rgb(75,191,151, 0.1)";
  private readonly targetColor: string = "rgba(159, 146, 255, 0.64)";
  private readonly radius: number = 8;
  private targets: { i: number, j: number }[] = ([
      {i: 1, j: 2},
      {i: 0, j: 4},
      {i: 5, j: 5},
      {i: 2, j: 2},
      {i: 5, j: 0},
      {i: 6, j: 6}
    ]
  );
  private targetCords: { x: number, y: number }[] = [];

  constructor(canvas: any, diffX: number, diffY: number) {
    this.ctx = canvas.getContext('2d');
    let diam = this.radius * 2;
    this.startX = diam * 2;
    this.startY = diam * 2;
    this.diffX = diffX;
    this.diffY = diffY;
    this.numOfRows = Math.ceil((canvas.height - this.startY) / (diam + diffY));
    this.numOfCols = Math.ceil((canvas.width - this.startX) / (diam + diffX)) + 1;
    this.calculateCords();
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
          this.targetCords.push(cord);
        }
        dx += this.diffX;
      }
      dx = this.startX;
      dy += this.diffY;
    }
  }

  private _render(cords: { x: number, y: number }[], color: string): void {
    for (let cord of cords) {
      this.ctx.beginPath();
      this.ctx.arc(cord.x, cord.y, this.radius, 0, 2 * Math.PI);
      this.ctx.fillStyle = color;
      this.ctx.fill();
    }
  }

  public render(): void {
    this._render(this.cords, this.backArcsColor);
    this._render(this.targetCords, this.targetColor);
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

  public getTargetCords(): { x: number, y: number }[] {
    return this.targetCords;
  }
}
