import { Component, OnInit } from '@angular/core';
import SimplePopUpProps from "./SimplePopUpProps";

@Component({
  selector: 'app-simple-pop-up',
  templateUrl: './simple-pop-up.component.html',
  styleUrls: ['./simple-pop-up.component.css']
})
export class SimplePopUpComponent implements OnInit {

  private header: string;
  private imageSource: string;

  init(props: SimplePopUpProps) {
    this.header = props.header;
    this.imageSource = props.imageSrc;
  }

  constructor() { }

  ngOnInit() {
  }

}
