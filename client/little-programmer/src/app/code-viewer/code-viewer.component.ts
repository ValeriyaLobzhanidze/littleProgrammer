import {Component, OnInit} from '@angular/core';
import {SharedService} from "../SharedService";
import {Engine} from "../engine/Engine";
import EngineImpl from "../engine/EngineImpl";
import Level1RootComponent from "../level1/Level1RootComponent";
import Level from "../engine/Level";
import Level1RootComponentProps from "../level1/Level1RootComponentProps";

@Component({
  selector: 'app-code-viewer',
  templateUrl: './code-viewer.component.html',
  styleUrls: ['./code-viewer.component.css']
})
export class CodeViewerComponent implements OnInit {
  public readonly canvasWidth: number = 600;
  public readonly canvasHeight: number = 600;
  private canvasTop: number;
  private canvasLeft: number;
  public targetScore: number = 0;
  public currentScore: number = 0;
  public sharedService: SharedService;

  private readonly rootComponent: Level1RootComponent;
  private engine: Engine;

  constructor(sharedService: SharedService) {
    this.sharedService = sharedService;
    this.rootComponent = new Level1RootComponent();
    let props = new Level1RootComponentProps();
    props.sharedService = this.sharedService;
    props.canvasWidth = this.canvasWidth;
    props.canvasHeight = this.canvasHeight;
    props.isDefaultRoute = false;
    props.isDefaultTarget = true;
    props.isPopUpUsed = true;
    this.rootComponent.init(props);
  }

  ngOnInit() {
    this.sharedService.score$.subscribe(() => {
      this.currentScore++;
    });
    document.addEventListener("DOMContentLoaded", this.load.bind(this));
    this.sharedService.showPopUp$.subscribe(() => {
      this.rootComponent.unsubscribeFromGettingCodeLines()
    });
    this.sharedService.closePopUp$.subscribe(() => {
      this.rootComponent.subscribeForGettingCodeLines()
    });
  }

  private load(): void {
    let canvas = document.getElementById('code-viewer') as any;
    let level = new Level(this.rootComponent);

    this.canvasTop = canvas.getBoundingClientRect().top;
    this.canvasLeft = canvas.getBoundingClientRect().left;

    this.targetScore = this.rootComponent.getAmountOfTargets();
    this.engine = new EngineImpl(canvas, level);
    this.engine.start();
  }

  private onMouseDown(event: MouseEvent): void {
    this.rootComponent.onMouseDown(event.clientX - this.canvasLeft, event.clientY - this.canvasTop);
  }

  private onMouseMove(event: MouseEvent): void {
    this.rootComponent.onMouseMove(event.clientX - this.canvasLeft, event.clientY - this.canvasTop);
  }

  private onMouseUp(): void {
    this.rootComponent.onMouseUp();
  }
}
