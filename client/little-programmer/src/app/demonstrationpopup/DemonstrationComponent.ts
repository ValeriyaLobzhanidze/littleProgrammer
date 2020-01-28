import RoundGridComponent from "../level1/RoundGridComponent";
import {ComponentI} from "../engine/ComponentI";

export default class DemonstrationComponent implements ComponentI {
  private roundGrid: RoundGridComponent;

  private readonly typingText: string;
  private typeCanvasHeight = 60 + 60;
  private currentLetterIdx = 0;
  private curText = "";
  private curTextTick = 0;
  private curStickTick = 0;
  private amountOfTextTicks = 10;
  private amountOfStickTicks = 30;

  private curIdle = 0;
  private idle = 30;
  private readonly image;

  constructor(typingText: string, gridWidth: number, gridHeight: number) {
    this.typingText = typingText;
    this.roundGrid = new RoundGridComponent(gridWidth, gridHeight, true, null, 0, this.typeCanvasHeight);

    this.image = new Image(0, 0);
    this.image.src = "/assets/images/mouse-pointer.png";
  }

  render(canvas: any) {
    this.roundGrid.render(canvas);
    let ctx = canvas.getContext('2d');
    if (this.curTextTick == 0) {
      if (this.currentLetterIdx < this.typingText.length) {
        this.curText += this.typingText[this.currentLetterIdx++];
      }
    }
    if (this.currentLetterIdx == 4) {
      this.amountOfTextTicks = 20;
    }

    if (this.currentLetterIdx == 7) {
      this.amountOfTextTicks = 10;
    }

    //button
    this.roundRect(ctx, 30, 60, 120, 40, 5);

    //button text
    ctx.font = 25 + "px KBSticktoIt";
    ctx.fillStyle = "white";
    ctx.fillText("Execute", 10 + 30, 70 + 18);

    //input field for for typing text
    ctx.beginPath();
    ctx.rect(0, 0, 5 + ctx.measureText(this.typingText).width + 50, 40);
    ctx.strokeStyle = "grey";
    ctx.stroke();

    //mouse pointer
    ctx.drawImage(this.image,
      5 + ctx.measureText(this.typingText).width + 60,
      0,
      30, 30);

    //typing text
    ctx.font = 30 + "px KBSticktoIt";
    ctx.fillStyle = "rgba(187, 116, 251, 0.83)";
    ctx.fillText(this.curText, 5, 30);

    if (this.curStickTick < this.amountOfStickTicks) {
      //typing line
      ctx.beginPath();
      ctx.moveTo(ctx.measureText(this.curText).width + 7, 35);
      ctx.lineTo(ctx.measureText(this.curText).width + 7, 5);
      ctx.strokeStyle = "black";
      ctx.stroke();
      this.curStickTick++;
    } else {
      if (this.curIdle < this.idle) {
        this.curIdle++;
      } else {
        this.curStickTick = 0;
        this.curIdle = 0;
      }
    }

    if (this.curTextTick < this.amountOfTextTicks) {
      this.curTextTick++;
    } else {
      this.curTextTick = 0;
    }
  }

  private roundRect(context, x, y, w, h, radius) {
    let r = x + w;
    let b = y + h;
    context.strokeStyle = "grey";
    context.fillStyle = "#58fbce";
    context.beginPath();
    context.moveTo(x + radius, y);
    context.lineTo(r - radius, y);
    context.quadraticCurveTo(r, y, r, y + radius);
    context.lineTo(r, y + h - radius);
    context.quadraticCurveTo(r, b, r - radius, b);
    context.lineTo(x + radius, b);
    context.quadraticCurveTo(x, b, x, b - radius);
    context.lineTo(x, y + radius);
    context.quadraticCurveTo(x, y, x + radius, y);
    context.stroke();
    context.fill();
  }
}
