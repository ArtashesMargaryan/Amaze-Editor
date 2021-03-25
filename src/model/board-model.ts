import { BOARD_STATUS, CELL_STATUS } from "../constatnts";
import { BoardConfig } from "../type";
import { compare } from "../utils";
import { CellModel } from "./cell-model";
import { ObservableModel } from "./observable-model";

export class BoardModel extends ObservableModel {
  private _cells: CellModel[][] = [];
  private _matrix: number[][] = [];
  private _boardReadyIn: string;
  private _entryPointer: { i: number; j: number } = { i: -1, j: -1 };
  public constructor(private _config: BoardConfig) {
    super("BoardModel");
    // console.warn(this._config);
    // lego.event.on(BoardCellViewEvent.cellClick, this._updateCellStatus.bind(this));
    this._boardReadyIn = BOARD_STATUS.change;

    this.makeObservable();
  }
  // private _matrix: number[][] = [];

  private _hasEntryPointer: boolean = false;

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
      cells.forEach((cell, indexJ) => {
        switch (cell.status) {
          case CELL_STATUS.entryPosition:
            matrix[index].push(1);
            this._entryPointer.i = index;
            this._entryPointer.j = indexJ;
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
    this._checkMatrixA(this._matrix);
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
        this._hasEntryPointer = false;
        cell.selected();
        break;

      case CELL_STATUS.way:
        if (this._hasEntryPointer) {
          cell.status = CELL_STATUS.unknown;
        } else {
          cell.selected();
          this._hasEntryPointer = true;
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

  private _checkBoard() {
    //
  }

  private _checkMatrixB(ways: { i: number; j: number }[][]) {
    console.warn(this._entryPointer);

    const startWay = [this._entryPointer];
    const myWays = [...ways];
    myWays.splice(0, 1);
    console.warn(myWays);

    const extremumPoints: { i: number; j: number }[] = [];
    let finish: { i: number; j: number };
    extremumPoints.push(startWay[0]);
    if (startWay.length > 0) {
      finish = startWay[startWay.length - 1];
    }

    while (myWays.length > 0) {
      let too = -1;
      const len = ways.length;
      for (let i = 0; i < extremumPoints.length; i++) {
        for (let j = 0; j < myWays.length; j++) {
          if (compare(extremumPoints[i], myWays[j])) {
            too = j;

            if (!compare(myWays[j][0], extremumPoints)) {
              console.warn(myWays[j][0], extremumPoints);
              extremumPoints.push(myWays[j][0]);
            }
            if (!compare(myWays[j][myWays[j].length - 1], extremumPoints)) {
              console.warn(myWays[j][myWays[j].length - 1], extremumPoints);

              extremumPoints.push(myWays[j][myWays[j].length - 1]);
            }
          }
        }
      }
      // console.warn(extremumPoints);
      // console.warn(myWays.length);
      if (too != -1) {
        myWays.splice(too, 1);
      } else {
        myWays.length = 0;
      }
    }
  }

  private _checkMatrixA(matrix: number[][]): void {
    const ways: { i: number; j: number }[][] = [];

    for (let i = 0; i < matrix.length; i++) {
      const arr = [];
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] === 1 || matrix[i][j] === 2) {
          if (matrix[i][j] === 2) {
            arr.push({
              i: i,
              j: j,
              entryPoint: true,
            });
          } else {
            arr.push({
              i: i,
              j: j,
            });
          }
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
        if (matrix[j][i] === 1) {
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
    console.warn(ways);

    this._checkMatrixB(ways);
  }
}

// export function checkMatrixA(matrix: number[][]): void {
//   const ways: { i: number; j: number }[][] = [];

//   for (let i = 0; i < matrix.length; i++) {
//     const arr = [];
//     for (let j = 0; j < matrix[i].length; j++) {
//       if (matrix[i][j] === 1 || matrix[i][j] === 2) {
//         if (matrix[i][j] === 2) {
//           arr.push({
//             i: i,
//             j: j,
//             entryPoint: true,
//           });
//         } else {
//           arr.push({
//             i: i,
//             j: j,
//           });
//         }
//       } else {
//         if (arr.length > 1) {
//           ways.push([...arr]);
//           arr.length = 0;
//         }
//         arr.length = 0;
//       }
//     }
//     if (arr.length > 1) {
//       ways.push([...arr]);
//       arr.length = 0;
//     }
//     // arr.splice(0,arr.length)
//   }

//   for (let i = 0; i < matrix.length; i++) {
//     const arr = [];
//     for (let j = 0; j < matrix[i].length; j++) {
//       if (matrix[j][i] === 1) {
//         arr.push({
//           i: j,
//           j: i,
//         });
//       } else {
//         if (arr.length > 1) {
//           ways.push([...arr]);
//           arr.length = 0;
//         }
//         arr.length = 0;
//       }
//     }
//     if (arr.length > 1) {
//       ways.push([...arr]);
//       arr.length = 0;
//     }
//     // arr.splice(0,arr.length)
//   }
//   console.warn(ways);

//   checkMatrixB(ways);
// }

// export function searchWays(ways: { i: number; j: number }[][]): { i: number; j: number }[] {
//   let startWay: { i: number; j: number }[] = [];
//   console.warn(ways);
//   for (let i = 0; i < ways.length; i++) {
//     for (let j = 0; j < ways[i].length; j++) {
//       if (ways[i][j]) {
//         return ways[i];
//       }
//     }
//   }
//   return [];
// }

// // export function se(params:type) {

// // }

// export function checkMatrixB(ways: { i: number; j: number }[][]) {
//   console.warn(this.entryPointer);

//   const startWay = [this.entryPointer];
//   const myWays = [...ways];
//   myWays.splice(0, 1);
//   console.warn(myWays);

//   const extremumPoints: { i: number; j: number }[] = [];
//   let finish: { i: number; j: number };
//   extremumPoints.push(startWay[0]);
//   if (startWay.length > 0) {
//     finish = startWay[startWay.length - 1];
//   }

//   while (myWays.length > 0) {
//     let too = -1;
//     const len = ways.length;
//     for (let i = 0; i < extremumPoints.length; i++) {
//       for (let j = 0; j < myWays.length; j++) {
//         if (compare(extremumPoints[i], myWays[j])) {
//           too = j;

//           if (!compare(myWays[j][0], extremumPoints)) {
//             console.warn(myWays[j][0], extremumPoints);
//             extremumPoints.push(myWays[j][0]);
//           }
//           if (!compare(myWays[j][myWays[j].length - 1], extremumPoints)) {
//             console.warn(myWays[j][myWays[j].length - 1], extremumPoints);

//             extremumPoints.push(myWays[j][myWays[j].length - 1]);
//           }
//         }
//       }
//     }
//     // console.warn(extremumPoints);
//     // console.warn(myWays.length);
//     if (too != -1) {
//       myWays.splice(too, 1);
//     } else {
//       myWays.length = 0;
//     }
//   }
// }

// // export function compareSearch(ways: { i: number; j: number }[][], pointers: { i: number; j: number }[]): number {
// //   for (let i = 0; i < pointers.length; i++) {
// //     for (let j = 1; j < ways.length - 1; j++) {
// //       if (compare(pointers[i], ways[j])) {
// //         return j;
// //       }
// //     }
// //   }
// //   return -1;
// // }

// // export function compare(pointerB: { i: number; j: number }, pointerA: { i: number; j: number }[]): boolean {
// //   // console.warn(pointerB);
// //   // console.warn(pointerA);

// //   for (let i = 0; i < pointerA.length; i++) {
// //     if (pointerB.i === pointerA[i].i && pointerB.j === pointerA[i].j) {
// //       return true;
// //     }
// //   }
// //   return false;
// // }
