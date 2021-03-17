import { ObservableModel } from "./observable-model";

export class CellModel extends ObservableModel {
  private _row: number;
  private _col: number;
  public constructor(row: number, col: number) {
    super("CellModel");
    this._row = row;
    this._col = col;
    this.makeObservable();
  }

  // public get board(): BoardModel {
  // return this._board;
  // }

  public initialize(): void {
    //
  }
}
