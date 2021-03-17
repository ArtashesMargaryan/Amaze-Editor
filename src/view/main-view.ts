import { lego } from "@armathai/lego";
import { StoreEvent } from "../events/model";
import { GameModel } from "../model/game-model";
import { GameView } from "./game-view";
import { UIView } from "./ui-view";

export class MainView {
  private _view: HTMLDivElement;
  // private _btn: HTMLButtonElement;
  // private _borderConfig:{}
  private _gameView: GameView;
  private _uiView: UIView;

  public constructor() {
    this._view = document.createElement("div");
    this._view.id = "main";
    lego.event.on(StoreEvent.gameUpdate, this._onGameModelUpdate, this);
    this._build();
  }

  public get view(): HTMLDivElement {
    return this._view;
  }

  private _build() {
    this._buildUIView();
  }

  private _onGameModelUpdate(gameModel: GameModel): void {
    console.warn(gameModel);
    gameModel ? this._buildGameView() : this._destroyGameView();
  }

  private _buildGameView(): void {
    this._gameView = new GameView();
    this._view.appendChild(this._gameView.view);
  }

  private _destroyGameView(): void {
    this._view.removeChild(this._gameView.view);
  }

  private _buildUIView(): void {
    this._uiView = new UIView();
    this._view.appendChild(this._uiView.view);
  }

  private _destroyUIView(): void {
    this._view.removeChild(this._uiView.view);
  }
}
