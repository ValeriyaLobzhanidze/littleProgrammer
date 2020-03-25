import Global from "../global/Global";
import {ComponentI} from "../engine/ComponentI";
import CanvasLib from "../lib/CanvasLib";

export default class ColoredText implements ComponentI {
  private static readonly FONT_SIZE: number = 30;

  private readonly fontSize: number;
  private readonly text: string;
  private color: string;
  private x: number;
  private y: number;

  constructor(instruction: string, x: number, y: number, color = Global.LIGHT_PURPLE, size = ColoredText.FONT_SIZE) {
    this.text = instruction;
    this.x = x;
    this.y = y;

    this.color = color;
    this.fontSize = size;
  }

  render(canvas: any) {
    CanvasLib.text(canvas, this.text, this.x, this.y, this.fontSize, Global.MAIN_FONT, this.color);
  }

  public getX(): number {
    return this.x;
  }

  public getY(): number {
    return this.y;
  }

  public setX(value: number) {
    this.x = value;
  }

  public setColor(newColor: string) {
    this.color = newColor;
  }
}
