import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {DirectMoveFunctions} from "./DirectMoveFunctions";

@Injectable()
export class SharedService {
  private data: Subject<Map<DirectMoveFunctions, number>> = new Subject<Map<DirectMoveFunctions, number>>();
  public currentData = this.data.asObservable();

  public setData(data: Map<DirectMoveFunctions, number>): void {
    this.data.next(data);
  }

}
