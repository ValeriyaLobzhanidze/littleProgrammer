import {Component} from '@angular/core';
import {SharedService} from "./SharedService";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'little-programmer';
  public isPopUpRendered: boolean = false;

  public sharedService: SharedService;

  constructor(sharedService: SharedService) {
    this.sharedService = sharedService;
    this.sharedService.isLevelCompleted.subscribe(() => this.isPopUpRendered = true);
  }

  public closePopUp(): void {
    this.isPopUpRendered = false;
  }

}
