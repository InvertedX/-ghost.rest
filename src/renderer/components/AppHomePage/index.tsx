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
    return (
      <div>
        <h2>Ghost Rest</h2>
      </div>
    );
  }
}

export { AppHomePage };
