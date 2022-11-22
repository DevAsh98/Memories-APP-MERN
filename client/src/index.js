import React from "react";
import ReactDOM from "react-dom"; //this import should be strictly followed
import './index.css';

import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from 'redux-thunk';
import reducers from "./reducers";

import App from "./App";

const store = createStore(reducers, compose(applyMiddleware(thunk))); //thunk is the middle ware that is applied

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
