import React from "react";

const Nav = () => (
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
        <a href="/submit/5e664aed0188e521aca6984" className="navbar-brand">
          Submit
        </a>
        <a href="/auth/login" className="navbar-brand">
          Login
        </a>
        <a href="/auth/logout" className="navbar-brand">
          Logout
        </a>
      </div>
    </div>
  </nav>
);

export default Nav;
