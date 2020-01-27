import {Component, OnInit} from '@angular/core';
import {SharedService} from "../SharedService";
import PopUpContent from "../pop-up/PopUpContent";
import RoundGridComponent from "../level1/RoundGridComponent";
import Level from "../engine/Level";
import CommandDemonstrationComponent from "../instructionpopup/CommandDemonstrationComponent";
import Instruction from "../instructionpopup/Instruction";
import DemonstrationComponent from "../demonstrationpopup/DemonstrationComponent";

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {
  private sharedService: SharedService;
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
    let rootComponent = new CommandDemonstrationComponent(instructions, comment);
    return new Level(rootComponent);
  }

  private createExamplePageLevel(): Level {
    let rootComponent = new DemonstrationComponent("moveRight(4);", this.canvasWidth, this.canvasHeight);
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
      getLevel: this.createExamplePageLevel
    };
    content.push(new PopUpContent(examplePageProps));
    return content;
  }

}
