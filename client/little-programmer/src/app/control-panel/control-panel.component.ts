import {Component, OnInit} from '@angular/core';
import {SharedService} from "../SharedService";
import RoundGridComponent from "../level1/RoundGridComponent";
import InstructionSetComponent from "../instructionset/InstructionSetComponent";
import Instruction from "../instructionset/Instruction";
import ComponentBuilderService from "../ComponentBuilderService";
import ProgrammingExplanationProps from "../programming-explanation/ProgrammingExplanationProps";
import PopUpEventProps from "../PopUpEventProps";
import {ProgrammingExplanationComponent} from "../programming-explanation/programming-explanation.component";
import {CanvasComponent} from "../canvascomponent/canvas.component";
import CanvasProps from "../canvascomponent/CanvasProps";
import GameProcessDemonstrationComponent from "../gameprocessdemonstration/GameProcessDemonstrationComponent";
import SyntaxDemonstrationComponent from "../syntaxdemonstrationpopup/SyntaxDemonstrationComponent";
import HintComponent from "../hintpopup/HintComponent";
import {root} from "rxjs/internal-compatibility";

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {
  private readonly sharedService: SharedService;
  private readonly componentBuildService: ComponentBuilderService;

  private canvasWidth = 350;
  private canvasHeight = 300;

  constructor(sharedService: SharedService, componentBuildService: ComponentBuilderService) {
    this.sharedService = sharedService;
    this.componentBuildService = componentBuildService;
  }

  ngOnInit() {
  }

  private onClear() {
    this.sharedService.clearCodeLinesInput();
  }

  private onLastTry() {
    this.sharedService.showLastAttempt();
  }

  private createPopUpProps(componentProps: any, type: any): PopUpEventProps {
    let popUpProps = new PopUpEventProps();
    popUpProps.componentProps = componentProps;
    popUpProps.type = type;
    return popUpProps;
  }

  private createCanvasProps(header: string, rootComponentType: any, rootComponentProps: any): CanvasProps {
    let props = new CanvasProps();
    props.header = header;
    props.canvasHeight = this.canvasHeight;
    props.canvasWidth = this.canvasWidth;
    props.rootComponentType = rootComponentType;
    props.rootComponentProps = rootComponentProps;
    return props;
  }

  public onHint() {
    let list = new CanvasProps();
    list.header = "Hint";
    list.canvasHeight = this.canvasHeight;
    list.canvasWidth = this.canvasWidth;
    list.rootComponentType = HintComponent;
    list.rootComponentProps = {
      width: this.canvasWidth,
      height: this.canvasHeight
    };

    let popUpProps = new PopUpEventProps();
    popUpProps.componentProps = list;
    popUpProps.type = CanvasComponent;

    this.sharedService.showPopUp([popUpProps]);
  }

  private showProgrammingExplanation() {
    let list1 = new ProgrammingExplanationProps();
    list1.lowerImageSource = "assets/images/arm.png";
    list1.lowerTextContent = "SOME TEXT SOME TEXT SOME TEXT SOME TEXT SOME TEXT SOME TEXT";
    list1.upperImageSource = "assets/images/deep-learning.png";
    list1.upperTextContent = "SOME TEXT SOME TEXT SOME TEXT SOME TEXT SOME TEXT SOME TEXT";

    let list2 = new ProgrammingExplanationProps();
    list2.lowerImageSource = "assets/images/robot-talk.png";
    list2.lowerTextContent = "SOME TEXT SOME TEXT SOME TEXT SOME TEXT SOME TEXT SOME TEXT";
    list2.upperImageSource = "assets/images/robot-conversation.png";
    list2.upperTextContent = "SOME TEXT SOME TEXT SOME TEXT SOME TEXT SOME TEXT SOME TEXT";

    let list3 = new ProgrammingExplanationProps();
    list3.lowerImageSource = "assets/images/handshake.png";
    list3.lowerTextContent = "SOME TEXT SOME TEXT SOME TEXT SOME TEXT SOME TEXT SOME TEXT";
    list3.upperImageSource = "assets/images/to-do-list.png";
    list3.upperTextContent = "SOME TEXT SOME TEXT SOME TEXT SOME TEXT SOME TEXT SOME TEXT";

    let popUpProps1 = this.createPopUpProps(list1, ProgrammingExplanationComponent);
    let popUpProps2 = this.createPopUpProps(list2, ProgrammingExplanationComponent);
    let popUpProps3 = this.createPopUpProps(list3, ProgrammingExplanationComponent);

    this.sharedService.showPopUp([popUpProps1, popUpProps2, popUpProps3]);
  }

  private showGame() {
    let list1RootComponentProps = {
      width: this.canvasWidth,
      height: this.canvasHeight,
      isDefaultRoute: true,
      sharedService: null,
      startCanvasX: 0,
      startCanvasY: 0,
      isDefaultTarget: true,
      isPopUpUsed: false
    };
    let list1 = this.createCanvasProps("Help radish visit all purple points!", RoundGridComponent, list1RootComponentProps);
    let popUpProps1 = this.createPopUpProps(list1, CanvasComponent);

    let comment = new Instruction("* write amount of steps", "rgba(187, 116, 251, 0.83)",
      20);
    let instructionArr = [
      new Instruction("moveRight(*)"),
      new Instruction("moveLeft(*)"),
      new Instruction("moveDown(*)"),
      new Instruction("moveUp(*)")];

    let list2RootComponentProps = {instructions: instructionArr, comment: comment};
    let list2 = this.createCanvasProps("You can use commands:", InstructionSetComponent, list2RootComponentProps);
    let popUpProps2 = this.createPopUpProps(list2, CanvasComponent);

    let list3RootComponentProps = {
      gridWidth: this.canvasWidth,
      gridHeight: this.canvasHeight,
      textArr: ["moveRight(5);"],
      sharedService: this.sharedService,
      isPopUpUsed: false
    };

    let list3 = this.createCanvasProps("For example:", GameProcessDemonstrationComponent, list3RootComponentProps);
    let popUpProps3 = this.createPopUpProps(list3, CanvasComponent);

    let list4RootComponentProps = {
      comment: ["If you are wrong,", "commands become red"],
      textArr: ["moveRight(5", "moveRight(5)", "moveRight(5);"],
      isSeveralInputNeeded: false
    };
    let list4 = this.createCanvasProps("For example:", SyntaxDemonstrationComponent, list4RootComponentProps);
    let popUpProps4 = this.createPopUpProps(list4, CanvasComponent);

    let list5RootComponentProps = {
      comment: [],
      textArr: ["moveRight(5);", "moveLeft(5);", "moveDown(5);"],
      isSeveralInputNeeded: true
    };
    let list5 = this.createCanvasProps("Note, one line - one command!", SyntaxDemonstrationComponent, list5RootComponentProps);
    let popUpProps5 = this.createPopUpProps(list5, CanvasComponent);

    this.sharedService.showPopUp([popUpProps1, popUpProps2, popUpProps3, popUpProps4, popUpProps5]);
  }
}
