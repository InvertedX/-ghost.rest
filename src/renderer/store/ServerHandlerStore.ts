import { action, observable } from "mobx";
import {
  R2M_SERVER_STATUS,
  R2M_START_SERVER,
  R2M_STOP_SEVER,
} from "../../shared/ipc.events";
import { IResponse, IServerOptions } from "../../shared/models";
import { AbstractStore } from "./AbstractStore";

interface IReplyStatus {
  success:boolean;
  error?:string;
}
class ServerHandlerStore extends AbstractStore {
  @observable public currentTarget:IServerOptions = { port: 80, url: "" };
  @observable public responses:IResponse[] = [];
  @observable public running:boolean = false;

  private callbackForSuccess?:() => void;

  constructor() {
    super();
    this.onR2mReply(R2M_SERVER_STATUS, this.onStatusReply);
    this.onR2mReply(R2M_START_SERVER, this.onStartServerReply);
  }

  @action
  public startServer = (callbackForSuccess?:() => void) => {
    this.callbackForSuccess = callbackForSuccess;
    console.log("THIS TARGE", this.currentTarget);
    this.sendR2m(R2M_START_SERVER, this.currentTarget);
  }

  @action
  public onStartServerReply = (ipc, event, data:IReplyStatus) => {
    this.running = data.success;
    if (data.success === true) {
      this.callbackForSuccess!();
    }
  }

  @action
  public getStatus = () => {
    this.sendR2m(R2M_SERVER_STATUS, this.currentTarget);
  }

  @action
  public onStatusReply = (ipc, event, data:IReplyStatus) => {
    console.log("ONSTATUYS");
    this.running = data.success;
    if (data.success === true) {
      this.callbackForSuccess!();
    }
  }

  @action
  public setCurrentTarget = (target:IServerOptions) => {
    this.currentTarget = target;
  }

  @action
  public stopServer = () => {
    this.sendR2m(R2M_STOP_SEVER, {});
  }
}

export { ServerHandlerStore };
