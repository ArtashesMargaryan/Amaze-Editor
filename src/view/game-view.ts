export class GameView {
  private _view: HTMLDivElement;

  public constructor() {
    this._view = document.createElement("div");
    this._view.id = "game";
  }

  public get view(): HTMLDivElement {
    return this._view;
  }
}
