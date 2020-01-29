import {Component, ViewChild} from '@angular/core';
import {SharedService} from "./SharedService";
import {PopUpComponent} from "./popup/pop-up.component";
import PopUpContent from "./popup/PopUpContent";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'little-programmer';
  public isPopUpRendered: boolean = false;
  public popUpContent: PopUpContent[];

  public sharedService: SharedService;

  @ViewChild(PopUpComponent, {static: false})
  popUp: PopUpComponent;

  constructor(sharedService: SharedService) {
    this.sharedService = sharedService;
    this.sharedService.showPopUp$.subscribe((content: PopUpContent[]) => {
      this.renderPopUp(content);
    });
  }

  public closePopUpEvent(): void {
    this.isPopUpRendered = false;
  }

  private renderPopUp(content: PopUpContent[]) {
    this.popUpContent = content;
    this.isPopUpRendered = true;
  }

}
