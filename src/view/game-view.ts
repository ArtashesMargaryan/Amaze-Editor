import { lego } from "@armathai/lego";
import { GameModelEvent } from "../events/model";
import { GameViewEvent } from "../events/view";
import { BoardModel } from "../model/board-model";
import { BoardView } from "./board-view";

export class GameView {
  private _view: HTMLDivElement;
  private _boardView: BoardView;

  public constructor() {
    this._build();
    this._addKeyDownEvent();
    lego.event.on(GameModelEvent.boardUpdate, this._onboardModelUpdate, this);
    console.warn(this._view.clientHeight);
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

  private _build(): void {
    this._buildView();
  }

  private _addKeyDownEvent(): void {
    window.addEventListener("keydown", function (event) {
      lego.event.emit(GameViewEvent.keydown, event.code);
    });
  }

  private _buildView(): void {
    this._view = document.createElement("div");
    this._view.id = "game";
  }
}
// window.addEventListener("keydown", function (event) {
//   console.warn(event.code);
// });
// lego.event.on(StoreEvent.gameUpdate, this._onGameModelUpdate, this);
