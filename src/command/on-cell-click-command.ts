import { store } from "../model/store";

export function onCellClick(uuid: string): void {
  store.game.board.updateCellStatus(uuid);
  // lego.event.on(UIViewEvent.gameConfigReddy, onGameStartCommand);
}
