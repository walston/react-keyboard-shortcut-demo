import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import test from "ava";

test("renders without crashing", context => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
