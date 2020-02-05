import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-programming-explanation',
  templateUrl: './programming-explanation.component.html',
  styleUrls: ['./programming-explanation.component.css']
})
export class ProgrammingExplanationComponent implements OnInit {
  private _upperTextContent: string = "";
  private _lowerTextContent: string = "";

  private _upperImageSource: string = "";
  private _lowerImageSource: string = "";

  public init(upperTextContent: string, lowerTextContent: string, upperImageSource: string, lowerImageSource: string) {
    this._upperTextContent = upperTextContent;
    this._lowerTextContent = lowerTextContent;
    this._upperImageSource = upperImageSource;
    this._lowerImageSource = lowerImageSource;
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
