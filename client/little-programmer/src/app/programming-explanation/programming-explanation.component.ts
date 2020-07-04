import {ChangeDetectorRef, Component, ElementRef, Injectable, OnInit, ViewChild, ViewRef} from '@angular/core';
import {Init} from "../pager/Init";

@Component({
  selector: 'app-programming-explanation',
  templateUrl: './programming-explanation.component.html',
  styleUrls: ['./programming-explanation.component.css']
})
export class ProgrammingExplanationComponent implements OnInit, Init {
  private upperTextContent: string;
  private lowerTextContent: string;

  private upperImageSource: string;
  private lowerImageSource: string;

  constructor(){
  }

  public init(props: any) {
    this.upperTextContent = props.upperTextContent || '';
    this.lowerTextContent = props.lowerTextContent || '';
    this.upperImageSource = props.upperImageSource || '';
    this.lowerImageSource = props.lowerImageSource || '';
  }

  ngOnInit() {
  }

}
