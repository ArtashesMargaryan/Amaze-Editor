import { BOARD_STATUS, CELL_STATUS } from "../constatnts";
import { BoardConfig } from "../type";
import { CellModel } from "./cell-model";
import { ObservableModel } from "./observable-model";

export class BoardModel extends ObservableModel {
  private _cells: CellModel[][] = [];
  private _matrix: number[][] = [];
  private _boardReadyIn: string;
  private _status: string;
  private _actor: boolean;
  private _actorPos: { x: number; y: number };

  public constructor(private _config: BoardConfig) {
    super("BoardModel");
    this._actor = false;
    this._boardReadyIn = BOARD_STATUS.change;
    this._status = BOARD_STATUS.ready;
    this.makeObservable();
  }

  private _entryPointer: boolean = false;

  public get cells(): CellModel[][] {
    return this._cells;
  }

  public get boardReadyIn(): string {
    return this._boardReadyIn;
  }

  public get status(): string {
    return this._status;
  }

  public get matirx(): number[][] {
    return this._matrix;
  }

  public get actor(): boolean {
    return this._actor;
  }

  public get actorPos(): { x: number; y: number } {
    return this._actorPos;
  }

  public initialize(): void {
    this._buildCells();
  }

  public createMatrix(): void {
    const matrix: number[][] = [];
    this._cells.forEach((cells, index) => {
      matrix[index] = [];
      cells.forEach((cell, i) => {
        switch (cell.status) {
          case CELL_STATUS.entryPosition:
            this._actor = true;
            matrix[index].push(1);
            // matrix[index].push(2);Artashi hamar
            this._actorPos = { x: index, y: i };
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
    this._matrix = matrix;

    checkMatrixA(this._matrix);
  }

  /**
   * removeEventCells
   */
  public changSelected() {
    console.warn("hasa");
    
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
  }

  public updateCellStatus(uuid: string): void {
    this._cells.forEach((cells) => {
      cells.forEach((cell) => {
        if (cell.uuid === uuid) {
          this._checkCellStatus(cell);
        }
      });
    });
  }

  private _checkCellStatus(cell: CellModel) {
    switch (cell.status) {
      case CELL_STATUS.entryPosition:
        this._entryPointer = false;
        cell.selected();
        break;

      case CELL_STATUS.way:
        if (this._entryPointer) {
          cell.status = CELL_STATUS.unknown;
        } else {
          cell.selected();
          this._entryPointer = true;
        }
        break;

      case CELL_STATUS.unknown:
        cell.selected();
    }
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

export function checkMatrixA(matrix: number[][]): void {
  return;
  const ways: { i: number; j: number }[][] = [];

  for (let i = 0; i < matrix.length; i++) {
    const arr = [];
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === 1 || matrix[i][j] === 2) {
        arr.push({
          i: i,
          j: j,
        });
        //  return point
      } else {
        if (arr.length > 0) {
          ways.push([...arr]);
          arr.length = 0;
        }
      }
    }
  }

  for (let i = 0; i < matrix.length; i++) {
    const arr = [];
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[j][i] === 1 || matrix[j][i] === 2) {
        arr.push({
          i: i,
          j: j,
        });
      } else {
        if (arr.length > 0) {
          ways.push([...arr]);
          arr.length = 0;
        }
      }
    }
  }
}
export function checkMatrixB(matrix: number[][], x: number, y: number) {}
