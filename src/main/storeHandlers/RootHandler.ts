// tslint:disable-next-line:no-implicit-dependencies
import { WebContents } from "electron";
import { ServerStore } from "./ServerStore";

class RootHandler {
  public serverStore:ServerStore | undefined;

  public register(wc:WebContents) {
    this.serverStore = new ServerStore(wc);
    this.serverStore.register();
    // this.hybridWebView.register();
  }
}

export { RootHandler };
