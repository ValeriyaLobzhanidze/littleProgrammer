import {Sprite} from "./Sprite";
import {CanvasAnimation} from "./CanvasAnimation";
import {Render} from "./Render";
import {RenderArcs} from "./RenderArcs";
import {DirectMoveAnimation} from "./DirectMoveAnimation";

export class DirectMoveLevel {

  private readonly spriteDx = 100;
  private readonly spriteDy = 100;
  private readonly spriteWidth = 30;
  private readonly spriteHeight = 38;
  private readonly numberOfFrames = 6;
  private readonly ticketsPerFrame = 4;

  private readonly spriteImageSrc = "/assets/images/radish.png";

  private sprite: Sprite;
  private spriteAnimation: CanvasAnimation;
  private readonly backgroundRenderFunction: Render;

  constructor(canvas: any) {
    this.backgroundRenderFunction = new RenderArcs(canvas.getContext('2d'), 3, 2,
      this.spriteDx + 40, this.spriteDy + 40);

    this.sprite = new Sprite(canvas, this.spriteImageSrc, this.spriteWidth, this.spriteHeight, this.numberOfFrames,
      this.ticketsPerFrame, this.spriteDx, this.spriteDy, [this.backgroundRenderFunction]);
  }

  public load(): void {
    this.sprite.start();
  }

  public activate(route: number[]): void {
    this.spriteAnimation = new DirectMoveAnimation(this.backgroundRenderFunction.getCords(), route, 0.7, this.spriteDx, this.spriteDy);
    this.sprite.setAnimation(this.spriteAnimation);
    this.sprite.activate();
  }
}
