"use strict";
exports.__esModule = true;
var ServerStore_1 = require("./ServerStore");
var RootHandler = /** @class */ (function () {
    function RootHandler() {
    }
    RootHandler.prototype.register = function (wc) {
        this.serverStore = new ServerStore_1.ServerStore(wc);
        this.serverStore.register();
        // this.hybridWebView.register();
    };
    return RootHandler;
}());
exports.RootHandler = RootHandler;
//# sourceMappingURL=RootHandler.js.map