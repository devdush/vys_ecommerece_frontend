import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authLoginReducer from "./store/reducer/auth";
import { thunk } from "redux-thunk";
import {
  applyMiddleware,
  combineReducers,
  createStore,
} from "@reduxjs/toolkit";
import cartReducer from "./store/reducer/cart";

const rootReducer = combineReducers({
  auth: authLoginReducer,
  cart: cartReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
