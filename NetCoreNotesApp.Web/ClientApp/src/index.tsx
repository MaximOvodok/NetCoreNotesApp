import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import configureStore from "./store/configureStore";

import * as serviceWorker from "./serviceWorker";

// Create browser history to use in the Redux store
const baseUrl: any = document
  .getElementsByTagName("base")[0]
  .getAttribute("href");
const history: any = createBrowserHistory({ basename: baseUrl });

// Get the application-wide store instance, prepopulating with state from the server where available.
const store = configureStore(history, {});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
