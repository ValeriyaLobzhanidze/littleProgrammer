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

  constructor(matrixPoints: CirclePoint[][]) {
    this.matrixPoints = matrixPoints;
    let matrixCircleRadius = this.matrixPoints[0][0].radius;
    this.lineWidth = matrixCircleRadius / 2;
    this.lineHeight = matrixCircleRadius / 3;
  }

  private renderHorizontalLine(canvas: any) {

  }

  private renderVerticalLine(canvas: any) {

  }

  public render(canvas: any) {
    // let width;
    // let height;
    //
    // let stepX = 0;
    // let stepY = 0;
    //
    // let shiftX = 0;
    // let shiftY = 0;
    //
    // let shiftTextY = 0;
    // let shiftTextX = 0;
    //
    // let reverseShiftX = 0;
    // let reverseShiftY = 0;
    //
    // if (this.horizontalDrag) {
    //   width = this.lineWidth;
    //   height = this.lineHeight;
    //
    //   stepX = this.roundRadius + this.roundRadius / 4;
    //   shiftX = this.lineWidth / 2;
    //   shiftTextY = 4;
    //   if (this.dragAmountOfSteps < 0) {
    //     reverseShiftX = this.roundRadius / 2;
    //   }
    // } else {
    //   width = this.roundRadius / 3;
    //   height = this.roundRadius / 2;
    //   stepY = this.roundRadius + this.roundRadius / 4;
    //   shiftY = this.roundRadius / 4;
    //   shiftTextX = 6;
    //   shiftTextY = -5;
    //   if (this.dragAmountOfSteps < 0) {
    //     reverseShiftY = this.roundRadius / 2;
    //   }
    // }
    // let curX = this.startDragCircle.x;
    // let curY = this.startDragCircle.y - 2;
    //
    // if (this.dragAmountOfSteps < 0) {
    //   stepX *= -1;
    //   stepY *= -1;
    // }
    //
    // for (let i = 0; i < Math.abs(this.dragAmountOfSteps); i++) {
    //   CanvasLib.roundStrokeRect(canvas, curX - shiftX, curY - shiftY, width, height, 2, Global.DEEP_PURPLE, Global.LIGHT_PURPLE);
    //   CanvasLib.roundStrokeRect(canvas, curX + stepX - reverseShiftX, curY + stepY - reverseShiftY, width, height, 2, Global.DEEP_PURPLE, Global.LIGHT_PURPLE);
    //   CanvasLib.text(canvas, String(i + 1), curX + stepX + shiftTextX, curY + stepY - shiftTextY, 10, Global.MAIN_FONT, Global.DEEP_PURPLE);
    //
    //   if (this.horizontalDrag) {
    //     let diff = this.roundRadius * 1.5 + this.roundRadius / 4;
    //     if (this.dragAmountOfSteps < 0) {
    //       diff *= -1;
    //     }
    //     curX += diff + stepX;
    //   } else {
    //     let diff = this.roundRadius * 1.5 + this.roundRadius / 4;
    //     if (this.dragAmountOfSteps < 0) {
    //       diff *= -1;
    //     }
    //     curY += diff + stepY;
    //   }
    // }
    // CanvasLib.roundStrokeRect(canvas, curX - shiftX, curY - shiftY, width, height, 2, Global.DEEP_PURPLE, Global.LIGHT_PURPLE);
  }

  private startPointIdentityCheck(point: Point): boolean {
    if (this.startDragCircle) {
      return point.x == this.startDragCircle.x && point.y == this.startDragCircle.y
    } else {
      return false;
    }
  }

  private findClosestRound(x: number, y: number): Point {
    for (let i = 0; i < this.matrixPoints.length; i++) {
      for (let j = 0; j < this.matrixPoints[0].length; j++) {
        if (this.matrixPoints[i][j].isPointInsideRound(new Point(x, y)) && this.startPointIdentityCheck(this.matrixPoints[i][j])) {
          return new Point(i, j)
        }
      }
    }
    return null;
  }

  private setStopDragCircle(point: Point): void {
    for (let j = 0; j < this.matrixPoints[0].length; j++) {
      if (j !== this.startDragCircle.y) {
        if (this.matrixPoints[this.startDragCircle.x][j].y === point.y) {
          this.stopDragCircle = new Point(this.startDragCircle.x, j);
        }
      }
    }
    if (!this.stopDragCircle) {
      for (let i = 0; i < this.matrixPoints.length; i++) {
        if (i !== this.startDragCircle.x) {
          if (this.matrixPoints[i][this.startDragCircle.y].x === point.x) {
            this.stopDragCircle = new Point(i, this.startDragCircle.y);
          }
        }
      }
    }
  }

  // private calculateDistanceInSteps(distance: number): number {
  //   return distance / (this.matrixPoints[0][0].radius * 2 + this.diffBetweenCircles);
  // }

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
