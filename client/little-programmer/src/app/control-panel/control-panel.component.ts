import {Component, OnInit} from '@angular/core';
import {SharedService} from "../SharedService";
import PopUpContent from "../pop-up/PopUpContent";
import RoundGridComponent from "../level1/RoundGridComponent";
import Level from "../engine/Level";
import CommandDemonstrationComponent from "../instructionpopup/CommandDemonstrationComponent";
import Instruction from "../instructionpopup/Instruction";

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {
  private sharedService: SharedService;
  private taskPopUpContent: PopUpContent[];
  private isTaskContentInit = false;

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
    let rootComponent = new RoundGridComponent(300, 300);
    return new Level(rootComponent);
  }

  private createInstructionLevel(): Level {
    let instructions = [new Instruction("moveRight(*)"),
      new Instruction("moveLeft(*)"),
      new Instruction("moveDown(*)"),
      new Instruction("moveUp(*)")];
    let rootComponent = new CommandDemonstrationComponent(instructions);
    return new Level(rootComponent);
  }

  private createPopUpContent(): PopUpContent[] {
    let content = [];
    let animationPageProps = {
      headerContent: "Help radish visit all purple points!",
      getLevel: this.createGameDemonstrationLevel
    };
    content.push(new PopUpContent(animationPageProps));

    let instructionPageProps = {
      headerContent: "Just write all actions, that radish should do!You can use commands:",
      getLevel: this.createInstructionLevel
    };

    content.push(new PopUpContent(instructionPageProps));
    return content;
  }

}
