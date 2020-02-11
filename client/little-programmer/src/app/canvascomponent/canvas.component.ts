import {Component, OnInit} from '@angular/core';
import Level from "../engine/Level";
import {Engine} from "../engine/Engine";
import EngineImpl from "../engine/EngineImpl";
import {Init} from "../pager/Init";
import {ComponentI} from "../engine/ComponentI";
import CanvasProps from "./CanvasProps";

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit, Init {
  private header: string;
  private rootComponent: ComponentI;

  private canvasWidth: number;
  private canvasHeight: number;

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

  init(props: CanvasProps) {
    this.header = props.header || "";
    this.rootComponent = new props.rootComponentType();
    if (props.rootComponentProps) {
      (this.rootComponent as unknown as Init).init(props.rootComponentProps);
    }
    this.level = new Level(this.rootComponent);
    this.canvasHeight = props.canvasHeight;
    this.canvasWidth = props.canvasWidth;
  }

}
