import { CELL_STATUS } from "../constatnts";
import { ObservableModel } from "./observable-model";

export class CellModel extends ObservableModel {
  private _row: number;
  private _col: number;
  private _status: string;
  public constructor(row: number, col: number) {
    super("CellModel");
    this._row = row;
    this._col = col;
    this._status = CELL_STATUS.unknow;
    this.makeObservable();
  }

  public setStatus(newStatus: string) {
    this._status = newStatus;
  }
  public get status(): string {
    return this._status;
  }
  // public get uuid(): string {
  //   return this._uuid;
  // }

  // public get board(): BoardModel {
  // return this._board;
  // }

  public initialize(): void {
    //
  }
}
