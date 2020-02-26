import {ComponentI} from "../engine/ComponentI";
import {SharedService} from "../SharedService";
import {Subscription} from "rxjs";
import Point from "./Point";
import DirectionValue from "./DirectionValue";
import SpriteComponentProps from "./SpriteComponentProps";
import StateMachine from "../statemachine/StateMachine";
import DirectMoveStateMachineBuilder from "./DirectMoveStateMachineBuilder";

/**
 *
 *
 * */
export default class SpriteComponent implements ComponentI {
  private readonly spriteWidth;
  private readonly spriteHeight;
  private readonly numberOfFrames;
  private readonly ticksPerFrame;

  private tickCount = 0;
  private frameIndex = 0;
  private readonly image;

  private curPoint: Point;
  private readonly sharedService: SharedService;
  private subscription: Subscription;
  private stateMachine: StateMachine<Point>;
  private readonly matrixCords: Point[][];

  private static readonly SPEED = 1.0;

  constructor(props: SpriteComponentProps) {
    this.image = new Image(0, 0);
    this.image.src = props.image;
    this.curPoint = new Point(props.matrixCords[0][0].x, props.matrixCords[0][0].y);
    this.spriteWidth = props.spriteWidth;
    this.spriteHeight = props.spriteHeight;
    this.numberOfFrames = props.numberOfFrames;
    this.ticksPerFrame = props.ticksPerFrame;
    this.sharedService = props.sharedService;
    this.matrixCords = props.matrixCords;

    if (props.route) {
      this.initStateMachine(props.route);
    } else {
      if (this.sharedService) {
        this.subscribeForGettingCodeLines();
      }
    }
  }

  public subscribeForGettingCodeLines() {
    this.subscription = this.sharedService.codeLineData$.subscribe(directionList => {
      this.initStateMachine(directionList);
    });
  }

  public unsubscribeFromGettingCodeLines() {
    this.subscription.unsubscribe();
  }

  public initStateMachine(route: DirectionValue[]) {
    this.stateMachine = DirectMoveStateMachineBuilder.build(route, this.matrixCords, SpriteComponent.SPEED);
  }

  public render(canvas: any): void {
    let ctx = canvas.getContext('2d');
    ctx.drawImage(this.image,
      this.frameIndex * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.curPoint.x - this.spriteWidth / 2,
      this.curPoint.y - this.spriteHeight / 2,
      this.spriteWidth,
      this.spriteHeight);

    this.updateTickCount();
    if (this.stateMachine && this.stateMachine.isActive()) {
      this.curPoint = this.stateMachine.update();
    }
  }

  public getCurPoint(): Point {
    return this.curPoint;
  }

  public getNumOfLastErr(): number {
    return this.stateMachine.getNumOfLastErr();
  }

  public isActive(): boolean {
    return this.stateMachine.isActive();
  }

  private updateTickCount() {
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
}
