import {ComponentI} from "../engine/ComponentI";
import Instruction from "./Instruction";

export default class CommandDemonstrationComponent implements ComponentI {

  private ballX = 0;
  private ballY = 0;
  private ballColor1 = "#58fbce";
  private ballColor2 = "rgba(187, 116, 251, 0.83)";
  private ballStartAngel = 0;

  private currentUpdateBallFunc: () => void;
  private currentInstruction;
  private instrIdx = 0;

  private currentYOfParabola = 0;

  private readonly instructions: Instruction[];

  constructor(instructions: Instruction[]) {
    this.instructions = instructions;
    this.initInstructions();
    this.currentInstruction = this.instructions[this.instrIdx];
  }

  private initInstructions() {
    let x = 40.2;
    let y = 60;
    for (let instruction of this.instructions) {
      instruction.x = x;
      instruction.y = y;
      y += 60;
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

    ctx.fillStyle = this.ballColor1;
    ctx.beginPath();
    ctx.arc(this.ballX, this.ballY, 10, this.ballStartAngel, this.ballStartAngel + Math.PI);
    ctx.fill();

    ctx.fillStyle = this.ballColor2;
    ctx.beginPath();
    ctx.arc(this.ballX, this.ballY, 10, this.ballStartAngel + Math.PI, 2 * (this.ballStartAngel + Math.PI));
    ctx.fill();
  }

  private update() {
    if (this.currentInstruction != null) {
      if (this.ballX <= 0) {
        this.currentUpdateBallFunc = this.positiveDirection;
      } else if (this.ballX >= this.currentInstruction.x) {
        this.currentUpdateBallFunc = this.negativeDirection;
        this.currentInstruction.x += 10;
        this.currentInstruction.color = "#58fbce";
        this.currentInstruction = this.instructions[++this.instrIdx];
        this.currentYOfParabola += Math.sqrt(this.ballX) * 10;
      }
    } else {
      if (this.ballX <= 0) {
        this.currentUpdateBallFunc = this.rollBall;
      }
    }
    this.currentUpdateBallFunc();
  }

  private positiveDirection(): void {
    let sqrt = this.currentYOfParabola + Math.sqrt(this.ballX) * 5;
    this.ballX += 1.2;
    this.ballY = sqrt;
  }

  private negativeDirection(): void {
    let sqrt = this.currentYOfParabola - Math.sqrt(this.ballX) * 5;
    this.ballX -= 1.2;
    this.ballY = sqrt;
  }

  private rollBall(): void {
    this.ballStartAngel += Math.PI / 4;
    this.ballX += 0.1;
  }

  render(canvas: any) {
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.renderInstructions(canvas);
    this.renderBall(canvas);
    this.update();
  }
}
