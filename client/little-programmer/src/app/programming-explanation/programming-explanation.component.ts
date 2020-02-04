import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-programming-explanation',
  templateUrl: './programming-explanation.component.html',
  styleUrls: ['./programming-explanation.component.css']
})
export class ProgrammingExplanationComponent implements OnInit {
  private upperTextContent: string;
  private lowerTextContent: string;

  private upperImageSource: string;
  private lowerImageSource: string;

  constructor(upperTextContent: string, lowerTextContent: string, upperImageSource: string, lowerImageSource: string) {
    this.upperTextContent = upperTextContent;
    this.lowerTextContent = lowerTextContent;
    this.upperImageSource = upperImageSource;
    this.lowerImageSource = lowerImageSource;
  }

  ngOnInit() {
  }

}
