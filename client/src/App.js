import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import API from "./utils/API";
import Nav from "./components/Nav";
import Teachbacks from "./pages/Teachbacks";
import Dashboard from "./pages/Dashboard";
import QAform from "./pages/QAform";
import Login from "./pages/Login";
import TBprofile from "./pages/TBprofile";
import AssignView from "./pages/AssignView";
import ManagerView from "./pages/ManagerView";

class App extends Component {
  state = {
    userID: "",
  };

  componentDidMount() {
    this.loadUser();
  }

  loadUser = () => {
    API.returnUser().then((res) => this.setState({ userID: res.data._id }));
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
            <Route path="/assign/:userID" component={AssignView} />
            <Route path="/submit/:userID/:role" component={Teachbacks} />
            <Route path="/review/:userID/:tbID" component={QAform} />
            <Route path="/view/:userID/:tbID" component={TBprofile} />
            <Route path="/manage/:userID" component={ManagerView} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
