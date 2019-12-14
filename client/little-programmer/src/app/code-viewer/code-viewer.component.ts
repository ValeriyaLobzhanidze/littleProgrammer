import {Component, OnInit} from '@angular/core';
import {DirectMoveLevel} from "../DirectMoveLevel";
import {SharedService} from "../SharedService";

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
  private level: DirectMoveLevel;
  public sharedService: SharedService;

  constructor(sharedService: SharedService) {
    this.sharedService = sharedService;
  }

  ngOnInit() {
    this.sharedService.currentCodeLineData.subscribe(directionList => {
      this.level.activate(directionList);
    });

    this.sharedService.currentScore.subscribe(curScore => {
      this.currentScore++;
    });

    setTimeout(() => {
      let canvas = document.getElementById('code-viewer') as any;
      this.level = new DirectMoveLevel(this.sharedService, canvas);
      this.level.load();
      this.targetScore = this.level.getAmountOfTargets();
    }, 1000);
  }
}
