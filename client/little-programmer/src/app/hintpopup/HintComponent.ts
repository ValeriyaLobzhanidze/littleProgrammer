import {ComponentI} from "../engine/ComponentI";
import Level1RootComponent from "../level1/Level1RootComponent";
import Level1RootComponentProps from "../level1/Level1RootComponentProps";
import MousePointerComponent from "../mousepointer/MousePointerComponent";
import {DirectMoveFunction} from "../level1/DirectMoveFunction";
import Point from "../level1/Point";
import StateEntry from "../statemachine/StateEntry";

export default class HintComponent implements ComponentI {
  private roundGridComponent: Level1RootComponent;
  private mousePointer: MousePointerComponent;

  private curMouseState: DirectMoveFunction;
  private mouseCords: Point[];
  private mouseCordsIdx: number = 0;

  constructor() {

  }

  init(props: any) {
    this.roundGridComponent = new Level1RootComponent();
    let level1Props = new Level1RootComponentProps();
    level1Props.canvasWidth = props.width;
    level1Props.canvasHeight = props.height;
    level1Props.isDefaultRoute = false;
    level1Props.isDefaultTarget = true;
    level1Props.isPopUpUsed = false;

    this.roundGridComponent.init(level1Props);
    let cords = this.roundGridComponent.getCords();
    let cols = cords[0].length;
    let rows = cords.length;

    let firstPoint = new Point(cords[1][0].x, cords[1][0].y);
    let secondPoint = new Point(cords[1][cols - 1].x, cords[1][cols - 1].y);
    let thirdPoint = new Point(cords[rows - 1][cols - 1].x, cords[rows - 1][cols - 1].y);
    let forthPoint = new Point(cords[rows - 1][0].x, cords[rows - 1][0].y);

    this.mouseCords = [firstPoint, secondPoint, thirdPoint, forthPoint, firstPoint];

    let stateArr: StateEntry<Point>[] = [];
    stateArr.push(new StateEntry<Point>(DirectMoveFunction.MOVE_RIGHT, secondPoint));
    stateArr.push(new StateEntry<Point>(DirectMoveFunction.MOVE_DOWN, thirdPoint));
    stateArr.push(new StateEntry<Point>(DirectMoveFunction.MOVE_LEFT, forthPoint));
    stateArr.push(new StateEntry<Point>(DirectMoveFunction.MOVE_UP, firstPoint));

    this.mousePointer = new MousePointerComponent(firstPoint, stateArr);

    this.mousePointer.activate();
    this.roundGridComponent.onMouseDown(this.mouseCords[this.mouseCordsIdx].x, this.mouseCords[this.mouseCordsIdx].y);
    this.mouseCordsIdx++;
    this.curMouseState = this.mousePointer.getState();
  }

  private update(): void {
    let curMouseState = this.mousePointer.getState();
    if (curMouseState != this.curMouseState && this.mouseCordsIdx < this.mouseCords.length) {
      this.roundGridComponent.onMouseUp();
      this.roundGridComponent.onMouseDown(this.mouseCords[this.mouseCordsIdx].x, this.mouseCords[this.mouseCordsIdx].y);
      this.mouseCordsIdx++;
      this.curMouseState = curMouseState;
    }
  }

  render(canvas: any) {
    this.update();
    this.roundGridComponent.render(canvas);
    this.mousePointer.render(canvas);
    if (this.mousePointer.isActive()) {
      this.roundGridComponent.onMouseMove(this.mousePointer.getCurPoint().x, this.mousePointer.getCurPoint().y);
    } else {
      this.roundGridComponent.onMouseUp();
    }
  }

}
