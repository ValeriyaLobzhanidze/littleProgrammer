import {ComponentI} from "../engine/ComponentI";
import Instruction from "./Instruction";
import InstructionSet from "./InstructionSet";
import Ball from "./Ball";

export default class CommandDemonstrationComponent implements ComponentI {
  private instructionSet: InstructionSet;
  private ball: Ball;

  constructor(instructions: Instruction[], comment: Instruction) {
    this.instructionSet = new InstructionSet(instructions, comment, Ball.trajectoryFlyFunction, Ball.TRAJECTORY_STEP);

    this.ball = new Ball(this.instructionSet.xInstructionStart,
      this.instructionSet.getSetLength(),
      this.instructionSet.xCommentStart,
      this.instructionSet.getYCommentStart(),
      this.instructionSet.getCommentSize(),
      this.instructionSet.getCommentLength() * 10.5);
  }

  render(canvas: any) {
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ball.render(canvas);
    let ballCords = this.ball.getCurrentCords();

    this.instructionSet.setFlyBodyCords(ballCords.x, ballCords.y);
    this.instructionSet.render(canvas);
  }
}
