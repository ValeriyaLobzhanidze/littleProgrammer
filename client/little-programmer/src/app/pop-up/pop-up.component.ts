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
  @Input() public content: PopUpContent[];

  public currentContent: PopUpContent;
  private currentContentNo: number = 0;

  ngOnInit() {
    this.currentContent = this.content[this.currentContentNo];
    this.currentContentNo++;
    if (this.currentContent.level) {
      this.runEngine();
    }
  }

  public runEngine() {
    let canvas = document.getElementById('canvas') as any;
    this.engine = new EngineImpl(canvas, this.currentContent.level);
    this.engine.start();
  }

  public closePopUp(): void {
    if (this.engine) {
      this.engine.stop();
    }
    this.eventEmitter.emit("close");
  }

  public onNext() {
    if (this.engine) {
      this.engine.stop();
    }
    if (this.shouldChangePage()) {
      this.currentContent = this.content[this.currentContentNo];
      this.currentContentNo++;
    } else {
      if (this.currentContentNo < 0) {
        this.currentContentNo = 1;
        this.currentContent = this.content[this.currentContentNo];
        this.currentContentNo++;
      }
    }
  }

  public onPrev() {
    if (this.engine) {
      this.engine.stop();
    }
    if (this.shouldChangePage()) {
      this.currentContent = this.content[this.currentContentNo];
      this.currentContentNo--;
    } else {
      if (this.currentContentNo >= this.content.length) {
        this.currentContentNo = this.content.length - 2;
        this.currentContent = this.content[this.currentContentNo];
        this.currentContentNo--;
      }
    }
  }

  private shouldChangePage(): boolean {
    return this.currentContentNo >= 0 && this.currentContentNo < this.content.length;
  }

  public shouldGoForward(): boolean {
    return this.currentContentNo < this.content.length;
  }

  public shouldGoBack(): boolean {
    return this.currentContentNo >= 0;
  }
}
