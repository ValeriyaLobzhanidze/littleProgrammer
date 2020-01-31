import {Component, OnInit} from '@angular/core';
import {SharedService} from "../SharedService";
import {Engine} from "../engine/Engine";
import EngineImpl from "../engine/EngineImpl";
import RoundGridComponent from "../level1/RoundGridComponent";
import Level from "../engine/Level";

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

  private readonly rootComponent: RoundGridComponent;

  private engine: Engine;

  constructor(sharedService: SharedService) {
    this.sharedService = sharedService;
    this.rootComponent = new RoundGridComponent(this.canvasWidth, this.canvasHeight, false, this.sharedService);
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
