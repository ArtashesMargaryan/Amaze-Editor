import { BOARD_STATUS, CELL_STATUS } from "../constatnts";
import { BoardConfig } from "../type";
import { compare, compareElement, searchCompare } from "../utils";
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

  private _islands: { i: number; j: number }[] = [];
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
    console.warn("updateCellStatus");

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
    console.warn("_checkCellStatus");

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

  public createMatrix(): void {
    console.warn("createMatrix");

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
    console.warn("changSelected");

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
    console.warn("_checkBoard");

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
      // console.warn(false);
      // this._hasSolution = false;
    } else {
      // console.warn(true);
      // this._hasSolution = true;
    }
    //
  }
  ///create island of cells if any
  ///
  private _buildBynarWaysArray(matrix: number[][]): void {
    const ways: { i: number; j: number }[][] = [];
    const wayH: { i: number; j: number }[] = [];

    const islands: { i: number; j: number }[] = [];
    const wayV: { i: number; j: number }[] = [];
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] === 1) {
          wayH.push({ i: i, j: j });
        } else if (wayH.length > 1) {
          ways.push([...wayH]);
          wayH.length = 0;
        } else {
          if (wayH.length === 1) {
            islands.push(...wayH);
          }
          wayH.length = 0;
        }
        if (matrix[j][i] === 1) {
          wayV.push({ i: j, j: i });
        } else if (wayV.length > 1) {
          ways.push([...wayV]);
          wayV.length = 0;
        } else {
          if (wayV.length === 1) {
            islands.push(...wayV);
          }
          wayV.length = 0;
        }
      }
      if (wayH.length > 1) {
        ways.push([...wayH]);
        wayH.length = 0;
      } else {
        if (wayH.length === 1) {
          islands.push(...wayH);
        }
        wayH.length = 0;
      }
      if (wayV.length > 1) {
        ways.push([...wayV]);
        wayV.length = 0;
      } else {
        if (wayV.length === 1) {
          islands.push(...wayV);
        }
        wayV.length = 0;
      }
    }
    this._ways = ways;
    this._islands = this.sincronizatiaIsland(islands);
    console.warn(this._islands);
    console.warn(ways);
  }

  private sincronizatiaIsland(islands: { i: number; j: number }[]): { i: number; j: number }[] {
    const newIslands: { i: number; j: number }[] = [];
    islands.forEach((island) => {
      if (!compare(island, newIslands)) {
        newIslands.push(island);
      }
    });
    console.warn("newIsland", newIslands.length);

    console.warn("newIsland", newIslands.length);

    return newIslands;
  }

  private _checkWaysConnectivity(ways: { i: number; j: number }[][]) {
    console.warn("_checkWaysConnectivity");
    console.warn(this._ways);
    if (this._entryPointer.i === -1 || this._entryPointer.j === -1) {
      console.warn("error has not entryPointer");
      return;
    }

    const startWay = [this._entryPointer];
    const myWays = [...ways];
    // console.warn(ways);
    // console.warn(startWay[0]);
    const extremumPoints: { i: number; j: number }[] = [];
    extremumPoints.push(startWay[0]);

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

      if (too != -1) {
        console.warn("error don't right board");

        myWays.length = 0;
      } else {
        myWays.splice(too, 1);
      }
    }
    console.warn(extremumPoints);

    // this._checkBoard(extremumPoints, ways);
  }

  private _checkWaysConnectivityR(ways: { i: number; j: number }[][]) {
    console.warn("_checkWaysConnectivity");
    console.warn(this._entryPointer);
    if (this._entryPointer.i === -1 || this._entryPointer.j === -1) {
      console.warn("error has not entryPointer");
      return;
    }

    const startWay = [this._entryPointer];
    const myWays = [...ways];
    // console.warn(ways);
    // console.warn(startWay[0]);
    const allPointers: { i: number; j: number }[] = [];
    const extremumPoints: { i: number; j: number }[] = [];
    extremumPoints.push(startWay[0]);

    let too = -1;
    while (myWays.length > 0) {
      const len = ways.length;
      for (let i = 0; i < extremumPoints.length; i++) {
        for (let j = 0; j < myWays.length; j++) {
          if (
            compareElement(extremumPoints[i], myWays[j][0]) ||
            compareElement(extremumPoints[i], myWays[j][myWays[j].length - 1])
          ) {
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
    console.warn(extremumPoints);

    // this._checkBoard(extremumPoints, ways);
  }

  private _smartPush(
    mainArr: { i: number; j: number }[][],
    current: { i: number; j: number }[]
  ): { i: number; j: number }[][] {
    // console.warn("mtav");

    if (mainArr.length === 0) {
      mainArr.push([...current]);

      return mainArr;
    }

    const len = mainArr.length;
    for (let i = 0; i < len; i++) {
      if (compareElement(mainArr[i][0], current[0])) {
        if (current[1] && mainArr[i][1] && compareElement(current[1], mainArr[i][1])) {
          return mainArr;
        } else if (current[1] && mainArr[i][1]) {
          mainArr.push([...current]);
          return mainArr;
        }
      }
    }
    mainArr.push([...current]);

    return mainArr;
  }
  private _smartPushCell(
    cellArray: { i: number; j: number }[],
    cell: { i: number; j: number }
  ): { i: number; j: number }[] {
    // console.warn("mtav");

    if (cellArray.length === 0) {
      cellArray.push(cell);

      return cellArray;
    }

    const len = cellArray.length;
    if (!compare(cell, cellArray)) {
      cellArray.push(cell);
    }

    return cellArray;
  }
}
