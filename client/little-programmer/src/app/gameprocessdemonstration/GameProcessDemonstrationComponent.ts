import RoundGridComponent from "../level1/RoundGridComponent";
import {ComponentI} from "../engine/ComponentI";
import MousePointerComponent from "../mousepointer/MousePointerComponent";
import TextComponent from "./TextComponent";
import ButtonComponent from "./ButtonComponent";
import {SharedService} from "../SharedService";
import {DirectMoveFunction} from "../level1/DirectMoveFunction";
import RoundGridComponentProps from "../level1/RoundGridComponentProps";

export default class GameProcessDemonstrationComponent implements ComponentI {
  private roundGrid: RoundGridComponent;
  private typeCanvasHeight = 120;

  private mouseComponent: MousePointerComponent;
  private textComponent: TextComponent;
  private buttonComponent: ButtonComponent;

  private isMouseActivated = false;
  private isButtonActivated = false;
  private isButtonStopWorked = false;
  public sharedService: SharedService;

  constructor() {

  }

  init(props: any) {
    this.sharedService = props.sharedService;
    this.roundGrid = new RoundGridComponent();
    let roundGridProps = new RoundGridComponentProps();

    roundGridProps.sharedService = this.sharedService;
    roundGridProps.canvasWidth = props.gridWidth;
    roundGridProps.canvasHeight = props.gridHeight;
    roundGridProps.isDefaultRoute = false;
    roundGridProps.isDefaultTarget = false;
    roundGridProps.isPopUpUsed = true;
    roundGridProps.canvasTop = this.typeCanvasHeight;
    roundGridProps.isPopUpUsed = props.isPopUpUsed;

    this.roundGrid.init(roundGridProps);
    this.textComponent = new TextComponent(100, 5, props.textArr, 30);
    this.buttonComponent = new ButtonComponent(140, 60, "Execute!", 115, 40);
    this.mouseComponent = new MousePointerComponent(
      [DirectMoveFunction.MOVE_DOWN, DirectMoveFunction.MOVE_LEFT],
      [{x: 350, y: 5}, {x: 350, y: 85}, {x: 140 + 115 / 2, y: 85}]);
  }

  render(canvas: any) {
    this.roundGrid.render(canvas);
    if (!this.textComponent.wasActivated()) {
      this.textComponent.activate();
    }
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

    if (this.isButtonActivated) {
      if (!this.buttonComponent.isSelected() && !this.isButtonStopWorked) {
        this.sharedService.setCodeLineData([{direction: DirectMoveFunction.MOVE_RIGHT, val: 5}]);
        this.isButtonStopWorked = true;
      }
    }
  }
}
