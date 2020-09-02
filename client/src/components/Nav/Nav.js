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

// Close the dropdown if the user clicks outside of it
window.onclick = function (e) {
  if (!e.target.matches(".dropbtn")) {
    var myDropdown = document.getElementById("myDropdown");
    if (myDropdown.classList.contains("show")) {
      myDropdown.classList.remove("show");
    }
  }
};

const Nav = (props) => (
  <div className="container-fluid">
    <div className="row" style={navStyles}>
      <div className="col-xs-12 col-sm-1" style={{ textAlign: "center" }}>
        <a href="/" style={navText}>
          SecondLook
        </a>
      </div>
      {props.userID === "5e83630b5fce490017a3930e" ||
      "5e83a00dbf9b8f0017fb0333" ? (
        <div>
          <div
            className="col-xs-12 col-sm-2 col-sm-push-3 col-md-1 col-md-push-6 col-lg-1 col-lg-push-7"
            style={{ textAlign: "center" }}
          >
            <a href={`/assign/${props.userID}`} style={navText}>
              Assign
            </a>
          </div>
          <div
            className="col-xs-12 col-sm-2 col-sm-push-3 col-md-1 col-md-push-6 col-lg-1 col-lg-push-7"
            style={{ textAlign: "center" }}
          >
            <a href={`/manage/${props.userID}`} style={navText}>
              Manage
            </a>
          </div>
          <div
            className="col-xs-12 col-sm-2 col-sm-push-3 col-md-1 col-md-push-6 col-lg-1 col-lg-push-7 dropdown"
            style={{ textAlign: "center" }}
          >
            <button
              class="dropbtn"
              onClick={() =>
                document.getElementById("myDropdown").classList.toggle("show")
              }
              style={navText}
            >
              Submit
            </button>
            <div class="dropdown-content" id="myDropdown">
              <a href={`/submit/${props.userID}/Instructor`}>Submit TB</a>
              <a href={`/submit/${props.userID}/TA`}>Submit TA Final</a>
            </div>
          </div>
          <div
            className="col-xs-12 col-sm-2 col-sm-push-3 col-md-1 col-md-push-6 col-lg-1 col-lg-push-7"
            style={{ textAlign: "center" }}
          >
            <a href="/auth/logout" style={navText}>
              Logout
            </a>
          </div>
        </div>
      ) : null}

      {props.userID && props.userID !== "5e83630b5fce490017a3930e" ? (
        <div>
          <div
            className="col-xs-12 col-sm-2 col-sm-push-3 col-md-1 col-md-push-6 col-lg-1 col-lg-push-7 dropdown"
            style={{ textAlign: "center" }}
          >
            <button
              class="dropbtn"
              onClick={() =>
                document.getElementById("myDropdown").classList.toggle("show")
              }
              style={navText}
            >
              Submit
            </button>
            <div class="dropdown-content" id="myDropdown">
              <a href={`/submit/${props.userID}/Instructor`}>Submit TB</a>
              <a href={`/submit/${props.userID}/TA`}>Submit TA Final</a>
            </div>
          </div>
          <div
            className="col-xs-12 col-sm-2 col-sm-push-7 col-md-1 col-md-push-8 col-lg-1 col-lg-push-9"
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
