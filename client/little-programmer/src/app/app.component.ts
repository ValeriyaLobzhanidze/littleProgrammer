import {Component, ViewChild} from '@angular/core';
import {SharedService} from "./SharedService";
import PopUpContent from "./pop-up/PopUpContent";
import {PopUpComponent} from "./pop-up/pop-up.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'little-programmer';
  public isPopUpRendered: boolean = false;

  public sharedService: SharedService;

  @ViewChild(PopUpComponent, {static: false})
  popUp: PopUpComponent;

  constructor(sharedService: SharedService) {
    this.sharedService = sharedService;
    this.sharedService.levelCompleted$.subscribe(() => this.isPopUpRendered = true);
    this.sharedService.showPopUp$.subscribe(el => {
      this.handlePopUp();
    });
  }

  public closePopUpEvent(): void {
    this.isPopUpRendered = false;
  }

  private handlePopUp() {
    this.isPopUpRendered = true;
  }

}
