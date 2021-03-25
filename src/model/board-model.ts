import { BOARD_STATUS, CELL_STATUS } from "../constatnts";
import { BoardConfig } from "../type";
import { compare, searchCompare } from "../utils";
import { CellModel } from "./cell-model";
import { ObservableModel } from "./observable-model";

export class BoardModel extends ObservableModel {
  private _cells: CellModel[][] = [];
  private _matrix: number[][] = [];
  private _boardReadyIn: string;
  private _entryPointer: { i: number; j: number } = { i: -1, j: -1 };
  private _status: string;
  private _actor: boolean;
  private _hasSolution: boolean;
  private _actorPos: { x: number; y: number };

  public constructor(private _config: BoardConfig) {
    super("BoardModel");
    this._actor = false;
    this._boardReadyIn = BOARD_STATUS.change;
    this._status = BOARD_STATUS.ready;
    this.makeObservable();
  }

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
      cells.forEach((cell, indexJ) => {
        switch (cell.status) {
          case CELL_STATUS.entryPosition:
            this._actor = true;
            matrix[index].push(1);
            this._actorPos = { x: index, y: indexJ };
            this._entryPointer = { i: index, j: indexJ };
            break;
          case CELL_STATUS.way:
            matrix[index].push(1);
            break;
          case CELL_STATUS.unknown:
            matrix[index].push(0);
            break;
        }
      });
    });
    console.warn(matrix);
    this._matrix = matrix;
    this._hasSolution = true;
    this._checkMatrixA(this._matrix);
    this._matrix = matrix;
    // this._checkMatrixA(this._matrix);
  }
  /**
   * removeEventCells
   */
  public changSelected() {
    // console.warn("hasa");

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
          // cell.selected();
          this._checkCellStatus(cell);
        }
      });
    });
  }

  private _checkCellStatus(cell: CellModel) {
    switch (cell.status) {
      case CELL_STATUS.entryPosition:
        this._actor = false;
        cell.selected();
        break;

      case CELL_STATUS.way:
        if (this._actor) {
          cell.status = CELL_STATUS.unknown;
        } else {
          cell.selected();
          this._actor = true;
        }
        break;

      case CELL_STATUS.unknown:
        cell.selected();
        break;
    }
    this.createMatrix();
  }

  /*


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
  */

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

  private _checkBoard(extremumPoints: { i: number; j: number }[], ways: { i: number; j: number }[][]) {
    ways.forEach((way) => {
      const a = searchCompare(way[0], extremumPoints);
      const b = searchCompare(way[way.length - 1], extremumPoints);
      if (a != -1) {
        extremumPoints.splice(a, 1);
      }
      if (b != -1) {
        extremumPoints.splice(b, 1);
      }
    });
    if (extremumPoints.length > 0) {
      console.warn(false);

      this._hasSolution = false;
    } else {
      console.warn(true);

      this._hasSolution = true;
    }
    //
  }

  private _checkMatrixA(matrix: number[][]): void {
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
          } else if (arr.length === 1) {
            this._hasSolution = false;
          }

          arr.length = 0;
        }
      }

      // arr.splice(0,arr.length)
    }

    for (let i = 0; i < matrix.length; i++) {
      const arr = [];
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[j][i] === 1) {
          arr.push({
            i: j,
            j: i,
          });
        } else {
          if (arr.length > 1) {
            ways.push([...arr]);
            arr.length = 0;
          } else if (arr.length === 1) {
            this._hasSolution = false;
          }

          arr.length = 0;
        }
      }
    }
    if (!this._hasSolution) {
      console.warn(this._hasSolution);

      return;
    }
    console.warn(this._hasSolution);

    this._checkMatrixB(ways);
  }

  private _checkMatrixB(ways: { i: number; j: number }[][]) {
    const startWay = [this._entryPointer];
    const myWays = [...ways];
    console.warn(ways);
    console.warn(startWay[0]);
    const extremumPoints: { i: number; j: number }[] = [];
    extremumPoints.push(startWay[0]);
    if (startWay.length > 0) {
    }

    let too = -1;
    while (myWays.length > 0) {
      const len = ways.length;
      for (let i = 0; i < extremumPoints.length; i++) {
        for (let j = 0; j < myWays.length; j++) {
          if (compare(extremumPoints[i], myWays[j])) {
            too = j;

            if (!compare(myWays[j][0], extremumPoints)) {
              // console.warn("mtav1");
              extremumPoints.push(myWays[j][0]);
            }
            if (!compare(myWays[j][myWays[j].length - 1], extremumPoints)) {
              // console.warn("mtav2");

              extremumPoints.push(myWays[j][myWays[j].length - 1]);
            }
          }
        }
      }

      if (too != -1 || len == 1) {
        myWays.length = 0;
      } else {
        myWays.splice(too, 1);
      }
    }
    console.warn(extremumPoints[0]);

    // this._checkBoard(extremumPoints, ways);
  }
}
