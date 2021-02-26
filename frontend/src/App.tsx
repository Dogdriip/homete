import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Home from "./component/Home";
import Profile from "./component/Profile";
import { Container, Header, Message } from "semantic-ui-react";
import { SemanticToastContainer } from "react-semantic-toasts";
import "react-semantic-toasts/styles/react-semantic-alert.css";

const App = () => {
  return (
    <>
      <Container text style={{ margin: 20 }}>
        <Header as="h1">⚔️소드마스터여, 영원하라⚔️</Header>
        <Message info>
          <p>알파 서비스 중입니다!</p>
        </Message>
        <Route path="/" component={Home} exact />
        <Route path="/:username" component={Profile} exact />
      </Container>
      <SemanticToastContainer position="top-right" />
    </>
  );
};

export default App;
