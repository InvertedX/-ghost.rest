"use strict";
exports.__esModule = true;
// tslint:disable-next-line:no-implicit-dependencies
var electron_1 = require("electron");
var proxy_1 = require("./proxy");
// tslint:disable-next-line:no-var-requires
var path = require("path");
var ProxyHandler = /** @class */ (function () {
    function ProxyHandler() {
        var _this = this;
        this.isRunning = false;
        this.startServer = function (opt, callback) {
            try {
                var options = {
                    onError: function () {
                        console.log("error");
                    },
                    onProxyRequest: function (req) {
                        callback.request(req);
                    },
                    onProxyResponse: function (res) {
                        callback.response(res);
                    },
                    target: opt.url
                };
                if (!_this.expressApp) {
                    var basePath = path.join(electron_1.app.getPath("userData"), "requests");
                    _this.expressApp = proxy_1.proxy(options, basePath);
                }
                if (_this.isRunning && _this.httpServer !== undefined) {
                    _this.httpServer.close();
                }
                _this.httpServer = _this.expressApp.listen(opt.port, function () {
                    console.log("Server Started");
                    _this.isRunning = true;
                });
            }
            catch (error) {
                console.log("Error", error);
            }
        };
        this.stopServer = function () {
            if (_this.httpServer && _this.expressApp) {
                _this.httpServer.close();
            }
        };
        process.on("beforeExit", function () {
            if (_this.httpServer && _this.expressApp) {
                _this.httpServer.close();
            }
        });
    }
    return ProxyHandler;
}());
exports["default"] = ProxyHandler;
//# sourceMappingURL=ProxyHandler.js.map