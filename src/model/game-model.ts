import { BoardModel } from "./board-model";
import { ObservableModel } from "./observable-model";

export class GameModel extends ObservableModel {
  private _color: number;
  private _board: BoardModel = null;

  public constructor() {
    super("GameModel");
    this.makeObservable();
  }

  public get board(): BoardModel {
    return this._board;
  }

  public initialize(): void {
    this._board = new BoardModel();
    this._board.initialize();
  }
}
