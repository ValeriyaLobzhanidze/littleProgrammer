import StateMachine from "../../statemachine/StateMachine";
import StateEntry from "../../statemachine/StateEntry";
import {TextState} from "./TextState";

/**
 *
 */
export default class AnimatedTextStateMachineBuilder {
  public static build(text: string, isReverseNeeded = false, isDelayNeeded = true, isFreezingNeeded = true, delayTime: number = 3,
                      freezingTime: number = 5): StateMachine<string> {
    let slowDownStep = Math.floor(text.length * 0.5);
    let speedUpStep = Math.floor(text.length * 0.75);
    let stateList: StateEntry<string>[] = [];

    if (!isDelayNeeded) {
      stateList.push(new StateEntry<string>(TextState.DIRECT_MOVE_NORMAL_SPEED, text));
    } else {
      stateList.push(new StateEntry<string>(TextState.DIRECT_MOVE_NORMAL_SPEED, text.substring(0, slowDownStep)));
      for (let i = slowDownStep + 1; i <= speedUpStep; i++) {
        for (let j = 0; j < delayTime; j++) {
          stateList.push(new StateEntry<string>(TextState.FROZEN, text.substring(0, i)));
        }
      }
      stateList.push(new StateEntry<string>(TextState.DIRECT_MOVE_NORMAL_SPEED, text.slice(0, text.length)));
    }

    if (isReverseNeeded) {
      for (let j = 0; j < freezingTime; j++) {
        stateList.push(new StateEntry<string>(TextState.FROZEN, text.substring(0, text.length)));
      }
      stateList.push(new StateEntry<string>(TextState.REVERSED, ""));
    }

    let stateToHandler: Map<any, (value: string) => string> = new Map<any, (value: string) => string>();
    let normalSpeedHandler = (value: string) => text.substr(0, value.length + 1);
    let frozenHandler = (value: string) => value;
    let reversedHandler = (value: string) => text.substr(0, value.length - 1);
    stateToHandler.set(TextState.DIRECT_MOVE_NORMAL_SPEED, normalSpeedHandler);
    stateToHandler.set(TextState.REVERSED, reversedHandler);
    stateToHandler.set(TextState.FROZEN, frozenHandler);

    let stateToComparator: Map<any, (value1: string, value2: string) => boolean> = new Map<any, (value1: string, value2: string) => boolean>();
    let stringComparator = (value1: string, value2: string) => value1 !== value2;
    let frozenComparator = (value1: string, value2: string) => false;
    stateToComparator.set(TextState.DIRECT_MOVE_NORMAL_SPEED, stringComparator);
    stateToComparator.set(TextState.REVERSED, stringComparator);
    stateToComparator.set(TextState.FROZEN, frozenComparator);

    return new StateMachine<string>("", stateList, stateToHandler, stateToComparator);
  }

}
