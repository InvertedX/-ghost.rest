import { app, BrowserWindow /*, screen */ } from "electron";
import installExtension, {
  MOBX_DEVTOOLS,
  REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";
import * as path from "path";
import * as url from "url";
import { RootHandler } from "./storeHandlers/RootHandler";

// We want nodeEnv to contain either "production" or "development"
// "development" means running in a local server with files loaded from project not from asar
const nodeEnv =
  process.env.NODE_ENV === undefined ? "production" : process.env.NODE_ENV;

// crashReporter.start();

const storeRootHandler = new RootHandler();

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("ready", () => {
  if (nodeEnv === "development") {
    // tslint:disable-next-line:no-implicit-dependencies
    const sourceMapSupport = require("source-map-support");
    sourceMapSupport.install();
  }

  createWindow();
});

function createWindow() {
  // { width: 1024, height: 728 }
  // const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  // const win = new BrowserWindow({ width, height });
  const win = new BrowserWindow();
  storeRootHandler.register(win.webContents);

  if (nodeEnv === "development") {
    // delay 1000ms to wait for webpack-dev-server start
    setTimeout(() => {
      win.loadURL(
        url.format({
          pathname: "localhost:3000/electron.html",
          protocol: "http:",
          slashes: true,
        }),
      );
      // tslint:disable-next-line:no-implicit-dependencies
      require("devtron").install();
      installExtension(MOBX_DEVTOOLS)
        .then((name:string) => console.log(`Added Extension:  ${name}`))
        .catch((err:Error) => console.log("An error occurred: ", err));
      installExtension(REACT_DEVELOPER_TOOLS)
        .then((name:string) => console.log(`Added Extension:  ${name}`))
        .catch((err:Error) => console.log("An error occurred: ", err));
      win.webContents.openDevTools();
    }, 1000);
  } else {
    // __dirname is /src/main, where this file is
    const mangledPath = path.resolve(__dirname, "../../dist/electron.html");
    win.loadURL(
      url.format({
        pathname: mangledPath,
        protocol: "file:",
        slashes: true,
      }),
    );
  }
}
