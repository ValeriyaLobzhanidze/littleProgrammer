import {ComponentI} from "../../engine/ComponentI";
import CanvasLib from "../../lib/CanvasLib";
import {ButtonState} from "./ButtonState";
import Global from "../../global/Global";

export default class ButtonComponent implements ComponentI {
  private static readonly MARGIN_TEXT_LEFT = 15;
  private static readonly MARGIN_TEXT_TOP = 10;
  private static readonly DEFAULT_FONT = Global.MAIN_FONT;
  private static readonly BORDER_RADIUS = 5;
  private static readonly UPDATE_FREQ = 5;

  private readonly x: number;
  private readonly y: number;
  private readonly text: string;
  private readonly width: number;
  private readonly height: number;
  private readonly fontSize: number;
  private curTick: number = 0;

  private textColor = Global.WHITE;
  private borderColor = Global.GRAY;
  private regularColor = Global.DEEP_GREEN;
  private selectedColor = Global.YELLOW;

  private currentColor = this.regularColor;

  constructor(x: number = 0, y: number = 0, text: string, width: number, height: number, fontSize: number) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.width = width;
    this.height = height;
    this.fontSize = fontSize;
  }

  private renderButton(canvas: any) {
    CanvasLib.roundStrokeRect(canvas, this.x, this.y, this.width, this.height, ButtonComponent.BORDER_RADIUS,
      this.borderColor, this.currentColor);
  }

  private renderText(canvas: any) {
    CanvasLib.text(canvas, this.text, this.x + ButtonComponent.MARGIN_TEXT_LEFT, this.y + ButtonComponent.MARGIN_TEXT_TOP + this.fontSize, this.fontSize,
      ButtonComponent.DEFAULT_FONT, this.textColor);
  }

  private updateCurTick() {
    this.curTick++;
    if (this.curTick > ButtonComponent.UPDATE_FREQ) {
      this.curTick = 0;
    }
  }

  render(canvas: any) {
    this.renderButton(canvas);
    this.renderText(canvas);
  }
}
