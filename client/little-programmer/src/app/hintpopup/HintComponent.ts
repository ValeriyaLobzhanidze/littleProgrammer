import {ComponentI} from "../engine/ComponentI";
import RoundGridComponent from "../level1/RoundGridComponent";
import {HintComponentState} from "./HintComponentState";

export default class HintComponent implements ComponentI {
  private roundGridComponent;
  private curTick = 0;
  private amountOfTicks = 12;

  private readonly amountOfHorDragStep: number;
  private readonly amountOfVertDragStep: number;
  private curStep = 0;

  private curState = HintComponentState.DRAG_RIGHT;

  constructor(gridWidth: number, gridHeight) {
    this.roundGridComponent = new RoundGridComponent(gridWidth, gridHeight, false, null,
      0, 0, false, false);
    this.roundGridComponent.setHorizontalDirOfDrag();
    this.roundGridComponent.setStartDragPoint(this.roundGridComponent.getCords()[this.roundGridComponent.getAmountOfCols() * 2].x,
      this.roundGridComponent.getCords()[this.roundGridComponent.getAmountOfCols() * 2].y);
    this.amountOfHorDragStep = this.roundGridComponent.getAmountOfCols() - 1;
    this.amountOfVertDragStep = this.roundGridComponent.getAmountOfRows() - 3;
  }

  private changeState(): void {
    switch (this.curState) {
      case HintComponentState.DRAG_RIGHT:
        if (this.curStep < this.amountOfHorDragStep) {
          this.roundGridComponent.setDragAmountOfSteps(this.curStep + 1);
          this.curStep++;
        } else {
          this.roundGridComponent.setDragAmountOfSteps(0);
          let startCord = this.roundGridComponent.getAmountOfCols() * 2;
          let lastCordX = this.roundGridComponent.getCords()[startCord + this.amountOfHorDragStep].x;
          let lastCordY = this.roundGridComponent.getCords()[startCord + this.amountOfHorDragStep].y;
          this.roundGridComponent.setStartDragPoint(lastCordX, lastCordY);
          this.roundGridComponent.setVerticalDirOfDrag();
          this.curState = HintComponentState.DRAG_DOWN;
          this.curStep = 0;
        }
        break;
      case HintComponentState.DRAG_DOWN:
        if (this.curStep < this.amountOfVertDragStep) {
          this.roundGridComponent.setDragAmountOfSteps(this.curStep + 1);
          this.curStep++;
        } else {
          this.roundGridComponent.setDragAmountOfSteps(0);
          let startCord = this.roundGridComponent.getAmountOfCols() * (2 + this.amountOfVertDragStep);
          let lastCordX = this.roundGridComponent.getCords()[startCord + this.amountOfHorDragStep].x;
          let lastCordY = this.roundGridComponent.getCords()[startCord + this.amountOfHorDragStep].y;
          this.roundGridComponent.setStartDragPoint(lastCordX, lastCordY);
          this.roundGridComponent.setHorizontalDirOfDrag();
          this.curState = HintComponentState.DRAG_LEFT;
          this.curStep = 0;
        }
        break;
      case HintComponentState.DRAG_LEFT:
        if (this.curStep < this.amountOfHorDragStep) {
          this.roundGridComponent.setDragAmountOfSteps((this.curStep + 1) * -1);
          this.curStep++;
        } else {
          this.roundGridComponent.setDragAmountOfSteps(0);
          let startCord = this.roundGridComponent.getAmountOfCols() * (2 + this.amountOfVertDragStep + 1);//TODO:refactor
          let lastCordX = this.roundGridComponent.getCords()[startCord - this.amountOfHorDragStep - 1].x;
          let lastCordY = this.roundGridComponent.getCords()[startCord - this.amountOfHorDragStep - 1].y;
          this.roundGridComponent.setStartDragPoint(lastCordX, lastCordY);
          this.roundGridComponent.setVerticalDirOfDrag();
          this.curState = HintComponentState.DRAG_UP;
          this.curStep = 0;
        }
        break;
      case HintComponentState.DRAG_UP:
        if (this.curStep < this.amountOfVertDragStep) {
          this.roundGridComponent.setDragAmountOfSteps((this.curStep + 1) * -1);
          this.curStep++;
        } else {
          this.roundGridComponent.setDragAmountOfSteps(0);
          this.curState = HintComponentState.STABLE;
          return;
        }
        break;
      case HintComponentState.STABLE:
        return;
    }
  }

  render(canvas: any) {
    if (this.curTick == 0) {
      this.changeState();
    }

    this.roundGridComponent.render(canvas);

    if (this.curTick < this.amountOfTicks) {
      this.curTick++;
    } else {
      this.curTick = 0;
    }
  }

}
