import {State} from "../State";
import {CanvasAnimation} from "../CanvasAnimation";
import {ChildAnimation} from "./ChildAnimation";

export default class ChildComponent {
  private state: State = State.ACTIVE;

  private readonly spriteWidth = 30;
  private readonly spriteHeight = 38;

  private readonly numberOfFrames = 6;
  private readonly ticksPerFrame = 15;
  private tickCount = 0;

  private frameIndex = 0;
  private readonly image;

  private animation: CanvasAnimation;
  private targetCords;
  private visitedCords = [];

  private animatedTargets = [];
  private targetAnimateDy = 0.1;

  private dx: number = 0;
  private dy: number = 0;

  private startY;

  constructor(matrixCords, targetCords, numOfRows: number, numOfCols: number, route) {
    this.image = new Image(0, 0);
    this.image.src = "/assets/images/radish.png";

    this.dx = matrixCords[0].x;
    this.startY = this.dy = matrixCords[0].y;
    this.targetCords = targetCords;
    this.animation = new ChildAnimation(matrixCords, numOfRows, numOfCols, route);
  }

  public render(canvas: any): void {
    this.update();
    let ctx = canvas.getContext('2d');
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

  private handleIfTarget(dx, dy) {
    let result = this.targetCords.filter(cord => {
      return ((dx < (cord.x + this.spriteWidth / 2) && dx > (cord.x - this.spriteWidth / 2))
        && (dy < (cord.y + this.spriteHeight / 2) && dy > (cord.y - this.spriteHeight / 2))
        && !this.isInclude(this.visitedCords, cord));

    });

    if (result.length > 0) {
      this.visitedCords.push({x: result[0].x, y: result[0].y});
      this.animatedTargets.push(result[0]);
    }
  }

  private animateTargets() {
    for (let target of this.animatedTargets) {
      if (target.y > 0) {
        target.y -= this.targetAnimateDy;
      } else {
        let index = this.animatedTargets.indexOf(target);
        if (index != -1) {
          this.animatedTargets.splice(this.animatedTargets.indexOf(target), 1);
        }
        index = this.targetCords.indexOf(target);
        if (index != -1) {
          this.targetCords.splice(index, 1);
        }
      }
    }
  }

  private isInclude(arr: { x: number, y: number }[], targetElem: { x: number, y: number }): boolean {
    let result = arr.filter(elem => {
      return elem.x == targetElem.x && elem.y == targetElem.y
    });
    return result.length > 0;
  }

  private update() {
    this.tickCount++;

    if (this.state == State.ACTIVE && this.animation != null) {
      if (!this.animation.shouldEnd() && this.animation.getNumOfLastErrLine() == -1) {
        let cords = this.animation.update();
        this.handleIfTarget(cords.dx, cords.dy);
        this.animateTargets();
        this.dx = cords.dx;
        this.dy = cords.dy;
      } else {
        this.state = State.STABLE;
      }
    }

    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      if (this.frameIndex < this.numberOfFrames - 1) {
        this.frameIndex++;
      } else {
        this.frameIndex = 0;
      }
    }
  }
}
