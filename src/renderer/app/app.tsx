import { configure } from "mobx";
import { Provider } from "mobx-react";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter, Route } from "react-router-dom";
import { AppHomePage } from "../components/AppHomePage";
import { StoreRoot } from "../store";
// import "../../shared/app/app.global.scss";

configure({
  enforceActions: "observed",
});

const stores = new StoreRoot();

ReactDOM.render(
  <Provider appState={stores}>
    <HashRouter>
      <div className="app">
        <Route exact={true} path="/" component={AppHomePage} />
      </div>
    </HashRouter>
  </Provider>,
  document.getElementById("app-root"),
);
