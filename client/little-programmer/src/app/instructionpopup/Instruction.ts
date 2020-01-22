export default class Instruction {
  private instruction: string;
  private color: string = "pink";
  private x: number = 0;
  private y: number = 0;

  constructor(instruction: string, color?: string, x?: number, y?: number) {
    this.instruction = instruction;
    this.color = color;
    this.x = x;
    this.y = y;
  }

  public getInstruction(): string {
    return this.instruction;
  }

  public getColor(): string {
    return this.color;
  }
}
