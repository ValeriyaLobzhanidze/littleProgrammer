export interface Render {
  render: () => void;
  getCords(): { x: number, y: number }[];
}
