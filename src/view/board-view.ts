import { lego } from "@armathai/lego";
import { CELL_HEIGHT, CELL_WIDTH } from "../constatnts";
import { BoardModelEvent, CellModelEvent } from "../events/model";
import { CellModel } from "../model/cell-model";
import { CellView } from "./cell-view";

export class BoardView {
  private _view: HTMLDivElement;
  private _cells: CellView[][] = [];
  private _cellsMap: Map<string, CellView>;

  public constructor() {
    this._build();

    lego.event.on(BoardModelEvent.cellsUpdate, this._cellModelUpdate, this);
    lego.event.on(CellModelEvent.statusUpdate, this._selectedCell, this);
    lego.event.on(CellModelEvent.actorUpdate, this._onActorUpdate, this);
    lego.event.on(BoardModelEvent.cellsEventSwitch, this._cellsEventSwitch, this);
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
    this._cellsMap = new Map();

    this._cells = cells.map((row, i) =>
      cells[i].map((col, j) => {
        const cm = cells[i][j];
        const cv = new CellView(i, j, cm.uuid);
        this._view.appendChild(cv.view);

        this._cellsMap.set(cm.uuid, cv);
        return cv;
      })
    );
    ///
    const width = cells[0].length;
    const height = cells.length;
    this._view.style.width = `${width * CELL_WIDTH}px`;
    this._view.style.height = `${width * CELL_HEIGHT}px`;
    this._view.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
    this._view.style.gridTemplateRows = `repeat(${height}, 1fr)`;
    this._view.style.transform = "scale(0.5)";
  }

  private _destroyCells(): void {
    // this._view.innerHTML = ''
    while (this._view.firstChild) {
      this._view.removeChild(this._view.lastChild);
    }
  }
  private _destroyActor(uuid: string): void {
    const cell = this._getCellByUuid(uuid);
    cell.removeActor();
  }

  private _build(): void {
    this._view = document.createElement("div");
    this._view.id = "board";
    this._view.className = "board";
  }

  private _selectedCell(newStatus: string, oldStatus: string, uuid: string): void {
    const cell = this._getCellByUuid(uuid);
    cell.selected(newStatus);
  }

  private _onActorUpdate(newStatus: string, oldStatus: string, uuid: string): void {
    newStatus ? this._buildActor(uuid) : this._destroyActor(uuid);
  }

  private _getCellByUuid(uuid: string): CellView {
    return this._cellsMap.get(uuid);
  }

  private _getCellByPosition(pt: { x: number; y: number }): CellView {
    return this._cells[pt.y][pt.x];
  }

  private _buildActor(uuid: string): any {
    const cell = this._getCellByUuid(uuid);
    cell.addActor();
  }

  private _cellsEventSwitch(switchOff: boolean): void {
    console.warn(switchOff);
    this._cells.forEach((cells) => {
      cells.forEach((cell) => {
        switchOff ? cell.removeEvent() : cell.addEvent();
      });
    });
  }
}
