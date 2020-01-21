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
      let rootComponent = new RoundGridComponent(300, 300);
      let level = new Level(rootComponent);
      let properties = {
        headerContent: "Help radish visit all purple points!",
        level: level
      };
      this.taskPopUpContent = [new PopUpContent(properties), new PopUpContent({headerContent: "1"}), new PopUpContent({headerContent: "2"})];
    }
    this.sharedService.showPopUp(this.taskPopUpContent);
  }

}
