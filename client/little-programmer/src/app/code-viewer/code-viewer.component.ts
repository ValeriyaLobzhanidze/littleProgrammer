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
  public readonly canvasHeight: number = 700;
  private level: DirectMoveLevel;

  public sharedService: SharedService;

  constructor(sharedService: SharedService) {
    this.sharedService = sharedService;
  }

  ngOnInit() {
    this.sharedService.currentData.subscribe(directionList => {
      this.level.activate(directionList);
    });

    setTimeout(() => {
      let canvas = document.getElementById('code-viewer') as any;
      this.level = new DirectMoveLevel(canvas);
      this.level.load();
    }, 1000);
  }
}
