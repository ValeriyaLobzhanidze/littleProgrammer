import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {DirectMoveFunction} from "./DirectMoveFunction";

@Injectable()
export class SharedService {
  private codeLineData: Subject<{ direction: DirectMoveFunction, val: number }[]> = new Subject<{ direction: DirectMoveFunction, val: number }[]>();
  public currentCodeLineData = this.codeLineData.asObservable();

  private score: Subject<{ x: number, y: number }> = new Subject<{ x: number, y: number }>();
  public currentScore = this.score.asObservable();

  private levelCompleted: Subject<void> = new Subject<void>();//TODO it should be showPopUpEvent too
  public isLevelCompleted = this.levelCompleted.asObservable();

  private showPopUpEvent: Subject<void> = new Subject<void>();
  public showTask$ = this.showPopUpEvent.asObservable();

  public setCodeLineData(data: { direction: DirectMoveFunction, val: number }[]): void {
    this.codeLineData.next(data);
  }

  public setScore(targetCord: { x: number, y: number }): void {
    this.score.next(targetCord);
  }

  public completeLevel(): void {
    this.levelCompleted.next();
  }

  public showTask(): void {
    this.showPopUpEvent.next();
  }
}
