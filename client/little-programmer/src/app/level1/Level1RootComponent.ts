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
import ParamsToChangeEntry from "./ParamsToChangeEntry";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export default class Level1RootComponent implements ComponentI {
  private targetComponents: TargetComponent[] = [];
  private spriteComponent: SpriteComponent;
  private dragLineComponent: DraggableLineComponent;
  private roundGridComponent: RoundGridComponent;
  private sharedService: SharedService;
  private assets: RoundGridComponentAssets;
  private isPopUpUsed: boolean;

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
    this.isPopUpUsed = props.isPopUpUsed;
    if (this.sharedService) {
      this.sharedService.closePopUp$.subscribe(() => this.returnToStartCondition());
      this.sharedService.changeLevelParams$.subscribe((params: ParamsToChangeEntry) => this.changeLevelParams(params));
    }
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
      if (this.isPopUpUsed) {
        this.handleEndOfAnimation();
      }
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
      popUpPic = 'assets/images/sad-robot-1.png';
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

  private changeTargetColor(color: string): void {
    for (let tComponent of this.targetComponents) {
      tComponent.changeColor(color);
    }
  }

  private changeLevelParams(params: ParamsToChangeEntry): void {
    if (params.speed != this.spriteComponent.getSpeed()) {
      this.spriteComponent.setSpeed(params.speed);
    }

    debugger;

    if (params.gridColor != this.roundGridComponent.getCords()[0][0].color) {
      this.roundGridComponent.changeColor(params.gridColor);
    }

    if (params.targetsColor != this.targetComponents[0].getColor()) {
      this.changeTargetColor(params.targetsColor);
    }
  }

  public getCurLevelParams(): ParamsToChangeEntry {
    return new ParamsToChangeEntry(this.spriteComponent.getSpeed(),
      this.roundGridComponent.getCords()[0][0].color, this.targetComponents[0].getColor());
  }
}
