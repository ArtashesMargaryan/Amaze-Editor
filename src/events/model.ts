export enum StoreEvent {
  gameUpdate = "StoreGameUpdate",
}

export enum GameModelEvent {
  boardUpdate = "GameModelBoardUpdate",
}

export enum BoardModelEvent {
  cellsUpdate = "BoardModelCellsUpdate",
  matrixUpdate = "BoardModelMatrixUpdate",
  cellsEventSwitch = "BoardModelCellsEventSwitch",
}

export enum CellModelEvent {
  statusUpdate = "CellModelStatusUpdate",
  actorUpdate = "CellModelActorUpdate",
}
