import SpriteComponent from "./SpriteComponent";
import {ComponentI} from "../engine/ComponentI";
import CanvasLib from "../lib/CanvasLib";
import Global from "../global/Global";
import Point from "./Point";
import RoundGridComponentProps from "./RoundGridComponentProps";
import RoundGridComponentAssetsBuilder from "./RoundGridComponentAssetsBuilder";
import SpriteComponentProps from "./SpriteComponentProps";
import {CirclePoint} from "./CirclePoint";
import TargetComponent from "./TargetComponent";

export default class RoundGridComponent implements ComponentI {
  private matrixPoints: CirclePoint[][];
  private targetComponents: TargetComponent[] = [];
  private spriteComponent: SpriteComponent;

  constructor() {
  }

  init(props: RoundGridComponentProps) {
    let assets = new RoundGridComponentAssetsBuilder().build(props);
    this.matrixPoints = assets.matrixPoints;

    let spriteProps = new SpriteComponentProps();
    spriteProps.sharedService = props.sharedService;
    spriteProps.matrixCords = this.matrixPoints;
    spriteProps.route = assets.defaultRoute;
    this.spriteComponent = new SpriteComponent(spriteProps);

    for (let target of assets.targetPoints) {
      this.targetComponents.push(new TargetComponent(target));
    }
  }

  public render(canvas: any): void {
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this._render(canvas);
    // if (this.startDragRoundCords && this.dragAmountOfSteps) {
    //   this.renderRectLine(canvas);
    // }
    let spritePoint = this.spriteComponent.getCurPoint();
    for (let target of this.targetComponents) {
      target.activateIfTarget(spritePoint);
      target.render(canvas);
    }
    this.spriteComponent.render(canvas);

  }

  private _render(canvas: any): void {
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

  public unsubscribeFromGettingCodeLines() {
    this.spriteComponent.unsubscribeFromGettingCodeLines();
  }

  public subscribeForGettingCodeLines() {
    this.spriteComponent.subscribeForGettingCodeLines();
  }

  public getCords(): CirclePoint[][] {
    return this.matrixPoints;
  }

  public getAmountOfTargets(): number {
    return this.targetComponents.length;
  }

  // private renderRectLine(canvas: any) {
  //   let width;
  //   let height;
  //
  //   let stepX = 0;
  //   let stepY = 0;
  //
  //   let shiftX = 0;
  //   let shiftY = 0;
  //
  //   let shiftTextY = 0;
  //   let shiftTextX = 0;
  //
  //   let reverseShiftX = 0;
  //   let reverseShiftY = 0;
  //
  //   if (this.horizontalDrag) {
  //     width = this.roundRadius / 2;
  //     height = this.roundRadius / 3;
  //     stepX = this.roundRadius + this.roundRadius / 4;
  //     shiftX = this.roundRadius / 4;
  //     shiftTextY = 4;
  //     if (this.dragAmountOfSteps < 0) {
  //       reverseShiftX = this.roundRadius / 2;
  //     }
  //   } else {
  //     width = this.roundRadius / 3;
  //     height = this.roundRadius / 2;
  //     stepY = this.roundRadius + this.roundRadius / 4;
  //     shiftY = this.roundRadius / 4;
  //     shiftTextX = 6;
  //     shiftTextY = -5;
  //     if (this.dragAmountOfSteps < 0) {
  //       reverseShiftY = this.roundRadius / 2;
  //     }
  //   }
  //   let curX = this.startDragRoundCords.x;
  //   let curY = this.startDragRoundCords.y - 2;
  //
  //   if (this.dragAmountOfSteps < 0) {
  //     stepX *= -1;
  //     stepY *= -1;
  //   }
  //
  //   for (let i = 0; i < Math.abs(this.dragAmountOfSteps); i++) {
  //     CanvasLib.roundStrokeRect(canvas, curX - shiftX, curY - shiftY, width, height, 2, Global.DEEP_PURPLE, Global.LIGHT_PURPLE);
  //     CanvasLib.roundStrokeRect(canvas, curX + stepX - reverseShiftX, curY + stepY - reverseShiftY, width, height, 2, Global.DEEP_PURPLE, Global.LIGHT_PURPLE);
  //     CanvasLib.text(canvas, String(i + 1), curX + stepX + shiftTextX, curY + stepY - shiftTextY, 10, Global.MAIN_FONT, Global.DEEP_PURPLE);
  //
  //     if (this.horizontalDrag) {
  //       let diff = this.roundRadius * 1.5 + this.roundRadius / 4;
  //       if (this.dragAmountOfSteps < 0) {
  //         diff *= -1;
  //       }
  //       curX += diff + stepX;
  //     } else {
  //       let diff = this.roundRadius * 1.5 + this.roundRadius / 4;
  //       if (this.dragAmountOfSteps < 0) {
  //         diff *= -1;
  //       }
  //       curY += diff + stepY;
  //     }
  //   }
  //   CanvasLib.roundStrokeRect(canvas, curX - shiftX, curY - shiftY, width, height, 2, Global.DEEP_PURPLE, Global.LIGHT_PURPLE);
  // }

  // private startPointIdentityCheck(x: number, y: number): boolean {
  //   if (this.startDragRoundCords) {
  //     return x == this.startDragRoundCords.x && y == this.startDragRoundCords.y
  //   } else {
  //     return false;
  //   }
  // }
  //
  // private findClosestRound(x: number, y: number): Point {
  //   for (let round of this.roundCords) {
  //     if (this.isPointInsideRound(round.x, round.y, x, y) && !this.startPointIdentityCheck(round.x, round.y)) {
  //       return new Point(round.x, round.y);
  //     }
  //   }
  //   return null;
  // }
  //
  // private calculateDistanceInSteps(value: number): number {
  //   return value / (this.roundRadius * 3);
  // }
  //
  // public onMouseDown(x: number, y: number): void {
  //   this.startDragRoundCords = this.findClosestRound(x, y);
  // }
  //
  // public onMouseMove(x: number, y: number): void {
  //   if (this.startDragRoundCords) {
  //     let closestRoundCords = this.findClosestRound(x, y);
  //     if (closestRoundCords) {
  //       if (closestRoundCords.x == this.startDragRoundCords.x) {
  //         let distance = closestRoundCords.y - this.startDragRoundCords.y;
  //         this.dragAmountOfSteps = this.calculateDistanceInSteps(distance);
  //         this.horizontalDrag = false;
  //
  //       } else if (closestRoundCords.y == this.startDragRoundCords.y) {
  //         let distance = closestRoundCords.x - this.startDragRoundCords.x;
  //         this.dragAmountOfSteps = this.calculateDistanceInSteps(distance);
  //         this.horizontalDrag = true;
  //       }
  //     }
  //   }
  // }
  //
  // public onMouseUp(): void {
  //   this.startDragRoundCords = null;
  //   this.dragAmountOfSteps = null;
  // }
}
