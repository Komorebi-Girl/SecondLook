import React from "react";

const jumbotronStyles = {
  backgroundColor: "rgb(255,255,255)",
  clear: "both",
};
const Jumbotron = ({ children }) => (
  <div style={jumbotronStyles} className="jumbotron">
    {children}
  </div>
);

export default Jumbotron;
