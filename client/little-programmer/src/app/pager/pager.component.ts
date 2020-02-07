import {Component, ComponentRef, Input, OnInit, Type, ViewChild, ViewContainerRef} from '@angular/core';
import ComponentBuilderService from "../ComponentBuilderService";
import {Init} from "./Init";

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit {

  @ViewChild("container", {static: false, read: ViewContainerRef})
  public container: ViewContainerRef;
  private componentRef: ComponentRef<any>;

  @Input() public componentPropertiesList: any[];
  @Input() public type: Type<Init>;
  @Input() public buttonValue: string;

  constructor(private componentBuilder: ComponentBuilderService) {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.changeView(0)
    });
  }

  private changeView(viewNo: number): void {
    if (viewNo < this.componentPropertiesList.length) {
      this.componentRef = this.componentBuilder.createComponent(this.type, this.container);
      let props = this.componentPropertiesList[viewNo];
      (<Init>this.componentRef.instance).init(props);
    }
  }

  public getListLength(): number {
    return this.componentPropertiesList.length;
  }

  public changeViewCallback() {
    return this.changeView.bind(this);
  }

  ngOnInit() {
  }

}
