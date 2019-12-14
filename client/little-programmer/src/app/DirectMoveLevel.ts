import {Sprite} from "./Sprite";
import {CanvasAnimation} from "./CanvasAnimation";
import {MatrixRender} from "./MatrixRender";
import {MatrixArcs} from "./MatrixArcs";
import {DirectMoveAnimation} from "./DirectMoveAnimation";
import {DirectMoveFunction} from "./DirectMoveFunction";
import {SharedService} from "./SharedService";

export class DirectMoveLevel {

  private sprite: Sprite;
  private spriteAnimation: CanvasAnimation;
  private readonly backgroundRenderFunction: MatrixRender;
  private readonly sharedService: SharedService;

  constructor(sharedService: SharedService, canvas: any) {
    this.sharedService = sharedService;
    this.sprite = new Sprite(canvas, sharedService);
    this.backgroundRenderFunction = new MatrixArcs(canvas, this.sprite.getSpriteWidth() * 2.5, this.sprite.getSpriteHeight() * 2.5);
    let firstMatrixCord = this.backgroundRenderFunction.getCords()[0];
    this.sprite.setDx(firstMatrixCord.x);
    this.sprite.setDy(firstMatrixCord.y);
    this.sprite.setBackgroundRenderFunction(this.backgroundRenderFunction);
  }

  public load(): void {
    this.sprite.start();
  }

  public activate(directionList: { direction: DirectMoveFunction, val: number }[]): void {
    let spriteCords = this.sprite.getCords();

    this.spriteAnimation = new DirectMoveAnimation(this.sharedService, this.backgroundRenderFunction.getCords(),
      this.backgroundRenderFunction.getTargetCords(),
      directionList, this.backgroundRenderFunction.getNumOfRows(),
      this.backgroundRenderFunction.getNumOfCols(), 1.1, spriteCords.x, spriteCords.y, this.sprite.getSpriteWidth(),
      this.sprite.getSpriteHeight());

    this.sprite.setAnimation(this.spriteAnimation);
    this.sprite.activate();
  }

  public getAmountOfTargets(): number {
    return this.backgroundRenderFunction.getTargetCords().length;
  }
}
