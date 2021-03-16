import { lego } from "@armathai/lego";
import { StoreEvent } from "../events/model";
import { GameModel } from "../model/game-model";
import { GameView } from "./game-view";
import { MainViewEvent } from "../events/view";

export class MainView {
  private _view: HTMLDivElement;
  private _btn: HTMLButtonElement;
  private _borderConfig:{}
  private _gameView: GameView;

  public constructor() {
    this._view = document.createElement("div");
    this._view.id = "main";

    lego.event.on(StoreEvent.gameUpdate, this._onGameModelUpdate, this);
    this._build()
  }

  public get view(): HTMLDivElement {
    return this._view;
  }

private _build(){
  this._buildInputArea()
  this._submit()
}

private _submit():void{
  this._validation()
this._btn.addEventListener('pointerdown',()=>{
  lego.event.emit(MainViewEvent.gameConfigReddy, this._borderConfig)
})
}

  private _buildInputArea():void{
    const inputRow:HTMLInputElement=document.createElement("input")
    inputRow.id='inputRow'
    // inputRow.value=5

    this.view.appendChild(inputRow)
    const inputColl:HTMLInputElement=document.createElement("input")
    inputRow.id='inputColl'
    // inputRow.value=5

    this.view.appendChild(inputColl)
    const submit:HTMLButtonElement=document.createElement("button")
    submit.id='submit'
    submit.textContent="build cells"
    this.view.appendChild((this._btn=submit))


  }

  private _onGameModelUpdate(gameModel: GameModel): void {
    gameModel ? this._buildGameView() : this._destroyGameView();
    console.warn(gameModel);
  }

  private _validation(): void {
    const x:number= 5//parseInt((document.getElementById('inputColl').value ))
    const y:number=5// parseInt((document.getElementById('inputColl').value ))
    this._borderConfig={
      size:{
        x:x,
        y:y
      }
    }
    // this._gameView = new GameView();
    // this._view.appendChild(this._gameView.view);
  }

  private _buildGameView(): void {
    this._gameView = new GameView();
    this._view.appendChild(this._gameView.view);
  }

  private _destroyGameView(): void {
    this._view.removeChild(this._gameView.view);
  }
}
