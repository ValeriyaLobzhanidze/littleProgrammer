export default class Instruction {
  private _instruction: string;
  private _color: string = "rgba(187, 116, 251, 0.83)";
  private _x: number = 0;
  private _y: number = 0;
  private _size: number = 30;

  constructor(instruction: string, color = "rgba(187, 116, 251, 0.83)", size = 30) {
    this._instruction = instruction;
    this._color = color;
    this._size = size;
  }

  get instruction(): string {
    return this._instruction;
  }

  set instruction(value: string) {
    this._instruction = value;
  }

  get size(): number {
    return this._size;
  }

  set size(value: number) {
    this._size = value;
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
