import { Route } from "react-router-dom";
import Template from "./component/Template";
import Home from "./component/Home";
import { SemanticToastContainer } from "react-semantic-toasts";
import "./App.scss";

const App = (): JSX.Element => {
  return (
    <>
      <Template>
        <Route path="/" component={Home} exact />
        <Route path="/:username" component={Home} />
      </Template>
      <SemanticToastContainer position="top-right" />
    </>
  );
};

export default App;
