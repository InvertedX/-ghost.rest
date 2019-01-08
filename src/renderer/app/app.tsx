import { configure } from "mobx";
import { Provider } from "mobx-react";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Home } from "../components/Home";
import "../scss/app.global.scss";
import { StoreRoot } from "../store";
import theme from "../theme";

configure({
  enforceActions: "observed",
});

const stores = new StoreRoot();

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider
      appState={stores}
      requestStore={stores.requestStore}
      serverHandler={stores.serverHandler}
    >
      <HashRouter>
        <div className="app">
          <Route exact={true} path="/" component={Home} />
        </div>
      </HashRouter>
    </Provider>
  </ThemeProvider>,
  document.getElementById("app-root"),
);
