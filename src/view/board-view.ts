import { lego } from "@armathai/lego";
import { CELL_HEIGHT, CELL_WIDTH } from "../constatnts";
import { BoardModelEvent } from "../events/model";
import { CellModel } from "../model/cell-model";
import { CellView } from "./cell-view";

export class BoardView {
  private _view: HTMLDivElement;
  private _cells: CellView[][] = [];

  public constructor() {
    this._build();

    lego.event.on(BoardModelEvent.cellsUpdate, this._cellModelUpdate, this);
  }

  public get view(): HTMLDivElement {
    return this._view;
  }

  public destroy(): void {
    //
  }

  private _cellModelUpdate(cellModel: CellModel[][]): void {
    cellModel ? this._buildCells(cellModel) : this._destroyCells();
  }

  private _buildCells(cells: CellModel[][]): void {
    this._cells = cells.map((row, i) =>
      cells[i].map((col, j) => {
        const cellView = new CellView(cells[i][j].uuid);
        this._view.appendChild(cellView.view);

        return cellView;
      })
    );

    const width = cells[0].length;
    const height = cells.length;

    this._view.style.width = `${width * CELL_WIDTH}px`;
    this._view.style.height = `${width * CELL_HEIGHT}px`;
    this._view.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
    this._view.style.gridTemplateRows = `repeat(${height}, 1fr)`;
    const canvas = document.getElementById("board");
  }

  private _destroyCells(): void {
    // this._view.innerHTML = ''
    while (this._view.firstChild) {
      this._view.removeChild(this._view.lastChild);
    }
  }

  private _build(): void {
    this._view = document.createElement("div");
    this._view.id = "board";
    this._view.className = "board";
  }
}