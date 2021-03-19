import { lego } from "@armathai/lego";
import { mapGameCommandsCommand } from "./lego/map-game-commands-command";
import { onBuildGameCommand } from "./on-game-ready-command";

export const startupCommand = (): void => {
  lego.command
    //
    .execute(onBuildGameCommand)
    .execute(mapGameCommandsCommand);
};
