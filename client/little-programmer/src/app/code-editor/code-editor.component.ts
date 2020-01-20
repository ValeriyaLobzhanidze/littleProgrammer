import {Component, HostListener, OnInit, QueryList, ViewChildren} from '@angular/core';
import {CodeLineComponent} from "../code-line/code-line.component";
import {SyntaxParser} from "../SyntaxParser";
import {SharedService} from "../SharedService";
import {DirectMoveFunction} from "../level1/DirectMoveFunction";

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements OnInit {
  public numbers: number[];
  @ViewChildren(CodeLineComponent)
  public codeLines: QueryList<CodeLineComponent>;
  private syntaxParser: SyntaxParser = new SyntaxParser();

  public isValid = (val: string) => {
    return this.syntaxParser.validate(val);
  };

  public sharedService: SharedService;

  constructor(sharedService: SharedService) {
    this.sharedService = sharedService;
  }

  ngOnInit() {
    this.numbers = Array(15).fill(0).map((x, i) => i);
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {

  }

  onClick(): void {
    let errorLines = this.codeLines.filter(elem => elem.isSyntaxValid === false && elem.codeLine != "");
    if (errorLines.length > 0) {
      let errorStr = "";
      for (let error of errorLines) {
        errorStr = errorStr + "line " + error.numberOfLine + "\n";
      }
      errorStr = "Fix errors in:\n" + errorStr;
      alert(errorStr);
      return;

    } else {
      let codeLines = [];
      this.codeLines.forEach(elem => {
        if (elem.codeLine != "") {
          codeLines.push(elem.codeLine);
        }
      });

      let directionList: { direction: DirectMoveFunction, val: number }[] = this.syntaxParser.parse(codeLines);
      this.sharedService.setCodeLineData(directionList);
    }
  }
}
