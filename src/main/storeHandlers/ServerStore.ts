// tslint:disable-next-line:no-implicit-dependencies
import { Event, WebContents } from "electron";
import {
  M2R_ON_REQUEST,
  M2R_ON_RESPONSE,
  R2M_SERVER_STATUS,
  R2M_START_SERVER,
  R2M_STOP_SEVER,
} from "../../shared/ipc.events";
import { IRequest, IResponse, IServerOptions } from "../../shared/models";
import ProxyHandler, { IReqResReceivers } from "../ProxyHandler";
import { AbstractStoreHandler } from "./AbstractStoreHandler";

class ServerStore extends AbstractStoreHandler {
  private proxyHandler:ProxyHandler = new ProxyHandler();
  public constructor(wc:WebContents) {
    super(wc);
  }
  public onStartServer = (handler:(url?:string) => void) => {
    handler();
    this.sendM2R(R2M_START_SERVER, {});
  }

  public onStopeServer = (handler:() => void) => {
    handler();
  }

  public onResponse = (res:IResponse):void => {
    this.sendM2R(M2R_ON_RESPONSE, res);
  }

  public onRequest = (req:IRequest):void => {
    this.sendM2R(M2R_ON_REQUEST, req);
  }

  public register = () => {
    this.onR2m(R2M_START_SERVER, this.startServer);
    this.onR2m(R2M_STOP_SEVER, this.stopServer);
    this.onR2m(R2M_SERVER_STATUS, this.getServerStatus);
  }

  public getServerStatus = (ipc, event, arg) => {
    const status = this.proxyHandler.getServerStatus();
    this.sendR2mReply(ipc, event, status);
  }

  public startServer = (ipc:string, event:Event, argOptions:any) => {
    const options:IServerOptions = {
      port: 3000,
      url: "http://httpbin.org",
    };

    const reqResHandlers:IReqResReceivers = {
      request: this.onRequest,
      response: this.onResponse,
    };
    this.proxyHandler.startServer(
      options,
      reqResHandlers,
      (success, port, error:any) => {
        this.sendR2mReply(ipc, event, {
          error,
          success,
        });
      },
    );
  }

  public stopServer = () => {
    this.proxyHandler.stopServer();
  }
}

export { ServerStore };
