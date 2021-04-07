import { Route } from "react-router-dom";
import Template from "./component/Template";
import Home from "./component/Home";
import Profile from "./component/Profile";
import { SemanticToastContainer } from "react-semantic-toasts";
import "./App.scss";

const App = () => {
  return (
    <>
      <Template>
        <Route path="/" component={Home} exact />
        <Route path="/:username" component={Profile} />
      </Template>
      <SemanticToastContainer position="top-right" />
    </>
  );
};

export default App;
