import RoundGridComponentProps from "./RoundGridComponentProps";
import Point from "./Point";
import DirectionValue from "./DirectionValue";
import {DirectMoveFunction} from "./DirectMoveFunction";
import RoundGridComponentAssets from "./RoundGridComponentAssets";

export default class RoundGridComponentAssetsBuilder {
  private numOfRows: number;
  private numOfCols: number;

  public build(props: RoundGridComponentProps): RoundGridComponentAssets {
    let roundCords = this.buildRoundCords(props);
    let targetRoundCords;
    if (props.isDefaultTarget) {
      targetRoundCords = this.buildTargets(props, roundCords);
    }
    let defaultRoute;
    if (props.isDefaultRoute) {
      defaultRoute = this.buildDefaultRoute(props);
    }
    let assets = new RoundGridComponentAssets();
    assets.roundCords = roundCords;
    assets.targetCords = targetRoundCords;
    assets.defaultRoute = defaultRoute;
    return assets;
  }

  private buildDefaultRoute(props: RoundGridComponentProps): DirectionValue[] {
    let top = props.topTargetRect;
    let left = props.leftTargetRect;

    let height = this.numOfCols - top;
    let width = this.numOfRows - left;

    return ([new DirectionValue(DirectMoveFunction.MOVE_RIGHT, left),
      new DirectionValue(DirectMoveFunction.MOVE_DOWN, top + height - 1),
      new DirectionValue(DirectMoveFunction.MOVE_RIGHT, width - 1),
      new DirectionValue(DirectMoveFunction.MOVE_UP, height - 1),
      new DirectionValue(DirectMoveFunction.MOVE_LEFT, width)]);
  }

  private buildRoundCords(props: RoundGridComponentProps): Point[][] {
    let diam = props.radius * 2;
    let startX = diam;
    let startY = diam;

    let diffX = diam + props.radius;
    let diffY = diam + props.radius;

    this.numOfRows = Math.floor(((props.canvasHeight - props.canvasTop) - diam) / (diam * 1.5));
    this.numOfCols = Math.floor(((props.canvasWidth - props.canvasLeft) - diam) / (diam * 1.5));

    let dx = props.canvasLeft + startX;
    let dy = props.canvasTop + startY;
    let cords: Point[][] = [];
    for (let i = 0; i < this.numOfRows; i++) {
      cords.push([]);
      for (let j = 0; j < this.numOfCols; j++) {
        cords[i].push(new Point(dx, dy));
        dx += diffX;
      }
      dx = props.canvasLeft + startX;
      dy += diffY;
    }
    return cords;
  }

  private buildTargets(props: RoundGridComponentProps, matrix: Point[][]): Point[] {
    let top = props.topTargetRect;
    let left = props.leftTargetRect;

    let height = this.numOfCols - top;
    let width = this.numOfRows - left;

    let cords = [];
    if ((top < this.numOfRows && top >= 0) && (left < this.numOfCols && left >= 0)) {
      for (let i = top; i < top + height; i++) {
        for (let j = left; j < left + width; j++) {
          cords.push(matrix[i][j]);
          if (i != top && i != top + height - 1) {
            cords.push(matrix[i][left + width - 1]);
            break;
          }
        }
      }
    } else {
      return null;
    }
    return cords;
  }
}