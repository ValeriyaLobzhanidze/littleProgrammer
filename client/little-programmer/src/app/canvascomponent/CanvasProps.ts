import {Type} from "@angular/core";

export default class CanvasProps {
  header: string;
  rootComponentType: Type<any>;
  rootComponentProps: any;
  canvasHeight: number;
  canvasWidth: number;
}
