import {State} from "./State";
import {Animation} from "./Animation";
import {SpriteAnimation} from "./SpriteAnimation";
import {ComponentI} from "../engine/ComponentI";
import {DirectMoveFunction} from "./DirectMoveFunction";
import {SharedService} from "../SharedService";
import {Subscription} from "rxjs";
import Point from "./Point";
import DirectionValue from "../util/DirectionValue";

/**
 *
 *
 * */
export default class SpriteComponent implements ComponentI {
  // private state: State = State.STABLE;

  private readonly spriteWidth = 30;
  private readonly spriteHeight = 38;
  private readonly numberOfFrames = 6;
  private readonly ticksPerFrame = 3;
  private tickCount = 0;
  private frameIndex = 0;
  private readonly image;

  // private animation: Animation;
  // private readonly numOfCols: number;
  // private readonly numOfRows: number;
  // private readonly matrixCords: Point[];
  // private readonly targetCords: Point[];

  // private visitedCords = [];
  // private animatedTargets = [];
  // private targetAnimateDy = 1.2;

  private x: number = 0;
  private y: number = 0;
  private readonly sharedService: SharedService;

  private subscription: Subscription;
  private readonly isPopUpUsed: boolean;

  constructor(matrixCords: Point[], targetCords: Point[],
              numOfRows: number, numOfCols: number, route ?: DirectionValue [],
              sharedService?: SharedService, isPopUpUsed = true) {

    this.image = new Image(0, 0);
    this.image.src = "/assets/images/radish.png";

    this.x = matrixCords[0].x;
    this.y = matrixCords[0].y;

    // this.targetCords = targetCords;
    // this.matrixCords = matrixCords;
    // this.numOfCols = numOfCols;
    // this.numOfRows = numOfRows;

    this.sharedService = sharedService;
    this.isPopUpUsed = isPopUpUsed;

    if (route) {
      this.setAnimation(route);
    } else {
      if (sharedService) {
        this.subscribeForGettingCodeLines();
      }
    }
  }

  public subscribeForGettingCodeLines(){
    this.subscription = this.sharedService.codeLineData$.subscribe(directionList => {
      this.setAnimation(directionList);
    });
  }

  public unsubscribeFromGettingCodeLines() {
    this.subscription.unsubscribe();
  }

  public setAnimation(route: { direction: DirectMoveFunction, val: number } []) {
    // this.animation = new SpriteAnimation(this.matrixCords, this.numOfRows, this.numOfCols, route);
    // this.state = State.ACTIVE;
  }

  public render(canvas: any): void {
    this._update();

    let ctx = canvas.getContext('2d');//TODO: move to CanvasLib
    ctx.drawImage(this.image,
      this.frameIndex * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x - this.spriteWidth / 2,
      this.y - this.spriteHeight / 2,
      this.spriteWidth,
      this.spriteHeight);
  }

  // private handleIfTarget(dx, dy) {
  //   let result = [];
  //
  //   for (let target of this.targetCords) {
  //     let conditionX = (dx < (target.x + this.spriteWidth / 2) && dx > (target.x - this.spriteWidth / 2));
  //     let conditionY = (dy < (target.y + this.spriteHeight / 2) && dy > (target.y - this.spriteHeight / 2));
  //     let existenceCond = !this.isInclude(this.visitedCords, target);
  //     if (conditionX && conditionY && existenceCond) {
  //       result.push(target);
  //     }
  //   }
  //
  //   if (result.length > 0) {
  //     this.visitedCords.push(result[0]);
  //     this.animatedTargets.push(result[0]);
  //     if (this.sharedService) {
  //       this.sharedService.incrementScore();
  //     }
  //   }
  // }

  // private animateTargets() {
  //   for (let target of this.animatedTargets) {
  //     if (target.y > 0) {
  //       target.y -= this.targetAnimateDy;
  //     } else {
  //       let index = this.animatedTargets.indexOf(target);
  //       if (index != -1) {
  //         this.animatedTargets.splice(this.animatedTargets.indexOf(target), 1);
  //       }
  //       index = this.targetCords.indexOf(target);
  //       if (index != -1) {
  //         this.targetCords.splice(index, 1);
  //       }
  //     }
  //   }
  // }

  private isInclude(arr: { x: number, y: number }[], targetElem: { x: number, y: number }): boolean {
    return arr.indexOf(targetElem) != -1;
  }

  private _update(){
    this.tickCount++;
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      if (this.frameIndex < this.numberOfFrames - 1) {
        this.frameIndex++;
      } else {
        this.frameIndex = 0;
      }
    }
  }

  private update() {
    // this.tickCount++;

    // if (this.state == State.ACTIVE && this.animation != null) {
    //   if (!this.animation.shouldEnd()) {
    //     let cords = this.animation.update();
    //     if (cords != null) {
    //       this.handleIfTarget(cords.dx, cords.dy);
    //       this.animateTargets();
    //       this.dx = cords.dx;
    //       this.dy = cords.dy;
    //     } else {
    //       this.state = State.STABLE;
    //       if (this.sharedService) {
    //         let popUpProps;
    //         popUpProps = {
    //           headerContent: "Error in " + this.animation.getNumOfLastErrLine() + " line"
    //         };
    //         // this.sharedService.showPopUp([new PopUpContent(popUpProps)]);
    //       }
    //     }
    //
    //   } else {
    //     this.state = State.STABLE;
    //     if (this.sharedService && this.isPopUpUsed) {
    //       let popUpProps;
    //       let headerContent = "Wonderful!";
    //       let buttonValue = "Thanks!";
    //
    //       if (this.visitedCords.length < this.targetCords.length) {
    //         headerContent = "You haven't visited " + (this.targetCords.length - this.visitedCords.length) + " points!";
    //         buttonValue = "Ok!";
    //       }
    //
    //       popUpProps = {
    //         headerContent: headerContent,
    //         buttonValue: buttonValue
    //       };
    //
    //       // this.sharedService.showPopUp([new PopUpContent(popUpProps)]);
    //     }
    //   }
    // }

    // if (this.tickCount > this.ticksPerFrame) {
    //   this.tickCount = 0;
    //   if (this.frameIndex < this.numberOfFrames - 1) {
    //     this.frameIndex++;
    //   } else {
    //     this.frameIndex = 0;
    //   }
    // }

    // if (this.animatedTargets.length > 0) {
    //   this.animateTargets();
    // }
  }
}
