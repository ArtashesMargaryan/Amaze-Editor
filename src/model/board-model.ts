import { lego } from "@armathai/lego";
import { CellViewEvent } from "../events/view";
import { BoardConfig } from "../type";
import { CellModel } from "./cell-model";
import { ObservableModel } from "./observable-model";

export class BoardModel extends ObservableModel {
  private _cells: CellModel[][] = [];

  public constructor(private _config: BoardConfig) {
    super("BoardModel");
    // console.warn(this._config);
    lego.event.on(CellViewEvent.cellClick, this._updateCellStatus.bind(this));

    this.makeObservable();
  }

  public get cells(): CellModel[][] {
    return this._cells;
  }

  public initialize(): void {
    this._buildCells();
  }

  public _updateCellStatus(uuid: string, newStatus: string): void {
    this._cells.forEach((cells) => {
      cells.forEach((cell) => {
        if (cell.uuid === uuid) {
          cell.setStatus(newStatus);
        }
      });
    });
  }

  private _buildCells(): void {
    const { x, y } = this._config.size;
    const cells = [];

    for (let i = 0; i < y; i++) {
      cells[i] = [];

      for (let j = 0; j < x; j++) {
        cells[i][j] = new CellModel(i, j);
      }
    }

    this._cells = cells;
  }
}
