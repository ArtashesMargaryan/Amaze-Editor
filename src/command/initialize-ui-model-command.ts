import { store } from "../model/store";
import { BoardConfig } from "../type";

export const initializeUIModelCommand = (config: BoardConfig): void => {
  store.initializeUIModel(config);
};
