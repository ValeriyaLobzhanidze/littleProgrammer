import Level from "./Level";
import {Engine} from "./Engine";

export default class EngineImpl implements Engine {
  private readonly canvas: any;
  private level: Level;
  private started: boolean;
  private readonly msPerFrame = 1 / 60;

  constructor(canvas: any, level: any) {
    this.canvas = canvas;
    this.level = level;
    this.started = false;
  }

  public loop(): void {
    if (this.started == false) {
      return;
    }
    let started = new Date();
    this.level.getRootComponent().render(this.canvas);
    let taken = new Date().getTime() - started.getTime();
    let nextDelay = 0;
    if (taken < this.msPerFrame) {
      nextDelay = this.msPerFrame - taken;
    }
    window.setTimeout(this.loop.bind(this), nextDelay);
  }

  public start() {
    this.started = true;
    window.setTimeout(this.loop.bind(this), 0);
  }

  public stop() {
    if (this.started == true) {
      let ctx = this.canvas.getContext('2d');
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.started = false;
    }
  }
}
