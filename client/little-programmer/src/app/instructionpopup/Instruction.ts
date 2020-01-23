export default class Instruction {
  private _instruction: string;
  private _color: string = "rgba(187, 116, 251, 0.83)";
  private _x: number = 0;
  private _y: number = 0;

  constructor(instruction: string) {
    this._instruction = instruction;
  }

  get instruction(): string {
    return this._instruction;
  }

  set instruction(value: string) {
    this._instruction = value;
  }

  get color(): string {
    return this._color;
  }

  set color(value: string) {
    this._color = value;
  }

  get x(): number {
    return this._x;
  }

  set x(value: number) {
    this._x = value;
  }

  get y(): number {
    return this._y;
  }

  set y(value: number) {
    this._y = value;
  }
}
