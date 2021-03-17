import { lego } from "@armathai/lego";
import { UIViewEvent } from "../events/view";

export class UIView {
  private _view: HTMLDivElement;
  private _btn: HTMLButtonElement;
  private _borderConfig: {};
  public constructor() {
    this._view = document.createElement("div");
    this._view.id = "ui";
    this._view.className = "ui-div";

    // lego.event.on(StoreEvent.gameUpdate, this._onGameModelUpdate, this);
    this._build();
  }

  public get view(): HTMLDivElement {
    return this._view;
  }

  private _build() {
    this._buildInputArea();

    setTimeout(() => {
      this._submit();
    }, 40);
  }

  private _submit(): void {
    this._validation();
    this._btn.addEventListener("pointerdown", () => {
      lego.event.emit(UIViewEvent.gameConfigReddy, this._borderConfig);
    });
  }

  private _buildInputArea(): void {
    const inputRow: HTMLInputElement = document.createElement("input");
    inputRow.id = "inputRow";
    inputRow.className = "inputRow";

    this.view.appendChild(inputRow);

    // inputRow.value=5

    const inputColl: HTMLInputElement = document.createElement("input");
    inputColl.id = "inputColl";
    inputColl.className = "inputColl";

    this.view.appendChild(inputColl);
    // inputRow.value=5

    const submit: HTMLButtonElement = document.createElement("button");
    submit.id = "submit";
    inputColl.className = "submit";

    submit.textContent = "build cells";
    this.view.appendChild((this._btn = submit));
  }

  private _validation(): void {
    const inputColl = document.getElementById("inputColl");
    const inputRow = document.getElementById("inputRow");

    const x: number = parseInt((inputRow as HTMLTextAreaElement).value) || 5;
    const y: number = parseInt((inputColl as HTMLTextAreaElement).value) || 5;
    this._borderConfig = {
      size: {
        x: x,
        y: y,
      },
    };
  }
}
