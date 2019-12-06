import {Component, OnInit, Input} from '@angular/core';

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

  constructor() {
  }

  ngOnInit() {
  }

  onInput() {
    let pattern = "([a-zA-Z]+)\\([0-9]{1,2}\\);";
    let match = this.codeLine.match(pattern);
    if (match == null || match[0].length != this.codeLine.length) {
      this.isSyntaxValid = false;
      return;
    }
    this.isSyntaxValid = this.isValid(match[1]);
  }
}
