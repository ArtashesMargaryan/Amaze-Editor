import { store } from "../model/store";

export function onKeyDownCommand(event: string): void {
  store.game.board.moveActor(event);
}
