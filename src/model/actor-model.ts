import { ObservableModel } from "./observable-model";

export class ActorModel extends ObservableModel {
  private _status: string = null;
  public constructor() {
    super("Actor");
    this.makeObservable();
  }

  // public get status(): string {
  //   return this._status;
  // }

  public initialize(): void {
    // this._status = "born";
  }
}
