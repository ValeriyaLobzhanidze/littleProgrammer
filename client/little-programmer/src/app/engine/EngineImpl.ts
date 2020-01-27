import Level from "./Level";
import {Engine} from "./Engine";

export default class EngineImpl implements Engine {
  private readonly canvas: any;
  private level: Level;
  private started: boolean;

  constructor(canvas: any, level: any) {
    this.canvas = canvas;
    this.level = level;
    this.started = false;
  }

  public loop(): void {
    if (this.started == false) {
      return;
    }
    this.level.getRootComponent().render(this.canvas);
    window.requestAnimationFrame(this.loop.bind(this));
  }

  public start() {
    this.started = true;
    window.requestAnimationFrame(this.loop.bind(this));
  }

  public stop() {
    if (this.started == true) {
      let ctx = this.canvas.getContext('2d');
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.started = false;
    }
  }
}
