"use strict";
exports.__esModule = true;
// tslint:disable-next-line:no-implicit-dependencies
var electron_1 = require("electron");
var register = {};
var AbstractStoreHandler = /** @class */ (function () {
    function AbstractStoreHandler(wc) {
        var _this = this;
        this.onR2m = function (ipc, handler) {
            if (register[ipc] === true) {
                throw new Error("duplicate channel definitions for <" + ipc + ">");
            }
            if (ipc.indexOf("R2M-") !== 0) {
                throw new Error("invalid channel name for <" + ipc + ">");
            }
            if (ipc.substr(-"-REPLY".length) === "-REPLY") {
                throw new Error("invalid channel direction for <" + ipc + ">");
            }
            register[ipc] = true;
            electron_1.ipcMain.on(ipc, function (event, arg) {
                handler(ipc, event, arg);
            });
        };
        this.sendR2mReply = function (ipc, event, data) {
            if (ipc.indexOf("R2M-") !== 0) {
                throw new Error("invalid channel name for <" + ipc + ">");
            }
            if (ipc.substr(-"-REPLY".length) === "-REPLY") {
                throw new Error("invalid channel direction for <" + ipc + ">");
            }
            var ipc2 = ipc + "-REPLY";
            if (event === null ||
                event === undefined ||
                event.sender === null ||
                event.sender === undefined) {
                throw new Error("invalid event <" + ipc + ">");
            }
            // work around typescript typing bug with an any wrapper
            event.sender.send(ipc2, data);
        };
        this.sendM2R = function (ipc, data) { return _this.webcontent.send(ipc, data); };
        this.webcontent = wc;
    }
    return AbstractStoreHandler;
}());
exports.AbstractStoreHandler = AbstractStoreHandler;
//# sourceMappingURL=AbstractStoreHandler.js.map