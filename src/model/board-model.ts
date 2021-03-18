import { BoardConfig } from "../type";
import { CellModel } from "./cell-model";
import { ObservableModel } from "./observable-model";

export class BoardModel extends ObservableModel {
  private _cells: CellModel[][] = [];

  public constructor(private _config: BoardConfig) {
    super("BoardModel");
    // console.warn(this._config);
    // lego.event.on(BoardCellViewEvent.cellClick, this._updateCellStatus.bind(this));

    this.makeObservable();
  }

  public get cells(): CellModel[][] {
    return this._cells;
  }

  public initialize(): void {
    this._buildCells();
  }

  // public checkBoard() {
  //   let actor = false;
  //   let way = false;
  //   const matrix = [];
  //   this._cells.forEach((cells, index) => {
  //     matrix[index] = [];
  //     cells.forEach((cell) => {
  //       switch (cell.status) {
  //         case CELL_STATUS.actor:
  //           break;
  //       }
  //       console.warn(cell.status);
  //     });
  //   });
  // }

  /**
   * removeEventCells
   */
  public removeEventCells() {
    this._cells.forEach((cells) => {
      cells.forEach((cell) => {
        cell.changSelected();
      });
    });
  }

  public updateCellStatus(uuid: string): void {
    this._cells.forEach((cells) => {
      cells.forEach((cell) => {
        if (cell.uuid === uuid) {
          cell.selected();
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
