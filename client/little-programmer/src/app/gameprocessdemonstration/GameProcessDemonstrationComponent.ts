import Level1RootComponent from "../level1/Level1RootComponent";
import {ComponentI} from "../engine/ComponentI";
import MousePointerComponent from "../mousepointer/MousePointerComponent";
import InputTextComponent from "./inputtextcomponent/InputTextComponent";
import ButtonComponent from "./buttoncomponent/ButtonComponent";
import {SharedService} from "../SharedService";
import {DirectMoveFunction} from "../level1/DirectMoveFunction";
import Level1RootComponentProps from "../level1/Level1RootComponentProps";
import GameProcessDemonstrationProps from "./GameProcessDemonstrationProps";
import InputTextComponentProps from "./inputtextcomponent/InputTextComponentProps";
import StateEntry from "../statemachine/StateEntry";
import Point from "../level1/Point";

export default class GameProcessDemonstrationComponent implements ComponentI {
  private static readonly CANVAS_TOP: number = 150;
  private level1Component: Level1RootComponent;

  private mouseComponent: MousePointerComponent;
  private textComponent: InputTextComponent;
  private buttonComponent: ButtonComponent;

  public sharedService: SharedService;
  private isCodeLinesSet: boolean = false;

  constructor() {
  }

  public init(props: GameProcessDemonstrationProps) {
    this.sharedService = props.sharedService;
    this.level1Component = new Level1RootComponent();

    let level1ComponentProps = new Level1RootComponentProps();
    level1ComponentProps.sharedService = props.sharedService;
    level1ComponentProps.canvasWidth = props.canvasWidth;
    level1ComponentProps.canvasHeight = props.canvasHeight;
    level1ComponentProps.canvasTop = GameProcessDemonstrationComponent.CANVAS_TOP;
    level1ComponentProps.isDefaultRoute = false;
    level1ComponentProps.isDefaultTarget = true;
    level1ComponentProps.isPopUpUsed = true;
    level1ComponentProps.isPopUpUsed = false;
    this.level1Component.init(level1ComponentProps);

    let fontSize = 25;
    let inputX = (props.canvasWidth - props.inputWidth) / 2;
    let inputY = ((GameProcessDemonstrationComponent.CANVAS_TOP / 2) - props.inputHeight) / 2;
    let inputProps = new InputTextComponentProps();
    inputProps.x = inputX;
    inputProps.y = inputY;
    inputProps.width = props.inputWidth;
    inputProps.height = props.inputHeight;
    inputProps.inputs = props.inputs;
    inputProps.fontSize = fontSize;
    inputProps.isReverseNeeded = false;
    inputProps.isSyntaxHighlightingNeeded = false;
    inputProps.isFreezingNeeded = false;
    inputProps.isDelayedNeeded = false;
    this.textComponent = new InputTextComponent(inputProps);

    let buttonX = (props.canvasWidth - props.buttonWidth) / 2;
    let buttonY = (GameProcessDemonstrationComponent.CANVAS_TOP / 2) + ((GameProcessDemonstrationComponent.CANVAS_TOP / 2) - props.buttonHeight) / 2;

    this.buttonComponent = new ButtonComponent(buttonX, buttonY, props.buttonText, props.buttonWidth, props.buttonHeight, fontSize);

    let mouseStart = inputX + props.inputWidth + inputX / 2;
    this.mouseComponent = new MousePointerComponent(new Point(mouseStart, inputY),
      [new StateEntry<Point>(DirectMoveFunction.MOVE_DOWN, new Point(mouseStart, buttonY)),
        new StateEntry<Point>(DirectMoveFunction.MOVE_LEFT, new Point(inputX + props.inputWidth / 2, buttonY))]);
  }

  render(canvas: any) {
    this.level1Component.render(canvas);
    this.textComponent.render(canvas);
    this.buttonComponent.render(canvas);
    this.mouseComponent.render(canvas);

    if (!this.textComponent.wasActivated()) {
      this.textComponent.activate();
    }

    if (this.textComponent.isTypingFinished() && !this.mouseComponent.wasActivated()) {
      this.mouseComponent.activate();
    }

    if (this.mouseComponent.wasActivated() && !this.mouseComponent.isActive() && !this.buttonComponent.wasActivated()) {
      this.buttonComponent.activate();
    }

    if (this.buttonComponent.wasActivated() && !this.buttonComponent.isActive() && !this.isCodeLinesSet) {
      this.isCodeLinesSet = true;
      this.sharedService.setCodeLineData([{direction: DirectMoveFunction.MOVE_RIGHT, val: 5}]);
    }
  }
}
