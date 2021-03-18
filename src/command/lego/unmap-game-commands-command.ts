import { lego } from "@armathai/lego";
import { gameCommands } from "../../configs/lego-config";

export const unmapGameCommandsCommand = (): void => {
  gameCommands.forEach((entry) => lego.command.off(entry.event, entry.command));
};
