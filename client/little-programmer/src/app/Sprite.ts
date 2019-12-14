import {State} from "./State";
import {CanvasAnimation} from "./CanvasAnimation";
import {MatrixRender} from "./MatrixRender";
import {SharedService} from "./SharedService";

export class Sprite {
  private state: State = State.STABLE;

  private readonly spriteWidth = 30;
  private readonly spriteHeight = 38;
  private readonly numberOfFrames = 6;
  private readonly ticketsPerFrame = 4;

  private frameIndex = 0;
  private tickCount = 0;
  private canvas: any;
  private readonly image;

  private spriteAnimation: CanvasAnimation;
  private backgroundRenderFunction: MatrixRender;
  private sharedService: SharedService;

  private dx: number;
  private dy: number;

  constructor(canvas: any, sharedService: SharedService) {
    this.canvas = canvas;
    this.image = new Image(0, 0);
    this.image.src = "/assets/images/radish.png";
    this.sharedService = sharedService;
  }

  private clear(): void {
    let ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private callBackgroundRenderFunctions() {
    if (this.backgroundRenderFunction != null) {
      this.backgroundRenderFunction.render();
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
      if (!this.spriteAnimation.shouldEnd() && this.spriteAnimation.getNumOfLastErrLine() == -1) {
        let cords = this.spriteAnimation.update();
        this.dx = cords.dx;
        this.dy = cords.dy;
      } else {
        this.state = State.STABLE;
        this.sharedService.completeLevel();
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

  public getCords(): { x: number, y: number } {
    return {x: this.dx, y: this.dy};
  }

  public setBackgroundRenderFunction(back: MatrixRender): void {
    this.backgroundRenderFunction = back;
  }

  public getSpriteWidth(): number {
    return this.spriteWidth;
  }

  public getSpriteHeight(): number {
    return this.spriteHeight;
  }

  public setDx(dx: number){
    this.dx = dx;
  }

  public setDy(dy: number){
    this.dy = dy;
  }
}
