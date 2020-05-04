export default class ParamsToChangeEntry {
  private _speed: number;
  private _gridColor: string;
  private _targetsColor: string;

  constructor(speed: number, gridColor: string, targetsColor: string) {
    this._speed = speed;
    this._gridColor = gridColor;
    this._targetsColor = targetsColor;
  }

  get speed(): number {
    return this._speed;
  }

  set speed(value: number) {
    this._speed = value;
  }

  get gridColor(): string {
    return this._gridColor;
  }

  set gridColor(value: string) {
    this._gridColor = value;
  }

  get targetsColor(): string {
    return this._targetsColor;
  }

  set targetsColor(value: string) {
    this._targetsColor = value;
  }
}
