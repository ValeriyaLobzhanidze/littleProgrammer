export interface MatrixRender {
  render(): void;
  getCords(): { x: number, y: number }[];
  getNumOfRows(): number;
  getNumOfCols(): number;
}
