import { store } from "../model/store";

export function hasBoardActorGuard(): boolean {
  if (store.game && store.game.board && store.game.board.actor) {
    return store.game.board.actor;
  }
}
