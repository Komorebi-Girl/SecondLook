import React from "react";
import NavOptions from "../NavOptions";

const Nav = props => (
  <nav className="navbar navbar-inverse navbar-top">
    <div className="container-fluid">
      <div className="navbar-header">
        <button type="button" className="collapsed navbar-toggle">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar" /> <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
        <a href="/" className="navbar-brand">
          SecondLook
        </a>
      </div>
      {props.userID ? <NavOptions userID={props.userID} /> : null}
    </div>
  </nav>
);

export default Nav;
