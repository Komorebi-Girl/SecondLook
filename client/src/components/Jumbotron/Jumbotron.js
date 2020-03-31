import React from "react";

const jumbotronStyles = {
  backgroundColor: "white",
  height: "300px",
  clear: "both"
};
const Jumbotron = ({ children }) => (
  <div style={jumbotronStyles} className="jumbotron">
    {children}
  </div>
);

export default Jumbotron;
