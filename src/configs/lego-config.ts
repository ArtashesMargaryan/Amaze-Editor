import { onBuildLevelClickCommand } from "../command/on-build-level-click-command";
import { onCellClick } from "../command/on-cell-click-command";
import { onChoiceBtnClickCommand } from "../command/on-choice-btn-click-command";
import { onGameBoardReady } from "../command/on-game-board-ready-commands";
import { onKeyDownCommand } from "../command/on-key-down-command";
import { onUIViewReady } from "../command/on-ui-ready-commands";
import { CellViewEvent, GameViewEvent, UIViewEvent } from "../events/view";

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
  {
    event: GameViewEvent.keydown,
    command: onKeyDownCommand,
  },
  {
    event: UIViewEvent.onBuildLevelClick,
    command: onBuildLevelClickCommand,
  },
  {
    event: UIViewEvent.onChoiceBtnClick,
    command: onChoiceBtnClickCommand,
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
