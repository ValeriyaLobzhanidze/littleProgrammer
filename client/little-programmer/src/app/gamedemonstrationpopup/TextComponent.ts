import {ComponentI} from "../engine/ComponentI";
import {State} from "../level1/State";
import VerticalLineComponent from "./VerticalLineComponent";

export default class TextComponent implements ComponentI {
  private fonSize = 30;
  private curState: State;
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

  constructor(text: string) {
    this.text = text;
    this.slowDownStep = Math.floor(text.length * 0.5);
    this.speedUpStep = Math.floor(text.length * 0.75);
    this.verticalLine = new VerticalLineComponent(this.fonSize);
    this.curState = State.ACTIVE;
  }

  private renderInputField(canvas: any) {
    let ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.rect(0, 0, ctx.measureText(this.text).width, this.fonSize);
    ctx.strokeStyle = this.inputFieldColor;
    ctx.stroke();
  }

  private renderText(canvas: any) {
    let ctx = canvas.getContext('2d');
    ctx.font = this.fonSize + "px KBSticktoIt";
    ctx.fillStyle = this.textColor;
    ctx.fillText(this.curText, 0, this.fonSize);
  }

  private update() {
    if (this.curTick == 0) {
      if (this.curLetterIdx < this.text.length) {
        this.curText += this.text[this.curLetterIdx++];
      } else {
        this.curState = State.STABLE;
        return;
      }
    }

    if (this.curLetterIdx == this.slowDownStep) {
      this.amountOfTicks += this.changeTickStep;
    } else if (this.curLetterIdx == this.speedUpStep) {
      this.amountOfTicks -= this.changeTickStep;
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
    if (this.curState == State.ACTIVE) {
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
