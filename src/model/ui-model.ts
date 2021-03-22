import { UI_STATUS } from "../constatnts";
import { BoardConfig } from "../type";
import { ObservableModel } from "./observable-model";

export class UIModel extends ObservableModel {
  private _row: number;
  private _col: number;
  private _config: BoardConfig;
  private _status: string;
  public constructor(config: BoardConfig) {
    super("UIModel");
    this._config = config;
    this.makeObservable();
  }

  /**
   * set status
newValue:string   */
  public set status(newValue: string) {
    this._status = newValue;
  }

  public get status(): string {
    return this._status;
  }

  public initialize(): void {
    // console.warn(this._config);

    this._col = this._config.size.x;
    this._row = this._config.size.y;
    this._status = UI_STATUS.start;
    //
  }

  public selectTestBtn(): void {
    // console.warn(this._config);

    if (this.status === UI_STATUS.start) {
      this.status = UI_STATUS.test;
    } else if (this.status === UI_STATUS.test) {
      this.status = UI_STATUS.start;
    }
  }

  //UI_STATUS
}
