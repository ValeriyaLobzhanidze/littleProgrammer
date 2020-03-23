export default class InputTextComponentProps {
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public inputs: string[];
  public color: string;
  public fontSize: number;
  public isReverseNeeded = false;
  public isDelayedNeeded = false;
  public isFreezingNeeded = true;
  public isSyntaxHighlightingNeeded = false;

  public static copy(props: InputTextComponentProps): InputTextComponentProps {
    let propsCopy = new InputTextComponentProps();
    propsCopy.x = props.x;
    propsCopy.y = props.y;
    propsCopy.width = props.width;
    propsCopy.height = props.height;
    propsCopy.inputs = props.inputs;
    propsCopy.color = props.color;
    propsCopy.fontSize = props.fontSize;
    propsCopy.isReverseNeeded = props.isReverseNeeded;
    propsCopy.isDelayedNeeded = props.isDelayedNeeded;
    propsCopy.isFreezingNeeded = props.isFreezingNeeded;
    propsCopy.isSyntaxHighlightingNeeded = props.isSyntaxHighlightingNeeded;
    return propsCopy;
  }
}
