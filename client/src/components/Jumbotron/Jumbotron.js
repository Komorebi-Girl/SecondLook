import React from "react";

const jumbotronStyles = {
  backgroundColor: "white",
  height: "15rem",
  clear: "both"
};
const Jumbotron = ({ children }) => (
  <div style={jumbotronStyles} className="jumbotron">
    {children}
  </div>
);

export default Jumbotron;
