import { Route } from "react-router-dom";
import Template from "src/component/Template";
import Home from "src/component/Home";
import Profile from "src/component/Profile";
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
