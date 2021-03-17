import { CellModel } from "./cell-model";
import { ObservableModel } from "./observable-model";

export class BoardModel extends ObservableModel {
  private _cells: CellModel[][] = null;
  // private _size: CellModel[][] = null;

  public constructor() {
    super("BoardModel");
    this.makeObservable();
  }

  public get cells(): CellModel[][] {
    return this._cells;
  }

  public initialize(): void {
    this._buildCells();
  }

  private _buildCells(): void {
    const cells = [];

    for (let i = 0; i < 5; i++) {
      cells[i] = [];
      for (let j = 0; j < 5; j++) {
        cells[i][j] = new CellModel(i, j);
      }
    }
    this._cells = cells;
  }
}
