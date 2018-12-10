"use strict";
exports.__esModule = true;
// import ProxyHandler, { IReqResReceivers, IServerOptions } from "./ProxyHandler";
// import { Application, Request, Response } from "express";
// tslint:disable-next-line:no-implicit-dependencies
var ProxyHandler_1 = require("./ProxyHandler");
var proxyHandler = new ProxyHandler_1["default"]();
var options = {
    port: 4000,
    url: "http://httpbin.org"
};
var reqResHandlers = {
    request: function (request) {
        console.log("on req");
    },
    response: function (response) {
        console.log("on res");
    }
};
proxyHandler.startServer(options, reqResHandlers);
