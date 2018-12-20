import { inject, observer } from "mobx-react";
import * as React from "react";
import styled from "styled-components";
import { StoreRoot } from "../../store";

const SideBarContainer = styled.div`
  height: 100vh;
  background: #282c34;
`;

@inject("appState")
@observer
class Sidebar extends React.Component<{}, { appState:StoreRoot }> {
  public render() {
    return <SideBarContainer />;
  }
}

export default Sidebar;
