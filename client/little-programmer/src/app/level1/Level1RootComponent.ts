import SpriteComponent from "./SpriteComponent";
import {ComponentI} from "../engine/ComponentI";
import RoundGridComponentProps from "./RoundGridComponentProps";
import RoundGridComponentAssetsBuilder from "./RoundGridComponentAssetsBuilder";
import SpriteComponentProps from "./SpriteComponentProps";
import {CirclePoint} from "./CirclePoint";
import TargetComponent from "./TargetComponent";
import DraggableLineComponent from "./DraggableLineComponent";

export default class Level1RootComponent implements ComponentI {
  private matrixPoints: CirclePoint[][];
  private targetComponents: TargetComponent[] = [];
  private spriteComponent: SpriteComponent;
  private dragLineComponent: DraggableLineComponent;

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
    this.dragLineComponent = new DraggableLineComponent(this.matrixPoints);
  }

  public render(canvas: any): void {
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this._render(canvas);
    this.dragLineComponent.render(canvas);
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

  public onMouseDown(x: number, y: number): void {
    this.dragLineComponent.onMouseDown(x, y);
  }

  public onMouseMove(x: number, y: number): void {
    this.dragLineComponent.onMouseMove(x, y);
  }

  public onMouseUp(): void {
    this.dragLineComponent.onMouseUp();
  }
}
