import { store } from "../model/store";

export const onGameBoardReady = (): void => {
  /// VERCNELUYA MATRIX U CELLI CLICK KILL ANI
  // store.game.board.checkBoard();
  if (store && store.game && store.game.board) {
    // store.ui.selectTestBtn();
    store.game.board.changSelected();
    // store.game.board.createMatrix();
    return;
  }
};
