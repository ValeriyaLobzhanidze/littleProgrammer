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
  private currentX: number = 10;
  private currentY: number = 50;

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      let canvas: HTMLCanvasElement = document.getElementById('code-editor') as HTMLCanvasElement;
      if (canvas.getContext) {
        let ctx = canvas.getContext('2d');
        ctx.strokeRect(0, 0, 500, 500);
    }}, 1000);
    }

  public onClick(): void {
    this.mode = MODE.EDIT_MODE;
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    this.draw(event.key);
  }

  private draw(key: string): void {
    let canvas: HTMLCanvasElement = document.getElementById('code-editor') as HTMLCanvasElement;
    if (canvas.getContext) {
      let ctx = canvas.getContext('2d');
      ctx.font = '25px serif';
      ctx.fillText(key, this.currentX += 20, this.currentY);
    }
  }
}
