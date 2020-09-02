import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import API from "./utils/API";
import Nav from "./components/Nav";
import SubmitForm from "./pages/SubmitForm";
import Dashboard from "./pages/Dashboard";
import QAform from "./pages/QAform";
import Login from "./pages/Login";
import ResultsPage from "./pages/ResultsPage";
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
            <Route path="/submit/:userID/:role" component={SubmitForm} />
            <Route path="/review/:userID/:itemID/:role" component={QAform} />
            <Route path="/view/:userID/:itemID/:role" component={ResultsPage} />
            <Route path="/manage/:userID" component={ManagerView} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
