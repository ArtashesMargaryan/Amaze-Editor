import { BoardConfig } from "../type";
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

  public initializeGameModel(config: BoardConfig): void {
    this._game = new GameModel();
    this._game.initialize(config);
  }

  public destroyGameModel(): void {
    this._game.destroy();
    this._game = null;
  }
}

export const store = new Store();
