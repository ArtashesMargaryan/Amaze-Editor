import { lego } from "@armathai/lego";
import { CELL_STATUS } from "../constatnts";
import { CellViewEvent } from "../events/view";
import { ActorView } from "./actor-view";

export class CellView {
  private _view: HTMLDivElement;
  private _uuid: string;
  private _status: string;
  private _row: number;
  private _col: number;
  private _actor: ActorView;

  public constructor(row: number, col: number, uuid: string) {
    this._uuid = uuid;
    this._row = row;
    this._col = col;
    this._status = CELL_STATUS.unknown;

    this._build();
  }

  public get view(): HTMLDivElement {
    return this._view;
  }

  public get status(): string {
    return this._status;
  }

  public get uuid(): string {
    return this._uuid;
  }

  public addActor(): void {
    this._actor = new ActorView(this._row, this._col);
    this.view.appendChild(this._actor.view);
  }

  public removeActor(): void {
    this._actor = null;
    while (this._view.firstChild) {
      this._view.removeChild(this._view.lastChild);
    }
  }

  private _kayPlay(): void {
    //
  }
  public removeEvent(): void {
    this._view.removeEventListener("pointerdown", this._select);
  }

  public addEvent(): void {
    this.removeEvent();
    this._view.addEventListener("pointerdown", this._select);
  }

  public selected = (status: string): void => {
    switch (status) {
      case CELL_STATUS.way:
        this._view.style.backgroundColor = "#30BBF0";
        this._view.style.borderRadius = "10px";

        break;
      case CELL_STATUS.entryPosition:
        this._view.style.backgroundColor = "red";
        this._view.style.borderRadius = "10px";
        break;
      case CELL_STATUS.unknown:
        this._view.style.backgroundColor = "#BBADA0";
        this._view.style.borderRadius = "10px";
        break;
    }
  };

  private _select = (): void => {
    lego.event.emit(CellViewEvent.cellClick, this._uuid);
  };

  private _build(): void {
    this._view = document.createElement("div");
    this._view.className = "cell";
    this._view.style.borderRadius = "10px";
    // this._view.crea = "cell";
    this.addEvent();
    this._view.style.backgroundColor = "#BBADA0";
  }
}
