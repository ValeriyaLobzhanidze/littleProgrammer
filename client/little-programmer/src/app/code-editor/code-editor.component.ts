import {Component, HostListener, OnInit, QueryList, ViewChildren} from '@angular/core';
import {CodeLineComponent} from "../code-line/code-line.component";
import {SharedService} from "../SharedService";
import {DirectMoveFunction} from "../level1/DirectMoveFunction";
import {SyntaxParser} from "../SyntaxParser";

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements OnInit {
  public numbers: number[];
  @ViewChildren(CodeLineComponent)
  public codeLines: QueryList<CodeLineComponent>;

  private attemptsCache: string[][] = [];

  public isValid = (val: string) => {
    return SyntaxParser.validate(val);
  };

  public sharedService: SharedService;

  constructor(sharedService: SharedService) {
    this.sharedService = sharedService;
    this.sharedService.clearCodeLine$.subscribe(() => {
      this.deleteInput();
    });
    this.sharedService.showLastTry$.subscribe(() => {
      this.extractFromCache();
    })
  }

  ngOnInit() {
    this.numbers = Array(15).fill(0).map((x, i) => i);
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {

  }

  private extractFromCache() {
    if (this.attemptsCache.length > 0) {
      let lastAttempt = this.attemptsCache[this.attemptsCache.length - 1];
      this.fillInput(lastAttempt);
      this.attemptsCache.pop();
    }
  }

  private fillInput(input: string[]) {
    let idx = 0;
    this.codeLines.forEach(e => e.codeLine = input[idx++]);
    this.codeLines.forEach(e => e.onInput());
  }

  private deleteInput() {
    this.saveToCache();
    this.codeLines.forEach(elem => elem.codeLine = "");
  }

  private saveToCache() {
    let copy = [];
    for (let line of this.codeLines.toArray()) {
      copy.push(line.codeLine);
    }
    this.attemptsCache.push(copy);
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
