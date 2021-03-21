import { BoardConfig } from "../type";
import { GameModel } from "./game-model";
import { ObservableModel } from "./observable-model";
import { UIModel } from "./ui-model";

class Store extends ObservableModel {
  private _game: GameModel = null;
  
  public constructor() {
    super("Store");
    this.makeObservable();
  }
  private _ui: UIModel = null;

  public get game(): GameModel {
    return this._game;
  }

  public get ui(): UIModel {
    return this._ui;
  }

  public initializeGameModel(config: BoardConfig): void {
    if (this._game) {
      this._game.destroy();
      this._game = null;
    }
    this._game = new GameModel();
    this._game.initialize(config);
  }

  public destroyGameModel(): void {
    this._game.destroy();
    this._game = null;
  }

  public initializeUIModel(config: BoardConfig): void {
    this._ui = new UIModel(config);
    this._ui.initialize();
  }

  public destroyUIModel(): void {
    this._ui.destroy();
    this._ui = null;
  }
}

export const store = new Store();
