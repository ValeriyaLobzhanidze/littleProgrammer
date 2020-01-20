import Level from "../engine/Level";

export default class PopUpContent {
  public canvasWidth: number;
  public canvasHeight: number;
  public headerContent: string;
  public buttonValue: string;

  public level: Level;

  constructor(properties: any) {
    this.canvasHeight = properties.canvasHeight || 300;
    this.canvasWidth = properties.canvasWidth || 300;
    this.headerContent = properties.headerContent || "Default header";
    this.buttonValue = properties.buttonValue || "Ok";
    this.level = properties.level || null;
  }
}
