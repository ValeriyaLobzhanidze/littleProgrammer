import {Component, OnInit} from '@angular/core';
import RoundGridComponent from "../level1/RoundGridComponent";
import Level from "../engine/Level";
import {Engine} from "../engine/Engine";
import EngineImpl from "../engine/EngineImpl";

@Component({
  selector: 'app-game-demonstration-pop-up',
  templateUrl: './game-demonstration-pop-up.component.html',
  styleUrls: ['./game-demonstration-pop-up.component.css']
})
export class GameDemonstrationPopUpComponent implements OnInit {
  public header: string = "Help radish visit all purple points!";
  public buttonValue: string = "Ok";
  private canvasWidth: number = 350;
  private canvasHeight: number = 300;

  private engine: Engine;
  private readonly level: Level;

  constructor() {
    this.level = new Level(new RoundGridComponent(this.canvasWidth, this.canvasHeight));
  }

  private load(): void {
    let canvas = document.getElementById('canvas') as any;
    this.engine = new EngineImpl(canvas, this.level);
    this.engine.start();
  }

  ngOnInit() {
    this.load();
  }

}
