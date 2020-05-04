import {Component, OnInit, Input} from '@angular/core';
import {SharedService} from "../SharedService";
import RollbackManager from "../RollbackManager";

@Component({
  selector: 'app-code-line',
  templateUrl: './code-line.component.html',
  styleUrls: ['./code-line.component.css']
})
export class CodeLineComponent implements OnInit {
  public codeLine: string = "";
  public readonly maxLength: number = 40;
  public isSyntaxValid: boolean = true;

  @Input() public numberOfLine: number;
  @Input() public isValid: (val: string) => boolean;

  public sharedService: SharedService;

  constructor(sharedService: SharedService, private rollbackManager: RollbackManager) {
    this.sharedService = sharedService;
  }

  ngOnInit() {
  }

  onInput(value: string) {
    let oldValue = this.codeLine;
    this.rollbackManager.saveRollbackOperation( () => {
      this.codeLine = oldValue;
    });
    this.codeLine = value;
    this.isSyntaxValid = this.isValid(value);
  }
}
