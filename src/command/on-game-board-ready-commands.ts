import { store } from "../model/store";

export const onGameBoardReady = (): void => {
  /// VERCNELUYA MATRIX U CELLI CLICK KILL ANI
  // store.game.board.checkBoard();
  store.game.board.removeEventCells();
};
