import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import Teachbacks from "./pages/Teachbacks";
import QAform from "./pages/QAform";

const App = () => (
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Teachbacks} />
        <Route path="/teachbacks/:id" component={QAform} />
      </Switch>
    </div>
  </Router>
);

export default App;
