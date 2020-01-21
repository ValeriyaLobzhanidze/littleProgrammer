import {Component, OnInit} from '@angular/core';
import {SharedService} from "../SharedService";
import PopUpContent from "../pop-up/PopUpContent";
import RoundGridComponent from "../level1/RoundGridComponent";
import Level from "../engine/Level";

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

  private createLevel(): Level {
    let rootComponent = new RoundGridComponent(300, 300);
    return new Level(rootComponent);
  }

  private createPopUpContent(): PopUpContent[] {
    let content = [];
    let animationPageProps = {
      headerContent: "Help radish visit all purple points!",
      getLevel: this.createLevel
    };
    content.push(new PopUpContent(animationPageProps));

    let instructionPageProps = {
      headerContent: "Just write all actions, that radish should do!",
      canvasHeight: 0,
      canvasWidth: 0,
      mainContent:
        "You can use commands:\n\n" +
        "moveRight(*)\n\n" +
        "moveDown(*)\n\n" +
        "moveLeft(*)\n\n" +
        "moveDown(*)\n\n" +
        "Instead of star you need to put amount of steps\n\n" +
        "For example, to force radish make 5 steps to the right, write this:\n\n" +
        "moveRight(5);"
    };
    content.push(new PopUpContent(instructionPageProps));
    return content;
  }

}
