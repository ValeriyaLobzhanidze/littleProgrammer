import {SharedService} from "../SharedService";
import Global from "../global/Global";

export default class RoundGridComponentProps {
  public radius: number = 12;
  public canvasWidth: number;
  public canvasHeight: number;

  public isDefaultTarget: boolean;
  public isDefaultRoute: boolean;
  public isPopUpUsed: boolean;
  public sharedService: SharedService;

  public canvasTop: number = 0;
  public canvasLeft: number = 0;

  public topTargetRect: number = 2;
  public leftTargetRect: number = 2;

  public targetColor = Global.DEEP_GREEN;
  public commonColor = Global.LIGHT_GREEN;
}
