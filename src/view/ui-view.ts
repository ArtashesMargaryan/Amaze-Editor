import { lego } from "@armathai/lego";
import { BOARD_STATUS } from "../constatnts";
import { StoreEvent } from "../events/model";
import { UIViewEvent } from "../events/view";
import { BoardConfig } from "../type";

export class UIView {
  private _view: HTMLDivElement;
  private _buildCreatBoardBtn: HTMLButtonElement;
  private _btnTest: HTMLButtonElement;
  private _choiceInput: HTMLSelectElement;
  private _btnBuild: HTMLButtonElement;
  private _rowInput: HTMLInputElement;
  private _levelInput: HTMLInputElement;
  private _colInput: HTMLInputElement;
  private _btnTestSwitch: string;
  private _dataInput: HTMLAnchorElement;
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
    this._btnTestSwitch = BOARD_STATUS.change;
    this._buildInputs();
    this._buildDataInput();
    lego.event.on(StoreEvent.uiUpdate, this.testingBtnClick);
    // lego.event.on(BoardModelEvent.boardReadyIn,)
    setTimeout(() => {
      this._submit();
    }, 50);
  }

  private _submit(): void {
    this._buildCreatBoardBtn.addEventListener("pointerdown", () => {
      this._validation();
      lego.event.emit(UIViewEvent.gameConfigReady, this._borderConfig);
    });
    this._btnTest.addEventListener("pointerdown", () => {
      lego.event.emit(UIViewEvent.gameBoardReady);
    });
    this._btnBuild.addEventListener("pointerdown", () => {
      lego.event.emit(UIViewEvent.onBuildLevelClick, this._dataInput, this._levelInput.value);
    });
    this._choiceInput.addEventListener("pointerup", () => {
      lego.event.emit(UIViewEvent.onChoiceBtnClick, this._choiceInput.value);
    });
  }

  private testingBtnClick = (newValue: string) => {
    this._btnTestSwitch = `${newValue}`;
    if (this._btnTestSwitch == BOARD_STATUS.review) {
      this._btnTest.style.backgroundColor = "#00C000";
    } else {
      this._btnTest.style.backgroundColor = "#2d3b30";
    }
  };

  private _buildInputs(): void {
    this._buildRowInput();
    this._buildColInput();
    this._buildBoardCreatBtn();
    this._buildTestBtn();
    this._buildLevelBtn();
    this._buildChoiceBtn();
    this._buildBuildBtn();
  }

  private _buildDataInput(): void {
    this._dataInput = document.createElement("a");
    // this._dataInput = document.createElement("input");
    // this._dataInput.type = "text";
    // this._dataInput.hidden = true;
    // document.body.append(this._dataInput);
  }

  private _buildChoiceBtn(): void {
    var input = document.createElement("text");
    input.id = "text";
    input.textContent = "Choose theme:";
    this._choiceInput = document.createElement("select");
    this._choiceInput.id = "weather";
    const spring = document.createElement("option");
    spring.text = "spring";
    const summer = document.createElement("option");
    summer.text = "summer";
    const autumn = document.createElement("option");
    autumn.text = "autumn";
    const winter = document.createElement("option");
    winter.text = "winter";
    this._choiceInput.add(spring);
    this._choiceInput.add(summer);
    this._choiceInput.add(autumn);
    this._choiceInput.add(winter);
    this.view.appendChild(input);
    this.view.appendChild(this._choiceInput);
  }

  private _buildRowInput(): void {
    this._rowInput = document.createElement("input");
    this._rowInput.placeholder = "5";
    this._rowInput.id = "row";
    this.view.appendChild(this._rowInput);
  }

  private _buildLevelBtn(): void {
    var text = document.createElement("text");
    text.id = "text";
    text.textContent = "Level";
    this._levelInput = document.createElement("input");
    this._levelInput.id = "levelinp";
    this.view.appendChild(text);
    this.view.appendChild(this._levelInput);
  }

  private _buildColInput(): void {
    this._colInput = document.createElement("input");
    this._colInput.placeholder = "5";
    this._colInput.id = "col";
    this.view.appendChild(this._colInput);
  }

  private _buildBoardCreatBtn(): void {
    this._buildCreatBoardBtn = document.createElement("button");
    this._buildCreatBoardBtn.textContent = "creat board";
    this._buildCreatBoardBtn.id = "btn";
    this.view.appendChild(this._buildCreatBoardBtn);
  }

  private _buildTestBtn(): void {
    this._btnTest = document.createElement("button");
    this._btnTest.textContent = "test level";
    this._btnTest.id = "btn_test";
    this._btnTest.style.backgroundColor = "#2d3b30";
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
