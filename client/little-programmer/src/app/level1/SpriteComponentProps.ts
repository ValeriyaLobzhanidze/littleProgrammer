import {SharedService} from "../SharedService";
import DirectionValue from "./DirectionValue";
import Point from "./Point";

export default class SpriteComponentProps {
  public spriteWidth = 30;
  public spriteHeight = 38;
  public numberOfFrames = 6;
  public ticksPerFrame = 3;

  public sharedService: SharedService;
  public image = "/assets/images/radish.png";
  public route: DirectionValue[];
  public matrixCords: Point[][];
}
