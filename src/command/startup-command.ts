import { lego } from "@armathai/lego";
import { store } from "../model/store";

export const startupCommand = (): void => {
  lego.command
    //
    .execute(initializeStoreModelCommand)
    .execute(initializeGameModelCommand);
};

export const initializeStoreModelCommand = (): void => {
  store.initialize();
};

export const initializeGameModelCommand = (): void => {
  store.initializeGameModel();
};
