import {Component, HostListener, OnInit, QueryList, ViewChildren} from '@angular/core';
import {CodeLineComponent} from "../code-line/code-line.component";
import {SharedService} from "../SharedService";
import {DirectMoveFunction} from "../level1/DirectMoveFunction";
import {SyntaxParser} from "../SyntaxParser";
import RollbackManager from "../RollbackManager";

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements OnInit {
  public numbers: number[];
  @ViewChildren(CodeLineComponent)
  public codeLines: QueryList<CodeLineComponent>;

  public isValid = (val: string) => {
    return SyntaxParser.validate(val);
  };

  public sharedService: SharedService;

  constructor(sharedService: SharedService, private rollbackManager: RollbackManager) {
    this.sharedService = sharedService;
    this.sharedService.clearCodeLine$.subscribe(() => {
      this.deleteInput();
    });
  }

  ngOnInit() {
    this.numbers = Array(15).fill(0).map((x, i) => i);
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {

  }

  private fillInput(input: string[]) {
    let idx = 0;
    this.codeLines.forEach(e => e.onInput(input[idx++]));
  }

  private deleteInput() {
    let input = this.codeLines.map((line) => line.codeLine);
    this.rollbackManager.saveRollbackOperation(() => {
      this.fillInput(input)
    });
    this.codeLines.forEach(elem => elem.codeLine = "");
  }

  onClick(): void {
    let errorLines = this.codeLines.filter(elem => elem.isSyntaxValid === false && elem.codeLine != "");
    if (errorLines.length > 0) {
      let errorStr = "";
      for (let error of errorLines) {
        errorStr = errorStr + "line " + error.numberOfLine + "\n";
      }
      errorStr = "Fix errors in:\n" + errorStr;
      alert(errorStr);//TODO: use pop up
      return;

    } else {
      let codeLines = [];
      this.codeLines.forEach(elem => {
        if (elem.codeLine != "") {
          codeLines.push(elem.codeLine);
        }
      });

      let directionList: { direction: DirectMoveFunction, val: number }[] = SyntaxParser.parse(codeLines);
      this.sharedService.setCodeLineData(directionList);
    }
  }


}
