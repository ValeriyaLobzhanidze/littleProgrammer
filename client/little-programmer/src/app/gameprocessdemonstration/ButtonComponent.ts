import {ComponentI} from "../engine/ComponentI";
import CanvasLib from "../lib/CanvasLib";
import {ButtonState} from "./ButtonState";

export default class ButtonComponent implements ComponentI {
  private x;
  private readonly y;
  private readonly text;
  private readonly width;
  private readonly height;

  private textX = 5;
  private textFontSize = 25;

  private radius = 5;
  private textColor = "white";
  private buttonBorderColor = "grey";
  private buttonRegularColor = "#58fbce";
  private buttonSelectedColor = "#FBE335";

  private currentColor = this.buttonRegularColor;
  private selectedTime = 25;
  private curTime = 0;
  private curState = ButtonState.REGULAR;

  constructor(x: number = 0, y: number = 0, text, width, height) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.width = width;
    this.height = height;
  }

  public makeSelected() {
    this.curState = ButtonState.SELECTED;
    this.currentColor = this.buttonSelectedColor;
  }

  public isSelected() {
    return this.curState == ButtonState.SELECTED;
  }

  private renderButton(canvas: any) {
    this.x = (canvas.width - this.width) / 2;
    CanvasLib.roundStrokeRect(canvas, this.x, this.y, this.width, this.height, this.radius,
      this.buttonBorderColor, this.currentColor);
  }

  private renderText(canvas: any) {
    let ctx = canvas.getContext('2d');
    ctx.font = this.textFontSize + "px KBSticktoIt";
    ctx.fillStyle = this.textColor;
    ctx.fillText(this.text, this.x + this.textX, this.y + this.textFontSize);
  }

  private update() {
    if (this.curState == ButtonState.SELECTED) {
      if (this.curTime < this.selectedTime) {
        this.curTime++;
      } else {
        this.curState = ButtonState.REGULAR;
        this.currentColor = this.buttonRegularColor;
      }
    }
  }

  render(canvas: any) {
    this.update();
    this.renderButton(canvas);
    this.renderText(canvas);
  }
}
