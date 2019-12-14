import {DirectMoveFunction} from "./DirectMoveFunction";

export class SyntaxParser {
  private pattern = "([a-zA-Z]+)\\(([0-9]{1,2})\\);";

  private stringToEnumMap: Map<string, DirectMoveFunction> = new Map<string, DirectMoveFunction>([
    ["moveRight", DirectMoveFunction.MOVE_RIGHT],
    ["moveLeft", DirectMoveFunction.MOVE_LEFT],
    ["moveUp", DirectMoveFunction.MOVE_UP],
    ["moveDown", DirectMoveFunction.MOVE_DOWN]
  ]);

  public validate(codeLine: string): boolean {
    let match = codeLine.match(this.pattern);
    if (match == null || match[0].length != codeLine.length) {
      return false;
    }
    return this.stringToEnumMap.has(match[1]);
  }

  public parse(codeLines: string[]): { direction: DirectMoveFunction, val: number }[] {
    let directionList: { direction: DirectMoveFunction, val: number }[] = [];
    for (let codeLine of codeLines) {
      let match = codeLine.match(this.pattern);
      let entry = {direction: this.stringToEnumMap.get(match[1]), val: parseInt(match[2])};
      directionList.push(entry);
    }
    return directionList;
  }
}
