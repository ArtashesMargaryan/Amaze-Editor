import { onCellClick } from "../command/on-cell-click-command";
import { onGameBoardReady } from "../command/on-game-board-ready-commands";
import { onKeyDownCommand } from "../command/on-key-down-command";
import { CellViewEvent, GameViewEvent, UIViewEvent } from "../events/view";

export const legoLoggerConfig = Object.freeze({});

export const gameCommands = Object.freeze([
  {
    event: UIViewEvent.gameBoardReady,
    command: onGameBoardReady,
  },
  {
    event: CellViewEvent.cellClick,
    command: onCellClick,
  },
  {
    event: GameViewEvent.keydown,
    command: onKeyDownCommand,
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
