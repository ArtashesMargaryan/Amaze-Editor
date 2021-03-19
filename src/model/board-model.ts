import { BOARD_STATUS, CELL_STATUS } from "../constatnts";
import { BoardConfig } from "../type";
import { CellModel } from "./cell-model";
import { ObservableModel } from "./observable-model";

export class BoardModel extends ObservableModel {
  private _cells: CellModel[][] = [];
  private _matrix: number[][] = [];
  private _boardReadyIn: string;

  public constructor(private _config: BoardConfig) {
    super("BoardModel");
    // console.warn(this._config);
    // lego.event.on(BoardCellViewEvent.cellClick, this._updateCellStatus.bind(this));
    this._boardReadyIn = BOARD_STATUS.change;

    this.makeObservable();
  }

  public get cells(): CellModel[][] {
    return this._cells;
  }

  public get boardReadyIn(): string {
    return this._boardReadyIn;
  }

  public initialize(): void {
    this._buildCells();
  }

  public createMatrix(): void {
    const matrix: number[][] = [];
    this._cells.forEach((cells, index) => {
      matrix[index] = [];
      cells.forEach((cell) => {
        switch (cell.status) {
          case CELL_STATUS.entryPosition:
            matrix[index].push(2);
            break;
        }
        switch (cell.status) {
          case CELL_STATUS.way:
            matrix[index].push(1);
            break;
        }
        switch (cell.status) {
          case CELL_STATUS.unknown:
            matrix[index].push(0);
            break;
        }
      });
    });
    // console.warn(matrix);
    this._matrix = matrix;
  }

  /**
   * removeEventCells
   */
  public changSelected() {
    this._cells.forEach((cells) => {
      cells.forEach((cell) => {
        cell.changSelected();
      });
    });
    if (this._boardReadyIn == BOARD_STATUS.review) {
      this._boardReadyIn = BOARD_STATUS.change;
    } else {
      this._boardReadyIn = BOARD_STATUS.review;
    }
    // console.warn(this._boardReadyIn);

    // lego.event.emit(BoardModelEvent.cellsEventSwitch, this._cells[0][0].selectedCell);
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
