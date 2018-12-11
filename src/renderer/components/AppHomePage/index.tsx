import { inject, observer } from "mobx-react";
import * as React from "react";
import SplitPane from "react-split-pane";
import { StoreRoot } from "../../store";

@inject("appState")
@observer
class AppHomePage extends React.Component<{ appState:StoreRoot }, {}> {
  constructor(Props:any) {
    super(Props);
  }

  public render() {
    const { serverHandler, requestStore } = this.props.appState;
    const { requests, responses } = requestStore;
    return (
      <div>
        <h2>Ghost Rest</h2>
        <button onClick={serverHandler.startServer}>Start</button>
        <div>
          <SplitPane split="vertical" minSize={100} defaultSize={200}>
            <div>
              <ul>
                {requests.map((request) => (
                  <li key={request.id}>
                    {request.headers.host}
                    {request.url}
                    <br />
                    {request.id}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <ul>
                {responses.map((response) => (
                  <li key={response.id}>{JSON.stringify(response)}</li>
                ))}
              </ul>
            </div>
          </SplitPane>
        </div>
      </div>
    );
  }
}

export { AppHomePage };
