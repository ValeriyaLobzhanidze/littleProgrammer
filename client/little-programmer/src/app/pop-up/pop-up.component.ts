import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {
  public textContent = "Wonderful!!!";
  @Output() close = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  public closePopUp(): void{
    this.close.emit();
  }

}
