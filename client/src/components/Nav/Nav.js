import React from "react";
import NavOptions from "../NavOptions";
import "./Nav.css";

const Nav = props => (
  <nav id="mainNav" className="navbar navbar-inverse navbar-top">
    <div className="container-fluid">
      <div className="navbar-header">
        <button
          type="button"
          id="toggleNav"
          className="collapsed navbar-toggle"
        >
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
