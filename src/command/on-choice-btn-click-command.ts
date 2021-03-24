import { store } from "../model/store";

export const onChoiceBtnClickCommand = (theme: string): void => {
  if (store.ui) {
    store.ui.setTheme(theme);
  }
};
