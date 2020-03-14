import {ComponentI} from "../../engine/ComponentI";
import CanvasLib from "../../lib/CanvasLib";
import {ButtonState} from "./ButtonState";
import Global from "../../global/Global";

export default class ButtonComponent implements ComponentI {
  private static readonly MARGIN_TEXT_LEFT = 15;
  private static readonly MARGIN_TEXT_TOP = 10;
  private static readonly DEFAULT_FONT = Global.MAIN_FONT;
  private static readonly BORDER_RADIUS = 5;
  private static readonly SELECTED_MAX_TIME = 25;


  private readonly x: number;
  private readonly y: number;
  private readonly text: string;
  private readonly width: number;
  private readonly height: number;
  private readonly fontSize: number;

  private textColor = Global.WHITE;
  private borderColor = Global.GRAY;
  private regularColor = Global.DEEP_GREEN;
  private selectedColor = Global.YELLOW;

  private currentColor = this.regularColor;

  private activated = false;
  private currSelectedTime = 0;

  constructor(x: number = 0, y: number = 0, text: string, width: number, height: number, fontSize: number) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.width = width;
    this.height = height;
    this.fontSize = fontSize;
  }

  public activate() {
    this.currentColor = this.selectedColor;
    this.activated = true;
  }

  public wasActivated(): boolean {
    return this.activated;
  }

  public isActive(): boolean {
    return this.currSelectedTime != ButtonComponent.SELECTED_MAX_TIME;
  }

  private renderButton(canvas: any) {
    CanvasLib.roundStrokeRect(canvas, this.x, this.y, this.width, this.height, ButtonComponent.BORDER_RADIUS,
      this.borderColor, this.currentColor);
  }

  private renderText(canvas: any) {
    CanvasLib.text(canvas, this.text, this.x + ButtonComponent.MARGIN_TEXT_LEFT, this.y + ButtonComponent.MARGIN_TEXT_TOP + this.fontSize, this.fontSize,
      ButtonComponent.DEFAULT_FONT, this.textColor);
  }

  private update() {
    if (this.isActive()) {
      this.currSelectedTime++;
    } else {
      this.currentColor = this.regularColor;
    }
  }


  render(canvas: any) {
    this.renderButton(canvas);
    this.renderText(canvas);
    if (this.activated) {
      this.update();
    }
  }
}
