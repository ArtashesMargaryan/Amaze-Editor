import { store } from "../model/store";
import { Themes } from "../model/ui-model";

export const downloadDataCommand = (input: HTMLInputElement, level: number): void => {
  const matrix = store.game.board.matirx;
  const theme = store.ui.theme;
  const actor = store.game.board.actorPos;
  const data: DataConfig = {
    level: `Level_${level}`,
    theme: theme,
    actor: actor,
    board: matrix,
  };

  const json = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
  input.setAttribute("href", json);
  input.setAttribute("download", `Level_${level}.json`);
  input.click();
};

type DataConfig = { level: string; theme: Themes; actor: { x: number; y: number }; board: number[][] };
