import {ComponentI} from "../engine/ComponentI";
import InputTextComponent from "../gameprocessdemonstration/inputtextcomponent/InputTextComponent";

export default class SyntaxDemonstrationComponent implements ComponentI {
  private textComponentList: InputTextComponent[] = [];
  private commentList: string[];
  private textColor = "rgba(187, 116, 251, 0.83)";
  private fontSize = 25;
  private isSeveralInputNeeded;

  private commentX = 50;
  private commentY = 30;

  private curTextComponent: InputTextComponent;
  private textComponentIdx = 0;

  constructor() {

  }

  init(props: any) {
    // this.commentList = props.comment;
    // this.isSeveralInputNeeded = props.isSeveralInputNeeded;
    // let fontSize = 30;
    // if (!props.isSeveralInputNeeded) {
    //   this.textComponentList.push(new InputTextComponent(100, 150, props.textArr, true, true, true));
    // } else {
    //   let curY = 50;
    //   for (let text of props.textArr) {
    //     this.textComponentList.push(new InputTextComponent(100, curY, [text], false, true, true));
    //     curY += fontSize * 2;
    //   }
    // }
    // this.curTextComponent = this.textComponentList[this.textComponentIdx++];
    // this.curTextComponent.activate();
  }

  private renderComment(canvas: any) {
    if (this.commentList.length > 0) {
      let curY = this.commentY + this.fontSize;
      for (let comment of this.commentList) {
        let ctx = canvas.getContext('2d');
        ctx.font = this.fontSize + "px KBSticktoIt";
        ctx.fillStyle = this.textColor;
        ctx.fillText(comment, this.commentX, curY);
        curY += this.fontSize;
      }
    }
  }

  render(canvas: any) {
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
