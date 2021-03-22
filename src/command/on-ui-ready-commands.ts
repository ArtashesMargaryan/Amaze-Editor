import { store } from "../model/store";

export const onUIViewReady = (): void => {
  if (store.ui) {
    store.ui.selectTestBtn();
  }
};
