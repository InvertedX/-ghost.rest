import { action, observable } from "mobx";
import { AbstractStore } from "./AbstractStore";
class RequestStore extends AbstractStore {
  @observable public value = 0;

  constructor() {
    super();
  }

  @action
  public handleCounterValueReply(arg:number) {
    this.value = arg;
  }
}

export { RequestStore };
