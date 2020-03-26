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
  private yShift: number;
  private xShift: number;

  constructor(instruction: string, x: number, y: number, yShift: number = 0,
              xShift: number = 0, size = ColoredText.FONT_SIZE, color = Global.LIGHT_PURPLE) {
    this.text = instruction;
    this.x = x;
    this.y = y;
    this.xShift = xShift;
    this.yShift = yShift;
    this.color = color;
    this.fontSize = size;
  }

  render(canvas: any) {
    CanvasLib.text(canvas, this.text, this.x + this.xShift, this.y + this.yShift, this.fontSize, Global.MAIN_FONT, this.color);
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
