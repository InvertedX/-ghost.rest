"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var electron_devtools_installer_1 = require("electron-devtools-installer");
var path = require("path");
var url = require("url");
var RootHandler_1 = require("./storeHandlers/RootHandler");
// We want nodeEnv to contain either "production" or "development"
// "development" means running in a local server with files loaded from project not from asar
var nodeEnv = process.env.NODE_ENV === undefined ? "production" : process.env.NODE_ENV;
// crashReporter.start();
var storeRootHandler = new RootHandler_1.RootHandler();
electron_1.app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
electron_1.app.on("ready", function () {
    if (nodeEnv === "development") {
        // tslint:disable-next-line:no-implicit-dependencies
        var sourceMapSupport = require("source-map-support");
        sourceMapSupport.install();
    }
    createWindow();
});
function createWindow() {
    // { width: 1024, height: 728 }
    // const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    // const win = new BrowserWindow({ width, height });
    var win = new electron_1.BrowserWindow();
    storeRootHandler.register(win.webContents);
    if (nodeEnv === "development") {
        // delay 1000ms to wait for webpack-dev-server start
        setTimeout(function () {
            win.loadURL(url.format({
                pathname: "localhost:3000/electron.html",
                protocol: "http:",
                slashes: true
            }));
            // tslint:disable-next-line:no-implicit-dependencies
            require("devtron").install();
            electron_devtools_installer_1["default"](electron_devtools_installer_1.MOBX_DEVTOOLS)
                .then(function (name) { return console.log("Added Extension:  " + name); })["catch"](function (err) { return console.log("An error occurred: ", err); });
            electron_devtools_installer_1["default"](electron_devtools_installer_1.REACT_DEVELOPER_TOOLS)
                .then(function (name) { return console.log("Added Extension:  " + name); })["catch"](function (err) { return console.log("An error occurred: ", err); });
            win.webContents.openDevTools();
        }, 1000);
    }
    else {
        // __dirname is /src/main, where this file is
        var mangledPath = path.resolve(__dirname, "../../dist/electron.html");
        win.loadURL(url.format({
            pathname: mangledPath,
            protocol: "file:",
            slashes: true
        }));
    }
}
//# sourceMappingURL=index.js.map