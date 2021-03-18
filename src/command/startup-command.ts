import { lego } from "@armathai/lego";
import { mapGameCommandsCommand } from "./lego/map-game-commands-command";
import { onGameReadyCommand } from "./on-game-ready-command";

export const startupCommand = (): void => {
  lego.command
    //
    .execute(onGameReadyCommand)
    .execute(mapGameCommandsCommand);
};
