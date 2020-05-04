import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export default class RollbackManager {
  private static readonly CAPACITY: number = 20;
  private stack: any[] = [];

  constructor() {
  }

  public saveRollbackOperation(operation: any) {
    if (this.stack.length >= RollbackManager.CAPACITY) {
      this.stack = [];
    }
    this.stack.push(operation)
  }

  public rollbackToLast() {
    if(this.stack.length > 0) {
      this.stack[this.stack.length - 1]();
      this.stack.splice(this.stack.length - 1);
    }
  }
}
