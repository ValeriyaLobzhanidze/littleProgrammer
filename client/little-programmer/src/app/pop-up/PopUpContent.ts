import Level from "../engine/Level";

export default class PopUpContent {
  public headerContent: string;
  public buttonValue: string;
  public canvasWidth: string;
  public canvasHeight: string;
  public mainContent: string;
  public getLevel: () => Level;

  constructor(properties: any) {
    this.headerContent = properties.headerContent || "Default header";
    this.buttonValue = properties.buttonValue || "Ok";
    this.getLevel = properties.getLevel || null;
    this.canvasWidth = properties.canvasWidth == null ? "300" : properties.canvasWidth;
    this.canvasHeight = properties.canvasHeight == null ? "300" : properties.canvasHeight;
    this.mainContent = properties.mainContent || "";
  }
}
