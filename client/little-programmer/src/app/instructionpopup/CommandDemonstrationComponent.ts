import {ComponentI} from "../engine/ComponentI";
import Instruction from "./Instruction";

export default class CommandDemonstrationComponent implements ComponentI {

  private ballX = 0;
  private ballY = 0;
  private currentUpdateBallFunc: () => void;
  private initFlag = false;

  private readonly instructions: Instruction[];

  constructor(instructions: Instruction[]) {
    this.instructions = instructions;
  }

  private renderInstructions(canvas: any) {
    let ctx = canvas.getContext('2d');
    ctx.font = "30px KBSticktoIt";

    let y = 60;
    for (let instruction of this.instructions) {
      ctx.fillStyle = instruction.getColor();
      ctx.fillText(instruction.getInstruction(), 40, y);
      y += 50;
    }
  }

  private renderBall(canvas: any) {
    let ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(this.ballX, this.ballY, 15, 0, 2 * Math.PI);
    ctx.fill();
  }

  private update() {
    if (!this.initFlag) {
      this.currentUpdateBallFunc = this.negativeDirection;
      this.initFlag = true;
    }
    if (this.ballX < 0) {
      this.ballX = 0;
      this.currentUpdateBallFunc = this.positiveDirection;
    }
    this.currentUpdateBallFunc();
  }

  private positiveDirection() {
    this.ballX += 0.2;
    this.ballY = Math.sqrt(this.ballX) * 5;
  }

  private negativeDirection() {
    this.ballX -= 0.2;
    this.ballY = -Math.sqrt(this.ballX) * 5;
  }

  render(canvas: any) {
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.update();
    this.renderInstructions(canvas);
    this.renderBall(canvas);
  }
}
