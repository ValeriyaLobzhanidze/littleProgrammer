import {SharedService} from "../SharedService";

export default class RoundGridComponentProps {
  public canvasWidth: number;
  public canvasHeight: number;

  public isDefaultTarget: boolean;
  public isDefaultRoute: boolean;
  public isPopUpUsed: boolean;
  public sharedService: SharedService;

  public canvasTop: number = 0;
  public canvasLeft: number = 0;
}
