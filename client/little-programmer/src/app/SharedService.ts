import {Injectable, Type} from '@angular/core';
import {Subject} from "rxjs";
import {DirectMoveFunction} from "./level1/DirectMoveFunction";
import PopUpEventProps from "./PopUpEventProps";

@Injectable()
export class SharedService {
  private codeLineData: Subject<{ direction: DirectMoveFunction, val: number }[]> = new Subject<{ direction: DirectMoveFunction, val: number }[]>();
  public codeLineData$ = this.codeLineData.asObservable();

  private score: Subject<{ x: number, y: number }> = new Subject<{ x: number, y: number }>();
  public score$ = this.score.asObservable();

  private showPopUpEvent: Subject<PopUpEventProps> = new Subject<PopUpEventProps>();
  public showPopUp$ = this.showPopUpEvent.asObservable();

  private closePopUpEvent: Subject<void> = new Subject<void>();
  public closePopUp$ = this.closePopUpEvent.asObservable();

  public setCodeLineData(data: { direction: DirectMoveFunction, val: number }[]): void {
    this.codeLineData.next(data);
  }

  public incrementScore(): void {
    this.score.next();
  }

  public showPopUp(props: PopUpEventProps): void {
    this.showPopUpEvent.next(props);
  }

  public closePopUp(): void {
    this.closePopUpEvent.next();
  }
}
