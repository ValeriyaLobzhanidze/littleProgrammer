import {Component, OnInit, Type} from '@angular/core';
import {SharedService} from "../SharedService";
import Level1RootComponent from "../level1/Level1RootComponent";
import InstructionSetComponent from "../instructionset/InstructionSetComponent";
import ComponentBuilderService from "../ComponentBuilderService";
import ProgrammingExplanationProps from "../programming-explanation/ProgrammingExplanationProps";
import PopUpEventProps from "../popup/PopUpEventProps";
import {ProgrammingExplanationComponent} from "../programming-explanation/programming-explanation.component";
import {CanvasComponent} from "../canvascomponent/canvas.component";
import CanvasProps from "../canvascomponent/CanvasProps";
import GameProcessDemonstrationComponent from "../gameprocessdemonstration/GameProcessDemonstrationComponent";
import SyntaxDemonstrationComponent from "../syntaxdemonstrationpopup/SyntaxDemonstrationComponent";
import HintComponent from "../hintpopup/HintComponent";
import Level1RootComponentProps from "../level1/Level1RootComponentProps";
import GameProcessDemonstrationProps from "../gameprocessdemonstration/GameProcessDemonstrationProps";
import SyntaxDemonstrationComponentProps from "../syntaxdemonstrationpopup/SyntaxDemonstrationComponentProps";
import InstructionSetProps from "../instructionset/InstructionSetProps";

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

  private createCanvasProps(header: string, rootComponentType: Type<any>, rootComponentProps: any): CanvasProps {
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
    let list1RootComponentProps = new Level1RootComponentProps();
    list1RootComponentProps.canvasWidth = this.canvasWidth;
    list1RootComponentProps.canvasHeight = this.canvasHeight;
    list1RootComponentProps.isDefaultRoute = true;
    list1RootComponentProps.isDefaultTarget = true;
    list1RootComponentProps.isPopUpUsed = false;

    let list1 = this.createCanvasProps("Help radish visit all purple points!", Level1RootComponent, list1RootComponentProps);
    let popUpProps1 = this.createPopUpProps(list1, CanvasComponent);

    let list2RootComponentProps = new InstructionSetProps();
    list2RootComponentProps.instructionList = ["moveRight(*)", "moveLeft(*)", "moveDown(*)", "moveUp(*)"];
    list2RootComponentProps.comment = "* amount of steps";
    let list2 = this.createCanvasProps("You can use commands:", InstructionSetComponent, list2RootComponentProps);
    let popUpProps2 = this.createPopUpProps(list2, CanvasComponent);

    let list3RootComponentProps = new GameProcessDemonstrationProps();

    list3RootComponentProps.canvasWidth = this.canvasWidth;
    list3RootComponentProps.canvasHeight = this.canvasHeight;
    list3RootComponentProps.inputs = ["moveRight(5);"];
    list3RootComponentProps.sharedService = this.sharedService;
    list3RootComponentProps.buttonHeight = 50;
    list3RootComponentProps.buttonWidth = 150;
    list3RootComponentProps.inputWidth = 250;
    list3RootComponentProps.inputHeight = 50;
    list3RootComponentProps.buttonText = "Execute!";

    let list3 = this.createCanvasProps("For example:", GameProcessDemonstrationComponent, list3RootComponentProps);
    let popUpProps3 = this.createPopUpProps(list3, CanvasComponent);

    let list4RootComponentProps = new SyntaxDemonstrationComponentProps();
    list4RootComponentProps.inputLines = ["moveRight(5", "moveRight(5)", "moveRight(5);"];
    list4RootComponentProps.commentList = ["If you are wrong,", "commands become red"];
    list4RootComponentProps.isSeveralInputNeeded = false;
    list4RootComponentProps.canvasHeight = this.canvasHeight;
    list4RootComponentProps.canvasWidth = this.canvasWidth;

    let list4 = this.createCanvasProps("Be careful!", SyntaxDemonstrationComponent, list4RootComponentProps);
    let popUpProps4 = this.createPopUpProps(list4, CanvasComponent);

    let list5RootComponentProps = new SyntaxDemonstrationComponentProps();
    list5RootComponentProps.commentList = [];
    list5RootComponentProps.inputLines = ["moveRight(5);", "moveLeft(5);", "moveDown(5);"];
    list5RootComponentProps.isSeveralInputNeeded = true;
    list5RootComponentProps.canvasHeight = this.canvasHeight;
    list5RootComponentProps.canvasWidth = this.canvasWidth;

    let list5 = this.createCanvasProps("Note, one line - one command!", SyntaxDemonstrationComponent, list5RootComponentProps);
    let popUpProps5 = this.createPopUpProps(list5, CanvasComponent);

    this.sharedService.showPopUp([popUpProps1, popUpProps2, popUpProps3, popUpProps4, popUpProps5]);
  }
}
