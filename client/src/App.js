import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import Teachbacks from "./pages/Teachbacks";
import Dashboard from "./pages/Dashboard";
import QAform from "./pages/QAform";
import Login from "./pages/Login";

const App = () => (
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/dashboard/:userID" component={Dashboard} />
        <Route path="/submit/:userID" component={Teachbacks} />
        <Route path="/review/:userID/:tbID" component={QAform} />
      </Switch>
    </div>
  </Router>
);

export default App;
