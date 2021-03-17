import { CellModel } from "../model/cell-model";

export class CellView {
  private _view: HTMLDivElement;
  private _cells: CellView[][] = [];

  public constructor() {
    this._view = document.createElement("div");
    this._view.id = "cell";
    // lego.event.on(BoardModelEvent.cellsUpdate, this._cellModelUpdate, this);
  }

  public get view(): HTMLDivElement {
    return this._view;
  }

  private _cellModelUpdate(cellModel: CellModel): void {
    // cellModel ? this._buildCells() : this._destroyCells();
    // console.warn(cellModel);
  }

  private __buildCells(): void {
    // this._cells = new GameView();
    // this._view.appendChild(this._cells.view);
  }

  private _destroyCells(): void {
    // this._view.removeChild(this._cells.view);
  }
}
