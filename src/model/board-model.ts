import { BOARD_STATUS, CELL_STATUS } from "../constatnts";
import { BoardConfig, Points } from "../type";
import { compare, compareA, compareTwoWay } from "../utils";
import { CellModel } from "./cell-model";
import { ObservableModel } from "./observable-model";

export class BoardModel extends ObservableModel {
  private _cells: CellModel[][] = [];
  private _matrix: number[][] = [];
  private _boardReadyIn: string;
  private _entryPointer: Points = { i: -1, j: -1 };
  private _status: string;
  private _actor: boolean;
  private _hasSolution: boolean;
  private _actorPos: { x: number; y: number };

  private _cellsWays: number;
  private _ways: Points[][] = [];
  private _island: Points[][] = [];
  private _allRightPointer: Points[] = [];
  private _allPointer: Points[] = [];
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

  ///build cellModels array^2
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
    this._allPointer.length = 0;
    this._allRightPointer.length = 0;
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

    this._matrix = matrix;
    this._hasSolution = true;
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
      this._allPointer.length = 0;
      this._allRightPointer.length = 0;
      this._boardReadyIn = BOARD_STATUS.change;
    } else {
      this._buildBynarWaysArray(this._matrix);
      this._checkWaysConnectivity(this._ways);
      this._boardReadyIn = BOARD_STATUS.review;
    }
  }

  ///build 0or1 [][]
  private _buildBynarWaysArray(matrix: number[][]): void {
    const waysH: Points[][] = this._buildBynarWaysH(matrix);
    const waysV: Points[][] = this._buildBynarWaysV(matrix);
    const ways: Points[][] = this._joinWays(waysH, waysV);
    this._ways = ways;
  }

  private _buildBynarWaysH(matrix: number[][]): Points[][] {
    const ways: Points[][] = [];
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

  private _buildBynarWaysV(matrix: number[][]): Points[][] {
    const ways: Points[][] = [];
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

  private _joinWays(waysH: Points[][], waysV: Points[][]): Points[][] {
    const allWays: Points[][] = waysH.filter((ways) => ways.length > 1);
    allWays.push(...waysV.filter((ways) => ways.length > 1));
    const allWaysIsland: Points[][] = []; // waysH.filter((ways) => ways.length === 1);

    allWaysIsland.push(
      ...waysV.filter((ways) => ways.length === 1 && !compareA(ways[0], allWaysIsland) && !compareA(ways[0], allWays))
    );
    if (allWaysIsland.length > 0) {
      this._island = allWaysIsland;
      this._alarm(allWaysIsland);
    }

    return allWays;
  }

  private _checkWaysConnectivity(ways: Points[][]) {
    if (this._entryPointer.i === -1 || this._entryPointer.j === -1) {
      // console.warn("error has not entryPointer");
      return;
    }

    const startWay = [this._entryPointer];
    const myWays = [...ways];
    const inWay: Points[][] = [];

    const extremumPoints: Points[] = [];
    let after = true;
    while (true) {
      const ext = extremumPoints.length;
      for (let i = 0; i < myWays.length; i++) {
        if (compare(myWays[i][0], extremumPoints) && !compare(myWays[i][myWays[i].length - 1], extremumPoints)) {
          extremumPoints.push(myWays[i][myWays[i].length - 1]);
          inWay.push(myWays[i]);
        } else if (!compare(myWays[i][0], extremumPoints) && compare(myWays[i][myWays[i].length - 1], extremumPoints)) {
          extremumPoints.push(myWays[i][0]);
          inWay.push(myWays[i]);
        } else if (compareTwoWay(myWays[i], extremumPoints)) {
          extremumPoints.push(myWays[i][0], myWays[i][myWays[i].length - 1]);
          inWay.push(myWays[i]);
        } else if (compare(this._entryPointer, ways[i]) && after) {
          extremumPoints.push(myWays[i][0], myWays[i][myWays[i].length - 1]);
          after = false;
          inWay.push(myWays[i]);
        }
      }

      if (extremumPoints.length === ext) {
        break;
      }
      // console.warn(extremumPoints);
    }

    this._checkBoard(extremumPoints, ways, inWay);
    this._checkBoardUniversality(extremumPoints, ways, inWay);
  }

  private _checkBoard(extremumPoints: Points[], ways: Points[][], inWay: Points[][]) {
    // console.warn(extremumPoints);
    // console.warn(ways);
    for (let i = 0; i < ways.length; i++) {
      this._accumulatorAllPoints(ways[i]);
    }

    extremumPoints.forEach((point) => {
      for (let i = 0; i < ways.length; i++) {
        if (compare(point, ways[i])) {
          this._accumulatorRightPoints(ways[i]);
        }
      }
    });

    this._checkCell();
    // console.warn(this._allPointer);
  }
  private _checkBoardUniversality(extremumPoints: Points[], ways: Points[][], inWay: Points[][]) {
    // console.warn(extremumPoints);
    // console.warn(ways);
    for (let i = 0; i < ways.length; i++) {
      this._accumulatorAllPoints(ways[i]);
    }

    extremumPoints.forEach((point) => {
      for (let i = 0; i < ways.length; i++) {
        if (compare(point, ways[i])) {
          this._accumulatorRightPoints(ways[i]);
        }
      }
    });

    this._checkCell();
    // console.warn(this._allPointer);
  }

  private _accumulatorRightPoints(way: Points[]) {
    this._allRightPointer;
    way.forEach((element) => {
      if (!compare(element, this._allRightPointer)) {
        this._allRightPointer.push(...[element]);
      }
    });
  }

  private _accumulatorAllPoints(way: Points[]) {
    this._allPointer;
    way.forEach((element) => {
      if (!compare(element, this._allPointer)) {
        this._allPointer.push(...[element]);
      }
    });
    // console.warn(this._allPointer);
  }

  private _checkCell() {
    // console.warn(this._allPointer.length, this._allRightPointer.length);

    this._allPointer.forEach((cell) => {
      if (!compare(cell, this._allRightPointer)) {
        this._cells[cell.i][cell.j].toWarningStatus();
      }
    });
  }

  private _alarm(islands: Points[][]): void {
    islands.forEach((island, i) => {
      island.forEach((cell, j) => {
        // console.warn("1", this._cells[cell.i][cell.j]);
        this._cells[cell.i][cell.j].toWarningStatus();
      });
    });
  }

  private _reminder(island: Points[][]): void {
    island.forEach((element) => {
      // console.warn(element);
    });
  }
}
