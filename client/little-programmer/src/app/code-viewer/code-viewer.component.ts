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
  public targetScore: number = 0;
  public currentScore: number = 0;
  public sharedService: SharedService;

  private engine: Engine;

  constructor(sharedService: SharedService) {
    this.sharedService = sharedService;
  }

  ngOnInit() {
    this.sharedService.codeLineData$.subscribe(directionList => {

    });

    this.sharedService.score$.subscribe(curScore => {
      this.currentScore++;
    });

    document.addEventListener("DOMContentLoaded", this.load.bind(this));
  }

  private load(): void {
    let canvas = document.getElementById('code-viewer') as any;
    let rootComponent = new RoundGridComponent(this.canvasWidth, this.canvasHeight, false);
    let level = new Level(rootComponent);
    this.engine = new EngineImpl(canvas, level);
    this.engine.start();
  }
}
