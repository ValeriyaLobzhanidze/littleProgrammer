import {ComponentI} from "../engine/ComponentI";
import CanvasShapesLib from "../lib/CanvasShapesLib";
import {ButtonState} from "./ButtonState";

export default class ButtonComponent implements ComponentI {
  private readonly x;
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
  private selectedTime = 10;
  private curTime = 0;
  private curState = ButtonState.REGULAR;

  private readonly startSelectedX: number;
  private readonly startSelectedY: number;

  private collidedBodyX = 0;
  private collideBodyY = 0;

  public setCollidedBodyCords(x: number, y: number) {
    this.collidedBodyX = x;
    this.collideBodyY = y;
  }

  constructor(x, y, text, width, height) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.width = width;
    this.height = height;
    this.startSelectedX = this.width / 2;
    this.startSelectedY = this.height / 2;
  }

  private renderButton(canvas: any) {
    CanvasShapesLib.roundStrokeRect(canvas, this.x, this.y, this.width, this.height, this.radius,
      this.buttonBorderColor, this.currentColor);
  }

  private renderText(canvas: any) {
    let ctx = canvas.getContext('2d');
    ctx.font = this.textFontSize + "px KBSticktoIt";
    ctx.fillStyle = this.textColor;
    ctx.fillText(this.text, this.x + this.textX, this.y + this.textFontSize);
  }

  private update() {
    if (this.curState == ButtonState.REGULAR) {
      if (this.collidedBodyX >= this.startSelectedX && this.collideBodyY >= this.startSelectedY) {
        this.curState = ButtonState.SELECTED;
        this.currentColor = this.buttonSelectedColor;
      }
    } else if (this.curState == ButtonState.SELECTED) {
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
