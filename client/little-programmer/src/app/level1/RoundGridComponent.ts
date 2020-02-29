import {ComponentI} from "../engine/ComponentI";
import {CirclePoint} from "./CirclePoint";

export default class RoundGridComponent implements ComponentI {
  private readonly matrixPoints: CirclePoint[][];

  constructor(matrixPoints: CirclePoint[][]) {
    this.matrixPoints = matrixPoints;
  }

  public render(canvas: any): void {
    let ctx = canvas.getContext('2d');
    for (let i = 0; i < this.matrixPoints.length; i++) {
      for (let j = 0; j < this.matrixPoints[0].length; j++) {
        ctx.beginPath();
        let point = this.matrixPoints[i][j];
        ctx.arc(point.x, point.y, point.radius, 0, 2 * Math.PI);
        ctx.fillStyle = point.color;
        ctx.fill();
      }
    }
  }

  public getCords(): CirclePoint[][] {
    return this.matrixPoints;
  }
}
