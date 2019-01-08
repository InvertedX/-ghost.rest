import { inject, observer } from "mobx-react";
import * as React from "react";
import SplitPane from "react-split-pane";
import styled from "styled-components";
import { StoreRoot } from "../../store";
import Sidebar from "../Sidebar";
import TopNav from "../TopNav";
import ViewerPane from "./ViewerPane";

const PaneContainer = styled.div`
  background-color: #282a36;
  flex: 2;
`;

@inject("appState")
@observer
class Home extends React.Component<{ appState:StoreRoot }, { width:number }> {
  constructor(Props:any) {
    super(Props);
    this.state = {
      width: window.innerWidth,
    };
  }
  public render() {
    const sidebarWidth = (this.state.width / 100) * 30;
    const container = (this.state.width / 100) * 60;
    const viewerPaneWidth = this.state.width - sidebarWidth + 170;

    // const { requestStore } = this.props.appState;
    // const { requests } = requestStore;

    // tslint:disable-next-line:no-string-literal

    return (
      <div className="app-container">
        <TopNav/>
        <PaneContainer>
          <SplitPane
            split="vertical"
            minSize={30}
            maxSize={sidebarWidth}
            defaultSize={"20%"}
            className="primary"
          >
            <Sidebar />
            <ViewerPane totalWidth={viewerPaneWidth} container={container} />
          </SplitPane>
        </PaneContainer>
      </div>
    );
  }
}

export { Home };
