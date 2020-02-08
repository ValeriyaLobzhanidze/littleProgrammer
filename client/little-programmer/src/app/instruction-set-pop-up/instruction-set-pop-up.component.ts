import { Component, OnInit } from '@angular/core';
import {Init} from "../pager/Init";
import {Engine} from "../engine/Engine";
import Level from "../engine/Level";
import EngineImpl from "../engine/EngineImpl";
import InstructionSetComponent from "../instructionset/InstructionSetComponent";

@Component({
  selector: 'app-instruction-set-pop-up',
  templateUrl: './instruction-set-pop-up.component.html',
  styleUrls: ['./instruction-set-pop-up.component.css']
})
export class InstructionSetPopUpComponent implements OnInit, Init {

  private header: string;
  private canvasWidth: number = 350;
  private canvasHeight: number = 300;

  private engine: Engine;
  private level: Level;

  constructor() {
  }

  private load(): void {
    let canvas = document.getElementById('canvas') as any;
    this.engine = new EngineImpl(canvas, this.level);
    this.engine.start();
  }

  ngOnInit() {
    this.load();
  }

  init(props: any) {
    this.header = props.header || "";
    this.level = new Level(new InstructionSetComponent(props.instructionSet, props.comment));
  }
}
