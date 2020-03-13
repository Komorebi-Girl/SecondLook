import React, { Component } from "react";
import API from "../../utils/API";

class Nav extends Component {
  // Setting our component's initial state
  state = {
    userID: ""
  };

  // When the component mounts, load all teachbacks and save them to this.state.teachbacks
  componentDidMount() {
    this.loadUser();
  }

  loadUser = () => {
    API.returnUser().then(res => this.setState({ userID: res.data._id }));
  };

  render() {
    return (
      <nav className="navbar navbar-inverse navbar-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="collapsed navbar-toggle">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" /> <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            {this.state.userID ? (
              <a
                href={`/dashboard/${this.state.userID}`}
                className="navbar-brand"
              >
                SecondLook
              </a>
            ) : (
              <a href="/" className="navbar-brand">
                SecondLook
              </a>
            )}
            <a href={`/submit/${this.state.userID}`} className="navbar-brand">
              Submit
            </a>
            {this.state.userID ? (
              <a
                href="http://localhost:3001/auth/logout"
                className="navbar-brand"
              >
                Logout
              </a>
            ) : (
              <a href="/auth/login" className="navbar-brand">
                Login
              </a>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;
