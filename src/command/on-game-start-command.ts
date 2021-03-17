import { lego } from "@armathai/lego";
import { BoardConfig } from "../type";
import { initializeGameModelCommand } from "./initialize-game-model-command";
import { initializeStoreModelCommand } from "./initialize-store-model-command copy";

export const onGameStartCommand = (config: BoardConfig): void => {
  lego.command
    //
    .execute(initializeStoreModelCommand)
    .payload(config)
    .execute(initializeGameModelCommand);
};
