import {DirectMoveFunctions} from "./DirectMoveFunctions";

export class SyntaxParser {
  private pattern = "([a-zA-Z]+)\\(([0-9]{1,2})\\);";

  private stringToEnumMap: Map<string, DirectMoveFunctions> = new Map<string, DirectMoveFunctions>([
    ["moveRight", DirectMoveFunctions.MOVE_RIGHT],
    ["moveLeft", DirectMoveFunctions.MOVE_LEFT],
    ["moveUp", DirectMoveFunctions.MOVE_UP],
    ["moveDown", DirectMoveFunctions.MOVE_DOWN]
  ]);

  public validate(codeLine: string): boolean {
    let match = codeLine.match(this.pattern);
    if (match == null || match[0].length != codeLine.length) {
      return false;
    }
    return this.stringToEnumMap.has(match[1]);
  }

  public parse(codeLines: string[]): Map<DirectMoveFunctions, number> {
    let enumToNumberValue = new Map<DirectMoveFunctions, number>();
    for (let codeLine of codeLines) {
      let match = codeLine.match(this.pattern);
      enumToNumberValue.set(this.stringToEnumMap.get(match[1]), parseInt(match[2]));
    }
    return enumToNumberValue;
  }
}
