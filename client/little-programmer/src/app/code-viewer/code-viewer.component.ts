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

        ctx.fillStyle = 'rgb(130, 50, 45)';
        ctx.fillRect(10, 10, 50, 50);

        ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
        ctx.fillRect(30, 30, 50, 50);
      }}, 2000);
  }

}
