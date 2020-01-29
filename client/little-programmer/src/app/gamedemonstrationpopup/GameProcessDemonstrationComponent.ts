import RoundGridComponent from "../level1/RoundGridComponent";
import {ComponentI} from "../engine/ComponentI";

export default class GameProcessDemonstrationComponent implements ComponentI {
  private roundGrid: RoundGridComponent;
  private typeCanvasHeight = 120;
  private typingText = "MoveRight(5);";

  constructor(gridWidth: number, gridHeight: number) {
    this.roundGrid = new RoundGridComponent(gridWidth, gridHeight, false, null, 0, this.typeCanvasHeight);
  }

  render(canvas: any) {
    this.roundGrid.render(canvas);
  }
}
