import { lego } from "@armathai/lego";
import { UIViewEvent } from "../events/view";
import { BoardConfig } from "../type";

export class UIView {
  private _view: HTMLDivElement;
  private _btn: HTMLButtonElement;
  private _btnTest: HTMLButtonElement;
  private _btnBuild: HTMLButtonElement;
  private _rowInput: HTMLInputElement;
  private _colInput: HTMLInputElement;
  private _borderConfig: BoardConfig;
  public constructor() {
    this._build();
  }

  public get view(): HTMLDivElement {
    return this._view;
  }

  private _build() {
    this._view = document.createElement("div");
    this._view.className = "ui-div";
    this._buildInputs();

    setTimeout(() => {
      this._submit();
    }, 50);
  }

  private _submit(): void {
    this._btn.addEventListener("pointerdown", () => {
      this._validation();
      lego.event.emit(UIViewEvent.gameConfigReddy, this._borderConfig);
    });
    this._btnTest.addEventListener("pointerdown", () => {
      lego.event.emit(UIViewEvent.gameBoardReddy);
    });
    this._btnBuild.addEventListener("pointerdown", () => {
      lego.event.emit(UIViewEvent.gameConfigReddy, this._borderConfig);
    });
  }

  private _buildInputs(): void {
    this._buildRowInput();
    this._buildColInput();
    this._buildBtn();
    this._buildTestBtn();
    this._buildBuildBtn();
  }

  private _buildRowInput(): void {
    this._rowInput = document.createElement("input");
    this._rowInput.placeholder = "5";
    this._rowInput.id = "row";
    this.view.appendChild(this._rowInput);
  }

  private _buildColInput(): void {
    this._colInput = document.createElement("input");
    this._colInput.placeholder = "5";
    this._colInput.id = "col";
    this.view.appendChild(this._colInput);
  }

  private _buildBtn(): void {
    this._btn = document.createElement("button");
    this._btn.textContent = "Click";
    this._btn.id = "btn";
    this.view.appendChild(this._btn);
  }

  private _buildTestBtn(): void {
    this._btnTest = document.createElement("button");
    this._btnTest.textContent = "test level";
    this._btnTest.id = "btn_test";
    this.view.appendChild(this._btnTest);
  }

  private _buildBuildBtn(): void {
    this._btnBuild = document.createElement("button");
    this._btnBuild.textContent = "build level";
    this._btnBuild.id = "btn_build";
    this.view.appendChild(this._btnBuild);
  }

  private _validation(): void {
    const x = +this._rowInput.value || 5;
    const y = +this._colInput.value || 5;
    this._borderConfig = {
      size: {
        x: x,
        y: y,
      },
    };
  }
}
