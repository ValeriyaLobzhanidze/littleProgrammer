export interface CanvasAnimation {
  shouldEnd: () => boolean;
  update: () => { dx: number, dy: number };
  getNumOfLastErrLine(): number;
}
