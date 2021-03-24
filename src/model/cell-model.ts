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
    this._status = CELL_STATUS.unknown;
    this.makeObservable();
  }

  private _selected: boolean;

  public set status(newStatus: string) {
    this._status = newStatus;
  }
  public get status(): string {
    return this._status;
  }

  public get selectedCell(): boolean {
    return this._selected;
  }

  public set selectedCell(newValue: boolean) {
    this._selected = newValue;
  }
  // public get uuid(): string {
  //   return this._uuid;
  // }

  // public get board(): BoardModel {
  // return this._board;
  // }

  public initialize(): void {
    this._selected = true;

    //
  }

  public changSelected(): void {
    this._selected = !this._selected;
    //
  }

  public selected() {
    switch (this._status) {
      case CELL_STATUS.way:
        this._status = CELL_STATUS.entryPosition;
        break;
      case CELL_STATUS.entryPosition:
        this._status = CELL_STATUS.unknown;
        break;
      case CELL_STATUS.unknown:
        this._status = CELL_STATUS.way;
        break;
    }
    // lego.event.emit
  }
}
