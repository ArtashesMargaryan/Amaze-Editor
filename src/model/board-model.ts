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
  // private _matrix: number[][] = [];

  private _entryPointer: boolean = false;

  public get cells(): CellModel[][] {
    return this._cells;
  }

  public get boardReadyIn(): string {
    return this._boardReadyIn;
  }

  public initialize(): void {
    this._buildCells();
  }

  // public checkMatrix():void{
  //   //
  //   const matrix=this.createMatrix()
  //   const entryPointer={
  //     x:Number,
  //     y:Number
  //   }
  // }

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
    checkMatrixA(this._matrix);
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
          // cell.selected();
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
  const ways: { i: number; j: number }[][] = [];

  for (let i = 0; i < matrix.length; i++) {
    const arr = [];
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === 1 || matrix[i][j] === 2) {
        arr.push({
          i: i,
          j: j,
        });
      } else {
        if (arr.length > 1) {
          ways.push([...arr]);
          arr.length = 0;
        }
        arr.length = 0;
      }
    }
    if (arr.length > 1) {
      ways.push([...arr]);
      arr.length = 0;
    }
    // arr.splice(0,arr.length)
  }

  for (let i = 0; i < matrix.length; i++) {
    const arr = [];
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[j][i] === 1 || matrix[j][i] === 2) {
        arr.push({
          i: j,
          j: i,
        });
      } else {
        if (arr.length > 1) {
          ways.push([...arr]);
          arr.length = 0;
        }
        arr.length = 0;
      }
    }
    if (arr.length > 1) {
      ways.push([...arr]);
      arr.length = 0;
    }
    // arr.splice(0,arr.length)
  }

  checkMatrixB(ways);
}

export function checkMatrixB(ways: { i: number; j: number }[][]) {
  const start: { i: number; j: number } = ways[0][0];
  const finish: { i: number; j: number } = ways[0][ways[0].length - 1];
  const pointers: { i: number; j: number }[] = [];
  pointers.push(ways[0][0]);
  pointers.push(ways[0][ways[0].length - 1]);
  // console.warn(ways[0]);
  // console.warn(ways[i][0], ways[i][ways[i].length - 1]);
  // console.warn(pointers);

  for (let i = 1; i < ways.length; i++) {
    debugger;
    if (
      !compare(ways[i][0], pointers) &&
      //
      compare(ways[i][ways[i].length - 1], pointers)
    ) {
      pointers.push(ways[i][0]);
      i = 0;
      // console.warn(1);
    } else if (
      compare(ways[i][0], pointers) &&
      //
      !compare(ways[i][ways[i].length - 1], pointers)
    ) {
      // console.warn(2);
      pointers.push(ways[i][ways[i].length - 1]);
      i = 0;
    }
  }

  console.warn(pointers);
}

export function compare(pointerB: { i: number; j: number }, pointerA: { i: number; j: number }[]): boolean {
  // console.warn(pointerB);
  // console.warn(pointerA);

  for (let i = 0; i < pointerA.length; i++) {
    if (pointerB.i === pointerA[i].i && pointerB.j === pointerA[i].j) {
      return true;
    }
  }
  return false;
}
