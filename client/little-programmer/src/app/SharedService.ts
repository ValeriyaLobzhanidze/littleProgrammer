import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {DirectMoveFunction} from "./level1/DirectMoveFunction";
import PopUpContent from "./popup/PopUpContent";

@Injectable()
export class SharedService {
  private codeLineData: Subject<{ direction: DirectMoveFunction, val: number }[]> = new Subject<{ direction: DirectMoveFunction, val: number }[]>();
  public codeLineData$ = this.codeLineData.asObservable();

  private score: Subject<{ x: number, y: number }> = new Subject<{ x: number, y: number }>();
  public score$ = this.score.asObservable();

  private showPopUpEvent: Subject<PopUpContent[]> = new Subject<PopUpContent[]>();
  public showPopUp$ = this.showPopUpEvent.asObservable();

  private isPopUpOpened: Subject<void> = new Subject();
  public isPopUpOpened$ = this.isPopUpOpened.asObservable();

  public setCodeLineData(data: { direction: DirectMoveFunction, val: number }[]): void {
    this.codeLineData.next(data);
  }

  public incrementScore(): void {
    this.score.next();
  }

  public showPopUp(content: PopUpContent[]): void {
    this.showPopUpEvent.next(content);
  }

  public openPopUp(): void {
    this.isPopUpOpened.next();
  }
}
