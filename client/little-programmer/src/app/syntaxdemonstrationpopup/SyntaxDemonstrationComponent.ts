import {ComponentI} from "../engine/ComponentI";
import TextComponent from "../gamedemonstrationpopup/TextComponent";

export default class SyntaxDemonstrationComponent implements ComponentI {
  private readonly comment: string;
  private textComponent: TextComponent;
  private textColor = "rgba(187, 116, 251, 0.83)";
  private fontSize = 25;

  private x = 5;
  private y = 5;

  constructor(comment: string, textArr: string[]) {
    this.comment = comment;
    this.textComponent = new TextComponent(100, 150, textArr, 30, true, true, true);
  }

  private renderComment(canvas: any) {
    let ctx = canvas.getContext('2d');
    ctx.font = this.fontSize + "px KBSticktoIt";
    ctx.fillStyle = this.textColor;
    ctx.fillText(this.comment, this.x, this.y + this.fontSize);
  }

  render(canvas: any) {
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.renderComment(canvas);
    this.textComponent.render(canvas);
  }
}
