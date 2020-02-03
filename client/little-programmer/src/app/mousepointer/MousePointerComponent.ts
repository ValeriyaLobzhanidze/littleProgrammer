import {ComponentI} from "../engine/ComponentI";
import DirectMoveAnimation from "./DirectMoveAnimation";
import {DirectMoveFunction} from "../level1/DirectMoveFunction";

export default class MousePointerComponent implements ComponentI {
  private readonly image;
  private x;
  private y;

  private width = 30;
  private height = 30;

  private animation;

  constructor(route: DirectMoveFunction[], cords: { x: number; y: number }[]) {
    this.x = cords[0].x;
    this.y = cords[0].y;
    this.image = new Image(0, 0);
    this.image.src = "/assets/images/mouse-pointer.png";
    this.animation = new DirectMoveAnimation(route, cords);
  }

  public activate() {
    this.animation.activate();
  }

  public isActive(): boolean {
    return this.animation.isActive();
  }

  private _render(canvas: any) {
    let ctx = canvas.getContext('2d');
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  render(canvas: any) {
    if (this.animation.isActive()) {
      let curCords = this.animation.update();
      this.x = curCords.x;
      this.y = curCords.y;
    }
    this._render(canvas);
  }

  public getState(): DirectMoveFunction {
    return this.animation.getState();
  }

  public getCords(): { x: number, y: number } {
    return this.animation.getCords();
  }

}
