import { lego } from "@armathai/lego";
import { GameModelEvent } from "../events/model";
import { BoardModel } from "../model/board-model";
import { BoardView } from "./board-view";

export class GameView {
  private _view: HTMLDivElement;
  private _boardView: BoardView;

  public constructor() {
    this._build();
    lego.event.on(GameModelEvent.boardUpdate, this._onboardModelUpdate, this);
  }

  public get view(): HTMLDivElement {
    return this._view;
  }

  public destroy(): void {
    //
  }

  private _onboardModelUpdate(boardModel: BoardModel): void {
    boardModel ? this._buildBoardView(boardModel) : this._destroyBoardView();
  }

  private _buildBoardView(boardModel: BoardModel): void {
    this._boardView = new BoardView();

    this._view.appendChild(this._boardView.view);
  }

  private _destroyBoardView(): void {
    this._boardView.destroy();
    this._view.removeChild(this._boardView.view);
  }

  private _build() {
    this._buildView();
  }

  private _buildView(): void {
    this._view = document.createElement("div");
    this._view.id = "game";
  }
}
