import { lego } from "@armathai/lego";
import { downloadDataCommand } from "./download-data-command";

export const onBuildLevelClickCommand = (input: HTMLInputElement): void => {
  lego.command
    .payload(input)
    //
    .execute(downloadDataCommand);
};

// private _downloadData(data: Record<string, BgItemConfig[]>, input: HTMLInputElement): void {
//   input.value = JSON.stringify(data);
//   input.hidden = false;
//   input.select();
//   document.execCommand('copy', true);
//   input.hidden = true;
// }
