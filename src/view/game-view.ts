import { lego } from "@armathai/lego";
import { GameModelEvent } from "../events/model";
import { BoardModel } from "../model/board-model";
import { BoardView } from "./board-view";

export class GameView {
  private _view: HTMLDivElement;
  private _boardView: BoardView;

  public constructor() {
    this._view = document.createElement("div");
    this._view.id = "game";
    lego.event.on(GameModelEvent.boardUpdate, this._onboardModelUpdate, this);
  }

  public get view(): HTMLDivElement {
    return this._view;
  }

  private _onboardModelUpdate(boardModel: BoardModel): void {
    console.warn(boardModel);
    boardModel ? this._buildBoardView() : this._destroyBoardView();
  }

  private _buildBoardView(): void {
    this._boardView = new BoardView();
    this._view.appendChild(this._boardView.view);
  }

  private _destroyBoardView(): void {
    this._view.removeChild(this._boardView.view);
  }
}
