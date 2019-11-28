import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-code-line',
  templateUrl: './code-line.component.html',
  styleUrls: ['./code-line.component.css']
})
export class CodeLineComponent implements OnInit {
  public codeLine: string = "";
  public readonly maxLength: number = 40;
  @Input() public numberOfLine: number;

  constructor() { }

  ngOnInit() {
  }

}
