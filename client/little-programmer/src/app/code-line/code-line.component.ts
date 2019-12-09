import {Component, OnInit, Input} from '@angular/core';
import {SharedService} from "../SharedService";

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

  constructor(sharedService: SharedService) {
    this.sharedService = sharedService;
  }

  ngOnInit() {
  }

  onInput() {
    this.isSyntaxValid = this.isValid(this.codeLine);
  }
}
