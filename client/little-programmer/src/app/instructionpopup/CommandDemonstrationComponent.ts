import {ComponentI} from "../engine/ComponentI";

export default class CommandDemonstrationComponent implements ComponentI {
  private readonly commands: string[];

  constructor(commands: string[]) {
    this.commands = commands;
  }

  render(canvas: any) {
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "30px KBSticktoIt";
    ctx.fillStyle = "rgba(187, 116, 251, 0.83)";

    let y = 50;
    for (let command of this.commands) {
      ctx.fillText(command, 40, y);
      y += 50;
    }
  }

}
