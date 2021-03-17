import { lego } from "@armathai/lego";
import { onGameReadyCommand } from "./on-game-ready-command";

export const startupCommand = (): void => {
  lego.command
    //
    .execute(onGameReadyCommand);
};
