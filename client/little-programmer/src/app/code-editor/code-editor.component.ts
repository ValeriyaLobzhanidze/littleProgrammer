import {Component, HostListener, OnInit, QueryList, ViewChildren} from '@angular/core';
import {CodeLineComponent} from "../code-line/code-line.component";

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements OnInit {
  public numbers: number[];
  @ViewChildren(CodeLineComponent)
  public codeLines: QueryList<CodeLineComponent>;

  constructor() { }

  ngOnInit() {
    this.numbers = Array(15).fill(0).map((x,i)=>i);
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {

  }

  onClick(): void {

  }
}
