import { BoardConfig } from "../type";
import { BoardModel } from "./board-model";
import { ObservableModel } from "./observable-model";

export class GameModel extends ObservableModel {
  private _board: BoardModel = null;

  public constructor() {
    super("GameModel");
    this.makeObservable();
  }

  public get board(): BoardModel {
    return this._board;
  }

  public initialize(config: BoardConfig): void {
    this._initializeBoardModel(config);
  }
  private _initializeBoardModel(config: BoardConfig): void {
    this._board = new BoardModel(config);
    this._board.initialize();
  }
}
