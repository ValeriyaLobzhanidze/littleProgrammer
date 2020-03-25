import {ComponentI} from "../engine/ComponentI";
import InputTextComponent from "../gameprocessdemonstration/inputtextcomponent/InputTextComponent";
import SyntaxDemonstrationComponentProps from "./SyntaxDemonstrationComponentProps";
import Global from "../global/Global";
import InputTextComponentProps from "../gameprocessdemonstration/inputtextcomponent/InputTextComponentProps";
import CanvasLib from "../lib/CanvasLib";

export default class SyntaxDemonstrationComponent implements ComponentI {

  private TEXT_COLOR = Global.LIGHT_PURPLE;
  private INPUT_WIDTH = 200;
  private INPUT_HEIGHT = 50;
  private FONT_SIZE = 25;

  private textComponentList: InputTextComponent[] = [];
  private commentList: string[];

  private commentX: number = 10;
  private commentY: number = 10;

  private curTextComponent: InputTextComponent;
  private textComponentIdx = 0;

  init(props: SyntaxDemonstrationComponentProps) {
    this.commentList = props.commentList;

    let inputProps = new InputTextComponentProps();
    inputProps.x = (props.canvasWidth - this.INPUT_WIDTH) / 2;
    inputProps.y = (props.canvasHeight - this.INPUT_HEIGHT) / 2;
    inputProps.width = this.INPUT_WIDTH;
    inputProps.height = this.INPUT_HEIGHT;
    inputProps.color = Global.GRAY;
    inputProps.fontSize = this.FONT_SIZE;
    inputProps.isReverseNeeded = true;
    inputProps.isDelayedNeeded = true;
    inputProps.isFreezingNeeded = true;
    inputProps.isSyntaxHighlightingNeeded = true;

    if (!props.isSeveralInputNeeded) {
      inputProps.inputs = props.inputLines;
      this.textComponentList.push(new InputTextComponent(inputProps));
    } else {
      let i = 1;
      let curY = (props.canvasHeight - this.INPUT_HEIGHT * props.inputLines.length) / props.inputLines.length;
      for (let text of props.inputLines) {
        let props = InputTextComponentProps.copy(inputProps);
        props.isReverseNeeded = false;
        props.inputs = [text];
        props.y = curY * i;
        i++;
        this.textComponentList.push(new InputTextComponent(props));
      }
    }
    this.curTextComponent = this.textComponentList[this.textComponentIdx++];
    this.curTextComponent.activate();
  }

  private renderComment(canvas: any) {
    if (this.commentList.length > 0) {
      let curY = this.commentY + this.FONT_SIZE;
      for (let comment of this.commentList) {
        CanvasLib.text(canvas, comment, this.commentX, curY, this.FONT_SIZE, Global.MAIN_FONT, this.TEXT_COLOR);
        curY += this.FONT_SIZE;
      }
    }
  }

  public render(canvas: any) {
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.renderComment(canvas);
    for (let textComponent of this.textComponentList) {
      textComponent.render(canvas);
    }

    if (this.curTextComponent.isTypingFinished() && this.textComponentIdx < this.textComponentList.length) {
      this.curTextComponent = this.textComponentList[this.textComponentIdx++];
      this.curTextComponent.activate();
    }
  }
}
