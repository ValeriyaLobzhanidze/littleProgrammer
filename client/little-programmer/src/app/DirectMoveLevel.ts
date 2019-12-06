import {Sprite} from "./Sprite";
import {CanvasAnimation} from "./CanvasAnimation";
import {MatrixRender} from "./MatrixRender";
import {MatrixArcs} from "./MatrixArcs";
import {DirectMoveAnimation} from "./DirectMoveAnimation";

export class DirectMoveLevel {

  private sprite: Sprite;
  private spriteAnimation: CanvasAnimation;
  private readonly backgroundRenderFunction: MatrixRender;

  constructor(canvas: any) {
    this.sprite = new Sprite(canvas);
    this.backgroundRenderFunction = new MatrixArcs(canvas, this.sprite.getSpriteWidth() * 2.5, this.sprite.getSpriteHeight() * 2.5);
    this.sprite.setBackgroundRenderFunction(this.backgroundRenderFunction);
  }

  public load(): void {
    this.sprite.start();
  }

  public activate(route: number[]): void {
    let spriteCords = this.sprite.getCords();
    this.spriteAnimation = new DirectMoveAnimation(this.backgroundRenderFunction.getCords(), route, 0.7, spriteCords.x, spriteCords.y);
    this.sprite.setAnimation(this.spriteAnimation);
    this.sprite.activate();
  }
}
