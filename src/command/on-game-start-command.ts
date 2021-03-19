import { lego } from "@armathai/lego";
import { store } from "../model/store";
import { BoardConfig } from "../type";
import { initializeGameModelCommand } from "./initialize-game-model-command";
import { initializeStoreModelCommand } from "./initialize-store-model-command copy";
import { initializeUIModelCommand } from "./initialize-ui-model-command";

export const onGameStartCommand = (config: BoardConfig): void => {
  if (store && store.game) {
    store.destroyGameModel();
    store.destroyUIModel();
  }
  lego.command
    //
    .execute(initializeStoreModelCommand)
    .payload(config)
    .execute(initializeGameModelCommand)
    .payload(config)
    .execute(initializeUIModelCommand);
};
