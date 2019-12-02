import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-code-viewer',
  templateUrl: './code-viewer.component.html',
  styleUrls: ['./code-viewer.component.css']
})
export class CodeViewerComponent implements OnInit {
  public readonly canvasWidth: number = 600;
  public readonly canvasHeight: number = 700;

  ngOnInit() {
    setTimeout(() => {
      let canvas = document.getElementById('code-viewer') as any;//TODO:replace by some load func
      let ctx = canvas.getContext('2d');

      // let radishImg = new Image(0, 0);
      // radishImg.src = '/assets/images/radish.png';
      // let radishSprite = new Sprite(ctx, radishImg, 30, 38, 6, 4,
      //   this.canvasWidth, this.canvasHeight);
      //
      // radishImg.onload = function () {
      //   radishSprite.start();
      // }
      //
      // this.paintObjects(ctx);
      // radishSprite.cords = this.cords;
      // radishSprite.route = [1, 4, 5, 6, 3, 2, 5, 4, 1];
      // radishSprite.state = State.ACTIVE;

    }, 1000);

  }
}
