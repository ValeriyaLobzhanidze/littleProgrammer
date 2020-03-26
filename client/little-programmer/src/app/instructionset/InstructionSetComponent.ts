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
    let rightXRollBarrier = 300;
    let fallDownBarrier = 40;
    let amountOfBarriers = props.instructionList.length + 1;
    this.ball = new Ball(amountOfBarriers, rightXRollBarrier, fallDownBarrier);
    // let cordsOfRightBarriers = this.ball.getBarrierPoints();
    // for (let i = 0, j = 0; i < cordsOfRightBarriers.length - 1, j < props.instructionList.length; i++, j++) {
    //   this.instructionSet.push(new ColoredText(props.instructionList[j], cordsOfRightBarriers[i].x, cordsOfRightBarriers[i].y));
    // }
    // this.comment = new ColoredText(props.comment, cordsOfRightBarriers[cordsOfRightBarriers.length - 1].x, cordsOfRightBarriers[cordsOfRightBarriers.length - 1].y);
    // this.curInstruction = this.instructionSet[this.curInstructionIdx++];
  }

  public render(canvas: any) {
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ball.render(canvas);
    // this.curInstruction.render(canvas);
    // let curBallPoint = this.ball.getCurPoint();
    // if (curBallPoint.x >= this.curInstruction.getX() && curBallPoint.y >= this.curInstruction.getY()) {
    //   this.curInstruction.setX(this.curInstruction.getX() + 10);
    //   this.curInstruction.setColor(Global.SEMI_DEEP_GREEN);
    //   if (this.curInstructionIdx < this.instructionSet.length) {
    //     this.curInstruction = this.instructionSet[this.curInstructionIdx++];
    //   }
    // }
  }
}
