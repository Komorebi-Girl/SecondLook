import React from "react";

const NavOptions = props => {
  return (
    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav navbar-right">
        <li>
          {props.userID === "5e664aed0188e521aca69846" ? (
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
          <a href="http://localhost:3001/auth/logout" className="navbar-brand">
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
};

export default NavOptions;
