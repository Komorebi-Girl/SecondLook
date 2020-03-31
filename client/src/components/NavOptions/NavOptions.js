import React from "react";
import "./NavOptions.css";

const NavOptions = props => {
  return (
    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav navbar-right">
        <li>
          {props.userID === "5e83630b5fce490017a3930e" ? (
            <a href={`/assign/${props.userID}`} className="navbar-brand">
              Assign
            </a>
          ) : null}
        </li>
        <li>
          <a href={`/submit/${props.userID}`} className="navbar-brand">
            Submit
          </a>
        </li>
        <li>
          <a href="/auth/logout" className="navbar-brand">
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
};

export default NavOptions;
