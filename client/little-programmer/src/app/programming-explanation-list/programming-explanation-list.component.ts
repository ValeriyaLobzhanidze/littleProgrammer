import {AfterViewInit, Component, ComponentRef, OnInit, Type, ViewChild, ViewContainerRef} from '@angular/core';
import ComponentBuilderService from "../ComponentBuilderService";
import {ProgrammingExplanationComponent} from "../programming-explanation/programming-explanation.component";

@Component({
  selector: 'app-programming-explanation-list',
  templateUrl: './programming-explanation-list.component.html',
  styleUrls: ['./programming-explanation-list.component.css']
})
export class ProgrammingExplanationListComponent implements OnInit, AfterViewInit {

  @ViewChild("container", {static: false, read: ViewContainerRef})
  container: ViewContainerRef;

  private componentRef: ComponentRef<any>;
  private type: Type<ProgrammingExplanationComponent> = ProgrammingExplanationComponent;

  private readonly explanationList: ProgrammingExplanationComponent[];
  public buttonValue: string = "Ok";

  constructor(private componentBuilder: ComponentBuilderService) {
    this.explanationList = this.createDefaultList();
  }

  private createDefaultList(): ProgrammingExplanationComponent[] {
    let list = [];
    let firstPage = new ProgrammingExplanationComponent();
    firstPage.init("SOME TEXT SOME TEXT SOME TEXT",
      "SOME TEXT SOME TEXT SOME TEXT",
      "assets/images/deep-learning.png",
      "assets/images/arm.png"
    );

    let secondPage = new ProgrammingExplanationComponent();
    secondPage.init("SOME TEXT SOME TEXT SOME TEXT",
      "SOME TEXT SOME TEXT SOME TEXT",
      "assets/images/robot-conversation.png",
      "assets/images/robot-talk.png");

    let thirdPage = new ProgrammingExplanationComponent();
    thirdPage.init("SOME TEXT SOME TEXT SOME TEXT",
      "SOME TEXT SOME TEXT SOME TEXT",
      "assets/images/to-do-list.png",
      "assets/images/handshake.png");

    list.push(firstPage);
    list.push(secondPage);
    list.push(thirdPage);
    return list;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {this.changeView(0)});
  }

  private changeView(viewNo: number): void {
    if (viewNo < this.explanationList.length) {
      this.componentRef = this.componentBuilder.createComponent(this.type, this.container);
      let curComponent = this.explanationList[viewNo];
      (<ProgrammingExplanationComponent>this.componentRef.instance)
        .init(curComponent.upperTextContent, curComponent.lowerTextContent, curComponent.upperImageSource, curComponent.lowerImageSource);
    }
  }

  public getListLength(): number {
    return this.explanationList.length;
  }

  public changeViewCallback() {
    return this.changeView.bind(this);
  }

  ngOnInit() {
  }

}
