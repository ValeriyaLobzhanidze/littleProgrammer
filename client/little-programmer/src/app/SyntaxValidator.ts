import {DirectMoveFunctions} from "./DirectMoveFunctions";

export class SyntaxValidator {

  private stringToEnumMap: Map<string, DirectMoveFunctions> = new Map<string, DirectMoveFunctions>([
    ["moveRight", DirectMoveFunctions.MOVE_RIGHT],
    ["moveLeft", DirectMoveFunctions.MOVE_LEFT],
    ["moveUp", DirectMoveFunctions.MOVE_UP],
    ["moveDown", DirectMoveFunctions.MOVE_DOWN]
  ]);

  public validate(value: string): boolean {
    return this.stringToEnumMap.has(value);
  }

  public generateEnumToValueMap(stringToValueMap: Map<string, number>) {

  }
}
