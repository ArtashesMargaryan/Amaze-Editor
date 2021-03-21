import { BOARD_STATUS } from "../constatnts";
import { store } from "../model/store";

export function onCellClick(uuid: string): void {
  if (store.game.board.boardReadyIn == BOARD_STATUS.change) {
    store.game.board.updateCellStatus(uuid);

    ///runTimy check matrix checkMatrix()
  }
  // lego.event.on(UIViewEvent.gameConfigReddy, onGameStartCommand);
}
