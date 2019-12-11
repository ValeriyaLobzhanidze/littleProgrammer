import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {DirectMoveFunctions} from "./DirectMoveFunctions";

@Injectable()
export class SharedService {
  private data: Subject<{ direction: DirectMoveFunctions, val: number }[]> = new Subject<{ direction: DirectMoveFunctions, val: number }[]>();
  public currentData = this.data.asObservable();

  public setData(data: { direction: DirectMoveFunctions, val: number }[]): void {
    this.data.next(data);
  }

}
