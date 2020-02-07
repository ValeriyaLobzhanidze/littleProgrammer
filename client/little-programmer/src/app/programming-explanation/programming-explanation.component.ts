import {Component, OnInit} from '@angular/core';
import {Init} from "../pager/Init";

@Component({
  selector: 'app-programming-explanation',
  templateUrl: './programming-explanation.component.html',
  styleUrls: ['./programming-explanation.component.css']
})
export class ProgrammingExplanationComponent implements OnInit, Init {
  private _upperTextContent: string;
  private _lowerTextContent: string;

  private _upperImageSource: string;
  private _lowerImageSource: string;

  public init(props: any) {
    this._upperTextContent = props.upperTextContent || "";
    this._lowerTextContent = props.lowerTextContent || "";
    this._upperImageSource = props.upperImageSource || "";
    this._lowerImageSource = props.lowerImageSource || "";
  }

  get upperTextContent(): string {
    return this._upperTextContent;
  }

  get lowerTextContent(): string {
    return this._lowerTextContent;
  }

  get upperImageSource(): string {
    return this._upperImageSource;
  }

  get lowerImageSource(): string {
    return this._lowerImageSource;
  }

  ngOnInit() {
  }

}
