import Instruction from "./Instruction";
import Global from "../global/Global";

export default class InstructionSet {
  private readonly instructionList: Instruction[];
  private readonly comment: Instruction;
  private currentInstruction: Instruction;
  private visitedInstructionColor = Global.DEEP_GREEN;
  private _xInstructionStart = 52.2;
  private instructionShift = 10;
  private _xCommentStart = 40;
  private readonly trajectoryFunction: (x: number) => number;
  private readonly trajectoryFuncStep: number;
  private instructionIdx = 0;

  private flyBodyX = 0;
  private flyBodyY = 0;

  constructor(instructionList: Instruction[], comment: Instruction, trajectoryFunction: (x: number) => number, step: number) {
    this.trajectoryFuncStep = step;
    this.comment = comment;
    this.instructionList = instructionList;
    this.trajectoryFunction = trajectoryFunction;
    this.initInstructionAndCommentCords();
    this.currentInstruction = this.instructionList[this.instructionIdx];
  }

  private initInstructionAndCommentCords(): void {
    if (this.instructionList.length > 0) {
      let curStep = 0;
      for (let i = 0; i < this.instructionList.length; i++) {
        this.instructionList[i].x = this._xInstructionStart;
        this.instructionList[i].y = (curStep + this.trajectoryFunction(this._xInstructionStart));
        curStep += this.trajectoryFunction(this._xInstructionStart) * this.trajectoryFuncStep;
      }

      this.comment.x = this._xCommentStart;
      this.comment.y = curStep + this.trajectoryFunction(this._xCommentStart);
    }
  }

  private update(): void {
    if (this.shouldUpdate() && this.flyBodyX >= this.currentInstruction.x) {
      this.currentInstruction.x += this.instructionShift;
      this.currentInstruction.color = this.visitedInstructionColor;
      if (this.instructionIdx + 1 < this.instructionList.length) {
        this.currentInstruction = this.instructionList[++this.instructionIdx];
      } else {
        this.currentInstruction = null;
      }
    }
  }

  private shouldUpdate(): boolean {
    return this.currentInstruction != null;
  }

  private _render(canvas: any) {
    let ctx = canvas.getContext('2d');
    for (let instruction of this.instructionList.concat(this.comment)) {
      ctx.font = instruction.fontSize + "px KBSticktoIt";
      ctx.fillStyle = instruction.color;
      ctx.fillText(instruction.instruction, instruction.x, instruction.y + instruction.fontSize);
    }
  }

  get xInstructionStart(): number {
    return this._xInstructionStart;
  }

  get xCommentStart(): number {
    return this._xCommentStart;
  }

  public getSetLength(): number {
    return this.instructionList.length;
  }

  public getCommentSize(): number {
    return this.comment.fontSize;
  }

  public setFlyBodyCords(x: number, y: number) {
    this.flyBodyX = x;
    this.flyBodyY = y;
  }

  public render(canvas: any) {
    this.update();
    this._render(canvas);
  }
}
