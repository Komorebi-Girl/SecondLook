import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import API from "./utils/API";
import Nav from "./components/Nav";
import Teachbacks from "./pages/Teachbacks";
import Dashboard from "./pages/Dashboard";
import QAform from "./pages/QAform";
import Login from "./pages/Login";

class App extends Component {
  state = {
    userID: ""
  };

  componentDidMount() {
    this.loadUser();
  }

  loadUser = () => {
    API.returnUser().then(res => this.setState({ userID: res.data._id }));
  };

  render() {
    return (
      <Router>
        <div>
          <Nav userID={this.state.userID} />
          <Switch>
            <Route exact path="/">
              {this.state.userID ? (
                <Redirect to={`/dashboard/${this.state.userID}`} />
              ) : (
                <Login />
              )}
            </Route>
            <Route path="/dashboard/:userID" component={Dashboard} />
            <Route path="/submit/:userID" component={Teachbacks} />
            <Route path="/review/:userID/:tbID" component={QAform} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
