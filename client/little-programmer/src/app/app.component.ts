import {Component, Type} from '@angular/core';
import {SharedService} from "./SharedService";
import PopUpEventProps from "./PopUpEventProps";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'little-programmer';
  private isPopUpRendered: boolean = false;
  private type: Type<any>;
  private componentPropertiesList: any[];
  private buttonValue: string;

  public sharedService: SharedService;

  constructor(sharedService: SharedService) {
    this.sharedService = sharedService;

    this.sharedService.showPopUp$.subscribe((props: PopUpEventProps) => {
      this.type = props.type;
      this.componentPropertiesList = props.componentPropList;
      this.buttonValue = props.buttonValue;
      this.isPopUpRendered = true;
    });

    this.sharedService.closePopUp$.subscribe(() => {
      this.isPopUpRendered = false;
    })
  }
}
