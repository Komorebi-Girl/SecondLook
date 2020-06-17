import React from "react";

const navStyles = {
  backgroundColor: "rgb(50, 198, 230)",
  borderColor: "rgb(50, 198, 230)",
  padding: "22px 0px",
};

const navText = {
  fontFamily: "Montserrat",
  fontSize: "2rem",
  color: "rgb(255,255,255)",
  textDecoration: "none",
  fontWeight: 600,
};

const Nav = (props) => (
  <div className="container-fluid">
    <div className="row" style={navStyles}>
      <div className="col-xs-12 col-sm-1" style={{ textAlign: "center" }}>
        <a href="/" style={navText}>
          SecondLook
        </a>
      </div>
      {props.userID === "5e83630b5fce490017a3930e" ? (
        <div
          className="col-xs-12 col-sm-2 col-sm-push-5 col-md-1 col-md-push-8 col-lg-1 col-lg-push-8"
          style={{ textAlign: "center" }}
        >
          <a href={`/assign/${props.userID}`} style={navText}>
            Assign
          </a>
          <a href={`/manage/${props.userID}`} style={navText}>
            Assign
          </a>
        </div>
      ) : null}
      {props.userID ? (
        <div>
          <div
            className="col-xs-12 col-sm-2 col-sm-push-5 col-md-1 col-md-push-8 col-lg-1 col-lg-push-8"
            style={{ textAlign: "center" }}
          >
            <a href={`/submit/${props.userID}`} style={navText}>
              Submit
            </a>
          </div>
          <div
            className="col-xs-12 col-sm-2 col-sm-push-5 col-md-1 col-md-push-8 col-lg-1 col-lg-push-8"
            style={{ textAlign: "center" }}
          >
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
