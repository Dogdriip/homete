import { Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./component/Home";
import Profile from "./component/Profile";
import { Container, Header, Message } from "semantic-ui-react";
import { SemanticToastContainer } from "react-semantic-toasts";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    Notification.requestPermission();
  }, []);

  return (
    <>
      <Container text style={{ margin: 20 }}>
        <Header as="h1">
          <Link to="/" style={{ color: "black" }}>
            homete!
          </Link>
        </Header>
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
