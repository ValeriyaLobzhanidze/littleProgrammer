import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SharedService} from "../SharedService";
import PopUpContent from "./PopUpContent";
import Engine from "../engine/Engine";
import Level from "../engine/Level";
import RenderComponent from '../engine/RenderComponent';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {
  private engine;
  private level;
  private rootComponent;

  @Input() content: PopUpContent;

  @Output() eventEmitter = new EventEmitter<string>();

  public sharedService: SharedService;

  constructor(sharedService: SharedService) {
    this.sharedService = sharedService;
  }

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
    console.log("closed");
    this.engine.end();
    this.eventEmitter.emit("close");
  }

}
