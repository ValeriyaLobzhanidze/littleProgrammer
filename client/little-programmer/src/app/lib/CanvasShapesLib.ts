export default class CanvasShapesLib {

  public static roundStrokeRect(canvas: any, x: number, y: number, w: number, h: number, radius: number,
                                strokeStyle: string, fillStyle: string) {
    let ctx = canvas.getContext('2d');
    let r = x + w;
    let b = y + h;
    ctx.strokeStyle = strokeStyle;
    ctx.fillStyle = fillStyle;
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(r - radius, y);
    ctx.quadraticCurveTo(r, y, r, y + radius);
    ctx.lineTo(r, y + h - radius);
    ctx.quadraticCurveTo(r, b, r - radius, b);
    ctx.lineTo(x + radius, b);
    ctx.quadraticCurveTo(x, b, x, b - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.stroke();
    ctx.fill();
  }
}
