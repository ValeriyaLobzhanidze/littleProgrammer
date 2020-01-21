import Level from "../engine/Level";

export default class PopUpContent {
  public headerContent: string;
  public buttonValue: string;

  public level: Level;

  constructor(properties: any) {
    this.headerContent = properties.headerContent || "Default header";
    this.buttonValue = properties.buttonValue || "Ok";
    this.level = properties.level || null;
  }
}
