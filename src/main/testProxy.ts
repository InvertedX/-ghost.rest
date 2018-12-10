// import ProxyHandler, { IReqResReceivers, IServerOptions } from "./ProxyHandler";
// import { Application, Request, Response } from "express";
// tslint:disable-next-line:no-implicit-dependencies
import ProxyHandler, { IReqResReceivers, IServerOptions } from "./ProxyHandler";

const proxyHandler:ProxyHandler = new ProxyHandler();

const options:IServerOptions = {
  port: 4000,
  url: "http://httpbin.org",
};
const reqResHandlers:IReqResReceivers = {
  request: (request) => {
    console.log("on req");
  },
  response: (response) => {
    console.log("on res");
  },
};

proxyHandler.startServer(options, reqResHandlers);
