import { inject, observer } from "mobx-react";
import * as React from "react";
import { StoreRoot } from "../../store";

@inject("appState")
@observer
class AppHomePage extends React.Component<{ appState:StoreRoot }, {}> {
  constructor(Props:any) {
    super(Props);
  }

  public render() {
    const { serverHandler } = this.props.appState;
    return (
      <div>
        <h2>Ghost Rest</h2>
        <button onClick={serverHandler.startServer}>Start</button>
      </div>
    );
  }
}

export { AppHomePage };
