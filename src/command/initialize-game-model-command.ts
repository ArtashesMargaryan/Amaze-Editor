import { store } from "../model/store";
import { BoardConfig } from "../type";

export const initializeGameModelCommand = (config: BoardConfig): void => {
  store.initializeGameModel(config);
};
