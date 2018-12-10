"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var ipc_events_1 = require("../../shared/ipc.events");
var ProxyHandler_1 = require("../ProxyHandler");
var AbstractStoreHandler_1 = require("./AbstractStoreHandler");
var ServerStore = /** @class */ (function (_super) {
    __extends(ServerStore, _super);
    function ServerStore(wc) {
        var _this = _super.call(this, wc) || this;
        _this.counter = 0;
        _this.proxyHandler = new ProxyHandler_1["default"]();
        _this.onStartServer = function (handler) {
            handler();
            _this.sendM2R(ipc_events_1.R2M_START_SERVER, _this.counterDeltaString);
        };
        _this.onStopeServer = function (handler) {
            handler();
        };
        _this.onResponse = function (res) {
            _this.sendM2R(ipc_events_1.M2R_ON_RESPONSE, res);
        };
        _this.onRequest = function (req) {
            _this.sendM2R(ipc_events_1.M2R_ON_REQUEST, req);
        };
        _this.register = function () {
            _this.onR2m(ipc_events_1.R2M_START_SERVER, _this.startServer);
            _this.onR2m(ipc_events_1.R2M_STOP_SEVER, _this.stopServer);
        };
        _this.startServer = function () {
            console.log("Startin Server--->");
            var options = {
                port: 4000,
                url: "http://httpbin.org"
            };
            var reqResHandlers = {
                request: _this.onRequest,
                response: _this.onResponse
            };
            _this.proxyHandler.startServer(options, reqResHandlers);
        };
        _this.stopServer = function () {
            _this.proxyHandler.stopServer();
        };
        _this.counterDeltaString = function (ipc, event, arg) {
            var delta = Number(arg);
            _this.counter += delta;
            _this.sendR2mReply(ipc, event, _this.counter);
        };
        return _this;
    }
    return ServerStore;
}(AbstractStoreHandler_1.AbstractStoreHandler));
exports.ServerStore = ServerStore;
//# sourceMappingURL=ServerStore.js.map