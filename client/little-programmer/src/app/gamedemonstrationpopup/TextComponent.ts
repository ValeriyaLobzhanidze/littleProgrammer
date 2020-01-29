import {ComponentI} from "../engine/ComponentI";
import VerticalLineComponent from "./VerticalLineComponent";
import {TextState} from "./TextState";
import CanvasShapesLib from "../lib/CanvasShapesLib";

export default class TextComponent implements ComponentI {
  private readonly x;
  private readonly y;

  private readonly fonSize;
  private curState: TextState;
  private readonly text: string;
  private curLetterIdx = 0;
  private curText = "";

  private curTick = 0;
  private amountOfTicks = 10;
  private changeTickStep = 10;

  private readonly slowDownStep: number;
  private readonly speedUpStep: number;

  private verticalLine: VerticalLineComponent;

  private inputFieldColor = "grey";
  private textColor = "rgba(187, 116, 251, 0.83)";

  constructor(x: number, y: number, text: string, fontSize: number) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.fonSize = fontSize;
    this.slowDownStep = Math.floor(text.length * 0.5);
    this.speedUpStep = Math.floor(text.length * 0.75);
    this.verticalLine = new VerticalLineComponent(this.fonSize);
    this.curState = TextState.NORMAL_SPEED;
  }

  private renderInputField(canvas: any) {
    let ctx = canvas.getContext('2d');
    ctx.font = this.fonSize + "px KBSticktoIt";
    CanvasShapesLib.roundStrokeRect(canvas, this.x, this.y, ctx.measureText(this.text).width + 5,
      this.fonSize + 10, 5, this.inputFieldColor, "white");
  }

  private renderText(canvas: any) {
    let ctx = canvas.getContext('2d');
    ctx.font = this.fonSize + "px KBSticktoIt";
    ctx.fillStyle = this.textColor;
    ctx.fillText(this.curText, this.x, this.y + this.fonSize);
  }

  private update() {
    if (this.curTick == 0) {
      if (this.curLetterIdx < this.text.length) {
        this.curText += this.text[this.curLetterIdx++];
      } else {
        this.curState = TextState.STABLE;
        return;
      }
    }

    if (this.curState == TextState.NORMAL_SPEED) {
      if (this.curLetterIdx == this.slowDownStep) {
        this.amountOfTicks += this.changeTickStep;
        this.curState = TextState.DELAYED;
      }
    }

    if (this.curState == TextState.DELAYED) {
      if (this.curLetterIdx == this.speedUpStep) {
        this.amountOfTicks -= this.changeTickStep;
        this.curState = TextState.NORMAL_SPEED;
      }
    }

    if (this.curTick < this.amountOfTicks) {
      this.curTick++;
    } else {
      this.curTick = 0;
    }
  }

  private renderVerticalLine(canvas: any) {
    let ctx = canvas.getContext('2d');
    this.verticalLine.setCurPos(ctx.measureText(this.curText));
    this.verticalLine.render(canvas);
  }

  public render(canvas: any) {
    if (this.curState != TextState.STABLE) {
      this.update();
    }
    this.renderInputField(canvas);
    this.renderText(canvas);
    this.renderVerticalLine(canvas);
  }

  public isTypingFinished(): boolean {
    return !(this.curLetterIdx < this.text.length);
  }
}
