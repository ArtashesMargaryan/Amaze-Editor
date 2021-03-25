import { THEMES, UI_STATUS } from "../constatnts";
import { BoardConfig } from "../type";
import { ObservableModel } from "./observable-model";

export enum Themes {
  spring = 1,
  summer = 2,
  autumn = 3,
  winter = 4,
}
export class UIModel extends ObservableModel {
  private _row: number;
  private _col: number;
  private _config: BoardConfig;
  private _status: string;
  private _theme: Themes;
  private _level: number;
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

  public get theme(): Themes {
    return this._theme;
  }

  public set level(level: number) {
    this._level = level;
  }

  public initialize(): void {
    this._col = this._config.size.x;
    this._row = this._config.size.y;
    this._status = UI_STATUS.start;
  }

  public setTheme(theme: string): void {
    switch (theme) {
      case THEMES.autumn:
        this._theme = Themes.autumn;
        break;
      case THEMES.spring:
        this._theme = Themes.spring;
        break;
      case THEMES.summer:
        this._theme = Themes.summer;
        break;
      case THEMES.winter:
        this._theme = Themes.winter;
        break;
    }
  }

  public selectTestBtn(): void {
    if (this.status === UI_STATUS.start) {
      this.status = UI_STATUS.test;
    } else if (this.status === UI_STATUS.test) {
      this.status = UI_STATUS.start;
    }
  }
  //UI_STATUS
}
