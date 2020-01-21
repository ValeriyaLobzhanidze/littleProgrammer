export interface Animation {
  shouldEnd(): boolean;

  update(): { dx: number, dy: number };

  getNumOfLastErrLine(): number;

}
