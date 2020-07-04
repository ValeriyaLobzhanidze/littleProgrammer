import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-level-menu',
  templateUrl: './level-menu.component.html',
  styleUrls: ['./level-menu.component.css']
})
export class LevelMenuComponent implements OnInit {
  private idList: number [];
  private static readonly LEVEL_CAPACITY = 8;

  constructor() { }

  ngOnInit() {
    this.idList = Array(LevelMenuComponent.LEVEL_CAPACITY).fill(0).map((x, i) => i);
  }

}
