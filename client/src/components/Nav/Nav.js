import React from "react";

const navStyles = {
  backgroundColor: "rgb(50, 198, 230)",
  borderColor: "rgb(50, 198, 230)",
};

const navText = {
  fontFamily: "Montserrat",
  fontSize: "2rem",
  color: "rgb(255,255,255)",
  textAlign: "center",
  textDecoration: "none",
};

const Nav = (props) => (
  <div className="container-fluid">
    <div className="row" style={navStyles}>
      <div className="col-xs-12 col-sm-1">
        <a href="/" style={navText}>
          SecondLook
        </a>
      </div>
      {props.userID ? (
        <div>
          <div className="col-xs-12 col-sm-1 col-sm-push-8 ">
            <a href={`/submit/${props.userID}`} style={navText}>
              Submit
            </a>
          </div>
          {props.userID === "5e83630b5fce490017a3930e" ? (
            <div className="col-xs-12 col-sm-1 col-sm-push-8">
              <a href={`/assign/${props.userID}`} style={navText}>
                Assign
              </a>
            </div>
          ) : null}
          <div className="col-xs-12 col-sm-1 col-sm-push-8">
            <a href="/auth/logout" style={navText}>
              Logout
            </a>
          </div>
        </div>
      ) : null}
    </div>
  </div>
);

export default Nav;
