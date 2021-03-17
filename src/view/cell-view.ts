export class CellView {
  private _view: HTMLDivElement;
  private _uuid: string;

  public constructor(uuid: string) {
    this._uuid = uuid;
    this._build();

    // this._addEvent();
    // lego.event.on(BoardModelEvent.cellsUpdate, this._cellModelUpdate, this);
  }

  public get view(): HTMLDivElement {
    return this._view;
  }

  public get uuid(): string {
    return this._uuid;
  }

  // private _cellModelUpdate(cellModel: CellModel): void {
  //   // cellModel ? this._buildCells() : this._destroyCells();
  //   // console.warn(cellModel);
  // }

  // private _addEvent(): void {
  //   this.view.addEventListener("pointerdown", () => {
  //     lego.event.emit(CellViewEvent.cellClick, this.uuid);
  //   });
  // }

  // private __buildCells(): void {
  //   // this._cells = new GameView();
  //   // this._view.appendChild(this._cells.view);
  // }

  // private _destroyCells(): void {
  //   // this._view.removeChild(this._cells.view);
  // }

  private _build(): void {
    this._view = document.createElement("div");
    this._view.className = "cell";
  }
}
