import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-popup',
  templateUrl: './settings-popup.component.html',
  styleUrls: ['./settings-popup.component.css']
})
export class SettingsPopupComponent implements OnInit {
  private velocity: number;
  private header: string = 'Game settings';

  constructor() { }

  ngOnInit() {
  }

}
