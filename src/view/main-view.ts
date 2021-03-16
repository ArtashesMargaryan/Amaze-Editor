import { lego } from "@armathai/lego";
import { StoreEvent } from "../events/model";
import { GameModel } from "../model/game-model";
import { GameView } from "./game-view";

export class MainView {
  private _view: HTMLDivElement;
  private _gameView: GameView;

  public constructor() {
    this._view = document.createElement("div");
    this._view.id = "main";

    lego.event.on(StoreEvent.gameUpdate, this._onGameModelUpdate, this);
  }

  public get view(): HTMLDivElement {
    return this._view;
  }

  private _onGameModelUpdate(gameModel: GameModel): void {
    gameModel ? this._buildGameView() : this._destroyGameView();
    console.warn(gameModel);
  }

  private _buildGameView(): void {
    this._gameView = new GameView();
    this._view.appendChild(this._gameView.view);
  }

  private _destroyGameView(): void {
    this._view.removeChild(this._gameView.view);
  }
}
