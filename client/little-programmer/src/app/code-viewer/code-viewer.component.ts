import { Component, OnInit } from '@angular/core';

export enum State {
  ACTIVE,
  STABLE
}

export class Sprite {
  public state : State = State.STABLE;
  public cords;

  public ctx;
  public image;
  public width;
  public height;
  public numberOfFrames;
  public ticketsPerFrame;
  public frameIndex = 0;
  public tickCount = 0;
  public route;
  public amountOfVisitedCords = 0;
  public curPos = 0;

  public dx = 50;
  public dy = 10;

  public speedX = 0.7;
  public speedY = 0.7;

  constructor(ctx, image, width, height, numberOfFrames, ticketsPerFrame) {
    this.ctx = ctx;
    this.image = image;
    this.width = width;
    this.height = height;
    this.numberOfFrames = numberOfFrames;
    this.ticketsPerFrame = ticketsPerFrame;
  }

  public start(): void {
    let loop = () => {
      this.update();
      this.render();
      window.requestAnimationFrame(loop);
    };
    window.requestAnimationFrame(loop);
  }

  public render(): void {
    new CodeViewerComponent().paintObjects(this.ctx);

    this.ctx.drawImage(this.image,
      this.frameIndex * this.width ,
      0,
      this.width ,
      this.height,
      this.dx,
      this.dy,
      this.width,
      this.height);
  }

  public update() {
    this.tickCount++;
    this.ctx.clearRect(0, 0, 600, 700);

    if(this.state == State.ACTIVE){
      let index = this.route[this.amountOfVisitedCords];
      let boundary;
      let activeCord;
      let endFlag = 0;
      let diff = index - this.curPos;

      if(diff == 1 || diff == -1){
        boundary = this.cords[index - 1].x;
        activeCord = 'x';
      }
      else {
        boundary = this.cords[index - 1].y;
        activeCord = 'y';
      }

      if(activeCord == 'x'){
        if(diff > 0){
          if(this.dx < boundary) {
            this.dx += this.speedX;
          }
          else{
            endFlag = 1;
          }
        }
        else{
          if(this.dx > boundary) {
            this.dx -= this.speedX;
          }
          else{
            endFlag = 1;
          }
        }

      }
      else {
        if(diff > 0) {
          if (this.dy < boundary) {
            this.dy += this.speedY;
          } else {
            endFlag = 1;
          }
        }
        else{
          if (this.dy > boundary) {
            this.dy -= this.speedY;
          } else {
            endFlag = 1;
          }
        }
      }

      if(endFlag == 1) {
        if(++this.amountOfVisitedCords < this.route.length) {
          this.curPos += diff;
          console.log("tick");
        }
        else{
          this.state = State.STABLE;
        }
      }
    }

    if (this.tickCount > this.ticketsPerFrame) {
      this.tickCount = 0;
      if (this.frameIndex < this.numberOfFrames - 1) {
        this.frameIndex++;
      } else {
        this.frameIndex = 0;
      }
    }
  }
}

@Component({
  selector: 'app-code-viewer',
  templateUrl: './code-viewer.component.html',
  styleUrls: ['./code-viewer.component.css']
})
export class CodeViewerComponent implements OnInit {

  public readonly canvasWidth: number = 600;
  public readonly canvasHeight: number = 700;
  public cords;
  constructor() { }

  public paintObjects(ctx: any): void {
    let cords: {x: number, y:number}[] = [];
    let dx = 100;
    let dy = 35;
    for(let i = 0; i < 2; i++){
      for(let j = 0; j < 3; j++){
        let cord = {x:dx, y:dy};
        cords.push(cord);

        ctx.beginPath();
        ctx.arc(dx, dy, 8, 0, 2 * Math.PI);
        ctx.fillStyle = "rgb(73,200,158)";
        ctx.fill();
        dx += 70;
      }
      dx = 100;
      dy += 100;
    }
    this.cords = cords;
  }

  ngOnInit() {
    setTimeout(() => {
      let canvas = document.getElementById('code-viewer') as any;
      let ctx = canvas.getContext('2d');

      let radishImg = new Image(0, 0);
      radishImg.src = '/assets/images/radish.png';
      let radishSprite = new Sprite(ctx, radishImg, 30, 38, 6, 4);
      radishImg.onload = function() {
        radishSprite.start();
      }

      this.paintObjects(ctx);
      radishSprite.cords = this.cords;
      radishSprite.route = [1, 4, 5, 6, 3, 2, 5, 4, 1];
      radishSprite.state = State.ACTIVE;

    }, 1000);

  }
}
