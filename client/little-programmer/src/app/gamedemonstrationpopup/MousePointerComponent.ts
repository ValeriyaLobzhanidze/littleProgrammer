import {ComponentI} from "../engine/ComponentI";
import {MouseState} from "./MouseState";

export default class MousePointerComponent implements ComponentI {
  private curState: MouseState;
  private readonly image;
  private speed = 2.1;
  private x;
  private y;

  private curX;
  private curY;

  private width = 30;
  private height = 30;

  private readonly moveDownBarrier: number;
  private readonly moveLeftBarrier: number;

  private currentCordY: boolean;

  constructor(x: number, y: number, moveDownBarrier: number, moveLeftBarrier: number) {
    this.x = x;
    this.y = y;
    this.curX = x;
    this.curY = y;
    this.moveDownBarrier = moveDownBarrier;
    this.moveLeftBarrier = moveLeftBarrier;

    this.image = new Image(0, 0);
    this.image.src = "/assets/images/mouse-pointer.png";
    this.curState = MouseState.STABLE;
  }

  public activate() {
    this.curState = MouseState.MOVE_DOWN;
    this.currentCordY = true;
  }

  public isActive(): boolean {
    return !(this.curState == MouseState.STABLE);
  }

  private _render(canvas: any) {
    let ctx = canvas.getContext('2d');
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  private update() {
    if (this.curState == MouseState.MOVE_DOWN) {
      if (this.curY >= this.moveDownBarrier) {
        if (this.speed > 0) {
          this.speed *= -1;
        }
        this.curX += this.speed;
        this.curY += this.speed;
        this.currentCordY = false;
        this.curState = MouseState.MOVE_LEFT;
      }

    } else if (this.curState == MouseState.MOVE_LEFT) {
      if (this.curX <= this.moveLeftBarrier) {
        this.curState = MouseState.STABLE;
      }
    }

    if (this.curState != MouseState.STABLE) {
      this.x = this.curX;
      this.y = this.curY;
      if (this.currentCordY) {
        this.curY += this.speed;
      } else {
        this.curX += this.speed;
      }
    }
  }

  render(canvas: any) {
    this.update();
    this._render(canvas);
  }

}
