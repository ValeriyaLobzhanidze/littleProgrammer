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

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {
  private readonly sharedService: SharedService;
  private readonly componentBuildService: ComponentBuilderService;

  // private canvasWidth = 400;
  // private canvasHeight = 350;

  constructor(sharedService: SharedService, componentBuildService: ComponentBuilderService) {
    this.sharedService = sharedService;
    this.componentBuildService = componentBuildService;
  }

  ngOnInit() {
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

    let popUpProps1 = new PopUpEventProps();
    popUpProps1.componentProps = list1;
    popUpProps1.type = ProgrammingExplanationComponent;

    let popUpProps2 = new PopUpEventProps();
    popUpProps2.componentProps = list2;
    popUpProps2.type = ProgrammingExplanationComponent;

    let popUpProps3 = new PopUpEventProps();
    popUpProps3.componentProps = list3;
    popUpProps3.type = ProgrammingExplanationComponent;

    this.sharedService.showPopUp([popUpProps1, popUpProps2, popUpProps3]);
  }

  private showGame() {
    let list1 = new CanvasProps();
    list1.header = "Help radish visit all purple points!";
    list1.canvasHeight = 300;
    list1.canvasWidth = 350;
    list1.rootComponent = new RoundGridComponent(350, 300);
    let popUpProps1 = new PopUpEventProps();
    popUpProps1.componentProps = list1;
    popUpProps1.type = CanvasComponent;

    let comment = new Instruction("* write amount of steps", "rgba(187, 116, 251, 0.83)",
      20);
    let instructionSet = [
      new Instruction("moveRight(*)"),
      new Instruction("moveLeft(*)"),
      new Instruction("moveDown(*)"),
      new Instruction("moveUp(*)")];

    let list2 = new CanvasProps();
    list2.header = "You can use commands:";
    list2.canvasHeight = 300;
    list2.canvasWidth = 350;
    list2.rootComponent = new InstructionSetComponent(instructionSet, comment);

    let popUpProps2 = new PopUpEventProps();
    popUpProps2.componentProps = list2;
    popUpProps2.type = CanvasComponent;

    this.sharedService.showPopUp([popUpProps1, popUpProps2]);
  }

  // private createHintContent(): PopUpContent[] {
  //   let content = [];
  //   let hintPageProps = {
  //     headerContent: "Hint",
  //     getLevel: this.createHintLevel.bind(this),
  //     canvasWidth: this.canvasWidth,
  //     canvasHeight: this.canvasHeight
  //   };
  //   content.push(new PopUpContent(hintPageProps));
  //   return content;
  // }

  // private createHintLevel(): Level {
  //   let rootComponent = new HintComponent(this.canvasWidth, this.canvasHeight);
  //   return new Level(rootComponent);
  // }
  //
  // private createGameDemonstrationLevel(): Level {
  //   let rootComponent = new RoundGridComponent(this.canvasWidth, this.canvasHeight);
  //   return new Level(rootComponent);
  // }
  //
  // private createInstructionLevel(): Level {
  //   let instructions = [new Instruction("moveRight(*)"),
  //     new Instruction("moveLeft(*)"),
  //     new Instruction("moveDown(*)"),
  //     new Instruction("moveUp(*)")];
  //   let comment = new Instruction("Instead of * write amount of steps", "rgba(187, 116, 251, 0.83)", 20);
  //   let rootComponent = new InstructionSetComponent(instructions, comment);
  //   return new Level(rootComponent);
  // }
  //
  // private createExamplePageLevel(): Level {
  //   let rootComponent = new GameProcessDemonstrationComponent(this.canvasWidth, this.canvasHeight, ["moveRight(5);"], this.sharedService, false);
  //   return new Level(rootComponent);
  // }
  //
  // private createSyntaxDemonstrationLevel(): Level {
  //   let textArr = ["moveRight(5", "moveRight(5)", "moveRight(5);"];
  //   let rootComponent = new SyntaxDemonstrationComponent(["If you are wrong,", "commands become red"], textArr);
  //   return new Level(rootComponent);
  // }
  //
  // private createSeveralLinesDemonstrationLevel(): Level {
  //   let textArr = ["moveRight(5);", "moveLeft(5);", "moveDown(5);"];
  //   let rootComponent = new SyntaxDemonstrationComponent([], textArr, true);
  //   return new Level(rootComponent);
  // }
  //
  // private createPopUpContent(): PopUpContent[] {
  //   let content = [];
  //   let animationPageProps = {
  //     headerContent: "Help radish visit all purple points!",
  //     getLevel: this.createGameDemonstrationLevel.bind(this),
  //     canvasWidth: this.canvasWidth,
  //     canvasHeight: this.canvasHeight
  //   };
  //   content.push(new PopUpContent(animationPageProps));
  //
  //   let instructionPageProps = {
  //     headerContent: "You can use commands:",
  //     getLevel: this.createInstructionLevel,
  //     canvasWidth: this.canvasWidth,
  //     canvasHeight: this.canvasHeight
  //   };
  //
  //   content.push(new PopUpContent(instructionPageProps));
  //
  //   let examplePageProps = {
  //     headerContent: "For example:",
  //     getLevel: this.createExamplePageLevel.bind(this),
  //     canvasWidth: this.canvasWidth,
  //     canvasHeight: this.canvasHeight
  //   };
  //   content.push(new PopUpContent(examplePageProps));
  //
  //   let syntaxPageProps = {
  //     headerContent: "Be careful!",
  //     getLevel: this.createSyntaxDemonstrationLevel.bind(this),
  //     canvasWidth: this.canvasWidth,
  //     canvasHeight: this.canvasHeight
  //   };
  //   content.push(new PopUpContent(syntaxPageProps));
  //
  //   let severalLinesPageProps = {
  //     headerContent: "Note, one line - one command!",
  //     getLevel: this.createSeveralLinesDemonstrationLevel.bind(this),
  //     canvasWidth: this.canvasWidth,
  //     canvasHeight: this.canvasHeight
  //   };
  //   content.push(new PopUpContent(severalLinesPageProps));
  //
  //   return content;
  // }

}
