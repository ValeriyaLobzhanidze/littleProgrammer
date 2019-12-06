import {Component, OnInit} from '@angular/core';
import {DirectMoveLevel} from "../DirectMoveLevel";

@Component({
  selector: 'app-code-viewer',
  templateUrl: './code-viewer.component.html',
  styleUrls: ['./code-viewer.component.css']
})
export class CodeViewerComponent implements OnInit {
  public readonly canvasWidth: number = 600;
  public readonly canvasHeight: number = 700;
  private level: DirectMoveLevel;

  ngOnInit() {
    setTimeout(() => {
      let canvas = document.getElementById('code-viewer') as any;
      this.level = new DirectMoveLevel(canvas);
      this.level.load();
    }, 1000);
  }
}
