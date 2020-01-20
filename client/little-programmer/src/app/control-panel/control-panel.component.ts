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
  public sharedService: SharedService;

  constructor(sharedService: SharedService) {
    this.sharedService = sharedService;
  }

  ngOnInit() {
  }

  onTask(): void {
    let rootComponent = new RoundGridComponent(300, 300);
    let level = new Level(rootComponent);
    let properties = {
      headerContent: "Help radish visit all purple points!",
      level: level
    };
    this.sharedService.showPopUp(new PopUpContent(properties));
  }

}
