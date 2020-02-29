import {Component, Type} from '@angular/core';
import {SharedService} from "./SharedService";
import PopUpEventProps from "./popup/PopUpEventProps";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'little-programmer';
  private isPopUpRendered: boolean = false;
  private componentPropertiesList: PopUpEventProps[];

  public sharedService: SharedService;

  constructor(sharedService: SharedService) {
    this.sharedService = sharedService;

    this.sharedService.showPopUp$.subscribe((props: PopUpEventProps[]) => {
      this.componentPropertiesList = props;
      this.isPopUpRendered = true;
    });

    this.sharedService.closePopUp$.subscribe(() => {
      this.isPopUpRendered = false;
    })
  }
}
