import SpriteComponent from "./SpriteComponent";
import {ComponentI} from "../engine/ComponentI";
import Level1RootComponentProps from "./Level1RootComponentProps";
import RoundGridComponentAssetsBuilder from "./RoundGridComponentAssetsBuilder";
import SpriteComponentProps from "./SpriteComponentProps";
import {CirclePoint} from "./CirclePoint";
import TargetComponent from "./TargetComponent";
import DraggableLineComponent from "./DraggableLineComponent";
import RoundGridComponent from "./RoundGridComponent";
import PopUpEventProps from "../popup/PopUpEventProps";
import SimplePopUpProps from "../simple-pop-up/SimplePopUpProps";
import {SimplePopUpComponent} from "../simple-pop-up/simple-pop-up.component";
import {SharedService} from "../SharedService";
import RoundGridComponentAssets from "./RoundGridComponentAssets";

export default class Level1RootComponent implements ComponentI {
  private targetComponents: TargetComponent[] = [];
  private spriteComponent: SpriteComponent;
  private dragLineComponent: DraggableLineComponent;
  private roundGridComponent: RoundGridComponent;
  private sharedService: SharedService;
  private assets: RoundGridComponentAssets;

  constructor() {
  }

  init(props: Level1RootComponentProps) {
    this.assets = new RoundGridComponentAssetsBuilder().build(props);
    this.roundGridComponent = new RoundGridComponent(this.assets.matrixPoints);

    let spriteProps = new SpriteComponentProps();
    spriteProps.sharedService = props.sharedService;
    spriteProps.matrixCords = this.assets.matrixPoints;
    spriteProps.route = this.assets.defaultRoute;
    this.spriteComponent = new SpriteComponent(spriteProps);

    for (let target of this.assets.targetPoints) {
      this.targetComponents.push(new TargetComponent(target, props.sharedService));
    }
    this.dragLineComponent = new DraggableLineComponent(this.assets.matrixPoints);
    this.sharedService = props.sharedService;
    this.sharedService.closePopUp$.subscribe(() => this.returnToStartCondition())
  }

  private returnToStartCondition() {
    this.targetComponents = [];
    for (let target of this.assets.targetPoints) {
      this.targetComponents.push(new TargetComponent(target, this.sharedService));
    }
    this.spriteComponent.clearCurrentAnimation();
    this.sharedService.clearScore();
  }

  public render(canvas: any): void {
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.roundGridComponent.render(canvas);
    let spritePoint = this.spriteComponent.getCurPoint();
    for (let target of this.targetComponents) {
      target.activateIfTarget(spritePoint);
      target.render(canvas);
    }
    this.dragLineComponent.render(canvas);
    this.spriteComponent.render(canvas);
    if (this.spriteComponent.wasActivated() && !this.spriteComponent.isActive()) {
      this.handleEndOfAnimation();
    }
  }

  private handleEndOfAnimation() {
    let activatedTargets = this.targetComponents.filter(e => e.wasActivated());
    let popUpHeader;
    let popUpPic;
    if (activatedTargets.length === this.targetComponents.length) {
      popUpHeader = "Wonderful!";
      popUpPic = 'assets/images/clap.png';
    } else {
      let diff = this.targetComponents.length - activatedTargets.length;
      popUpHeader = "You haven't visited " + diff + " point!";
      popUpPic = 'assets/images/sad-robot.png';
    }
    let popUpProps = this.createPopUpEventProps(popUpPic, popUpHeader);
    this.sharedService.showPopUp(popUpProps);
  }

  private createPopUpEventProps(imageSrc: string, header: string): PopUpEventProps[] {
    let simplePopUpProps = new SimplePopUpProps();
    simplePopUpProps.imageSrc = imageSrc;
    simplePopUpProps.header = header;
    let popUpEventProps = new PopUpEventProps();
    popUpEventProps.componentProps = simplePopUpProps;
    popUpEventProps.type = SimplePopUpComponent;
    return [popUpEventProps];
  }

  public unsubscribeFromGettingCodeLines() {
    this.spriteComponent.unsubscribeFromGettingCodeLines();
  }

  public subscribeForGettingCodeLines() {
    this.spriteComponent.subscribeForGettingCodeLines();
  }

  public getCords(): CirclePoint[][] {
    return this.roundGridComponent.getCords();
  }

  public getAmountOfTargets(): number {
    return this.targetComponents.length;
  }

  public onMouseDown(x: number, y: number): void {
    this.dragLineComponent.onMouseDown(x, y);
  }

  public onMouseMove(x: number, y: number): void {
    this.dragLineComponent.onMouseMove(x, y);
  }

  public onMouseUp(): void {
    this.dragLineComponent.onMouseUp();
  }
}
