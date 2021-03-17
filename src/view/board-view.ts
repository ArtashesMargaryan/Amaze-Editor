import { lego } from "@armathai/lego";
import { BoardModelEvent } from "../events/model";
import { CellModel } from "../model/cell-model";
import { CellView } from "./cell-view";

export class BoardView {
  private _view: HTMLDivElement;
  private _cells: CellView[][] = [];

  public constructor() {
    this._view = document.createElement("div");
    this._view.id = "board";
    lego.event.on(BoardModelEvent.cellsUpdate, this._cellModelUpdate, this);
  }

  public get view(): HTMLDivElement {
    return this._view;
  }

  private _cellModelUpdate(cellModel: CellModel): void {
    cellModel ? this._buildCells(cellModel) : this._destroyCells();
    console.warn(cellModel);
  }

  private _buildCells(cellModel: CellModel): void {
    // this._cells = cellModel;
  }

  private _destroyCells(): void {
    // this._view.removeChild(this._boardView.view);
  }
}
