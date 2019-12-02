import {State} from "./State";
import {CanvasAnimation} from "./CanvasAnimation";
import {Render} from "./Render";

export class Sprite {
  public state: State = State.STABLE;

  public ctx;
  public image;
  public frameIndex = 0;
  public tickCount = 0;

  public ctxWidth: number;
  public ctxHeight: number;
  public spriteWidth: number;
  public spriteHeight: number;
  public numberOfFrames: number;
  public ticketsPerFrame: number;

  public animation: CanvasAnimation;
  public renderFuncList: Render[];

  public dx: number;
  public dy: number;


  constructor(ctx, image, ctxWidth: number, ctxHeight: number, spriteWidth: number, spriteHeight: number,
              numberOfFrames: number, ticketsPerFrame: number, animation: CanvasAnimation, dx: number, dy: number) {
    this.ctx = ctx;
    this.image = image;
    this.ctxWidth = ctxWidth;
    this.ctxHeight = ctxHeight;
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
    this.numberOfFrames = numberOfFrames;
    this.ticketsPerFrame = ticketsPerFrame;
    this.animation = animation;
    this.dx = dx;
    this.dy = dy;
  }

  public start(): void {
    let loop = () => {
      this.update();
      this.render();
      window.requestAnimationFrame(loop);
    };
    window.requestAnimationFrame(loop);
  }

  public render(): void {
    this.ctx.clearRect(0, 0, this.ctxWidth, this.ctxHeight);

    for(let renderFunc of this.renderFuncList){
      renderFunc.render();
    }

    this.ctx.drawImage(this.image,
      this.frameIndex * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.dx,
      this.dy,
      this.spriteWidth,
      this.spriteHeight);
  }

  public update() {
    this.tickCount++;

    if (this.state == State.ACTIVE) {
      if (!this.animation.shouldEnd()) {
        let cords = this.animation.update();
        this.dx = cords.dx;
        this.dy = cords.dy;
      } else {
        this.state = State.STABLE;
      }
    }

    if (this.tickCount > this.ticketsPerFrame) {
      this.tickCount = 0;
      if (this.frameIndex < this.numberOfFrames - 1) {
        this.frameIndex++;
      } else {
        this.frameIndex = 0;
      }
    }
  }
}
