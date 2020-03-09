import {DirectMoveFunction} from "./level1/DirectMoveFunction";

export class SyntaxParser {
  private static readonly PATTERN = "([a-zA-Z]+)\\(([0-9]{1,2})\\);";

  private static readonly GRAMMAR_MAP: Map<string, DirectMoveFunction> = new Map<string, DirectMoveFunction>([
    ["moveRight", DirectMoveFunction.MOVE_RIGHT],
    ["moveLeft", DirectMoveFunction.MOVE_LEFT],
    ["moveUp", DirectMoveFunction.MOVE_UP],
    ["moveDown", DirectMoveFunction.MOVE_DOWN]
  ]);

  public static validate(codeLine: string): boolean {
    let match = codeLine.match(SyntaxParser.PATTERN);
    if (match == null || match[0].length != codeLine.length) {
      return false;
    }
    return SyntaxParser.GRAMMAR_MAP.has(match[1]);
  }

  public static parse(codeLines: string[]): { direction: DirectMoveFunction, val: number }[] {
    let directionList: { direction: DirectMoveFunction, val: number }[] = [];
    for (let codeLine of codeLines) {
      let match = codeLine.match(SyntaxParser.PATTERN);
      let entry = {direction: SyntaxParser.GRAMMAR_MAP.get(match[1]), val: parseInt(match[2])};
      directionList.push(entry);
    }
    return directionList;
  }
}
