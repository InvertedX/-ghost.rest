// tslint:disable-next-line:no-implicit-dependencies
import { Event, WebContents } from "electron";
import {
  M2R_ON_REQUEST,
  M2R_ON_RESPONSE,
  R2M_START_SERVER,
  R2M_STOP_SEVER,
} from "../../shared/ipc.events";
import { IRequest, IResponse, IServerOptions } from "../../shared/models";
import ProxyHandler, { IReqResReceivers } from "../ProxyHandler";
import { AbstractStoreHandler } from "./AbstractStoreHandler";

class ServerStore extends AbstractStoreHandler {
  private counter = 0;
  private proxyHandler:ProxyHandler = new ProxyHandler();
  public constructor(wc:WebContents) {
    super(wc);
  }
  public onStartServer = (handler:(url?:string) => void) => {
    handler();
    this.sendM2R(R2M_START_SERVER, this.counterDeltaString);
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
  }

  public startServer = () => {
    console.log("Startin Server--->");
    const options:IServerOptions = {
      port: 4000,
      url: "http://httpbin.org",
    };
    const reqResHandlers:IReqResReceivers = {
      request: this.onRequest,
      response: this.onResponse,
    };
    this.proxyHandler.startServer(options, reqResHandlers);
  }

  public stopServer = () => {
    this.proxyHandler.stopServer();
  }

  private counterDeltaString = (ipc:string, event:Event, arg:any) => {
    const delta:number = Number(arg as string);
    this.counter += delta;
    this.sendR2mReply(ipc, event, this.counter);
  }
}

export { ServerStore };
