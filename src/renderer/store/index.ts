import { RequestStore } from "./RequestStore";
import { ServerHandlerStore } from "./ServerHandlerStore";

class StoreRoot {
  //
  // Following the MobX best practices documentation,
  // https://mobx.js.org/best/store.html use a root store
  // to provide support breaking the application state into
  // multiple child stores
  //
  public requestStore = new RequestStore();
  public serverHandler = new ServerHandlerStore();
  public counter = {};
}

export { StoreRoot };
