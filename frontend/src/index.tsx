import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import rootReducer, { rootSaga } from "./modules";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";
import "semantic-ui-css/semantic.min.css";
import App from "./App";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./config/firebaseConfig";

firebase.initializeApp(firebaseConfig);

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware, logger)),
);
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root"),
);
