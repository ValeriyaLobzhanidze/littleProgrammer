import {ChangeDetectorRef, Component, Injectable, OnInit, ViewRef} from '@angular/core';
import PopUpEventProps from "../popup/PopUpEventProps";
import {SharedService} from "../SharedService";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {CanvasComponent} from "../canvascomponent/canvas.component";

@Component({
  selector: 'app-root-level',
  templateUrl: './root-level.component.html',
  styleUrls: ['./root-level.component.css']
})
export class RootLevelComponent implements OnInit {
  ngOnInit() {
  }

  private isPopUpRendered: boolean = false;
  private componentPropertiesList: PopUpEventProps[];

  private levelId: number;
  private subscription: Subscription;

  constructor(private sharedService: SharedService, private activateRoute: ActivatedRoute) {
    this.subscription = activateRoute.params.subscribe(params => {
      this.levelId = params['id'];
    });

    this.sharedService.showPopUp$.subscribe((props: PopUpEventProps[]) => {
      this.componentPropertiesList = props;
      this.isPopUpRendered = true;
    });

    this.sharedService.closePopUp$.subscribe(() => {
      this.isPopUpRendered = false;
    });
  }
}
