import {ComponentI} from "../engine/ComponentI";
import RoundGridComponent from "../level1/RoundGridComponent";
import MousePointerComponent from "../mousepointer/MousePointerComponent";
import {DirectMoveFunction} from "../level1/DirectMoveFunction";

export default class HintComponent implements ComponentI {
  private roundGridComponent;
  private mousePointer;

  private curMouseState;
  private readonly mouseCords;
  private mouseCordsIdx = 0;

  constructor(gridWidth: number, gridHeight) {
    this.roundGridComponent = new RoundGridComponent(gridWidth, gridHeight, false, null,
      0, 0, false, false);
    let cords = this.roundGridComponent.getCords();
    let cols = this.roundGridComponent.getAmountOfCols();
    let rows = this.roundGridComponent.getAmountOfRows();
    let firstPoint = cords[cols * 2];
    let secondPoint = cords[cols * 2 + cols - 1];
    let thirdPoint = cords[cols * rows - 1];
    let forthPoint = cords[cols * rows - 1 - (cols - 1)];
    this.mouseCords = [firstPoint, secondPoint, thirdPoint, forthPoint, firstPoint];
    this.mousePointer = new MousePointerComponent(
      [DirectMoveFunction.MOVE_RIGHT, DirectMoveFunction.MOVE_DOWN, DirectMoveFunction.MOVE_LEFT, DirectMoveFunction.MOVE_UP],
      this.mouseCords);
    this.mousePointer.activate();
    this.roundGridComponent.onMouseDown(this.mouseCords[this.mouseCordsIdx++]);
    this.curMouseState = this.mousePointer.getState();
  }

  private update(): void {
    let curMouseState = this.mousePointer.getState();
    if (curMouseState != this.curMouseState && this.mouseCordsIdx < this.mouseCords.length) {
      this.roundGridComponent.onMouseDown(this.mouseCords[this.mouseCordsIdx].x, this.mouseCords[this.mouseCordsIdx].y);
      this.mouseCordsIdx++;
      this.curMouseState = curMouseState;
    }
  }

  render(canvas: any) {
    this.update();
    this.roundGridComponent.render(canvas);
    this.mousePointer.render(canvas);
    this.roundGridComponent.onMouseMove(this.mousePointer.getCords().x, this.mousePointer.getCords().y);
  }

}
