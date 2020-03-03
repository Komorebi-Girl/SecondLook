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
        <Route exact path="/" component={Dashboard} />
        <Route path="/auth/login" component={Login} />
        <Route path="/submit/:userID" component={Teachbacks} />
        <Route path="/review/:teachbackID/:userID" component={QAform} />
      </Switch>
    </div>
  </Router>
);

export default App;
