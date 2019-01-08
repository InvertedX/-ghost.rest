import { action, observable } from "mobx";
import { M2R_ON_REQUEST, M2R_ON_RESPONSE } from "../../shared/ipc.events";
import { IRequest, IResponse } from "../../shared/models";
import { AbstractStore } from "./AbstractStore";
class RequestStore extends AbstractStore {
  @observable public requests:IRequest[] = [];
  @observable public responses:IResponse[] = [];

  constructor() {
    super();
    this.onM2R(M2R_ON_REQUEST, (ipc, event, req:any) => {
      this.addRequest(req);
    });
    this.onM2R(M2R_ON_RESPONSE, (ipc, event, res:any) => {
      this.addResponse(res);
    });
  }

  @action
  public addRequest(request:any) {
    this.requests = [request, ...this.requests];
  }

  @action
  public addResponse(response:any) {
    this.responses = [response, ...this.responses];
  }
}

export { RequestStore };
