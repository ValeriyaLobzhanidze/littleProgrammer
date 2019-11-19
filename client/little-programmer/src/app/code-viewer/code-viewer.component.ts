import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-code-viewer',
  templateUrl: './code-viewer.component.html',
  styleUrls: ['./code-viewer.component.css']
})
export class CodeViewerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      let canvas: HTMLCanvasElement = document.getElementById('code-viewer') as HTMLCanvasElement;
      if (canvas.getContext) {
        let ctx = canvas.getContext('2d');
        ctx.fillStyle = 'rgb(169,255,251)';
        ctx.fillRect(0, 0, 500, 500);
        ctx.strokeRect(0, 0, 500, 500);
      }}, 1000);
  }

}
