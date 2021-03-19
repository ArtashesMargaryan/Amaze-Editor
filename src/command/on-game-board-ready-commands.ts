import { store } from "../model/store";

export const onGameBoardReady = (): void => {
  if (store && store.game && store.game.board) {
    store.game.board.changSelected();
    store.game.board.createMatrix();
  }
};
