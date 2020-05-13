import React from "react";

const navStyles = {
  backgroundColor: "rgb(50, 198, 230)",
  borderColor: "rgb(50, 198, 230)",
};

const navText = {
  fontFamily: "Montserrat",
  fontSize: "2rem",
};

const Nav = (props) => (
  <div className="container-fluid">
    <div className="row" style={navStyles}>
      <div className="col-xs-12 col-sm-2" style={navText}>
        <a href="/">SecondLook</a>
      </div>
      <div className="col-xs-12 col-sm-2 col-sm-offset-4">
        <a href={`/submit/${props.userID}`} style={navText}>
          Submit
        </a>
      </div>
      <div className="col-xs-12 col-sm-2">
        {props.userID === "5e83630b5fce490017a3930e" ? (
          <a href={`/assign/${props.userID}`} style={navText}>
            Assign
          </a>
        ) : null}
      </div>
      <div className="col-xs-12 col-sm-2">
        <a href="/auth/logout" style={navText}>
          Logout
        </a>
      </div>
    </div>
  </div>
);

export default Nav;
