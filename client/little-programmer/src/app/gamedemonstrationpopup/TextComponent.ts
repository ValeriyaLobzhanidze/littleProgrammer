import {ComponentI} from "../engine/ComponentI";
import VerticalLineComponent from "./VerticalLineComponent";
import {TextState} from "./TextState";
import CanvasShapesLib from "../lib/CanvasShapesLib";

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
  private amountOfTicks = 10;
  private changeTickStep = 10;
  private reversedAmountOfTick = 5;

  private readonly slowDownStep: number;
  private readonly speedUpStep: number;

  private verticalLine: VerticalLineComponent;

  private inputFieldColor = "grey";
  private textColor1 = "rgba(187, 116, 251, 0.83)";
  private wrongColor = "#FB1831";
  private rightColor = "#58fbce";
  private curTextColor = this.textColor1;

  private maxLine: string;

  private readonly isReverseNeeded: boolean;
  private readonly isFreezingNeeded: boolean;
  private readonly isSyntaxHighlightingNeeded: boolean;
  private isActivated: boolean = false;

  private readonly freezingTime = 30;
  private curFreezingTime = 0;

  constructor(x: number, y: number, textArr: string[], fontSize: number, isReverseNeeded = false,
              isFreezingNeeded = true, isSyntaxHighlightingNeeded = false) {
    this.x = x;
    this.y = y;
    this.textArr = textArr;
    this.fonSize = fontSize;
    this.slowDownStep = Math.floor(textArr.length * 0.5);
    this.speedUpStep = Math.floor(textArr.length * 0.75);
    this.verticalLine = new VerticalLineComponent(this.fonSize, this.y + 2);
    this.curState = TextState.STABLE;
    this.isReverseNeeded = isReverseNeeded;
    this.curLineOfTextArr = this.textArr[this.curTextArrIdx++];
    this.maxLine = this.findMaxLineLength();
    this.isFreezingNeeded = isFreezingNeeded;
    this.isSyntaxHighlightingNeeded = isSyntaxHighlightingNeeded;
    if (this.isSyntaxHighlightingNeeded) {
      this.curTextColor = this.wrongColor;
    }
  }

  public activate() {
    this.curState = TextState.NORMAL_SPEED;
    this.isActivated = true;
  }

  public wasActivated(): boolean {
    return this.isActivated;
  }

  private findMaxLineLength(): string {
    let maxLine = "";
    for (let line of this.textArr) {
      if (line.length > maxLine.length) {
        maxLine = line;
      }
    }
    return maxLine;
  }

  private renderInputField(canvas: any) {
    let ctx = canvas.getContext('2d');
    ctx.font = this.fonSize + "px KBSticktoIt";
    CanvasShapesLib.roundStrokeRect(canvas, this.x, this.y, ctx.measureText(this.maxLine).width + 5,
      this.fonSize + 10, 5, this.inputFieldColor, "white");
  }

  private renderText(canvas: any) {
    let ctx = canvas.getContext('2d');
    ctx.font = this.fonSize + "px KBSticktoIt";
    ctx.fillStyle = this.curTextColor;
    ctx.fillText(this.curText, this.x, this.y + this.fonSize);
  }

  private update() {
    if (this.curTick == 0) {

      if (this.curState != TextState.REVERSED) {
        if (this.curLetterIdx < this.curLineOfTextArr.length) {
          this.curText += this.curLineOfTextArr[this.curLetterIdx++];
        } else {
          if (!(this.curTextArrIdx < this.textArr.length)) {
            this.curState = TextState.STABLE;
            if (this.isSyntaxHighlightingNeeded) {
              this.curTextColor = this.rightColor;
            }
            return;
          } else if (this.isFreezingNeeded) {
            this.curState = TextState.FROZEN;
          }

          if (this.curState != TextState.FROZEN) {
            if (this.isReverseNeeded && this.curTextArrIdx < this.textArr.length) {
              this.curState = TextState.REVERSED;
              this.curLetterIdx--;
              this.amountOfTicks = this.reversedAmountOfTick;
              this.curText = this.curLineOfTextArr.slice(0, this.curLetterIdx - 1);
              this.curLetterIdx--;
            } else {
              if (this.curTextArrIdx < this.textArr.length) {
                this.curLetterIdx = 0;
                this.curText = "";
                this.curLineOfTextArr = this.textArr[this.curTextArrIdx++];
              } else {
                this.curState = TextState.STABLE;
                if (this.isSyntaxHighlightingNeeded) {
                  this.curTextColor = this.rightColor;
                }
                return;
              }
            }
          }
        }
      } else {
        if (this.curLetterIdx >= 2) {
          this.curText = this.curLineOfTextArr.slice(0, this.curLetterIdx - 1);
          this.curLetterIdx--;
        } else {
          this.curLetterIdx = 0;
          this.curText = "";
          if (this.curTextArrIdx < this.textArr.length) {
            this.curLineOfTextArr = this.textArr[this.curTextArrIdx++];
            this.curState = TextState.NORMAL_SPEED;
          } else {
            this.curState = TextState.STABLE;
            if (this.isSyntaxHighlightingNeeded) {
              this.curTextColor = this.rightColor;
            }
            return;
          }
        }
      }
    }

    if (this.curState == TextState.FROZEN) {
      if (this.curFreezingTime < this.freezingTime) {
        this.curFreezingTime++;
      } else {
        if (this.isReverseNeeded && this.curTextArrIdx < this.textArr.length) {
          this.curFreezingTime = 0;
          this.curState = TextState.REVERSED;
          this.curLetterIdx--;
          this.amountOfTicks = this.reversedAmountOfTick;
          this.curText = this.curLineOfTextArr.slice(0, this.curLetterIdx - 1);
          this.curLetterIdx--;
        } else {
          if (this.curTextArrIdx < this.textArr.length) {
            this.curLetterIdx = 0;
            this.curText = "";
            this.curLineOfTextArr = this.textArr[this.curTextArrIdx++];
          } else {
            this.curState = TextState.STABLE;
            if (this.isSyntaxHighlightingNeeded) {
              this.curTextColor = this.rightColor;
            }
            return;
          }
        }
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
    this.verticalLine.setCurPos(this.x + ctx.measureText(this.curText).width + 2);
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
    return !(this.curLetterIdx < this.curLineOfTextArr.length) && this.curState == TextState.STABLE;
  }
}
