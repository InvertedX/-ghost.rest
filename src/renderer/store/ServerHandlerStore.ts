import { action, observable } from "mobx";
import {
  R2M_SERVER_STATUS,
  R2M_START_SERVER,
  R2M_STOP_SEVER,
} from "../../shared/ipc.events";
import { IResponse, IServerOptions } from "../../shared/models";
import { AbstractStore } from "./AbstractStore";

class ServerHandlerStore extends AbstractStore {
  @observable public currentTarget?:IServerOptions | null = null;
  @observable public responses:IResponse[] = [];

  constructor() {
    super();
    this.onR2mReply(R2M_SERVER_STATUS, this.onStatusReply);
    this.onR2mReply(R2M_START_SERVER, this.onStartServerReply);
  }

  @action
  public setTargetServer = (target:IServerOptions) => {
    this.currentTarget = target;
  }

  @action
  public startServer = () => {
    this.sendR2m(R2M_START_SERVER, this.currentTarget);
  }

  public onStartServerReply = (ipc, event, payload) => {
    console.log("GOT reply", payload);
  }

  @action
  public getStatus = () => {
    this.sendR2m(R2M_SERVER_STATUS, this.currentTarget);
  }

  public onStatusReply = (ipc, event, data) => {
    console.log("GOT statuys", data, event, ipc);
  }

  @action
  public stopServer = (target:IServerOptions) => {
    this.sendR2m(R2M_STOP_SEVER, {});
  }
}

export { ServerHandlerStore };
