// import { Menu, MenuItem } from "@blueprintjs/core";
import { inject, observer } from "mobx-react";
import * as React from "react";
import styled from "styled-components";
import { StoreRoot } from "../../store";
import RequestItem from "./RequestItem";

const SideBarContainer = styled.div`
  height: 100vh;
  padding-bottom: 12px;
  overflow-y: scroll;
  background: #282c34;
`;

@inject("appState")
@observer
class Sidebar extends React.Component<{ appState?:StoreRoot }, {}> {
  public render() {
    // const { requests } = this.props.appState!.requestStore!;
    return (
      <SideBarContainer>
        {/* {requests.map((item) => (
          <RequestItem key={item.id} request={item} />
        ))} */}
        <RequestItem
          request={{
            headers: {
              "accept": "*/*",
              "accept-encoding": "gzip, deflate, br",
              "accept-language":
                "en-IN,en;q=0.9,ml-IN;q=0.8,ml;q=0.7,en-GB;q=0.6,en-US;q=0.5",
              "connection": "keep-alive",
              "cookie":
                "wp-settings-1=libraryContent%3Dbrowse; wp-settings-time-1=1536775970; _gauges_unique_year=1; _gauges_unique=1; _gauges_unique_month=1; _gauges_unique_day=1; _gauges_unique_hour=1; _gauges_cookie=1",
              "dnt": "1",
              "host": "localhost:4500",
              "referer": "http://localhost:4500/",
              "user-agent":
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36",
            },
            id: "4a507863d7ff1496",
            method: "GET",
            size: 12,
            status: null,
            url: "/spec.json",
          }}
        />
      </SideBarContainer>
    );
  }
}

export default Sidebar;
