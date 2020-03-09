import {ComponentI} from "../../engine/ComponentI";
import VerticalLineComponent from "../verticalline/VerticalLineComponent";
import {TextState} from "../textcomponent/TextState";
import CanvasLib from "../../lib/CanvasLib";
import Global from "../../global/Global";
import TextComponent from "../textcomponent/TextComponent";
import InputTextComponentProps from "./InputTextComponentProps";

export default class InputTextComponent implements ComponentI {
  private static readonly TEXT_MARGIN_LEFT = 7;
  private static readonly TEXT_MARGIN_TOP = 10;
  private static readonly BORDER_RADIUS = 5;

  private readonly x: number;
  private readonly y: number;
  private readonly width: number;
  private readonly height: number;
  private color: string;

  private readonly textComponentList: TextComponent[] = [];
  private curActiveTextComponentIdx = 0;

  private isActivated: boolean = false;

  constructor(props: InputTextComponentProps) {
    this.x = props.x;
    this.y = props.y;
    this.color = props.color ? props.color : Global.SEMI_GRAY;
    this.width = props.width;
    this.height = props.height;
    for (let i = 0; i < props.inputs.length - 1; i++) {
      this.textComponentList.push(
        new TextComponent(
          this.x + InputTextComponent.TEXT_MARGIN_LEFT,
          this.y + InputTextComponent.TEXT_MARGIN_TOP + props.fontSize,
          props.inputs[i],
          props.isReverseNeeded,
          props.isDelayedNeeded,
          props.isFreezingNeeded,
          props.isSyntaxHighlightingNeeded,
          props.fontSize));
    }

    this.textComponentList.push(
      new TextComponent(
        this.x + InputTextComponent.TEXT_MARGIN_LEFT,
        this.y + InputTextComponent.TEXT_MARGIN_TOP + props.fontSize,
        props.inputs[props.inputs.length - 1],
        false,
        props.isDelayedNeeded,
        props.isFreezingNeeded,
        props.isSyntaxHighlightingNeeded,
        props.fontSize));

  }

  public activate() {
    this.isActivated = true;
    for(let input of this.textComponentList){
      input.activate();
    }
  }

  public wasActivated(): boolean {
    return this.isActivated;
  }

  private renderInputField(canvas: any) {
    CanvasLib.roundStrokeRect(canvas, this.x, this.y, this.width,
      this.height, InputTextComponent.BORDER_RADIUS, this.color);
  }

  private renderTextComponent(canvas: any) {
    if (!this.textComponentList[this.curActiveTextComponentIdx].isActive() && this.curActiveTextComponentIdx + 1 < this.textComponentList.length) {
      this.curActiveTextComponentIdx++;
    }
    this.textComponentList[this.curActiveTextComponentIdx].render(canvas);
  }

  public render(canvas: any) {
    this.renderInputField(canvas);
    this.renderTextComponent(canvas);
  }

  public isTypingFinished(): boolean {
    return this.curActiveTextComponentIdx === this.textComponentList.length - 1 && !this.textComponentList[this.curActiveTextComponentIdx].isActive();
  }
}
