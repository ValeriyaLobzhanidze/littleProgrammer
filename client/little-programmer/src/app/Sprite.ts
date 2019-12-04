import {State} from "./State";
import {CanvasAnimation} from "./CanvasAnimation";
import {Render} from "./Render";

export class Sprite {
  private state: State = State.STABLE;

  private readonly image;
  private frameIndex = 0;
  private tickCount = 0;
  private canvas: any;

  private readonly spriteWidth: number;
  private readonly spriteHeight: number;
  private readonly numberOfFrames: number;
  private readonly ticketsPerFrame: number;

  private spriteAnimation: CanvasAnimation;
  private readonly backgroundRenderFunctionsList: Render[];

  private dx: number;
  private dy: number;

  constructor(canvas: any, imageSrc: string, spriteWidth: number, spriteHeight: number, numberOfFrames: number,
              ticketsPerFrame: number, dx: number, dy: number, backList: Render[]) {
    this.canvas = canvas;
    this.image = new Image(0, 0);
    this.image.src = imageSrc;
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
    this.numberOfFrames = numberOfFrames;
    this.ticketsPerFrame = ticketsPerFrame;
    this.dx = dx;
    this.dy = dy;
    this.backgroundRenderFunctionsList = backList
  }

  private clear(): void {
    let ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private callBackgroundRenderFunctions() {
    if (this.backgroundRenderFunctionsList != null) {
      for (let func of this.backgroundRenderFunctionsList) {
        func.render();
      }
    }
  }

  public start(): void {
    let loop = () => {
      this.clear();
      this.callBackgroundRenderFunctions();
      this.update();
      this.render();
      window.requestAnimationFrame(loop);
    };
    window.requestAnimationFrame(loop);
  }

  private render(): void {
      let ctx = this.canvas.getContext('2d');
      ctx.drawImage(this.image,
        this.frameIndex * this.spriteWidth,
        0,
        this.spriteWidth,
        this.spriteHeight,
        this.dx,
        this.dy,
        this.spriteWidth,
        this.spriteHeight);
  }

  private update() {
    this.tickCount++;

    if (this.state == State.ACTIVE && this.spriteAnimation != null) {
      if (!this.spriteAnimation.shouldEnd()) {
        let cords = this.spriteAnimation.update();
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

  public setAnimation(animation: CanvasAnimation): void {
    this.spriteAnimation = animation;
  }

  public activate(): void {
    this.state = State.ACTIVE;
  }
}
