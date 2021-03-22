import { store } from "../model/store";

export const downloadDataCommand = (input: HTMLInputElement): void => {
  const matrix = store.game.board.matirx;

  input.value = JSON.stringify(matrix);
  input.hidden = false;
  input.select();
  document.execCommand("copy", true);
  input.hidden = true;
  // console.warn(input.value);
  // const value = JSON.stringify(matrix);
  // const file = new File([value], "data.json", {
  //   type: "text/plain",
  // });
  // console.warn(value);
  // console.warn(file);
};
