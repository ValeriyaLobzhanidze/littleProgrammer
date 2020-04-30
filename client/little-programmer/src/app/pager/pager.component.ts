import {Component, ComponentRef, Input, OnInit, Type, ViewChild, ViewContainerRef} from '@angular/core';
import ComponentBuilderService from "../ComponentBuilderService";
import {Init} from "./Init";
import PopUpEventProps from "../popup/PopUpEventProps";

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit {

  @ViewChild("container", {static: false, read: ViewContainerRef})
  public container: ViewContainerRef;
  private componentRef: ComponentRef<any>;
  private buttonValue = "Ok";

  @Input() public popUpProperties: PopUpEventProps[];

  constructor(private componentBuilder: ComponentBuilderService) {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.changeView(0)
    });
  }

  private changeView(viewNo: number): void {
    if (viewNo < this.popUpProperties.length) {
      this.componentRef = this.componentBuilder.createComponent(this.popUpProperties[viewNo].type, this.container);
      let props = this.popUpProperties[viewNo].componentProps;
      if(props) {
        (<Init>this.componentRef.instance).init(props);
      }
    }
  }

  public getListLength(): number {
    return this.popUpProperties.length;
  }

  public changeViewCallback() {
    return this.changeView.bind(this);
  }

  ngOnInit() {
  }

}
