import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import Engine from "../engine/Engine";
import Level from "../engine/Level";
import RenderComponent from '../engine/RenderComponent';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {
  private engine: Engine;
  private level;
  private rootComponent;

  private someText: string = "";
  public canvasWidth = 300;
  public canvasHeight = 300;

  @Output() eventEmitter = new EventEmitter<string>();

  ngOnInit() {
  }

  public runPopUp() {
    let canvas = document.getElementById('canvas') as any;
    window.setTimeout(() => {
      this.rootComponent = new RenderComponent(300, 300);
      this.level = new Level(this.rootComponent);
      this.engine = new Engine(canvas, this.level);
      this.engine.start();
    }, 500);
  }

  public closePopUp(): void {
    this.engine.stop();
    this.eventEmitter.emit("close");
  }

  public onNext() {
    this.engine.stop();
    this.canvasWidth = this.canvasHeight = 0;
    this.someText = "Additional info\nAdditional info\nAdditional info\nAdditional info\nAdditional info\nAdditional info\n";
  }

  public onPrev() {

  }
}
