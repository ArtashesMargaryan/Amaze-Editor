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
}

export enum UIModelEvent {
  statusUpdate = "GameModelUiUpdate",
}
