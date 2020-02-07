import {Component, OnInit} from '@angular/core';
import {SharedService} from "../SharedService";
import RoundGridComponent from "../level1/RoundGridComponent";
import Level from "../engine/Level";
import InstructionSetComponent from "../instructionsetpopup/InstructionSetComponent";
import Instruction from "../instructionsetpopup/Instruction";
import GameProcessDemonstrationComponent from "../gamedemonstrationpopup/GameProcessDemonstrationComponent";
import SyntaxDemonstrationComponent from "../syntaxdemonstrationpopup/SyntaxDemonstrationComponent";
import HintComponent from "../hintpopup/HintComponent";
import ComponentBuilderService from "../ComponentBuilderService";
import ProgrammingExplanationProps from "../programming-explanation/ProgrammingExplanationProps";
import PopUpEventProps from "../PopUpEventProps";
import {ProgrammingExplanationComponent} from "../programming-explanation/programming-explanation.component";
import {GameDemonstrationPopUpComponent} from "../game-demonstration-pop-up/game-demonstration-pop-up.component";

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

    let popUpProps = new PopUpEventProps();
    popUpProps.componentPropList = [list1, list2, list3];
    popUpProps.buttonValue = "Ok";
    popUpProps.type = ProgrammingExplanationComponent;

    this.sharedService.showPopUp(popUpProps);
  }

  private showGame() {
    let listProps = { header: "Help radish visit all purple points!" };
    let popUpProps = new PopUpEventProps();
    popUpProps.componentPropList = [listProps];
    popUpProps.buttonValue = "Ok";
    popUpProps.type = GameDemonstrationPopUpComponent;
    this.sharedService.showPopUp(popUpProps);
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
