import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import EngineImpl from "../engine/EngineImpl";
import PopUpContent from "./PopUpContent";
import {Engine} from "../engine/Engine";

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {
  private engine: Engine;

  @Output() eventEmitter = new EventEmitter<string>();
  @Input() public content: PopUpContent;

  ngOnInit() {
    if (this.content.level) {
      this.runEngine();
    }
  }

  public runEngine() {
    let canvas = document.getElementById('canvas') as any;
    this.engine = new EngineImpl(canvas, this.content.level);
    this.engine.start();
  }

  public closePopUp(): void {
    if (this.engine) {
      this.engine.stop();
    }
    this.eventEmitter.emit("close");
  }

  public onNext() {
    // this.engine.stop();
    // this.canvasWidth = 0;
    // this.canvasHeight = 0;
    // this.someText = "Additional info\nAdditional info\nAdditional info\nAdditional info\nAdditional info\nAdditional info\n";
  }

  public onPrev() {

  }
}
