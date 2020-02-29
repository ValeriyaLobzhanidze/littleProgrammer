import {Injectable, Type} from '@angular/core';
import {Subject} from "rxjs";
import {DirectMoveFunction} from "./level1/DirectMoveFunction";
import PopUpEventProps from "./popup/PopUpEventProps";
import DirectionValue from "./level1/DirectionValue";

@Injectable()
export class SharedService {
  private codeLineData: Subject<DirectionValue[]> = new Subject<DirectionValue[]>();
  public codeLineData$ = this.codeLineData.asObservable();

  private score: Subject<{ x: number, y: number }> = new Subject<{ x: number, y: number }>();
  public score$ = this.score.asObservable();

  private showPopUpEvent: Subject<PopUpEventProps[]> = new Subject<PopUpEventProps[]>();
  public showPopUp$ = this.showPopUpEvent.asObservable();

  private closePopUpEvent: Subject<void> = new Subject<void>();
  public closePopUp$ = this.closePopUpEvent.asObservable();

  private clearCodeLinesInputEvent: Subject<void> = new Subject<void>();
  public clearCodeLine$ = this.clearCodeLinesInputEvent.asObservable();

  private showLastTryEvent: Subject<void> = new Subject<void>();
  public showLastTry$ = this.showLastTryEvent.asObservable();

  public showLastAttempt() {
    this.showLastTryEvent.next();
  }

  public setCodeLineData(data: DirectionValue[]): void {
    this.codeLineData.next(data);
  }

  public incrementScore(): void {
    this.score.next();
  }

  public showPopUp(props: PopUpEventProps[]): void {
    this.showPopUpEvent.next(props);
  }

  public closePopUp(): void {
    this.closePopUpEvent.next();
  }

  public clearCodeLinesInput() {
    this.clearCodeLinesInputEvent.next();
  }
}
