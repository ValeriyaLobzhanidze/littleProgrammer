export default class PopUpContent {
  public textContent: string;
  public canvasWidth: number;
  public canvasHeight: number;

  public outlineBlockWidth: number;
  public outlineBlockHeight: number;

  public animation;
  public buttonValue: string;

  constructor(properties: any) {
    this.textContent = properties.textContent || "Default popUp content";
    this.canvasHeight = properties.canvasHeight || 300;
    this.canvasWidth = properties.canvasWidth || 300;
    this.outlineBlockHeight = properties.outlineBlockHeight || 400;
    this.outlineBlockWidth = properties.outlineBlockWidth || 550;
    this.animation = properties.animation || null;
    this.buttonValue = properties.buttonValue || "Ok";
  }
}
