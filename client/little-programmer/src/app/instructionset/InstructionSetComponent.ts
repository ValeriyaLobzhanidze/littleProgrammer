import {ComponentI} from "../engine/ComponentI";
import Ball from "./Ball";
import ColoredText from "./ColoredText";
import InstructionSetProps from "./InstructionSetProps";
import Global from "../global/Global";

export default class InstructionSetComponent implements ComponentI {

  private instructionSet: ColoredText[] = [];
  private curInstruction: ColoredText;
  private curInstructionIdx: number = 0;

  private comment: ColoredText;
  private ball: Ball;

  constructor() {
  }

  public init(props: InstructionSetProps) {
    let rightXRollBarrier = 320;
    let fallDownBarrier = 30;
    let instrFontSize = 30;
    let commentFontSize = 25;
    let amountOfBarriers = props.instructionList.length + 1;

    this.ball = new Ball(amountOfBarriers, rightXRollBarrier, fallDownBarrier);
    let cordsOfRightBarriers = this.ball.getBarrierPoints();
    for (let i = 0, j = 0; i < cordsOfRightBarriers.length - 1, j < props.instructionList.length; i++, j++) {
      let barrier = cordsOfRightBarriers[i];
      this.instructionSet.push(new ColoredText(props.instructionList[j], barrier.x, barrier.y, instrFontSize));
    }

    let barrier = cordsOfRightBarriers[cordsOfRightBarriers.length - 1];
    this.comment = new ColoredText(props.comment, barrier.x, barrier.y, commentFontSize);
    this.curInstruction = this.instructionSet[this.curInstructionIdx++];
  }

  public render(canvas: any) {
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.ball.render(canvas);
    let curBallPoint = this.ball.getCurPoint();

    if (this.curInstruction && curBallPoint.x >= this.curInstruction.getX() && curBallPoint.y >= this.curInstruction.getY()) {
      this.curInstruction.setX(this.curInstruction.getX() + 10);
      this.curInstruction.setColor(Global.DEEP_GREEN);
      if (this.curInstructionIdx < this.instructionSet.length) {
        this.curInstruction = this.instructionSet[this.curInstructionIdx++];
      } else {
        this.curInstruction = null;
      }
    }

    for (let instruction of this.instructionSet) {
      instruction.render(canvas);
    }
    this.comment.render(canvas);
  }
}
