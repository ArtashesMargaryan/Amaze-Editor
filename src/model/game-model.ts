import { ObservableModel } from "./observable-model";

export class GameModel extends ObservableModel {
  private _color: number;

  public constructor() {
    super("GameModel");
    this.makeObservable();
  }
}
