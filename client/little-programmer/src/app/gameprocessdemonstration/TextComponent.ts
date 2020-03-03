import {ComponentI} from "../engine/ComponentI";
import VerticalLineComponent from "./VerticalLineComponent";
import {TextState} from "./TextState";
import CanvasLib from "../lib/CanvasLib";
import Global from "../global/Global";

export default class TextComponent implements ComponentI {
  private readonly x;
  private readonly y;

  private readonly fonSize;
  private curState: TextState;

  private readonly textArr: string[];
  private curLineOfTextArr: string;
  private curTextArrIdx = 0;

  private curLetterIdx = 0;
  private curText = "";

  private curTick = 0;
  private normalSpeedTicks = 10;
  private delayedSpeedTicks = 20;
  private reversedAmountOfTick = 5;
  private curAmountOfTicks: number;

  private readonly slowDownStep: number;
  private readonly speedUpStep: number;

  private verticalLine: VerticalLineComponent;

  private inputFieldColor = "grey";
  private textColor1 = Global.LIGHT_PURPLE;
  private wrongColor = Global.LIGHT_RED;
  private rightColor = Global.DEEP_GREEN;
  private curTextColor = this.textColor1;

  private maxLine: string;
  private minLine: string;

  private readonly isReverseNeeded: boolean;
  private readonly isFreezingNeeded: boolean;
  private readonly isSyntaxHighlightingNeeded: boolean;
  private isActivated: boolean = false;

  private readonly freezingTime = 2;
  private curFreezingTime = 0;

  constructor(x: number, y: number, textArr: string[], fontSize: number, isReverseNeeded = false,
              isFreezingNeeded = true, isSyntaxHighlightingNeeded = false) {
    this.x = x;
    this.y = y;
    this.textArr = textArr;
    this.fonSize = fontSize;

    this.verticalLine = new VerticalLineComponent(this.fonSize, this.y + 2);
    this.curState = TextState.STABLE;
    this.isReverseNeeded = isReverseNeeded;
    this.curLineOfTextArr = this.textArr[this.curTextArrIdx++];

    let minMaxLines = this.findMinMaxLinesLength();
    this.maxLine = minMaxLines.max;
    this.minLine = minMaxLines.min;

    this.slowDownStep = Math.floor(this.minLine.length * 0.5);
    this.speedUpStep = Math.floor(this.minLine.length * 0.75);

    this.isFreezingNeeded = isFreezingNeeded;
    this.isSyntaxHighlightingNeeded = isSyntaxHighlightingNeeded;
    if (this.isSyntaxHighlightingNeeded) {
      this.curTextColor = this.wrongColor;
    }
  }

  public activate() {
    this.isActivated = true;
    this.curAmountOfTicks = this.normalSpeedTicks;
    this.curState = TextState.DIRECT_MOVE_NORMAL_SPEED;
  }

  public wasActivated(): boolean {
    return this.isActivated;
  }

  private findMinMaxLinesLength(): { min: string, max: string } {
    let maxLine = "";
    let minLine = "";
    let minLineLen = Number.MAX_VALUE;
    for (let line of this.textArr) {
      if (line.length > maxLine.length) {
        maxLine = line;
      }
      if (line.length < minLineLen) {
        minLineLen = line.length;
        minLine = line;
      }
    }
    return {min: minLine, max: maxLine};
  }

  private renderInputField(canvas: any) {
    let ctx = canvas.getContext('2d');//TODO: move to Canvas lib
    ctx.font = this.fonSize + "px KBSticktoIt";
    CanvasLib.roundStrokeRect(canvas, this.x, this.y, ctx.measureText(this.maxLine).width + 5,
      this.fonSize + 10, 5, this.inputFieldColor, "white");
  }

  private renderText(canvas: any) {//TODO: move to Canvas lib
    let ctx = canvas.getContext('2d');
    ctx.font = this.fonSize + "px KBSticktoIt";
    ctx.fillStyle = this.curTextColor;
    ctx.fillText(this.curText, this.x, this.y + this.fonSize);
  }

  private decrementLetter(): boolean {
    if (this.curLetterIdx == this.curLineOfTextArr.length) {
      this.curLetterIdx = this.curLineOfTextArr.length - 2;
    }

    if (this.curLetterIdx > 0) {
      this.curText = this.curLineOfTextArr.slice(0, this.curLetterIdx);
      this.curLetterIdx--;
      return true;
    } else {
      this.curText = "";
      return false;
    }
  }

  private incrementLetter(): boolean {
    if (this.curLetterIdx < this.curLineOfTextArr.length) {
      this.curText += this.curLineOfTextArr[this.curLetterIdx++];
      return true;
    }
    return false;
  }

  private updateLineInTextArr(): boolean {
    if (this.curTextArrIdx < this.textArr.length) {
      this.curLineOfTextArr = this.textArr[this.curTextArrIdx++];
      return true;
    }
    return false;
  }

  private changeState() {
    switch (this.curState) {
      case TextState.REVERSED:
        if (!this.decrementLetter()) {
          if (!this.updateLineInTextArr()) {
            this.curState = TextState.STABLE;
            if (this.isSyntaxHighlightingNeeded) {
              this.curTextColor = this.rightColor;
            }
          } else {
            this.curState = TextState.DIRECT_MOVE_NORMAL_SPEED;
          }
        }
        break;

      case TextState.FROZEN:
        if (this.curFreezingTime < this.freezingTime) {
          this.curFreezingTime++;
        } else {
          this.curState = TextState.REVERSED;
          this.curAmountOfTicks = this.reversedAmountOfTick;
        }
        break;

      case TextState.STABLE:
        return;

      case TextState.DIRECT_MOVE_NORMAL_SPEED:
        if (this.curLetterIdx == this.slowDownStep) {
          this.curState = TextState.DIRECT_MOVE_DELAYED;
          this.curAmountOfTicks = this.delayedSpeedTicks;
        }
        if (!this.incrementLetter()) {
          if (this.curTextArrIdx >= this.textArr.length) {
            this.curState = TextState.STABLE;
            if (this.isSyntaxHighlightingNeeded) {
              this.curTextColor = this.rightColor;
            }
            return;
          }
          if (this.isFreezingNeeded) {
            this.curState = TextState.FROZEN
          } else {//TODO: if reversed isn't needed
            this.curState = TextState.REVERSED;
            this.curAmountOfTicks = this.reversedAmountOfTick;
          }
        }
        break;

      case TextState.DIRECT_MOVE_DELAYED:
        if (this.curLetterIdx == this.speedUpStep) {
          this.curState = TextState.DIRECT_MOVE_NORMAL_SPEED;
          this.curAmountOfTicks = this.normalSpeedTicks;
        }
        this.incrementLetter();
        break;
    }
  }

  private renderVerticalLine(canvas: any) {
    let ctx = canvas.getContext('2d');
    this.verticalLine.setCurPos(this.x + ctx.measureText(this.curText).width + 2);
    this.verticalLine.render(canvas);
  }

  public render(canvas: any) {
    if (this.curTick == 0) {
      this.changeState();
    }
    if (this.curTick < this.curAmountOfTicks) {
      this.curTick++
    } else {
      this.curTick = 0;
    }
    this.renderInputField(canvas);
    this.renderText(canvas);
    this.renderVerticalLine(canvas);
  }

  public isTypingFinished(): boolean {
    return !(this.curLetterIdx < this.curLineOfTextArr.length) && this.curState == TextState.STABLE;
  }
}
