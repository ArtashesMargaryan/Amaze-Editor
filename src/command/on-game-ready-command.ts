import { lego } from "@armathai/lego";
import { UIViewEvent } from "../events/view";
import { onGameStartCommand } from "./on-game-start-command";

export const onGameReadyCommand = (): void => {
  lego.event.on(UIViewEvent.gameConfigReady, onGameStartCommand);
};
