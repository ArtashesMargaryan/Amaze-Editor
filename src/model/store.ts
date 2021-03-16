import { GameModel } from "./game-model";
import { ObservableModel } from "./observable-model";

class Store extends ObservableModel {
  private _game: GameModel = null;

  public constructor() {
    super("Store");
    this.makeObservable();
  }

  public get game(): GameModel {
    return this._game;
  }

  public initializeGameModel(): void {
    this._game = new GameModel();
    this._game.initialize();
  }

  public destroyGameModel(): void {
    this._game.destroy();
    this._game = null;
  }
}

export const store = new Store();
