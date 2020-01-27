import RoundGridComponent from "../level1/RoundGridComponent";
import {ComponentI} from "../engine/ComponentI";

export default class DemonstrationComponent implements ComponentI {
  private roundGrid: RoundGridComponent;

  private readonly typingText: string;
  private typeCanvasHeight = 60;
  private currentLetterIdx = 0;
  private curText = "";
  private curTextTick = 0;
  private curStickTick = 0;
  private amountOfTextTicks = 30;
  private amountOfStickTicks = 30;

  private curIdle = 0;
  private idle = 30;

  constructor(typingText: string, gridWidth: number, gridHeight: number) {
    this.typingText = typingText;
    this.roundGrid = new RoundGridComponent(gridWidth, gridHeight, true, null, 0, this.typeCanvasHeight);
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
      this.amountOfTextTicks = 50;
    }

    if (this.currentLetterIdx == 7) {
      this.amountOfTextTicks = 30;
    }

    ctx.font = 30 + "px KBSticktoIt";
    ctx.fillStyle = "rgba(187, 116, 251, 0.83)";
    ctx.fillText(this.curText, 0, 30);

    if (this.curStickTick < this.amountOfStickTicks) {
      ctx.beginPath();
      ctx.moveTo(0, 30);
      ctx.lineTo(0, 0);
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
}
