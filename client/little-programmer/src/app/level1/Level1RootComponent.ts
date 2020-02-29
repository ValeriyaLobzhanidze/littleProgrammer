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

export default class Level1RootComponent implements ComponentI {
  private targetComponents: TargetComponent[] = [];
  private spriteComponent: SpriteComponent;
  private dragLineComponent: DraggableLineComponent;
  private roundGridComponent: RoundGridComponent;
  private sharedService: SharedService;

  constructor() {
  }

  init(props: Level1RootComponentProps) {
    let assets = new RoundGridComponentAssetsBuilder().build(props);
    this.roundGridComponent = new RoundGridComponent(assets.matrixPoints);

    let spriteProps = new SpriteComponentProps();
    spriteProps.sharedService = props.sharedService;
    spriteProps.matrixCords = assets.matrixPoints;
    spriteProps.route = assets.defaultRoute;
    this.spriteComponent = new SpriteComponent(spriteProps);

    for (let target of assets.targetPoints) {
      this.targetComponents.push(new TargetComponent(target, props.sharedService));
    }
    this.dragLineComponent = new DraggableLineComponent(assets.matrixPoints);
    this.sharedService = props.sharedService;

    this.sharedService.closePopUp$.subscribe( () => this.spriteComponent.clearCurrentAnimation());
  }

  public render(canvas: any): void {
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.roundGridComponent.render(canvas);
    this.dragLineComponent.render(canvas);
    let spritePoint = this.spriteComponent.getCurPoint();
    for (let target of this.targetComponents) {
      target.activateIfTarget(spritePoint);
      target.render(canvas);
    }
    this.spriteComponent.render(canvas);
    if (this.spriteComponent.wasActivated() && !this.spriteComponent.isActive()) {
      this.handleEndOfAnimation();

    }
  }

  private handleEndOfAnimation() {
    let activatedTargets = this.targetComponents.filter(e => e.wasActivated());
    if (activatedTargets.length === this.targetComponents.length) {

    } else {
      let diff = this.targetComponents.length - activatedTargets.length;
      let popUpProps = this.createFailPopUp(diff);
      this.sharedService.showPopUp(popUpProps);
    }
  }

  private createSuccessPopUp(): PopUpEventProps[] {
    let simplePopUpProps = new SimplePopUpProps();
    simplePopUpProps.imageSrc = '';
    simplePopUpProps.header = 'Wonderful!';
    let popUpEventProps = new PopUpEventProps();
    popUpEventProps.componentProps = simplePopUpProps;
    popUpEventProps.type = SimplePopUpComponent;
    return [popUpEventProps];
  }

  private createFailPopUp(amountOfNotVisited: number): PopUpEventProps[] {
    let simplePopUpProps = new SimplePopUpProps();
    simplePopUpProps.imageSrc = 'assets/images/sad-robot.png';
    simplePopUpProps.header = "You haven't visited " + amountOfNotVisited + " point!";
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
