import { action, observable } from "mobx";
import { R2M_START_SERVER, R2M_STOP_SEVER } from "../../shared/ipc.events";
import { IResponse, IServerOptions } from "../../shared/models";
import { AbstractStore } from "./AbstractStore";

class ServerHandlerStore extends AbstractStore {
  @observable public currentTarget?:IServerOptions | null = null;
  @observable public responses:IResponse[] = [];

  constructor() {
    super();
    this.startServer = this.startServer.bind(this);
    this.stopServer = this.startServer.bind(this);
    this.setTargetServer = this.startServer.bind(this);
  }

  @action
  public setTargetServer(target:IServerOptions) {
    this.currentTarget = target;
  }

  @action
  public startServer() {
    this.sendR2m(R2M_START_SERVER, this.currentTarget);
  }

  @action
  public stopServer(target:IServerOptions) {
    this.sendR2m(R2M_STOP_SEVER, {});
  }
}

export { ServerHandlerStore };
