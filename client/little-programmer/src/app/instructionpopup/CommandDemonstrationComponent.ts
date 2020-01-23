import {ComponentI} from "../engine/ComponentI";
import Instruction from "./Instruction";

export default class CommandDemonstrationComponent implements ComponentI {

  private ballX = 0;
  private ballY = 0;
  private ballColor = "#58fbce";
  private currentUpdateBallFunc: () => { x: number, y: number };
  private currentInstruction;
  private instrIdx = 0;

  private currentYOfParabola = 0;

  private readonly instructions: Instruction[];

  constructor(instructions: Instruction[]) {
    this.instructions = instructions;
    this.initInstructions();
    this.currentUpdateBallFunc = this.positiveDirection;
    this.currentInstruction = this.instructions[this.instrIdx];
  }

  private initInstructions() {
    let x = 40;
    let y = 60;
    for (let instruction of this.instructions) {
      instruction.x = x;
      instruction.y = y;
      y += 50;
    }
  }

  private renderInstructions(canvas: any) {
    let ctx = canvas.getContext('2d');
    ctx.font = "30px KBSticktoIt";

    for (let instruction of this.instructions) {
      ctx.fillStyle = instruction.color;
      ctx.fillText(instruction.instruction, instruction.x, instruction.y);
    }
  }

  private renderBall(canvas: any) {
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = this.ballColor;
    ctx.beginPath();
    ctx.arc(this.ballX, this.ballY, 10, 0, 2 * Math.PI);
    ctx.fill();
  }

  private update() {
    let testUpdateResult = this.currentUpdateBallFunc();
    if (testUpdateResult.x < 0) {
      this.ballX = 0;
      this.currentUpdateBallFunc = this.positiveDirection;
    } else if (testUpdateResult.x >= this.currentInstruction.x) {
      this.currentUpdateBallFunc = this.negativeDirection;
      this.currentInstruction = this.instructions[++this.instrIdx];
      this.currentYOfParabola += Math.sqrt(this.ballX) * 10;
    }

    let updateResult = this.currentUpdateBallFunc();
    this.ballX = updateResult.x;
    this.ballY = updateResult.y;
  }

  private positiveDirection(): { x: number, y: number } {
    let sqrt = this.currentYOfParabola + Math.sqrt(this.ballX) * 5;
    return {x: this.ballX + 0.2, y: sqrt};
  }

  private negativeDirection(): { x: number, y: number } {
    let func = this.currentYOfParabola - Math.sqrt(this.ballX) * 5;
    return {x: this.ballX - 0.2, y: func};
  }

  render(canvas: any) {
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.renderInstructions(canvas);
    this.renderBall(canvas);
    this.update();
  }
}
