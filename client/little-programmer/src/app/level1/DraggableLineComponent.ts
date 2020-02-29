import Point from "./Point";
import CanvasLib from "../lib/CanvasLib";
import Global from "../global/Global";
import {CirclePoint} from "./CirclePoint";
import {ComponentI} from "../engine/ComponentI";

export default class DraggableLineComponent implements ComponentI {
  private startDragCircle: Point;
  private stopDragCircle: Point;

  private readonly matrixPoints: CirclePoint[][];
  private readonly lineWidth: number;
  private readonly lineHeight: number;
  private readonly middleLineStart: number;

  constructor(matrixPoints: CirclePoint[][]) {
    this.matrixPoints = matrixPoints;
    let matrixCircleRadius = this.matrixPoints[0][0].radius;
    this.lineWidth = matrixCircleRadius / 2;
    this.lineHeight = matrixCircleRadius / 3;

    let pointDist = (this.matrixPoints[0][1].x - this.matrixPoints[0][0].x) - matrixCircleRadius * 2;
    this.middleLineStart = matrixCircleRadius + (pointDist - this.lineWidth) / 2;
  }

  private _render(canvas: any, mainLineX: number, mainLineY: number, middleLineX: number, middleLineY: number,
                  text: string, textX: number, textY: number, last: boolean, isHorizontal: boolean) {
    let width = this.lineWidth;
    let height = this.lineHeight;
    if(!isHorizontal){
      width = this.lineHeight;
      height = this.lineWidth;
    }
    if (!last) {
      CanvasLib.roundStrokeRect(canvas, mainLineX, mainLineY, width, height, 2,
        Global.DEEP_PURPLE, Global.LIGHT_PURPLE);

      CanvasLib.roundStrokeRect(canvas, middleLineX, middleLineY, width, height, 2,
        Global.DEEP_PURPLE, Global.LIGHT_PURPLE);

      CanvasLib.text(canvas, text, textX, textY, 10, Global.MAIN_FONT, Global.DEEP_PURPLE);
    } else {
      CanvasLib.roundStrokeRect(canvas, mainLineX, mainLineY, width, height, 2,
        Global.DEEP_PURPLE, Global.LIGHT_PURPLE);
    }
  }

  private horizontalRender(canvas: any, x: number, y: number, stepNo: number, revers: boolean, last: boolean) {
    let shiftX = this.lineWidth / 2;
    let mainLineX = x - shiftX;
    let mainLineY = y;

    let middleLineX = x + this.middleLineStart;
    if (revers) {
      middleLineX = x - this.middleLineStart - this.lineWidth;
    }
    let middleLineY = y;

    let textShiftY = 3;
    let text = String(stepNo);
    let textX = middleLineX + this.lineWidth / 2;
    let textY = y - textShiftY;
    this._render(canvas, mainLineX, mainLineY, middleLineX, middleLineY, text, textX, textY, last, true);
  }

  private verticalRender(canvas: any, x: number, y: number, stepNo: number, revers: boolean, last: boolean) {
    let shiftY = this.lineWidth / 2;
    let mainLineX = x;
    let mainLineY = y - shiftY;

    let middleLineX = x;
    let middleLineY = y + this.middleLineStart;
    if (revers) {
      middleLineY = y - this.middleLineStart - this.lineWidth;
    }

    let text = String(stepNo);
    let textShiftX = 6;
    let textX = x + textShiftX;
    let textY = middleLineY + this.lineWidth / 2;
    this._render(canvas, mainLineX, mainLineY, middleLineX, middleLineY, text, textX, textY, last, false);
  }

  private renderHorizontalLine(canvas: any) {
    let step = 0;
    let j;
    if (this.startDragCircle.y < this.stopDragCircle.y) {
      for (j = this.startDragCircle.y; j <= this.stopDragCircle.y; j++) {
        let last = j === this.stopDragCircle.y;
        let point = this.matrixPoints[this.startDragCircle.x][j];
        this.horizontalRender(canvas, point.x, point.y, step + 1, false, last);
        step++;
      }
    } else {
      for (j = this.startDragCircle.y; j >= this.stopDragCircle.y; j--) {
        let last = j === this.stopDragCircle.y;
        let point = this.matrixPoints[this.startDragCircle.x][j];
        this.horizontalRender(canvas, point.x, point.y, step + 1, true, last);
        step++;
      }
    }
  }

  private renderVerticalLine(canvas: any) {
    let step = 0;
    if (this.startDragCircle.x < this.stopDragCircle.x) {
      for (let i = this.startDragCircle.x; i <= this.stopDragCircle.x; i++) {
        let last = i === this.stopDragCircle.x;
        let point = this.matrixPoints[i][this.startDragCircle.y];
        this.verticalRender(canvas, point.x, point.y, step + 1, false, last);
        step++;
      }
    } else {
      for (let i = this.startDragCircle.x; i >= this.stopDragCircle.x; i--) {
        let last = i === this.stopDragCircle.x;
        let point = this.matrixPoints[i][this.startDragCircle.y];
        this.verticalRender(canvas, point.x, point.y, step + 1, true, last);
        step++;
      }
    }
  }

  public render(canvas: any) {
    if (!this.startDragCircle || !this.stopDragCircle)
      return;

    if (this.startDragCircle.x === this.stopDragCircle.x) {
      this.renderHorizontalLine(canvas);
    } else if (this.startDragCircle.y === this.stopDragCircle.y) {
      this.renderVerticalLine(canvas);
    }
  }

  private isStartPoint(point: Point): boolean {
    if (this.startDragCircle) {
      return point.x == this.startDragCircle.x && point.y == this.startDragCircle.y
    } else {
      return false;
    }
  }

  private findClosestRound(x: number, y: number): Point {
    for (let i = 0; i < this.matrixPoints.length; i++) {
      for (let j = 0; j < this.matrixPoints[0].length; j++) {
        if (this.matrixPoints[i][j].isPointInsideRound(new Point(x, y)) && !this.isStartPoint(this.matrixPoints[i][j])) {
          return new Point(i, j)
        }
      }
    }
    return null;
  }

  private setStopDragCircle(point: Point): void {
    let foundedPoint = null;
    for (let j = 0; j < this.matrixPoints[0].length; j++) {
      if (j !== this.startDragCircle.y) {
        if (this.matrixPoints[this.startDragCircle.x][j].isPointInsideRound(point)) {
          foundedPoint = new Point(this.startDragCircle.x, j);
        }
      }
    }
    if (!foundedPoint) {
      for (let i = 0; i < this.matrixPoints.length; i++) {
        if (i !== this.startDragCircle.x) {
          if (this.matrixPoints[i][this.startDragCircle.y].isPointInsideRound(point)) {
            foundedPoint = new Point(i, this.startDragCircle.y);
          }
        }
      }
    }
    if (foundedPoint) {
      this.stopDragCircle = foundedPoint;
    }
  }

  public onMouseDown(x: number, y: number): void {
    this.startDragCircle = this.findClosestRound(x, y);
  }

  public onMouseMove(x: number, y: number): void {
    if (this.startDragCircle) {
      this.setStopDragCircle(new Point(x, y));
    }
  }

  public onMouseUp(): void {
    this.startDragCircle = null;
    this.stopDragCircle = null;
  }
}
