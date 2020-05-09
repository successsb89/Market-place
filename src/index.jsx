import ReactDOM from "react-dom";
import "./main.css";
import App from "./App.jsx";
import React from "react";
//connect with store.js by redux.
//reference: store.js.
import { Provider } from "react-redux";
import store from "./store.js";

import reloadMagic from "./reload-magic-client.js"; // automatic reload
reloadMagic(); // automatic reload

ReactDOM.render(
  //since redux has been introduced, provide redux using by Provider to render.
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
