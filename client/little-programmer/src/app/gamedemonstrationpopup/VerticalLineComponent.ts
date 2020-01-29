import {ComponentI} from "../engine/ComponentI";
import {LineState} from "./LineState";

export default class VerticalLineComponent implements ComponentI {
  private curRenderTime = 0;
  private maxRenderTime = 30;
  private curHideTime = 0;
  private maxHideTime = 30;

  private curPos = 0;
  private startPosY = 5;
  private color = "black";

  private curState: LineState;
  private readonly length: number;

  constructor(length: number) {
    this.length = length;
    this.curState = LineState.RENDERED;
  }

  public setCurPos(value: number) {
    this.curPos = value;
  }

  private _render(canvas: any) {
    let ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(this.curPos, this.startPosY + this.length);
    ctx.lineTo(this.curPos, this.startPosY);
    ctx.strokeStyle = this.color;
    ctx.stroke();
  }

  private updateRenderTime() {
    if (this.curRenderTime < this.maxRenderTime - 1) {
      this.curRenderTime++;
    } else {
      this.curState = LineState.HIDE;
    }
  }

  private updateHideTime() {
    if (this.curHideTime < this.maxHideTime) {
      this.curHideTime++;
    } else {
      this.curState = LineState.RENDERED;
      this.curRenderTime = 0;
      this.curHideTime = 0;
    }
  }

  render(canvas: any) {
    if (this.curState == LineState.RENDERED) {
      this._render(canvas);
      this.updateRenderTime();
    } else {
      this.updateHideTime();
    }
  }
}
