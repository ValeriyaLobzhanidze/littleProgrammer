import {Component, Type, ViewChild} from '@angular/core';
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
  // public popUpContent: PopUpContent[];
  public type: Type<any>;

  public sharedService: SharedService;

  @ViewChild(PopUpComponent, {static: false})
  popUp: PopUpComponent;

  constructor(sharedService: SharedService) {
    this.sharedService = sharedService;
    // this.sharedService.showPopUp$.subscribe((content: PopUpContent[]) => {
    //   this.renderPopUp(content);
    // });

    this.sharedService.showPopUp$.subscribe((type: Type<any>) => {
      this.renderPopUp(type);
    });
  }

  public closePopUpEvent(): void {
    this.isPopUpRendered = false;
  }

  // private renderPopUp(content: PopUpContent[]) {
  //   this.popUpContent = content;
  //   this.isPopUpRendered = true;
  // }

  private renderPopUp(type: Type<any>) {
    this.type = type;
    this.isPopUpRendered = true;
  }

}
