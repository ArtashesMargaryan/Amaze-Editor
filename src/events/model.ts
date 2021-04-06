export enum StoreEvent {
  gameUpdate = "StoreGameUpdate",
  uiUpdate = "StoreUiUpdate",
}

export enum GameModelEvent {
  boardUpdate = "GameModelBoardUpdate",
}

export enum BoardModelEvent {
  cellsUpdate = "BoardModelCellsUpdate",
  matrixUpdate = "BoardModelMatrixUpdate",
  cellsEventSwitch = "BoardModelCellsEventSwitch",
  boardReadyIn = "BoardModelBoardReadyInUpdate",
}

export enum CellModelEvent {
  statusUpdate = "CellModelStatusUpdate",
  actorUpdate = "CellModelActorUpdate",
  hasWarning = "CellModelHasWarningUpdate",
}

export enum UIModelEvent {
  statusUpdate = "GameModelUiUpdate",
}
