import React, { Component } from "react";
import API from "../../utils/API";
import NavOptions from "../NavOptions";

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
          </div>
          {this.state.userID ? <NavOptions userID={this.state.userID} /> : null}
        </div>
      </nav>
    );
  }
}

export default Nav;
