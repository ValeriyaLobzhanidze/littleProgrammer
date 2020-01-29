import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import EngineImpl from "../engine/EngineImpl";
import PopUpContent from "./PopUpContent";
import {Engine} from "../engine/Engine";
import {SharedService} from "../SharedService";

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

  public sharesService: SharedService;

  constructor(sharesService: SharedService) {
    this.sharesService = sharesService;
  }

  ngOnInit() {
    this.currentContent = this.content[this.currentContentNo];
    if (this.currentContent.getLevel) {
      this.runEngine();
    }
    this.sharesService.openPopUp();
  }

  private stopEngine() {
    if (this.engine) {
      this.engine.stop();
    }
  }

  private runEngine() {
    let canvas = document.getElementById('canvas') as any;
    this.engine = new EngineImpl(canvas, this.currentContent.getLevel());
    this.engine.start();
  }

  public closePopUp(): void {
    if (this.engine) {
      this.engine.stop();
    }
    this.eventEmitter.emit("close");
  }

  public onNext() {
    if (this.shouldChangePage(this.currentContentNo + 1)) {
      this.currentContentNo++;
      this.currentContent = this.content[this.currentContentNo];
      this.stopEngine();
      if (this.currentContent.getLevel) {
        this.runEngine();
      }
    } else {
      if (this.currentContentNo < 0) {
        this.currentContentNo = 1;
        this.currentContent = this.content[this.currentContentNo];
      }
    }
  }

  public onPrev() {
    if (this.shouldChangePage(this.currentContentNo - 1)) {
      this.currentContentNo--;
      this.currentContent = this.content[this.currentContentNo];
      this.stopEngine();
      if (this.currentContent.getLevel) {
        this.runEngine();
      }
    } else {
      if (this.currentContentNo >= this.content.length) {
        this.currentContentNo = this.content.length - 2;
        this.currentContent = this.content[this.currentContentNo];
      }
    }
  }

  private shouldChangePage(value: number): boolean {
    return value >= 0 && value < this.content.length;
  }

  public shouldGoForward(): boolean {
    return this.currentContentNo + 1 < this.content.length;
  }

  public shouldGoBack(): boolean {
    return this.currentContentNo - 1 >= 0;
  }
}