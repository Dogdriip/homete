import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "semantic-ui-css/semantic.min.css";
import App from "./App";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./config/firebaseConfig";
import { RecoilRoot } from "recoil";

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <RecoilRoot>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RecoilRoot>,
  document.getElementById("root")
);
