import { lego } from "@armathai/lego";
import { gameCommands } from "../../configs/lego-config";

export const mapGameCommandsCommand = (): void => {
  gameCommands.forEach((entry) => lego.command.on(entry.event, entry.command));
};
