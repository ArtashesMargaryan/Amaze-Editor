import { lego } from "@armathai/lego";
import { CELL_STATUS } from "../constatnts";
import { CellViewEvent } from "../events/view";

export class CellView {
  private _view: HTMLDivElement;
  private _uuid: string;
  private _status: string;

  public constructor(uuid: string) {
    this._uuid = uuid;
    this._status = CELL_STATUS.unknown;

    this._build();
    // lego.event.on(UIViewEvent.gameBoardReddy, this._removeEvent, this);

    // lego.event.on(BoardModelEvent.cellsUpdate, this._cellModelUpdate, this);
  }

  public get view(): HTMLDivElement {
    return this._view;
  }

  public get status(): string {
    return this._status;
  }

  public get uuid(): string {
    return this._uuid;
  }

  // private _cellModelUpdate(cellModel: CellModel): void {
  //   // cellModel ? this._buildCells() : this._destroyCells();
  //   // console.warn(cellModel);
  // }
  private _kayPlay(): void {
    //
  }

  // protected _addEvent(): void {
  //   this.view.addEventListener("pointerdown", this._selected);
  // }

  // protected _removeEvent(): void {
  //   this.view.removeEventListener("pointerdown", this._selected);
  // }

  // private __buildCells(): void {
  //   // this._cells = new GameView();
  //   // this._view.appendChild(this._cells.view);
  // }

  // private _destroyCells(): void {
  //   // this._view.removeChild(this._cells.view);
  // }

  public selected = (): void => {
    switch (this._status) {
      case CELL_STATUS.way:
        this._status = CELL_STATUS.actor;
        this._view.style.backgroundColor = "red";
        this._view.style.borderRadius = "10px";

        break;
      case CELL_STATUS.actor:
        this._status = CELL_STATUS.unknown;
        this._view.style.backgroundColor = "#BBADA0";
        this._view.style.borderRadius = "10px";
        break;
      case CELL_STATUS.unknown:
        this._status = CELL_STATUS.way;
        this._view.style.backgroundColor = "#30BBF0";
        this._view.style.borderRadius = "10px";
        break;
    }
  };

  private _select = (): void => {
    lego.event.emit(CellViewEvent.cellClick, this._uuid);
  };

  private _build(): void {
    this._view = document.createElement("div");
    this._view.className = "cell";
    // this._view.crea = "cell";
    this._view.addEventListener("pointerdown", this._select);

    this._view.style.backgroundColor = "#BBADA0";
  }
}
