import Level1RootComponent from "../level1/Level1RootComponent";
import {ComponentI} from "../engine/ComponentI";
import MousePointerComponent from "../mousepointer/MousePointerComponent";
import TextComponent from "./TextComponent";
import ButtonComponent from "./ButtonComponent";
import {SharedService} from "../SharedService";
import {DirectMoveFunction} from "../level1/DirectMoveFunction";
import Level1RootComponentProps from "../level1/Level1RootComponentProps";
import GameProcessDemonstrationProps from "./GameProcessDemonstrationProps";

export default class GameProcessDemonstrationComponent implements ComponentI {
  private level1Component: Level1RootComponent;
  private canvasStartY: number = 120;

  private buttonWidth: number;
  private buttonHeight: number;
  private buttonText: string;

  private mouseComponent: MousePointerComponent;
  private textComponent: TextComponent;
  private buttonComponent: ButtonComponent;

  private isMouseActivated = false;
  private isButtonActivated = false;
  private isButtonStopWorked = false;

  public sharedService: SharedService;

  constructor() {
  }

  public init(props: GameProcessDemonstrationProps) {
    this.sharedService = props.sharedService;
    this.level1Component = new Level1RootComponent();
    let level1ComponentProps = new Level1RootComponentProps();
    level1ComponentProps.sharedService = props.sharedService;
    level1ComponentProps.canvasWidth = props.canvasWidth;
    level1ComponentProps.canvasHeight = props.canvasHeight;
    level1ComponentProps.canvasTop = this.canvasStartY;
    level1ComponentProps.isDefaultRoute = false;
    level1ComponentProps.isDefaultTarget = true;
    level1ComponentProps.isPopUpUsed = true;
    level1ComponentProps.isPopUpUsed = false;

    this.level1Component.init(level1ComponentProps);
    this.textComponent = new TextComponent(0, 15, props.textList);
    this.buttonComponent = new ButtonComponent(140, 60, "Execute!", 115, 40);
    this.mouseComponent = new MousePointerComponent(
      [DirectMoveFunction.MOVE_DOWN, DirectMoveFunction.MOVE_LEFT],
      [{x: 350, y: 5}, {x: 350, y: 85}, {x: 140 + 115 / 2, y: 85}]);
  }

  render(canvas: any) {
    this.level1Component.render(canvas);
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
