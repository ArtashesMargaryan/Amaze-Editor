import { lego } from "@armathai/lego";
import { StoreEvent } from "../events/model";
import { GameModel } from "../model/game-model";
import { GameView } from "./game-view";
import { UIView } from "./ui-view";

export class MainView {
  private _view: HTMLDivElement;
  private _gameView: GameView;
  private _uiView: UIView;

  public constructor() {
    this._build();

    lego.event.on(StoreEvent.gameUpdate, this._onGameModelUpdate, this);
  }

  public get view(): HTMLDivElement {
    return this._view;
  }

  private _build() {
    this._buildView();
    this._buildUIView();
  }

  private _onGameModelUpdate(gameModel: GameModel): void {
    gameModel ? this._buildGameView() : this._destroyGameView();
  }

  private _buildGameView(): void {
    this._gameView = new GameView();
    this._view.appendChild(this._gameView.view);
    console.warn(this._view.clientHeight);
  }

  private _destroyGameView(): void {
    this._gameView.destroy();
    this._view.removeChild(this._gameView.view);
  }

  private _buildView(): void {
    this._view = document.createElement("div");
  }

  private _buildUIView(): void {
    this._uiView = new UIView();
    this._view.appendChild(this._uiView.view);
  }

  private _destroyUIView(): void {
    this._view.removeChild(this._uiView.view);
  }

  // private _getMatrix(): string[][] {
  //   for (let i = 0; i < this._cells.length; i++) {
  //     this._matrix[i] = [];
  //     for (let j = 0; j < this._cells[i].length; j++) {
  //       const cell = this._cells[i][j];
  //       switch (cell.status) {
  //         case CELL_STATUS.way:
  //           this._matrix[i][j] = "1";
  //           break;
  //         case CELL_STATUS.unknow:
  //           this._matrix[i][j] = "0";
  //           break;
  //       }
  //     }
  //   }

  //   return this._matrix;
  // }

  // private _onKeyDown = (event: KeyboardEvent): void => {
  //   switch (event.key) {
  //     case "ArrowLeft":
  //       this._direction = Direction.west;
  //       break;
  //     case "ArrowRight":
  //       this._direction = Direction.east;
  //       break;
  //     case "ArrowUp":
  //       this._direction = Direction.north;
  //       break;
  //     case "ArrowDown":
  //       this._direction = Direction.south;
  //       break;
  //   }
  // };

  // private getpath(): {};
  // }
}
