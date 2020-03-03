import Global from "../global/Global";

export default class Instruction {
  private readonly _instruction: string;
  private readonly _fontSize: number = 30;
  private _color: string;
  private _x: number = 0;
  private _y: number = 0;
  private readonly startColor: string;

  constructor(instruction: string, color = Global.LIGHT_PURPLE, size = 30) {
    this._instruction = instruction;
    this._color = color;
    this.startColor = color;
    this._fontSize = size;
  }

  public returnToStartValues(){
    this._color = this.startColor;
  }

  get instruction(): string {
    return this._instruction;
  }

  get fontSize(): number {
    return this._fontSize;
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
