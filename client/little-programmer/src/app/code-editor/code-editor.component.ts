import {Component, HostListener, OnInit} from '@angular/core';

export enum MODE{
  EDIT_MODE
}

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements OnInit {

  private mode: MODE;
  private stringHolderHeight: number = 25;
  private currentTextX: number = 15;
  private currentTextY: number = this.stringHolderHeight - 2;
  private codeStrings: string[] = [];

  public canvasWidth: number = 500;
  public canvasHeight: number = 500;

  public currentX: number = 0;
  public currentY: number = 0;

  public currentInputString = "";

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.buildCanvas();
    }, 1000);
    }

  public buildCanvas(): void {
    let canvas: HTMLCanvasElement = document.getElementById('code-editor') as HTMLCanvasElement;
    if (canvas.getContext) {
      let ctx = canvas.getContext('2d');
      ctx.strokeStyle = 'rgb(93,168,255)';
      ctx.strokeRect(this.currentX, this.currentY, this.canvasWidth, this.canvasHeight);

      let currentNumberY = this.currentTextY;
      let currentNumberX = this.currentTextX - 10;
      for(let i = 0; i < Math.floor(this.canvasWidth / this.stringHolderHeight); i++){
        ctx.strokeStyle = 'rgba(93, 168, 255, 0.2)';
        ctx.strokeRect(this.currentX, this.currentY, this.canvasWidth, this.stringHolderHeight);

        ctx.fillStyle = 'rgb(44,168,255)';
        ctx.font = '10px Courier New';
        ctx.fillText((i + 1) as any, currentNumberX, currentNumberY);

        this.currentY += this.stringHolderHeight;
        currentNumberY += this.stringHolderHeight;
      }
    }
  }

  public onClick(): void {
    this.mode = MODE.EDIT_MODE;
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    this.drawCharacter(event.key);
  }

  private drawCharacter(key: string): void {
    let canvas: HTMLCanvasElement = document.getElementById('code-editor') as HTMLCanvasElement;
    if (canvas.getContext) {
      let ctx = canvas.getContext('2d');
      if((this.currentInputString.length * ctx.measureText(key).width) + key.length >= this.canvasWidth - 50){
        this.codeStrings.push(this.currentInputString.slice(0, this.currentInputString.length));
        this.currentInputString = "";
        this.currentTextY += this.stringHolderHeight;
        this.currentTextX = 15;
      }
      this.currentInputString += key;

      ctx.font = '25px Courier New';
      ctx.fillStyle = 'rgb(36,142,67)';
      ctx.fillText(key, this.currentTextX, this.currentTextY);
      this.currentTextX += 15
    }
  }
}
