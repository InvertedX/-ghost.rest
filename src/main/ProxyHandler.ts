// tslint:disable-next-line:no-implicit-dependencies
import { app } from "electron";
// tslint:disable-next-line:no-implicit-dependencies
import { Application } from "express";
import * as http from "http";
import { IRequest, IResponse, IServerOptions } from "../shared/models";
import { IProxyOptions, proxy } from "./proxy";

// tslint:disable-next-line:no-var-requires
const path = require("path");

export interface IReqResReceivers {
  request:(req:any) => void;
  response:(res:any) => void;
}
class ProxyHandler {
  private httpServer?:http.Server;
  private expressApp?:Application;
  private isRunning:boolean = false;

  constructor() {
    process.on("beforeExit", () => {
      if (this.httpServer && this.expressApp) {
        this.httpServer.close();
      }
    });
  }

  public startServer = (opt:IServerOptions, callback:IReqResReceivers) => {
    try {
      const options:IProxyOptions = {
        onError: () => {
          console.log("error");
        },
        onProxyRequest: (req:IRequest) => {
          callback.request(req);
        },
        onProxyResponse: (res:IResponse) => {
          callback.response(res);
        },
        target: opt.url,
      };
      if (!this.expressApp) {
        const basePath = path.join(app.getPath("userData"), "requests");
        this.expressApp = proxy(options, basePath);
      }
      if (this.isRunning && this.httpServer !== undefined) {
        this.httpServer.close();
      }

      this.httpServer = this.expressApp.listen(opt.port, () => {
        console.log("Server Started");
        this.isRunning = true;
      });
    } catch (error) {
      console.log("Error", error);
    }
  }

  public stopServer = () => {
    if (this.httpServer && this.expressApp) {
      this.httpServer.close();
    }
  }
}

export default ProxyHandler;
