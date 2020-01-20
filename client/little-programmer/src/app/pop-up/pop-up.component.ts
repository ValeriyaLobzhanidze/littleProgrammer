import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import EngineImpl from "../engine/EngineImpl";
import Level from "../engine/Level";
import RoundGridComponent from '../level1/RoundGridComponent';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {
  private engine: EngineImpl;
  private level;
  private rootComponent;

  private someText: string = "";
  public canvasWidth = 300;
  public canvasHeight = 300;

  @Output() eventEmitter = new EventEmitter<string>();

  ngOnInit() {
    this.runPopUp();
  }

  public runPopUp() {
    let canvas = document.getElementById('canvas') as any;
    this.rootComponent = new RoundGridComponent(300, 300);
    this.level = new Level(this.rootComponent);
    this.engine = new EngineImpl(canvas, this.level);
    this.engine.start();
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
