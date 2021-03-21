import { onCellClick } from "../command/on-cell-click-command";
import { onGameBoardReady } from "../command/on-game-board-ready-commands";
import { onUIViewReady } from "../command/on-ui-ready-commands";
import { CellViewEvent, UIViewEvent } from "../events/view";

export const legoLoggerConfig = Object.freeze({});

export const gameCommands = Object.freeze([
  {
    event: UIViewEvent.gameBoardReady,
    command: onGameBoardReady,
  },
  {
    event: UIViewEvent.gameBoardReady,
    command: onUIViewReady,
  },
  {
    event: CellViewEvent.cellClick,
    command: onCellClick,
  },
  // {
  //     event: ActorsetViewEvent.actionsComplete,
  //     command: onActorActionsCompleteCommand,
  // },
  // {
  //     event: ActorsetViewEvent.actionsComplete,
  //     command: onActorActionsCompleteCommand,
  // },
]);
