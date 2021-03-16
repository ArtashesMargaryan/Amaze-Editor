import { lego } from "@armathai/lego";
import { startupCommand } from "./command/startup-command";
import "./styles/style.scss";
import { MainView } from "./view/main-view";

(function () {
  if (process.env.NODE_ENV !== "production") {
    const { legologger } = require("@armathai/lego-logger");
    // const { legoLoggerConfig } = require("./constants/configs/lego-config");
    legologger.start(lego, {});
  }

  const mainView = new MainView();
  document.body.appendChild(mainView.view);

  lego.command.execute(startupCommand);
})();
