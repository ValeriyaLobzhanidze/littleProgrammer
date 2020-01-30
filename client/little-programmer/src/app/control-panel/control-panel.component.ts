import {Component, OnInit} from '@angular/core';
import {SharedService} from "../SharedService";
import PopUpContent from "../popup/PopUpContent";
import RoundGridComponent from "../level1/RoundGridComponent";
import Level from "../engine/Level";
import InstructionSetComponent from "../instructionsetpopup/InstructionSetComponent";
import Instruction from "../instructionsetpopup/Instruction";
import GameProcessDemonstrationComponent from "../gamedemonstrationpopup/GameProcessDemonstrationComponent";
import SyntaxDemonstrationComponent from "../syntaxdemonstrationpopup/SyntaxDemonstrationComponent";

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {
  public sharedService: SharedService;
  private taskPopUpContent: PopUpContent[];
  private isTaskContentInit = false;

  private canvasWidth = 400;
  private canvasHeight = 350;

  constructor(sharedService: SharedService) {
    this.sharedService = sharedService;
  }

  ngOnInit() {
  }

  onTask(): void {
    if (!this.isTaskContentInit) {
      this.taskPopUpContent = this.createPopUpContent();
    }
    this.sharedService.showPopUp(this.taskPopUpContent);
  }

  private createGameDemonstrationLevel(): Level {
    let rootComponent = new RoundGridComponent(this.canvasWidth, this.canvasHeight);
    return new Level(rootComponent);
  }

  private createInstructionLevel(): Level {
    let instructions = [new Instruction("moveRight(*)"),
      new Instruction("moveLeft(*)"),
      new Instruction("moveDown(*)"),
      new Instruction("moveUp(*)")];
    let comment = new Instruction("Instead of * write amount of steps", "rgba(187, 116, 251, 0.83)", 20);
    let rootComponent = new InstructionSetComponent(instructions, comment);
    return new Level(rootComponent);
  }

  private createExamplePageLevel(): Level {
    let rootComponent = new GameProcessDemonstrationComponent(this.canvasWidth, this.canvasHeight, ["moveRight(5);"], this.sharedService, false);
    return new Level(rootComponent);
  }

  private createSyntaxDemonstrationLevel(): Level {
    let textArr = ["moveRight(5", "moveRight(5)", "moveRight(5);"];
    let rootComponent = new SyntaxDemonstrationComponent("If you are wrong, commands become red", textArr);
    return new Level(rootComponent);
  }

  private createPopUpContent(): PopUpContent[] {
    let content = [];
    let animationPageProps = {
      headerContent: "Help radish visit all purple points!",
      getLevel: this.createGameDemonstrationLevel.bind(this),
      canvasWidth: this.canvasWidth,
      canvasHeight: this.canvasHeight
    };
    content.push(new PopUpContent(animationPageProps));

    let instructionPageProps = {
      headerContent: "You can use commands:",
      getLevel: this.createInstructionLevel,
      canvasWidth: this.canvasWidth,
      canvasHeight: this.canvasHeight
    };

    content.push(new PopUpContent(instructionPageProps));

    let examplePageProps = {
      headerContent: "For example:",
      getLevel: this.createExamplePageLevel.bind(this),
      canvasWidth: this.canvasWidth,
      canvasHeight: this.canvasHeight
    };
    content.push(new PopUpContent(examplePageProps));

    let syntaxPageProps = {
      headerContent: "Be careful!",
      getLevel: this.createSyntaxDemonstrationLevel.bind(this),
      canvasWidth: this.canvasWidth,
      canvasHeight: this.canvasHeight
    };
    content.push(new PopUpContent(syntaxPageProps));

    return content;
  }

}
