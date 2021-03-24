import { lego } from "@armathai/lego";
import { hasBoardActorGuard } from "../guard/has-board-actor-guard";
import { store } from "../model/store";
import { downloadDataCommand } from "./download-data-command";

export const onBuildLevelClickCommand = (input: HTMLInputElement, level: number): void => {
  store.ui.level = level;
  lego.command
    .guard(hasBoardActorGuard)
    .payload(input, level)
    //
    .execute(downloadDataCommand);
};
