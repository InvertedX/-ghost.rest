import { action, observable } from "mobx";
import { IRequest, IResponse } from "../../shared/models";
import { AbstractStore } from "./AbstractStore";
class RequestStore extends AbstractStore {
  @observable public requests:IRequest[] = [];
  @observable public responses:IResponse[] = [];

  constructor() {
    super();
  }

  @action
  public addRequest(request:any) {
    this.requests = [...this.requests, request];
  }

  @action
  public addResponse(response:any) {
    this.responses = [...this.responses, response];
  }
}

export { RequestStore };
