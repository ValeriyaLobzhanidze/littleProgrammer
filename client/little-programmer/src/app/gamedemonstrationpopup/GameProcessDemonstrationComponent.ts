import RoundGridComponent from "../level1/RoundGridComponent";
import {ComponentI} from "../engine/ComponentI";
import MousePointerComponent from "./MousePointerComponent";
import TextComponent from "./TextComponent";
import ButtonComponent from "./ButtonComponent";
import {SharedService} from "../SharedService";
import {DirectMoveFunction} from "../level1/DirectMoveFunction";

export default class GameProcessDemonstrationComponent implements ComponentI {
  private roundGrid: RoundGridComponent;
  private typeCanvasHeight = 120;
  private typingText = "MoveRight(5);";

  private mouseComponent: MousePointerComponent;
  private textComponent: TextComponent;
  private buttonComponent: ButtonComponent;

  private isMouseActivated = false;
  private isButtonActivated = false;
  public sharedService: SharedService;

  constructor(gridWidth: number, gridHeight: number, sharedService: SharedService) {
    this.sharedService = sharedService;
    this.roundGrid = new RoundGridComponent(gridWidth, gridHeight, false, this.sharedService, 0,
      this.typeCanvasHeight, false);
    this.textComponent = new TextComponent(5, 5, this.typingText, 30);
    this.buttonComponent = new ButtonComponent(40, 50, "Execute!", 115, 40);
    this.mouseComponent = new MousePointerComponent(250, 5, 75, (15 + 100) / 2);
  }

  render(canvas: any) {
    this.roundGrid.render(canvas);
    this.textComponent.render(canvas);
    this.buttonComponent.render(canvas);
    this.mouseComponent.render(canvas);

    if (this.textComponent.isTypingFinished() && !this.isMouseActivated) {
      this.mouseComponent.activate();
      this.isMouseActivated = true;
    }

    if (this.isMouseActivated && !this.mouseComponent.isActive() && !this.isButtonActivated) {
      this.buttonComponent.makeSelected();
      this.isButtonActivated = true;
    }

    if(this.isButtonActivated){
      if (!this.buttonComponent.isSelected()) {
        this.sharedService.setCodeLineData([{direction: DirectMoveFunction.MOVE_RIGHT, val: 5}]);
      }
    }
  }
}
