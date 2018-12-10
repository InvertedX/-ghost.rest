import { RequestStore } from "./RequestStore";

class StoreRoot {
  //
  // Following the MobX best practices documentation,
  // https://mobx.js.org/best/store.html use a root store
  // to provide support breaking the application state into
  // multiple child stores
  //
  public requestStore = new RequestStore();
  public counter = {};
}

export { StoreRoot };
