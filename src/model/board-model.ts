import { BOARD_STATUS, CELL_STATUS } from "../constatnts";
import { BoardConfig } from "../type";
import { compare, compareTwoWay } from "../utils";
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

  private _cellsWays: number;
  private _ways: { i: number; j: number }[][] = [];

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
  public updateCellStatus(uuid: string): void {
    // console.warn("updateCellStatus");

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
    // console.warn("_checkCellStatus");

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

  // bynar matrix convert cell matrix

  public createMatrix(): void {
    // console.warn("createMatrix");
    this._cellsWays = 0;
    const matrix: number[][] = [];
    this._cells.forEach((cells, index) => {
      matrix[index] = [];
      cells.forEach((cell, indexJ) => {
        switch (cell.status) {
          case CELL_STATUS.entryPosition:
            this._actor = true;
            matrix[index].push(1);
            this._cellsWays++;
            this._actorPos = { x: index, y: indexJ };
            this._entryPointer = { i: index, j: indexJ };
            break;
          case CELL_STATUS.way:
            matrix[index].push(1);
            this._cellsWays++;

            break;
          case CELL_STATUS.unknown:
            matrix[index].push(0);
            break;
        }
      });
    });
    // console.warn(this._hasSolution);
    // console.warn(matrix);
    this._matrix = matrix;
    this._hasSolution = true;
    // this._buildBynarWaysArray(this._matrix);
    // this._checkMatrixA(this._matrix);
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
      this._buildBynarWaysArray(this._matrix);
      this._checkWaysConnectivity(this._ways);
      this._boardReadyIn = BOARD_STATUS.review;
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

  private _checkBoard(extremumPoints: { i: number; j: number }[], ways: { i: number; j: number }[][]) {
    // console.warn("_checkBoard");
    const allPointer: { i: number; j: number }[] = [];
    const copyWays = [...ways];
    ways.forEach((way) => {
      if (compare(way[0], extremumPoints) && compare(way[way.length - 1], extremumPoints)) {
        way.forEach((cell) => {
          if (!compare(cell, allPointer)) {
            allPointer.push(cell);
          }
        });
      }
    });
    if (allPointer.length === this._cellsWays) {
      console.warn("this matrix right");
    } else {
      console.warn("this don't matrix right");
    }

    console.warn(allPointer);
  }

  ///create island of cells if any
  ///
  private _buildBynarWaysArray(matrix: number[][]): void {
    const waysH: { i: number; j: number }[][] = this._buildBynarWaysH(matrix);
    const waysV: { i: number; j: number }[][] = this._buildBynarWaysV(matrix);
    const ways: { i: number; j: number }[][] = this._joinWays(waysH, waysV);
    this._ways = ways;
  }

  private _joinWays(
    waysH: { i: number; j: number }[][],
    waysV: { i: number; j: number }[][]
  ): { i: number; j: number }[][] {
    const allWays: { i: number; j: number }[][] = waysH.filter((ways) => ways.length > 1);
    allWays.push(...waysV.filter((ways) => ways.length > 1));
    return allWays;
  }

  private _buildBynarWaysH(matrix: number[][]): { i: number; j: number }[][] {
    const ways: { i: number; j: number }[][] = [];
    const way: {
      i: number;
      j: number;
    }[] = [];

    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] === 1) {
          const cell = { i: i, j: j };
          way.push(cell);
        } else if (way.length >= 1) {
          ways.push([...way]);
          way.length = 0;
        }
      }
      if (way.length >= 1) {
        ways.push([...way]);
        way.length = 0;
      }
    }

    return ways;
  }

  private _buildBynarWaysV(matrix: number[][]): { i: number; j: number }[][] {
    const ways: { i: number; j: number }[][] = [];
    const way: {
      i: number;
      j: number;
    }[] = [];

    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[j][i] === 1) {
          const cell = { i: j, j: i };
          way.push(cell);
        } else if (way.length >= 1) {
          ways.push([...way]);
          way.length = 0;
        }
      }
      if (way.length >= 1) {
        ways.push([...way]);
        way.length = 0;
      }
    }

    return ways;
  }

  private _checkWaysConnectivity(ways: { i: number; j: number }[][]) {
    if (this._entryPointer.i === -1 || this._entryPointer.j === -1) {
      console.warn("error has not entryPointer");
      return;
    }

    const startWay = [this._entryPointer];
    const myWays = [...ways];

    const extremumPoints: { i: number; j: number }[] = [];

    while (true) {
      const ext = extremumPoints.length;
      for (let i = 0; i < myWays.length; i++) {
        if (compare(myWays[i][0], extremumPoints) && !compare(myWays[i][myWays[i].length - 1], extremumPoints)) {
          extremumPoints.push(myWays[i][myWays[i].length - 1]);
        } else if (!compare(myWays[i][0], extremumPoints) && compare(myWays[i][myWays[i].length - 1], extremumPoints)) {
          extremumPoints.push(myWays[i][0]);
        } else if (compareTwoWay(myWays[i], extremumPoints)) {
          extremumPoints.push(myWays[i][0], myWays[i][myWays[i].length - 1]);
        } else if (compare(this._entryPointer, ways[i])) {
        }
      }

      if (extremumPoints.length === ext) {
        break;
      }
      // console.warn(extremumPoints);
    }
    console.warn(extremumPoints);

    // this._checkBoard(extremumPoints, ways);
  }
}
