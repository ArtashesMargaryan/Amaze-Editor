export class ActorView {
  private _view: HTMLDivElement;
  private _uuid: string;
  private _fromX: number;
  private _fromY: number;

  public constructor(row: number, col: number) {
    this._fromX = row;
    this._fromY = col;
    this._build();
    console.warn();
  }

  public get view(): HTMLDivElement {
    return this._view;
  }

  public get uuid(): string {
    return this._uuid;
  }

  private _build(): void {
    this._view = document.createElement("div");
    this._view.className = "actor";
    this._view.style.width = "80px";
    this._view.style.height = "80px";
    this._view.style.alignContent = "centre";
    this._view.style.backgroundColor = "#0000ff";
    this._view.style.borderRadius = "15px";
  }
}
