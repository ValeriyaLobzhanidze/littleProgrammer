import Global from "../../global/Global";
import StateMachine from "../../statemachine/StateMachine";
import AnimatedTextStateMachineBuilder from "./AnimatedTextStateMachineBuilder";
import {ComponentI} from "../../engine/ComponentI";
import {SyntaxParser} from "../../SyntaxParser";
import CanvasLib from "../../lib/CanvasLib";

export default class TextComponent implements ComponentI {
  public static readonly DEFAULT_FONT_SIZE = 30;
  private static readonly UPDATE_FREQ = 5;

  private font = Global.MAIN_FONT;
  private ordinaryColor = Global.DEEP_PURPLE;
  private wrongColor = Global.LIGHT_RED;
  private rightColor = Global.DEEP_GREEN;

  private readonly x: number;
  private readonly y: number;
  private readonly fontSize: number;
  private readonly text: string;
  private curText: string = "";
  private curColor = this.ordinaryColor;
  private curTick = 0;
  private stateMachine: StateMachine<string>;
  private readonly isSyntaxValidationNeeded: boolean = false;

  public activate: () => void;

  constructor(x: number, y: number, text: string, isReverseNeeded = false, isDelayedNeeded = true,
              isFreezingNeeded = true, isSyntaxValidationNeeded = false, fontSize: number = TextComponent.DEFAULT_FONT_SIZE,) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.fontSize = fontSize;
    this.isSyntaxValidationNeeded = isSyntaxValidationNeeded;
    this.activate = () => {
      this.stateMachine = AnimatedTextStateMachineBuilder.build(text, isReverseNeeded, isDelayedNeeded, isFreezingNeeded);
    }
  }

  render(canvas: any) {
    if (this.curTick === 0 && this.isActive()) {
      this.curText = this.stateMachine.update();
    }
    this.updateTickCount();
    if (this.isSyntaxValidationNeeded) {
      let valid = SyntaxParser.validate(this.curText);
      this.curColor = valid ? this.rightColor : this.wrongColor;
    }
    CanvasLib.text(canvas, this.curText, this.x, this.y, this.fontSize, this.font, this.curColor);
  }

  private updateTickCount() {
    this.curTick++;
    if (this.curTick > TextComponent.UPDATE_FREQ) {
      this.curTick = 0;
    }
  }

  public isActive(): boolean {
    return this.stateMachine && this.stateMachine.isActive();
  }

}
